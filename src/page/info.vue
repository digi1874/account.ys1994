/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-16 12:14:49
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-17 22:11:18
 */

<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit.prevent="handleSubmit">
    <a-form-item label="昵称">
      <a-input
        :allowClear="true"
        v-decorator="['name', { rules: [
          { required: true, message: '昵称不能空' },
          { max: 20, message: '昵称不能超过20字' }
        ] }]"
        placeholder="你的昵称"
      />
    </a-form-item>
    <a-form-item label="性别">
      <a-select
        v-decorator="['sex']"
        placeholder="选择性别"
      >
        <a-select-option :value="1">
          保密
        </a-select-option>
        <a-select-option :value="2">
          男
        </a-select-option>
        <a-select-option :value="3">
          女
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="生日">
      <a-date-picker
        :showToday="false"
        :allowClear="false"
        :disabledDate="disabledDate"
        v-decorator="['birthday']"
        placeholder="选择生日"
      />
    </a-form-item>
    <a-form-item label="签名">
      <a-textarea
        :autoSize="{ minRows: 3, maxRows: 5 }"
        v-decorator="['autograph', { rules: [{ max: 200, message: '签名不能超过200字' }] }]"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button :loading="submitLoading" type="primary" html-type="submit">
        提交
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import _                          from 'lodash'
import moment                     from 'moment'
import { mapState, mapMutations } from 'vuex'
import { notification }           from 'ant-design-vue'
import { updateInfo }             from '@/api'

export default {
  data() {
    return {
      form: this.$form.createForm(this),
      submitLoading: false
    }
  },
  computed: {
    ...mapState({
      userInfo: store => store.user.info
    })
  },
  watch: {
    userInfo () {
      this.setFieldsValue()
    }
  },
  mounted () {
    this.userInfo.id && this.setFieldsValue()
  },
  methods: {
    ...mapMutations('user', {
      setInfo: 'setInfo'
    }),
    handleSubmit() {
      if (this.submitLoading) {
        notification.info({ message: '正在提交' })
        return
      }
      this.form.validateFields((err, fieldsValue) => {
        if (!err) {
          fieldsValue.birthday = fieldsValue.birthday && fieldsValue.birthday.unix()
          const values = {}
          _.forEach(fieldsValue, (value, key) => {
            if (this.userInfo[key] !== value) {
              values[key] = value
            }
          })
          if (_.isEmpty(values)) {
            notification.info({ message: '您还没更改信息' })
          }else{
            this.submitLoading = true
            updateInfo(values).then(({ data }) => {
              this.setInfo({
                ...this.userInfo,
                ...values
              })
              notification.success({
                message: data
              })
            }).finally(() => {
              this.submitLoading = false
            })
          }
        }
      })
    },
    setFieldsValue () {
      this.form.setFieldsValue({
        ..._.pick(this.userInfo, ['name', 'sex', 'autograph']),
        birthday: this.userInfo.birthday && moment.unix(this.userInfo.birthday)
      })
    },
    disabledDate(current) {
      return current && current > moment().endOf('day')
    }
  }
}
</script>
