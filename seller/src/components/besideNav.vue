<template>
  <div>
    <div class="panel-group" id="accordion">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#collapseOne">
              商家信息
            </a>
          </h4>
        </div>
        <div id="collapseOne" class="panel-collapse collapse in">
          <ul class="panel-body">
            <li @click="go">我的店铺</li>
            <li>商家详情</li>
          </ul>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#collapseTwo">
              商品管理
            </a>
          </h4>
        </div>
        <div id="collapseTwo" class="panel-collapse collapse">
          <ul class="panel-body">
            <li>
              <router-link class="nav-router" to="/index/addGood">添加商品</router-link>
            </li>
            <li>
              <router-link class="nav-router" to="/index/myGood">已上架商品</router-link>
            </li>
            <li>
              <router-link class="nav-router" to="/index/cancelGood">已下架商品</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion"
               href="#collapseThree">
              订单管理
            </a>
          </h4>
        </div>
        <div id="collapseThree" class="panel-collapse collapse">
          <ul class="panel-body">
            <li>
              <router-link class="nav-router" to="/index">已完成订单</router-link>
            </li>
            <li>
              <router-link class="nav-router" to="/index">未完成订单</router-link>
            </li>
            <li>
              <router-link class="nav-router" to="/index">异常订单</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      go() {
        this.$router.push('/index/information');
      }
    }
  }
</script>
<style>
  .panel-body {
    padding: 0;
    margin: 0;
  }
  .panel-title {
    text-align: center;
    font-weight: bolder;
  }
  ul {
    text-align: center;
  }
  li {
    list-style-type: none;
    padding: 6px 0;
  }
  /*.panel-default>.panel-heading {*/
    /*background-color: #0088A8;*/
  /*}*/
  .nav-router {
    color: black;
  }
</style>
