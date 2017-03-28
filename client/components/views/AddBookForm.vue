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
      v-bind:class="{clickable: selectedBooks.length}"
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
  </div>
</template>

<script>
  import 'font-awesome/css/font-awesome.css';
  import {mapState} from 'vuex';

  const clip = content => {
    if (content.length > 150) {
      return content.slice(0, 147) + "...";
    } else {
      return content;
    }
  };

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
        selectedBooks: [],
        books: []
      }
    },
    methods: {
      sendBooksToServer: function () {
        let booksToSend = this.selectedBooks.map(booksIndex => this.books[booksIndex]);
        this.$http.put('/books', booksToSend, {
          headers: {
            'x-auth': this.token
          }
        }).then(res => {
          /*
           Response structure example
           {
             2 : {
               success: true,
               book : {
                 title: "Harry Potter",
                 ...
               }
             },
             7: {
               success: false,
               error: {
                 errorMsg: "Something bad happened",
                 ...
               }
             }
           }
           */
          let books = Object.keys(res.body).map(key => {
            return res.body[key];
          }).map(sendBookResult => {
            return sendBookResult.book;
          });
          this.$store.commit('gotBooks', books);
          this.selectedBooks = [];
          console.log("all books added");
        }).catch(res => {
          let successfullyAddedBooks = Object.keys(res.body).map(key => {
            return res.body[key];
          }).filter(sendBookResult => {
            return sendBookResult.status;
          }).map(sendBookResult => {
            return sendBookResult.book;
          });
          this.$store.commit('gotBooks', books);
          this.selectedBooks = [];
          console.log(`${successfullyAddedBooks.length} books added successfully`);
        });
      },
      isSelected: function (bookIndex) {
        return this.selectedBooks.includes(bookIndex);
      },
      clickOnBook: function (bookIndex) {
        this.hideTooltip();
        // [0, 5, 8] selected book indices
        let bookListIndex = this.selectedBooks.indexOf(bookIndex);
        if (bookListIndex === -1) {
          this.selectedBooks = [...this.selectedBooks, bookIndex];
        } else {
          this.selectedBooks = [
            ...this.selectedBooks.slice(0, bookListIndex),
            ...this.selectedBooks.slice(bookListIndex + 1)
          ];
        }
      },
      hideTooltip: function () {
        document.querySelector(".tooltip").style.display = "none";
      },
      showTooltip: function (book, event) {
        document.querySelector(".tooltip").style.top = (event.pageY - 160) + "px";
        document.querySelector(".tooltip").style.left = (event.pageX - 300) + "px";
        document.querySelector(".tooltip").style.display = "initial";
        document.querySelector(".tooltip .title").innerHTML = book.title;
        document.querySelector(".tooltip .description").innerHTML = clip(book.description);
      },
      search: function () {
        let {title} = this;
        if (title) {
          this.$http.post('/searchBook', {title})
            .then(res => {
              let books = res.body;
              this.books = books;
              this.selectedBooks = [];
            })
            .catch(e => console.log(e));
        }
      }
    }
  }
</script>

<style scoped>
  .tooltip {
    text-align: left;
    background-color: lightsteelblue;
    color: black;
    top: 0;
    left: 0;
    position: absolute;
    width: 300px;
    padding: 20px 40px;
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
    width: 360px;
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

  .gallery {
    background-color: white;
    display: inline-block;
    margin: 5px;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 5px;
  }

  .selected {
    border: 4px solid green;
    padding: 2px;
  }

  a:hover {
    cursor: pointer;
  }
</style>
