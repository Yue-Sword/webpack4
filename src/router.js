// import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './views'

const Vue = window.Vue;
Vue.use(VueRouter)


export const constantRouterMap = [
  {
    name: 'home',
    path: '/',
    component: Index
  },{
    path: '*',
    redirect: '/'
  }
]

export default new VueRouter({
  routes: constantRouterMap
})