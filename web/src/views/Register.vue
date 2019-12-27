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
        <div style="margin-top:-10px">
          <center >
            <img  src="../assets/images/logo.png" width="240" />
          </center>
        </div>
        <div style="width:200px">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item style="margin-top:10px; "  label="昵称" prop="username">
              <el-input  type="password" size="mini" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:-10px" label="密码" prop="password">
              <el-input type="password" size="mini" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:-10px" label="确认密码" prop="checkPass">
              <el-input type="password" size="mini" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button  plain size="mini" style="width:200px;margin-left:-80px;" @click="submitForm('ruleForm')">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入昵称"));
      }else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        checkPass: "",
        username: ""
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: validUsername, trigger: 'blur'}]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await this.$http.post('createUser',this.ruleForm)
          alert("注册成功！");
          this.$router.push('/login')

        } else {
          global.console.log("error submit!!");
          return false;
        }
      });
    },
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