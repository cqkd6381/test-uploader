import Vue from 'vue'
import uploader from 'vue-simple-uploader'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.css"
// import jQuery from "jquery/dist/jquery.js"
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap-datepicker/dist/js/bootstrap-datepicker.js"
import "bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min.js"

Vue.config.productionTip = false
Vue.use(uploader)
new Vue({
  router,
  store,
  uploader,
  render: h => h(App)
}).$mount('#app')
