/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:51:14
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-06 20:28:37
 */

/**
 * 随机n个小写字母
 * @function
 * @param   {Number}  n  字母数量
 * @returns {String}     返回n个小写字母
 */
export const randomWord = n => {
  let res = ''
  for (let i = n || 1; i > 0; i--) {
    // 随机10~35的数（36进制数，对应a~z）
    res += Math.floor(Math.random() * 26 + 10).toString(36)
  }
  return res
}
