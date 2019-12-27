<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent = "login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type = "password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登陆</el-button>
        </el-form-item>
      </el-form>
      
    </el-card>
    

  </div>
</template>

<script>

import { Message } from 'element-ui';
export default {
  data(){
    return {
      model:{}
    }
  },
  methods: {
    async login() {
      const res = await this.$http.post('/login',this.model)
      localStorage.token = res.data
      this.$router.push('/')
      Message.success('登陆成功')
    }
  }
}
</script>

<style>
.login-card{
  width: 25rem;
  margin: 5rem auto;
}

</style>