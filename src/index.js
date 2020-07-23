import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/css/style.css"


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});