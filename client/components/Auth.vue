<template>
  <div class="auth"
       v-bind:class="showOrHideClass">
    <div>
      <label>{{ formName }}</label>
    </div>
    <div class="input-field">
      <input v-model="email" placeholder="Your Email                                      "/>
    </div>
    <div class="input-field">
      <input v-model="password" placeholder="Your Password                                "/>
    </div>
    <div class="button-field">
      <button v-on:click="submit" class="auth-button">
        <span>{{ formName }}</span>
        <img src="../assets/svg/login-icon.svg"/>
      </button>
    </div>

    <div v-on:click="goBack" class="back">
      <div class="x">X</div>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import 'font-awesome/css/font-awesome.css';

  export default {
    name: 'auth',
    created: function () {
      console.log(this);
    },
    data () {
      return {
        email: "",
        password: ""
      }
    },
    computed: mapState({
      formName: state => state.selectedForm,
      showOrHideClass: state => state.showAuthForm ? "show" : "hide"
    }),
    methods: {
      goBack: function () {
        this.$emit('back');
      },
      submit: function () {
        let {email, password} = this;
        this.$http.post('/login', {email, password})
          .then(res => {
            let token = res.headers.map['x-auth'][0];
            let user = res.user;
            this.$store.commit('loggedIn');
            this.$store.commit('gotUser', user);
            this.$store.commit('gotToken', token);
            this.$store.commit('hideAuthForm');
            this.$store.commit('hasJustLoggedIn');
            setTimeout(() => {
              this.$store.commit('someTimePassedSinceLoggingIn');
            }, 2000);
          })
          .catch(e => {
            console.log(e.body.error);
          });
      }
    }
  }
</script>

<style scoped>
  .auth {
    position: absolute;
    right: 0;
    top: 0;
    background-color: #383838;
    border-radius: 5px;
    text-align: left;
    padding: 20px 30px;
    overflow: hidden;
  }

  .show {
    z-index: 0;
    display: initial;
  }

  .hide {
    z-index: -1;
    display: none;
  }

  label {
    color: white;
    font-weight: 500;
    margin-bottom: 10px;
    display: inline-block;
  }

  .auth-button {
    width: 220px;
    font-weight: 600;
    font-size: 0.9em;
    background: green;
    margin: 10px 0;
    padding: 10px 10px;
    border: none;
    border-radius: 5px;
    color: white;
    box-shadow: -1px 1px #ADD8E6;
  }

  input {
    border: none;
    border-radius: 5px;
    margin: 10px 0;
    padding: 10px 10px;
    font-weight: 500;
    width: 200px;
    font-family: 'FontAwesome';
    font-size: 1.1em;
  }

  img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-left: 5px;
  }

  input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    font-size: 13px;
    font-weight: 600;
  }

  input::-moz-placeholder { /* Firefox 19+ */
    font-size: 10px;
    color: black;
    opacity: 0.6;
    font-weight: 600;
  }

  /*
   * How did I make a clipped button ?
   *
   * Absolutely positioned button on top of container form.
   *
   * Moved it slightly top right, so that the top & right portion
   * of the button came outside of the container.
   *
   * Next used css prop overflow hidden on container.
   */
  .back {
    height: 30px;
    width: 30px;
    background-color: #ED4337;
    border-radius: 50%;
    top: -5px;
    right: -5px;
    position: absolute;
    box-shadow: -1px 1px gray;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
  }

  .x {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 0.8em;
    font-weight: bolder;
  }

  .auth-button:hover, .back:hover {
    cursor: pointer;
  }

  .auth-button:active, .back:active {
    transform: translate(-1px, 1px);
    box-shadow: none;
  }

  .auth-button:focus, .back:focus {
    outline: none;
  }
</style>
