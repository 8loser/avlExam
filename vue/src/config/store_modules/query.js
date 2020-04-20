export default {
  namespaced: true,
  state: {
    hashtags: [],
  },
  mutations: {
    // 設定hashtags
    hashtags(state, value) {
      state.hashtags = value;
    },
  },
  getters: {},
  actions: {
    updateHashtags({ commit }, hashtags) {
      // 設置延遲，不然抓新資料時combobox會卡住
      setTimeout(() => {
        commit("hashtags", hashtags);
      }, 500);
    },
  },
};
