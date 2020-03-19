/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:20:28
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-19 13:19:30
 */

import Vue                   from 'vue'
import { request, getToken } from '@/utils'
import { LOGIN }             from '@/dict'

export const logout = signature => request.post(`${LOGIN.HREF}logout/${signature}`)
export const loginList = params => request.get(`${LOGIN.HREF}list/${getToken(Vue.prototype.$ipInfo.ip)}`, { params })
