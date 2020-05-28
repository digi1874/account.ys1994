/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:51:08
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-10 18:13:09
 */

import _                     from 'lodash'
import axios                 from 'axios'
import Vue                   from 'vue'
import { notification }      from 'ant-design-vue'

import { API } from '@/dict'

import { getTokenSignature } from './token'
import { goLogin }           from './login'

const instance = axios.create({ baseURL: API.BASE_URL })

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
    message: _.get(error, 'response.data.msg') || error.message
  })
  error.response.status === 401 && goLogin()
  return Promise.reject(error)
})

export const request = instance
export default instance
