const request = require('supertest');
const expect = require('expect');
const app = require('./../server');
const TradeRequest = require('../models/tradeRequest');

const seed = require('./seed/seed');

const {
  populateUsers,
  populateBooks,
  populateTradeRequests
} = seed;

const seedUsers = seed.users;
const seedBooks = seed.books;
const seedTradeRequests = seed.tradeRequests;

beforeEach(populateUsers);
beforeEach(populateBooks);
beforeEach(populateTradeRequests);


describe("Testing Schema - TradeRequests", () => {
  it("should not allow a user to request another's same book twice", done => {
    let tradeRequest = new TradeRequest(seedTradeRequests[0]);
    tradeRequest.save().then().catch(e => {
      expect(e.code).toBe(11000);
      done();
    });
  });

  it("should allow a user to request another's multiple books", done => {
    let tradeRequest = new TradeRequest({
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

