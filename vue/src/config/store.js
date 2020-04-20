/**
 * vuex 設定檔
 */
import Vue from "vue";
import Vuex from "vuex";

// 訊息彈跳
import alert from "./store_modules/alert";

// OAuth 驗證
import auth from "./store_modules/auth";

Vue.use(Vuex);

// Vuex 預設狀態
const defaultState = () => {
  return {};
};

export default new Vuex.Store({
  // state使用預設狀態
  state: defaultState(),
  mutations: {},
  modules: {
    alert: alert,
    auth: auth,
  },
  getters: {},
  actions: {},
});
