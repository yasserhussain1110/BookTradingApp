const request = require('supertest');
const expect = require('expect');
const app = require('./../server');
const TradeRequest = require('../models/tradeRequest');
const Book = require('../models/book');

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
      _requestedBook: seedBooks[3]._id,
      _exchangeBook: seedBooks[0]._id
    });
    tradeRequest.save().then(() => {
      TradeRequest.find({
        _requester: seedUsers[0]._id,
        _requestedBook: seedBooks[3]._id,
        _exchangeBook: seedBooks[0]._id
      }).then(tradeRequests => {
        expect(tradeRequests.length).toBe(1);
        done();
      });
    });
  });
});


describe("/tradeRequests/:id/accept", () => {
  it('Should close/reject other related requests', done => {
    request(app)
      .post(`/tradeRequests/${seedTradeRequests[1]._id}/accept`)
      .set('x-auth', seedUsers[0].tokens[0].tokenString)
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        TradeRequest.findById(seedTradeRequests[0]._id).then(tradeRequest => {
          expect(tradeRequest.status).toBe("closed");
          return TradeRequest.findById(seedTradeRequests[1]._id);
        }).then(tradeRequest => {
          expect(tradeRequest.status).toBe("accepted");
          return TradeRequest.findById(seedTradeRequests[2]._id);
        }).then(tradeRequest => {
          expect(tradeRequest.status).toBe("closed");
          return TradeRequest.findById(seedTradeRequests[3]._id);
        }).then(tradeRequest => {
          expect(tradeRequest.status).toBe("rejected");
          return TradeRequest.findById(seedTradeRequests[4]._id);
        }).then(tradeRequest => {
          expect(tradeRequest.status).toBe("closed");
          done();
        }).catch(e => done(e));
      });
  });

  it('Should change owned by fields of books', done => {
    request(app)
      .post(`/tradeRequests/${seedTradeRequests[1]._id}/accept`)
      .set('x-auth', seedUsers[0].tokens[0].tokenString)
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Book.findById(seedBooks[0]._id).then(book => {
          expect(book._ownedBy).toEqual(seedUsers[1]._id);
          return Book.findById(seedBooks[2]._id);
          done();
        }).then(book => {
          expect(book._ownedBy).toEqual(seedUsers[0]._id);
          done();
        }).catch(e => done(e));
      });
  });
});

