<template>
  <div class="container" style="height: 1200px; ">
    <div class="mid" style="height: auto;background-color:#dbe3f4 ">
      <div class="D" style="height: 100px">
        <div class="d" style="height: 50px;width: 500px">{{exam.title}}</div>
      </div>
      <div class="G" style="margin-left:180px">
        <div class="g" style="width:80% " v-for="(question,i) in exam.questions" :key="i">
          <div class="G-title">
            <strong>{{question.question_title}}</strong>
          </div>
          <div class="G-content">
            <p v-html="question.question_data"></p>
          </div>

          <div @click="changeQuest(i)" class="m-3">
            <div class="d-flex jc-center">
              <MRecorder @handleStop="handelEndRecord" />
            </div>
            <div class="d-flex jc-center mt-3">
              <vue-audio-native
                style="width:800px"
                :url="msource[i].url"
                :show-current-time="true"
                :show-controls="false"
                :show-download="false"
                :autoplay="false"
                :wait-buffer="true"
              />
            </div>
          </div>
        </div>
      </div>
      <div style="background-color:#dbe3f4;" class="d-flex jc-center">
        <el-button type="info" @click="commitExam" style="width:600px;height:70px">提交试卷</el-button>
      </div>
    </div>

    <div
      class="bot text-center mt-3"
    >小组成员 &copy;胡健、周文涛、严柏健&nbsp;&nbsp;&nbsp; /&nbsp;&nbsp;&nbsp; 相关指导 &copy;莫建清老师</div>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      exam: {},
      msource: [{ url: "" }, { url: "" }, { url: "" }, { url: "" }],
      source: "",
      nowquestIndex: 0
    };
  },
  methods: {
    async checkIsBuy() {
      const res = await this.$http.get(
        `/exam_orders/where?Exam=${this.id}&user=${localStorage.userId}`
      );
      if (res.data.length == 0) {
        this.$message.error("您还未购买");
        this.$router.push(`/exams/${this.id}`);
      }
    },
    async fetchExam() {
      const res = await this.$http.get(`exams/${this.id}`);
      this.exam = res.data;
    },
    handelEndRecord(data) {
      this.$set(this.msource, this.nowquestIndex, data);
    },
    changeQuest(i) {
      this.nowquestIndex = i;
    },
    async commitExam() {
      this.$confirm("是否现在提交试卷?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let examRecord = { exam: this.id, user: localStorage.userId, answers: [] };
          for (let i = 0; i < this.msource.length; i++) {
            examRecord.answers.push("");
            let el = this.msource[i];
            if (el.url) {
              let file = new FormData();
              let filename = el.url.split("/").pop();
              global.console.log(filename);
              file.append("file", el.mblob, filename);
              const res = await this.$http.post("upload", file);
              examRecord.answers[i] = res.data.url;
            }
          }
          await this.$http.post("exam_record", examRecord);
          this.$message.success("提交成功");
        })
        .catch(() => {});
    }
  },
  created() {
    if (!localStorage.userId) {
      this.$message.error('请先登陆')
      return
    }
    this.checkIsBuy();
    this.fetchExam();
  }
};
</script>

<style>
.container .mid .G{
  height: auto!important;
}
</style>

