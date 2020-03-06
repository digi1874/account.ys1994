/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:51:19
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-06 20:27:27
 */

import jwt from 'jsonwebtoken'

/**
 * 解密wt token
 * @function
 * @param   {String}         token   jwt token
 * @param   {String}         secret  密钥
 * @returns {Object|String|Error}    返回存储在token的信息或错误
 */
export const jwtDecoded = (token, secret) => {
  try {
    return jwt.verify(token, secret)
  }
  catch (err) {
    return err
  }
}
