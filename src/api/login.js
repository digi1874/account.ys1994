/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:20:28
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-17 17:11:40
 */

import { request, getToken } from '@/utils'

const logoutHref = process.env.NODE_ENV === 'development' ? 'http://localhost:8089/login/logout/' : '/login/logout/'

export const logout = () => request.post(logoutHref + getToken())
