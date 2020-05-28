/*
 * @Author: lin.zhenhui
 * @Date: 2020-05-13 15:59:59
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-19 09:34:46
 */

import _ from 'lodash'
import { getMessageUnreadCount, getVodCommentAtList, getVodCommentReplyAtList, getVodCollectionCommentAtList } from '@/api'
import { defaultList }    from './default'

const state = {
  unreadCount: {
    total: 0,
    vodCommentCount: 0,
    vodCommentReplyCount: 0,
    vodCollectionCommentCount: 0
  },
  vodCommentAtList: _.cloneDeep(defaultList),
  vodCommentReplyAtList: _.cloneDeep(defaultList),
  vodCollectionCommentAtList: _.cloneDeep(defaultList)
}

const mutations = {
  setUnreadCount (state, data) {
    data.total = 0
    _.map(data, (val, k) => {
      if (data[k] < 0) {
        data[k] = 0
      }
    })
    state.unreadCount = {
      ...data,
      total: _.sum(_.values(data))
    }
  },
  setVodCommentAtList (state, list) {
    state.vodCommentAtList = { ...state.vodCommentAtList, ...list }
  },
  setVodCommentAtListItem (state, record) {
    const item = _.find(state.vodCommentAtList.data, { id: record.id })
    _.forEach(record, (value, key) => {
      item[key] = value
    })
    state.vodCommentAtList.data = [ ...state.vodCommentAtList.data ]
  },
  setVodCommentReplyAtList (state, list) {
    state.vodCommentReplyAtList = { ...state.vodCommentReplyAtList, ...list }
  },
  setVodCommentReplyAtListItem (state, record) {
    const item = _.find(state.vodCommentReplyAtList.data, { id: record.id })
    _.forEach(record, (value, key) => {
      item[key] = value
    })
    state.vodCommentReplyAtList.data = [ ...state.vodCommentReplyAtList.data ]
  },
  setVodCollectionCommentAtList (state, list) {
    state.vodCollectionCommentAtList = { ...state.vodCollectionCommentAtList, ...list }
  },
  setVodCollectionCommentAtListItem (state, record) {
    const item = _.find(state.vodCollectionCommentAtList.data, { id: record.id })
    _.forEach(record, (value, key) => {
      item[key] = value
    })
    state.vodCollectionCommentAtList.data = [ ...state.vodCollectionCommentAtList.data ]
  }
}

const actions = {
  getUnreadCount ({ commit }) {
    getMessageUnreadCount().then(({ data }) => {
      commit('setUnreadCount', data)
    })
  },
  getVodCommentAtList ({ state, commit }, params) {
    params = _.cloneDeep(params)
    if (!_.isEqual(params, state.vodCommentAtList.params)) {
      commit('setVodCommentAtList', { loading: true })
      getVodCommentAtList(params).then(({ data }) => {
        data.data = _.map(data.data, item => ({
          ...item,
          vodComment: {
            ...item.vodComment,
            content: item.vodComment.content.replace(/(@\S+) ->[0-9]+/g, '$1')
          },
          readLoading: false,
          deleteLoading: false
        }))
        commit('setVodCommentAtList', {  ...data, params })
      }).finally(() => {
        commit('setVodCommentAtList', { loading: false })
      })
    }
  },
  getVodCommentReplyAtList ({ state, commit }, params) {
    params = _.cloneDeep(params)
    if (!_.isEqual(params, state.vodCommentReplyAtList.params)) {
      commit('setVodCommentReplyAtList', { loading: true })
      getVodCommentReplyAtList(params).then(({ data }) => {
        data.data = _.map(data.data, item => ({
          ...item,
          vodCommentReply: {
            ...item.vodCommentReply,
            content: item.vodCommentReply.content.replace(/(@\S+) ->[0-9]+/g, '$1')
          },
          readLoading: false,
          deleteLoading: false
        }))
        commit('setVodCommentReplyAtList', {  ...data, params })
      }).finally(() => {
        commit('setVodCommentReplyAtList', { loading: false })
      })
    }
  },
  getVodCollectionCommentAtList ({ state, commit }, params) {
    params = _.cloneDeep(params)
    if (!_.isEqual(params, state.vodCollectionCommentAtList.params)) {
      commit('setVodCollectionCommentAtList', { loading: true })
      getVodCollectionCommentAtList(params).then(({ data }) => {
        data.data = _.map(data.data, item => ({
          ...item,
          vodCollectionComment: {
            ...item.vodCollectionComment,
            content: item.vodCollectionComment.content.replace(/(@\S+) ->[0-9]+/g, '$1')
          },
          readLoading: false,
          deleteLoading: false
        }))
        commit('setVodCollectionCommentAtList', {  ...data, params })
      }).finally(() => {
        commit('setVodCollectionCommentAtList', { loading: false })
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
