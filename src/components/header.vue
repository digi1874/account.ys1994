/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:24:48
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-15 22:08:45
 */

<template>
  <a-layout-header class="header">
    <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="switchCollapsed" class="switch-collapsed" />
    <div class="right">
      <a-avatar icon="user" />
      <span style="margin-left:10px;">{{ info.name || '用户' + info.id }}</span>
      <a-button @click="logout" :loading="logoutLoading" type="link">退出</a-button>
    </div>
  </a-layout-header>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { delToken, goLogin }                  from '@/utils'
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
    ...mapMutations('user', {
      deleteInfo: 'deleteInfo'
    }),
    ...mapActions('user', {
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
        goLogin()
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

  .right {
    display: flex;
    align-items: center;
  }
}
</style>
