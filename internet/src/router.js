import Vue from 'vue'
import Router from 'vue-router'
import UserList from './views/userList.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    {
      path: '/homePage',
      name: 'homePage',
      redirect: '/userList',
      component: () => import('./views/homePage.vue'),
      children: [{
      		path: '/',
          component: () => import('./views/userList.vue')
      	},{
      		path: '/userList',
          component: () => import('./views/userList.vue')
      	},]
    }
  ]
})
