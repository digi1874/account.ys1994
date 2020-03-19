/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:51:35
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-19 12:59:44
 */

import Vue       from 'vue'
import VueRouter from 'vue-router'

import Main      from '@/components/main'
import Home      from '@/page/home'
import Avatar    from '@/page/avatar'
import Info      from '@/page/info'
import LoginList from '@/page/loginList'
import Password  from '@/page/password'
import {
  getToken,
  setToken,
  goLogin
} from '@/utils'

Vue.use(VueRouter)

export const routes = [
  {
    name: 'home',
    path: '/home',
    component: Home,
    meta: { title: '个人中心' },
    sider: false
  },
  {
    name: 'avatar',
    path: '/avatar',
    component: Avatar,
    meta: { title: '我的头像' },
    icon: 'user'
  },
  {
    name: 'info',
    path: '/info',
    component: Info,
    meta: { title: '我的信息' },
    icon: 'info'
  },
  {
    name: 'password',
    path: '/password',
    component: Password,
    meta: { title: '修改密码' },
    icon: 'lock'
  },
  {
    name: 'login',
    path: '/login',
    component: LoginList,
    meta: { title: '登录记录' },
    icon: 'login'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'index',
      path: '/',
      component: Main,
      redirect: '/home',
      children: routes
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 不是登录页面，并且没token
  if (to.query.jwt) {
    const { name, query, params } = to
    setToken(query.jwt)
    delete query.jwt
    router.replace({ name, params, query })
  } else if (!getToken(Vue.prototype.$ipInfo.ip)) {
    goLogin()
  } else {
    document.title = to.meta.title + ' - 影视1994'
    next()
  }
})

export default router
