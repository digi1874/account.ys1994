/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:20:34
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-06 23:36:52
 */

import _                from 'lodash'
import { notification } from 'ant-design-vue'

import request          from '@/utils/request'
import { jwtDecoded }   from '@/utils/jwt'

export const getRsaPubKey = () => request.get('/rsa').then(response => {
  const decoded = jwtDecoded(response.data, response.h)
  if (_.isError(decoded)) {
    notification.error({
      message: '数据无效',
      description: '加密密钥无效'
    })
    response.msg = '加密密钥无效'
    return Promise.reject(response)
  }

  response.data = decoded.pub
  return response
})
