/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-31 11:35:22
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-31 12:34:33
 */

<template>
  <a-upload-dragger
    name="file"
    class="upload-image"
    :multiple="true"
    :showUploadList="false"
    :beforeUpload="beforeUpload"
    :customRequest="upload"
    :style="{ width: width + 'px', height: height + 'px' }"
    accept="image/jpeg, image/jpg, image/png"
  >
    <img v-if="value || src" :src="value || src | imageUrl" :style="{ width: width + 'px', height: height + 'px' }" />
    <div v-else>
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">上传图片</div>
    </div>
  </a-upload-dragger>
</template>

<script>
import { compressImage, md5File, urlToImage } from '@/utils'
import { uploadImage } from '@/api'

export default {
  props: {
    src: String,
    value: String,
    width: Number,
    height: Number
  },
  methods: {
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
    upload({ file }) {
      // 压缩图片
      compressImage({ file, width: this.width, height: this.height }).then(blob => {
        // 计算MD5
        md5File(blob).then(hash => {
          const fileName = blob.type.replace(/.+\/(.+)$/, hash.replace(/^(.{2})(.{2})/, '$1/$2/') + '.$1')
          if (fileName !== this.value && fileName !== this.src) {
            // 服务器是否存在此图片
            urlToImage(this.$options.filters.imageUrl(fileName))
              .then(() => this.change(fileName))
              .catch(() => uploadImage(blob).then(() => this.change(fileName)))
          }
        })
      })
    },
    change (fileName) {
      this.$emit('input', fileName)
      this.$emit('change', fileName)
    }
  }
}
</script>

<style lang="scss">
.upload-image {
  display: flex;
  .ant-upload.ant-upload-drag {
    overflow: hidden;

    .ant-upload {
      padding: 0;
    }
  }
}
</style>
