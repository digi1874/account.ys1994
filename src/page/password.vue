/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-16 12:56:47
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-10 18:15:46
 */

<template>
  <div>
    <iframe :src="href" frameborder="0" width="100%" height="500px"></iframe>
  </div>
</template>

<script>
import { getTokenSignature } from '@/utils'
import { LOGIN } from '@/dict'

export default {
  data () {
    return {
      href: `${LOGIN.WEB_BASE_URL}password?signature=${getTokenSignature(this.$ipInfo.ip)}`
    }
  }
}
</script>
