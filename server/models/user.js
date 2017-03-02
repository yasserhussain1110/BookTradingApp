const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const validator = require('validator');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    minlength: 1,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
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
    token: {
      type: String,
      required: true
    }
  }]
});

const BookSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 1
  },

  description: {
    type: String,
    trim: true,
    minlength: 1
  },

  thumbnailURL: {
    type: String,
    trim: true,
    minlength: 1,
    validate: {
      validator: validator.isURL,
      message: '{VALUE} is not a valid URL'
    },
    required: true
  },

  _ownedBy: {
    type: ObjectID,
    required: true
  },

  _addedBy: {
    type: ObjectID,
    required: true
  }
});

const TradeRequestSchema = mongoose.Schema({
  from: {
    _userId: {
      required: true,
      type: ObjectID
    },

    _bookId: {
      type: ObjectID
    }
  },

  to: {
    _userId: {
      required: true,
      type: ObjectID
    },

    _bookId: {
      type: ObjectID,
      required: true
    }
  }
});

TradeRequestSchema.index({'from._userId': 1, 'to._userId': 1, 'to._bookId': 1}, {unique: true});
