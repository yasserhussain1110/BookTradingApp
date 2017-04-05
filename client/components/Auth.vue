<template>
  <div v-on:keyup.enter="submit" class="auth"
       v-bind:class="showOrHideClass">
    <div class="form">
      <label>{{ formName }}</label>
    </div>
    <div class="input-field">
      <input type="text" v-on:focus="hideErrors" v-model="email" placeholder="Your Email                                      "/>
    </div>
    <div class="input-field">
      <input type="password" v-on:focus="hideErrors" v-model="password" placeholder="Your Password                                "/>
    </div>
    <div class="button-field">
      <button v-on:click="submit" class="auth-button">
        <span>{{ formName }}</span>
        <img src="../assets/svg/login-icon.svg"/>
      </button>
    </div>

    <div class="back-container">
      <div v-on:click="goBack" class="back">
        <div class="x">X</div>
      </div>
    </div>

    <div class="error-box" v-show="showingError">
      <div class="error-message" v-for="errorMessage in errorMessageList">{{errorMessage}}</div>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {login, signup, getTradeRequestsByMe, getTradeRequestsForMe} from '../lib/fetchMoreInfo';

  const formToActionsMap = {
    LogIn: {
      action: login,
      errorMessage: "Login failure"
    },
    SignUp: {
      action: signup,
      errorMessage: "Signup failure"
    }
  };

  export default {
    name: 'auth',
    props: ["showAuthForm", "formName"],
    data () {
      return {
        email: "",
        password: "",
        showingError: false,
        errorMessageList: []
      }
    },
    computed: {
      showOrHideClass: function () {
        return this.showAuthForm ? "show" : "hide";
      },
      ...mapState({
        token: state => state.token
      })
    },
    methods: {
      goBack: function () {
        this.$emit('back');
        this.resetFields();
        this.hideErrors();
      },
      hideErrors: function () {
        this.showingError = false;
      },
      showErrors: function (errorList) {
        this.errorMessageList = errorList;
        this.showingError = true;
      },
      resetFields: function () {
        this.password = "";
        this.email = "";
      },
      submit: function () {
        let {email, password} = this;
        if (!email || !password) {
          return this.showErrors(["Email or password cannot be empty"]);
        }
        formToActionsMap[this.formName].action.bind(this)(email, password).then(() => {
          this.resetFields();
          this.$emit("back");
          this.$emit("showFlash");
          setTimeout(() => {
            this.$emit('hideFlash');
          }, 2000);

          getTradeRequestsByMe.bind(this)();
          getTradeRequestsForMe.bind(this)();
        }).catch(e => {
          let errorList;
          if (e.body.errors) {
            errorList = Object.keys(e.body.errors).map(key => e.body.errors[key].message)
          } else {
            errorList = [formToActionsMap[this.formName].errorMessage];
          }

          this.resetFields();
          this.showErrors(errorList);
        })
      }
    }
  }
</script>

<style scoped>
  .error-box {
    position: absolute;
    background-color: red;
    top: 250px;
    left: 2px;
    width: 95%;
    opacity: 0.9;
    font-size: 0.9em;
    padding: 5px;
    text-align: center;
    color: white;
    border-radius: 15px;
  }

  .error-message {
    margin: 10px;
  }

  .auth {
    position: absolute;
    right: 0;
    top: 0;
    background-color: #383838;
    border-radius: 5px;
    text-align: left;
    padding: 20px 30px;
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

  .back-container {
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    background-color: inherit;
    overflow: hidden;
    position: absolute;
  }

  .back {
    top: -4px;
    right: -4px;
    position: absolute;
    height: 30px;
    width: 30px;
    background-color: #ED4337;
    border-radius: 50%;
    box-shadow: -1px 1px gray;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
  }

  .x {
    margin-top: 8px;
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
