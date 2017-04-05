<template>
  <div class="book-detail">
    <div class="gallery">
      <a><img :src="bookShowing.thumbnailURL"/></a>
    </div>

    <div class="info-box">
      <div class="info">
        <span><u><strong>{{bookShowing.title}}</strong></u></span>
      </div>

      <div class="info">
        <span><p>{{clippedDescription}}</p></span>
      </div>

      <div class="info">
        <label><strong><u>Owned By:</u></strong></label>
        <span>{{bookOwnerEmail}}</span>
      </div>

      <div class="info">
        <label><strong><u>Added On:</u></strong></label>
        <span>{{creationDate}}</span>
      </div>
    </div>

    <div v-if="user" class="action-buttons">
      <button v-on:click="showTradeBox" class="trade">Trade</button>
      <button v-if="whoseBooks==='myBooks'" v-on:click="deleteBook" class="delete">Delete</button>
    </div>

    <trade-modal v-on:close="closeTradeBox" :show="showModal"></trade-modal>

    <div class="previous">
      <i v-on:click="goPrevious" class="fa fa-arrow-left fa-2x"
         v-bind:class="" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
  import {convertMongoIdToReadableDate} from '../../lib/helper';
  import {mapState} from 'vuex';
  import {clip} from '../../lib/helper';
  import TradeModal from './TradeModal.vue';

  export default {
    name: "book-detail",
    components: {
      TradeModal
    },
    data(){
      return {
        showModal: false
      }
    },
    beforeMount() {
      if (typeof this.bookShowing._ownedBy === 'string') {
        this.$http.get(`/users/${this.bookShowing._ownedBy}`).then(res => {
          this.$store.commit('attachOwnerInfoToBook', {book: this.bookShowing, owner: res.body});
        }).catch(e => {
          console.error(e);
        });
      }
    },
    computed: {
      ...mapState({
        whoseBooks: state => state.navigation,
        bookShowing: state => state.viewObject,
        user: state => state.user,
        token: state => state.token
      }),
      creationDate: function () {
        return convertMongoIdToReadableDate(this.bookShowing._id);
      },
      clippedDescription: function () {
        return clip(this.bookShowing.description, 500);
      },
      bookOwnerEmail: function () {
        if (typeof this.bookShowing._ownedBy === 'string') {
          return "";
        } else {
          return this.bookShowing._ownedBy.email;
        }
      }
    },
    methods: {
      goPrevious: function () {
        this.$store.commit('showAllBooks');
      },
      showTradeBox: function () {
        this.showModal = true;
      },
      closeTradeBox: function () {
        this.showModal = false;
      },
      deleteBook: function () {
        this.$http.delete(`/books/${this.bookShowing._id}`, {
          headers: {'x-auth': this.token}
        }).then(() => {
          this.$store.commit('removeBook', this.bookShowing._id);
          this.$store.commit('showAllMyBooks');
        }).catch(e => {
          console.error(e);
        });
      }
    }
  }
</script>

<style scoped>
  .book-detail {
    width: 100%;
  }

  .previous {
    top: 95px;
    left: 220px;
  }

  button {
    margin: 10px 5px 8px 5px;
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

  .trade {
    color: darkred;
    background-color: orange;
    text-shadow: 1px 1px white;
  }

  .delete {
    text-shadow: 1px 1px black;
    background-color: red;
    color: #FFFFFF;
  }

  .gallery {
    margin-top: 20px;
  }

  .info-box {
    display: inline-block;
    vertical-align: top;
    margin: 20px 20px 20px 20px;
    padding: 10px;
    background-color: lightgray;
    border-radius: 10px;
    width: 70%;
  }

  .info {
    margin: 10px;
  }

  @media screen and (max-width: 1120px) {
    .gallery {
      margin-top: 6%;
    }

    .info-box {
      margin-top: 6%;
    }
  }

  @media screen and (max-width: 1020px) {
    .info-box {
      margin-left: 0;
      margin-right: 0;
    }
  }

  @media screen and (max-width: 872px) {
    .info-box {
      width: 58%;
      padding-left: 0;
      padding-right: 0;
    }
  }

  @media screen and (max-width: 727px) and (min-width: 634px) {
    .gallery, .info-box {
      margin-top: 10%;
    }
  }

  @media screen and (max-width: 634px) {
    .book-detail {
      text-align: center;
    }

    .info-box {
      text-align: left;
      width: 63%;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
