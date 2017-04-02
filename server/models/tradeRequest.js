const mongoose = require('mongoose');
const Book = require('./book');
const _ = require('lodash');

const TradeRequestSchema = mongoose.Schema({
  status: {
    type: String,
    enum: ["opened", "closed", "rejected", "accepted"],
    default: "opened"
  },

  _requester: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  _requestedBook: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },

  _exchangeBook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }
});

TradeRequestSchema.index(
  {_requester: 1, _requestedBook: 1, status: 1},
  {unique: true, partialFilterExpression: {"status": "opened"}});

TradeRequestSchema.statics.ensureTradeRequestIsForUser = function (trId, userId) {
  let TradeRequest = this;

  return TradeRequest.findById(trId)
    .populate('_requestedBook')
    .populate('_exchangeBook')
    .then(tr => {
      if (!tr) {
        return Promise.reject({error: "No such trade request"});
      }

      if (!tr._requestedBook._ownedBy.equals(userId)) {
        return Promise.reject({error: "Book not owned by user"});
      }

      return Promise.resolve(tr);
    });
};

TradeRequestSchema.statics.findAllTradeRequestsByUser = function (userId) {
  return TradeRequest.find({_requester: userId})
    .populate('_requestedBook')
    .populate('_exchangeBook')
    .populate('_requester');
};

TradeRequestSchema.statics.findAllTradeRequestsForUser = function (userId) {
  let TradeRequest = this;

  return Book.find({_ownedBy: userId}, {_id: 1}).then(books => {
    return books.map(book => book._id);
  }).then(bookIds => {
    return TradeRequest.find({_requestedBook: {$in: bookIds}})
      .populate('_requestedBook')
      .populate('_exchangeBook')
      .populate('_requester');
  });
};

TradeRequestSchema.statics.rejectOrCloseRelatedRequestsInvolvingSameBooks = function (tr) {
  let TradeRequest = this;

  // Reject trade request, requesting for the same book as this trade request
  return TradeRequest.update({
    status: "opened",
    _requestedBook: tr._requestedBook._id,
    _id: {
      $ne: tr._id
    }
  }, {status: "rejected"})

  // Close trade request, where this trade request's requested book was offered as exchange
    .then(() => {
      return TradeRequest.update({
        status: "opened",
        _exchangeBook: tr._requestedBook._id
      }, {status: "closed"})
    })

    // Close trade request, where this trade request's exchange book was offered as exchange
    .then(() => {
      if (tr._exchangeBook) {
        return TradeRequest.update({
          status: "opened",
          _exchangeBook: tr._exchangeBook._id,
          _id: {
            $ne: tr._id
          }
        }, {status: "closed"})
      }
    })

    // Close trade request, requesting for this trade request's exchange book
    .then(() => {
      if (tr._exchangeBook) {
        return TradeRequest.update({
          status: "opened",
          _requestedBook: tr._exchangeBook._id
        }, {status: "closed"})
      }
    });
};

TradeRequestSchema.methods.toJSON = function () {
  let tradeRequest = this;
  return _.pick(tradeRequest, ['status', '_requester', '_requestedBook', '_exchangeBook']);
};

const TradeRequest = mongoose.model('TradeRequest', TradeRequestSchema);

module.exports = TradeRequest;
