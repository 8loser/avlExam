<template>
  <v-snackbar v-model="visible" :timeout="timeout" :color="this.$store.state.alert.color">
    {{this.$store.state.alert.message}}
    <v-btn color="black" text @click="close">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    timeout: 3000
  }),
  computed: {
    visible: {
      get() {
        return this.$store.state.alert.display;
      },
      set(val) {
        this.$store.commit("alert/close", val);
      }
    }
  },
  created() {},
  methods: {
    close() {
      this.$store.commit("alert/close", false);
    }
  },
  watch: {}
};
</script>
