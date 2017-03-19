const mongoose = require('mongoose');
const validator = require('validator');

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minlength: 1,
    required: true
  },

  description: {
    type: String,
    trim: true,
    minlength: 5
  },

  thumbnailURL: {
    type: String,
    trim: true,
    minlength: 1,
    validate: {
      validator: url => validator.isURL(url),
      message: '{VALUE} is not a valid URL'
    },
    required: true
  },

  _ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  _addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
