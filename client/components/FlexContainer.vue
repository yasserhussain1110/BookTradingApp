<template>
  <div class="flex-container">
    <side-bar></side-bar>
    <book-box></book-box>
  </div>
</template>

<script>
  import SideBar from './SideBar.vue';
  import BookBox from './BookBox.vue';

  export default {
    name: 'flex-container',
    components: {
      SideBar,
      BookBox
    }
  }
</script>

<style scoped>

  .flex-container {
    display: flex;
  }

</style>
