/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:24:48
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-06 23:39:40
 */

<template>
  <a-layout-header class="header">
    <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="switchCollapsed" class="switch-collapsed" />
    <div>
      <span>{{ info.name }}</span>
      <a-button @click="logout" :loading="logoutLoading" type="link">退出</a-button>
    </div>
  </a-layout-header>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { delToken }                           from '@/utils/token'
import { logout }                             from '@/api'

export default {
  data () {
    return {
      logoutLoading: false
    }
  },
  computed: {
    ...mapState({
      collapsed: store => store.sider.collapsed,
      info:  store => store.user.info
    })
  },
  created () {
    this.getInfo()
  },
  methods: {
    ...mapMutations('sider', {
      switchCollapsed: 'switchCollapsed',
    }),
    ...mapMutations('admin', {
      deleteInfo: 'deleteInfo'
    }),
    ...mapActions('admin', {
      getInfo: 'getInfo'
    }),
    logout () {
      if (this.logoutLoading) {
        return
      }
      this.logoutLoading = true
      logout().finally(() => {
        this.logoutLoading = false
        delToken()
        this.deleteInfo()
        this.$router.replace({ name: 'login', query: { redirect: encodeURIComponent(this.$route.fullPath) } })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  background: #fff;

  .switch-collapsed {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }
}
</style>
