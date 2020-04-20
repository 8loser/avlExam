<template>
  <v-dialog width="800px" v-model="showForm">
    <v-card>
      <v-card-title class="headline">
        <v-icon large>mdi-email-edit-outline</v-icon>聯絡我們
      </v-card-title>
      <v-container>
        <v-row class="mx-2">
          <v-col cols="12">
            <v-text-field
              v-model="subject"
              prepend-icon="mdi-format-header-increase"
              label="Subject"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="body" prepend-icon="mdi-card-text-outline" label="Body" />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" @click="showForm = false">取消</v-btn>
        <v-btn text @click="send">發送</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { MailSev } from "../config/api";

export default {
  data: () => ({
    showForm: false,
    subject: "",
    body: ""
  }),
  methods: {
    open() {
      this.subject = "";
      this.body = "";
      this.showForm = true;
    },
    send() {
      let data = {
        subject: this.subject,
        body: this.body
      };
      MailSev.post(data)
        .then(() => {
          this.$store.commit("alert/success", "發送成功");
          this.showForm = false;
        })
        .catch(err => {
          this.$store.commit("alert/error", err);
        });
    }
  }
};
</script>
