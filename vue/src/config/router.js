/**
 * 路由設置檔案
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

/**
 * 路徑設定
 */
const routes = [
  // 首頁
  {
    name: "Index",
    path: "/",
    component: () => import("@/components/Index.vue"),
  },
  //其他所有路徑，都轉到首頁
  {
    path: "*",
    redirect: { name: "Index" },
  },
];

/**
 * 導出Router物件
 */
export default new VueRouter({ mode: "history", routes });
