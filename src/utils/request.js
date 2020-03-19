/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:51:08
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-19 13:25:27
 */

import _                     from 'lodash'
import axios                 from 'axios'
import Vue                   from 'vue'
import { notification }      from 'ant-design-vue'

import { getTokenSignature } from './token'
import { goLogin }           from './login'

// api baseURL
const baseURL  = process.env.NODE_ENV === 'development' ? 'http://localhost:8090/' : 'https://api.ys1994.nl/'
const instance = axios.create({ baseURL })

// 拦截请求
instance.interceptors.request.use(config => {
  if (Vue.prototype.$ipInfo) {
    config.headers.auth = getTokenSignature(Vue.prototype.$ipInfo.ip)
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
  return response.data
}, error => {
  notification.error({
    message: _.get(error, 'response.data.msg') || error
  })
  error.response.status === 401 && goLogin()
  return Promise.reject(error)
})

export const request = instance
export default instance
