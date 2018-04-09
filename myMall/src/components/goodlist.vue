<!--商品列表-->
<template>
	<div class="col-xs-offset-1">
		<div v-if="goods == ''">
			<empty></empty>
		</div>
		<div class="lists">
			<div v-for="list in goods">
				<div class="border">
					<div class="part" @click='getDetail(list._id)'>
						<div style="width: 257px;height: 220px;position: relative">
              <img class="img-rounded" :src="list.thumb" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: 0;width: 100%;max-width: 100%;max-height: 100%;">
            </div>
						<div class="price">¥{{list.price}}</div>
						<div>{{list.name}}</div>
					</div>
					<div class="btns">
						<el-button class="btn" @click="collect(list._id)"><i class="glyphicon glyphicon-star-empty"></i>收藏</el-button>
						<el-button class="btn" @click="carts(list)"><i class="glyphicon glyphicon-shopping-cart">加入购物车</i></el-button>
					</div>
			</div>
		</div>
		</div>
		 <button class="cart1 cart2" @click="display" v-bind:class="{cart3: dialog}">
		 	<i v-if="!dialog" class="el-icon-d-arrow-left"></i>
		 	<i v-else class="el-icon-d-arrow-right"></i>购物车
		 </button>
		 <card :dialog.sync="dialog" :change="change"></card>
		<div class="pagina col-xs-12">
			<div >
				<el-pagination
			      @current-change="getGoods(start)"
			      :current-page.sync="start"
			      :page-size="limit"
			       background
			      layout="total, prev, pager, next"
			      :total="total">
			    </el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
  import Empty from './empty'
  import card from './myCard'
  export default {
    data() {
      return {
      	limit: 8,
        start: 1,
        change: false, // 购物车是否发生变化
      	dialog: false,
      };
    },
    components: {
    	Empty,
    	card
    },
    methods:{
    	getGoods(start) { // 获取商品
        this.$store.commit('getStart', start);
        console.log(start);
    	},
    	getDetail(id) {
    		  this.$router.push({path: '/detail/'+ id});
    	},
    	collect(good) { // 加入收藏
    		if (window.sessionStorage["user"]) {
    			this.$http.post('/api/v1/collect/' + window.sessionStorage["user_id"] + '/' + good ).then((res) => {
    					this.$message({
				          message: '加入收藏成功',
				          type: 'success'
				        });
	    			}, (err) => {
	    			console.log(err);
    			});
    		} else {
    			 this.$message.error('您还未登录，请登录后进行操作');
    		}
    	},
      carts(good) { // 加入购物车
    	  this.dialog = true;
    	  this.newGood = good;
    	  this.change = !this.change;
        if (window.sessionStorage["user"]) {
          this.$http.post('/api/v1/carts/' + window.sessionStorage["user_id"] + '/' + good._id ).then((res) => {
            this.$message({
              message: '加入购物车成功',
              type: 'success'
            });
          }, (err) => {
            console.log(err);
          });
        } else {
          this.$message.error('您还未登录，请登录后进行操作');
        }
      },
    	display() {
        if (window.sessionStorage["user"])
        {
          this.dialog = !this.dialog;
        } else {
          this.$message.error('您还未登录，请登录后进行操作');
        }

    	},
    },
    computed: {
      goods() {
        return this.$store.state.goodsList;
      },
      start() {
        return this.$store.state.start;
      },
      total() {
        return this.$store.state.total;
      }
    },
    watch: {
      start() {
        const begins = (this.start - 1 ) * this.limit;
        this.$http.post('/api/v1/goods/' + begins + '/' + this.limit, {
          fliter: this.$store.state.searchFliter
        }).then((res)=>{
          this.$store.commit('getList', res.data.result);
          this.$store.commit('getTotal', res.data.total);
//          this.total = res.data.total;
          document.documentElement.scrollTop = 0;
        }, (err) =>{
          console.log(err);
        });
      }
    }
  }
</script>
<style scoped>
  .lists {
    width: 1200px;
    /*position: relative;*/
  }
	.border {
		width: 260px;
		height: 320px;
		border: 1px solid #ccc;
		float: left;
		margin: 20px 20px;
		position: relative;
	}
	.border:hover {
		border: 2px solid #9393FF;
	}
	.pagina {
    text-align: center;
	}
	.image {
		align: center;
		height: 200px;
	}
	.price {
		font-size: 18px;
		color: #FF2D2D;
		font-weight: bold;
	}
	.btns{
		position: absolute;
		bottom: 0;
	}
	.btn {
		margin-left: 18px;
		color: #FF2D2D;
	}
	.part {
		height: 300px;
	}
	.cart1 {
	    position: fixed;
	    top: 50%;
	    width: 30px;
	    right: 0;
	    z-index: 9999;
  	}
  	.cart2 {
  		background-color: #3C3C3C;
  		color: white;
  	}
  	.cart3 {
  		margin-right: 350px;
  	}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .block {
    background-color: black;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
