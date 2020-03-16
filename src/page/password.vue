/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-16 12:56:47
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-16 13:42:24
 */

<template>
  <div>
    <iframe :src="href" frameborder="0" width="100%" height="500px"></iframe>
  </div>
</template>

<script>
import { getTokenSignature } from '@/utils'

export default {
  data () {
    return {
      href: 'http://localhost:9000/password?signature=' + getTokenSignature()
    }
  }
}
</script>
