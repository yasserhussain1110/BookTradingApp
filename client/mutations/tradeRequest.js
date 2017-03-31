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
  }
}
