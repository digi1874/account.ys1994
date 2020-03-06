/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:51:24
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-07 00:27:00
 */

import _         from 'lodash'
import JSEncrypt from 'jsencrypt'

/**
 * 用服务器公key加密数据
 * @function
 * @param   {String|Object} value   待加密数据
 * @param   {String}        pubKey  rsa公key
 * @returns {String} 返回加密后的字符串
 */
export const encrypt = (value, pubKey) => {
  const jsEncrypt = new JSEncrypt()
  if (_.isObject(value)) {
    value = JSON.stringify(value)
  }
  pubKey = atob(pubKey)
  jsEncrypt.setPublicKey(pubKey)
  let res = ''
  const limitLen = 117
  for (let i = 0; i < value.length; i += limitLen) {
    res += jsEncrypt.encrypt(value.slice(i, i + limitLen))
  }
  return res
}
