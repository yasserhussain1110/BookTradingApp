<template>
  <div id="app">
    <top></top>
    <app-body></app-body>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import Top from './components/Top';
  import AppBody from './components/AppBody.vue';
  import AppFooter from './components/Footer.vue';
  import {mapState} from 'vuex';
  import {
    getBooks,
    getIdentity,
    getTradeRequestsByMe,
    getTradeRequestsForMe
  }  from './lib/fetchMoreInfo';
  import 'font-awesome/css/font-awesome.css';

  export default {
    name: 'app',
    components: {
      Top,
      AppBody,
      AppFooter
    },
    computed: {
      ...mapState({
        token: state => state.token
      })
    },
    created: function () {
      getIdentity.bind(this)().then(() => {
        getTradeRequestsByMe.bind(this)();
        getTradeRequestsForMe.bind(this)();
      }).catch(e => {
        console.error(e);
      });
      getBooks.bind(this)();
    }
  }
</script>

<style>

  * {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: lightblue;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin: 20px auto;
    width: 95%;
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

  a:hover, button:hover {
    text-decoration: none;
    cursor: pointer;
  }

  .previous {
    position: absolute;
    top: 5px;
    left: 5px;
    height: 35px;
    width: 40px;
    padding-top: 3px;
    background-color: rgba(173, 216, 230, 0.5);
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.5s;
  }

  .previous:hover {
    background-color: rgba(173, 216, 230, 1);
  }

  .previous > i {
    color: green;
  }
</style>
