<template>
  <div class="container">
    <div class="mid">
      <swiper :options="swiperOption" class="banner">
        <swiper-slide v-for="ad in Ads[0].items" :key="ad._id">
          <router-link tag="div" :to="'news/'+ad.news">
            <img class="banner" :src="ad.image" />
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
      </swiper>
      <!-- end of swiper -->

      <div class="title mb-5">
        <img src="../assets/images/title1.png" width="160" height="60" />
      </div>
      <div class="A d-flex">
        <div v-for="hot in hotCourses" :key="hot._id">
          <router-link :to="'courses/'+hot._id">
            <div class="a">
              <img
                :src="hot.cover"
                width="460px"
                height="320px"
                style="border-radius: 3px;margin: 20px 20px"
              />
              <div class="A-title">{{hot.name}}</div>
              <div class="A-info1">
                <div class="A-level">{{hot.diffcult == 1 ? '简单':hot.diffcult == 2?'中等':'困难'}}</div>
                <div class="A-look">观看人数</div>
                <div class="A-num">
                  <span style="float: right">{{hot.description}}</span>
                </div>
              </div>
              <div class="A-info2">
                <div class="A-money">{{hot.price == 0 ? '免费' : hot.price+'学习币'}}</div>
                <div class="A-more">
                  <span style="float: right">查看详情 &gt;</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="title" style="background-color: #dbe3f4">
        <img src="../assets/images/title2.png" width="160" height="60" />
      </div>

      <div class="B">
        <div class="B-line">
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(exam, i) in recommendExams" :key="i">
              <div class="b mt-5 ml-4">
                {{exam.title}}
                <div class="B-btn text-center" @click="$router.push(`exams/${exam._id}`)">测试 &gt;</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="title">
        <img src="../assets/images/title3.png" width="160" height="60" />
      </div>

      <div class="C mt-5" v-for="n in news" :key="n._id">
        <router-link :to="'news/'+n._id" style="text-decoration: none;">
          <div class="c d-flex">
          <img :src="n.image" style="border-radius: 3px;float: left;margin-right:5rem" />
          <div class="C-info m-5">
            <div class="C-title">{{n.title}}</div>
            <div class="C-intro">{{n.description}}</div>
            <div class="C-more">阅读原文 &gt;</div>
          </div>
        </div>
        </router-link>
      </div>
    </div>
    <div class="bot text-center">小组成员 &copy;胡健、周文涛、严柏健&nbsp;&nbsp;&nbsp; /&nbsp;&nbsp;&nbsp; 相关指导 &copy;莫建清老师</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".pagination-home"
        }
      },
      Ads: [{ items: [] }],
      hotCourses: [],
      recommendExams: [],
      news: []
    };
  },
  methods: {
    async fetchAds() {
      const res = await this.$http.get("ads/where?name=首页广告位");
      this.Ads = res.data;
    },
    async fetchHotCourses() {
      const res = await this.$http.get("hot_courses");
      this.hotCourses = res.data;
    },
    async fetchRecommendExams() {
      const res = await this.$http.get("all_exams");
      this.recommendExams = res.data.reverse().slice(0, 4);
    },
    async fetchNews() {
      const res = await this.$http.get("all_news");
      this.news = res.data.reverse().slice(0, 1);
    }
  },
  created() {
    this.fetchHotCourses();
    this.fetchRecommendExams();
    this.fetchNews();
    this.fetchAds();
  }
};
</script>

<style lang="scss" scoped>
</style>