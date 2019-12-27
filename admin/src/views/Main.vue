<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
      <div class="setting">
        <a-icon type="setting" style="margin-right:0.3rem" />
        <span>后台管理系统</span>
      </div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
        <a-menu-item key="1">
          <router-link to="/courses/list">
            <a-icon type="video-camera" />
            <span>课程管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/exams/list">
            <a-icon type="book" />
            <span>试题管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/news/list">
            <a-icon type="read" />
            <span>新闻管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <router-link to="/ads/list">
            <a-icon type="tablet" />
            <span>广告管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="5">
          <router-link to="/categories/list">
            <a-icon type="tags" />
            <span>分类管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="6">
          <router-link to="/users/list">
            <a-icon type="user" />
            <span>用户管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="7">
          <router-link to="/admin_users/list">
            <a-icon type="alert" />
            <span>职员管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="8">
          <router-link to="/exam_records/list">
            <a-icon type="solution" />
            <span>评卷</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="9">
          <router-link to="/certificates/list">
            <a-icon type="trophy" />
            <span>证书</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="10">
          <router-link to="/issues/list">
            <a-icon type="audit" />
            <span>发放证书</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="11">
          <router-link to="/messages/list">
            <a-icon type="message" />
            <span>留言回复</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px', background: '#fff' }">
      <a-layout-header style="background: #fff; padding: 0; display: flex;">
        <div style="flex:1;">
        </div>
        <div>
          <a-icon type="logout" style="font-size: 18px; line-height: 64px;" @click="logout" />
          <el-button type="text" class="exit" @click="logout">退出</el-button>
        </div>
      </a-layout-header>
      <a-divider />
      
      <a-layout-content
        :style="{ margin: '12px 32px', overflow: 'initial',height: '100vh' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>
<style>
#components-layout-demo-fixed-sider .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
#components-layout-demo-fixed-sider .exit {
  font-size: 18px;
  line-height: 64px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  color: #666;
  
}

#components-layout-demo-fixed-sider .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-fixed-sider .setting {
  color: #fff;
  text-align: center;
  font-size: 1.2rem;
  margin: 1rem;
}



/* #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  } */
</style>