/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:50:54
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-06 22:49:00
 */

<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  name: 'app',
  data() {
    return {
      locale: zhCN
    }
  }
}
</script>
