// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//neditor
import '../static/neditor/neditor.config.js'
import '../static/neditor/neditor.all.min.js'
import '../static/neditor/neditor.parse.min.js'
import '../static/neditor/lang/zh-cn/zh-cn.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
