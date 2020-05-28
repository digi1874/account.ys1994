/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 20:44:52
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-04-01 16:18:26
 */

<template>
  <a-layout-sider class="sider" :collapsed="collapsed">
    <router-link to="/home" class="logo-box">
      <img class="logo" alt="logo" src="@/assets/logo.png">
      <span v-show="!collapsed">个人中心</span>
    </router-link>
    <a-menu
      mode="inline"
      :defaultOpenKeys="defaultOpenKeys"
      :defaultSelectedKeys="defaultSelectedKeys"
      :style="{ borderRight: 0 }"
    >
      <template v-for="item in routes">
        <template v-if="item.sider != false">
          <a-sub-menu v-if="item.children" :key="item.name">
            <span slot="title">
              <a-icon v-if="item.icon" :type="item.icon" />
              <span>{{ item.meta.title }}</span>
            </span>

            <a-menu-item v-for="child in item.children" :key="child.name" v-show="child.sider != false">
              <router-link :to="child.path">
                <a-icon v-if="item.icon" :type="child.icon" />
                {{ child.meta.title }}
              </router-link>
            </a-menu-item>
          </a-sub-menu>

          <a-menu-item v-else :key="item.name">
            <router-link :to="item.path">
              <a-icon v-if="item.icon" :type="item.icon" />
              <span>{{ item.meta.title }}</span>
            </router-link>
          </a-menu-item>
        </template>
      </template>
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
      return [this.$route.path.replace(/\/(.+?)\/.+/, '$1')]
    }
  }
}
</script>

<style lang="scss">
.sider {
  overflow-x: hidden;
  min-height: 100vh;
  background-color: #fff;

  .logo-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    line-height: 64px;
    font-size: 24px;
    color: #fff;
    background-color: #002344;
    white-space: nowrap;

    .logo {
      width: 40px;
    }

    span {
      margin-left: 10px;
    }
  }
}
</style>
