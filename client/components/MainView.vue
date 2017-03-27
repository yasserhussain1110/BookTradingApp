<template>
  <book-list v-if="viewType === 'bookList'"></book-list>
  <book-detail v-else-if="viewType === 'bookDetail'"></book-detail>
  <add-book-form v-else-if="viewType === 'addBookForm'"></add-book-form>
  <trade-request-detail v-else-if="viewType === 'tradeRequestDetail'"></trade-request-detail>
  <trade-request-list v-else-if="viewType === 'tradeRequestList'"></trade-request-list>
</template>

<script>
  import {mapState} from 'vuex';
  import BookList from './views/BookList.vue';
  import BookDetail from './views/BookDetail.vue';
  import TradeRequestList from './views/TradeRequestList.vue';
  import TradeRequestDetail from './views/TradeRequestDetail.vue';
  import AddBookForm from './views/AddBookForm.vue';

  export default {
    name: 'main-view',
    components: {
      BookList,
      BookDetail,
      TradeRequestList,
      TradeRequestDetail,
      AddBookForm
    },
    computed: mapState({
      isLoggedIn: state => state.isLoggedIn,
      viewType: state => state.viewType
    }),
    data () {
      return {}
    },
    methods: {
      aMethod: function () {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
