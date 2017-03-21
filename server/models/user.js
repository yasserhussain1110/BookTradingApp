const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const customValidator = require('../validation/customValidator');

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

  password: {
    type: String,
    required: true,
    minlength: 6,

    /*
     * This validation is not strictly required
     * because required takes care of undef and null
     * values
     */
    validate: {
      validator: customValidator.isNotNullOrUndefined,
      message: '{VALUE} must not be null or undefined'
    }
  },

  name: {
    type: String,
    trim: true,
    minlength: 3,

    /*
     * Here isNotNullOrUndefined validation is
     * absolutely essential because this field
     * is not required (is optional)
     */
    validate: {
      validator: customValidator.isNotNullOrUndefined,
      message: '{VALUE} must not be null or undefined'
    }
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
  let tokenString = jwt.sign({_id: user._id.toHexString(), access}, 'abc123');

  user.tokens.push({access, tokenString});
  return user.save().then(() => {
    return tokenString;
  });
};

UserSchema.methods.removeToken = function (tokenString) {
  let user = this;
  return user.update({
    $pull: {
      tokens: {tokenString}
    }
  });
};

UserSchema.methods.modify = function (updatedInfo) {
  let user = this;
  let updatableInfo = _.pick(updatedInfo, ['name', 'email', 'password']);
  Object.assign(user, updatableInfo);
  return user.save();
};

UserSchema.statics.findByToken = function (tokenString) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(tokenString, 'abc123');
  } catch (e) {
    return Promise.reject("Invalid Token");
  }

  let {_id, access} = decoded;

  return User.findOne({
    _id: _id,
    'tokens.access': access,
    'tokens.tokenString': tokenString
  });
};

UserSchema.statics.findByCreds = function (email, password) {
  let User = this;
  return User.findOne({email})
    .then(user => {
      if (!user) {
        return Promise.reject("No such user");
      }
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, function (err, res) {
          if (res) {
            resolve(user)
          } else {
            reject("Incorrect Password");
          }
        });
      });
    });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
