<template>
  <v-app id="inspire">
    <!-- 上方bar -->
    <AppBar />
    <!-- 內容區塊 -->
    <v-content>
      <router-view />
    </v-content>
    <!-- 通知訊息 -->
    <SnackBar />
  </v-app>
</template>

<script>
// 上方Appbar
import AppBar from "./components/AppBar.vue";
// 通知訊息
import SnackBar from "./components/_partial/snackbar";

export default {
  name: "App",
  components: {
    AppBar,
    SnackBar
  }
};
</script>
