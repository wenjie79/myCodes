<template>
  <div>
    <el-carousel height="450px" indicator-position="outside">
      <el-carousel-item v-for="(item, index) in 4" :key="item">
        <h3>
          <img :src="'../../static/1'+(index+1)+'.jpg'" alt="" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: 0;width: 100%;max-width: 100%;max-height: 100%;">
        </h3>
      </el-carousel-item>
    </el-carousel>
    <div class="col-xs-offset-2 col-xs-10">
      <div class="col-xs-12">
        <p class="your-favorite">新品上市</p>
        <div class="row goods-information">
          <div class="col-xs-12 good-basic-information" v-for="newGood in newGoods">
            <img class="img-thumbs" :src="newGood.thumb" alt="">
            <p class="new-good-name">
              <span style="margin: auto;">{{newGood.name}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="col-xs-12">
        <p class="your-favorite">最近流行</p>
        <div class="row goods-information">
          <div class="col-xs-12 good-basic-information" v-for="popularity in popularities">
            <img class="img-thumbs" :src="popularity.thumb" alt="">
            <p class="new-good-name">
              <span style="margin: auto;">{{popularity.name}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="col-xs-12">
        <p class="your-favorite">推荐商家</p>
        <div class="row goods-information">
          <div class="col-xs-12 good-basic-information">
            <img class="img-thumbs" alt="">
            <p class="new-good-name">
              <span style="margin: auto;"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        newGoods: [],
        popularities: [],
      };
    },
    methods: {
      getRecommend() {
        this.$http.get('/api/v1/getRecommend')
          .then((res) => {
          this.newGoods = res.data.newGoods;
          this.popularities = res.data.popularities;
          },(err) => {
          console.log(err);
          })
      }
    },
    mounted() {
      this.getRecommend();
    }
  }
</script>
<style>
  .your-favorite {
    font-weight: bolder;
    margin-left: -10px;
  }
  .img-thumbs {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    padding-right: 1px;
  }
  .new-good-name {
    position: relative;
    z-index: 111;
    margin: auto;
    width: 100px;
    height: 40px;
    background-color: white;
    opacity: 0.7;
    display: flex;
  }
  .goods-information {
    height: 180px;
    width: 900px;
    border: 1px solid blanchedalmond
  }
  .good-basic-information {
    text-align:center;
    width: 224px;
    height: 220px;
    position: relative;
    display: flex;
  }
  .good-basic-information:hover, .new-good-name:hover {
    color: #FF2D2D;
    font-weight: bolder;
  }
</style>
