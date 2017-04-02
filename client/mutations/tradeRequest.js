export default {
  closeTradeRequestByMe(state, index){
    state.tradeRequestsByMe = [...state.tradeRequestsByMe.slice(0, index),
      Object.assign({}, state.tradeRequestsByMe[index], {status: "closed"}),
      ...state.tradeRequestsByMe.slice(index + 1)
    ];
  },
  rejectTradeRequestForMe(state, index){
    state.tradeRequestsByMe = [...state.tradeRequestsByMe.slice(0, index),
      Object.assign({}, state.tradeRequestsByMe[index], {status: "rejected"}),
      ...state.tradeRequestsByMe.slice(index + 1)
    ];
  },
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
