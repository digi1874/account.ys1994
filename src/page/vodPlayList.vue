/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-28 09:59:43
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-19 10:40:27
 */

<template>
  <div>
    <VodFilterForm :value="list.params.filter" :searchLoading="list.loading" @search="handleSearch" />

    <div style="margin-bottom: 16px">
      <a-button type="danger" @click="handleDeleteBatch" :disabled="!selectedRowKeys.length" :loading="deleteLoading" icon="delete">
        批量删除
      </a-button>
      <span v-if="selectedRowKeys.length" style="margin-left: 8px">
        {{`选择 ${selectedRowKeys.length} 个`}}
      </span>
    </div>

    <VodTable
      @change="handleChange"
      :columns="columns"
      :listData="list"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :scroll="{ x: 1300 }"
    >
      <template v-slot:action="{ record }">
        <a-button type="danger" @click="handleDelete(record)" :loading="record.deleteLoading" icon="delete">删除</a-button>
      </template>
    </VodTable>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions, mapMutations } from 'vuex'
import { deleteVodPlay } from '@/api'
import VodFilterForm from '@/components/vodFilterForm'
import VodTable from '@/components/vodTable'

export default {
  components: {
    VodFilterForm,
    VodTable
  },
  data () {
    return {
      selectedRowKeys: [],
      deleteLoading: false,
      columns: [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          width: 80
        },
        {
          title: '片名',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: { customRender: 'name' },
          width: 200
        },
        {
          title: '播放记录',
          dataIndex: 'm3u8.name',
          key: 'm3u8.name',
          scopedSlots: { customRender: 'play' },
          width: 150
        },
        {
          title: '更新',
          dataIndex: 'serial',
          key: 'serial',
          width: 120
        },
        {
          title: '地区',
          dataIndex: 'area',
          key: 'area',
          width: 80
        },
        {
          title: '导演',
          dataIndex: 'director',
          key: 'director',
          scopedSlots: { customRender: 'overflow' },
          width: 150
        },
        {
          title: '演员',
          dataIndex: 'actor',
          key: 'actor',
          scopedSlots: { customRender: 'overflow' }
        },
        {
          title: '类型',
          dataIndex: 'typeId',
          key: 'typeId',
          scopedSlots: { customRender: 'type' },
          width: 100
        },
        {
          title: '年份',
          dataIndex: 'year',
          key: 'year',
          width: 80
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: 120,
          fixed: 'right'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      list: store => store.vod.playList
    })
  },
  created () {
    !this.list.count && this.getList({ page: 1, size: 10, filter: this.list.params.filter })
  },
  methods: {
    ...mapActions('vod', {
      getList: 'getPlayList'
    }),
    ...mapMutations('vod', {
      setPlayListItem: 'setPlayListItem'
    }),
    handleSearch (filter) {
      this.getList({ page: 1, size: this.list.size, filter })
    },
    handleChange (pagination) {
      this.getList({ page: pagination.current, size: pagination.pageSize, filter: this.list.params.filter })
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleDelete (record) {
      this.setPlayListItem({
        playId: record.playId,
        deleteLoading: true
      })
      deleteVodPlay({ ids: [ record.playId ]}).then(this.deleteVodPlayThen).catch(() => {
        this.setPlayListItem({
          playId: record.playId,
          deleteLoading: false
        })
      })
    },
    handleDeleteBatch () {
      const ids = _.map(this.selectedRowKeys, index => this.list.data[index].playId)
      this.deleteLoading = true
      deleteVodPlay({ ids }).then(this.deleteVodPlayThen).finally(() => {
        this.deleteLoading = false
      })
    },
    deleteVodPlayThen ({ data }) {
      this.selectedRowKeys = []
      this.$notification.success({ message: data })
      this.getList({ ...this.list.params, has: new Date() * 1 })
    }
  }
}
</script>
