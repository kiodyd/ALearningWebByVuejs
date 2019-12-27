<template>
  <div class="container">
    <div class="left">
      <div class="A">
        <img src="../assets/images/ghds.jpg" />
      </div>
      <div class="B">
        <img src="../assets/images/beijingtu.jpg" />
      </div>
    </div>

    <div class="right">
      <div class="C">
        <center>
          <img src="../assets/images/logo.png" width="240" />
        </center>
        <br />
        <br />
        <div>
          <center>
          <span class="fs-xl">用户名：</span>
          <input v-model="yourname" size="15" />
          <br />
          <br />
          <br />
          <span class="fs-xl">密&nbsp;码：&nbsp;</span>
          
          <input type="password" v-model="yourpw" size="15" />
          <br />
          <br />
          <br />
          <center>
            <el-button plain size="mini" @click="login">登陆</el-button>
            <el-button plain size="mini" @click="()=>{yourname='';yourpw=''}">取消</el-button>
            <br />
          </center>
          <br />
          <br />
          
          <router-link class="BB" to='/register'>
            <p align="right">还没有账号？点击注册>></p>
          </router-link>
        </center>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      yourname:"",
      yourpw:""
    }
  },
  methods:{
    async login() {
      const res = await this.$http.post('login',{'username':this.yourname,'password':this.yourpw})
      localStorage.token = res.data.token
      this.$message.success('登陆成功')
      this.$router.push('/')
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

a.BB:link {
  text-decoration: none;
  background-color: #fff;
  color: #c3462a;
}
a.BB:visited {
  text-decoration: none;
  background-color: #fff;
  color: #c3462a;
}
a.BB:hover {
  text-decoration: none;
  color: #4f5668;
}
a.BB:active {
  text-decoration: none;
  color: #4f5668;
}

.container {
  height: 900px;
  width: 1900px;
  background-color: #fff;
}

.container .left {
  height: 800px;
  width: 1050px;
  float: left;
  background-color: #fff;
}

.container .left .A {
  height: 140px;
  width: 500px;
  background-color: #fff;
  float: left;
  padding-top: 10px;
  padding-left: 650px;
  padding-bottom: 0;
}

.container .left .B {
  height: 700px;
  width: 1050px;
  padding-left: 50px;
  float: left;
  background-color: #fff;
  padding-top: 40px;
}
.container .right {
  height: 380px;
  width: 300px;
  float: left;
  padding-top: 200px;
  padding-right: 250px;
  padding-bottom: 250px;
  padding-left: 250px;
}

.container .right .C {
  height: 310px;
  width: 250px;
  background-color: #fff;
  float: left;
  border: 5px double #4f5668;
  padding-top: 30px;
  color: #c3462a;
  padding-right: 20px;
}
</style>