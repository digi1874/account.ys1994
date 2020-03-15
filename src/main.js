/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:50:45
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-07 16:55:48
 */

import Vue    from 'vue'
import Antd   from 'ant-design-vue'

import App    from './App.vue'
import router from './router'
import store  from './store'
import './filters'

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
