<!--销售信息-->
<template>
  <div class="addGoods">
    <div class="row">
      <div class="col-xs-9">
        <form class="form-horizontal">
          <fieldset>
            <div class="form-group row">
              <label class="control-label col-xs-3" >7天无理由退货</label>
              <div class="col-xs-8 good-name">
                <div class="col-xs-8 good-name">
                  <el-radio v-model="returnGood"  label="true" border>是</el-radio>
                  <el-radio v-model="returnGood"  label="false" border>否</el-radio>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-xs-3" >是否保修</label>
              <div class="col-xs-8 good-name">
                <el-radio v-model="guarantee"  label="true" border>是</el-radio>
                <el-radio v-model="guarantee" label="false" border>否</el-radio>
              </div>
            </div>
            <div class="form-group row" v-show="guarantee == 'true'">
              <label class="control-label col-xs-3" >保修时间</label>
              <div class="col-xs-6 good-name">
                <el-input-number v-model="guaranteeDate" :min="0"></el-input-number>
                <span>天</span>
              </div>
            </div>
          </fieldset>
        </form>
        <el-button
          class="col-xs-offset-3"
          type="primary">
          上一步
        </el-button>
        <el-button
          class="col-xs-offset-1"
          :disabled="!(returnGood && guarantee )"
          @click="uploadGood"
          type="primary">
          上架商品
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        returnGood: '',
        guarantee: '',
        guaranteeDate: ''
      };
    },
    props:[
      'good'
    ],
    methods: {
      uploadGood() {
        this.good.returnGood = this.returnGood;
        this.good.guarantee = this.guarantee;
        this.good.guaranteeDate = this.guaranteeDate;
        this.good.seller = window.sessionStorage["seller_id"];
        this.$http.post('/manage/uploadGood', this.good)
          .then((res) => {
            this.$message({
              message: '商品上架成功',
              type: 'success'
            });
          }, (err) => {
            console.log(err);
          })
      }
    }
  }
</script>
