/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-19 15:10:00
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-19 15:38:38
 */

import _             from 'lodash'
import { websiteList } from '@/api'

const state = {
  list: {
    data: [],
    loading: false,
    params: {
      filter: {}
    }
  }
}

const mutations = {
  setList (state, list) {
    state.list = { ...state.list, ...list }
  }
}

const actions = {
  getList ({ state, commit }, params) {
    if (!_.isEqual(params, state.list.params)) {
      commit('setList', { loading: true })
      websiteList(params).then(({ data }) => {
        commit('setList', {  ...data, params, })
      }).finally(() => {
        commit('setList', { loading: false })
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
