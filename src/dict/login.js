/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-18 13:10:38
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-10 18:14:46
 */

import { ENV } from './env'

export const LOGIN = {
  WEB_BASE_URL: ENV.IS_DEV ? 'http://dev.login.ys1994.nl/' : 'https://login.ys1994.nl/',
  STATE_TEXTS: {
    1: '正常',
    2: '已退出',
    3: '错误'
  }
}
