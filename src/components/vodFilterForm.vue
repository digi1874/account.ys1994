/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-29 09:09:08
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-19 10:30:33
 */

<template>
  <a-form @submit.prevent="handleSearch" class="filter-form">
    <a-row :gutter="24">
      <a-col :span="8">
        <a-form-item label="id">
          <a-input-number v-model="formData.id" :min="1" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="片名">
          <a-input v-model="formData.name" allowClear/>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="导演">
          <a-input v-model="formData.director" allowClear />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="主演">
          <a-input v-model="formData.actor" allowClear />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="更新">
          <a-select v-model="formData.serial" allowClear>
            <a-select-option v-for="item in VOD.SERIAL_LIST" :key="item" :value="item">{{ item }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="类型">
          <a-select v-model="formData.typeId" allowClear>
            <a-select-option v-for="(value, key) in VOD.TYPE_TEXTS" :key="key" :value="key*1">{{ value }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row v-show="expand" :gutter="24">
      <a-col :span="8">
        <a-form-item label="年份">
          <a-select v-model="formData.year" allowClear>
            <a-select-option v-for="value in 50" :key="value" :value="currentYear - value + 1">{{ currentYear - value + 1 }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="地区">
          <a-select v-model="formData.area" allowClear>
            <a-select-option v-for="item in VOD.AREA_LIST" :key="item" :value="item">{{ item }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="语言">
          <a-select v-model="formData.lang" allowClear>
            <a-select-option v-for="item in VOD.LANG_LIST" :key="item" :value="item">{{ item }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24" :style="{ textAlign: 'right' }">
        <a-button type="primary" html-type="submit" icon="search" :loading="searchLoading">
          搜索
        </a-button>
        <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
          重置
        </a-button>
        <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="expand = !expand">
          展开 <a-icon :type="expand ? 'up' : 'down'" />
        </a>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import moment from 'moment'
import { VOD } from '@/dict'

export default {
  props: {
    value: Object,
    searchLoading: Boolean
  },
  data () {
    const formData = { ...this.value }
    if (this.value.typePId) {
      formData.typeId = this.value.typePId
    }
    return {
      formData,
      expand: false,
      currentYear: moment().year(),
      VOD
    }
  },
  methods: {
    handleReset () {
      this.formData = {}
    },
    handleSearch () {
      this.$emit('search', this.formData)
    }
  }
}
</script>
