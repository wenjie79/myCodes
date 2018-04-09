<!--查看已下架商品-->
<template>
  <div>
    <div class="input-search col-xs-3">
      <el-input
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        @keyup.enter.native="findGoods"
        v-model="searchInformation">
      </el-input>
    </div>
    <div class="col-xs-1 input-search">
      <el-button @click="findGoods" icon="el-icon-search" circle></el-button>
    </div>
    <el-card class="box-card" v-for="(data, index) in datas">
      <div slot="header" class="clearfix">
        <span>商品名称:</span>
        <span>{{data.name}}</span>
        <el-button @click="sellGood(data._id, index)" style="float: right; padding: 3px 0" type="text">重新上架此商品</el-button>
      </div>
      <div class="row">
        <div class="col-xs-2 good-title">商品头图</div>
        <div class="col-xs-3 good-title">商品卖点</div>
        <div class="col-xs-1 good-title">价格</div>
        <div class="col-xs-1 good-title">库存</div>
        <div class="col-xs-1 good-title">销量</div>
        <div class="col-xs-1 good-title">收藏</div>
        <div class="col-xs-offset-1 col-xs-1">
          <el-button class="good-detail-information" type="primary" plain>查看详情</el-button>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-2">
          <div class="good-thumbs">
            <img class="my-good-thumb" :src="data.thumb" alt="">
          </div>
        </div>
        <div class="col-xs-3 my-good-detail">{{data.light}}</div>
        <div class="col-xs-1 my-good-detail">{{data.price}}</div>
        <div class="col-xs-1 my-good-detail">{{data.stock}}</div>
        <div class="col-xs-1 my-good-detail">{{data.sell}}</div>
        <div class="col-xs-1 my-good-detail">{{data.popularity}}</div>
      </div>
    </el-card>
    <div class="col-xs-offset-3 pagination-cancel">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="3"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        datas: [],
        currentPage: 1,
        total: 0,
        searchInformation: ''
      }
    },
    methods: {
      getGoods(limit, start) {
        var status = 0;
        this.$http.post('/manage/getGoods/' + window.sessionStorage["seller_id"] + '/' + status + '/' + limit + '/' + start)
          .then((res) => {
            this.datas = res.data.result;
            this.total = res.data.total;
          },(err) => {
            console.log(err);
          })
      },
      sellGood(id,index){
        var status = 1;
        this.$http.put('/manage/updateGood/'+ id + '/' + status)
          .then((res) => {
          this.datas.splice(index, 1);
          },(err) => {
            console.log(err);
          })
      },
      findGoods() {
        var status = 0;
        this.$http.post('/manage/search/' + this.searchInformation + '/' + status)
          .then((res) => {
            this.datas = res.data.result;
            this.total = res.data.total;
          },(err) => {
          console.log(err);
          })
      },
      handleCurrentChange(val) {
        this.getGoods(2, (val- 1) * 3);
      }
    },
    computed: {
      seller() {
        return window.sessionStorage["seller_id"];
      }
    },
    mounted() {
      this.getGoods(3, 0);
    }
  }
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 1000px;
  }
  .good-thumbs {
    width: 100px;
    height: 100px;
    position: relative
  }
  .my-good-thumb {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }
  .my-good-detail {
    padding: 30px 15px;
  }
  .el-card {
    box-shadow: 0 4px 16px 0 #303133;
    color: #303133;
  }
  .el-card__header {
    background-color:#DDDDFF;
  }
  .good-detail-information {
    position: relative;
    top: 50px;
  }
  .input-search {
    margin: 10px 0 10px -15px;
  }
</style>
