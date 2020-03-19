/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-19 12:32:40
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-19 12:55:17
 */

import { request } from '@/utils'
import { LOGIN }   from '@/dict'

export const getIPInfo = () => request.get(`${LOGIN.HREF}ip/info`)