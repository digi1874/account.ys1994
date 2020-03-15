/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-15 21:56:44
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-15 21:59:39
 */

export const goLogin = () => {
  const redirect = encodeURIComponent(window.location.href)
  const login = process.env.NODE_ENV === 'development' ? 'http://localhost:9000/?redirect=' : 'https://login.ys1994.nl?redirect='
  window.location.replace(login + redirect)
}
