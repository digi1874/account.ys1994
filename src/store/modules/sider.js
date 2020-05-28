/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-06 23:25:34
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-31 19:55:23
 */

const state = {
  collapsed: document.body.clientWidth < 750
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
