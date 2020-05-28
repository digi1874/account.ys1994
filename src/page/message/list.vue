/*
 * @Author: lin.zhenhui
 * @Date: 2020-05-11 17:06:16
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-19 07:52:25
 */

<template>
  <div>
    <a-tabs type="card" v-model="tabActiveKey" @change="tabChange">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-badge :count="unreadCount.vodCommentCount">
            <span :style="{ paddingRight: unreadCount.vodCommentCount > 0 ? '10px' : '' }">视频评论@</span>
          </a-badge>
        </span>
        <VodComment />
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-badge :count="unreadCount.vodCommentReplyCount">
            <span :style="{ paddingRight: unreadCount.vodCommentReplyCount > 0 ? '10px' : '' }">视频评论回复@</span>
          </a-badge>
        </span>
        <VodCommentReply />
      </a-tab-pane>
      <a-tab-pane key="3">
        <span slot="tab">
          <a-badge :count="unreadCount.vodCollectionCommentCount">
            <span :style="{ paddingRight: unreadCount.vodCollectionCommentCount > 0 ? '10px' : '' }">视频集合@</span>
          </a-badge>
        </span>
        <VodCollection />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VodCollection from './vodCollection'
import VodComment from './vodComment'
import VodCommentReply from './vodCommentReply'
export default {
  components: {
    VodCollection,
    VodComment,
    VodCommentReply
  },
  computed: {
    ...mapState({
      unreadCount: store => store.message.unreadCount
    }),
    tabActiveKey () {
      return this.$route.query.tab || '1'
    }
  },
  methods: {
    tabChange (key) {
      this.$router.push({
        name: 'messageList',
        query: { tab: key }
      })
    }
  }
}
</script>
