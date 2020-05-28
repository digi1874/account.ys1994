/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-15 21:56:44
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-10 18:27:01
 */

import { LOGIN } from '@/dict'
const bgImg = 'linear-gradient(%234a444b%2C%20%23859b93)'
const href  = `${LOGIN.WEB_BASE_URL}?title=个人中心&bgImg=${bgImg}&redirect=`

export const goLogin = () => {
  window.location.replace(href + encodeURIComponent(window.location.href))
}
