const Book = require('../models/book');
const TradeRequests = require('../models/tradeRequest');
const auth = require('../middleware/auth');

const options = {
  key: process.env.GOOGLE_API_KEY
};

const addSingleBook = (book, req, res) => {
  new Book(Object.assign({}, book, {
    _ownedBy: req.user._id,
    _addedBy: req.user._id
  }))
    .save()
    .then(book => {
      sendResults(book, res, true);
    })
    .catch(e => {
      sendResults(e, res, false);
    });
};

const addMultipleBooks = (books, req, res) => {
  let total = books.length;
  let results = {};
  let atLeastOneSucceeded = false;
  books.forEach((book, index) => {
    new Book(Object.assign({}, book, {
      _ownedBy: req.user._id,
      _addedBy: req.user._id
    })).save()
      .then(book => {
        results[index] = {
          success: true,
          book
        };
        atLeastOneSucceeded = true;
        total--;
        if (total === 0) {
          sendResults(results, res, atLeastOneSucceeded);
        }
      })
      .catch(error => {
        results[index] = {
          success: false,
          error
        };
        total--;
        if (total === 0) {
          sendResults(results, res, atLeastOneSucceeded);
        }
      });
  });
};

const sendResults = (results, res, status) => {
  let statusCode = status ? 201 : 400;
  res.status(statusCode).send(results);
};

const addBookRoutes = app => {

  app.get('/books', (req, res) => {
    Book.find().then(books => {
      res.send(books);
    }).catch(e => {
      console.log(e);
      res.status(400).send(e);
    })
  });

  app.get('/books/:id', (req, res) => {
    let bookId = req.params.id;

    Book.findById(bookId).then(book => {
      res.send(book);
    }).catch(e => {
      console.log(e);
      res.status(400).send(e);
    })
  });

  app.put('/books', auth, (req, res) => {
    if (Array.isArray(req.body)) {
      addMultipleBooks(req.body, req, res);
    } else if (typeof req.body === 'object') {
      addSingleBook(req.body, req, res);
    } else {
      res.status(400);
    }
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
      return TradeRequests.update({
        _requestedBook: book._id
      }, {status: "rejected"})
        .then(() => {
          TradeRequests.update({
            _exchangeBook: book._id
          }, {status: "closed"})
        })
        .then(() => {
          res.send(book);
        });
    }).catch(e => {
      console.log(e);
      res.status(400).send(e);
    })
  });
};

module.exports = addBookRoutes;
