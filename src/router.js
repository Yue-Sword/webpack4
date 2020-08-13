import VueRouter from 'vue-router'
import Index from './views'
import Page from './views/page'
import Part from './views/part'

const Vue = window.Vue;
Vue.use(VueRouter)


export const constantRouterMap = [
  {
    name: 'home',
    path: '/home',
    component: Index
  },{
    name: 'page',
    path: '/',
    component: Page
  },{
    name: 'part',
    path: '/part',
    component: Part
  },{
    path: '*',
    redirect: '/'
  }
]

export default new VueRouter({
  routes: constantRouterMap
})