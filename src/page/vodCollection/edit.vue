/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-31 00:05:02
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-27 16:50:48
 */

<template>
  <div>
    <div v-if="$route.name === 'vodCollectionEdit' && !detail.id">视频集合不存在</div>
    <a-form-model
      v-else
      ref="ruleForm"
      :model="formData"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-page-header
        :title="$route.params.id ? '编辑' : '新增'"
        sub-title="视频集合"
        style="padding-top:0;padding-left:0;"
        @back="() => $router.go(-1)"
      />
      <a-form-model-item v-if="$route.params.id" label="id">
        {{ $route.params.id }}
      </a-form-model-item>
      <a-form-model-item label="封面" prop="pic">
        <uploadImage v-model="formData.pic" :width="180" :height="240" />
      </a-form-model-item>
      <a-form-model-item label="集合名" prop="name">
        <a-input v-model="formData.name" allowClear />
      </a-form-model-item>
      <a-form-model-item label="介绍" prop="content">
        <a-input v-model="formData.content" type="textarea" :autosize="{ minRows: 10 }" />
      </a-form-model-item>
      <a-form-model-item label="分享" prop="share">
        <a-switch v-model="formData.share" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit" :loading="submitLoading">
          提交
        </a-button>
        <a-button style="margin-left: 10px;" @click="resetForm">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions, mapMutations } from 'vuex'
import { addVodCollection } from '@/api'
import UploadImage from '@/components/uploadImage'

export default {
  components: {
    UploadImage
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formData: {
        pic: '',
        name: '',
        share: true,
        content: ''
      },
      rules: {
        pic: [
          { required: true, message: '请上传封面图片', trigger: 'change' }
        ],
        name: [
          { required: true, message: '集合名不能为空', trigger: 'blur' },
          { max: 50, message: '集合名最多50字', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '介绍不能为空', trigger: 'blur' },
          { max: 2000, message: '介绍最多2000字', trigger: 'blur' }
        ]
      },
      submitLoading: false
    }
  },
  computed: {
    ...mapState({
      userInfo: store => store.user.info,
      detail: store => store.vod.collectionDetail
    })
  },
  created () {
    this.setFormData()
  },
  methods: {
    ...mapActions('vod', {
      getDetail: 'getCollectionDetail'
    }),
    ...mapMutations('vod', {
      setCollectionListItem: 'setCollectionListItem',
      setCollectionDetail: 'setCollectionDetail'
    }),
    ...mapMutations(),
    onSubmit () {
      if (this.submitLoading === true) return

      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.submitLoading = true
          addVodCollection({
            ...this.formData,
            share: this.formData.share ? 1 : 2
          }).then(({ data }) => {
            this.$notification.success({
              message: this.$route.params.id ? data : '新增成功'
            })
            const detail = {
              ...this.formData,
              id: this.formData.id || data,
              share: this.formData.share ? 1 : 2,
              state: this.$route.params.id ? this.detail.state : 1,
              userId: this.userInfo.id
            }
            this.setCollectionListItem(detail)
            this.setCollectionDetail({ ...this.detail, ...detail })
            this.$router.back()
          }).finally(() => {
            this.submitLoading = false
          })
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },
    setFormData () {
      if (this.$route.params.id) {
        if (!_.isEmpty(this.detail)) {
          this.formData = _.pick(this.detail, ['id', 'pic', 'name', 'content', 'share'])
          this.formData.share = this.detail.share === 1
        } else {
          this.getDetail(this.$route.params.id).then(this.setFormData)
        }
      }
    }
  }
}
</script>
