require('../config/config');
require('../db/mongoose');

const expect = require('expect');

const User = require('../models/user');
const Book = require('../models/book');
const TradeRequest = require('../models/tradeRequest');

const {
  populateUsers,
  populateBooks,
  populateTradeRequests
} = require('./seed/seed');

const seedUsers = require('./seed/seed').users;
const seedBooks = require('./seed/seed').books;
const seedTradeRequests = require('./seed/seed').tradeRequests;


beforeEach(populateUsers);
beforeEach(populateBooks);
beforeEach(populateTradeRequests);

describe("Testing Schema - User", () => {
  it("should have a valid email", done => {
    var user = new User({
      email: "wrongEmail",
      password: "password"
    });

    user.save().then().catch(e => {
      expect(e.errors.email.message).toBe("wrongEmail is not a valid email");
      done();
    });
  });

  it("should not have an already taken email", done => {
    var user = new User({
      email: seedUsers[0].email,
      password: "password"
    });

    user.save().then().catch(e => {
      expect(e.code).toBe(11000);
      done();
    });
  });
});

describe("Testing Schema - TradeRequests", () => {
  it("should not allow a user to request another's same book twice", done => {
    var tradeRequest = new TradeRequest(seedTradeRequests[0]);
    tradeRequest.save().then().catch(e=> {
      expect(e.code).toBe(11000);
      done();
    });
  });

  it("should allow a user to request another's multiple books", done => {
    var tradeRequest = new TradeRequest({
      _requester: seedUsers[0]._id,
      _requestedBook: seedBooks[2]._id,
      _exchangeBook: seedBooks[1]._id
    });
    tradeRequest.save().then(trade => {
      TradeRequest.find({
        _requester: seedUsers[0]._id,
        _requestedBook: seedBooks[2]._id,
        _exchangeBook: seedBooks[1]._id
      }).then(tradeRequests => {
        expect(tradeRequests.length).toBe(1);
        done();
      });
    });
  });
});
