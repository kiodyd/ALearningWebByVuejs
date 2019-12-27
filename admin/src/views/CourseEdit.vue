<template>
  <div class="categoryedit">
    <h2>{{ id ? '编辑' : '新建' }}课程</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="类型">
        <el-select v-model="model.type">
          <el-option v-for="item in types" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="封面">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="res => $set(model,'cover',res.url)"
        >
          <img v-if="model.cover" :src="model.cover" class="slideshow" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="model.description"></el-input>
      </el-form-item>
      <el-form-item label="所需学习币">
        <el-input v-model="model.price"></el-input>
      </el-form-item>
      <el-form-item label="能获得多少积分">
        <el-input v-model="model.point"></el-input>
      </el-form-item>
      <el-form-item label="难度">
        <el-rate
          v-model="model.diffcult"
          :texts="this.texts"
          show-text
          style="margin-top:0.8rem"
          :max="max"
        ></el-rate>
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
      types: [],
      texts: ["简单", "中等", "困难"],
      max: 3
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/courses/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/courses", this.model);
      }

      this.$router.push("/courses/list");

      Message.success("保存成功");
    },

    async fetch() {
      const res = await this.$http.get(`rest/courses/${this.id}`);
      this.model = res.data;
    },

    async fetchTypes() {
      const res = await this.$http.get(`rest/categories`);
      this.types = res.data;
    }
  },

  created() {
    this.fetchTypes();
    this.id && this.fetch();
  }
};
</script>