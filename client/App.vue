<template>
  <div id="app">
    <top></top>
    <flex-container></flex-container>
  </div>
</template>

<script>
  import Top from './components/Top';
  import FlexContainer from './components/FlexContainer.vue';

  export default {
    name: 'app',
    components: {
      Top,
      FlexContainer
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
