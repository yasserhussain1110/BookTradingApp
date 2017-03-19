require('./config/config');
require('./db/mongoose');

const port = process.env.PORT;

const express = require('express');
const bodyParser = require('body-parser');

const User = require('./models/user');
const auth = require('./middleware/auth');

const app = express();

app.use(bodyParser.json());

/*******************************  Users *******************************************/

app.post('/users', (req, res) => {
  let user = new User(req.body);
  user.save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header('x-auth', token).status(201).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.post('/users/me', auth, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  let {email, password} = req.body;

  User.findByCreds(email, password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch(e => {
      console.log(e);
      res.status(400).send();
    });
});

/*******************************  Books *******************************************/

const books = require('google-books-search-2');
const key = 'AIzaSyDnMxXgcPGRrXCvigswWVWxdnzq6GpYAuQ';
const options = {key};
const Book = require('./models/book');

app.post('/books', auth, (req, res) => {
  // Request should be authorized and it should have a boom name

  let user = req.user;
  let title = req.body.title;

  if (!title) {
    return res.status(400).send({error: "Must have title"});
  }

  // Kick off a search for the book, then add it to database
  books.search(title, options).then(results => {
    let {title, description, thumbnail} = results[0];
    let book = new Book({
      title,
      description,
      thumbnailURL: thumbnail,
      _ownedBy: user._id,
      _addedBy: user._id
    });

    return book.save();
  }).then(book => {
    res.status(201).send(book);
  }).catch(e => {
    console.log(e);
    res.status(400).send(e);
  })
});

app.delete('/books/:id', auth, (req, res) => {
  let user = req.user;
  let bookId = req.params.id;

  Book.findOne({
    _id: bookId,
    _ownedBy: user._id
  }).then(book => {
    return book.remove();
  }).then(book => {
    res.send(book);
  }).catch(e => {
    console.log(e);
    res.status(400).send(e);
  })
});


/*******************************  Trade Requests *******************************************/

const TradeRequest = require('./models/tradeRequest');

app.post('/tradeRequests', auth, (req, res) => {
  let user = req.user;
  let {requestedBook, exchangeBook} = req.body;
  let tradeRequest = new TradeRequest({
    _requester: user._id,
    _requestedBook: requestedBook,
    _exchangeBook: exchangeBook
  });

  tradeRequest.save().then(() => {
    res.status(200).send();
  }).catch(e => {
    console.log(e);
    res.status(400).send(e);
  })
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
      // Reject all other trade requests involving same requestedBook book

      TradeRequest.update({
        status: "opened",
        _requestedBook: tr._requestedBook._id,
        _id: {
          $ne: tr._id
        }
      }, {status: "rejected"}).then(() => {
        return TradeRequest.update({
          status: "opened",
          _exchangeBook: tr._requestedBook._id
        }, {status: "rejected"})
      }).then(() => {
        if (tr._exchangeBook) {
          return TradeRequest.update({
            status: "opened",
            _exchangeBook: tr._exchangeBook._id,
            _id: {
              $ne: tr._id
            }
          }, {status: "rejected"})
        }
      }).then(() => {
        if (tr._exchangeBook) {
          return TradeRequest.update({
            status: "opened",
            _requestedBook: tr._exchangeBook._id
          }, {status: "rejected"})
        }
      }).then(() => {
        tr._requestedBook._ownedBy = tr._requester;
        return tr._requestedBook.save();
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


app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

