/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:25:34
 * @Last Modified by:   lin.zhenhui
 * @Last Modified time: 2020-03-06 23:25:34
 */

const state = {
  collapsed: false
}

const mutations = {
  switchCollapsed (state) {
    state.collapsed = !state.collapsed
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
