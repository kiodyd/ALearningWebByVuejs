<template>
  <div class="container">
    <div class="d-flex ai-center w-100">
      <vue-plyr class="w-100 m-3" :emit="['ended']" @ended="videoEnd">
        <video poster="poster.png" :src="video">
          <source :src="video" type="video/mp4" size="1080" />
          <track kind="captions" label="English" srclang="en" src="captions-en.vtt" default />
        </video>
      </vue-plyr>
      <el-button
        @click="drawer = true"
        type="primary"
        style="float:right; height:80px; width:70px;padding:0; margin-left:100px"
      >
        <i class="el-icon-notebook-2"></i>
        <span>目录</span>
      </el-button>
      <el-drawer :visible.sync="drawer" :with-header="false" size="12%" >
        <el-menu :default-active='nowPlay'>
          <el-menu-item v-for="(chap,i) in chapters" :key="i" :index="i" @click="video = chap.file;nowPlay = i">
            <i class="el-icon-video-play mr-1" v-if="nowPlay == i"></i>
            <span >{{chap.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-drawer>

      <el-dialog title="完成任务" :visible.sync="dialogVisible" width="25%">
        <div v-if="percentage<chapters.length" class="text-center">
          <el-progress type="circle" :percentage="parseInt(percentage/chapters.length*100)"></el-progress>
          <p class="mt-3">恭喜完成小节： {{chapters[nowPlay].name}}</p>
        </div>
        <div v-if="percentage==chapters.length" class="text-center" >
          <el-progress type="circle" :percentage="100" status="success"></el-progress>
          <p class="mt-3">恭喜完成所有小节，获得{{course.point}}学习积分奖励</p>
        </div>
      </el-dialog>

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
      chapters: [],
      course:{},
      video: "",
      nowPlay: 0,
      percentage:0,
      isCollapse: true,
      dialogVisible: false,
      drawer: false,
      chapterRecord: []
    };
  },
  methods: {
    async fetchChapters() {
      const res = await this.$http.get(`chapters/${this.id}`);
      this.chapters = res.data;
      this.course = this.chapters[0].course
    },
    async fetchChapterRecord() {
      const res = await this.$http.get(
        `course_records/where?Course=${this.id}&user=${localStorage.userId}`
      );

      if (res.data.length === 0) {
        for (let i = 0; i < this.chapters.length; i++) {
          this.chapterRecord.push(false);
        }
        this.nowPlay = 0;
        this.video = this.chapters[this.nowPlay].file;
        await this.$http.post(`course_records`, {
          Course: this.id,
          user: localStorage.userId,
          chapters: this.chapterRecord,
          statu: false
        });
      } else {
        this.chapterRecord = res.data[0].chapters;
        this.chapterRecord.map(val=>this.percentage+=(val?1:0))
        for (let i = 0; i < this.chapterRecord.length; i++) {
          if (!this.chapterRecord[i]) {
            this.nowPlay = i;
            this.video = this.chapters[this.nowPlay].file;
            return;
          }
        }
        //所有课程都完成时，播回第一个
        if (this.nowPlay == 0) {
          this.video = this.chapters[this.nowPlay].file;
        }
      }
    },
    async videoEnd() {
      if (this.chapterRecord[this.nowPlay] == false) {
        this.chapterRecord[this.nowPlay] = true
        this.percentage+=1
        await this.$http.put('update_records',{
          Course: this.id,
          user: localStorage.userId,
          chapters: this.chapterRecord
        })
      }
      if (this.percentage == this.chapters.length) {
        this.allComp()
      }
      this.dialogVisible = true
    },
    async allComp() {
      const res = this.$http.post('get_point',{'course':this.id,'user':localStorage.userId})
      return res.data
    },
    nextVideo() {

    }
  },
  created() {
    this.fetchChapters() && this.fetchChapterRecord();
  }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 200px;
}
</style>