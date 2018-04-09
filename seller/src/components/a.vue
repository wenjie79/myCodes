<template>
  <div>
    <form @submit.prevent="validateBeforeSubmit">
                   <div class="column is-12">
                      <label class="label">手机：</label>
                      <p class="control has-icon has-icon-right">
                          <input name="phone" v-model="phone" v-validate="'required|phone'" data-first-as="Firsts Name" :class="{'input': true, 'is-danger': errors.has('phone') }" type="text" placeholder="手机">
                          <i v-show="errors.has('phone')" class="fa fa-warning"></i>
                           <span v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span>
                      </p>
               </div>
                 <div class="column is-12">
                       <label class="label">邮箱：</label>
                       <p class="control has-icon has-icon-right">
                          <input name="email" v-model="email" v-validate="'required|email'" data-first-as="Firsts Name" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="邮箱">
                          <i v-show="errors.has('email')" class="fa fa-warning"></i>
                           <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                      </p>
                  </div>
                   <div class="column is-12">
                       <label class="label">密码：</label>
                       <p class="control has-icon has-icon-right">
                           <input name="pwd" v-model="pwd" v-validate="'required|pwd|min:10'" data-first-as="Firsts Name" :class="{'input': true, 'is-danger': errors.has('pwd') }" type="password" placeholder="密码">
                          <i v-show="errors.has('pwd')" class="fa fa-warning"></i>
                          <span v-show="errors.has('pwd')" class="help is-danger">{{ errors.first('pwd') }}</span>
                      </p>
                   </div>
                  <div class="column is-12">
                       <label class="label">确认密码：</label>
                    <p class="control has-icon has-icon-right">
                           <input name="chepwd" v-model="chepwd" v-validate="'required|chepwd|min:10'" data-first-as="Firsts Name" :class="{'input': true, 'is-danger': errors.has('chepwd') }" type="password" placeholder="密码">
                          <i v-show="errors.has('chepwd')" class="fa fa-warning"></i>
                          <span v-show="errors.has('chepwd')" class="help is-danger">{{ errors.first('chepwd') }}</span>
                       </p>
                   </div>
                   <div class="column is-12">
                     <p class="control">
                          <button class="button is-primary" type="submit">Submit</button>
                      </p>
                   </div>
              </form>
  </div>
</template>
<script>
  import { Validator } from 'vee-validate';
  export default {
    components: {},
    name: 'form-example',
    data: () => ({
      phone: '',
      email: '',
      pwd: '',
      chepwd: ''
    }),
    created() {
      const dictionary = {
        zh_CN: {
          messages: {
            email: () => '邮箱格式错误。',
            required: (field) => "不能为空" + field, //替换 “ 必须  ” 关键字
          },
          attributes: {
            //email: '不能为空'
          }
        }
      };
      this.$validator.updateDictionary(dictionary);
      Validator.extend('phone', {
        messages: {
          zh_CN: field => field + '必须是11位手机号码',
        },
        validate: value => {
          return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
        }
      });
      Validator.extend('pwd', {
        messages: {
          zh_CN: field => field + '密码不能少于十位数',
        },
        validate: value => {
          return value;
        }
      });
      Validator.extend('chepwd', {
        messages: {
          zh_CN: field => field + '两次密码不一致',
        },
        validate: value => {
          if(this.chepwd == this.pwd){
            return value
          }else{
            return false;
          }
        }
      });
    },
    methods: {
      validateBeforeSubmit() {
        this.$validator.validateAll().then((result) => {
          if(result) { // eslint-disable-next-line
            alert('From Submitted!');
            return;
          }
          alert('Correct them errors!');
        });
      }
    }
  };
</script>
