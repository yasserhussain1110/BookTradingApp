<template>
  <div class="flash" v-bind:class="{show: show}">
    <strong>Success!!</strong>
    <span>You are logged In!</span>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'logged-in-flash',
    computed: mapState({
      show: state => state.justLoggedIn
    }),
  };
</script>

<style scoped>
  .flash {
    position: fixed;
    top: -40px;
    left: 20%;
    right: 20%;
    background-color: #DFF0D8;
    text-align: center;
    border-radius: 5px;
    z-index: 1;
    padding-top: 10px;
    padding-bottom: 10px;
    color: #3c763d;
    font-size: 0.9em;
    opacity: 0.9;
    transition: top 0.5s;
  }

  .show {
    top: 0;
  }
</style>
