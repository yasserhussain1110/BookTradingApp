<template>
  <div class="flash" v-bind:class="{show: showFlash}">
    <strong>Success!!</strong>
    <span>{{flashMessage}}</span>
  </div>
</template>

<script>
  export default {
    name: 'logged-in-flash',
    props: ["showFlash", "formName"],
    computed: {
      flashMessage: function () {
        if (this.formName === "SignUp") {
          return "Thank you for signing up!";
        } else if (this.formName === "LogIn") {
          return "You are logged In!";
        }
      }
    }
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
    transition: top 0.8s;
  }

  .show {
    top: 10px;
  }
</style>
