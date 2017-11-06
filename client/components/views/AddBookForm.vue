<template>
  <div class="add-book-form">
    <h2>Add A Book</h2>
    <div class="search-field">
      <i class="fa fa-search"></i>
      <input v-model="title" placeholder="Enter Book Name to Search"/>
    </div>
    <div v-on:click="search" class="button search-button">GO!</div>
    <div class="filler"></div>
    <div
      class="button add-button"
      v-bind:class="{clickable: Object.keys(selectedBooks).length}"
      v-on:click="sendBooksToServer">
      Add Book(s)
    </div>

    <div class="search-results">
      <div
        v-bind:class="{selected: isSelected(index)}"
        class="gallery" v-for="(book, index) in books">
        <a><img
          v-on:click="clickOnBook(index)"
          v-on:mouseout="hideTooltip"
          v-on:mousemove="showTooltip(book, $event)" :src="book.thumbnailURL"/></a>
      </div>
    </div>

    <div class="tooltip">
      <label><u><strong>Title:</strong></u></label>
      <span class="title"></span>
      <br/>
      <label><u><strong>Description:</strong></u></label>
      <span class="description"></span>
    </div>

    <div v-show="showStatus" class="status-box">
      <span>{{statusMessage}}</span>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import {mapState} from 'vuex';
  import {clip} from '../../lib/helper'

  export default {
    name: "add-book-form",
    computed: {
      ...mapState({
        token: state => state.token
      })
    },
    data () {
      return {
        title: "",
        selectedBooks: {},
        books: [],
        showStatus: false,
        statusMessage: ""
      }
    },
    methods: {
      sendBooksToServer: function () {
        if (_.isEmpty(this.selectedBooks)) return;

        let booksToSend = Object.keys(this.selectedBooks).map(bookIndex => this.books[bookIndex]);

        /** Response structure example for api PUT '/books'
         [
         {
           success: true,
           book: {
             title: "Harry Potter",
             ...
           }
         },
         {
           success: false,
           error: {
             errorMsg: "Something bad happened",
             ...
           }
         }
         ];
         **/

        this.$http.put('/books', booksToSend, {
          headers: {
            'x-auth': this.token
          }
        }).then(res => {
          let books = res.body.map(sendBookResult => sendBookResult.book);

          this.$store.commit('gotBooks', books);
          this.selectedBooks = {};
          console.log("all books added");
          this.showStatus = true;
          this.statusMessage = `${books.length} books added successfully`;
          setTimeout(() => {
            this.showStatus = false;
          }, 2000);
        }).catch(res => {
          let successfullyAddedBooks = res.body
            .filter(sendBookResult => sendBookResult.status)
            .map(sendBookResult => sendBookResult.book);

          this.$store.commit('gotBooks', books);
          this.selectedBooks = {};
          console.log(`${successfullyAddedBooks.length} books added successfully`);
          this.showStatus = true;
          this.statusMessage = `${successfullyAddedBooks.length} books added successfully`;
          setTimeout(() => {
            this.showStatus = false;
          }, 2000);
        });
      },
      isSelected: function (bookIndex) {
        return !!this.selectedBooks[bookIndex];
      },
      clickOnBook: function (bookIndex) {
        this.hideTooltip();
        if (this.selectedBooks[bookIndex]) {
          this.selectedBooks = _.pickBy(this.selectedBooks, (value, key) => key !== String(bookIndex));
        } else {
          this.selectedBooks = _.set(_.clone(this.selectedBooks), bookIndex, true);
        }
      },
      hideTooltip: function () {
        document.querySelector(".tooltip").style.display = "none";
      },
      showTooltip: function (book, event) {
        document.querySelector(".tooltip").style.top = (event.pageY - 230) + "px";
        document.querySelector(".tooltip").style.left = (event.pageX - 510) + "px";
        document.querySelector(".tooltip").style.display = "initial";
        document.querySelector(".tooltip .title").innerHTML = book.title;
        document.querySelector(".tooltip .description").innerHTML = clip(book.description, 150);
      },
      search: function () {
        let {title} = this;
        if (title) {
          this.$http.post('/search-book', {
            headers: {
              'x-auth': this.token
            }
          }, {title})
            .then(res => {
              let books = res.body;
              this.books = books;
              this.selectedBooks = {};
            })
            .catch(e => console.log(e));
        }
      }
    }
  }
</script>

<style scoped>
  .add-book-form {
    position: relative;
    width: 100%;
  }

  .status-box {
    background-color: lightblue;
    padding: 10px;
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 5px;
    text-align: center;
    color: black;
  }

  .tooltip {
    text-align: left;
    background-color: lightsteelblue;
    color: black;
    top: 0;
    left: 0;
    position: absolute;
    width: 250px;
    padding: 20px 10px;
    font-size: 15px;
    opacity: 0.8;
    border-radius: 30px;
    overflow: hidden;
    display: none;
  }

  .tooltip > span {
    margin: 2px;
    padding: 5px;
  }

  .search-results {
    display: block;
    margin-top: 20px;
  }

  div {
    display: inline-block;
  }

  h2 {
    text-align: center;
    margin-bottom: 35px;
  }

  .search-field {
    background-color: #DBD9CF;
    border-radius: 10px;
    padding: 5px;
  }

  .button {
    text-align: center;
    padding: 5px;
    background-color: forestgreen;
    border-radius: 5px;
    color: #eeeeee;
    box-shadow: 2px 2px #ADD8E6;
    margin-left: 20px;
  }

  .search-button {
    display: inline-block;
    width: 100px;
    cursor: pointer;
  }

  .filler {
    width: 35%;
  }

  .add-button {
    padding: 5px 10px;
    box-shadow: inset 0 0 0 1px #27496d;
    text-shadow: -2px 2px #346392;
    background-color: #ff9664;
    background-image: linear-gradient(top, #6496c8, #346392);
  }

  .clickable {
    box-shadow: 2px 2px #4BC2DD;
  }

  .clickable:hover {
    cursor: pointer;
  }

  .search-button:active, .clickable:active {
    transform: translate(2px, 2px);
    box-shadow: none;
  }

  input {
    border: none;
    background-color: inherit;
    width: 300px;
    height: 25px;
    font-size: 15px;
    outline: none;
  }

  .selected {
    border: 4px solid green;
    padding: 2px;
  }

  @media screen and (max-width: 1255px) {
    .filler {
      width: 30%;
    }
  }

  @media screen and (max-width: 1181px) {
    .filler {
      width: 20%;
    }
  }

  @media screen and (max-width: 1061px) {
    .filler {
      width: 10%;
    }
  }

  @media screen and (max-width: 968px) {
    .filler {
      display: none;
    }
  }

  @media screen and (max-width: 888px) {
    .search-field {
      display: block;
    }

    .button {
      margin-top: 20px;
    }
  }

  @media screen and (max-width: 850px) {
    .status-box {
      left: 20%;
      width: 60%;
      top: 45px;
      padding: 0;
    }
  }
</style>
