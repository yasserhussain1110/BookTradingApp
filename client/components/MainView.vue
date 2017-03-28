<template>
  <book-list class="view" v-if="viewType === 'bookList'"></book-list>
  <book-detail class="view" v-else-if="viewType === 'bookDetail'"></book-detail>
  <add-book-form class="view" v-else-if="viewType === 'addBookForm'"></add-book-form>
  <trade-request-detail class="view" v-else-if="viewType === 'tradeRequestDetail'"></trade-request-detail>
  <trade-request-list class="view" v-else-if="viewType === 'tradeRequestList'"></trade-request-list>
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
  .view {
    box-sizing: border-box;
    vertical-align: top;
    margin-top: 30px;
    margin-left: 20px;
    background-color: white;
    border: 2px solid #008000;
    border-radius: 20px;
    padding: 2% 3% 1% 3%;
    height: 0%;
  }
</style>
