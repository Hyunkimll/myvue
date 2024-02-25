import Vue from 'vue'
import Router from 'vue-router'
import area from '@/view/home'
import details from '@/view/details'
import piazza from '@/view/piazza'
import Login from '@/view/login';
import SignUp from "@/view/signUp";

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
      component: piazza
    },
    {
      path: '/screen',
      name: 'screen',
      component: () => import("@/view/screen")
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/Sign-up",
      name: "SignUp",
      component: SignUp
    }
  ]
})