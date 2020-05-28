/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:25:41
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-17 16:11:27
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
    getInfo().then(({ data }) => {
      data.avatar = data.avatar.image
      commit('setInfo', data)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
