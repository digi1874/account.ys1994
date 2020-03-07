/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:20:23
 * @Last Modified by:   lin.zhenhui
 * @Last Modified time: 2020-03-06 23:20:23
 */

import request from '@/utils/request'

export const getInfo = () => request.get('/user/info')
