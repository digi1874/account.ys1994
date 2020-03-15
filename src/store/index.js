/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:51:30
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-15 22:10:32
 */

import Vue   from 'vue'
import Vuex  from 'vuex'
import sider from './modules/sider'
import user  from './modules/user'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    sider,
    user
  }
})
