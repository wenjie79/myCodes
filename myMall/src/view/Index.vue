<template>
  <div class="default">
    <div class="row">
      <div class="col-xs-offset-1 col-xs-2">
        <div>
          <p class="logo">懒人商城</p>
          <p class="url">lanren.com</p>
        </div>
      </div>
      <div class="col-xs-offset-1 col-xs-4">
        <div class="input-group">
         <input  type="text" v-model="searchGood" class="form-control search" placeholder="输入您想要查找的商品名称" aria-describedby="basic-addon2">
         <span @click="searchGoods" class="search input-group-addon btn" id="basic-addon2">搜索</span>
        </div>
      </div>
      <div class="col-xs-4">
        <el-badge :value="12" class="item">
          <el-button size="small"><i class="glyphicon glyphicon-shopping-cart"></i>购物车</el-button>
        </el-badge>
      </div>
    </div>
    <div class="goods">
     <div class="row">
       <div class="col-xs-offset-1">
        <span class="select-sort">
          <el-cascader
            expand-trigger="hover"
            :options="options"
            placeholder="全部商品分类"
            change-on-select
            v-model="selectedOptions"
            @change="handleChange">
          </el-cascader>
        </span>
        <span class="list" v-for="(list,index) in main" @click="active(index)" :class="{active: (index == keyIndex)}">
           <span v-if="index !=1 ">{{list}}</span>
          <span v-else>
            <el-badge value="hot" class="item">
              {{list}}
            </el-badge>
          </span>
        </span>
       </div>
      </div>
    </div>
    <span @click="returnTop()">
      <i class="el-icon-upload2 return-top">返回顶部</i>
    </span>
    <div class="row">
      <div>
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import GoodList from '../components/goodlist'
export default {
  data () {
    return {
      distance: '',
      limit: 8,
      options: [
        {
        value: '服装',
        label: '服装',
        children: [{
          value: '男装',
          label: '男装',
          children: [{
            value: '上衣',
            label: '上衣'
          }, {
            value: '衬衫',
            label: '衬衫'
          }, {
            value: 'T恤',
            label: 'T恤'
          }, {
            value: '卫衣',
            label: '卫衣'
          },{
            value: '运动裤',
            label: '运动裤'
          },{
            value: '牛仔裤',
            label: '牛仔裤'
          },{
            value: '休闲裤',
            label: '休闲裤'
          }]
        }, {
          value: '女装',
          label: '女装',
          children: [{
            value: '连衣裙',
            label: '连衣裙'
          }, {
            value: '牛仔裤',
            label: '牛仔裤'
          },{
            value: '卫衣',
            label: '卫衣'
          },{
            value: '风衣',
            label: '风衣'
          },{
            value: '毛呢大衣',
            label: '毛呢大衣'
          }]
        }]
      }, {
        value: '家电数码',
        label: '家电数码',
        children: [{
          value: '家电',
          label: '家电',
          children: [{
            value: '吹风机',
            label: '吹风机'
          }, {
            value: '剃须刀',
            label: '剃须刀'
          }, {
            value: '扫地机器人',
            label: '扫地机器人'
          }, {
            value: '电饭煲',
            label: '电饭煲'
          }, {
            value: '蓝牙音箱',
            label: '蓝牙音箱'
          },{
            value: '电热毯',
            label: '电热毯'
          },{
            value: '加湿器',
            label: '加湿器'
          },{
            value: '豆浆机',
            label: '豆浆机'
          }]
        }, {
          value: '数码',
          label: '数码',
          children: [{
            value: '电脑主机',
            label: '电脑主机'
          }, {
            value: '相机',
            label: '相机'
          }, {
            value: '鼠标键盘',
            label: '鼠标键盘'
          }, {
            value: '二手手机',
            label: '二手手机'
          }, {
            value: '二手笔记本',
            label: '二手笔记本'
          }, {
            value: '苹果/Apple iPad Pro',
            label: '苹果/Apple iPad Pro'
          }]
        }, {
          value: '手机',
          label: '手机',
          children: [{
            value: 'iphoneX',
            label: 'iphoneX'
          }, {
            value: 'iphone8',
            label: 'iphone8'
          }, {
            value: '华为mate9',
            label: '华为mate9'
          }, {
            value: '小米',
            label: '小米'
          }]
        }]
      }, {
        value: '家具家饰',
        label: '家具家饰',
        children: [{
          value: '沙发',
          label: '沙发'
        }, {
          value: '窗帘',
          label: '窗帘'
        }, {
          value: '茶几',
          label: '茶几'
        }]
      }],
      selectedOptions: [], // 选中的类别
      fliters: {},
      sorts: {},
      searchGood: '', // 搜索输入
      keyIndex: 0, // 初始化首页被选中
      main: [
      '首页',
      '热销商品',
      '活动',
      '促销']
    }
  },
  components: {
    GoodList
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    active(index) {
      this.keyIndex = index;
      if(index == 0) {
        this.$router.push('/index/recommend');
      }
    },
    getGoods() { // 获取商品
      const begins = (this.$store.state.start - 1 ) * this.limit;
      this.$http.post('/api/v1/goods/' + begins + '/' + this.limit, {
        fliter: this.$store.state.searchFliter
      }).then((res)=>{
          this.$router.push('/index/search');
          this.keyIndex = -1;
          this.$store.commit('getList', res.data.result);
          this.$store.commit('getTotal', res.data.total);
        }, (err) =>{
          console.log(err);
        });
    },
    /* 因搜索框(父)和显示列表(子)不在同一页面,但搜索需要触发事件,得到goodlist的数据,故在
    父组件中先拿到数据,通过vuex传递给goodlist
    */
    searchGoods() {
      this.$store.commit('getSearchFliter', this.searchGood);
      this.getGoods();
    },
    returnTop() {
      document.documentElement.scrollTop = 0;
//      if(document.body.scrollTop)
//      {
//        this.distance = document.body.scrollTop;
//      }
//      else{
//        this.distance = document.documentElement.scrollTop
//      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  font-size: 20px;
  color: #FF2D2D;
  font-weight: bold;
}
.url {
  color: #FF2D2D;
  margin-top: -10px;
}
.search {
  border: 1px solid #FF2D2D
}
.btn {
  color: white;
  background-color: #FF2D2D
}
.select-sort {
  background-color: #FF2D2D
}
.goods {
  background-color: #3C3C3C;
  width: 100%;
  height: 40px;
}
.page {
  height: 100px;
}
.list {
  font-size: 13px;
  color:white;
  padding: 12px 45px;
  position: relative;
  margin-left: 30px;
}
.active {
  background-color: #FF2D2D;
}
.beside {
  margin-top: 20px;
  position: relative;
  left: -15px;
}
.return-top {
  position: fixed;
  right: 10px;
  bottom: 50px;
  z-index: 100;
}
</style>
