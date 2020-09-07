import VueRouter from 'vue-router'
import Index from './views'
import Part from './views/part'

const Vue = window.Vue;
Vue.use(VueRouter)


export const constantRouterMap = [
  {
    name: 'home',
    path: '/',
    component: Index
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