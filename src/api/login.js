/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:20:28
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-15 22:06:30
 */

import { request } from '@/utils'

export const logout = () => request.post('/user/logout')
