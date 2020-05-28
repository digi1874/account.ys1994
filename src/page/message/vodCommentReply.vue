/*
 * @Author: lin.zhenhui
 * @Date: 2020-05-13 15:05:42
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-19 10:37:37
 */

<template>
  <div>
    <a-form @submit.prevent="handleSearch" class="filter-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="状态">
            <a-select v-model="formData.read" allowClear>
              <a-select-option v-for="(value, key) in MESSAGE.READ_STATE_TEXTS" :key="key" :value="key*1">{{ value }}</a-select-option>
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

    <div style="margin-bottom: 16px;">
      <a-popconfirm
        title="您确定要删除吗？"
        ok-text="确定"
        cancel-text="取消"
        @confirm="handleDeleteBatch"
      >
        <a-button type="danger" :disabled="!selectedRowKeys.length" :loading="deleteLoading" icon="delete">
          批量删除
        </a-button>
      </a-popconfirm>
      <span v-if="selectedRowKeys.length" style="margin-left: 8px">
        {{`选择 ${selectedRowKeys.length} 个`}}
      </span>
      <a-button
        @click="readAll"
        :loading="readAllLoading"
        :disabled="unreadCount.vodCommentReplyCount===0"
        style="margin-left: 10px"
      >标记全部为已读</a-button>
    </div>

    <a-table
      @change="handleChange"
      :columns="columns"
      :dataSource="list.data"
      :loading="list.loading"
      :pagination="pagination"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :scroll="{ x: 1000 }"
    >
      <template v-slot:content="text, record">
        <a-tooltip placement="right" :title="text">
          <div class="text-overflow" @click="read(record)">
            <a
              :href="`${VOD.WEB_HREF}vodComment/detail?vodId=${record.vodCommentReply.vodComment.vodId}&id=${record.vodCommentReply.vodComment.id}&page=1&jwt=${token}`"
              target="_blank"
            >{{ text }}</a>
          </div>
        </a-tooltip>
      </template>
      <template v-slot:user="text, record">
        {{ text || '用户' + record.vodCommentReply.user.id }}
      </template>
      <template v-slot:unix="text">
        {{ text | formatUnix }}
      </template>
      <template v-slot:read="text">
        {{ text | messageReadState }}
      </template>
      <template slot="action" slot-scope="text, record">
        <a-popconfirm
          title="您确定要删除吗？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleDelete(record)"
        >
          <a-button
            type="danger"
            :loading="record.deleteLoading"
            icon="delete"
          >删除</a-button>
        </a-popconfirm>
        <a-button
          v-if="record.read == 1"
          @click="read(record)"
          :loading="record.readLoading || readAllLoading || record.deleteLoading"
          :style="{ marginLeft: '8px' }"
        >标记为已读</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapMutations, mapActions } from 'vuex'
import { MESSAGE, VOD } from '@/dict'
import { readVodCommentReplyAt, deleteVodCommentReplyAt } from '@/api'
import { getToken } from '@/utils'

export default {
  data () {
    return {
      VOD,
      MESSAGE,
      token: getToken(this.$ipInfo.ip),
      formData: {},
      selectedRowKeys: [],
      deleteLoading: false,
      readAllLoading: false,
      columns: [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          width: 100
        },
        {
          title: '评论',
          dataIndex: 'vodCommentReply.content',
          key: 'vodCommentReply.content',
          scopedSlots: { customRender: 'content' },
          width: 300
        },
        {
          title: '评论者',
          dataIndex: 'vodCommentReply.user.name',
          key: 'vodCommentReply.user.name',
          scopedSlots: { customRender: 'user' },
          width: 200
        },
        {
          title: '时间',
          dataIndex: 'updatedTime',
          key: 'updatedTime',
          scopedSlots: { customRender: 'unix' },
          width: 200
        },
        {
          title: '状态',
          dataIndex: 'read',
          key: 'read',
          scopedSlots: { customRender: 'read' },
          width: 80
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: 250,
          fixed: 'right'
        }
      ],
      orders: JSON.stringify([['updated_time', 'DESC']])
    }
  },
  computed: {
    ...mapState({
      list: store => store.message.vodCommentReplyAtList,
      unreadCount: store => store.message.unreadCount
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
    !this.list.count && this.getList({ page: 1, size: 10, orders: this.orders })
  },
  methods: {
    ...mapMutations('message', {
      setListItem: 'setVodCommentReplyAtListItem',
      setUnreadCount: 'setUnreadCount'
    }),
    ...mapActions('message', {
      getList: 'getVodCommentReplyAtList',
      getUnreadCount: 'getUnreadCount'
    }),
    handleReset () {
      this.formData = {}
    },
    handleSearch () {
      this.getList({ page: 1, size: this.list.size, filter: this.formData, orders: this.orders })
    },
    handleChange (pagination) {
      this.getList({ page: pagination.current, size: pagination.pageSize, filter: this.list.params.filter, orders: this.orders })
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    read (record) {
      if (record.read === 2) return

      this.setListItem({
        id: record.id,
        readLoading: true
      })

      readVodCommentReplyAt([record.id]).finally(() => {
        this.setListItem({
          id: record.id,
          read: 2,
          readLoading: false
        })
        this.setUnreadCount({
          ...this.unreadCount,
          vodCommentReplyCount: this.unreadCount.vodCommentReplyCount - 1
        })
      })
    },
    readAll () {
      this.readAllLoading = true
      readVodCommentReplyAt().then(() => {
        this.setUnreadCount({
          ...this.unreadCount,
          vodCommentReplyCount: 0
        })

        _.forEach(this.list.data, item => {
          this.setListItem({
            id: item.id,
            read: 2
          })
        })
      }).finally(() => {
        this.readAllLoading = false
      })
    },
    handleDelete (record) {
      this.setListItem({
        id: record.id,
        deleteLoading: true
      })
      deleteVodCommentReplyAt({ ids: [ record.id ] }).then((res) => {
        if (record.read === 1) {
          this.setUnreadCount({
            ...this.unreadCount,
            vodCommentReplyCount: this.unreadCount.vodCommentReplyCount - 1
          })
        }
        this.deleteThen(res)
      }).catch(() => {
        this.setListItem({
          id: record.id,
          deleteLoading: false
        })
      })
    },
    handleDeleteBatch () {
      this.deleteLoading = true
      const ids = _.map(this.selectedRowKeys, index => this.list.data[index].id)
      deleteVodCommentReplyAt({ ids }).then((res) => {
        this.getUnreadCount()
        this.deleteThen(res)
      }).finally(() => {
        this.deleteLoading = false
      })
    },
    deleteThen ({ data }) {
      this.selectedRowKeys = []
      this.$notification.success({ message: data })
      this.getList({ ...this.list.params, has: new Date() * 1 })
    }
  }
}
</script>
