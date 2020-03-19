/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-18 10:56:53
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-19 15:40:39
 */

<template>
  <div>
    <a-form @submit.prevent="handleSearch" class="login-filter-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="IP">
            <a-input v-model="formData.ip" placeholder="搜索IP"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="地区">
            <a-input v-model="formData.country" placeholder="搜索地区"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="网站">
            <a-select
              v-model="formData.websiteId"
              placeholder="搜索登录网站"
              @search="handleSearchWebsite"
              @focus="handleSearchWebsite"
              :notFoundContent="null"
              :defaultActiveFirstOption="false"
              :showArrow="false"
              :filterOption="false"
              allowClear
              showSearch
            >
              <a-select-option v-for="item in websiteList.data" :key="item.id" :value="item.id">{{item.host}}{{item.title && `（${item.title}）`}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit">
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
      :scroll="{ x: 1300 }"
    >
      <template slot="createdAt" slot-scope="text">
        {{ text | formatDate }}
      </template>
      <template slot="exp" slot-scope="text">
        {{ text | formatUnix }}
      </template>
      <template slot="website" slot-scope="text">
        <a-tooltip placement="right" :title="text.title">
          {{ text.host }}
        </a-tooltip>
      </template>
      <template slot="state" slot-scope="text, record">
        <template v-if="record.signature == signature">
          当前使用
        </template>
        <template v-else-if="record.exp < nowUinx">
          已过期
        </template>
        <template v-else>
          {{ text | loginState }}
        </template>
      </template>
      <template slot="action" slot-scope="text, record">
        <a-button
          v-if="record.state == 1 && nowUinx < record.exp"
          @click="logout(record)"
          :loading="record.logoutLoading"
          type="link"
        >退出</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import moment from 'moment'
import { getTokenSignature, delToken, goLogin } from '@/utils'
import { logout } from '@/api'

export default {
  data () {
    return {
      formData: {},
      signature: getTokenSignature(this.$ipInfo.ip),
      nowUinx: moment().unix(),
      columns: [
        {
          title: 'IP',
          dataIndex: 'ip',
          key: 'ip',
          width: 140
        },
        {
          title: '地区',
          dataIndex: 'country',
          key: 'country'
        },
        {
          title: '登录时间',
          dataIndex: 'createdAt',
          key: 'createdAt',
          scopedSlots: { customRender: 'createdAt' }
        },
        {
          title: '过期时间',
          dataIndex: 'exp',
          key: 'exp',
          scopedSlots: { customRender: 'exp' }
        },
        {
          title: '登录网站',
          dataIndex: 'website',
          key: 'website',
          scopedSlots: { customRender: 'website' }
        },
        {
          title: '说明',
          dataIndex: 'message',
          key: 'message'
        },
        {
          title: '状态',
          dataIndex: 'state',
          key: 'state',
          scopedSlots: { customRender: 'state' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: 150
        }
      ]
    }
  },
  computed: {
    ...mapState({
      list: store => store.login.list,
      userInfo: store => store.user.info,
      pagination: store => {
        const { list } = store.login
        return {
          pageSize: list.size,
          total: list.count,
          current: list.page,
          showSizeChanger: true,
          showTotal: total => `共${total}条记录`
        }
      },
      websiteList: store => store.website.list,
    })
  },
  created () {
    this.formData = { ...this.list.params.filter }
    !this.list.count && this.getList({ page: 1, size: 10, filter: { ...this.formData } })
  },
  methods: {
    ...mapActions('login', {
      getList: 'getList'
    }),
    ...mapActions('website', {
      getWebsiteList: 'getList'
    }),
    ...mapMutations('login', {
      deleteInfo: 'deleteInfo',
      setListItem: 'setListItem'
    }),
    handleSearch () {
      this.getList({ page: 1, size: this.list.size, filter: { ...this.formData } })
    },
    handleReset () {
      this.formData = {}
    },
    logout (record) {
      this.setListItem({ ...record, logoutLoading: true })
      logout(record.signature).then(() => {
        this.setListItem({ id: record.id, state: 2 })
        if (record.signature === this.signature) {
          delToken(this.$ipInfo.ip)
          this.deleteInfo()
          goLogin()
        }
      }).finally(() => {
        this.setListItem({ id: record.id, logoutLoading: false })
      })
    },
    handleChange (pagination) {
      this.getList({ page: pagination.current, size: pagination.pageSize, filter: { ...this.formData }  })
    },
    handleSearchWebsite (host) {
      this.getWebsiteList({ size: 10, filter: { host } })
    }
  }
}
</script>

<style lang="scss">
.login-filter-form {
  margin-bottom: 30px;

  .ant-form-item {
    display: flex;
  }
  .ant-form-item-control-wrapper {
    flex-grow: 1;
  }
}
</style>
