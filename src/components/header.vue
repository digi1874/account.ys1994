/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:24:48
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-19 10:45:33
 */

<template>
  <a-layout-header class="header">
    <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="switchCollapsed" class="switch-collapsed" />
    <div class="right">
      <router-link to="/messageList" class="link">
        <a-badge :count="unreadCountTotal">
          <a-icon type="bell" style="font-size: 24px;color:#fff;" />
        </a-badge>
      </router-link>
      <a-avatar v-if="!userInfo.avatar" icon="user" />
      <a-avatar v-if="userInfo.avatar" :src="userInfo.avatar | imageUrl" />
      <span style="margin-left:10px;color:#fff;">{{ userInfo.name }}</span>
      <a-button @click="logout" :loading="logoutLoading" type="link" icon="logout" ghost>
        退出
      </a-button>
    </div>
  </a-layout-header>
</template>

<script>
import { mapState, mapMutations, mapActions }   from 'vuex'
import { getTokenSignature, delToken, goLogin } from '@/utils'
import { logout }                               from '@/api'

export default {
  data () {
    return {
      logoutLoading: false
    }
  },
  computed: {
    ...mapState({
      collapsed: store => store.sider.collapsed,
      userInfo:  store => store.user.info,
      unreadCountTotal: store => store.message.unreadCount.total
    })
  },
  created () {
    this.getInfo()
    this.getMessageUnreadCount()
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
    ...mapActions('message', {
      getMessageUnreadCount: 'getUnreadCount'
    }),
    logout () {
      if (this.logoutLoading) {
        return
      }
      this.logoutLoading = true
      const { ip } = this.$ipInfo
      logout(getTokenSignature(ip)).finally(() => {
        this.logoutLoading = false
        delToken(ip)
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
  color: #fff;

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

    .link {
      display: flex;
      align-items: center;
      padding: 0 20px;
    }
  }
}
</style>
