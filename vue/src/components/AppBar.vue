<template>
  <!-- 上方bar -->
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <router-link to="/" tag="span" exact :style="{ cursor: 'pointer'}">首頁</router-link>
    </v-toolbar-title>
    <v-combobox
      class="hidden-sm-and-down"
      v-model="chips"
      :items="items"
      flat
      solo-inverted
      hide-details
      label="選取 hashtags (交集查詢)"
      prepend-icon="mdi-filter-menu-outline"
      chips
      clearable
      multiple
      solo
      v-on:blur="dataUpdate"
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip v-bind="attrs" :input-value="selected" @click="select">
          <strong>{{ item }}</strong>
        </v-chip>
      </template>
    </v-combobox>
    <v-spacer />
    <!-- 如果帳號驗證成功顯示帳號名稱 -->
    <span
      class="hidden-sm-and-down"
      v-if="this.$store.state.auth.name"
    >{{this.$store.state.auth.name}}</span>
    <v-btn icon @click="googleAuth">
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
import { OAuthSev } from "../config/api";

export default {
  data: () => ({
    // 已選取的hashtags
    chips: [],
    // 預設的hashtags
    items: [
      "Algebra",
      "Arithmetic",
      "Geometry",
      "Trignometry",
      "Calculator",
      "No Calculator",
      "Grid-In",
      "Chart",
      "No Chart",
      "Long",
      "Short",
      "Multiple Choice"
    ]
  }),
  components: {
    WriteMail
  },
  methods: {
    // 顯示寄信元件
    showWriteMail() {
      this.$refs.WriteMail.open();
    },
    googleAuth() {
      OAuthSev.confirm()
        .then(resp => {
          if (resp.result == "success") {
            // 跳轉到google授權網址
            window.open(resp.data.url, "_self");
          }
        })
        .catch(err => {
          this.$store.commit("alert/error", err);
        });
    },
    // 搜尋條件變更，呼叫API更新資料
    dataUpdate() {
      if (this.chips.length < 10) {
        this.$store.dispatch("query/updateHashtags", this.chips);
      } else {
        this.$store.commit("alert/error", "firestore 只允許最大 10 個陣列查詢");
      }
    }
  }
};
</script>
