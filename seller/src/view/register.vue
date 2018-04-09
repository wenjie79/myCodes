<template>
  <div class="register" :style="{height:high}">
    <div class="row">
      <div class="col-xs-offset-3 col-xs-6 register-main" :style="{height:high}">
        <div class="tip">
          <span>已有账号?点击</span>
          <router-link to="/login">登录</router-link>
        </div>
        <form class="form-horizontal" @submit.prevent="validateBeforeSubmit">
          <fieldset>
            <div class="form-group row">
              <label class="col-xs-3 control-label" for="input01">头像上传</label>
              <div class="controls col-xs-8">
                <upload ref="uploads"></upload>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-xs-3 control-label" for="input01">用户名</label>
              <div class="controls col-xs-6">
                <input v-model="userName" name="用户名" v-validate="'required|min:2'" type="text" placeholder="请输入用户名" class="form-control">
                <span style="color: red" v-show="errors.has('用户名')">{{ errors.first('用户名')}}</span>
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-xs-3" for="input01">密码</label>
              <div class="controls col-xs-6">
                <input v-model="password" v-validate="'required|min:6|max:15'" type="password" placeholder="请输入密码" class="form-control" name="密码">
                <span style="color: red" v-show="errors.has('密码')">{{ errors.first('密码')}}</span>
              </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-xs-3" for="input01">确认密码</label>
              <div class="controls col-xs-6">
                <input v-validate="'required|confirmed:密码'" type="password" placeholder="请再次输入密码" name="确认密码" class="form-control">
                <span style="color: red" v-show="errors.has('确认密码')">{{ errors.first('确认密码')}}</span>
              </div>
            </div>
            <div class="form-group row">
            <label class="control-label col-xs-3">邮箱</label>
            <div class="controls col-xs-6">
              <input v-model="email" v-validate="'required|email'" type="email" placeholder="请输入邮箱" class="form-control" name="邮箱">
              <span style="color: red" v-show="errors.has('邮箱')">{{ errors.first('邮箱')}}</span>
            </div>
            </div>
            <div class="form-group row">
              <label class="control-label col-xs-3">联系电话</label>
              <div class="controls col-xs-6">
                <input v-model="tel" v-validate="'required'" type="text" placeholder="请输入联系电话" name="联系电话" class="form-control">
                <span style="color: red" v-show="errors.has('联系电话')">{{ errors.first('联系电话')}}</span>
              </div>
            </div>
            <button type="submit" class="col-xs-offset-3 col-xs-6 btn btn-primary">注册</button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import upload from '../components/upload'
  import { Validator } from 'vee-validate';
  export default {
    data() {
      return {
        userName: '',
        password: '',
        email: '',
        tel: '',
        high: ''
      }
    },
    components: {
      upload
    },
    methods: {
      register() {
        this.$http.post('/manage/user',{
          head_img: this.$refs.uploads.img[0],
          user_name: this.userName,
          password: this.password,
          email: this.email,
          tel: this.tel
        }).then((res) => {
          console.log('ok');
        }, (err) => {
          console.log('false');
        })
      },
      validateBeforeSubmit() {
        this.$validator.validateAll().then((result) => {
          if(result) { // eslint-disable-next-line
            this.register();
            return;
          }
        });
      }
    },
    created() {
      const dictionary = {
        zh_CN: {
          messages: {
            email: () => '邮箱格式错误。',
            required: (field) => field + "不能为空", //替换 “ 必须  ” 关键字
          },
          attributes: {
            //email: '不能为空'
          }
        }
      };
      this.$validator.localize(dictionary)
    },
    mounted() {
      this.high=`${window.innerHeight - 80}px`;
    }
  }
</script>
<style>
  .name {
    color: #FF2D2D;
    font-size: 25px;
  }
  .register-main {
    background-color: ivory;
    padding-top: 20px;
    position: relative;
  }
  .tip {
    position: absolute;
    right: 20px;
    top: 5px;
  }
  .row{
    margin-left:0px;
    margin-right:0px;
  }
  .register {
    background-color: #DDDDDD;
  }
</style>
