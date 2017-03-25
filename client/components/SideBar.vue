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
      <i class="fa fa-arrow-left fa-3x collapse-icon" aria-hidden="true"></i>
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

<style>
  .side-nav-bar {
    position: relative;
    width: 16%;
    text-align: left;
    background-color: #B5C588;
    padding: 20px 0 20px 10px;
    border-radius: 10px;
    margin-top: 30px;
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
    margin: 10px 10px;
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
    width: 60px;
    height: 60px;
    left: -30px;
    top: 60px;
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
    margin-top: 5px;
    margin-left: 8px;
  }
</style>
