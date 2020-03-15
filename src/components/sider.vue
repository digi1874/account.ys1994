/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 20:44:52
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-07 15:07:08
 */

<template>
  <a-layout-sider class="sider" :collapsed="collapsed">
    <router-link to="/index" class="logo-box">
      <img class="logo" alt="logo" src="@/assets/logo.png">
      <span v-show="!collapsed">个人中心</span>
    </router-link>
    <a-menu
      :defaultOpenKeys="defaultOpenKeys"
      :defaultSelectedKeys="defaultSelectedKeys"
      theme="dark"
      mode="inline"
    >
      <a-sub-menu v-for="item in routes" :key="item.name" v-show="item.sider != false">
        <template v-if="item.sider != false">
          <span slot="title">
            <a-icon v-if="item.icon" :type="item.icon" />
            <span>{{ item.meta.title }}</span>
          </span>

          <a-menu-item v-for="child in item.children" :key="child.name" v-show="item.sider != false">
            <template v-if="child.sider != false">
              <a-icon v-if="child.icon" :type="child.icon" />
              <router-link :to="child.path">{{ child.meta.title }}</router-link>
            </template>
          </a-menu-item>
        </template>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapState } from 'vuex'
import { routes }   from '@/router'

export default {
  name: 'sider',
  data () {
    return {
      routes
    }
  },
  computed: {
    ...mapState({
      collapsed: store => store.sider.collapsed
    }),
    defaultSelectedKeys () {
      return [this.$route.name]
    },
    defaultOpenKeys () {
      // 子路由名以驼峰命名，前面小写字母是其父路由名
      return [this.$route.name.replace(/[A-Z].+/, '')]
    }
  }
}
</script>

<style lang="scss" scoped>
.sider {
  overflow-y: auto;
  height: 100vh;

  .logo-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    line-height: 64px;
    text-align: center;
    font-size: 24px;
    color: #fff;
    background-color: #002344;
    white-space: nowrap;
    overflow: hidden;

    .logo {
      width: 40px;
    }

    span {
      margin-left: 10px;
    }
  }
}
</style>
