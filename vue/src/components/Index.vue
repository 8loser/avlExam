<template>
  <v-container class="fill-height" fluid>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Question ID</th>
            <th class="text-left">Title</th>
            <th class="text-left">Text</th>
            <th class="text-left">Answer</th>
            <th class="text-left">Tags</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in problemList" :key="item.id">
            <td>{{ item.question_id }}</td>
            <td>{{ item.question_title }}</td>
            <td>{{ item.question_text }}</td>
            <td>
              <v-text-field v-model="answers[item.question_id]"></v-text-field>
            </td>
            <td>
              <v-chip
                v-for="(tag,idx) in item.hashtags"
                :key="idx"
                label
                class="ma-2"
                :color="hashtags.indexOf(tag) >= 0?'primary':''"
              >{{tag}}</v-chip>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <!-- 浮動送出按鈕 -->
    <v-btn bottom color="pink" dark fab fixed right title="計算分數" @click="calculate">
      <v-icon>mdi-beaker-check</v-icon>
    </v-btn>
    <AnswerResult ref="AnswerResult" :result="result"></AnswerResult>
  </v-container>
</template>

<script>
import { ProblemSev } from "../config/api";
import { mapState } from "vuex";
// 計算結果樣板元件
import AnswerResult from "./AnswerResult.vue";

export default {
  components: {
    AnswerResult
  },
  data: () => ({
    result: {
      completed: 0,
      correct: 0,
      accuracy: 0.0
    },
    answers: {},
    atBottom: false,
    lastId: 0,
    problemList: []
  }),
  computed: {
    // 載入vuex的query/hashtags，用於監測
    ...mapState({
      hashtags: state => state.query.hashtags
    })
  },
  created() {
    // 判斷是否scroll到底部
    window.addEventListener("scroll", () => {
      this.atBottom = this.bottomVisible();
    });
    // 取得資料庫資料
    this.getData();
    // 網址有Code參數，呼叫API判斷是否已註冊
    if (this.$route.query.code) {
      // 呼叫API，使用code取得使用者資料
      this.$store
        .dispatch("auth/getUserInfo", this.$route.query.code)
        .then(data => {
          this.$store.commit(
            "alert/success",
            "帳號驗證成功 " + data.name + " " + data.email
          );
        })
        .catch(err => {
          // code驗證失敗跳回首頁，清掉參數
          this.$store.commit("alert/error", "驗證失敗 " + err);
        });
      this.$router.replace("/");
    }
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
    },
    // 計算分數
    calculate() {
      // 刪除答案empty的題目
      var answer = {};
      for (var item in this.answers) {
        if (this.answers[item]) {
          answer[item] = this.answers[item];
        }
      }
      ProblemSev.list(answer)
        .then(resp => {
          // 顯示結果
          this.result = resp.data;
          this.$refs.AnswerResult.open();
        })
        .catch(err => {
          this.$store.commit("alert/error", err);
        });
    }
  },
  watch: {
    // 如果scroll到底部執行動作
    atBottom(atBottom) {
      if (atBottom && this.problemList.length > 0) {
        this.getData();
      }
    },
    // query的hashtags變更時執行
    hashtags() {
      // 初始化
      this.atBottom = false;
      this.lastId = 0;
      this.problemList = [];
      // 重抓資料
      this.getData();
    }
  }
};
</script>
