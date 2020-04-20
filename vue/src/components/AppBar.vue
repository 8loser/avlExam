<template>
  <!-- 上方bar -->
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4"></v-toolbar-title>

    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-google</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-email-edit-outline</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({})
};
</script>
