<template>
  <div>
    <div class="main" :style="{height:high}">
      <div class="login">
        <div class="title">
          <h4 class="operate">用户登录</h4>
        </div>
        <form class="form-horizontal form-main">
          <fieldset>
            <div class="form-group row">
              <label class="col-xs-3 control-label" for="input01">用户名</label>
              <div class="controls col-xs-8">
                <input v-model="userName" type="text" placeholder="请输入用户名" class="form-control">
                <p class="help-block"></p>
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-xs-3" for="input01">密码</label>
              <div class="controls col-xs-8">
                <input v-model="password" type="password" placeholder="请输入密码" class="form-control">
                <p class="help-block"></p>
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-xs-3" for="input01">验证码</label>
              <div class="controls col-xs-4">
                <input v-model="identify" type="text" placeholder="请输入验证码" class="form-control">
              </div>
              <div class="col-xs-4">
                <span v-for="code in codes" class="codes" @click="updateCode">
                  <i :style="{color:code.color}">
                    {{code.identity}}
                  </i>
                </span>
              </div>
              <div class="col-xs-4"></div>
            </div>
            <div class="form-group row">
              <span class="control-label col-xs-3" for="input01">
                <input type="checkbox" class="check-box" v-model="checked">
              </span>
              <span>
                记住密码
              </span>
            </div>
            <div class="form-group row">
              <button type="button" class="col-xs-offset-3 col-xs-6 btn btn-primary" @click="login()">登录</button>
            </div>
          </fieldset>
        </form>
        <div class="user-help">
          <span class="help">忘记密码?</span>
          <span>|</span>
          <span class="help">
            <router-link to="/register">注册新账号</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import loginFunc from '../util/login.js'
  export default {
    data() {
      return {
        high: '',
        userName: '',
        password: '',
        identify: '',
        checked: true, // 是否记住密码
        codes: [], //生成的验证码
        judgeId: false //判断验证码是否正确
      }
    },
    methods: {
      updateCode() {  //验证码刷新
        this.codes =[];
        for(var i = 0; i < 4; i++) {
          this.codes.push(loginFunc.codeFactory());
        }
      },
      login() {
        if(!this.judgeId) { // 验证码错误提示
          const h = this.$createElement;
          this.$notify({
            message: h('i', { style: 'color: teal'}, '验证码错误！'),
            duration: 2000
          });
          this.updateCode(); //验证码错误后刷新验证码
          return;
        }
        this.$http.get('/manage' + '/' + this.userName  + '/' + this.password)
          .then((res)=>{
            const result = res.data;
            if(result != '') {
              if(this.checked == true) { // 保存账号密码
                loginFunc.setCookie(this.userName,this.password,7);
              }
              this.$router.push('/index/information');
              window.sessionStorage["seller_img"] = res.data.head_img;
              window.sessionStorage["seller"] = res.data.user_name;
              window.sessionStorage["seller_id"] = res.data._id;
            } else {
              const h = this.$createElement;
              this.$notify({
                message: h('i', { style: 'color: teal'}, '账号或密码错误！'),
                duration: 2000
              });
              this.updateCode(); //登录错误刷新验证码
            }
          }, (err)=> {
            console.log(err);
          });
      }
    },
    watch:{
      identify() { // 监测输入的验证码
        var code = [];
        for(var i = 0 ; i < 4; i++) {
         code.push(this.codes[i].identity)
        }
        this.judgeId = loginFunc.compare(this.identify,code);
      }
    },
    mounted() {
      this.high=`${window.innerHeight - 80}px`;
      this.userName = loginFunc.getCookie().name; // 页面挂载是获取保存的账号密码
      this.password = loginFunc.getCookie().password;
      this.updateCode();
    }
  }
</script>
<style>
  .main {
    background-image: url("../../static/login2.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
  .login {
    width: 350px;
    height: 400px;
    position: absolute;
    right: 20px;
    top: 20px;
    background-color: ivory;
    opacity: 0.9;
  }
  .operate {
    color: #339999;
    padding-top: 8px;
  }
  .title {
    height: 50px;
    width: 100%;
    border-bottom: 1px dashed cadetblue;
    background-color: #eff4fa;
    text-align: center;
  }
  .form-main {
    margin-top: 30px;
  }
  .user-help {
    position: absolute;
    right: 40px;
    bottom: 20px;
  }
  .help {
    margin: 10px;
    color: #0066FF;
    font-size: 14px;
  }
  .help:hover {
    color: #FF3333;
  }
  .check-box {
    zoom: 130%;
    position: relative;
    top: -6px;
  }
  .codes {
    font-size: 25px;
    background-color: lavender;
    font-weight: bolder;
  }
</style>
