<template>
  <transition name="slide-fade">
    <div v-on:click="back" class="modal-mask" v-show="show">
      <div v-on:click.stop="" class="modal-container">
        <h2>Creating New Trade Request</h2>
        <div class="trade-item trade-first-book">
          <div class="label-box">
            <label><strong><u>{{firstLabel}}</u></strong></label>
          </div>

          <div class="gallery"><a><img :src="bookShowing.thumbnailURL"/></a></div>
        </div>

        <div class="trade-item">
          <div v-show="whoseBooks==='allBooks'" class="question">
            <label>Add Exchange Book?</label>
            <input v-model="checkBoxClicked" type="checkbox"/>
          </div>

          <div class="action-buttons">
            <button v-on:click="trade" class="trade">Trade</button>
            <button v-on:click.stop="back" class="back">Back</button>
          </div>
        </div>

        <div v-show="showSecondBookList" class="trade-item trade-second-book">
          <div class="label-box">
            <label><strong><u>{{secondLabel}}</u></strong></label>
          </div>

          <div class="gallery-container">
            <div
              v-bind:class="{selected: secondBookIndex===index}"
              class="gallery" v-for="(book, index) in bookList">
              <a><img v-on:click="selectBook(index)" :src="book.thumbnailURL"/></a>
            </div>
          </div>
        </div>

        <div v-show="showError" class="error-box">{{errorMessage}}</div>
        <div v-show="tradeRequestSent" class="trade-status-box">Successfully sent trade request.</div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapState} from 'vuex';
  import {booksBelongingToMe, booksNotBelongingToMe, changePropForSometimeThenReset} from '../../lib/helper';
  import {getTradeRequestsByMe} from '../../lib/fetchMoreInfo';

  const initialState = {
    checkBoxClicked: false,
    secondBookIndex: -1,
    showError: false,
    errorMessage: "",
    tradeRequestSent: false
  };

  const labels = {
    "allBooks": {
      firstLabel: "Requested Book",
      secondLabel: "Book To Exchange"
    },
    "myBooks": {
      firstLabel: "Book To Exchange",
      secondLabel: "Select a book to request"
    }
  };

  export default {
    name: "trade-modal",
    props: ["show"],
    data() {
      return Object.assign({}, {}, initialState);
    },
    methods: {
      back: function () {
        this.resetFields();
        this.$emit("close");
      },
      resetFields(){
        Object.assign(this, initialState);
      },
      selectBook: function (index) {
        if (this.secondBookIndex === index) {
          this.secondBookIndex = -1;
        } else {
          this.secondBookIndex = index;
        }
      },
      getExchangeAndRequestedBooks: function () {
        let exchangeBook, requestedBook;
        if (this.whoseBooks === "myBooks") {
          exchangeBook = this.bookShowing;
          requestedBook = this.bookList[this.secondBookIndex];
        } else if (this.whoseBooks === "allBooks") {
          requestedBook = this.bookShowing;
          exchangeBook = this.bookList[this.secondBookIndex];
        }
        return {exchangeBook, requestedBook};
      },
      validate: function (requestedBook) {
        if (!requestedBook) {
          this.errorMessage = "Must request a book";
          changePropForSometimeThenReset(this, "showError", true, 3000);
          return false;
        } else {
          return true;
        }

      },
      trade: function () {
        let {exchangeBook, requestedBook} = this.getExchangeAndRequestedBooks();

        if (!this.validate(requestedBook)) return;

        let requestParams = {
          requestedBook,
          exchangeBook
        };

        this.$http.post('/tradeRequests', requestParams, {headers: {'x-auth': this.token}})
          .then(() => {
            changePropForSometimeThenReset(this, "tradeRequestSent", true, 3000);
            getTradeRequestsByMe.bind(this)();
          })
          .catch(e => {
            if (e.body && e.body.code === 11000) {
              this.errorMessage = "Cannot request same book twice";
            } else {
              this.errorMessage = "Some error occurred";
            }

            changePropForSometimeThenReset(this, "showError", true, 3000);
          });
      }
    },
    computed: {
      showSecondBookList: function () {
        return this.whoseBooks === "myBooks" ? true : this.checkBoxClicked;
      },
      ...mapState({
        whoseBooks: state => state.navigation,
        bookShowing: state => state.viewObject,
        user: state => state.user,
        token: state => state.token,
        books: state => state.books
      }),
      firstLabel: function () {
        return labels[this.whoseBooks].firstLabel;
      },
      secondLabel: function () {
        return labels[this.whoseBooks].secondLabel;
      },
      bookList: function () {
        if (this.whoseBooks === "myBooks") {
          return booksNotBelongingToMe(this.books, this.user._id);
        } else if (this.whoseBooks === "allBooks") {
          return booksBelongingToMe(this.books, this.user._id);
        }
      }
    }
  }
</script>


<style scoped>
  .error-box, .trade-status-box {
    color: white;
    padding: 5px;
    width: 30%;
    text-align: center;
    border-radius: 5px;
    font-weight: bolder;
  }

  .trade-status-box {
    background-color: green;
  }

  .error-box {
    background-color: red;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }

  label {
    text-align: center;
  }

  .trade-second-book {
    margin-left: 60px;
    margin-top: 20px;
    width: 50%;
    height: 80%;
  }

  .trade-second-book > div:nth-of-type(1) {
    text-align: center;
  }

  .gallery-container {
    overflow-y: scroll;
    height: 100%;
    margin-top: 5px;
  }

  .action-buttons {
    margin-left: 30px;
    margin-top: 15px;
  }

  .trade {
    background-color: darkorange;
  }

  .back {
    background-color: lightgreen;
  }

  .question {
    margin-top: 65px;
    margin-left: 20px;
  }

  .question input {
    margin-left: 10px;
    margin-top: -2px;
    width: 15px;
    height: 15px;
    vertical-align: middle;
  }

  .trade-first-book {
    padding: 10px;
    margin: 10px 10px;
    width: 17%;
  }

  strong {
    padding: 10px;
  }

  .modal-mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1;
  }

  .modal-container {
    margin: 50px auto;
    width: 80%;
    height: 78%;
    background-color: white;
    color: black;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 1px 2px blue, 0 -1px 2px blue;
  }

  h2 {
    text-align: center;
    font-size: 1.5em;
  }

  .trade-item {
    display: inline-block;
    vertical-align: top;
  }

  button {
    margin: 10px 5px 8px 5px;
    padding: 5px;
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

  .selected {
    border: 4px solid green;
    padding: 2px;
  }

  .label-box {
    min-width: 200px;
  }

  @media screen and (max-width: 1196px) {
    .trade-second-book {
      width: 50%;
    }

    .modal-container {
      width: 90%;
    }
  }

  @media screen and (max-width: 1196px) {
    .trade-second-book {
      width: 40%;
    }
  }

  @media screen and (max-width: 820px) {
    .trade-second-book {
      width: 30%;
    }
  }

  @media screen and (max-width: 670px) {
    .modal-mask {
      height: 2000px;
    }

    .modal-container {
      text-align: center;
      height: 50%;
    }

    .trade-item {
      display: block;
    }

    .gallery-container {
      height: 60%;
      width: 480px;
    }

    .trade-second-book {
      margin: 0;
    }

    .label-box {
      width: 450px;
    }

    .trade-first-book .gallery {
      margin-left: 185%;
    }
  }

</style>
