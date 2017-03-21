const request = require('supertest');
const app = require('./../server');
const expect = require('expect');
const User = require('../models/user');

const {populateUsers, seedUsers} = require('./seed/seed');

beforeEach(populateUsers);

describe("Testing Schema - User", () => {
  it("Should have a valid email", done => {
    let user = new User({
      email: "wrongEmail",
      password: "password"
    });

    user.save().then().catch(e => {
      expect(e.errors.email.message).toBe("wrongEmail is not a valid email");
      done();
    });
  });

  it("Should not have an already taken email", done => {
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

describe("Testing Path - /users/me", () => {
  it("Should create a new user", done => {
    request(app)
      .post('/users')
      .send({email: "newemail@gmail.com", password: "awesomepass"})
      .expect(200)
      .expect('Content-Type', /application.*json/)
      .end((err, res) => {
        User.findOne({email: "newemail@gmail.com"}).then(user => {
          expect(user).toExist();
          expect(user.password).toExist();
          done();
        });
      })
  });

  it("Should not create a new user with null 'name'", done => {
    request(app)
      .post('/users')
      .send({name: null, email: "newemail@gmail.com", password: "awesomepass"})
      .expect(400)
      .expect('Content-Type', /application.*json/)
      .end((err, res) => {
        expect(res.body.errors.name.message).toMatch(/must not be null or undefined/);
        done();
      })
  });

  it("Should update user", done => {
    request(app)
      .patch('/users/me')
      .set('x-auth', seedUsers[0].tokens[0].tokenString)
      .send({email: "patched@gmail.com"})
      .expect(200)
      .expect('Content-Type', /application.*json/)
      .end((err, res) => {
        User.findById(seedUsers[0]._id).then(user => {
          expect(user.email).toBe("patched@gmail.com");
          // Other fields should be unchanged
          expect(user.name).toBe(seedUsers[0].name);
          expect(user.password).toExist();
          done();
        });
      })
  });

  it("Should not update user if null/undefined name", done => {
    request(app)
      .patch('/users/me')
      .set('x-auth', seedUsers[0].tokens[0].tokenString)
      .send({name: null})
      .expect(400)
      .expect('Content-Type', /application.*json/)
      .end((err, res) => {
        expect(res.body.errors.name.message).toMatch(/must not be null or undefined/);
        User.findById(seedUsers[0]._id).then(user => {
          // 'name' field should be unchanged
          expect(user.name).toBe(seedUsers[0].name);
          done();
        });
      })
  });
});
