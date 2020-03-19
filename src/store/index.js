/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:51:30
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-19 15:12:05
 */

import Vue     from 'vue'
import Vuex    from 'vuex'
import avatar  from './modules/avatar'
import login   from './modules/login'
import sider   from './modules/sider'
import user    from './modules/user'
import website from './modules/website'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    avatar,
    login,
    sider,
    user,
    website
  }
})
