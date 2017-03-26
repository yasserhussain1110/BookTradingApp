<template>
  <div id="app">
    <logged-in-flash></logged-in-flash>
    <top></top>
    <main-content></main-content>
  </div>
</template>

<script>
  import Top from './components/Top';
  import MainContent from './components/MainContent.vue';
  import LoggedInFlash from './components/LoggedInFlash.vue';

  export default {
    name: 'app',
    components: {
      Top,
      MainContent,
      LoggedInFlash
    },
    created: function () {
      this.$http.get('/books').then(res => {
        this.$store.commit('gotBooks', res.body);
      }).catch(e => console.log("weird error", e));

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
</style>
