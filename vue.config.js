/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:49:27
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-07 11:39:13
 */

module.exports = {
  configureWebpack: {
    externals: {
      lodash: '_',
      moment: 'moment',
      axios: 'axios',
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      jsencrypt: 'JSEncrypt',
      'ant-design-vue': 'antd'
    }
  }
}
