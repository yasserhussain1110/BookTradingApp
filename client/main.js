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
    selectedForm: "",
    showAuthForm: false,
    user: null,
    books: [],
    token: "",
    justLoggedIn: false,
    navigationSection: {
      name: "my-books", // my-books, my-requests
      subSection: null   // requests-by-me, requests-for-me
    }
  },
  mutations: {
    noSubSection(state){
      state.navigationSection.subSection = null;
    },
    changeSubSection(state, sub) {
      if (state.navigationSection.name === "my-requests") {
        state.navigationSection.subSection = sub;
      }
    },
    changeMainNav(state, newNav) {
      state.navigationSection.name = newNav;
      state.navigationSection.subSection = null;
    },
    loggedIn (state) {
      state.isLoggedIn = true;
    },
    loggedOff(state) {
      state.isLoggedIn = false;
    },
    changeSelectedForm(state, formName) {
      state.selectedForm = formName;
    },
    gotUser(state, user) {
      state.user = user;
    },
    gotBooks(state, books) {
      console.log("got books", books);
      state.books = books;
    },
    gotToken(state, token) {
      state.token = token;
    },
    showAuthForm(state) {
      state.showAuthForm = true;
    },
    hideAuthForm(state) {
      state.showAuthForm = false;
    },
    hasJustLoggedIn(state) {
      state.justLoggedIn = true;
    },
    someTimePassedSinceLoggingIn(state) {
      state.justLoggedIn = false;
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
