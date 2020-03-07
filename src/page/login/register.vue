/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-07 11:21:27
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-07 13:11:43
 */

<template>
  <div class="login-page">
    <a-form
      :form="form"
      class="form"
      @submit.prevent="handleSubmit"
    >
      <h1 class="form-header">欢迎注册影视1994账号</h1>
      <a-form-item>
        <a-input
          v-decorator="[
            'number',
            { rules: [
              { required: true, message: '账号不为空' },
              { min: 6, max: 20, message: '账号长度为6~20字符' },
              { validator: validateExistNumber }
            ] }
          ]"
          placeholder="账号"
          allowClear
          @blur="numberExist"
        >
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            { rules: [
              { required: true, message: '密码不能为空' },
              { min: 6, message: '密码不能少于6字符' },
              { validator: validateToNextPassword }
            ] }
          ]"
          type="password"
          placeholder="密码"
          allowClear
        >
          <a-icon slot="prefix" type="lock" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'confirm',
            { rules: [
              { required: true, message: '确认密码不能为空' },
              { validator: compareToFirstPassword }
            ] }
          ]"
          type="password"
          placeholder="确认密码"
          allowClear
        >
          <a-icon slot="prefix" type="lock" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button :loading="loading" type="primary" html-type="submit" block>注册</a-button>
      </a-form-item>
      <router-link :to="{ name: 'login', query: $route.query }" replace class="link">已有帐号？登录</router-link>
    </a-form>
  </div>
</template>

<script>
import _                         from 'lodash'
import { mapState, mapActions }  from 'vuex'
import { register, numberExist } from '@/api'
import { encrypt }               from '@/utils/jsencrypt'
import { setToken, getToken }    from '@/utils/token'

export default {
  data () {
    return {
      form: this.$form.createForm(this),
      isExistNumber: false,
      existNumber: '',
      loading: false
    }
  },
  computed: {
    ...mapState({
      pubKey: store => store.rsa.pubKey
    })
  },
  created () {
    if (getToken()) {
      this.goRedirect()
    } else {
      !this.pubKey && this.getRsaPubKey()
    }
  },
  methods: {
    ...mapActions('rsa', {
      getRsaPubKey: 'getRsaPubKey'
    }),
    numberExist() {
      this.form.validateFields(['number']).then(({ number }) => {
        if (this.existNumber === number) {
          return
        }

        this.existNumber = number
        this.isExistNumber = false
        numberExist({ number }).then(({ data }) => {
          this.isExistNumber = data
          this.form.validateFields(['number'], { force: true })
        })
      })
    },
    validateExistNumber(rule, value, callback) {
      if (value && this.existNumber === value && this.isExistNumber) {
        callback('账号不可注册')
      } else {
        callback()
      }
    },
    validateToNextPassword(rule, value, callback) {
      value && this.form.getFieldValue('confirm') && this.form.validateFields(['confirm'], { force: true })
      callback()
    },
    compareToFirstPassword(rule, value, callback) {
      if (value && value !== this.form.getFieldValue('password')) {
        callback('两次密码输入不一致！')
      } else {
        callback()
      }
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          register({ data: encrypt(_.pick(values, ['number', 'password']), this.pubKey) }).then(({ data }) => {
            if (setToken(data)) {
              this.goRedirect()
            }
          }).finally(() => {
            this.loading = false
          })
        }
      })
    },
    goRedirect () {
      this.$route.query.redirect ?
        this.$router.replace(decodeURIComponent(this.$route.query.redirect)) :
        this.$router.replace('/')
    }
  }
}
</script>
