/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:51:41
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-16 12:14:14
 */

<template>
  <a-layout>
    <!-- 左侧 -->
    <Sider />

    <a-layout class="right-side">
      <!-- 头部 -->
      <Header />

      <a-layout-content>
        <a-card class="card">
          <!-- 页面 -->
          <router-view></router-view>
        </a-card>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Header from '@/components/header'
import Sider  from '@/components/sider'

export default {
  components: { Header, Sider },
}
</script>

<style lang="scss" scoped>
.right-side {
  overflow-y: auto;
  flex-grow: 1;
  width: calc(100vw - 200px);
  height: 100vh;
}
.card {
  margin: 15px;
}
</style>
