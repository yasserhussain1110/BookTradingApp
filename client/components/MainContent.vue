<template>
  <div class="main-content">
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

  .main-content {
    display: flex;
  }

</style>
