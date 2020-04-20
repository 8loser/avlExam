<template>
  <!-- 上方bar -->
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <router-link to="/" tag="span" exact :style="{ cursor: 'pointer'}">首頁</router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-google</v-icon>
    </v-btn>
    <v-btn icon @click="showWriteMail">
      <v-icon>mdi-email-edit-outline</v-icon>
    </v-btn>
    <WriteMail ref="WriteMail"></WriteMail>
  </v-app-bar>
</template>

<script>
// 載入發送Email頁面元件
import WriteMail from "./WriteMail.vue";

export default {
  data: () => ({}),
  components: {
    WriteMail
  },
  methods: {
    // 顯示寄信元件
    showWriteMail() {
      this.$refs.WriteMail.open();
    }
  }
};
</script>
