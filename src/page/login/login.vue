/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:24:58
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-07 12:38:55
 */

<template>
  <div class="login-page">
    <a-form
      :form="form"
      class="form"
      @submit.prevent="handleSubmit"
    >
      <h1 class="form-header">欢迎登录影视1994</h1>
      <a-form-item>
        <a-input
          v-decorator="[
            'number',
            { rules: [{ required: true, message: '账号不为空' }] },
          ]"
          placeholder="账号"
          allowClear
        >
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: '密码不能为空' }] },
          ]"
          type="password"
          placeholder="密码"
          allowClear
        >
          <a-icon slot="prefix" type="lock" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button :loading="loading" type="primary" html-type="submit" block>登录</a-button>
      </a-form-item>
      <router-link :to="{ name: 'register', query: $route.query }" replace class="link">立即注册</router-link>
    </a-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { login }                from '@/api'
import { encrypt }              from '@/utils/jsencrypt'
import { setToken, getToken }   from '@/utils/token'

export default {
  data () {
    return {
      form: this.$form.createForm(this),
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
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          login({ data: encrypt(values, this.pubKey) }).then(({ data }) => {
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

<style lang="scss">
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10% 20px;
  min-height: 100vh;
  background-color: #001529;

  .form {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 20px;
    width: 400px;
    background-color: rgba(255,255,255,.25);
  }

  .form-header {
    align-self: center;
    color: #fff;
  }

  .link {
    align-self: flex-end;
  }
}
</style>