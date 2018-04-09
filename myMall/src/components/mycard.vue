<template>
  <div class="cart">
    <el-dialog class="dialog" :show-close="false" width="350px" :visible.sync="dialog"
               :append-to-body="true"
               :fullscreen="true"
               :modal="false"
               :close-on-click-modal="false">
      <div :style="{height:high}" style="overflow: scroll">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          class="checkAll"
          @change="handleCheckAllChange">
          <span style="position: relative;top: 2px;left: 8px;">全选</span>
        </el-checkbox>
        <div style="border-bottom: 1px dashed red;"></div>
        <el-checkbox-group  v-model="checkedGoods" @change="handleCheckedCitiesChange">
          <div class="good_detail" v-for="(good, index) in goods">
            <el-checkbox  :label="good" :key="good.good_name">
              <div class="names">
                <p>{{good.good_name}} </p>
                <p>￥ <span style="color: #FF2D2D;font-weight: bold">{{good.good_price}}</span></p>
              </div>
            </el-checkbox>
            <div>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <el-button @click="deleteCart(index)" class="icons"><i class="el-icon-delete"></i></el-button>
              </el-tooltip>
              <el-input-number v-model="good.number" size="small" :min="1"></el-input-number>
            </div>
          </div>
        </el-checkbox-group>
      </div>
      <div class="money">
        <el-button class="count"  type="danger">结 算</el-button>
        <span style="margin-left: 50px;color:#FF2D2D;font-weight: bolder">共计：￥{{count}}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        high: '',
        checkAll: false,
        goods: [{
          good_name:'',
          good_price: '',
          good_id: '',
          number: ''
        }],
        checkedGoods: [],
        count: 0,
        number: [],
        isIndeterminate: false
      };
    },
    props:[
      'dialog',
      'change'
    ],
    methods: {
      close() {
        this.dialog = false;
        // this.$emit('displays', 'false');
//        this.$emit("success", '');
      },
      handleCheckAllChange(val) {
        this.checkedGoods = val ? this.goods : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.goods.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.goods.length;
      },
      getCarts() {
        this.$http.post('/api/v1/getCarts/' + window.sessionStorage['user_id'])
          .then((res) => {
          this.goods = res.data.purchase;
          this.goods.reverse();
          }, (err) => {
            console.log(err);
          })
      },
      deleteCart(index) {
        this.checkedGoods.pop({
          good_id: this.goods.good_id
        });
        this.$http.delete('/api/v1/deleteCart/'+  window.sessionStorage['user_id'] + '/' +this.goods[index].good_id)
          .then((res) => {
            this.getCarts();
          }, (err) => {
            console.log(err);
          })
      },
      num1() {
        this.count = 0;
        for(let i = 0 ; i < this.checkedGoods.length; i++) {
          this.count = this.count + this.checkedGoods[i].good_price * this.checkedGoods[i].number;
        }
        this.count = this.count.toFixed(2);
      }
    },
    watch: {
      change() { // 加入购物车后重新获取数据
        this.getCarts();
      },
      checkedGoods: {
        handler(){
          this.num1();
        },
        deep:true
      }
    },
    mounted() {
      this.high =`${window.innerHeight - 120}px`;
      this.getCarts();
    }
  }
</script>
<style>
  .dialog .el-dialog {
    margin-top: 32px;
    position: fixed;
    right: 0;
    background-color: #F0F0F0;
  }
  .el-checkbox, .el-checkbox__input {
    white-space: inherit;
  }
  .checkAll{
    position: absolute;
    top: 10px;
  }
  .names {
    width: 240px;
    /*height: 60px;*/
    position: relative;
    top: 5px;
    left: 8px;
  }
  .icons {
    position: relative;
    left: 260px;
    top: 40%;
    width: 20px;
    height: 20px;
    padding: 0 0;
  }
  .count {
    margin-left: -20px;
    background-color: #FF2D2D;
    width: 100px;
    height: 40px;
  }
  .el-checkbox__input {
    position: absolute;
    top: 7px;
  }
  .prices {
    position: relative;
    top: 10px;
  }
  .money {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 999;
    background-color: #ADADAD;
  }
  .good_detail {
    border-bottom: 1px dashed red;
  }
</style>
