<template>
  <div id="app">
    <top></top>
    <app-body></app-body>
  </div>
</template>

<script>
  import Top from './components/Top';
  import AppBody from './components/AppBody.vue';

  export default {
    name: 'app',
    components: {
      Top,
      AppBody
    },
    created: function () {
      this.$http.get("/identity")
        .then(res => {
          let token = res.headers.map['x-auth'][0];
          let user = res.body;
          this.$store.commit('loggedIn');
          this.$store.commit('gotUser', user);
          this.$store.commit('gotToken', token);
        })
        .catch(res => {
          this.$store.commit('loggedOff');
        });

      this.$http.get('/books').then(res => {
        this.$store.commit('gotBooks', res.body);
      }).catch(e => console.log("weird error", e));
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
</style>
