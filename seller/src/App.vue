<template>
  <div id="app">
    <div class="top">
      <div class="navbar-header logo">
        <a class="navbar-brand brand" href="#">
          <img class="img" alt="Brand" src="../static/logo.jpg" height="80px" width="80px">
        </a>
      </div>
      <div class="mall">
        <p class="name">懒人商城</p>
        <p class="url">lanren.com</p>
      </div>
      <ul class="mall user">
        <li class="head-img">
          <img :src="headImg" alt="" class="imgs img-circle">
        </li>
        <li class="dropdown list">
          <span id="myTabDrop1" class="dropdown-toggle"
             data-toggle="dropdown">
            {{userName}}
            <b class="caret"></b>
          </span>
          <ul class="dropdown-menu" role="menu" aria-labelledby="myTabDrop1">
            <li class="user-info">
             jmeter
            </li>
            <li  class="user-info">
              退出登录
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="router-view">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
//      userName: '',
//      headImg: ''
    };
  },
  computed: {
    userName: {
      get() {
        return  window.sessionStorage["seller"];
      }
    },
    headImg() {
      return window.sessionStorage["seller_img"];
    }
  }
//  updated() {
//    this.userName=window.sessionStorage["seller"];
//    this.headImg=window.sessionStorage["seller_img"];
//  }
}
</script>
<style scoped>
  .top {
    width: 100%;
    height: 80px;
    background-color: #eff4fa;
  }
  .brand {
    padding: 0;
  }
  .logo {
    float: left;
    width: 80px;
  }
  .mall {
    float: left;
    padding-top: 5px;
  }
  .name {
    font-size: 25px;
    color: #FF2D2D;
    font-weight: bold;
  }
  .url {
    color: #FF2D2D;
    margin: -15px 0 0 10px;
  }
  .user {
    position: fixed;
    top: 20px;
    right: 180px;
    z-index: 999;
  }
  .user > li {
    list-style-type: none;
  }
  .user-info {
    padding: 5px 0;
  }
  .user-info:hover {
    color: royalblue;
  }
  .dropdown-menu {
    min-width: 120px;
    padding: 5px 25px;
  }
  .head-img {
    width: 50px;
    height: 50px;
    float: left;
  }
  .list {
    float: left;
    margin-top: 15px;
  }
  .imgs {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 100%;
    max-height: 100%;
  }
</style>
