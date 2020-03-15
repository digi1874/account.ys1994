/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:20:23
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-07 16:36:26
 */

import { request } from '@/utils'

export const getInfo = () => request.get('/user/info')
