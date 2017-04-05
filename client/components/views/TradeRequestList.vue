<template>
  <div v-on:click="activeDropDown = -1" class="trade-request-list">
    <table>
      <tr>
        <th>#</th>
        <th>Requested Book</th>
        <th>Exchange Book</th>
        <th>{{navigation === "tradeRequestsByMe" ? "Requested From" : "Requester"}}</th>
        <th>Status</th>
      </tr>
      <tr v-for="(tradeRequest, index) in requestsToShow">
        <td class="sl"><span v-on:click="showTradeRequestDetail(tradeRequest)">{{index + 1}}</span></td>
        <td class="book">
          <span
            v-on:click="showBook(tradeRequest._requestedBook, 'requestedBook')">
            {{tradeRequest._requestedBook.title}}
          </span>
        </td>
        <td class="book">
          <span
            v-on:click="showBook(tradeRequest._exchangeBook, 'exchangeBook')">
            {{tradeRequest._exchangeBook ? tradeRequest._exchangeBook.title : ""}}
          </span>
        </td>
        <td>{{navigation === "tradeRequestsByMe" ? tradeRequest._requestee.email : tradeRequest._requester.email}}</td>
        <td>
          <div class="status-action-box">
            <span
              v-bind:class="tradeRequest.status"
              class="status">{{tradeRequest.status}}</span>
            <span class="divider"></span>
            <span class="fa fa-caret-down drop"
                  v-on:click.stop="changeActiveDropDown(index)"></span>

            <div class="action-container"
                 v-bind:class="{'show': index===activeDropDown}">
              <template v-if="tradeRequest.status === 'opened'">
                <template v-if="navigation==='tradeRequestsByMe'">
                  <div class="action" v-on:click="closeTradeRequestByMe(tradeRequest, index)">Close</div>
                </template>
                <template v-else-if="navigation==='tradeRequestsForMe'">
                  <div v-on:click="acceptTradeRequestForMe(tradeRequest, index)" class="action">Accept</div>
                  <div v-on:click="rejectTradeRequestForMe(tradeRequest, index)" class="action">Reject</div>
                </template>
              </template>
              <div v-on:click="showTradeRequestDetail(tradeRequest)" class="action">Detail..</div>
            </div>

          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {getTradeRequestsByMe, getTradeRequestsForMe, getBooks} from './../../lib/fetchMoreInfo';

  // Assumption :- navigation == tradeRequestsByMe
  const simplifiedIsMyBook = bookType => {
    if (bookType === "exchangeBook") {
      return true;
    } else if (bookType === "requestedBook") {
      return false;
    }
  };

  export default {
    name: "trade-request-list",
    data() {
      return {
        activeDropDown: -1
      }
    },
    methods: {
      isMyBook(navigation, bookType) {
        if (navigation === "tradeRequestsByMe") {
          return simplifiedIsMyBook(bookType);
        } else if (navigation === "tradeRequestsForMe") {
          return !simplifiedIsMyBook(bookType);
        }
      },
      showBook: function (book, bookType) {
        if (this.isMyBook(this.navigation, bookType)) {
          this.$store.commit('showMyParticularBook', book._id);
        } else {
          this.$store.commit('showAParticularBook', book._id);
        }
      },
      changeActiveDropDown: function (index) {
        if (this.activeDropDown === index) {
          this.activeDropDown = -1
        } else {
          this.activeDropDown = index;
        }
      },
      closeTradeRequestByMe: function (tradeRequest, index) {
        this.$http.post(`/tradeRequests/${tradeRequest._id}/close`, {}, {headers: {'x-auth': this.token}})
          .then(r => {
            this.$store.commit('closeTradeRequestByMe', index);
          })
          .catch(e => console.log(e));
      },
      rejectTradeRequestForMe: function (tradeRequest, index) {
        this.$http.post(`/tradeRequests/${tradeRequest._id}/close`, {}, {headers: {'x-auth': this.token}})
          .then(r => {
            this.$store.commit('rejectTradeRequestForMe', index);
          })
          .catch(e => console.log(e));
      },
      acceptTradeRequestForMe: function (tradeRequest, index) {
        this.$http.post(`/tradeRequests/${tradeRequest._id}/accept`, {}, {headers: {'x-auth': this.token}})
          .then(r => {
            getTradeRequestsByMe.bind(this)();
            getTradeRequestsForMe.bind(this)();
            getBooks.bind(this)();
          })
          .catch(e => console.log(e));
      },
      showTradeRequestDetail: function (tradeRequest) {
        if (this.navigation === "tradeRequestsByMe") {
          this.$store.commit('showAParticularTradeRequestsByMe', tradeRequest);
        } else if (this.navigation === "tradeRequestsForMe") {
          this.$store.commit('showAParticularTradeRequestsForMe', tradeRequest);
        }
      }
    },
    computed: {
      ...mapState({
        tradeRequestsByMe: state => state.tradeRequestsByMe,
        tradeRequestsForMe: state => state.tradeRequestsForMe,
        navigation: state => state.navigation,
        token: state => state.token
      }),
      requestsToShow: function () {
        if (this.navigation === "tradeRequestsByMe") {
          return this.tradeRequestsByMe;
        } else if (this.navigation === "tradeRequestsForMe") {
          return this.tradeRequestsForMe;
        }
      }
    },
    watch: {
      navigation: function () {
        this.activeDropDown = -1;
      }
    }
  }
</script>

<style scoped>
  .trade-request-list {
    width: 80%;
    text-align: center;
    min-height: 300px;
  }

  table {
    margin: auto;
    width: 90%;
    border-spacing: 0 10px;
  }

  tr {
    background-color: #EFEFEF;
    box-shadow: 0 1px 1px black;
  }

  td, th {
    padding: 2px 5px;
    width: 10%;
  }

  th:nth-of-type(1) {
    width: 5%;
  }

  td:nth-of-type(1) {
    width: 5%;
  }

  .sl > span {
    cursor: pointer;
    text-decoration: underline;
  }

  .book > span {
    text-decoration: underline;
    cursor: pointer;
  }

  .book:nth-of-type(2) {
    color: orange;
  }

  .book:nth-of-type(3) {
    color: #0D3C55;
  }

  .status-action-box {
    position: relative;
    color: black;
    border-radius: 5px;
    background-color: white;
    font-weight: 100;
    padding: 5px 5px;
    margin: 2px 10px;
  }

  .divider:after {
    content: "|";
  }

  .opened {
    color: green;
  }

  .closed {
    color: darkorange;
  }

  .rejected {
    color: red;
  }

  .accepted {
    color: blue;
  }

  .action-container {
    position: absolute;
    top: 35px;
    left: 0;
    right: 0;
    background-color: gray;
    color: white;
    border-radius: 5px;
    display: none;
    z-index: 1;
  }

  .action {
    padding: 5px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
  }

  .action:hover {
    background-color: #EFEFEF;
    color: black
  }

  .show {
    display: initial;
  }

  .drop {
    cursor: pointer;
  }


</style>
