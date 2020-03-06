/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:51:35
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-06 21:04:51
 */

import Vue          from 'vue'
import VueRouter    from 'vue-router'

import { getToken } from '@/utils/token'
import Login        from '@/page/login/login'
import Main         from '@/page/main'
import Home         from '@/page/home/index'

Vue.use(VueRouter)

export const routes = [
  { name: 'login', path: '/login', component: Login, title: '登录', sider: false },
  {
    name: 'home',
    path: '/',
    component: Main,
    redirect: '/index',
    sider: false,
    children: [
      { name: 'homeIndex', path: '/index', component: Home, title: '首页', sider: false }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // 不是登录页面，并且没token
  if (['login', 'register'].indexOf(to.name) === -1 && !getToken()) {
    router.replace({ name: 'login', query: { redirect: encodeURIComponent(to.fullPath) } })
  } else {
    next()
  }
})

export default router
