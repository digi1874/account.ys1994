/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:25:27
 * @Last Modified by:   lin.zhenhui
 * @Last Modified time: 2020-03-06 23:25:27
 */

import { getRsaPubKey } from '@/api'

const state = {
  pubKey: ''
}

const actions = {
  getRsaPubKey ({ state }) {
    return getRsaPubKey().then(response => {
      state.pubKey = response.data
      return response
    })
  }
}

export default {
  namespaced: true,
  state,
  actions
}
