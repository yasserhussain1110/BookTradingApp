// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource';
import Vuex from 'vuex';

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
  mutations: {
    loggedIn (state) {
      state.isLoggedIn = true;
    },
    loggedOff(state) {
      state.isLoggedIn = false;
    },
    gotUser(state, user) {
      state.user = user;
    },
    attachOwnerInfoToBook(state, {book, owner}){
      let bookIndex = state.books.indexOf(book);
      state.books = [
        ...state.books.slice(0, bookIndex),
        Object.assign({}, state.books[bookIndex], {_ownedBy: owner}),
        ...state.books.slice(bookIndex + 1)
      ];
      state.viewObject = state.books[bookIndex];
    },
    removeBook(state, bookId) {
      state.books = state.books.filter(book => book._id !== bookId);
    },
    gotBooks(state, books) {
      state.books = [...state.books, ...books];
    },
    gotToken(state, token) {
      state.token = token;
    },
    showAllBooks(state) {
      state.navigation = "allBooks";
      state.viewType = "bookList";
      state.viewObject = null;
    },
    showAllMyBooks(state) {
      state.navigation = "myBooks";
      state.viewType = "bookList";
      state.viewObject = null;
    },
    showAParticularBook(state, bookObject) {
      state.navigation = "allBooks";
      state.viewType = "bookDetail";
      state.viewObject = bookObject;
    },
    showMyParticularBook(state, bookObject) {
      state.navigation = "myBooks";
      state.viewType = "bookDetail";
      state.viewObject = bookObject;
    },
    showTradeRequestsForMe(state) {
      state.navigation = "tradeRequestsForMe";
      state.viewType = "tradeRequestList";
      state.viewObject = null;
    },
    showTradeRequestsByMe(state) {
      state.navigation = "tradeRequestsByMe";
      state.viewType = "tradeRequestList";
      state.viewObject = null;
    },
    showATradeRequestsForMe(state, trId) {
      state.navigation = "tradeRequestsForMe";
      state.viewType = "tradeRequestDetail";
      state.viewObject = trId;
    },
    showATradeRequestsByMe(state, trId) {
      state.navigation = "tradeRequestsByMe";
      state.viewType = "tradeRequestDetail";
      state.viewObject = trId;
    },
    showAddBookForm(state) {
      state.navigation = "addBook";
      state.viewType = "addBookForm";
      state.viewObject = null;
    }
  }
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
