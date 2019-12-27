<template>
  <div class="container">
    <div class="mid">
      <div class="D" style="height: 100px">
        <div v-if="user" class="d" style="height: 110px;width: 110px">
          <img
            :src="user.avatar"
            @click="dialogFormVisible = true"
            width="110px"
            height="110px"
            style="border-radius: 55px"
          />
          <p>{{user.username}}</p>
          <p class="fs-xs text-grey">点击头像设置个人信息</p>

          <el-dialog title="个人信息" :visible.sync="dialogFormVisible" width="30%" :center="true">
            <el-tabs tab-position="top" v-model="select">
              <el-tab-pane label="基本信息" class="d-flex jc-center">
                <el-form :model="user">
                  <el-form-item label="头像" class="d-flex">
                    <el-upload
                      class="avatar-uploader"
                      :action="uploadUrl"
                      :show-file-list="false"
                      :on-success="res => $set(user,'avatar',res.url)"
                    >
                      <img v-if="user.avatar" :src="user.avatar" class="slideshow" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-row type="flex" style="flex-wrap: wrap">
                    <el-col :md="10">
                      <el-form-item label="昵称" class="d-flex ai-center">
                        <el-input v-model="user.username"></el-input>
                      </el-form-item>

                      <el-form-item label="电话" class="d-flex ai-center">
                        <el-input v-model="user.phone"></el-input>
                      </el-form-item>

                      <el-form-item label="邮箱" class="d-flex ai-center">
                        <el-input v-model="user.Email"></el-input>
                      </el-form-item>
                      <el-form-item label="年龄" class="d-flex ai-center">
                        <el-input v-model="user.age"></el-input>
                      </el-form-item>
                      <el-form-item label="性别" class="d-flex ai-center">
                        <el-select v-model="user.gender">
                          <el-option v-for="(item,i) in gender" :key="i" :label="item" :value="i"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="修改密码" class="d-flex jc-center">
                <el-form :model="password" label-position="left" :rules="rules" ref="password">
                  <el-form-item label="旧密码">
                    <el-input type="password" v-model="password.oldpass"></el-input>
                  </el-form-item>
                  <el-form-item label="新密码" prop="newpass">
                    <el-input type="password" v-model="password.newpass"></el-input>
                  </el-form-item>
                  <el-form-item label="确认新密码" prop="renewpass">
                    <el-input type="password" v-model="password.renewpass"></el-input>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="update">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>

      <div class="title mt-6">
        <img src="../assets/images/title5.png" width="160" height="60" />
      </div>

      <div class="F">
        <div class="F-line">
          <div class="f" style="background-color:#fafafa">
            <div class="F-small mt-6">积分值</div>
            <div class="F-big">{{studycard.points}}</div>
            <div class="B-btn text-center" @click="exchange">兑换 &gt;</div>
          </div>
          <!--                <div class="f" style="float: right">学习币<div class="B-btn" style="background-color: #404c91">&nbsp;&nbsp;&nbsp;&nbsp;充值 ></div></div>-->
          <div class="f" style="float: right;background-color:#fafafa">
            <div class="F-small mt-6">学习币</div>
            <div class="F-big">{{studycard.studyCoins}}</div>
            <div class="B-btn text-center">充值 &gt;</div>
          </div>
        </div>
      </div>

      <div>
        <div class="title" style="background-color: #dbe3f4">
          <img src="../assets/images/title6.png" width="160" height="60" />
        </div>
        <div class="F" style="background-color:#dbe3f4; min-height:450px">
          <el-row type="flex" class="d-flex ml-6" style="min-height:450px">
            <el-col :md="12" v-for="record in courseRecord" :key="record._id">
              <div class="f mt-6">
                <div>
                  <div class="F-big" style="font-size: 26px;color: #3a4c86;">{{record.Course.name}}</div>
                  <el-progress
                    v-if="getPercent(record)<100"
                    style="width:400px"
                    :text-inside="true"
                    :stroke-width="26"
                    :percentage="getPercent(record)"
                  ></el-progress>
                  <el-progress
                    v-if="getPercent(record)==100"
                    style="width:400px"
                    :text-inside="true"
                    :stroke-width="24"
                    :percentage="100"
                    status="success"
                  ></el-progress>
                </div>
                <div
                  class="B-btn text-center"
                  @click="$router.push(`courses/${record.Course._id}/tasks`)"
                >继续学习 &gt;</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div style="min-height:200px">
        <div class="title">
          <img src="../assets/images/title7.png" width="160" height="60" />
        </div>
        <div>
          <el-row type="flex" class="d-flex m-6">
            <el-col :span="6" v-for="(cert,i) in certificates" :key="i">
              <el-card :body-style="{ padding: '0px' }" class="ml-6">
                <img :src="cert.certificate.image" class="image" />
                <div style="padding: 14px;">
                  <span>
                    <strong>{{cert.certificate.name}}</strong>
                  </span>
                  <span
                    class="fs-xl ml-2 text-primary"
                  >{{levels[certificates[nowdialog].level - 1]}}</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ cert.createdAt | date }}</time>
                    <el-button
                      type="text"
                      class="button"
                      @click="()=>{nowdialog = i;dialogVisible = true;}"
                    >查看详情</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <el-dialog
          v-if="certificates.user"
          width="30%"
          :title="certificates[nowdialog].certificate.name"
          :visible.sync="dialogVisible"
        >
          <div class="d-flex">
            <img :src="certificates[nowdialog].certificate.image" class="image" style="width:40%" />
            <div class="m-5">
              <p class="fs-xl mb-5">
                <strong>考生:</strong>
                {{certificates[nowdialog].user.username}}
              </p>

              <p class="fs-xl mb-5">
                <strong>等级:</strong>
                {{levels[certificates[nowdialog].level - 1]}}
              </p>
            </div>
          </div>
          <div style="float:right">{{certificates[nowdialog].createdAt | date}}</div>
        </el-dialog>
      </div>
    </div>
    <div
      class="bot text-center mt-5"
    >小组成员 &copy;胡健、周文涛、严柏健&nbsp;&nbsp;&nbsp; /&nbsp;&nbsp;&nbsp; 相关指导 &copy;莫建清老师</div>
  </div>
