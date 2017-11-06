// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: null,
    books: [],
    token: "",
    tradeRequestsByMe: [],
    tradeRequestsForMe: [],
    navigation: "allBooks", // One of [allBooks, myBooks, addBook, tradeRequestsByMe, tradeRequestsForMe ]
    viewType: "bookList",   // One of [bookDetail, bookList, tradeRequestDetail, tradeRequestList, addBookForm]
    viewObject: null
  },
  mutations
});

Vue.config.productionTip = false;
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: {App}
});
