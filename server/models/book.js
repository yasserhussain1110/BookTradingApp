const mongoose = require('mongoose');
const validator = require('validator');

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
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  _addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
