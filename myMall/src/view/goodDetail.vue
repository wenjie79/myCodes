<!--商品详情-->
<template>
	<div class="detail row">
		<div class="col-xs-offset-2 information">
			<div class="row">
				<!--<div class="col-xs-5">-->
					<!--<img class="img" src="../assets/2.jpg" alt="">-->
				<!--</div>-->
        <div class="col-xs-5" style="width: 300px;height: 210px;position: relative">
          <img style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: auto;max-width: 90%;max-height: 100%;" src="../assets/2.jpg" alt="">
        </div>
				<div class="col-xs-6">
					<div class="title info">{{good.name}}</div>
					<div class="popularity">
						<div class="popular">人气 <span class="numb">11123</span></div>
						<div class="sell">销量 <span class="numb">12312</span></div>
					</div>
					<div class="info">售价 <span class="price">￥ {{good.price}}</span></div>
					<div class="number info">
						数量 <el-input-number v-model="num" size="small" :min="1"></el-input-number>
					</div>
					<div class="butns">
						<el-button>立即购买</el-button>
  						<el-button type="danger">加入购物车</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-offset-2 del">
			<el-tabs type="border-card">
			  <el-tab-pane label="商品详情">
			  	<describe :describe="goodDescribe"></describe>
			  </el-tab-pane>
			  <el-tab-pane label="累计评价">
			  	<debt :debates="debate" @submit="success"></debt>
			  </el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
import Describe from '../components/desc'
import Debt from '../components/debate'
	export default {
		data() {
			return {
				num: 1,
				goodDescribe: '',
				good: {},
				debate: []
			};
		},
		components: {
			Describe,
			Debt
		},
		methods: {
			getDetail() {
				this.$http.get('/api/v2/' + this.$route.params.id)
				.then((res)=>{
					this.good = res.data[0];
					this.goodDescribe = res.data[0].describe;
					this.debate = res.data[0].debate;
					for (var i = 0; i < res.data[0].debate.length; i++) {
						this.debate[i].debate_date = new Date(parseInt(res.data[0].debate[i].debate_date)).toLocaleString().replace(/:\d{1,2}$/,' ');
					}
					this.debate.reverse();
				}, (err)=>{
					console.log(err);
				})
			},
			success() {
				this.getDetail();
			}
		},
		mounted() {
			this.getDetail();
			this.goodId = this.$route.params.id
		}
	}
</script>
<style scoped>
	.information {
		width: 800px;
		height: 300px;
		border: 1px solid #ccc;
	}
	.img {
		display: inline-block;
		width: 100%;
		margin: 40px 10px 0 10px;
	}
	.el-input-number {
		width: 120px;
		margin-left: 20px;
	}
	.info{
		margin-top: 15px;
	}
	.title {
		margin-top: 25px;
		font-weight: bolder;
	}
	.price {
		font-size: 18px;
		color: #FF2D2D;
		margin-left: 20px;
	}
	.popularity {
		width: 100%;
		height: 40px;
		background-color: #ccc;
		margin-top: 15px;
	}
	.butns{
		position: absolute;
		top: 250px;
	}
	.el-button {
		position: relative;
		left: 50px;
	}
	.popular, .sell {
		float: left;
		width: 40%;
		padding-left: 20px;
		text-align: center;
		margin-top: 10px;
	}
	.numb {
		color: #FF2D2D;
		font-size: 16px;
	}
	.del {
		width: 800px;
		margin-top: 20PX;
	}
</style>
