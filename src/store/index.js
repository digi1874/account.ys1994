/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:51:30
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-13 16:12:03
 */

import Vue     from 'vue'
import Vuex    from 'vuex'
import avatar  from './modules/avatar'
import login   from './modules/login'
import message from './modules/message'
import sider   from './modules/sider'
import user    from './modules/user'
import vod     from './modules/vod'
import website from './modules/website'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    avatar,
    login,
    message,
    sider,
    user,
    vod,
    website
  }
})
