<template>
  <div class="w-100">
    <div class="m-5"  >
      <el-tabs  @tab-click="fetchNews(nowTag)" v-model="nowTag" tab-position="top" style="margin-left:300px;min-height:680px;width:60%">
        <el-tab-pane v-for="(cate,i) in categories" :key="i" :label="cate.name" >
          <el-card class="d-flex m-3" v-for="(newi,i) in news" :key="i">
              <div slot="header">
                <img style="width:250px" :src="newi.image" >
              </div>
              <div class="mt-4">
                <span class="fs-xll "><strong>{{newi.title}}</strong></span>
                <p class="mt-4 text-grey fs-md">概要： {{newi.description}}</p>
              </div>
              <el-button size="small" style="margin-left:630px;margin-top:50px" type="primary" @click="$router.push(`/news/${newi._id}`)">查看新闻</el-button>
            </el-card>
          
        </el-tab-pane>
      </el-tabs>
    </div>
    <div
      class="bot text-center"
    >小组成员 &copy;胡健、周文涛、严柏健&nbsp;&nbsp;&nbsp; /&nbsp;&nbsp;&nbsp; 相关指导 &copy;莫建清老师</div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM-DD");
    }
  },
  data() {
    return {
      categories: [],
      news: [],
      nowTag:""
    };
  },
  methods: {
    async fetchCategories() {
      const res = await this.$http.get("news_categories");
      this.categories = res.data;
      this.categories.unshift({ name: "全部" });
    },
    async fetchNews(index = 0) {
      if (index == 0) {
        const res = await this.$http.get("news");
        this.news = res.data.reverse();
      } else {
        const res = await this.$http.get(
          `news/where?categories=${this.categories[index]._id}`
        );
        this.news = res.data.reverse();
      }
    }
  },
  created() {
    this.fetchCategories();
    this.fetchNews();
  }
};
</script>

<style>
</style>