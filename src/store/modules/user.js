/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:25:41
 * @Last Modified by:   lin.zhenhui
 * @Last Modified time: 2020-03-06 23:25:41
 */

import { getInfo } from '@/api'

const state = {
  info: {}
}

const mutations = {
  setInfo (state, info) {
    state.info = info
  },
  deleteInfo (state) {
    state.info = {}
  }
}

const actions = {
  getInfo ({ commit }) {
    return getInfo().then(response => {
      commit('setInfo', response.data)
      return response
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
