/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-28 10:08:39
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-19 10:19:34
 */

import _                  from 'lodash'
import {
  getVodList,
  getLikeVodList,
  getVodPlayList,
  getVodCollectionList,
  getVodCollectionDetail,
  getVodCollectionVodList,
  getVodCollectionLikeList
} from '@/api'
import { defaultList }    from './default'

const state = {
  allList: [],
  list: _.cloneDeep(defaultList),
  likeList: _.cloneDeep(defaultList),
  playList: _.cloneDeep(defaultList),
  collectionList: _.cloneDeep(defaultList),
  collectionDetail: {},
  collectionVodList: _.cloneDeep(defaultList),
  collectionLikeList: _.cloneDeep(defaultList)
}

const mutations = {
  setAllList (state, list) {
    state.allList = [ ...state.allList, list ]
  },
  setList (state, list) {
    state.list = { ...state.list, ...list }
  },
  setLikeList (state, list) {
    state.likeList = { ...state.likeList, ...list }
  },
  setLikeListItem (state, record) {
    const item = _.find(state.likeList.data, { id: record.id })
    _.forEach(record, (value, key) => {
      item[key] = value
    })
    state.likeList.data = [ ...state.likeList.data ]
  },
  setPlayList (state, list) {
    state.playList = { ...state.playList, ...list }
  },
  setPlayListItem (state, record) {
    const item = _.find(state.playList.data, { playId: record.playId })
    _.forEach(record, (value, key) => {
      item[key] = value
    })
    state.playList.data = [ ...state.playList.data ]
  },
  setCollectionList (state, list) {
    state.collectionList = { ...state.collectionList, ...list }
  },
  setCollectionListItem (state, record) {
    const item = _.find(state.collectionList.data, { id: record.id })
    if (!_.isEmpty(item)) {
      _.forEach(record, (value, key) => {
        item[key] = value
      })
      state.collectionList.data = [ ...state.collectionList.data ]
    } else {
      state.collectionList.data = [ record, ...state.collectionList.data ]
    }
  },
  setCollectionDetail (state, data) {
    state.collectionDetail = data
  },
  setCollectionVodList (state, list) {
    state.collectionVodList = { ...state.collectionVodList, ...list }
  },
  setCollectionVodListItem (state, record) {
    const item = _.find(state.collectionVodList.data, { id: record.id })
    if (!_.isEmpty(item)) {
      _.forEach(record, (value, key) => {
        item[key] = value
      })
      state.collectionVodList.data = [ ...state.collectionVodList.data ]
    } else {
      state.collectionVodList.data = [ record, ...state.collectionVodList.data ]
    }
  },
  setCollectionLikeList (state, list) {
    state.collectionLikeList = { ...state.collectionLikeList, ...list }
  },
  setCollectionLikeListItem (state, record) {
    const item = _.find(state.collectionLikeList.data, { id: record.id })
    _.forEach(record, (value, key) => {
      item[key] = value
    })
    state.collectionLikeList.data = [ ...state.collectionLikeList.data ]
  }
}

const actions = {
  getList ({ state, commit }, params) {
    params = _.cloneDeep(params)
    const list = _.find(state.allList, { params })
    if (_.isEmpty(list)) {
      commit('setList', { loading: true })
      getVodList(params).then(({ data }) => {
        data = { ...data, params }
        commit('setAllList', data)
        commit('setList', data)
      }).finally(() => {
        commit('setList', { loading: false })
      })
    } else {
      commit('setList', list)
    }
  },
  getLikeList ({ state, commit }, params) {
    params = _.cloneDeep(params)
    if (!_.isEqual(params, state.likeList.params)) {
      commit('setLikeList', { loading: true })
      getLikeVodList(params).then(({ data }) => {
        data.data = _.map(data.data, item => ({ ...item, likeState: true, likeLoading: false }))
        commit('setLikeList', {  ...data, params })
      }).finally(() => {
        commit('setLikeList', { loading: false })
      })
    }
  },
  getPlayList ({ state, commit }, params) {
    params = _.cloneDeep(params)
    if (!_.isEqual(params, state.playList.params)) {
      commit('setPlayList', { loading: true })
      params = _.pick(params, [ 'page', 'size', 'filter' ])
      getVodPlayList(params).then(({ data }) => {
        data.data = _.map(data.data, item => ({
          ...item.vod,
          m3u8: item.m3u8,
          playId: item.id,
          time: `${Math.floor(item.time / 60)}分${item.time % 60}秒`,
          deleteLoading: false
        }))
        commit('setPlayList', {  ...data, params })
      }).finally(() => {
        commit('setPlayList', { loading: false })
      })
    }
  },
  getCollectionList ({ state, commit }, params) {
    params = _.cloneDeep(params)
    if (!_.isEqual(params, state.collectionList.params)) {
      commit('setCollectionList', { loading: true })
      params = _.pick(params, [ 'page', 'size', 'filter' ])
      getVodCollectionList(params).then(({ data }) => {
        data.data = _.map(data.data, item => ({
          ...item,
          deleteLoading: false
        }))
        commit('setCollectionList', {  ...data, params })
      }).finally(() => {
        commit('setCollectionList', { loading: false })
      })
    }
  },
  getCollectionDetail ({ state, commit }, id) {
    return new Promise((resolve, reject) => {
      const detail = state.collectionDetail
      if (_.isEmpty(detail)) {
        getVodCollectionDetail(id).then(({ data }) => {
          commit('setCollectionDetail', data)
          resolve(data)
        }).catch(reject)
      } else {
        resolve(detail)
      }
    })
  },
  getCollectionVodList ({ state, commit }, { vcId, params }) {
    params = _.cloneDeep(params)
    if (!_.isEqual(params, state.collectionVodList.params) || vcId !== state.collectionVodList.vcId) {
      commit('setCollectionVodList', { loading: true })
      params = _.pick(params, [ 'page', 'size', 'filter' ])
      getVodCollectionVodList(vcId, params).then(({ data }) => {
        data.data = _.map(data.data, item => ({
          ...item,
          deleteLoading: false
        }))
        commit('setCollectionVodList', {  ...data, vcId, params })
      }).finally(() => {
        commit('setCollectionVodList', { loading: false })
      })
    }
  },
  getVodCollectionLikeList ({ state, commit }, params) {
    params = _.cloneDeep(params)
    if (!_.isEqual(params, state.collectionLikeList.params)) {
      commit('setCollectionLikeList', { loading: true })
      getVodCollectionLikeList(params).then(({ data }) => {
        data.data = _.map(data.data, item => ({ ...item, likeState: true, likeLoading: false }))
        commit('setCollectionLikeList', {  ...data, params })
      }).finally(() => {
        commit('setCollectionLikeList', { loading: false })
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
