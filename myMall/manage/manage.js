import Vue from 'vue'
import Manage from './manage.vue'
import router from './router'
// import bootstrap from 'bootstrap'
// import jquery from 'jquery'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './assets/bootstrap/dist/css/bootstrap.min.css'
Vue.config.productionTip = false
Vue.prototype.$http = axios;
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Vue.use(ElementUI);
// Vue.use(bootstrap)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Manage/>',
  components: { Manage }
})
