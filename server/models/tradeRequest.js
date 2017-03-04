const mongoose = require('mongoose');

const TradeRequestSchema = mongoose.Schema({
  _requester: {
    required: true,
    type: mongoose.Schema.Types.ObjectId
  },

  _requestedBook: {
    required: true,
    type: mongoose.Schema.Types.ObjectId
  },

  _exchangeBook: {
    type: mongoose.Schema.Types.ObjectId
  }
});

TradeRequestSchema.index({_requester: 1, _requestedBook: 1}, {unique: true});

const TradeRequest = mongoose.model('TradeRequest', TradeRequestSchema);

module.exports = TradeRequest;
