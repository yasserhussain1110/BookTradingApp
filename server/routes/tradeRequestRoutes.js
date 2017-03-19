const TradeRequest = require('../models/tradeRequest');
const Book = require('../models/book');
const auth = require('../middleware/auth');

const addTradeRequestRoutes = app => {

  app.post('/tradeRequests', auth, (req, res) => {
    let user = req.user;
    let {requestedBook, exchangeBook} = req.body;

    if (!requestedBook) {
      return res.status(400).send({error: "requestedBook is required"});
    }

    (exchangeBook ? Book.findOne({_id: exchangeBook, _ownedBy: user._id}) : Promise.resolve("ignore"))
      .then(book => {
        if (!book) {
          return Promise.reject("No such book");
        }
      })
      .then(() => {
        return Book.findOne({_id: requestedBook, _ownedBy: {$ne: user._id}});
      })
      .then(book => {
        if (!book) {
          return Promise.reject("No such book");
        }
      })
      .then(() => {
        let tradeRequest = new TradeRequest({
          _requester: user._id,
          _requestedBook: requestedBook,
          _exchangeBook: exchangeBook
        });
        return tradeRequest.save();
      })
      .then(() => {
        res.status(200).send();
      })
      .catch(e => {
        console.log(e);
        res.status(400).send(e);
      });

  });

  app.post('/tradeRequests/:id/accept', auth, (req, res) => {
    let user = req.user;
    let trId = req.params.id;

    TradeRequest.findById(trId)
      .populate('_requestedBook')
      .populate('_exchangeBook')
      .exec((err, tr) => {
        // User wants to accept a trade request
        // First do a bunch of validations and error check

        if (err) {
          console.log(err);
          return res.status(400).send(err);
        }

        if (!tr._requestedBook._ownedBy.equals(user._id)) {
          return res.status(403).send(err);
        }

        // Now the actual code

        let requestedBooksOriginalOwner = tr._requestedBook._ownedBy;

        // Reject or close all other trade requests involving same requested and exchange books
        handleOtherRelatedTradeRequests(tr).then(() => {
          tr._requestedBook._ownedBy = tr._requester;
          return tr._requestedBook.save();
        }).then(() => {
          if (tr._exchangeBook) {
            tr._exchangeBook._ownedBy = requestedBooksOriginalOwner;
            return tr._exchangeBook.save();
          }
        }).then(() => {
          tr.status = "accepted";
          return tr.save();
        }).then(() => {
          res.status(200).send();
        }).catch(e => {
          console.log(e);
          res.status(400).send(e);
        });
      });
  });


  const handleOtherRelatedTradeRequests = (tr) => {

    // Reject trade request, requesting for the same book as this trade request
    return TradeRequest.update({
      status: "opened",
      _requestedBook: tr._requestedBook._id,
      _id: {
        $ne: tr._id
      }
    }, {status: "rejected"})

    // Close trade request, where this trade request's requested book was offered as exchange
      .then(() => {
        return TradeRequest.update({
          status: "opened",
          _exchangeBook: tr._requestedBook._id
        }, {status: "closed"})
      })

      // Close trade request, where this trade request's exchange book was offered as exchange
      .then(() => {
        if (tr._exchangeBook) {
          return TradeRequest.update({
            status: "opened",
            _exchangeBook: tr._exchangeBook._id,
            _id: {
              $ne: tr._id
            }
          }, {status: "closed"})
        }
      })

      // Close trade request, requesting for this trade request's exchange book
      .then(() => {
        if (tr._exchangeBook) {
          return TradeRequest.update({
            status: "opened",
            _requestedBook: tr._exchangeBook._id
          }, {status: "closed"})
        }
      })
  };
};

module.exports = addTradeRequestRoutes;
