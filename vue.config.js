/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:49:27
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-28 16:02:21
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
      'ant-design-vue': 'antd',
      'crypto-js': 'CryptoJS'
    }
  },
  // devServer: {
  //   port               : 9031,
  //   historyApiFallback : true,
  //   public             : 'dev.account.ys1994.nl',
  //   disableHostCheck   : true
  // }
}
