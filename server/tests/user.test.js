const request = require('supertest');
const app = require('./../server');
const expect = require('expect');
const User = require('../models/user');

const seed = require('./seed/seed');

const populateUsers = seed.populateUsers;
const seedUsers = seed.users;

beforeEach(populateUsers);

describe("Testing Schema - User", () => {
  it("should have a valid email", done => {
    let user = new User({
      email: "wrongEmail",
      password: "password"
    });

    user.save().then().catch(e => {
      expect(e.errors.email.message).toBe("wrongEmail is not a valid email");
      done();
    });
  });

  it("should not have an already taken email", done => {
    let user = new User({
      email: seedUsers[0].email,
      password: "password"
    });

    user.save().then().catch(e => {
      expect(e.code).toBe(11000);
      done();
    });
  });
});
