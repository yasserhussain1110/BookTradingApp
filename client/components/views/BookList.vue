<template>
  <div class="book-list">
    <div class="gallery" v-for="(book, index) in booksToShow">
      <a v-on:click="showBookDetail(book)"><img :src="book.thumbnailURL"/></a>
    </div>

    <!-- Pagination
    <div class="pager">
      <div class="page">1</div>
      <div class="page">2</div>
    </div>
    -->
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {booksBelongingToMe} from '../../lib/helper';

  export default {
    name: 'book-list',
    computed: {
      ...mapState({
        whoseBooks: state => state.navigation,
        books: state => state.books,
        user: state => state.user
      }),
      booksToShow: function () {
        if (this.whoseBooks === "allBooks") {
          return this.books;
        } else if (this.whoseBooks === "myBooks") {
          return booksBelongingToMe(this.books, this.user._id);
        } else {
          console.log("Severe Error: Neither 'allBooks' nor 'myBooks'");
        }
      }
    },
    methods: {
      showBookDetail: function (book) {
        // If user has not logged in
        if (this.user === null) {
          return this.$store.commit('showAParticularBook', book);
        }

        if (this.whoseBooks === "myBooks") {
          this.$store.commit('showMyParticularBook', book);
        } else if (this.whoseBooks === "allBooks") {
          if (book._ownedBy === this.user._id) {
            this.$store.commit('showMyParticularBook', book);
          } else {
            this.$store.commit('showAParticularBook', book);
          }
        }
      }
    },
  }
</script>

<style scoped>

  .pager {
    text-align: center;
    margin-top: 50px;
  }

  .page {
    display: inline-block;
    width: 14px;
    height: 15px;
    padding: 10px 10px 10px 13px;
    background-color: #4BC2DD;
    border-radius: 8px;
    box-shadow: 2px 2px gray;
    color: black;
    margin: 0 5px;
  }

  .page:hover {
    cursor: pointer;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
  }

  .page:active {
    transform: translate(2px, 2px);
    box-shadow: none;
  }
</style>
