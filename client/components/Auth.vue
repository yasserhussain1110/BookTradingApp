<template>
  <div class="auth"
       v-bind:class="showOrHideForm">
    <div>
      <label>{{ this.form }}</label>
    </div>
    <div class="input-field">
      <input placeholder="Email                                              "/>
    </div>
    <div class="input-field">
      <input placeholder="Password                                        "/>
    </div>
    <div class="button-field">
      <button class="auth-button">
        <span>{{ this.form }}</span>
        <img src="../assets/svg/login-icon.svg"/>
      </button>
    </div>
  </div>
</template>

<script>

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

<style>
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
    font-weight: 600;
    width: 200px;
    font-family: 'FontAwesome';
  }

  img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-left: 5px;
  }
</style>
