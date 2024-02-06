// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './common/css/base.css'
import {formatting} from '@/api/formatting'
// import './mockjs/index'
// import BMap from 'BMap' 
Vue.config.productionTip = false
Vue.filter('filter_date', function (value) {
  return formatting(value);
})
Vue.use(ElementUI)
Vue.prototype.$EventBus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
