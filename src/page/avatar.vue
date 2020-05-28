/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-07 14:48:12
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-27 16:50:15
 */

<template>
  <div>
    <a-divider orientation="left">我的头像</a-divider>

    <UploadImage :src="userInfo.avatar" @change="updateInfo" :width="100" :height="100" />

    <div v-if="myAvatarList.count" class="list">
      <a-divider orientation="left">我上传的头像</a-divider>
      <div class="avatar-list">
        <a-avatar v-for="item in myAvatarList.data" :key="item.id" @click="updateInfo(item.image)" :src="item.image | imageUrl" :size="80" shape="square" class="item"/>
      </div>
      <a-pagination
        @change="(page, pageSize) => getMyAvatarList({ page, size: pageSize, filter: { userId: userInfo.id } })"
        :current="myAvatarList.page"
        :total="myAvatarList.count"
        :pageSize="myAvatarList.size"
      />
    </div>

    <div v-if="avatarList.count" class="list">
      <a-divider orientation="left">全部头像</a-divider>
      <div class="avatar-list">
        <a-avatar v-for="item in avatarList.data" :key="item.id" @click="updateInfo(item.image)" :src="item.image | imageUrl" :size="80" shape="square" class="item"/>
      </div>
      <a-pagination
        @change="(page, pageSize) => getAvatarList({ page, size: pageSize })"
        :current="avatarList.page"
        :total="avatarList.count"
        :pageSize="avatarList.size"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { updateInfo } from '@/api'
import UploadImage from '@/components/uploadImage'

export default {
  components: {
    UploadImage
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState({
      userInfo: store => store.user.info,
      myAvatarList: store => store.avatar.myAvatarList,
      avatarList: store => store.avatar.avatarList
    })
  },
  watch: {
    userInfo (val) {
      val.id && !this.myAvatarList.count && this.getMyAvatarList({ page: 1, filter: { userId: val.id } })
    }
  },
  created () {
    !this.avatarList.count && this.getAvatarList({ page: 1 })
    this.userInfo.id && !this.myAvatarList.count && this.getMyAvatarList({ page: 1, filter: { userId: this.userInfo.id } })
  },
  methods: {
    ...mapMutations('user', {
      setInfo: 'setInfo'
    }),
    ...mapActions('avatar', {
      getAvatarList: 'getAvatarList',
      getMyAvatarList: 'getMyAvatarList'
    }),
    updateInfo(image) {
      this.userInfo.avatar.image !== image &&
      updateInfo({ avatar: image }).then(()=> {
        this.$notification.success({
          message: '更换头像成功'
        })
        this.setInfo({
          ...this.userInfo,
          avatar: image
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  margin-top: 30px;
}
.avatar-list {
  display: flex;
  margin-bottom: 15px;

  .item {
    margin-right: 10px;
    cursor: pointer;
    border: 1px dashed #d9d9d9;
  }
}
</style>
