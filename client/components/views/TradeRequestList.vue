<template>
  <div @click="activeDropDown = -1" class="trade-request-list">
    <table>
      <tr>
        <th>Sl. No.</th>
        <th>Requested Book</th>
        <th>Exchange Book</th>
        <th>{{navigation === "tradeRequestsByMe" ? "Requested From" : "Requester"}}</th>
        <th>Status</th>
      </tr>
      <tr v-for="(tradeRequest, index) in requestsToShow">
        <td>{{index + 1}}</td>
        <td class="book">{{tradeRequest._requestedBook.title}}</td>
        <td class="book">{{tradeRequest._exchangeBook.title}}</td>
        <td>{{navigation === "tradeRequestsByMe" ? tradeRequest._requestee.email : tradeRequest._requester.email}}</td>
        <td>
          <div class="status-action-box">
            <span
              v-bind:class="tradeRequest.status"
              class="status">{{tradeRequest.status}}</span>
            <span class="divider"></span>
            <span class="fa fa-caret-down drop"
                  v-on:click.stop="changeActiveDropDown(index)"></span>
            <div
              v-if="navigation==='tradeRequestsByMe'"
              v-bind:class="{'show': index===activeDropDown}"
              class="action-container">
              <div
                v-if="tradeRequest.status === 'opened'"
                v-on:click="closeTradeRequestByMe(tradeRequest, index)"
                class="action">
                Close
              </div>
              <div v-on:click="showTradeRequestDetail(tradeRequest)" class="action">Detail..</div>
            </div>

            <div
              v-else-if="navigation==='tradeRequestsForMe'"
              v-bind:class="{'show': index===activeDropDown}"
              class="action-container">
              <div
                v-if="tradeRequest.status === 'opened'"
                v-on:click="acceptTradeRequestForMe(tradeRequest, index)" class="action">
                Accept
              </div>
              <div v-if="tradeRequest.status === 'opened'"
                   v-on:click="rejectTradeRequestForMe(tradeRequest, index)" class="action">
                Reject
              </div>
              <div v-on:click="showTradeRequestDetail(tradeRequest)" class="action">Detail..</div>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import 'font-awesome/css/font-awesome.css';
  import {mapState} from 'vuex';
  import {getTradeRequestsByMe, getTradeRequestsForMe, getBooks} from './../../lib/fetchMoreInfo';

  export default {
    name: "trade-request-list",
    data() {
      return {
        activeDropDown: -1
      }
    },
    methods: {
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
  }

  table {
    margin: auto;
    border-spacing: 0 10px;
  }

  tr {
    background-color: #EFEFEF;
  }

  td, th {
    padding: 2px 5px;
  }

  .book {
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
    background-color: gray;
    color: white;
    width: 85px;
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
