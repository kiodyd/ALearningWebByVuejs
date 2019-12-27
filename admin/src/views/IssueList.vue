<template>
  <div>
    <h2>发放哪场考试的证书？</h2>
    <div style="margin:1rem">
      <el-select v-model="selectExam" style="margin-right:2rem">
        <el-option v-for="exam in exmas" :key="exam._id" :label="exam.title" :value="exam._id"></el-option>
      </el-select>
      <el-button type="primary" @click="search">查找所有参与考生</el-button>
    </div>

    <el-table :data="items">
      <el-table-column prop="user._id" label="ID"></el-table-column>
      <el-table-column prop="user.username" label="昵称"></el-table-column>
      <el-table-column prop="total_score" label="成绩"></el-table-column>
      <el-table-column label="证书">
        <template slot-scope={row}>
          <el-select v-model="row.certificate" style="margin-right:2rem">
            <el-option v-for="certify in certificates" :key="certify._id" :label="certify.name" :value="certify._id"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="证书等级">
        <template slot-scope={row}>
          <el-rate
            v-model="row.level"
            :texts="texts"
            show-text
            style="margin-top:0.8rem"
            :max="max"
          ></el-rate>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="save(scope.row)">发放</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Message, MessageBox } from "element-ui";
export default {
  data() {
    return {
      items: [],
      exmas: [],
      selectExam: "",
      certificates: [],
      texts: ["铜话筒", "银话筒", "金话筒"],
      max: 3
    };
  },

  methods: {
    async fetch() {
      const res = await this.$http.get(`rest/exam_records/where?exam=${this.selectExam}`);
      this.items = res.data;
      
    },
    async fetchExams() {
      const res = await this.$http.get("rest/exams");
      this.exmas = res.data;
    },
    async fetchCertificate() {
      const res = await this.$http.get("rest/certificates");
      this.certificates = res.data;
    },
    async save(row) {
      MessageBox.confirm(`是否确认发放证书给 "${row.user.username}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let data = {}
          data.user = row.user._id
          data.certificate = row.certificate
          data.level = row.level
          data.exam = this.selectExam
          await this.$http.post('rest/issues',data);
          Message.success("发放成功!");
          this.fetch();
        })
        .catch(() => {});
    },
    search() {
      if (this.selectExam) {
        this.fetch();
      }
    }
  },

  created() {
    this.fetchExams();
    this.fetchCertificate();
  }
};
</script>
