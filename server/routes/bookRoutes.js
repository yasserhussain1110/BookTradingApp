const Book = require('../models/book');
const TradeRequests = require('../models/tradeRequest');
const googleBooksAPI = require('google-books-search-2');
const auth = require('../middleware/auth');

const options = {
  key: process.env.GOOGLE_API_KEY,
  limit: 30
};

const addMultipleBooks = (books, request, response) => {
  let total = books.length;
  let results = [];
  let atLeastOneSucceeded = false;
  books.forEach((book, index) => {
    new Book(Object.assign({}, book, {
      _ownedBy: request.user._id,
      _addedBy: request.user._id
    })).save()
      .then(book => {
        results[index] = {
          success: true,
          book
        };
        atLeastOneSucceeded = true;
        total--;
        if (total === 0) {
          sendResults(results, response, atLeastOneSucceeded);
        }
      })
      .catch(error => {
        results[index] = {
          success: false,
          error
        };
        total--;
        if (total === 0) {
          sendResults(results, response, atLeastOneSucceeded);
        }
      });
  });
};

const sendResults = (results, response, status) => {
  let statusCode = status ? 201 : 400;
  response.status(statusCode).send(results);
};

const addBookRoutes = app => {

  app.get('/books', (req, res) => {
    Book.find().then(books => {
      res.send(books);
    }).catch(e => {
      console.log(e);
      res.status(400).send(e);
    });
  });

  app.get('/books/:id', (req, res) => {
    let bookId = req.params.id;

    Book.findById(bookId).then(book => {
      res.send(book);
    }).catch(e => {
      console.log(e);
      res.status(400).send(e);
    });
  });

  app.put('/books', auth, (req, res) => {
    if (Array.isArray(req.body)) {
      addMultipleBooks(req.body, req, res);
    } else if (typeof req.body === 'object') {
      addMultipleBooks([req.body], req, res);
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
      }, {status: "rejected"}, {multi: true})
        .then(() => {
          TradeRequests.update({
            _exchangeBook: book._id
          }, {status: "closed"}, {multi: true})
        })
        .then(() => {
          res.send(book);
        });
    }).catch(e => {
      console.log(e);
      res.status(400).send(e);
    });
  });

  app.post('/search-book', auth, (req, res) => {
    const title = req.body.title;
    return googleBooksAPI.search(title, options)
      .then(googleResults => {
        const sendableResults =
          googleResults
            .filter(isBookDescriptionTruthy)
            .filter(hasThumbnail)
            .map(pullOfRequiredInfoFromBookResult);
        res.send(sendableResults);
      })
      .catch(e => {
        console.error(e);
        res.sendStatus(403);
      });
  });
};

const convertHttpURLsToHttps = url => {
  return url.replace(/http:\/\//, "https://");
};

const hasThumbnail = book => {
  return book.thumbnail && typeof book.thumbnail === 'string';
};

const isBookDescriptionTruthy = book => {
  return !!book.description;
};

const pullOfRequiredInfoFromBookResult = book => {
  let {title, description, thumbnail} = book;
  return {
    title,
    description,
    thumbnailURL: convertHttpURLsToHttps(thumbnail)
  }
};

module.exports = addBookRoutes;
