<!--查看上架商品-->
<template>
  <div>
    <div class="input-search col-xs-3">
      <div>
        <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-date"
          @keyup.enter.native="findGoods"
          @blur="changeFocus(false)"
          @focus="changeFocus(true)"
          v-model="searchInformation">
        </el-input>
      </div>
      <div class="search">
        <el-card class="box-card-search" v-show="searchNames[0] && !searchSucess">
          <div v-for="searchName in searchNames" class="text item">
            <p @click="matchSearch(searchName)" class="search-name">{{searchName}}</p>
          </div>
        </el-card>
        <el-card class="box-none-search" v-show="(!searchNames[0]) && searchInformation">
          <p><i class="el-icon-loading"></i>未找到匹配商品</p>
        </el-card>
      </div>
    </div>
    <div class="col-xs-1 input-search">
      <el-button @click="findGoods" icon="el-icon-search" circle></el-button>
    </div>
    <div v-for="(data, index) in datas">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <span>商品名称:</span>
          <span>{{data.name}}</span>
          <el-button @click="cancelGood(data._id)" style="float: right; padding: 3px 0" type="text">下架此商品</el-button>
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
    </div>
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
        searchInformation: '',
        searchNames: [], // 获取推荐列表数据
        searchSucess: false, // 判断是否已查询,控制推荐列表的显示
        inputFocus: false // 判断输入框是否获取焦点,控制推荐列表显示
      }
    },
    methods: {
      getGoods(limit, start) {
        var status = 1;
        this.$http.post('/manage/getGoods/' + window.sessionStorage["seller_id"] + '/' + status + '/' + limit + '/' + start)
          .then((res) => {
          this.datas = res.data.result;
          this.total = res.data.total;
          },(err) => {
          console.log(err);
          })
      },
      findGoods() {
        var status = 1;
        this.$http.post('/manage/search/' + this.searchInformation + '/' + status)
          .then((res) => {
            this.datas = res.data.result;
            this.total = res.data.total;
            this.searchSucess = true;
          },(err) => {
            console.log(err);
          })
      },
      cancelGood(id){ // 下架
        var status = 0;
        this.$http.put('/manage/updateGood/'+ id + '/' + status)
          .then((res) => {

          },(err) => {
            console.log(err);
          })
      },
      handleCurrentChange(val) {
        this.getGoods(3, (val- 1) * 3);
      },
      matchSearch(value) {
        this.searchInformation = value; //点击推荐列表,将对应的值进行搜索
        this.findGoods();
      },
      changeFocus(value) {
        this.inputFocus = value;
      }
    },
    watch: {
      searchInformation() {
        this.searchSucess = false; // 输入框输入值后,重置查询状态
        if(!this.searchInformation) { // 输入框值为空,不进行查询
          this.searchNames = [];
          return;
        }
        this.$http.post('/manage/getSearchName/' + this.searchInformation + '/' + window.sessionStorage["seller_id"])
          .then((res) => {
          this.searchNames = res.data;
          }, (err) => {
          console.log(err);
          })
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
    width: 80%;
    position: relative;
    /*top: -200px;*/
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
  .el-card__header {
    background-color:#DDDDFF;
  }
  .input-search {
    margin: 10px 0 10px -15px;
  }
  .search {
    position: relative;
  }
  .box-card-search {
    height: 200px;
    position: absolute;
    z-index: 999;
    width: 100%;
  }
  .search-name {
    width: 100%;
    font-size: 16px;
  }
  .search-name:hover {
    background-color: #cccccc;
  }
  .box-none-search {
    height: 50px;
    position: absolute;
    z-index: 999;
    width: 100%;
  }
  .pagination-cancel {
    position: absolute;
    margin-top: 20px;
  }
</style>
