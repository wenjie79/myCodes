<!--用户页面-->
<template>
	<div class="row">
		<div class="bsideNav col-xs-1 col-xs-offset-1">
			<el-menu
		      default-active="2"
		      class="el-menu-vertical-demo">
		      <el-menu-item index="1">
		        <i class="el-icon-menu"></i>
		        <span slot="title">
		        	<router-link class="btns"  to="/">
		        		<span class="pos">我的资料</span>
		        	</router-link>
		    	</span>
		      </el-menu-item>
		      <el-menu-item index="2">
		        <i class="el-icon-star-on"></i>
		        <span slot="title">
		        	<router-link class="btns"  to="/myCollect">
		        		<span class="pos">我的收藏</span>
		        	</router-link>
		    	</span>
		      </el-menu-item>
		      <el-menu-item index="3">
		        <i class="el-icon-sold-out"></i>
		        <span slot="title">
		        	<router-link class="btns"  to="/address">
		        		<span class="pos">我的购物车</span>
		        	</router-link>
		    	</span>
		      </el-menu-item>
		      <el-menu-item index="4">
		        <i class="el-icon-tickets"></i>
		        <span slot="title">
		        	<router-link class="btns" to="/cart">
		        		<span class="pos">我的订单</span>
		        	</router-link>
		        </span>
		      </el-menu-item>
		      <el-menu-item index="5">
		        <i class="el-icon-phone-outline"></i>
		        <span slot="title">
		        	<router-link class="btns"  to="/address">
		        		<span class="pos">我的地址</span>
		        	</router-link>
		    	</span>
		      </el-menu-item>
		    </el-menu>
		</div>
		<div class="content col-xs-8">
			<router-view></router-view>
		</div>
	</div>
</template>
<style scoped>
	.bsideNav {
		width: 160px;
		float: left;
	}
	.btns {
		display: inline-block;
		width: 100%;
		height: 100%;
		color: black;
		text-decoration: none;
	}
</style>
