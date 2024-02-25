import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './common/css/base.css'
import {formatting} from '@/api/formatting'
import * as echarts from 'echarts';
import * as echarts4 from 'echarts4';
// import './mockjs/index'
// import BMap from 'BMap' 
Vue.config.productionTip = false
Vue.filter('filter_date', function (value) {
  return formatting(value);
})
Vue.use(ElementUI)
Vue.prototype.formatting = formatting
Vue.prototype.$echarts = echarts
Vue.prototype.$echarts4 = echarts4
Vue.prototype.$EventBus = new Vue()

//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to, from, next) => {
  //如果路由需要跳转
      //判断 如果school本地存储是qinghuadaxue的时候，可以进去
      if (localStorage.getItem('access_token')) {
          next()  //放行
      } else {
        if(to.path === '/login'){
          next()
        }else{
          next('/login')
        }
      }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
