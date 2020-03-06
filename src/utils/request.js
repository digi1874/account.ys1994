/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:51:08
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-07 00:27:14
 */

import _                from 'lodash'
import axios            from 'axios'
import moment           from 'moment'
import { notification } from 'ant-design-vue'

import router           from '@/router'
import { getToken }     from './token'

// api baseURL
const baseURL  = process.env.NODE_ENV === 'development' ? 'http://localhost:8088/' : 'https://api.ys1994.nl'
const instance = axios.create({ baseURL })

// 拦截请求
instance.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers.auth = token
  }
  return config
}, error => {
  notification.error({
    message: _.get(error, 'response.data.msg') || error,
  })
  return Promise.reject(error)
})

// 拦截回应
instance.interceptors.response.use(response => {
  const h = _.get(response.headers, 'date')
  response.data.h = moment(h).unix() + ''
  return response.data
}, error => {
  notification.error({
    message: _.get(error, 'response.data.msg') || error
  })
  if (error.response.status === 401) {
    router.replace({ name: 'login', query: { redirect: encodeURIComponent(router.app.$route.fullPath) } })
  }
  return Promise.reject(error)
})

export default instance
