// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/css/style.css"
// import "./assets/css/index.css"

const Vue = window.Vue;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});