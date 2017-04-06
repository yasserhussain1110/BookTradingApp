const request = require('supertest');
const expect = require('expect');
const app = require('./../server');
const TradeRequest = require('../models/tradeRequest');
const Book = require('../models/book');

const {
  populateUsers,
  populateBooks,
  populateTradeRequests,
  seedUsers,
  seedBooks,
  seedTradeRequests
} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateBooks);
beforeEach(populateTradeRequests);

describe("Testing Schema - TradeRequests", () => {
  it("Should not allow a user to request another's same book twice", done => {
    let tradeRequest = new TradeRequest(seedTradeRequests[0]);
    tradeRequest.save().then().catch(e => {
      expect(e.code).toBe(11000);
      done();
    });
  });

  it("Should allow a user to request another's multiple books", done => {
    let tradeRequest = new TradeRequest({
      _requester: seedUsers[0]._id,
      _requestedBook: seedBooks[3]._id,
      _requestee: seedBooks[3]._ownedBy,
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

  it("Should return null if trade request not for correct user", done => {
    TradeRequest.findTradeRequestByRequesteeUserId(seedTradeRequests[0]._id, seedUsers[0]._id)
      .then(tr => {
        expect(tr).toNotExist();
        done();
      });
  });


  it("Should get a populated trade request if it is for correct user", done => {
    TradeRequest.findTradeRequestByRequesteeUserId(seedTradeRequests[0]._id, seedUsers[1]._id)
      .then(tr => {
        expect(tr).toExist();
        expect(tr._requestedBook.title).toBe("Da Vinci");
        expect(tr._exchangeBook.title).toBe("Percy Jackson");
        done();
      });
  });
});


describe("Testing Path - /tradeRequests", () => {
  it("Should not create trade requests via unauthorized requests", done => {
    request(app)
      .post("/tradeRequests")
      .send()
      .expect(401)
      .end(done);
  });


  it("Should have '_requestedBook' in request", done => {
    request(app)
      .post("/tradeRequests")
      .set('x-auth', seedUsers[2].tokens[0].tokenString)
      .send()
      .expect(400)
      .expect('Content-Type', /application.*json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe("requestedBook is required");
        done();
      })
  });


  it("Requester should possess the exchange book", done => {
    request(app)
      .post("/tradeRequests")
      .set('x-auth', seedUsers[2].tokens[0].tokenString)
      .send({
        requestedBook: seedBooks[3]._id,
        exchangeBook: seedBooks[0]._id
      })
      .expect(400)
      .expect('Content-Type', /application.*json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe("No such exchange book");
        done();
      })
  });

  it("Requester should not possess the requested book", done => {
    request(app)
      .post("/tradeRequests")
      .set('x-auth', seedUsers[2].tokens[0].tokenString)
      .send({
        requestedBook: seedBooks[4]._id,
        exchangeBook: seedBooks[4]._id
      })
      .expect(400)
      .expect('Content-Type', /application.*json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe("No such requested book");
        done();
      })
  });
});


describe("Testing Path - /tradeRequests/:id/accept", () => {
  it("Should not allow third persons to accept trade requests", done => {
    request(app)
      .post(`/tradeRequests/${seedTradeRequests[1]._id}/accept`)
      .set('x-auth', seedUsers[1].tokens[0].tokenString)
      .send()
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe("No such trade request");
        done();
      });
  });

  it("Should accept the target trade request and close/reject other related requests", done => {
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
          return TradeRequest.findById(seedTradeRequests[5]._id);
        }).then(tradeRequest => {
          expect(tradeRequest.status).toBe("closed");
          done();
        }).catch(e => done(e));
      });
  });

  it("Should change '_ownedby' fields of books", done => {
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
        }).then(book => {
          expect(book._ownedBy).toEqual(seedUsers[0]._id);
          done();
        }).catch(e => done(e));
      });
  });
});

describe("Testing Path - /tradeRequests/:id/reject", () => {
  it("Users who own requested book should be able to reject requests", done => {
    request(app)
      .post(`/tradeRequests/${seedTradeRequests[0]._id}/reject`)
      .set('x-auth', seedUsers[1].tokens[0].tokenString)
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        TradeRequest.findById(seedTradeRequests[0]._id).then(tr => {
          expect(tr.status).toBe("rejected");
          done();
        });
      });
  });

  it("Should not allow third persons to reject trade requests", done => {
    request(app)
      .post(`/tradeRequests/${seedTradeRequests[0]._id}/reject`)
      .set('x-auth', seedUsers[2].tokens[0].tokenString)
      .send()
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe("No such trade request");
        TradeRequest.findById(seedTradeRequests[0]._id).then(tr => {
          expect(tr.status).toBe("opened");
          done();
        });
      });
  });
});


describe("Testing Path - /tradeRequests/:id/close", () => {
  it("Requesters should be able to close requests", done => {
    request(app)
      .post(`/tradeRequests/${seedTradeRequests[0]._id}/close`)
      .set('x-auth', seedUsers[0].tokens[0].tokenString)
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        TradeRequest.findById(seedTradeRequests[0]._id).then(tr => {
          expect(tr.status).toBe("closed");
          done();
        });
      });
  });

  it("Should not allow third persons to close requests", done => {
    request(app)
      .post(`/tradeRequests/${seedTradeRequests[0]._id}/reject`)
      .set('x-auth', seedUsers[2].tokens[0].tokenString)
      .send()
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.error).toBe("No such trade request");
        TradeRequest.findById(seedTradeRequests[0]).then(tr => {
          expect(tr.status).toBe("opened");
          done();
        });
      });
  });
});
