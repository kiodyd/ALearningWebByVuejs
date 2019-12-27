<template>
  <div >
    <div class="d-flex mt-5">
      <el-card class style="width:500px; height:520px">
        <img :src="chapters[0].course.cover" alt />
        <p class="fs-xll mt-3">{{chapters[0].course.name}}</p>
        <p class="mt-2 text-grey">{{chapters[0].course.createdAt | date}}</p>
        <div class="d-flex mt-3">
          <p>价格</p>
          <p class="ml-3 fs-xll text-primary" v-if="chapters[0].course.price || chapters[0].course.price ==0">
            <strong>{{chapters[0].course.price == 0? '免费':chapters[0].course.price + '学习币'}}</strong>
          </p>
        </div>
        <div class="d-flex mt-5">
          <div class="flex-1 d-flex fs-xll">
            <span class="el-icon-star-off"></span>
            <el-divider direction="vertical"></el-divider>
            <span class="el-icon-share"></span>
          </div>
          <el-button type="primary" @click="study" size="small" v-if="isBuy==false || true">{{isBuy?'继续学习':'加入学习'}}</el-button>
        </div>
      </el-card>
      <el-tabs type="border-card" class="ml-5" style="width:100rem">
        <el-tab-pane label="课程详情">
          <span style="font-size:20px!important;">{{chapters[0].course.description}}</span>
        </el-tab-pane>
        <el-tab-pane label="课程目录">
          <ul style="overflow:auto">
            <li v-for="(chap,i) in chapters" :key="i">
              <el-card class="mt-2">
                <span style="font-size:20px!important;color:#2fa8ec">{{'课时'+(i+1)+': '+chap.name}}</span>
              </el-card>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="评论区">
          <div class="d-flex">
            <img v-if="user.avatar" :src="user.avatar" style="border-radius:50%;width:80px" />
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入留言"
              style="margin-left:2rem;margin-right:1rem"
              v-model="messageArea"
            ></el-input>
            <el-button type="primary" @click="sendMessage" style="width:100px">发表言论</el-button>
          </div>
          <div v-for="mess in messages" :key="mess._id">
            <div class="d-flex">
              <img
                :src="mess.user.avatar"
                style="border-radius:50%;width:50px; height:50px; margin:1.5rem"
              />
              <div class="ml-4 mt-5">
                <div>
                  <p class="fs-lg text-grey">{{mess.user.username}}</p>
                  <p class="mt-3 fs-xl">{{mess.content}}</p>
                  <p class="fs-xs mt-1 text-grey">{{mess.createdAt | date}}</p>
                </div>
                <div class="mt-3" v-if="mess.reply">
                  <el-card>
                    <span class="fs-lg text-grey">{{'老师回复： '}}</span>
                    <span class="mt-3 fs-md">{{mess.reply}}</span>
                  </el-card>
                </div>
              </div>
            </div>
            <el-divider></el-divider>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="bot text-center" style="margin-top:11%">小组成员 &copy;胡健、周文涛、严柏健&nbsp;&nbsp;&nbsp; /&nbsp;&nbsp;&nbsp; 相关指导 &copy;莫建清老师</div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { Message } from 'element-ui';
export default {
  props: {
    id: {}
  },
  filters: {
    date(val) {
      return dayjs(val).format("YYYY-MM-DD");
    }
  },
  data() {
    return {
      chapters: [{ course: {} }],
      video: "",
      messages:[{ user: {} }],
      messageArea:"",
      isBuy:'',
      user:{avatar:''}
    };
  },
  methods: {
    async fetchChapters() {
      const res = await this.$http.get(`chapters/${this.id}`);
      this.chapters = res.data;
      this.video = this.chapters[0].file;
    },
    async fetchMessages() {
      const res = await this.$http.get(`messages/${this.id}`);
      this.messages = res.data;
    },
    async sendMessage() {
      if (!localStorage.userId) {
        Message.error('请先登陆')
        return
      }
      let message = {
        user:localStorage.userId,
        course: String(this.id),
        content:this.messageArea
      }
      const res = await this.$http.post('messages',message)
      Message.success(res.data.message)
      this.messageArea = null
      this.fetchMessages();
    },
    async fetchUser() {
      const res = await this.$http.get(`/user/${localStorage.userId}`)
      this.user =  res.data
    },
    async fetchIsBuy() {
      const res = await this.$http.get(`/orders/where?Course=${this.id}&user=${localStorage.userId}`)
      this.isBuy =  (res.data.length === 0 ? false : true)
    },
    async study() {
      if (!localStorage.userId) {
        Message.error('请先登陆')
        return
      }
      if (this.isBuy) {
        this.$router.push(`/courses/${this.id}/tasks`)
      } else{
        this.$confirm(`是否确定花费 ${this.chapters[0].course.price} 学习币购买此课程`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.post('shop',{'user':localStorage.userId,'course':this.id})
          Message.success("购买成功")
          this.$router.push(`/courses/${this.id}/tasks`)
        }).catch(() => {
          
        });
      }
      
    }
  },
  created() {
    this.fetchChapters();
    this.fetchMessages();
    if(localStorage.userId){
      this.fetchIsBuy();
      this.fetchUser()
    }else{
      this.isBuy = false
    }
  }
};
</script>

<style lang="scss" scoped>
</style>