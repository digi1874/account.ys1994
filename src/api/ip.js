/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-19 12:32:40
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-04-16 17:27:48
 */

import { request } from '@/utils'

export const getIPInfo = () => request.get('login/ip/info')