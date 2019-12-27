<template>
  <div style="display: flex; ">
    <div>
      <span style="font-size: 1.2rem; color: #000">章节列表</span>
      <a-list itemLayout="horizontal" :dataSource="items" style="margin-top:1rem;margin-bottom:1rem">
        <a-list-item slot="renderItem" slot-scope="item,">
          <a-list-item-meta
            :description=item.description
          >
            <a slot="title" @click="editChapter(item)">{{item.name}}</a>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
    <div style="margin-left:8rem">
      <span style="font-size: 1.2rem; color: #000; margin: 5rem ">章节编辑</span>
      <el-form label-width="120px" @submit.native.prevent="save" 
      style="margin-top:2rem;margin-bottom:1rem">

        <el-form-item label="名称">
          <el-input v-model="chapter.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="chapter.description"></el-input>
        </el-form-item>

        <el-form-item label="上传">
          <a-upload-dragger
            name="file"
            :multiple="true"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            @change="handleChange"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">Click or drag file to this area to upload</p>
            <p class="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from uploading company data or other
              band files
            </p>
          </a-upload-dragger>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
          <el-button type="danger" @click="remove">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { Message,MessageBox } from "element-ui";

export default {
  props: {
    id: {}
  },
  data() {
    return {
      chapterID: "",
      items: [],
      chapter:{}
    };
  },
  methods: {
    handleChange(info) {
      const status = info.file.status;
      if (status !== "uploading") {
        global.console.log(info.file, info.fileList);
      }
      if (status === "done") {
        this.chapter.file=info.file.response.url
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    editChapter(item) {
      this.chapter = item
      this.chapterID = this.chapter._id
    },
    async save() {
      this.chapter.course = this.id;
      if (this.chapterID) {
        await this.$http.put(`rest/chapters/${this.chapterID}`, this.chapter);
      } else {
        await this.$http.post("rest/chapters", this.chapter);
      }
      this.fetch()
      Message.success("保存成功");
    },

    async fetch() {
      const res = await this.$http.get(`rest/chapters/where?course=${this.id}`);
      this.items = res.data;
      this.chapterID=""
    },

    async remove() {
      if (!this.chapter._id) {
        return
      }
      MessageBox.confirm(`是否确认删除章节 "${this.chapter.name}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/chapters/${this.chapter._id}`);
          Message.success("删除成功!");
          this.fetch();
        })
        .catch(() => {});
    }

  },
  created() {
      this.fetch();
  }
};
</script>
<style></style>
