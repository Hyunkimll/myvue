import Vue from 'vue'
import Router from 'vue-router'
import area from '@/view/home'
import details from '@/view/details'
import piazza from '@/view/piazza'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'area',
      component: area
    },
    {
      path: '/details',
      name: 'details',
      component: details
    },
    {
      path: '/piazza',
      name: 'piazza',
      component : piazza
    }
  ]
})
