import Vue from 'vue'
import Router from 'vue-router'
import Index from '../view/Index'
import Store from '../view/store'
import GoodDetail from '../view/goodDetail'
import Collect from '../view/collect'
import Information from '../view/information'
import Address from '../view/address'
import Order from '../view/order'
import Recommend from '../components/recommend'
import GoodList from '../components/goodlist'
import Upload from '../components/upload.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/index',
      name: 'Index',
      component: Index,
    children: [
      {
        path: 'recommend',
        component: Recommend
      },{
        path: 'search',
        component: GoodList
      }]
    },
    {
      path: '/store',
      name: 'Store',
      component: Store
    },
    {
      path: '/detail/:id',
      name: 'GoodDetail',
      component: GoodDetail
    },
    // {
    //   path: '/myCollect/:user_id',
    //   name: 'myCollect',
    //   component: Collect
    // },
    {
      path: '/information',
      name: 'information',
      component: Information,
       children: [
        {
          path: '/myCollect',
          component: Collect
        },
        {
          path: '/cart',
          component: Order
        },
        {
          path: '/address',
          component: Address
        }
      ]
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '*',
      redirect: '/index/recommend'
    },
  ]
})
