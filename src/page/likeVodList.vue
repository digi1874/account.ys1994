/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-28 09:59:43
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-19 10:41:01
 */

<template>
  <div>
    <VodFilterForm :value="list.params.filter" :searchLoading="list.loading" @search="handleSearch" />

    <VodTable
      @change="handleChange"
      :columns="columns"
      :listData="list"
      :scroll="{ x: 1300 }"
    >
      <template v-slot:action="{ record }">
        <a-button
          :loading="record.likeLoading"
          :type="record.likeState ? 'danger' : ''"
          @click="likeVod(record)"
        >{{ record.likeState ? '' : '已' }}取消收藏</a-button>
      </template>
    </VodTable>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import VodFilterForm from '@/components/vodFilterForm'
import VodTable from '@/components/vodTable'
import { likeVod } from '@/api'
import { VOD } from '@/dict'

export default {
  components: {
    VodFilterForm,
    VodTable
  },
  data () {
    return {
      VOD,
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
          width: 150
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
          width: 200
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
          width: 150,
          fixed: 'right'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      list: store => store.vod.likeList
    })
  },
  created () {
    !this.list.count && this.getList({ page: 1, size: 10, filter: this.list.params.filter })
  },
  methods: {
    ...mapActions('vod', {
      getList: 'getLikeList'
    }),
    ...mapMutations('vod', {
      setLikeListItem: 'setLikeListItem'
    }),
    handleSearch (filter) {
      this.getList({ page: 1, size: this.list.size, filter })
    },
    handleChange (pagination) {
      this.getList({ page: pagination.current, size: pagination.pageSize, filter: this.list.params.filter })
    },
    likeVod (record) {
      this.setLikeListItem({ ...record, likeLoading: true })
      likeVod(record.id).then(({ data }) => {
        this.$notification.success({ message: data === 1 ? '收藏成功' : '取消收藏成功' })
        this.setLikeListItem({ ...record, likeState: data === 1 })
      }).finally(() => {
        this.setLikeListItem({ ...record, likeLoading: false })
      })
    }
  }
}
</script>
