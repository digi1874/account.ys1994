/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-31 00:04:54
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-19 10:52:39
 */

<template>
  <a-page-header
    @back="() => $router.go(-1)"
    title="视频集合"
    sub-title="详情"
    :style="{ padding: '0' }"
  >
    <template slot="extra">
      <a-button v-if="isMyVodCollection" icon="edit" @click="goEdit">
        编辑
      </a-button>
      <a
        :href="`${VOD.WEB_HREF}collection/detail?id=${detail.id}&jwt=${token}`"
        target="_blank"
        :style="{ marginLeft: '16px' }"
      ><a-icon type="eye" /></a>
    </template>

    <a-descriptions v-if="detail.id" bordered style="margin-bottom: 16px">
      <a-descriptions-item label="id">{{ detail.id }}</a-descriptions-item>
      <a-descriptions-item label="分享">{{ detail.share | vodCollectionShare }}</a-descriptions-item>
      <a-descriptions-item label="状态">{{ detail.state | vodCollectionState }}</a-descriptions-item>
      <a-descriptions-item label="封面">
        <img :src="detail.pic | imageUrl" :style="{ width: '180px', height: '240px', marginRight: '10px' }">
      </a-descriptions-item>
      <a-descriptions-item label="名称">{{ detail.name }}</a-descriptions-item>
      <a-descriptions-item label="介绍">
        <p style="white-space: pre-wrap;">{{ detail.content }}</p>
      </a-descriptions-item>
    </a-descriptions>

    <VodList v-if="detail.id" :vcId="detail.id" :isEdit="isMyVodCollection" />

    <div v-if="!detail.id">视频集合不存在</div>
  </a-page-header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getToken } from '@/utils'
import { VOD } from '@/dict'
import VodList from './vodList'

export default {
  components: {
    VodList
  },
  data () {
    return {
      VOD,
      token: getToken(this.$ipInfo.ip)
    }
  },
  computed: {
    ...mapState({
      detail: store => store.vod.collectionDetail,
      isMyVodCollection: store => store.vod.collectionDetail.userId === store.user.info.id
    })
  },
  created () {
    this.getDetail(this.$route.params.id)
  },
  methods: {
    ...mapActions('vod', {
      getDetail: 'getCollectionDetail'
    }),
    goEdit () {
      this.$router.push({
        name: 'vodCollectionEdit',
        params: { id: this.$route.params.id }
      })
    }
  }
}
</script>
