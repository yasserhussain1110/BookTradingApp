<template>
  <div id="app">
    <top></top>
    <side-bar></side-bar>
  </div>
</template>

<script>
  import Top from './components/Top';
  import SideBar from './components/SideBar.vue';

  export default {
    name: 'app',
    components: {
      Top,
      SideBar
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
    text-align: center;
    color: #2c3e50;
    margin: 20px auto;
    width: 90%;
    height: 500px;
  }
</style>
