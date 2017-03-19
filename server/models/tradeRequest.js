const mongoose = require('mongoose');

const TradeRequestSchema = mongoose.Schema({
  status: {
    type: String,
    enum: ["opened", "rejected", "accepted"],
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
  {unique: true, partialFilterExpression: { "status" : "opened" }});

const TradeRequest = mongoose.model('TradeRequest', TradeRequestSchema);

module.exports = TradeRequest;
