<template>
  <v-container class="fill-height" fluid>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Question ID</th>
            <th class="text-left">Title</th>
            <th class="text-left">Text</th>
            <th class="text-left">Tags</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in problemList" :key="item.id">
            <td>{{ item.question_id }}</td>
            <td>{{ item.question_title }}</td>
            <td>{{ item.question_text }}</td>
            <td>
              <v-chip v-for="(tag,idx) in item.hashtags" :key="idx" label class="ma-2">{{tag}}</v-chip>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import { ProblemSev } from "../config/api";

export default {
  data: () => ({
    atBottom: false,
    lastId: 0,
    problemList: []
  }),
  created() {
    // 判斷是否scroll到底部
    window.addEventListener("scroll", () => {
      this.atBottom = this.bottomVisible();
    });
    // 取得資料庫資料
    this.getData();
  },
  methods: {
    // 判斷是否scroll到底部
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    // 呼叫API取得資料
    getData() {
      // 查詢lastId後的資料
      const params = {
        after: this.lastId,
        hashtags: this.hashtags
      };
      ProblemSev.fetch(params)
        .then(resp => {
          if (resp.result != "success") {
            this.$store.commit("alert/error", resp.message);
          }
          this.buildData(resp.data);
        })
        .catch(err => {
          // 執行錯誤跳出錯誤訊息
          this.$store.commit("alert/error", err);
        });
    },
    // 呈現problem資料
    buildData(data) {
      // 找出資料中id最大的，替換lastId
      this.lastId = Math.max.apply(
        Math,
        data.map(function(o) {
          return o.id;
        })
      );
      // 將收到的資料加上去
      this.problemList = this.problemList.concat(data);
      // 如果還看得到底部，就再呼叫一次API取得資料
      if (this.bottomVisible()) {
        // 先註解掉，不然很容易把額度用光
        // this.getData();
      }
    }
  },
  watch: {
    // 如果scroll到底部執行動作
    atBottom(atBottom) {
      if (atBottom && this.problemList.length > 0) {
        this.getData();
      }
    }
  }
};
</script>
