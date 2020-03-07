/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:20:28
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-07 12:51:01
 */

import request from '@/utils/request'

export const login       = data => request.post('/user/login', data)
export const register    = data => request.post('/user/register', data)
export const numberExist = data => request.post('/user/number/exist', data)
export const logout      = ()   => request.post('/user/logout')
