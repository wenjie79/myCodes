import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import register from '../view/register'
import index from '../view/index'
import sellerInfo from '../view/sellerInfo'
import addGood from '../view/addGood'
import myGood from '../view/myGood'
import cancelGood from '../view/cancelGood'


Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/index',
      name: index,
      component: index,
      children:[
        {
          path: 'information',
          component: sellerInfo
        },
        {
          path: 'addGood',
          component: addGood
        },
        {
          path: 'myGood',
          component: myGood
        },
        {
          path: 'cancelGood',
          component: cancelGood
        }
      ]
    }
  ]
})
