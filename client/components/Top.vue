<template>
  <div class="top">
    <h1>{{ msg }}</h1>
    <div>
      <button>Login</button>
      <button>SignUp</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'top',
    data () {
      return {
        msg: 'Book Trading App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
