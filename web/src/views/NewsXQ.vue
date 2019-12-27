<template>
  <div>
    <div style="min-height:700px" class="d-flex jc-center mt-3">
      <el-card  style="width:80%">
        <div class="d-flex jc-center mt-5">
          <strong style="font-size:30px">{{news.title}}</strong>
        </div>
        <div class="G-content mt-5" style="font-size: 20px; ">
          <p v-html="news.body"></p>
        </div>
      </el-card>
    </div>
    <div
      class="bot text-center"
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
      news: {}
    };
  },
  methods: {
    async fetchNews() {
      const res = await this.$http.get(`news/${this.id}`);
      this.news = res.data;
    }
  },
  created() {
    this.fetchNews();
  }
};
</script>

<style>
.ql-align-center{
  text-align: center
}
</style>