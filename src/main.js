/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:50:45
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-06 22:48:40
 */

import Vue    from 'vue'
import Antd   from 'ant-design-vue'

import App    from './App.vue'
import router from './router'
import store  from './store'

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
