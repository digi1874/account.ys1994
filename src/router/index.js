/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:51:35
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-13 15:04:08
 */

import Vue                   from 'vue'
import VueRouter             from 'vue-router'

import {
  getToken,
  setToken,
  goLogin
} from '@/utils'

import Main                  from '@/components/main'
import Page404               from '@/page/404'
import Home                  from '@/page/home'
import Avatar                from '@/page/avatar'
import Info                  from '@/page/info'
import LoginList             from '@/page/loginList'
import Password              from '@/page/password'
import MessageList           from '@/page/message/list'
import LikeVodList           from '@/page/likeVodList'
import VodPlayList           from '@/page/vodPlayList'
import VodCollectionList     from '@/page/vodCollection/list'
import VodCollectionEdit     from '@/page/vodCollection/edit'
import VodCollectionDetail   from '@/page/vodCollection/detail'
import VodCollectionLikeList from '@/page/vodCollection/likeList'

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
  },
  {
    name: 'messageList',
    path: '/messageList',
    component: MessageList,
    meta: { title: '消息' },
    icon: 'message'
  },
  {
    name: 'likeVodList',
    path: '/likeVodList',
    component: LikeVodList,
    meta: { title: '收藏视频' },
    icon: 'heart'
  },
  {
    name: 'vodPlayList',
    path: '/vodPlayList',
    component: VodPlayList,
    meta: { title: '播放记录' },
    icon: 'play-circle'
  },
  {
    name: 'vodCollection',
    path: '/vodCollection',
    component: { template: '<router-view />' },
    meta: { title: '视频集合' },
    icon: 'folder',
    children: [
      {
        name: 'vodCollectionAdd',
        path: '/vodCollection/add',
        component: VodCollectionEdit,
        meta: { title: '新增集合' },
        sider: false
      },
      {
        name: 'vodCollectionEdit',
        path: '/vodCollection/:id/edit',
        component: VodCollectionEdit,
        meta: { title: '编辑集合' },
        sider: false
      },
      {
        name: 'vodCollectionList',
        path: '/vodCollection/list',
        component: VodCollectionList,
        meta: { title: '我的集合' },
        icon: 'unordered-list'
      },
      {
        name: 'vodCollectionDetail',
        path: '/vodCollection/:id',
        component: VodCollectionDetail,
        meta: { title: '视频集合' },
        sider: false
      },
      {
        name: 'vodCollectionLikeList',
        path: '/vodCollection/like/list',
        component: VodCollectionLikeList,
        meta: { title: '收藏集合' },
        icon: 'heart'
      }
    ]
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
    },
    {
      name: '404',
      path: '*',
      component: Page404
    }
  ]
})

router.beforeEach((to, from, next) => {
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
