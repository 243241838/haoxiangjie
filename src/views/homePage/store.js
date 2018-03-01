export default {
  namespaced: true,
  // 最原始的数据
  state: {
    count: 0,
  },
  // 计算属性
  getters: {
    shuangbei: state => state.count * 2,
  },
  // 操作原始数据，尽量不要在外部使用
  mutations: {
    jia: (state, n) => state.count += n,
    jian: (state, n) => state.count -= n,
  },
  // 可以有异步操作的方法，这个通常在外部使用
  actions: {
    jiax: ({ commit }, n = 1) => {
      commit('jia', 1);
      setTimeout(function() {
        commit('jia', n);
      }, 1000);
    },
    jianx: ({ commit }, n = 1) => commit('jian', n),
  },
}
