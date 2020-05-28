/*
 * @Author: lin.zhenhui
 * @Date: 2020-05-10 18:09:09
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-10 18:11:22
 */

import { ENV } from './env'

export const API = {
  BASE_URL: ENV.IS_DEV ? 'http://dev.api.ys1994.nl/' : 'https://api.ys1994.nl/'
}
