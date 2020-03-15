/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:51:35
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-15 22:05:44
 */

import Vue                    from 'vue'
import VueRouter              from 'vue-router'

import Main                   from '@/page/main'
import Home                   from '@/page/home'
import Avatar                 from '@/page/avatar'
import {
  getToken,
  setToken,
  goLogin
} from '@/utils'

Vue.use(VueRouter)

export const routes = [
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
  {
    name: 'info',
    path: '/info',
    component: Main,
    redirect: '/info/avatar',
    icon: 'user',
    meta: { title: '账号信息' },
    children: [
      {
        name: 'infoAvatar',
        path: '/info/avatar',
        component: Avatar,
        meta: { title: '我的头像' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // 不是登录页面，并且没token
  if (!getToken()) {
    if (to.query.jwt) {
      const { name, query, params } = to
      setToken(query.jwt)
      delete query.jwt
      router.replace({ name, params, query })
    } else {
      goLogin()
    }
  } else {
    document.title = to.meta.title + ' - 影视1994'
    next()
  }
})

export default router
