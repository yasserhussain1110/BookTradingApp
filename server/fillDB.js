require('./config/config');

const mongoose = require('./db/mongoose');
const User = require('./models/user');
const Book = require('./models/book');
const TradeRequest = require('./models/tradeRequest');
const {users, books, tradeRequests} = require('./tests/filler/filler');

const populateUsers = () => {
  return User.remove({}).then(() => {
    return Promise.all(users.map(user => new User(user).save())).then(r => console.log("Populated Users"));
  });
};

const populateBooks = () => {
  return Book.remove({}).then(() => {
    return Book.insertMany(books).then(r => console.log("Populated Books"));
  });
};

const populateTradeRequests = () => {
  return TradeRequest.remove({}).then(() => {
    return TradeRequest.insertMany(tradeRequests).then(r => console.log("Populated Trade Requests"));
  });
};

populateUsers().then(() => {
  return populateBooks();
}).then(() => {
  return populateTradeRequests()
}).then(() => {
  mongoose.connection.close();
});
