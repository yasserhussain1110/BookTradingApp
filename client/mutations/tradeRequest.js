export default {
  showTradeRequestsForMe(state) {
    state.navigation = "tradeRequestsForMe";
    state.viewType = "tradeRequestList";
    state.viewObject = null;
  },
  showTradeRequestsByMe(state) {
    state.navigation = "tradeRequestsByMe";
    state.viewType = "tradeRequestList";
    state.viewObject = null;
  },
  showATradeRequestsForMe(state, trId) {
    state.navigation = "tradeRequestsForMe";
    state.viewType = "tradeRequestDetail";
    state.viewObject = trId;
  },
  showATradeRequestsByMe(state, trId) {
    state.navigation = "tradeRequestsByMe";
    state.viewType = "tradeRequestDetail";
    state.viewObject = trId;
  },
  gotTradeRequestsByMe(state, tradeRequests) {
    state.tradeRequestsByMe = tradeRequests;

  },
  gotTradeRequestsForMe(state, tradeRequests) {
    state.tradeRequestsForMe = tradeRequests;
  }
}
