<template>
  <div >
    <h1>{{ id ? '编辑' : '新建' }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" >
          <el-option v-for="item in categories" 
          :key="item._id" 
          :label="item.name" 
          :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="model.description"></el-input>
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
      <el-form-item label="内容">
        <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type = "submit">保存</el-button>
      </el-form-item>
      
      
    </el-form>
    
  </div>
</template>


<script>
import { VueEditor } from "vue2-editor";
import { Message } from 'element-ui';

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
        body: "",
        categories: []
      },
      categories: []
    }
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('/upload',formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },

    async save() {
      if (this.id) {
        await this.$http.put(`rest/news/${this.id}`,this.model)
      }else {
        await this.$http.post('rest/news',this.model)
      }
      
      this.$router.push('/news/list')
      Message.success('保存成功')
    },
    
    async fetch() {
      const res = await this.$http.get(`rest/news/${this.id}`)
      this.model = res.data
    },

    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
  },

  created() {
    this.fetchCategories()
    this.id && this.fetch()
  }
}
</script>