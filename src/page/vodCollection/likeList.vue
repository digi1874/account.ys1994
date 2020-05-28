/*
 * @Author: lin.zhenhui
 * @Date: 2020-04-01 19:07:44
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-19 10:38:02
 */

<template>
  <div>
    <a-form @submit.prevent="handleSearch" class="filter-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="id">
            <a-input-number v-model="formData.id" :min="1" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="名称">
            <a-input v-model="formData.name" allowClear/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit" icon="search" :loading="list.loading">
            搜索
          </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            重置
          </a-button>
        </a-col>
      </a-row>
    </a-form>

    <a-table
      @change="handleChange"
      :columns="columns"
      :dataSource="list.data"
      :loading="list.loading"
      :pagination="pagination"
      :scroll="{ x: 1000 }"
    >
      <template v-slot:id="text, record">
        <a-button type="link" @click="goDetail(record)">{{ text }}</a-button>
      </template>
      <template v-slot:name="text, record">
        <a-tooltip placement="right" :title="text">
          <div class="text-overflow">
            <a :href="`${VOD.WEB_HREF}collection/detail?id=${record.id}&jwt=${token}`" target="_blank">{{ text }}</a>
          </div>
        </a-tooltip>
      </template>
      <template v-slot:overflow="text">
        <a-tooltip placement="right" :title="text">
          <div class="text-overflow">{{ text }}</div>
        </a-tooltip>
      </template>
      <template v-slot:action="text, record">
        <a-button
          :loading="record.likeLoading"
          :type="record.likeState ? 'danger' : ''"
          @click="likeVodCollection(record)"
        >{{ record.likeState ? '' : '已' }}取消收藏</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { likeVodCollection } from '@/api'
import { getToken } from '@/utils'
import { VOD } from '@/dict'

export default {
  data () {
    return {
      VOD,
      formData: {},
      token: getToken(this.$ipInfo.ip),
      columns: [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          scopedSlots: { customRender: 'id' },
          width: 100
        },
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: { customRender: 'name' },
          width: 200
        },
        {
          title: '介绍',
          dataIndex: 'content',
          key: 'content',
          scopedSlots: { customRender: 'overflow' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: 180,
          fixed: 'right'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      list: store => store.vod.collectionLikeList
    }),
    pagination () {
      return {
        pageSize: this.list.size,
        total: this.list.count,
        current: this.list.page,
        showSizeChanger: true,
        showTotal: total => `共${total}条记录`
      }
    }
  },
  created () {
    !this.list.count && this.getList({ page: 1, size: 10, filter: this.list.params.filter })
  },
  methods: {
    ...mapActions('vod', {
      getList: 'getVodCollectionLikeList'
    }),
    ...mapMutations('vod', {
      setCollectionLikeListItem: 'setCollectionLikeListItem',
      setCollectionDetail: 'setCollectionDetail'
    }),
    handleSearch () {
      this.getList({ page: 1, size: this.list.size, filter: this.formData })
    },
    handleChange (pagination) {
      this.getList({ page: pagination.current, size: pagination.pageSize, filter: this.list.params.filter })
    },
    handleReset () {
      this.formData = {}
    },
    likeVodCollection (record) {
      this.setCollectionLikeListItem({ ...record, likeLoading: true })
      likeVodCollection(record.id).then(({ data }) => {
        const likeState = data === 1
        this.$notification.success({ message: likeState ? '收藏成功' : '取消收藏成功' })
        this.setCollectionLikeListItem({ ...record, likeState })
      }).finally(() => {
        this.setCollectionLikeListItem({ ...record, likeLoading: false })
      })
    },
    goDetail (record) {
      this.setCollectionDetail(record)
      this.$router.push({
        name: 'vodCollectionDetail',
        params: { id: record.id }
      })
    }
  }
}
</script>
