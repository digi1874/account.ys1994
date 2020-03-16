/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:20:28
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-16 21:40:40
 */

import { request } from '@/utils'

export const logout = () => request.post(process.env.NODE_ENV === 'development' ? 'http://localhost:8089/login/logout' : '/login/logout')
