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

    <div class="pager">
      <div class="page">1</div>

      <div class="page">2</div>
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
