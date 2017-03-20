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
          return Promise.reject({error: "No such exchange book"});
        }
      })
      .then(() => {
        return Book.findOne({_id: requestedBook, _ownedBy: {$ne: user._id}});
      })
      .then(book => {
        if (!book) {
          return Promise.reject({error: "No such requested book"});
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
        //console.log(e);
        res.status(400).send(e);
      });
  });

  app.post('/tradeRequests/:id/reject', auth, (req, res) => {
    let userId = req.user._id;
    let trId = req.params.id;

    TradeRequest.ensureTradeRequestIsForUser(trId, userId).then(tr => {
      return tr.update({status: "rejected"});
    }).then(() => {
      res.status(200).send();
    }).catch(err => {
      //console.log(err);
      if (err.error === "Book not owned by user") {
        return res.status(403).send(err);
      } else {
        return res.status(400).send(err);
      }
    });
  });

  app.post('/tradeRequests/:id/close', auth, (req, res) => {
    let userId = req.user._id;
    let trId = req.params.id;

    TradeRequest.findOne({
      _requester: userId,
      _id: trId
    }).then(tr => {
      return tr.update({status: "closed"});
    }).then(() => {
      res.status(200).send();
    }).catch(err => {
      //console.log(err);
      res.status(400).send(err);
    });
  });

  app.post('/tradeRequests/:id/accept', auth, (req, res) => {
    let user = req.user;
    let trId = req.params.id;

    TradeRequest.ensureTradeRequestIsForUser(trId, user._id).then(tr => {
      let requestedBooksOriginalOwner = tr._requestedBook._ownedBy;

      // Reject or close all other trade requests involving same requested and exchange books
      return TradeRequest.rejectOrCloseRelatedRequestsInvolvingSameBooks(tr).then(() => {
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
      });
    }).catch(err => {
      //console.log(err);
      if (err.error === "Book not owned by user") {
        return res.status(403).send(err);
      } else {
        return res.status(400).send(err);
      }
    });
  });
};

module.exports = addTradeRequestRoutes;
