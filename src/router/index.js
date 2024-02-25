import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home'
import details from '@/view/details'
import piazza from '@/view/piazza'
import Login from '@/view/login';
import SignUp from "@/view/signUp";
import homepage from "@/view/homepage";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/page/home',
    },
    {
      path: '/page',
      name: 'homepage',
      component: () => import("@/view/homepage"),
      children:[
        {
          path: 'home',
          name: 'home',
          component: () => import("@/view/home")
        },
        {
          path: 'details',
          name: 'details',
          component: () => import("@/view/details")
        },
        {
          path: 'piazza',
          name: 'piazza',
          component: () => import("@/view/piazza")
        },
        {
          path: 'screen',
          name: 'screen',
          component: () => import("@/view/screen")
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/view/login")
    },
    {
      path: "/SignUp",
      name: "SignUp",
      component: () => import("@/view/signUp")
    }
  ]
})

