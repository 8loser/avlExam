const modules = {
  namespaced: true,
  state: {
    display: false,
    message: null,
    color: null,
  },
  mutations: {
    success(state, value) {
      state.message = value;
      state.color = "success";
      state.display = true;
    },
    error(state, value) {
      state.message = value;
      state.color = "error";
      state.display = true;
    },
    close(state, value) {
      state.message = null;
      state.color = null;
      state.display = value;
    },
  },
  getters: {},
  actions: {},
};

module.exports = modules;
