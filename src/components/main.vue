/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:51:41
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-04-01 16:06:50
 */

<template>
  <a-layout>
    <!-- 左侧 -->
    <Sider />

    <a-layout>
      <!-- 头部 -->
      <Header />

      <a-layout-content>
        <a-card class="card">
          <!-- 页面 -->
          <router-view></router-view>
        </a-card>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        ys1994 ©2020 Created by lin07
      </a-layout-footer>
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
.card {
  margin: 15px;
}
</style>
