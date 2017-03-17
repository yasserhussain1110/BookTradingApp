const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    minlength: 1,
    validate: {
      validator: email => validator.isEmail(email),
      message: '{VALUE} is not a valid email'
    },
    required: true
  },

  name: {
    type: String,
    trim: true,
    minlength: 3
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  tokens: [{
    access: {
      type: String,
      required: true
    },
    tokenString: {
      type: String,
      required: true
    }
  }]
});

UserSchema.pre('save', function (next) {
  let user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10)
    .then(salt => {
      return bcrypt.hash(user.password, salt);
    })
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(e => {
      next(e);
    })
});

UserSchema.methods.toJSON = function () {
  let user = this;
  return _.pick(user, ["name", "email", "_id"]);
};

UserSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';
  let tokenString = jwt.sign({id: user._id.toHexString(), access}, 'abc123');

  user.tokens.push({access, tokenString});
  return user.save().then(() => {
    return tokenString;
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
