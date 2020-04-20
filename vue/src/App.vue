<template>
  <v-app id="inspire">
    <!-- 上方bar -->
    <AppBar />
    <!-- 內容區塊 -->
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
// 上方Appbar
import AppBar from "./components/AppBar.vue";

export default {
  name: "App",
  components: {
    AppBar
  }
};
</script>
