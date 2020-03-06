/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:20:28
 * @Last Modified by:   lin.zhenhui
 * @Last Modified time: 2020-03-06 23:20:28
 */

import request from '@/utils/request'

export const login = data => request.post('/user/login', data)
export const logout = () => request.post('/user/logout')
