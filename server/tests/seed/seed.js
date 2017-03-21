const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Book = require('../../models/book');
const TradeRequest = require('../../models/tradeRequest');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const userThreeId = new ObjectID();
const userFourId = new ObjectID();

const seedUsers = [{
  _id: userOneId,
  email: 'test1@gmail.com',
  password: 'password1',
  name: "User1 Harry",
  tokens: [{
    access: 'auth',
    tokenString: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'test2@gmail.com',
  name: "User2 Sirius",
  password: 'password2',
  tokens: [{
    access: 'auth',
    tokenString: jwt.sign({_id: userTwoId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userThreeId,
  email: 'test3@gmail.com',
  password: '3rdpassword',
  tokens: [{
    access: 'auth',
    tokenString: jwt.sign({_id: userThreeId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userFourId,
  email: 'test4@gmail.com',
  password: 'romainvicta'
}];

const bookOneId = new ObjectID();
const bookTwoId = new ObjectID();
const bookThreeId = new ObjectID();
const bookFourId = new ObjectID();
const bookFiveId = new ObjectID();
const bookSixId = new ObjectID();

const seedBooks = [{
  _id: bookOneId,
  title: "Harry Potter",
  description: "Harry book",
  thumbnailURL: "http://www.thumbnail.com/harry",
  _ownedBy: userOneId,
  _addedBy: userOneId
}, {
  _id: bookTwoId,
  title: "Percy Jackson",
  description: "Percy Jackson",
  thumbnailURL: "http://www.thumbnail.com/perce",
  _ownedBy: userOneId,
  _addedBy: userOneId
}, {
  _id: bookThreeId,
  title: "Da Vinci",
  description: "Vince",
  thumbnailURL: "http://www.thumbnail.com/vinni",
  _ownedBy: userTwoId,
  _addedBy: userTwoId
}, {
  _id: bookFourId,
  title: 'Sherlock Holmes',
  description: 'A book by A. C. Doyle',
  thumbnailURL: "http://www.thumbnail.com/sherlock",
  _ownedBy: userTwoId,
  _addedBy: userTwoId
}, {
  _id: bookFiveId,
  title: 'Tinkle',
  description: 'Children picture book',
  thumbnailURL: "http://www.thumbnail.com/tikle",
  _ownedBy: userThreeId,
  _addedBy: userThreeId
}, {
  _id: bookSixId,
  title: 'Spiderman',
  description: 'Marvel Comics',
  thumbnailURL: "http://www.thumbnail.com/spidey",
  _ownedBy: userFourId,
  _addedBy: userFourId
}];

const seedTradeRequests = [{
  _id: new ObjectID(),
  _requester: userOneId,
  _requestedBook: bookThreeId,
  _exchangeBook: bookTwoId
}, {
  _id: new ObjectID(),
  _requester: userTwoId,
  _requestedBook: bookOneId,
  _exchangeBook: bookThreeId
}, {
  _id: new ObjectID(),
  _requester: userOneId,
  _requestedBook: bookFiveId,
  _exchangeBook: bookOneId
}, {
  _id: new ObjectID(),
  _requester: userFourId,
  _requestedBook: bookOneId,
  _exchangeBook: bookSixId
}, {
  _id: new ObjectID(),
  _requester: userTwoId,
  _requestedBook: bookSixId,
  _exchangeBook: bookThreeId
}];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(seedUsers[0]).save();
    let userTwo = new User(seedUsers[1]).save();
    let userThree = new User(seedUsers[2]).save();
    let userFour = new User(seedUsers[3]).save();
    return Promise.all([userOne, userTwo, userThree, userFour]);
  }).then(() => done());
};

const populateBooks = (done) => {
  Book.remove({}).then(() => {
    Book.insertMany(seedBooks);
  }).then(() => done());
};

const populateTradeRequests = (done) => {
  TradeRequest.remove({}).then(() => {
    TradeRequest.insertMany(seedTradeRequests);
  }).then(() => done());
};

module.exports = {
  populateUsers,
  populateBooks,
  populateTradeRequests,
  seedUsers,
  seedBooks,
  seedTradeRequests
};
