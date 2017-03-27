<template>
  <div class="app-body">
    <side-bar></side-bar>
    <main-view></main-view>
  </div>
</template>

<script>
  import SideBar from './SideBar.vue';
  import MainView from './MainView.vue';

  export default {
    name: 'app-body',
    components: {
      SideBar,
      MainView
    }
  }
</script>

<style scoped>

  .app-body {
    display: flex;
  }

</style>