</template>

<script>
import "../assets/css/geren.css";
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("YYYY-MM-DD");
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.password.newpass !== "") {
          this.$refs.password.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.password.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      studycard: {},
      user: {},
      password: { oldpass: "", newpass: "", renewpass: "" },
      select: "0",
      courseRecord: [],
      certificates: [],
      dialogVisible: false,
      nowdialog: 0,
      levels: ["铜话筒", "银话筒", "金话筒"],
      gender: ["男", "女"],
      dialogFormVisible: false,
      rules: {
        newpass: [{ validator: validatePass, trigger: "blur" }],
        renewpass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    async fetchStudyCard() {
      const res = await this.$http.get(`study_cards/${localStorage.userId}`);
      this.studycard = res.data;
      this.user = this.studycard.user;
    },
    async update() {
      if (this.select == "0") {
        await this.$http.post(`updateUser/${localStorage.userId}`, this.user);
        this.dialogFormVisible = false;
        this.$message.success("修改成功");
      } else if (this.select == "1") {
        this.$refs["password"].validate(async valid => {
          if (valid) {
            await this.$http.post(
              `updatePassword/${localStorage.userId}`,
              this.password
            );
            this.dialogFormVisible = false;
            this.$message.success("修改成功");
          } else {
            global.console.log("error submit!!");
            return false;
          }
        });
      }
    },
    async exchange() {
      this.$prompt("请输入要兑换的积分数", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator: value => {
          return value * 200 <= this.studycard.points ? true : "超出可兑换数量";
        }
      })
        .then(async ({ value }) => {
          await this.$http.post("exchange", {
            user: localStorage.userId,
            coins: value
          });
          this.fetchStudyCard();
        })
        .catch(() => {});
    },
    getPercent(record) {
      let i = 0;
      record.chapters.map(el => (i += el ? 1 : 0));
      return parseInt((i / record.chapters.length) * 100);
    },
    async fetchCourseRecord() {
      const res = await this.$http.get(
        `course_records/where?user=${localStorage.userId}`
      );
      this.courseRecord = res.data.reverse();
    },
    async fetchCertificate() {
      const res = await this.$http.get(`issues/${localStorage.userId}`);
      this.certificates = res.data;
    }
  },
  created() {
    if (!localStorage.userId) {
      this.$message.error("请先登陆");
      return;
    }
    this.fetchStudyCard();
    this.fetchCourseRecord();
    this.fetchCertificate();
  }
};
</script>

<style >
.el-form-item {
  margin-bottom: 0px !important;
}

.container .mid {
  height: auto !important;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  height: 5rem;
  width: 5rem;
  line-height: 5rem;
  text-align: center;
  margin-top: 2rem;
}
.avatar {
  height: 5rem;
  width: 5rem;
  display: block;
}

.slideshow {
  height: 5rem;
  min-width: 5rem;
  display: block;
}
</style>