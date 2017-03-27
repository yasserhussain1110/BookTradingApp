<template>
  <div class="book-list">
    <div class="gallery" v-for="(book, index) in booksToShow">
      <a><img :src="book.thumbnailURL"/></a>
    </div>

    <div class="pager">
      <div class="page">1</div>
      <div class="page">2</div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'book-list',
    computed: {
      ...mapState({
        whoseBooks: state => state.navigation,
        books: state => state.books,
        userId: state => state.user._id
      }),
      booksToShow: function () {
        if (this.whoseBooks === "allBooks") {
          return this.books;
        } else if (this.whoseBooks === "myBooks") {
          return this.books.filter(book => book._ownedBy === this.userId);
        } else {
          console.log("Severe Error: Neither 'allBooks' nor 'myBooks'");
        }
      }
    }
  }
</script>

<style scoped>
  .book-list {
    box-sizing: border-box;
    vertical-align: top;
    margin-top: 30px;
    margin-left: 20px;
    background-color: white;
    border: 2px solid #008000;
    border-radius: 20px;
    padding: 2% 3% 1% 3%;
    height: 0%;
  }

  .gallery {
    background-color: white;
    display: inline-block;
    margin: 5px;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 5px;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
    cursor: pointer;
  }

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
