/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:20:23
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-16 21:41:11
 */

import { request } from '@/utils'

export const getInfo    = ()   => request.get('/user/info')
export const updateInfo = data => request.post('/user/info', data)
