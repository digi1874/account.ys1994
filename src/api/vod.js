/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-28 10:04:15
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-19 09:27:24
 */

import { request } from '@/utils'

const handleParams = params => {
  params.filter = { ...params.filter }
  if (params.filter.typeId && [1, 2, 3, 4, 5, 35].indexOf(params.filter.typeId) !== -1) {
    params.filter.typePId = params.filter.typeId
    delete params.filter.typeId
  }
  return params
}

export const getVodList = params => request.get(`/vod/list`, { params: handleParams(params) })

export const getLikeVodList = params => request.get('/user/like/vod', { params: handleParams(params) })
export const likeVod = vodId => request.post('/user/like/vod', { vodId })

export const getVodPlayList = params => request.get('user/play/vod', { params: handleParams(params) })
export const deleteVodPlay = data => request.delete('user/play/vod', { data })

export const addVodCollection = data => request.post('user/vodCollection', data)
export const deleteVodCollection = data => request.delete('user/vodCollection', { data })
export const getVodCollectionList = params => request.get('user/vodCollection', { params })
export const getVodCollectionDetail = id => request.get('user/vodCollection/' + id )

export const addVodCollectionVod = (vcId, vodIds) => request.post(`user/vodCollection/${vcId}/vod`, { vodIds })
export const deleteVodCollectionVod = (vcId, vodIds) => request.delete(`user/vodCollection/${vcId}/vod`, { data: { vodIds } })
export const getVodCollectionVodList = (vcId, params) => request.get(`user/vodCollection/${vcId}/vod`, { params })

export const likeVodCollection = vodCollectionId => request.post(`user/like/vodCollection`, { vodCollectionId })
export const getVodCollectionLikeList = params => request.get(`user/like/vodCollection`, { params })

export const getVodCommentAtList = params => request.get(`user/vodCommentAt`, { params })
export const deleteVodCommentAt = data => request.delete('user/vodCommentAt', { data })
export const readVodCommentAt = ids => request.post(`user/read/vodCommentAt`, { ids })

export const getVodCommentReplyAtList = params => request.get(`user/vodCommentReplyAt`, { params })
export const deleteVodCommentReplyAt = data => request.delete('user/vodCommentReplyAt', { data })
export const readVodCommentReplyAt = ids => request.post(`user/read/vodCommentReplyAt`, { ids })

export const getVodCollectionCommentAtList = params => request.get(`user/vodCollectionCommentAt`, { params })
export const deleteVodCollectionCommentAt = data => request.delete('user/vodCollectionCommentAt', { data })
export const readVodCollectionCommentAt = ids => request.post(`user/read/vodCollectionCommentAt`, { ids })
