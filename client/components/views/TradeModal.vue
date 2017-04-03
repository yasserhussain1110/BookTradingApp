<template>
  <transition name="slide-fade">
    <div v-on:click="back" class="modal-mask" v-show="show">
      <div class="modal-container">
        <h2>Creating New Trade Request</h2>
        <div class="trade-item trade-first-book">
          <div>
            <label><strong><u>{{firstLabel}}</u></strong></label>
          </div>

          <div class="gallery"><a><img :src="bookShowing.thumbnailURL"/></a></div>
        </div>

        <div class="trade-item">
          <div class="question">
            <label>Add Exchange Book?</label>
            <input v-show="whoseBooks==='allBooks'" v-model="checkBoxClicked" type="checkbox"/>
          </div>

          <div class="action-buttons">
            <button class="trade">Trade</button>
            <button v-on:click.stop="back" class="back">Back</button>
          </div>
        </div>


        <div v-show="showSecondBookList" class="trade-item trade-second-book">
          <div>
            <label><strong><u>{{secondLabel}}</u></strong></label>
          </div>

          <div class="gallery" v-for="(book, index) in bookList">
            <a><img :src="book.thumbnailURL"/></a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapState} from 'vuex';

  const labels = {
    "allBooks": {
      firstLabel: "Requested Book",
      secondLabel: "Book To Exchange"
    },
    "myBooks": {
      firstLabel: "Book To Exchange",
      secondLabel: "Requested Book"
    }
  };

  export default {
    name: "trade-modal",
    props: ["show"],
    data() {
      return {
        checkBoxClicked: false
      }
    },
    methods: {
      back: function () {
        this.$emit("close");
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
          return this.books.filter(book => book._ownedBy !== this.user._id);
        } else if (this.whoseBooks === "allBooks") {
          return this.books.filter(book => book._ownedBy === this.user._id);
        }
      }
    }
  }
</script>


<style scoped>
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
    overflow-y: scroll;
    width: 50%;
    height: 80%;
  }

  .trade-second-book > div {
    text-align: center;
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

  .gallery {
    margin-top: 30px;
  }

  .modal-mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .5);
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

</style>
