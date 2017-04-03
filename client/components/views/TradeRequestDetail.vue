<template>
  <div class="trade-request-detail">
    <section class="requested-book-section">
      <h3>Requested Book</h3>
      <div class="gallery">
        <a><img :src="requestedBook.thumbnailURL"/></a>
      </div>

      <div class="info-box">
        <div class="info">
          <strong><u>{{requestedBook.title}}</u></strong>
        </div>
        <div class="info">
          <span><p>{{requestedBookClippedDescription}}</p></span>
        </div>
        <div class="info">
          <label><strong><u>Owned By:</u></strong></label>
          <span>{{tradeRequest._requestee.email}}</span>
        </div>
      </div>
    </section>
    <section class="exhange-book-section">
      <h3>Exchange Book</h3>
      <div class="gallery">
        <a><img :src="exchangeBook.thumbnailURL"/></a>
      </div>

      <div class="info-box">
        <div class="info">
          <strong><u>{{exchangeBook.title}}</u></strong>
        </div>
        <div class="info">
          <span><p>{{exchangeBookClippedDescription}}</p></span>
        </div>
        <div class="info">
          <label><strong><u>Owned By:</u></strong></label>
          <span>{{tradeRequest._requester.email}}</span>
        </div>
      </div>
    </section>

    <div class="status-box">
      <label><strong><u>Status:</u></strong></label>
      <span v-bind:class="tradeRequest.status">{{tradeRequest.status}}</span>
    </div>

    <template v-if="tradeRequest.status==='opened'">
      <template v-if="navigation==='tradeRequestsForMe'">
        <div class="action-buttons">
          <button v-on:click="acceptTradeRequestForMe" class="accept">Accept</button>
          <button v-on:click="rejectTradeRequestForMe" class="reject">Reject</button>
        </div>
      </template>
      <template v-else-if="navigation==='tradeRequestsByMe'">
        <div class="action-buttons">
          <button v-on:click="closeTradeRequestByMe" class="close">Close</button>
        </div>
      </template>
    </template>

  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {getTradeRequestsByMe, getTradeRequestsForMe, getBooks} from './../../lib/fetchMoreInfo';
  import {clip} from '../../lib/helper';

  export default {
    name: "trade-request-detail",
    computed: {
      ...mapState({
        viewObject: state => state.viewObject,
        navigation: state => state.navigation,
        token: state => state.token,
        user: state => state.user
      }),
      tradeRequest: function () {
        return this.viewObject;
      },
      requestedBook: function () {
        return this.tradeRequest._requestedBook;
      },
      exchangeBook: function () {
        return this.tradeRequest._exchangeBook;
      },
      requestedBookClippedDescription: function () {
        return clip(this.requestedBook.description, 150);
      },
      exchangeBookClippedDescription: function () {
        return clip(this.exchangeBook.description, 150);
      }
    },
    methods: {
      closeTradeRequestByMe: function () {
        let {tradeRequest} = this;
        this.$http.post(`/tradeRequests/${tradeRequest._id}/close`, {}, {headers: {'x-auth': this.token}})
          .then(r => {
            this.$store.commit('closeTradeRequestByMe', tradeRequest);
          })
          .catch(e => console.log(e));
      },

      rejectTradeRequestForMe: function () {
        let {tradeRequest} = this;
        this.$http.post(`/tradeRequests/${tradeRequest._id}/reject`, {}, {headers: {'x-auth': this.token}})
          .then(r => {
            this.$store.commit('rejectTradeRequestForMe', tradeRequest);
          })
          .catch(e => console.log(e));
      },
      acceptTradeRequestForMe: function () {
        let {tradeRequest} = this;
        this.$http.post(`/tradeRequests/${tradeRequest._id}/accept`, {}, {headers: {'x-auth': this.token}})
          .then(r => {
            getTradeRequestsByMe.bind(this)();
            getTradeRequestsForMe.bind(this)();
            getBooks.bind(this)();
            this.tradeRequest.status = "accepted";
          })
          .catch(e => console.log(e));
      },
    }
  }
</script>

<style scoped>

  section {
    margin: 20px 0;
  }

  .trade-request-detail {
    width: 80%;
  }

  .info-box {
    margin: 0 10px 10px 50px;
    padding: 10px;
    display: inline-block;
    vertical-align: top;
    width: 50%;
    border-radius: 5px;
    background-color: #D3D3D3;
  }

  .info {
    padding: 10px;
    margin: 5px 0;
  }

  .action-buttons {
    text-align: center;
  }

  button {
    margin: 5px;
    padding: 7px;
    border-radius: 5px;
    border: 2px solid #ADD8E6;
    outline: none;
    font-size: 1.0em;
    font-weight: bolder;
    box-shadow: 2px 2px gray, 2px 0px gray;
  }

  button:active {
    box-shadow: none;
    text-shadow: none;
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

  .accept {
    color: white;
    background-color: green;
    text-shadow: 1px 1px blue;
  }

  .reject {
    text-shadow: 1px 1px black;
    background-color: red;
    color: #FFFFFF;
  }

  .close {
    color: black;
    background-color: yellow;
    text-shadow: 1px 1px white;
  }

  .status-box {
    text-align: center;
    margin: 10px;
    padding: 10px;
  }
</style>
