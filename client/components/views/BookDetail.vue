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
        <span>{{bookOwner.email}}</span>
      </div>

      <div class="info">
        <label><strong><u>Added On:</u></strong></label>
        <span>{{creationDate}}</span>
      </div>
    </div>

    <div v-if="user" class="action-buttons">
      <button v-on:click="" class="trade">Trade</button>
      <button v-if="whoseBooks==='myBooks'" v-on:click="deleteBook" class="delete">Delete</button>
    </div>
  </div>

</template>

<script>
  import {convertMongoIdToReadableDate} from '../../lib/helper';
  import {mapState} from 'vuex';
  import {clip} from '../../lib/helper';
  export default {
    name: "book-detail",
    data() {
      return {
        /**
         * Need a new property 'bookOwner', can't add owner
         * info to 'bookShowing' prop because it is a
         * computed prop. Can't really update it.
         */
        bookOwner: {email: ""}
      };
    },
    beforeMount() {
      this.$http.get(`/users/${this.bookShowing._ownedBy}`, {
        headers: {'x-auth': this.token}
      }).then(res => {
        this.bookOwner = res.body;
      }).catch(e => {
        console.error(e);
      });
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
      }
    },
    methods: {
      deleteBook: function () {
        this.$http.delete(`/books/${this.bookShowing._id}`, {
          headers: {'x-auth': this.token}
        }).then(() => {
          this.$store.commit('removeBook', this.bookShowing._id);
        }).catch(e => {
          console.error(e);
        });
      }
    }
  }
</script>

<style scoped>
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
    margin-top: 15px;
  }

  .info-box {
    display: inline-block;
    vertical-align: top;
    margin: 20px 20px 20px 20px;
    padding: 10px;
    background-color: lightgray;
    border-radius: 10px;
    width: 650px;
  }

  .info {
    margin: 10px;
  }


</style>
