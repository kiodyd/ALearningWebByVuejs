<template>
  <div>
    <h2>评卷</h2>

    <el-form label-width="60px" @submit.native.prevent="save">
      <el-form-item label="考生">{{user.username}}</el-form-item>
      <el-form-item label="题目">
        <br />
        <el-col v-for="(item, i) in exam.questions" :key="i">
          <div style="margin:1rem">
            <el-card>
              {{item.question_title}}
              <div v-html="item.question_data"></div>
            </el-card>

            <el-form-item label="回答">
              <vue-plyr>
                <audio>
                  <source :src="model.answers[i]" type="audio/mp3" />
                </audio>
              </vue-plyr>
            </el-form-item>

            <el-form-item label="评分">
              <el-input v-model="model.scores[i]"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-form-item>
      <el-form-item label="总分">{{model.total_score}}</el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { Message } from "element-ui";
export default {
  props: {
    id: {}
  },
  name: "exam_record",
  data() {
    return {
      model: {},
      user: {},
      exam: {}
    };
  },
  methods: {
    async save() {
      let total = 0;
      this.model.scores.forEach(element => {
        total += parseInt(element);
      });
      this.model.total_score = total;
      if (this.id) {
        await this.$http.put(`rest/exam_records/${this.id}`, this.model);
      }

      this.$router.push("/exam_records/list");
      Message.success("保存成功");
    },

    async fetch() {
      let res = await this.$http.get(`rest/exam_records/${this.id}`);
      this.model = res.data;
      res = await this.$http.get(`rest/users/${this.model.user}`);
      this.user = res.data;
      res = await this.$http.get(`rest/exams/${this.model.exam}`);
      this.exam = res.data;
    }
  },

  created() {
    this.id && this.fetch();
  }
};
</script>