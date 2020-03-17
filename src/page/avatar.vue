/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-07 14:48:12
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-17 21:30:40
 */

<template>
  <div>
    <a-divider orientation="left">我的头像</a-divider>
    <a-upload
      name="file"
      listType="picture-card"
      class="avatar-uploader"
      :showUploadList="false"
      :beforeUpload="beforeUpload"
      :customRequest="uploadAvatar"
      accept="image/jpeg, image/jpg, image/png"
    >
      <img v-if="userInfo.avatar" :src="userInfo.avatar | imageUrl" alt="avatar" />
      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">上传头像</div>
      </div>
    </a-upload>

    <div v-if="myAvatarList.count" class="list">
      <a-divider orientation="left">我上传的头像</a-divider>
      <div class="avatar-list">
        <a-avatar v-for="item in myAvatarList.data" :key="item.id" @click="updateInfo(item.image)" :src="item.image | imageUrl" :size="80" class="item"/>
      </div>
      <a-pagination
        @change="(page, pageSize) => getMyAvatarList({ page, size: pageSize, filter: { userId: this.userInfo.id } })"
        :current="myAvatarList.page"
        :total="myAvatarList.count"
        :pageSize="myAvatarList.size"
      />
    </div>

    <div v-if="avatarList.count" class="list">
      <a-divider orientation="left">全部头像</a-divider>
      <div class="avatar-list">
        <a-avatar v-for="item in avatarList.data" :key="item.id" @click="updateInfo(item.image)" :src="item.image | imageUrl" :size="80" class="item"/>
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
import { notification } from 'ant-design-vue'
import { compressImage, md5File, urlToImage } from '@/utils'
import { uploadImage, updateInfo } from '@/api'

export default {
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
      val.id && !this.myAvatarList.count && this.getMyAvatarList({ page: 1, size: 1, filter: { userId: val.id } })
    }
  },
  created () {
    !this.avatarList.count && this.getAvatarList({ page: 1 })
    this.userInfo.id && !this.myAvatarList.count && this.getMyAvatarList({ page: 1, size: 1, filter: { userId: this.userInfo.id } })
  },
  methods: {
    ...mapMutations('user', {
      setInfo: 'setInfo'
    }),
    ...mapActions('avatar', {
      getAvatarList: 'getAvatarList',
      getMyAvatarList: 'getMyAvatarList'
    }),
    beforeUpload(file) {
      if (['image/jpeg', 'image/jpg', 'image/png'].indexOf(file.type) === -1) {
        this.$message.error('只能上传jpg、jpg、png格式图片')
        return false
      }
      if (file.size > 2 << 20) {
        this.$message.error('图片不能大于2MB!')
        return false
      }
      return true
    },
    uploadAvatar({ file }) {
      // 压缩图片
      compressImage(file, 100, 100).then(blob => {
        // 计算MD5
        md5File(blob).then(hash => {
          const fileName = blob.type.replace(/.+\/(.+)$/, hash.replace(/^(.{2})(.{2})/, '$1/$2/') + '.$1')
          // 服务器是否存在此图片
          urlToImage(this.$options.filters.imageUrl(fileName)).then(() => {
            // 存在更新头像
            this.updateInfo(fileName)
          }).catch(() => {
            // 不存在上传
            uploadImage(blob).then(() => {
              // 更新头像
              this.updateInfo(fileName)
            })
          })
        })
      })
    },
    updateInfo(image) {
      this.userInfo.avatar.image !== image &&
      updateInfo({ avatar: { image } }).then(()=> {
        notification.success({
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
  }
}
</style>
