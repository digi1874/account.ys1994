/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:51:35
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-07 12:39:27
 */

import Vue          from 'vue'
import VueRouter    from 'vue-router'

import { getToken } from '@/utils/token'
import Login        from '@/page/login/login'
import Register     from '@/page/login/register'
import Main         from '@/page/main'
import Home         from '@/page/home/index'

Vue.use(VueRouter)

export const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: { title: '登录' },
    sider: false
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
    meta: { title: '注册' },
    sider: false
  },
  {
    name: 'home',
    path: '/',
    component: Main,
    redirect: '/index',
    sider: false,
    children: [
      {
        name: 'homeIndex',
        path: '/index',
        component: Home,
        meta: { title: '个人中心' },
        sider: false
      }
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
    document.title = to.meta.title + ' - 影视1994'
    next()
  }
})

export default router
