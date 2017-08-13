import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Hello from '@/components/Hello'
import Customer from '@/components/Customer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/customers',
      name: 'cutomers',
      component: Customer
    }
  ]
})
