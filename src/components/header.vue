/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:24:48
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-16 22:06:17
 */

<template>
  <a-layout-header class="header">
    <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="switchCollapsed" class="switch-collapsed" />
    <div class="right">
      <a-avatar v-if="!info.avatar" icon="user" />
      <a-avatar v-if="info.avatar" :src="info.avatar | imageUrl" class="avatar"/>
      <span style="margin-left:10px;">{{ info.name }}</span>
      <a-button @click="logout" :loading="logoutLoading" type="link" ghost>退出</a-button>
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
  background: #002344;

  .switch-collapsed {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    color: #fff;

    &:hover {
      color: #1890ff;
    }
  }

  .right {
    display: flex;
    align-items: center;
  }

  .avatar {
    background-color: #fafafa;
  }
}
</style>
