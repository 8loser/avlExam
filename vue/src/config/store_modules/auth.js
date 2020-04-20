import { OAuthSev } from "../api";

export default {
  namespaced: true,
  state: {
    id: "",
    name: "",
    email: "",
  },
  mutations: {
    updateState(state, value) {
      state.auth = true;
      state.id = value.id;
      state.name = value.name;
      state.email = value.email;
    },
  },
  actions: {
    // 使用code呼叫API，取得使用者資料
    getUserInfo({ commit }, code) {
      let data = {
        code: code,
      };
      // 異步處理
      return new Promise((resolve, reject) => {
        OAuthSev.userInfo(data)
          .then((resp) => {
            if (resp.result == "success") {
              commit("updateState", resp.data);
              resolve(resp.data);
            } else {
              reject(data.message);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
