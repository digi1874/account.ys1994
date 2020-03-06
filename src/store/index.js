/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:51:30
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-06 23:25:57
 */

import Vue   from 'vue'
import Vuex  from 'vuex'
import rsa   from './modules/rsa'
import sider from './modules/sider'
import user  from './modules/user'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    rsa,
    sider,
    user
  }
})
