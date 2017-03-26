<template>
  <div class="top">
    <h1>{{ msg }}</h1>

    <div class="side-buttons"
         v-bind:class="{hidden: showForm}">
      <div v-if="isLoggedIn">
        <button>Logout</button>
      </div>
      <div v-else>
        <button v-on:click="showLoginForm">Login</button>
        <button v-on:click="showSignUpForm">SignUp</button>
      </div>
    </div>

    <auth v-on:back="back"></auth>
  </div>
</template>

<script>
  import Auth from './Auth';
  import {mapState} from 'vuex';

  export default {
    name: 'top',
    components: {
      Auth
    },
    data () {
      return {
        msg: 'Book Trading App'
      }
    },
    computed: mapState({
      isLoggedIn: state => state.isLoggedIn,
      showForm: state => state.showAuthForm
    }),
    methods: {
      showLoginForm: function () {
        this.$store.commit('changeSelectedForm', "Login");
        this.$store.commit('showAuthForm');
      },
      showSignUpForm: function () {
        this.$store.commit('changeSelectedForm', "SignUp");
        this.$store.commit('showAuthForm');
      },
      back: function () {
        this.$store.commit('changeSelectedForm', "");
        this.$store.commit('hideAuthForm');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .top {
    position: relative;
    text-align: center;
  }

  h1 {
    display: inline-block;
  }

  .side-buttons {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
  }

  .side-buttons button:nth-of-type(1) {
    background-color: green;
    color: white;
  }

  .side-buttons button:nth-of-type(2) {
    background-color: #4BC2DD;
    color: black;
  }

  .side-buttons button {
    font-size: 1.14em;
    padding: 5px 0;
    border: 2px solid black;
    border-radius: 5px;
    width: 80px;
  }

  .side-buttons button:focus {
    outline: none;
  }

  .side-buttons button:hover {
    cursor: pointer;
  }

  button::-moz-focus-inner {
    border: 0;
  }

  .hidden {
    display: none;
  }
</style>
