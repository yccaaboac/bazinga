import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    // name: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: (resolve) => require(['@/views/home'], resolve),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'index', affix: true, noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'hash',
  mode: 'history',
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
