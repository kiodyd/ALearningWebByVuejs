<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix mt-4">
        <span class="text-grey">所有分类:</span>
      </div>
      <div class="d-flex">
        <span class="text-grey mt-3">分类：</span>

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
        <span class="text-grey mt-3">课程难度：</span>
        <el-radio-group
          text-color="#409eff"
          fill="rgba(0,0,0,0)"
          v-model="radio2"
          v-for="(diff,i) in diffcults"
          :key="i"
          @change="diffChange"
        >
          <el-radio-button class="ml-5" :label="diff"></el-radio-button>
        </el-radio-group>
      </div>
    </el-card>

    <el-row type="flex" class="d-flex ml-6" style="min-height:450px">
      <el-col :md="5" v-for="cour in courses" :key="cour._id">
        <div class="course">
          <router-link :to="'courses/'+cour._id">
            <div class="a">
              <img
                :src="cour.cover"
                width="460px"
                height="320px"
                style="border-radius: 3px;margin: 20px 20px"
              />
              <div class="course-title">{{cour.name}}</div>
              <div class="course-info1">
                <div class="course-level">{{cour.diffcult == 1 ? '简单':cour.diffcult == 2?'中等':'困难'}}</div>
                <div class="course-look">观看人数</div>
                <div class="course-num">
                  <span style="float: right">{{cour.__v}}</span>
                </div>
              </div>
              <div class="course-info2">
                <div class="course-money">{{cour.price == 0 ? '免费' : cour.price+'学习币'}}</div>
                <div class="course-more">
                  <span style="float: right">查看详情 ></span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </el-col>
    </el-row>

    <div
      class="bot text-center"
    >小组成员 &copy;胡健、周文涛、严柏健&nbsp;&nbsp;&nbsp; /&nbsp;&nbsp;&nbsp; 相关指导 &copy;莫建清老师</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio1: "全部",
      radio2: "",
      categories: [],
      diffcults: ["简单", "中等", "困难"],
      courses: []
    };
  },
  methods: {
    async fetchCategories() {
      const res = await this.$http.get("course_categories");
      this.categories = res.data;
      this.categories.unshift({ name: "全部" });
    },
    async fetchCourses(keys = [], values = []) {
      let query = "?";
      for (let i = 0; i < keys.length; i++) {
        query += i == 0 ? "" : "&";
        query += keys[i] + "=" + values[i];
      }
      if (query === "?") {
        const res = await this.$http.get("courses");
        this.courses = res.data;
      } else {
        const res = await this.$http.get("courses/where" + query);
        this.courses = res.data;
      }
    },
    diffChange() {
      let keys = [];
      let values = [];
      if (this.radio1 === "全部") {
        keys.push("diffcult");
        values.push(
          this.diffcults.findIndex(value => value == this.radio2) + 1
        );
      } else {
        keys.push("type");
        values.push(this.categories.find(item => item.name == this.radio1)._id);
        keys.push("diffcult");
        values.push(
          this.diffcults.findIndex(value => value == this.radio2) + 1
        );
      }
      this.fetchCourses(keys, values);
    },
    cateChange() {
      if (this.radio1 === "全部") {
        this.fetchCourses();
        this.radio2 = null;
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
        keys.push("diffcult");
        values.push(
          this.diffcults.findIndex(value => value == this.radio2) + 1
        );
      }
      this.fetchCourses(keys, values);
    }
  },
  created() {
    this.fetchCourses();
    this.fetchCategories();
  }
};
</script>

<style>
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
.course {
  transform: scale(0.6);
}
.course .a {
  height: 550px;
  width: 500px;
  float: left;
  background-color: #fafafa;
  border-radius: 5px;
  padding: 0;
  transition: all 0.3s;
}
.course .a:hover {
  transform: scale(1.1);
}
.course-title {
  margin-left: 20px;
  font-size: 28px;
  width: 460px;
  height: 72px;
  color: #3a4c86;

  line-height: 36px;
}
.course-info1 {
  width: 500px;
  height: 30px;
}
.course-info2 {
  width: 500px;
  height: 60px;
}
.course-level {
  margin-left: 20px;
  font-size: 20px;
  width: 320px;
  height: 30px;
  color: #999999;

  float: left;
  line-height: 30px;
}
.course-look {
  font-size: 20px;
  width: 80px;
  height: 30px;
  color: #999999;
  float: left;

  line-height: 30px;
}
.course-num {
  font-size: 24px;
  width: 60px;
  height: 30px;
  color: #fa811e;
  float: left;

  line-height: 26px;
}
.course-money {
  font-size: 28px;
  margin-left: 20px;
  float: left;
  width: 120px;
  height: 60px;
  color: #fa811e;

  line-height: 60px;
}
.course-more {
  font-size: 20px;
  float: right;
  width: 120px;
  height: 60px;
  color: #999;
  line-height: 70px;
  margin-right: 20px;
}
</style>