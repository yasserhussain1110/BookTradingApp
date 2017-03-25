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
