<!-- 我的订单 -->
<template>
	<div>
	  <el-tabs v-model="activeName" @tab-click="handleClick">
	    <el-tab-pane label="全部订单" name="1">全部订单</el-tab-pane>
	    <el-tab-pane label="待付款订单" name="2">待付款订单</el-tab-pane>
	    <el-tab-pane label="已完成订单" name="3">已完成订单</el-tab-pane>
	  </el-tabs>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: '1'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      // add() {
      // 	this.activeName = (parseInt(this.activeName, 10) + 1).toString();
      // 	console.log(this.activeName);
      // }
    }
  };
</script>
