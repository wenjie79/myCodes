<!-- 上架商品-->
<template>
  <div>
    <el-tabs  type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商品关键信息" name="1">
        <good-key @nextStep="add" @transfer="keyInfo"></good-key>
      </el-tab-pane>
      <el-tab-pane label="商品详细信息" name="2">
        <good-detail @goThree="add" @goFirst="reduce" @detail="detailInfo"></good-detail>
      </el-tab-pane>
      <el-tab-pane label="规格" name="3" >
        <set-spec @goLast="add" @goTwo="reduce" @spec="specInfo"></set-spec>
      </el-tab-pane>
      <el-tab-pane label="销售属性" name="4">
        <sale :good="good"></sale>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import sale from '../components/sale'
  import goodKey from '../components/goodkey'
  import goodDetail from '../components/goodDetail'
  import setSpec from '../components/setSpec'
  export default {
    data() {
      return {
        activeName: '1',
        good: {
          seller: '',
          sort:[],
          key:[],
          name: '',
          light: '',
          thumb: '',
          price: '',
          stock: '',
          describe: '',
          setSpec: '',
          imgs: [],
          specs: [
            {
              sortName: '',
              type: []
            }
          ],
          returnGood: '',
          guarantee: '',
          guaranteeDate: ''
        }
      };
    },
    components: {
      goodKey,
      goodDetail,
      setSpec,
      sale
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      add(num) {
       	this.activeName = (parseInt(this.activeName, 10) + num).toString();
      },
      reduce(num) {
        this.activeName = (parseInt(this.activeName, 10) - num).toString();
      },
      keyInfo(dynamicTags, keyValue, goodName, light, thumb) {
        this.good.sort = dynamicTags;
        this.good.key = keyValue;
        this.good.name = goodName;
        this.good.light = light;
        this.good.thumb = thumb;
      },
      detailInfo(price, stock, describe, spec, uploadImgs) {
        this.good.price = price;
        this.good.stock = stock;
        this.good.describe = describe;
        this.good.setSpec = spec;
        this.good.imgs = uploadImgs;
      },
      specInfo(specs) {
          this.good.specs = specs;
      }
    }
  };
</script>
