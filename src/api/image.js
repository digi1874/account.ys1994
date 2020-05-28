/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-16 18:24:39
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-16 20:36:38
 */

import { request } from '@/utils'

export const uploadImage = file => {
  const param = new FormData()
  param.append('file', file)
  return request.post('/user/image', param, { headers: { 'Content-Type': 'multipart/form-data' } })
}
