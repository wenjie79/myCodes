<template>
  <div>
    <div class="top">
      <div class="container">
         <div class="row nav">
          <div class="col-xs-6">
            <div class="row col-xs-8" v-show="!userName">
              <span class="login" @click="loginModal">
                <span class="glyphicon glyphicon-th-list mall"></span>请登录{{userName}}</span>
                <span class="mall" @click="registerModal">注册</span>
                <span class="col-xs-offset-1 mall" @click="goIndex">懒人商城</span>
            </div>
            <div class="row col-xs-8" v-show="userName">
              <span class="login">
                <span class="glyphicon glyphicon-th-list mall"></span>欢迎，{{userName}}</span>
                <span class="mall" @click="quit">退出</span>
                <span class="col-xs-offset-1 mall" @click="goIndex">懒人商城</span>
            </div>
            <login @dialogUser="loginSuccess" @openDialog="openLog" :dialogFormVisible="dialogForm"></login>
            <register :register="registerForm"></register>
          </div>
           <div class="col-xs-6">
            <span class="topNav">
              个人中心
            </span>
            <span class="topNav">
              <span class="glyphicon glyphicon-shopping-cart cart"></span> 购物车
            </span>
            <span class="topNav">
              我的订单
            </span>
            <span class="topNav" @click="myCollect">
              我的收藏
            </span>
             <span class="topNav" @click="myStore">
             我的商店
            </span>
           </div>
       </div>
      </div>
      <!--<div class="row">-->
        <!--<div class="col-xs-offset-1 col-xs-2">-->
          <!--<div>-->
            <!--<p class="logo">懒人商城</p>-->
            <!--<p class="url">lanren.com</p>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="col-xs-offset-1 col-xs-4">-->
          <!--<div class="input-group">-->
            <!--<input  type="text" class="form-control search" placeholder="输入您想要查找的商品名称" aria-describedby="basic-addon2">-->
            <!--<span class="search input-group-addon btn" id="basic-addon2">搜索</span>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="col-xs-4">-->
          <!--<el-badge :value="12" class="item">-->
            <!--<el-button size="small">购物车</el-button>-->
          <!--</el-badge>-->
        <!--</div>-->
      <!--</div>-->
  </div>
    <div class="app">
      <div id="app" :style="{height: high}">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import Login from './components/login'
import Register from './components/register'
  export default {
    data () {
      return {
        dialogForm: false,
        registerForm: false,
        high: 0,
        userName: ''
      }
    },
    components: {
        Login,
        Register
    },
    methods: {
      loginModal() {
        this.dialogForm = !this.dialogForm;
      },
      openLog () {
        this.dialogForm = false;
      },
      myStore() {
        this.$router.push({path: '/manage/index'});
      },
      myCollect() {
        if(window.sessionStorage['user']) {
          this.$router.push({path: '/myCollect'});
        } else {
          this.$message.error('您还未登录，请登录后进行操作');
        }
      },
      registerModal() {
        this.registerForm = !this.registerForm;
      },
      goIndex() {
        this.$router.push({path: '/'});
      },
      loginSuccess(data) {
        this.userName = data;
      },
      quit() {
        this.$confirm('账号即将被注销, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '退出成功!'
            });
            window.sessionStorage.removeItem('user');
            window.sessionStorage.removeItem('user_id');
            this.userName = '';
            this.dialogForm = false;
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退出'
            });
          });
      }
    },
    mounted() {
      this.high=`${window.innerHeight - 90}px`;
      this.userName=window.sessionStorage["user"];
    }
  }
</script>

<style scoped>
  .top {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
  }
  .container {
    width: 100%;
    background-color: #BEBEBE;
  }
  .app {
    margin-top: 70px;
    /*overflow-y: scroll;*/
    /*border: 1px solid bisque;*/
  }
  .login {
    color: #FF0000;
  }
  .cart {
    color:  #FF2D2D;
  }
  .topNav {
    margin-left:15px;
  }
  span  {
    font-size: 10px;
    margin: 10px 0;
  }
  .mall {
    margin-left:15px;
  }
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
</style>
