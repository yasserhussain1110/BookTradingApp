<template>
  <div class="auth"
       v-bind:class="showOrHideForm">
    <div>
      <label>{{ form }}</label>
    </div>
    <div class="input-field">
      <input placeholder="Your Email                                      "/>
    </div>
    <div class="input-field">
      <input placeholder="Your Password                                "/>
    </div>
    <div class="button-field">
      <button class="auth-button">
        <span>{{ form }}</span>
        <img src="../assets/svg/login-icon.svg"/>
      </button>
    </div>
  </div>
</template>

<script>

  import 'font-awesome/css/font-awesome.css';

  export default {
    name: 'auth',
    props: ['showForm', 'form'],
    created: function () {
      console.log(this);
    },
    data () {
      return {}
    },
    computed: {
      showOrHideForm: function () {
        return {
          show: this.showForm,
          hide: !this.showForm,
        }
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
</style>
