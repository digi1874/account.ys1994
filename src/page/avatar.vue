/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-07 14:48:12
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-07 22:56:16
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
      <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
  </div>
</template>

<script>
import FileMD5 from 'browser-md5-file'
import sparkMd5 from 'spark-md5'
import KJUR from 'jsrsasign'
import { compressImage, urlToImage } from '@/utils'

function md5(file, progressFn) {
  let progress = 0;
  let currentChunk = 0;
  const blobSlice =
    File.prototype.slice ||
    File.prototype.mozSlice ||
    File.prototype.webkitSlice;
  const chunkSize = 2097152;
  const chunks = Math.ceil(file.size / chunkSize);
  const spark = new sparkMd5.ArrayBuffer();
  const reader = new FileReader();

  loadNext();

  reader.onloadend = e => {
    console.log('e.target.result', e.target.result)
    spark.append(e.target.result); // Append array buffer
    currentChunk++;
    progress = currentChunk / chunks;

    if (progressFn && typeof progressFn === 'function') {
      progressFn(progress);
    }

    if (currentChunk < chunks) {
      loadNext();
    } else {
      const m5 = spark.end()
      console.log('md5 spark.end()', m5)
    }
  };

  /////////////////////////
  function loadNext() {
    const start = currentChunk * chunkSize;
    const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
    reader.readAsArrayBuffer(blobSlice.call(file, start, end));
  }
}

export default {
  data() {
    return {
      loading: false,
      imageUrl: ''
    }
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
    uploadAvatar({ file }) {
      compressImage(file, 100, 100).then(blob => {
        const bmf = new FileMD5()
        bmf.md5(blob, (err, value) => {
          if (err) {
            this.$message.error(err)
            return
          }

          window.console.log(value)

          const name = blob.type.replace(/.+\/(.+)$/, value + '.$1')
          const url = this.$options.filters.imageUrl(name)
          urlToImage(url).then(() => {
            console
          }).catch(() => {
            const param = new FormData()
            param.append('file', blob)
            // this.$axios.$post(uploadImage, param, {
            //   headers: { 'Content-Type': 'multipart/form-data' }
            // }).then(({ data }) => {
            //   this.$emit('input', data)
            // })
          })
        })

        md5(blob)

        blob.text().then(text => {
          const m = KJUR.crypto.Util.md5(text)
          window.console.log('text', m)
          window.console.log(sparkMd5.hash(text))
        })


        const reader = new FileReader()
        reader.readAsText(blob, 'base64')
        reader.onloadend = e => {
          const text = e.target.result
          const m = KJUR.crypto.Util.md5(text)
          window.console.log('readAsText', m)
          window.console.log(sparkMd5.hash(text))
        }
      })
    }
  }
}
</script>
