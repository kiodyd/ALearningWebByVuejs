<template>
  <div>
    <div style="min-height:750px; ">
      <div class="d-flex ai-center mb-5 ">
        <input size="large" style="width:50%" type="text" v-model="searchword" placeholder="输入关键词" />
        <el-button type="primary" icon="el-icon-search " @click="fetchResults">搜索</el-button>
      </div>
      <div class="d-flex jc-center" >
        <el-tabs type="border-card" style="width:50%">
          <el-tab-pane label="课程">
            <el-card class="d-flex m-3" v-for="(course,i) in results.courses" :key="i">
              <div slot="header">
                <img style="width:250px" :src="course.cover" >
              </div>
              <div class="mt-4">
                <span class="fs-xll "><strong>{{course.name}}</strong></span>
                <p class="mt-4 text-grey fs-md">概要： {{course.description}}</p>
                <p class="mt-5 text-primary fs-xl">价格： {{course.price==0?'免费':course.price+'学习币'}}</p>
              </div>
              <el-button size="small" style="margin-left:400px" type="primary" @click="$router.push(`/courses/${course._id}`)">查看课程</el-button>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="试题">
            <el-card class="m-3" v-for="(exam,i) in results.exams" :key="i">
              <div class="mt-4">
                <span class="fs-xll "><strong>{{exam.title}}</strong></span>
                <p class="mt-4 text-grey fs-md">概要： {{exam.description}}</p>
                <p class="mt-5 text-primary fs-xl">价格： {{exam.price==0?'免费':exam.price+'学习币'}}</p>
              </div>
              <el-button size="small" style="float:right" type="primary" @click="$router.push(`/exams/${exam._id}`)">查看试题</el-button>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="资讯">
            <el-card class="d-flex m-3" v-for="(news,i) in results.news" :key="i">
              <div slot="header">
                <img style="width:250px" :src="news.image" >
              </div>
              <div class="mt-4">
                <span class="fs-xll "><strong>{{news.title}}</strong></span>
                <p class="mt-4 text-grey fs-md">概要： {{news.description}}</p>
              </div>
              <el-button size="small" style="margin-left:480px;margin-top:50px" type="primary" @click="$router.push(`/news/${news._id}`)">查看新闻</el-button>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div
      class="bot text-center"
    >小组成员 &copy;胡健、周文涛、严柏健&nbsp;&nbsp;&nbsp; /&nbsp;&nbsp;&nbsp; 相关指导 &copy;莫建清老师</div>
  </div>
</template>

<script>
export default {
  props: {
    word: {}
  },
  data() {
    return {
      searchword: "",
      results:{courses:'',exams:'',news:'`'}
    };
  },
  methods: {
    async fetchResults() {
      const res = await this.$http.get(`search/where?keyword=${this.word}`)
      this.results = res.data
    }
  },
  created() {
    this.searchword = this.word
    this.fetchResults()
  }
};
</script>

<style lang="scss" scoped>
</style>