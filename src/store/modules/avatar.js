/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-17 15:54:31
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-17 16:14:30
 */

import _                 from 'lodash'
import { getAvatarList } from '@/api'

const state = {
  myAvatarList: {},
  avatarList: {}
}

const mutations = {
  setMyAvatarList (state, list) {
    state.myAvatarList = list
  },
  setAvatarList (state, list) {
    state.avatarList = list
  }
}

const actions = {
  getMyAvatarList ({ state, commit }, params) {
    !_.isEqual(params, state.myAvatarList.params) &&
    getAvatarList(params).then(({ data }) => {
      commit('setMyAvatarList', { ...data, params })
    })
  },
  getAvatarList ({ commit }, params) {
    !_.isEqual(params, state.avatarList.params) &&
    getAvatarList(params).then(({ data }) => {
      commit('setAvatarList', { ...data, params })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
