/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-19 15:08:45
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-10 18:22:20
 */

import { request } from '@/utils'

export const websiteList = params => request.get(`login/website`, { params })
