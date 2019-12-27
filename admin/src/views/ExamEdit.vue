<template>
  <div class="categoryedit">
    <h2>{{ id ? '编辑' : '新建' }}试题</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="类型">
        <el-select v-model="model.type">
          <el-option v-for="item in types" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="试题名称">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="试题描述">
        <el-input type="textarea" v-model="model.description"></el-input>
      </el-form-item>
      <el-form-item label="所需学习币">
        <el-input v-model="model.price"></el-input>
      </el-form-item>
      <el-form-item label="题目">
        <el-button size="small" @click="model.questions.push({})">
          <i class="el-icon-plus"></i> 添加题目
        </el-button>
        <el-col v-for="(item, i) in model.questions" :key="i">
          <el-form-item label="题目" style="margin-top:1rem">
            <el-input v-model="item.question_title"></el-input>
          </el-form-item>
          <el-form-item label="内容" style="margin-top:1rem">
            <vue-editor
              useCustomImageHandler
              @image-added="handleImageAdded"
              v-model="item.question_data"
            ></vue-editor>
          </el-form-item>
          <el-form-item label="操作" style="margin-top:1rem">
            <el-button size="small" type="text" @click="model.questions.splice(i, 1)">删除</el-button>
          </el-form-item>
          <a-divider />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { Message } from "element-ui";
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {
        title: "",
        questions: [],
      },
      types: []
    };
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("/upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/exams/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/exams", this.model);
      }

      this.$router.push("/exams/list");
      Message.success("保存成功");
    },

    async fetchTypes() {
      const res = await this.$http.get(`rest/categories`);
      this.types = res.data;
    },
    async fetch() {
      const res = await this.$http.get(`rest/exams/${this.id}`);
      this.model = res.data;
    }
  },

  created() {
    this.fetchTypes();
    this.id && this.fetch();
  }
};
</script>