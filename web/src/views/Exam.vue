<template>
  <div class="container d-flex w-100">
    <div class="mid" style="height: auto;width:100%;background-color:#dbe3f4 ">
      <el-card class="box-card">
        <div slot="header" class="clearfix mt-4">
          <span class="text-grey">所有分类:</span>
        </div>
        <div class="d-flex">
          <span class="text-grey mt-3">分类</span>
          <el-radio-group
            text-color="#409eff"
            fill="rgba(0,0,0,0)"
            v-model="radio1"
            v-for="cate in categories"
            :key="cate._id"
            @change="cateChange"
          >
            <el-radio-button class="ml-5" :label="cate.name"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="d-flex mt-4">
          <span class="text-grey mt-3">是否购买：</span>
          <el-radio-group
            text-color="#409eff"
            fill="rgba(0,0,0,0)"
            v-model="radio2"
            v-for="(order,i) in orders"
            :key="i"
            @change="orderChange"
          >
            <el-radio-button class="ml-5" :label="order"></el-radio-button>
          </el-radio-group>
        </div>
      </el-card>
       <div class="B" style="min-height:500px;margin-left:-80px">
        <div class="B-line" >
          <el-row type="flex" style="flex-wrap: wrap;">
            <el-col :md="8" v-for="(exam, i) in exams" :key="i">
              <div class="b mb-3" style="transform: scale(0.7);">
                {{exam.title}}
                <div class="B-btn text-center"  @click="$router.push(`exams/${exam._id}`)">测试 &gt;</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div
        class="bot text-center"
      >小组成员 &copy;胡健、周文涛、严柏健&nbsp;&nbsp;&nbsp; /&nbsp;&nbsp;&nbsp; 相关指导 &copy;莫建清老师</div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  data() {
    return {
      orders: ["已购", "未购"],
      categories: [],
      radio1: "全部",
      radio2: "",
      exams: []
    };
  },
  methods: {
    async fetchCategories() {
      const res = await this.$http.get("exam_categories");
      this.categories = res.data;
      this.categories.unshift({ name: "全部" });
    },

    async fetchExams(keys = [], values = []) {
      let query = "?";
      for (let i = 0; i < keys.length; i++) {
        query += i == 0 ? "" : "&";
        query += keys[i] + "=" + values[i];
      }
      if (query === "?") {
        const res = await this.$http.get("exams");
        this.exams = res.data;
      } else {
        const res = await this.$http.get("exams/where" + query);
        this.exams = res.data;
      }
    },
    orderChange() {
      if (!localStorage.userId) {
        Message.error('请先登陆')
        return
      }
      let keys = [];
      let values = [];
      if (this.radio1 === "全部") {
        keys.push("order");
        values.push(
          this.orders.findIndex(value => value == this.radio2)
        );
      } else {
        keys.push("type");
        values.push(this.categories.find(item => item.name == this.radio1)._id);
        keys.push("order");
        values.push(
          this.orders.findIndex(value => value == this.radio2)
        );
      }
      keys.push("user")
      values.push(localStorage.userId)
      this.fetchExams(keys, values);
    },
    cateChange() {
      if (!localStorage.userId) {
        Message.error('请先登陆')
        return
      }
      if (this.radio1 === "全部") {
        this.fetchExams();
        this.radio2 = "";
        return;
      }
      let keys = [];
      let values = [];
      if (this.radio2 == "") {
        keys.push("type");
        values.push(this.categories.find(item => item.name == this.radio1)._id);
      } else {
        keys.push("type");
        values.push(this.categories.find(item => item.name == this.radio1)._id);
        keys.push("order");
        values.push(
          this.orders.findIndex(value => value == this.radio2)
        );
        keys.push("user")
        values.push(localStorage.userId)
      }
      this.fetchExams(keys, values);
    }
  },
  created() {
    this.fetchCategories();
    this.fetchExams();
  }
};
</script>

<style >
.container {
  height: 900px;
}
.container.mid {
  height: 900px;
}
.item {
  margin-bottom: 20px;
}
.el-radio-button .el-radio-button__inner {
  border: transparent;
}
.el-radio-button .el-radio-button__inner {
  border-left: transparent !important;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 1300px;
  margin: 5rem 12rem;
}
</style>