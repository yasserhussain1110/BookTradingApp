const {ObjectID} = require('mongodb');
const User = require('../../models/user');
const Book = require('../../models/book');
const TradeRequest = require('../../models/tradeRequest');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'test1@gmail.com',
  password: 'password1'
}, {
  _id: userTwoId,
  email: 'test2@gmail.com',
  password: 'password2'
}];

const bookOneId = new ObjectID();
const bookTwoId = new ObjectID();
const bookThreeId = new ObjectID();

const books = [{
  _id: bookOneId,
  title: "Harry Potter",
  description: "Harry book",
  thumbnailURL: "http://www.thumbnail.com/harry",
  _ownedBy: userOneId,
  _addedBy: userOneId
}, {
  _id: bookTwoId,
  title: "Percy Jackson",
  description: "Percy wants to fight",
  thumbnailURL: "http://www.thumbnail.com/percy",
  _ownedBy: userTwoId,
  _addedBy: userTwoId
}, {
  _id: bookThreeId,
  title: 'Sherlock Holmes',
  description: 'A book by A. C. Doyle',
  thumbnailURL: "http://www.thumbnail.com/sherlock",
  _ownedBy: userTwoId,
  _addedBy: userTwoId
}];

const tradeRequests = [{
  _requester: userOneId,
  _requestedBook: bookTwoId
}];

const populateUsers = (done) => {
  User.remove({}).then(()=> {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(()=>done());
};

const populateBooks = (done) => {
  Book.remove({}).then(()=> {
    Book.insertMany(books);
  }).then(()=>done());
};

const populateTradeRequests = (done) => {
  TradeRequest.remove({}).then(()=> {
    TradeRequest.insertMany(tradeRequests);
  }).then(()=>done());
};

module.exports = {
  populateUsers,
  populateBooks,
  populateTradeRequests,
  users,
  books,
  tradeRequests
};
