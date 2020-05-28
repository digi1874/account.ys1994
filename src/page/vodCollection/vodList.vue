/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-31 21:11:19
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-19 10:44:31
 */

<template>
  <div>
    <a-divider orientation="left">视频列表</a-divider>

    <SelectVod :confirmLoading="addVodLoading" @ok="addVodCollectionVod" ref="selectVod" />

    <VodFilterForm :value="list.params.filter" :searchLoading="list.loading" @search="handleSearch" />

    <a-row v-if="isEdit" type="flex" justify="space-between" style="margin-bottom: 16px">
      <div>
        <a-button type="danger" @click="handleDeleteBatch" :disabled="!selectedRowKeys.length" :loading="deleteLoading" icon="delete">
          批量删除
        </a-button>
        <span v-if="selectedRowKeys.length" style="margin-left: 8px">
          {{`选择 ${selectedRowKeys.length} 个`}}
        </span>
      </div>
      <a-button @click="$refs.selectVod.showModal()" icon="plus">新增</a-button>
    </a-row>

    <VodTable
      @change="handleChange"
      :columns="columns"
      :listData="list"
      :rowSelection="isEdit ? {selectedRowKeys: selectedRowKeys, onChange: onSelectChange} : null"
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
import { deleteVodCollectionVod, addVodCollectionVod } from '@/api'
import VodFilterForm from '@/components/vodFilterForm'
import VodTable from '@/components/vodTable'
import SelectVod from '@/components/selectVod'

export default {
  components: {
    VodFilterForm,
    VodTable,
    SelectVod
  },
  props: {
    vcId: Number,
    isEdit: Boolean
  },
  data () {
    const columns =  [
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
      }
    ]

    this.isEdit && columns.push({
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      width: 120,
      fixed: 'right'
    })

    return {
      addVodLoading: false,
      selectedRowKeys: [],
      deleteLoading: false,
      columns
    }
  },
  computed: {
    ...mapState({
      list: store => store.vod.collectionVodList
    })
  },
  created () {
    window.vl = this
    !this.list.count &&
    this.getList({
      vcId: this.vcId,
      params: { page: 1, size: 10, filter: this.list.params.filter }
    })
  },
  methods: {
    ...mapActions('vod', {
      getList: 'getCollectionVodList'
    }),
    ...mapMutations('vod', {
      setCollectionVodListItem: 'setCollectionVodListItem'
    }),
    handleSearch (filter) {
      this.getList({
        vcId: this.vcId,
        params: { page: 1, size: this.list.size, filter }
      })
    },
    handleChange (pagination) {
      this.getList({
        vcId: this.vcId,
        params: { page: pagination.current, size: pagination.pageSize, filter: this.list.params.filter }
      })
    },
    handleReset () {
      this.formData = {}
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    addVodCollectionVod (vodIds, vodList) {
      this.addVodLoading = true
      addVodCollectionVod(this.vcId, vodIds).then(() => {
        _.forEach(vodList, item => {
          this.setCollectionVodListItem({
            ...item,
            deleteLoading: false
          })
        })
        this.$notification.success({ message: '添加成功' })
        this.$refs.selectVod.showModal(false)
        this.$refs.selectVod.selectedRowKeys = []
      }).finally(() => {
        this.addVodLoading = false
      })
    },
    handleDelete (record) {
      this.setCollectionVodListItem({
        id: record.id,
        deleteLoading: true
      })
      deleteVodCollectionVod(this.vcId, [ record.id ]).then(this.deleteVodCollectionVodThen).catch(() => {
        this.setCollectionVodListItem({
          id: record.id,
          deleteLoading: false
        })
      })
    },
    handleDeleteBatch () {
      this.deleteLoading = true
      const ids = _.map(this.selectedRowKeys, index => this.list.data[index].id)
      deleteVodCollectionVod(this.vcId, ids).then(this.deleteVodCollectionVodThen).finally(() => {
        this.deleteLoading = false
        this.selectedRowKeys = []
      })
    },
    deleteVodCollectionVodThen ({ data }) {
      this.$notification.success({ message: data })
      this.getList({
        vcId: this.vcId,
        params: { ...this.list.params, has: new Date() * 1 }
      })
    }
  }
}
</script>
