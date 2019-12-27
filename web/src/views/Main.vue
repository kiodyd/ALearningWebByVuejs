<template>
  <div class="container">
    <div class="top">
      <div class="logo">
        <router-link to="/">
          <img src="../assets/images/logo2.png" />
        </router-link>
      </div>
      <div class="nav">
        <ul id="nav">
          <li>
            <router-link to="/" class="AA" style="display:block;">首页</router-link>
          </li>
          <li>
            <router-link to="/courses" class="AA" style="display:block;">课程</router-link>
          </li>
          <li>
            <router-link to="/exams" class="AA" style="display:block;">考试</router-link>
          </li>
          <li>
            <router-link to="/news" class="AA" style="display:block;">资讯</router-link>
          </li>
        </ul>
      </div>
      <div class="load">
        <div class="search">
          <input type="text" id="fname" name="keyword" v-model="keyword" placeholder="输入关键词" />
          <img
            src="../assets/images/nav-search.png"
            height="26"
            width="26"
            style="float: left;margin:28px -2px; "
            @click="$router.push(`search/${keyword}`)"
          />
        </div>
        <div class="message">
          <img
            src="../assets/images/nav-messge.png"
            style="width:64px;height:64px;margin-left: 13px;margin-top: 13px"
          />
        </div>
        <el-popover placement="top" width="160" v-model="visible">
          <div>
            <el-menu>
              <el-menu-item>
                <div @click="()=>{$router.push('/users');visible = false;}">
                  <i class="el-icon-user"></i>
                  <span>个人中心</span>
                </div>
              </el-menu-item>
              <el-menu-item>
                <div @click="logout">
                  <i class="el-icon-switch-button"></i>
                  <span>退出登陆</span>
                </div>
              </el-menu-item>
            </el-menu>
          </div>
          <div class="user" @click="personal" slot="reference">
            <img
              :src="user.avatar"
              style="width:64px;height:64px;margin-left: 13px;margin-top: 13px;border-radius: 32px"
            />
          </div>
        </el-popover>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      keyword: "",
      visible: false
    };
  },
  methods: {
    async fetchUser() {
      const res = await this.$http.get(`user/${localStorage.userId}`);
      this.user = res.data;
    },

    personal() {
      if (!localStorage.userId) {
        this.$router.push("/login");
      }
    },
    async logout() {
      await localStorage.clear();
      this.user = {};
      this.$message.success("退出成功");
      this.$router.push("/");
      this.visible = false
    }
  },
  async created() {
    if (localStorage.token) {
      const res = await this.$http.get("getID");
      localStorage.userId = res.data;
    } else {
      return;
    }
    this.fetchUser();
  }
};
</script>


<style >
</style>
