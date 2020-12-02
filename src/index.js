// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/style.css"

const Vue = window.Vue;
Vue.use(ElementUI);

Vue.prototype.$localhost = "http://localhost:4000"

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});