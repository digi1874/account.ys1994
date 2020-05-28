/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-29 10:01:14
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-31 11:09:41
 */

<template>
  <a-table
    @change="handleChange"
    :columns="columns"
    :dataSource="listData.data"
    :loading="listData.loading"
    :pagination="pagination"
    :scroll="scroll"
    :rowSelection="rowSelection"
  >
    <template v-slot:name="text, record">
      <a-tooltip placement="right" :title="text">
        <div class="text-overflow">
          <a :href="VOD.WEB_HREF + 'detail?id=' + record.id + '&jwt=' + token" target="_blank">{{ text }}</a>
        </div>
      </a-tooltip>
    </template>
    <template v-slot:play="text, record">
      <a-tooltip placement="right" :title="`${text} ${record.time}`">
        <div class="text-overflow">
          <a :href="VOD.WEB_HREF + 'play?type=1&id=' + record.id + '&urlId=' + record.m3u8.id + '&jwt=' + token" target="_blank">
            {{ text }} {{ record.time }}
          </a>
        </div>
      </a-tooltip>
    </template>
    <template v-slot:type="text">
      {{ text | vodType }}
    </template>
    <template v-slot:overflow="text">
      <a-tooltip placement="right" :title="text">
        <div class="text-overflow">{{ text }}</div>
      </a-tooltip>
    </template>
    <template v-slot:action="text, record">
      <slot name="action" v-bind:text="text" v-bind:record="record"/>
    </template>
  </a-table>
</template>

<script>
import { VOD } from '@/dict'
import { getToken } from '@/utils'

export default {
  props: {
    columns: Object,
    listData: Object,
    scroll: Object,
    rowSelection: Object
  },
  data () {
    return {
      VOD,
      token: getToken(this.$ipInfo.ip)
    }
  },
  computed: {
    pagination () {
      return {
        pageSize: this.listData.size,
        total: this.listData.count,
        current: this.listData.page,
        showSizeChanger: true,
        showTotal: total => `共${total}条记录`
      }
    }
  },
  methods: {
    handleChange (pagination) {
      this.$emit('change', pagination)
    }
  }
}
</script>
