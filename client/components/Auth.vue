<template>
  <div class="auth">
    <div>
      <label>LOG IN</label>
    </div>
    <div class="input-field">
      <input placeholder="Email                                              "/>
    </div>
    <div class="input-field">
      <input placeholder="Password                                        "/>
    </div>
    <div class="button-field">
      <button class="auth-button">
        <span>Login</span>
        <img src="../assets/svg/login-icon.svg"/>
      </button>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'auth',
    data () {
      return {}
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
    z-index: 0;
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
