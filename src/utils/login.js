/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-15 21:56:44
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-16 13:57:03
 */

const bgImg = "url(http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D2126367960%2C3699155645%26fm%3D214%26gp%3D0.jpg)"
const host  = process.env.NODE_ENV === 'development' ? 'localhost:9000' : 'login.ys1994.nl'
const href  = `http://${host}/?title=个人中心&bgImg=${bgImg}&redirect=`

export const goLogin = () => window.location.replace(href + encodeURIComponent(window.location.href))
