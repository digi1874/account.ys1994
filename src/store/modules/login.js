/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-18 11:05:41
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-28 22:48:42
 */

import _               from 'lodash'
import { loginList }   from '@/api'
import { defaultList } from './default'

const state = {
  list: _.cloneDeep(defaultList)
}

const mutations = {
  setList (state, list) {
    state.list = { ...state.list, ...list }
  },
  setListItem (state, record) {
    const item = _.find(state.list.data, { id: record.id })
    _.forEach(record, (value, key) => {
      item[key] = value
    })
    state.list.data = [ ...state.list.data ]
  }
}

const actions = {
  getList ({ state, commit }, params) {
    if (!_.isEqual(params, state.list.params)) {
      commit('setList', { loading: true })
      loginList(params).then(({ data }) => {
        _.forEach(data.data, item => {
          item.logoutLoading = false
        })
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