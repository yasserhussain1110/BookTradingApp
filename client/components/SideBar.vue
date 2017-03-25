<template>
  <div class="side-nav-bar">
    <ul class="parent-list">
      <li class="nav option">
        <a class="link parent-link no-sub-link" href="#">All Books</a>
      </li>

      <li class="nav option">
        <a class="link parent-link no-sub-link" href="#">My Books</a>
      </li>

      <li class="nav option">
        <a class="link parent-link" href="#">
          <span class="arrow">&#9654;</span>
          <span>My Requests</span>
        </a>

        <ul class="sub-options-holder">
          <li class="nav sub-option">Requests By Me</li>
          <li class="nav sub-option">Requests For Me</li>
        </ul>
      </li>
    </ul>

    <div class="collapse">
      <i class="fa fa-arrow-left fa-2x collapse-icon" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
  import 'font-awesome/css/font-awesome.css';

  export default {
    name: 'side-bar',
    props: [],
    created: function () {
      console.log(this);
    },
    data () {
      return {}
    }
  }
</script>

<style scoped>
  .side-nav-bar {
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
    padding: 10px 0 10px 0.5%;
    border-radius: 10px;
    margin-top: 30px;
    display: inline-block;
  }

  /* #0D3C55 */
  .side-nav-bar * {
    color: black;
  }

  .arrow {
    font-size: 0.7em;
    vertical-align: text-top;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  .option {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 0.85em;
    margin: 10px 2%;
  }

  .sub-option {
    font-size: 1em;
    margin-left: 20px;
    margin-top: 8px;
    font-weight: normal;
  }

  .no-sub-link {
    margin-left: 12px;
  }

  .collapse {
    position: absolute;
    width: 40px;
    height: 40px;
    left: -20px;
    top: 55px;
    opacity: 0.4;
    background-color: white;
    border-radius: 50%;
    transition: opacity 0.5s;
  }

  .collapse:hover {
    cursor: pointer;
    opacity: 0.9;
  }

  .collapse-icon {
    vertical-align: middle;
    margin-top: 4px;
    margin-left: 6px;
  }
</style>
