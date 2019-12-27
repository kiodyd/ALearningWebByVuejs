<template>
  <div>
    <div class="m-3 d-flex jc-center" style="min-height:750px">
      <el-card class="text-center" style="width:40%" v-if="exam">
        <div slot="header" class="text-center">
          <span class="fs-xll" v-if="exam">
            <strong>{{exam.title}}</strong>
          </span>
        </div>
        <div>
          <p class="fs-xll mt-4 mb-4">
            <strong>试题描述：</strong>
          </p>
          <p class="fs-xl">{{exam.description}}</p>
        </div>
        <div style="margin-top:4rem">
          <p class="fs-xll mt-4">
            <strong>考生须知：</strong>
          </p>
          <p class="fs-xl mt-4">1、答案采用录音提交，请确保您的录音设备可用</p>
          <p class="fs-xl mt-4">2、考试时长20分钟，超时将自动提交</p>
        </div>
        <div class="mt-6">" "</div>
        <div class="mt-6">
          <el-button @click="buyExam" v-if="isBuy==false" plain style="width:300px; height:50px">购买</el-button>
          <el-button v-if="isBuy==true" plain disabled style="width:300px; height:50px">已购买</el-button>
        </div>
        <div class="mt-3">
          <el-button @click="startExam" plain style="width:300px; height:50px">开始测试</el-button>
        </div>
      </el-card>
    </div>

    <div
      class="bot text-center"
    >小组成员 &copy;胡健、周文涛、严柏健&nbsp;&nbsp;&nbsp; /&nbsp;&nbsp;&nbsp; 相关指导 &copy;莫建清老师</div>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  props: {
    id: {}
  },
  data() {
    return {
      exam: {},
      isBuy: ""
    };
  },
  methods: {
    async fetchExam() {
      const res = await this.$http.get(`exams/${this.id}`);
      this.exam = res.data;
    },
    async fetchIsBuy() {
      const res = await this.$http.get(
        `/exam_orders/where?Exam=${this.id}&user=${localStorage.userId}`
      );
      this.isBuy = res.data.length == 0 ? false : true;
    },
    async buyExam() {
      if (!localStorage.userId) {
        this.$message.error("请先登陆");
        return;
      }
      this.$confirm(
        `是否确定花费 ${this.exam.price} 学习币购买此试题`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          await this.$http.post("shop_exam", {
            user: localStorage.userId,
            exam: this.id
          });
          Message.success("购买成功");
          this.fetchIsBuy();
        })
        .catch(() => {});
    },
    startExam() {
      if (this.isBuy) {
        this.$router.push(`/exams/${this.id}/tasks`);
      } else {
        this.$alert("你还未购买该试题", "错误", {});
      }
    }
  },
  created() {
    this.fetchExam();
    if (!localStorage.userId) {
      this.$message.error("请先登陆");
      return;
    }
    this.fetchIsBuy();
  }
};
</script>

<style>
</style>