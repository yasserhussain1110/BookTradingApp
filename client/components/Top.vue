<template>
  <div class="top">
    <h1>{{ msg }}</h1>

    <div class="side-buttons"
         v-bind:class="{hidden: showAuthForm}">
      <div v-if="isLoggedIn">
        <button v-on:click="logout">Logout</button>
      </div>
      <div v-else>
        <button v-on:click="showLoginForm">Login</button>
        <button v-on:click="showSignUpForm">SignUp</button>
      </div>
    </div>

    <auth
      :formName="formName"
      :showAuthForm="showAuthForm"
      v-on:back="back"
      v-on:showFlash="doShowFlash"
      v-on:hideFlash="doHideFlash">
    </auth>
    <flash :formName="formName" :showFlash="showFlash"></flash>
  </div>
</template>

<script>
  import Auth from './Auth';
  import Flash from './Flash.vue';
  import {mapState} from 'vuex';

  export default {
    name: 'top',
    components: {
      Auth,
      Flash
    },
    data () {
      return {
        msg: 'Book Trading App',
        showAuthForm: false,
        formName: "",
        showFlash: false
      }
    },
    computed: mapState({
      isLoggedIn: state => state.isLoggedIn
    }),
    methods: {
      logout: function () {
        localStorage.removeItem('auth-token');
        this.$store.commit('loggedOff');
        this.$store.commit('showAllBooks');
      },
      showLoginForm: function () {
        this.showAuthForm = true;
        this.formName = "LogIn";
      },
      showSignUpForm: function () {
        this.showAuthForm = true;
        this.formName = "SignUp";
      },
      back: function () {
        this.showAuthForm = false;
      },
      doShowFlash: function () {
        this.showFlash = true;
      },
      doHideFlash: function () {
        this.showFlash = false;
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

  @media screen and (max-width: 649px) {
    .side-buttons {
      right: 35%;
      top: 40px;
    }
  }
</style>
