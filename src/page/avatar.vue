/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-07 14:48:12
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-16 22:44:22
 */

<template>
  <div>
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
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
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
      userInfo: store => store.user.info
    })
  },
  methods: {
    ...mapMutations('user', {
      setInfo: 'setInfo'
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
    updateInfo(avatar) {
      this.userInfo.avatar !== avatar &&
      updateInfo({ avatar }).then(()=> {
        notification.success({
          message: '更换头像成功'
        })
        this.setInfo({
          ...this.userInfo,
          avatar
        })
      })
    }
  }
}
</script>
