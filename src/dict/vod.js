/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-23 11:36:14
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-10 18:23:25
 */

import { ENV } from './env'

export const VOD = {
  WEB_HREF: ENV.IS_DEV ?  'http://dev.www.ys1994.nl/' : 'https://www.ys1994.nl/',
  TYPE_TEXTS: {
    1: '电影',
    2: '连续剧',
    3: '综艺',
    4: '动漫',
    5: '资讯',
    6: '动作片',
    7: '喜剧片',
    8: '爱情片',
    9: '科幻片',
    10: '恐怖片',
    11: '剧情片',
    12: '战争片',
    13: '国产剧',
    14: '港剧',
    15: '韩剧',
    16: '欧美剧',
    17: '公告',
    18: '头条',
    20: '纪录片',
    21: '微电影',
    22: '台剧',
    23: '日本剧',
    24: '海外剧',
    25: '内地综艺',
    26: '港台综艺',
    27: '日韩综艺',
    28: '欧美综艺',
    29: '国产动漫',
    30: '日韩动漫',
    31: '欧美动漫',
    32: '港台动漫',
    33: '海外动漫',
    34: '福利片',
    35: '解说',
    36: '电影解说',
    37: '情爱片'
  },
  AREA_LIST: [
    '大陆',
    '香港',
    '台湾',
    '印度',
    '法国',
    '美国',
    '澳大利亚',
    '加拿大',
    '英国',
    '俄罗斯',
    '韩国',
    '日本',
    '其它'
  ],
  SERIAL_LIST: [
    '更新',
    '完结',
    'BD',
    'HD',
    'HC',
    'DVD'
  ],
  LANG_LIST: [
    '国语',
    '粤语',
    '英语',
    '日语',
    '韩语',
    '泰语',
    '法语',
    '德语',
    '俄语',
    '丹麦语',
    '印地语',
    '西班牙语',
    '葡萄牙语',
    '意大利语'
  ],
  COLLECTION_SHARE_TEXTS: {
    1: '是',
    2: '否'
  },
  COLLECTION_STATE_TEXTS: {
    1: '正常',
    2: '禁用'
  },
}