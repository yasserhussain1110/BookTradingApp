const books = require('google-books-search-2');
const Book = require('../models/book');
const TradeRequests = require('../models/tradeRequest');
const auth = require('../middleware/auth');

const options = {
  key: process.env.GOOGLE_API_KEY
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

  app.post('/books', auth, (req, res) => {
    // Request should be authorized and it should have a book title

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
