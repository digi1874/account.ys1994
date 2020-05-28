/*
 * @Author: lin.zhenhui
 * @Date: 2020-04-01 12:38:13
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-19 10:30:29
 */

<template>
  <a-modal
    title="视频选择"
    :visible="visible"
    @ok="handleOk"
    :okButtonProps="{ props: { disabled: !selectedRowKeys.length } }"
    :confirmLoading="confirmLoading"
    @cancel="showModal(false)"
    width="95%"
  >
    <VodFilterForm :value="list.params.filter" :searchLoading="list.loading" @search="handleSearch" />
    <VodTable
      v-if="list.page"
      @change="handleChange"
      :columns="columns"
      :listData="list"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :scroll="{ x: 1300 }"
    />
  </a-modal>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'
import VodFilterForm from './vodFilterForm'
import VodTable from './vodTable'

export default {
  components: {
    VodFilterForm,
    VodTable
  },
  props: {
    confirmLoading: Boolean
  },
  data () {
    return {
      visible: false,
      selectedRowKeys: [],
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
    }
  },
  computed: {
    ...mapState({
      list: store => store.vod.list
    })
  },
  methods: {
    ...mapActions('vod', {
      getList: 'getList'
    }),
    showModal (visible = true) {
      this.visible = visible
    },
    handleSearch (filter) {
      this.getList({ page: 1, size: this.list.size || 10, filter, sync: 1 })
    },
    handleChange (pagination) {
      this.getList({ page: pagination.current, size: pagination.pageSize, filter: this.list.params.filter, sync: 1 })
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleOk () {
      const ids = _.map(this.selectedRowKeys, index => this.list.data[index].id)
      const list = _.map(this.selectedRowKeys, index => this.list.data[index])
      this.$emit('ok', ids, list)
    }
  }
}
</script>
