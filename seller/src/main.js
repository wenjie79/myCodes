// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import ElementUI from 'element-ui/lib/element-ui.common.js';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/jQuery/jquery-3.2.1'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueI18n from 'vue-i18n';
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_CN',
})
Vue.use(VeeValidate, { //将表单验证设置为中文
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
    zh_CN
  }
});
Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.use(ElementUI);
router.beforeEach((to,from,next) => {
  var userInfo=  window.sessionStorage["seller"];//获取浏览器缓存的用户信息
  if(userInfo){ //如果有就直接到首页
    next();
  }else{
    if(to.path == '/login' || to.path == '/register'){ //如果是登录注册页面路径，就直接next()到登陆注册页
      next();
    }else{ //不然就跳转到登录；
      next('/login');
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
