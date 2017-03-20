const request = require('supertest');
const app = require('./../server');
const expect = require('expect');

const {populateBooks, seedBooks} = require('./seed/seed');

beforeEach(populateBooks);

describe("Testing path - /books", () => {
  it("Should return all available books", done => {
    request(app)
      .get('/books')
      .expect(200)
      .expect('Content-Type', /application.*json/)
      .end((err, res) => {
        expect(res.body.length).toBe(seedBooks.length);
        done();
      })
  });
});
