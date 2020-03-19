/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-19 15:08:45
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-19 15:09:43
 */

import { request } from '@/utils'
import { LOGIN }   from '@/dict'

export const websiteList = params => request.get(`${LOGIN.HREF}website`, { params })
