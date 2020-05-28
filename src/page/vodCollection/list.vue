/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-30 22:40:58
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-19 10:47:50
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
        <a-col :span="8">
          <a-form-item label="分享">
            <a-select v-model="formData.share" allowClear>
              <a-select-option v-for="(value, key) in VOD.COLLECTION_SHARE_TEXTS" :key="key" :value="key*1">{{ value }}</a-select-option>
            </a-select>
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

    <a-row type="flex" justify="space-between" style="margin-bottom: 16px">
      <div>
        <a-button type="danger" @click="handleDeleteBatch" :disabled="!selectedRowKeys.length" :loading="deleteLoading" icon="delete">
          批量删除
        </a-button>
        <span v-if="selectedRowKeys.length" style="margin-left: 8px">
          {{`选择 ${selectedRowKeys.length} 个`}}
        </span>
      </div>
      <router-link to="/vodCollection/add"><a-button icon="plus">新增</a-button></router-link>
    </a-row>

    <a-table
      @change="handleChange"
      :columns="columns"
      :dataSource="list.data"
      :loading="list.loading"
      :pagination="pagination"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
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
      <template v-slot:share="text">
        {{ text | vodCollectionShare }}
      </template>
      <template v-slot:state="text">
        {{ text | vodCollectionState }}
      </template>
      <template v-slot:overflow="text">
        <a-tooltip placement="right" :title="text">
          <div class="text-overflow">{{ text }}</div>
        </a-tooltip>
      </template>
      <template v-slot:action="text, record">
        <a-button @click="goDetail(record)" icon="eye">查看</a-button>
        <a-button type="danger" @click="handleDelete(record)" :loading="record.deleteLoading" :style="{ marginLeft: '8px' }" icon="delete">删除</a-button>
      </template>
    </a-table>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapState, mapActions, mapMutations } from 'vuex'
import { deleteVodCollection } from '@/api'
import { getToken } from '@/utils'
import { VOD } from '@/dict'

export default {
  data () {
    return {
      VOD,
      formData: {},
      token: getToken(this.$ipInfo.ip),
      selectedRowKeys: [],
      deleteLoading: false,
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
          title: '分享',
          dataIndex: 'share',
          key: 'share',
          scopedSlots: { customRender: 'share' },
          width: 80
        },
        {
          title: '状态',
          dataIndex: 'state',
          key: 'state',
          scopedSlots: { customRender: 'state' },
          width: 80
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: 220,
          fixed: 'right'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      list: store => store.vod.collectionList
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
      getList: 'getCollectionList'
    }),
    ...mapMutations('vod', {
      setCollectionListItem: 'setCollectionListItem',
      setCollectionDetail: 'setCollectionDetail'
    }),
    handleSearch () {
      this.getList({ page: 1, size: this.list.size, filter: this.formData })
    },
    handleChange (pagination) {
      this.getList({ page: pagination.current, size: pagination.pageSize, filter: this.list.params.filter })
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleDelete (record) {
      this.setCollectionListItem({
        id: record.id,
        deleteLoading: true
      })
      deleteVodCollection({ ids: [ record.id ] }).then(this.deleteVodCollectionThen).catch(() => {
        this.setCollectionListItem({
          id: record.id,
          deleteLoading: false
        })
      })
    },
    handleDeleteBatch () {
      this.deleteLoading = true
      const ids = _.map(this.selectedRowKeys, index => this.list.data[index].id)
      deleteVodCollection({ ids }).then(this.deleteVodCollectionThen).finally(() => {
        this.deleteLoading = false
        this.selectedRowKeys = []
      })
    },
    deleteVodCollectionThen ({ data }) {
      this.$notification.success({ message: data })
      this.getList({ ...this.list.params, has: new Date() * 1 })
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
