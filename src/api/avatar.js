/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-17 15:53:07
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-17 15:54:01
 */

import { request } from '@/utils'

export const getAvatarList = params => request.get('/user/avatar', { params })
