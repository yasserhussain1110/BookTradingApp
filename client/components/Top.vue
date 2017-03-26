<template>
  <div class="top">
    <h1>{{ msg }}</h1>

    <div class="side-buttons"
         v-bind:class="{hidden: showForm}"
    >
      <button v-on:click="showLoginForm">Login</button>
      <button v-on:click="showSignUpForm">SignUp</button>
    </div>

    <auth v-on:back="back" :showForm="showForm" :form="form"></auth>
  </div>
</template>

<script>
  import Auth from './Auth';

  export default {
    name: 'top',
    components: {
      Auth
    },
    data () {
      return {
        msg: 'Book Trading App',
        showForm: false,
        form: ""
      }
    },
    methods: {
      showLoginForm: function () {
        this.form = "LogIn";
        this.showForm = true;
      },
      showSignUpForm: function () {
        this.form = "SignUp";
        this.showForm = true;
      },
      back: function () {
        this.showForm = false;
        this.form = "";
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
