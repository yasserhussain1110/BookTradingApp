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
  description: "Harry book & the cursed child.",
  thumbnailURL: "https://books.google.co.in/books/content?id=tcSMCwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73GrnaBHte0hGE_NwNwDUzVXAlh_v8I8YFYLVz8drUTind520RmD7wuWg9dp6cYFFaxcDIQZyRors6X1YGBVq9ycDUIFGWJt-izl8bjpEw4BdOjWmvO3brt9I3NpM3NMXzgu_Xl",
  _ownedBy: userOneId,
  _addedBy: userOneId
}, {
  _id: bookTwoId,
  title: "Percy Jackson",
  description: "Lightening Thief",
  thumbnailURL: "https://books.google.co.in/books/content?id=FFTJDYx_ZiEC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72QxBmHmdBUw4vc46JFvPOjtU5-GChbKhATj_Ssw9M8YQb-nJBRkpSkNm6XBNgVrc6nXqNF6E5PKljCj_Y8AT1Ox49qpyGUE4xxs6g2pV1_WqxhwKbC3S9Mb-DHlMNN3JWKfc2L",
  _ownedBy: userOneId,
  _addedBy: userOneId
}, {
  _id: bookThreeId,
  title: "Da Vinci",
  description: "Renaissance Genius",
  thumbnailURL: "https://books.google.co.in/books/content?id=I9pkbjp_4rgC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72PgrD3vicviFk6Xwo8zwSMVgTQKZhgO_UoWcZJcbQUNNRgQ8l9G612xcuDtmhgOoeuP-pZcjVZjApE-8JrJTOv4jWY9xvGHAmPuSyhxV02qESV1J5xboxTNkvqDwodttSb8tfY",
  _ownedBy: userTwoId,
  _addedBy: userTwoId
}, {
  _id: bookFourId,
  title: 'Sherlock Holmes',
  description: 'A book by A. C. Doyle',
  thumbnailURL: "https://books.google.co.in/books/content?id=buc0AAAAMAAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE70q3qiBfMet1HIzX2pftJzujEXQIcRuwt7Gid8X8-Ry2fmR5cw2KuVi3TC2HNCf6I-4HTH43fg868ZkqxjQvk9HnqqC5ZK3NAnxSuFK1RK_qI1rT5OLRw37SxZaL6gssVl3PoaF",
  _ownedBy: userTwoId,
  _addedBy: userTwoId
}, {
  _id: bookFiveId,
  title: 'Tinkle',
  description: 'Children picture book',
  thumbnailURL: "https://books.google.co.in/books/content?id=NpvHCQg7KfEC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73TM-fiDUcGjHKkVMbxWPzxwUf2AN2kqsBbSLfgafUI10rbHJxrroQeStmhH0NXGaqnLWYLDSsZ6tafC0NxHPeZ5TFxGBmzyQ7RZ1xysWmXbsnMlrhF5MVbDA7YUg5uTVsREVEO",
  _ownedBy: userThreeId,
  _addedBy: userThreeId
}, {
  _id: bookSixId,
  title: 'Spiderman',
  description: 'Marvel Comics',
  thumbnailURL: "https://books.google.co.in/books/content?id=_Umd2tS9pHsC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE73ix6sbpNHppCmYnlJGqlGYSIKdkm-jSuQTFGd4bMElvpjmitTKu9U3WKFJJShwIkWHHBs8kg2RFfj4Bk4DDv8RDsxPzTRFo_8hs4t6I2DulsS3D0hygoia8RV_eUG5dRPgZcIz",
  _ownedBy: userFourId,
  _addedBy: userFourId
}];

const seedTradeRequests = [{
  _id: new ObjectID(),
  _requester: userOneId,
  _requestedBook: bookThreeId,
  _requestee: userTwoId,
  _exchangeBook: bookTwoId
}, {
  _id: new ObjectID(),
  _requester: userTwoId,
  _requestedBook: bookOneId,
  _requestee: userOneId,
  _exchangeBook: bookThreeId
}, {
  _id: new ObjectID(),
  _requester: userOneId,
  _requestedBook: bookFiveId,
  _requestee: userThreeId,
  _exchangeBook: bookOneId
}, {
  _id: new ObjectID(),
  _requester: userFourId,
  _requestedBook: bookOneId,
  _requestee: userOneId,
  _exchangeBook: bookSixId
}, {
  _id: new ObjectID(),
  _requester: userTwoId,
  _requestedBook: bookSixId,
  _requestee: userFourId,
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
