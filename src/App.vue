/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 18:50:54
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-31 15:26:32
 */

<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  name: 'app',
  data() {
    return {
      locale: zhCN
    }
  }
}
</script>

<style lang="scss">
.filter-form {
  margin-bottom: 30px;

  .ant-form-item {
    display: flex;
  }
  .ant-form-item-control-wrapper {
    flex-grow: 1;
  }
  .ant-form-item-label {
    min-width: 45px;
  }
  .ant-form-item-children {
    display: block;
  }
  .ant-input-number {
    width: 100%;
  }
}

.text-overflow {
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 21px;
  overflow: hidden;
}
</style>
