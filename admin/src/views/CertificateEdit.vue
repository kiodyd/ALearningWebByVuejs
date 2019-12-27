<template>
  <div>
    <h2>{{ id ? '编辑' : '新建' }}证书</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="res => $set(model,'image',res.url)"
        >
          <img v-if="model.image" :src="model.image" class="slideshow" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { Message } from "element-ui";
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/certificates/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/certificates", this.model);
      }

      this.$router.push("/certificates/list");

      Message.success("保存成功");
    },

    async fetch() {
      const res = await this.$http.get(`rest/certificates/${this.id}`);
      this.model = res.data;
    },

  },

  created() {
    this.id && this.fetch();
  }
};
</script>