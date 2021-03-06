/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:50:45
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-31 21:27:26
 */

import Vue               from 'vue'
import Antd, { notification } from 'ant-design-vue'

import App               from './App.vue'
import router            from './router'
import store             from './store'
import moment            from 'moment'
import { getIPInfo }     from '@/api'
import './filters'

moment.locale('zh-cn')

Vue.config.productionTip = false

Vue.use(Antd)

notification.config({
  top: `60px`
})
Vue.prototype.$notification = notification

getIPInfo().then(({ data }) => {
  Vue.prototype.$ipInfo = data
  new Vue({
    render: h => h(App),
    router,
    store
  }).$mount('#app')
}).catch(err => alert(err))
