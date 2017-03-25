<template>
  <div class="book-box">
    <div class="gallery">
      <a>
        <img
          src="http://books.google.com/books/content?id=fyVtp3EMxasC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/>
      </a>
    </div>

    <div class="gallery">
      <a>
        <img
          src="http://books.google.com/books/content?id=aJ1av7UFBPwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/>
      </a>
    </div>

    <div class="gallery">
      <a>
        <img
          src="http://books.google.com/books/content?id=aJ1av7UFBPwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/>
      </a>
    </div>

    <div class="gallery">
      <a>
        <img
          src="http://books.google.com/books/content?id=aJ1av7UFBPwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/>
      </a>
    </div>

    <div class="gallery">
      <a>
        <img
          src="http://books.google.com/books/content?id=aJ1av7UFBPwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/>
      </a>
    </div>

    <div class="gallery">
      <a>
        <img
          src="http://books.google.com/books/content?id=aJ1av7UFBPwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/>
      </a>
    </div>

    <div class="gallery">
      <a>
        <img
          src="http://books.google.com/books/content?id=aJ1av7UFBPwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/>
      </a>
    </div>

    <div class="gallery">
      <a>
        <img
          src="http://books.google.com/books/content?id=aJ1av7UFBPwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/>
      </a>
    </div>

    <div class="gallery">
      <a>
        <img
          src="http://books.google.com/books/content?id=aJ1av7UFBPwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/>
      </a>
    </div>
  </div>
</template>

<script>
  import Auth from './Auth';

  export default {
    name: 'book-box',
    data () {
      return {}
    },
    methods: {
      aMethod: function () {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .book-box {
    box-sizing: border-box;
    vertical-align: top;
    margin-top: 30px;
    margin-left: 20px;
    background-color: white;
    border: 2px solid #008000;
    border-radius: 20px;
    padding: 10px;
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

</style>
