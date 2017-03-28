<template>
  <div class="add-book-form">
    <h2>Add A Book</h2>
    <div class="search-field">
      <i class="fa fa-search"></i>
      <input v-model="title" placeholder="Enter Book Name to Search"/>
    </div>
    <div v-on:click="search" class="button search-button">GO!</div>
    <div class="button add-button clickable">Add Book</div>

    <div class="search-results">
      <div class="gallery" v-for="(book, index) in books">
        <a><img v-on:mouseover="mouseOver(book, $event)" :src="book.thumbnailURL"/></a>
      </div>
    </div>
  </div>
</template>

<script>
  import 'font-awesome/css/font-awesome.css';
  export default {
    name: "add-book-form",
    data () {
      return {
        title: "",
        books: []
      }
    },
    methods: {
      mouseOver: function (book, event) {
        console.log(book);
        console.log(event);
      },
      search: function () {
        let {title} = this;
        if (title) {
          this.$http.post('/searchBook', {title})
            .then(res => {
              let books = res.body;
              this.books = books;
            })
            .catch(e => console.log(e));
        }
      }
    }
  }
</script>

<style scoped>

  .search-results {
    display: block;
    margin-top: 20px;
  }

  .add-book-form {
    margin-top: 30px;
    margin-left: 20px;
    background-color: white;
    border: 2px solid #008000;
    border-radius: 20px;
    padding: 2% 3% 5% 3%;
    height: 0%;
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

  .add-button {
    margin-left: 300px;
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

  a:hover {
    cursor: pointer;
  }
</style>
