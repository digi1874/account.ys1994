/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:20:28
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-10 18:21:16
 */

import Vue                   from 'vue'
import { request, getToken } from '@/utils'

export const logout = signature => request.post(`login/logout/${signature}`)
export const loginList = params => request.get(`login/list/${getToken(Vue.prototype.$ipInfo.ip)}`, { params })
