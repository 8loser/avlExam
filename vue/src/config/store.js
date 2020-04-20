/**
 * vuex 設定檔
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Vuex 預設狀態
const defaultState = () => {
  return {};
};

export default new Vuex.Store({
  // state使用預設狀態
  state: defaultState(),
  mutations: {},
  modules: {},
  getters: {},
  actions: {},
});
