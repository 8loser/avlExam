<template>
  <v-dialog width="800px" v-model="showForm">
    <v-card>
      <v-card-title class="headline">
        <v-icon large>mdi-beaker-check</v-icon>分數結果
      </v-card-title>
      <v-container>
        <v-row class="mx-2">
          <v-col cols="12">
            <v-text-field
              prepend-icon="mdi-file-question-outline"
              label="作答題數"
              :value="result.completed"
              disabled
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              prepend-icon="mdi-ticket-confirmation-outline"
              label="正確題數"
              disabled
              :value="result.correct"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              prepend-icon="mdi-percent-outline"
              label="準確率"
              disabled
              :value="Math.round(result.accuracy*100)+' %'"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" @click="showForm = false">關閉</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    result: Object
  },
  data: () => ({
    showForm: false
  }),
  methods: {
    open() {
      this.showForm = true;
    }
  }
};
</script>
