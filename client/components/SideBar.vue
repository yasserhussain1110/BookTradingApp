<template>
  <div class="side-nav-bar-container" v-bind:class="{'side-nav-bar-container-hidden': !sideBarExpanded}">
    <div v-show="sideBarExpanded" class="side-nav-bar">
      <ul class="parent-list">
        <li
          class="nav option"
          v-on:click="showAllBooks"
          v-bind:class="{'nav-selected': isSelected('allBooks')}">
          <a
            class="link parent-link no-sub-link">
            All Books
          </a>
        </li>

        <li
          class="nav option"
          v-if="isLoggedIn"
          v-on:click="showAllMyBooks"
          v-bind:class="{'nav-selected': isSelected('myBooks')}">
          <a
            class="link parent-link no-sub-link">
            My Books
          </a>
        </li>

        <li
          class="nav option"
          v-if="isLoggedIn"
          v-on:click="showAddBookForm"
          v-bind:class="{'nav-selected': isSelected('addBook')}">
          <a
            class="link parent-link no-sub-link">
            Add Book
          </a>
        </li>

        <li
          class="nav option"
          v-if="isLoggedIn"
          v-on:click="showTradeRequestsByMe"
          v-bind:class="{'nav-selected': isSelected('tradeRequestsByMe')}">
          <a
            class="link parent-link no-sub-link">
            Requests By Me
          </a>
        </li>

        <li
          class="nav option"
          v-if="isLoggedIn"
          v-on:click="showTradeRequestsForMe"
          v-bind:class="{'nav-selected': isSelected('tradeRequestsForMe')}">
          <a
            class="link parent-link no-sub-link">
            Requests For Me
          </a>
        </li>
      </ul>
    </div>

    <div class="collapse" v-on:click="changeSideBarState">
      <div class="hamburger-bar"></div>
      <div class="hamburger-bar"></div>
      <div class="hamburger-bar"></div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';

  export default {
    name: 'side-bar',
    data() {
      return {
        sideBarExpanded: false
      };
    },
    computed: {
      ...mapState({
        navigation: state => state.navigation,
        isLoggedIn: state => state.isLoggedIn
      })
    },
    watch: {
      isLoggedIn: function () {
        this.sideBarExpanded = this.isLoggedIn;
      }
    },
    methods: {
      changeSideBarState: function () {
        this.sideBarExpanded = !this.sideBarExpanded;
      },
      isSelected: function (nav) {
        return this.navigation === nav;
      },
      ...mapMutations([
        'showAllBooks', // map this.showAllBooks() to this.$store.commit('showAllBooks')
        'showAllMyBooks',
        'showAddBookForm',
        'showTradeRequestsByMe',
        'showTradeRequestsForMe'
      ])
    }
  }
</script>

<style scoped>
  .hamburger-bar{
    width: 35px;
    height: 6px;
    background-color: #062E65;
    margin: 5px auto;
    border-radius: 10px;
  }

  .hamburger-bar:nth-of-type(1) {
    margin-top: 9px;
  }

  .collapse {
    padding: 5px;
    text-align: center;
    color: black;
    position: absolute;
    width: 45px;
    height: 45px;
    left: -10px;
    top: -60px;
    opacity: 0.5;
    background-color: white;
    border-radius: 50%;
    transition: opacity 0.5s;
  }

  .collapse:hover {
    cursor: pointer;
    opacity: 0.9;
  }

  .side-nav-bar-container {
    position: relative;

    /*
     * This property makes the sidebar width fixed
     * to 160px. In short it means,
     * in case of this flexbox -
     * don't grow, don't shrink width 160px
     * See - http://stackoverflow.com/questions/23794713/flexbox-two-fixed-width-columns-one-flexible
     */

    flex: 0 0 160px;
    /*
     * 0% height collapses
     * flex-box so that its height does not match parent anymore
     * which then allows it to grow according to its contents
     * See - http://stackoverflow.com/questions/27575779/prevent-a-flex-items-height-from-expanding-to-match-other-flex-items
     */

    height: 0%;
    text-align: left;
    background-color: #B5C588;
    border-radius: 10px;
    margin-top: 30px;
    display: inline-block;
    color: white;
    transition: flex 0.5s ease;
  }

  .side-nav-bar {
    padding: 5px 5px 5px 10px;
  }

  .side-nav-bar-container-hidden {
    flex: 0 0 0;
  }

  .nav > a {
    margin-left: 15px;
  }

  .nav-selected {
    background-color: #0D3C55;
  }

  .nav-selected > a {
    margin-left: 4px;
  }

  .nav-selected:before {
    content: '▶';
    font-size: 0.7em;
    vertical-align: text-top;
  }

  li {
    list-style: none;
    padding: 5px;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;
  }

  .option {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 0.85em;
    margin: 5px 6px 5px 0px;
  }

  .no-sub-link {
    margin-left: 0;
  }

</style>
