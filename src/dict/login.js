/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-18 13:10:38
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-19 12:43:49
 */

export const LOGIN = {
  STATE_TEXTS: {
    1: '正常',
    2: '已退出'
  },
  HREF: process.env.NODE_ENV === 'development' ? 'http://localhost:8089/login/' : '/login/'
}
