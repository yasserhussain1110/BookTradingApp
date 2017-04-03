export default {
  closeTradeRequestByMe(state, indexOrRequest){
    let index;
    if (typeof indexOrRequest === 'number') {
      index = indexOrRequest;
    } else {
      index = state.tradeRequestsByMe.indexOf(indexOrRequest);
    }
    state.tradeRequestsByMe = [...state.tradeRequestsByMe.slice(0, index),
      Object.assign({}, state.tradeRequestsByMe[index], {status: "closed"}),
      ...state.tradeRequestsByMe.slice(index + 1)
    ];
  },
  rejectTradeRequestForMe(state, indexOrRequest){
    let index;
    if (typeof indexOrRequest === 'number') {
      index = indexOrRequest;
    } else {
      index = state.tradeRequestsForMe.indexOf(indexOrRequest);
    }
    state.tradeRequestsForMe = [...state.tradeRequestsForMe.slice(0, index),
      Object.assign({}, state.tradeRequestsForMe[index], {status: "rejected"}),
      ...state.tradeRequestsForMe.slice(index + 1)
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
  showAParticularTradeRequestsForMe(state, trId) {
    state.navigation = "tradeRequestsForMe";
    state.viewType = "tradeRequestDetail";
    state.viewObject = trId;
  },
  showAParticularTradeRequestsByMe(state, trId) {
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
