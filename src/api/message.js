/*
 * @Author: lin.zhenhui
 * @Date: 2020-05-13 15:58:17
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-13 15:58:51
 */

import { request } from '@/utils'

export const getMessageUnreadCount = () => request.get('/user/messageUnreadCount')
