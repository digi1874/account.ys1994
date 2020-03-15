/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:51:00
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-15 20:54:25
 */

import moment from 'moment'

// localStorage key
const TOKEN_KEY = 'user_token'

/**
 * 获取token signature
 * @function
 * @returns {String}
 */
export const getTokenSignature = () => {
  return getToken().replace(/.+\.(.+)/, '$1')
}

/**
 * 获取token
 * @function
 * @returns {String}
 */
export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY)

  if (!token) {
    return ''
  }

  if (!verify(token)) {
    return ''
  }

  return token
}

/**
 * 保存token
 * @function
 * @param   {String} token  登录或注册时从接口拿到的token
 * @returns {Boolean}       返回是否保存。
 */
export const setToken = token => {
  if (!verify(token)) {
    return false
  }

  localStorage.setItem(TOKEN_KEY, token)
  return true
}

/**
 * 删除token
 * @function
 */
export const delToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 验证token，只验证是否过期；不验证加密有效性，不需要在前端验证，也不能把私密写在前端。
 * @function
 * @param    {String}   token  token值
 * @returns  {Boolean}         返回是否有效。
 */
function verify (token) {
  try {
    const { exp } = JSON.parse(atob(token.replace(/(.+)\..+/, '$1')))
    return exp > moment().unix()
  } catch (err) {
    return false
  }
}
