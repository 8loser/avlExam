import Vue from "vue";
import App from "./App.vue";
// 路由
import router from "./config/router.js";

// Vuex 設定檔
import store from "./config/store";

// 前端框架
import vuetify from "./plugins/vuetify";

// API呼叫使用
import VueAxios from "vue-axios";
import axiosAPI from "./config/api";

Vue.config.productionTip = false;

Vue.use(VueAxios, axiosAPI);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
