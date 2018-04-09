<!--添加商品的详情页-->
<template>
  <div class="addGoods">
    <div class="row">
      <div class="col-xs-9">
        <form class="form-horizontal">
          <fieldset>
            <div class="form-group row">
              <label class="control-label col-xs-3" >商品价格</label>
              <div class="col-xs-6 good-name">
                <el-input-number v-model="price" :min="0"></el-input-number>
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-xs-3" >商品库存</label>
              <div class="col-xs-6 good-name">
                <el-input-number v-model="stock" :min="1"></el-input-number>
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-xs-3" >商品描述</label>
              <div class="col-xs-8 good-name">
                <el-input
                  type="textarea"
                  v-model="describe"
                  :rows="3"
                  placeholder="请输入内容">
                </el-input>
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-xs-3" >是否需要定义规格</label>
              <div class="col-xs-8 good-name">
                <el-radio v-model="spec" label="true" border>是</el-radio>
                <el-radio v-model="spec" label="false" border>否</el-radio>
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-xs-3" >展示图片</label>
              <div class="col-xs-8 good-name">
                <upload-img ref="describeImgs"></upload-img>
              </div>
            </div>
          </fieldset>
        </form>
        <el-button
          class="col-xs-offset-3"
          @click="goFirst"
          type="primary">
          上一步
        </el-button>
        <el-button
          @click="goThree"
          class="col-xs-offset-1"
          :disabled="!(price && stock && describe && spec && uploadImgs[0])"
          type="primary">
          下一步
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import uploadImg from '../components/uploadImg'
  export default {
    data() {
      return {
        price: '',
        stock: '',
        describe: '',
        spec: ''
      };
    },
    components: {
      uploadImg
    },
    methods: {
      goThree() { // 根据是否需要定义规格,跳转到对应的页面
        if (this.spec == 'true') {
          this.$emit('goThree', 1);
        } else {
          this.$emit('goThree', 2);
        }
        this.$emit('detail',this.price, this.stock, this.describe, this.spec, this.uploadImgs);
      },
      goFirst() {
        this.$emit('goFirst', 1);
      }
    },
    computed: {
      uploadImgs: {
        get() {
          return this.$refs.describeImgs.img;
        }
      }
    }
  };
</script>
<style>
  .addGoods {
    width: 1200px;
  }
</style>

