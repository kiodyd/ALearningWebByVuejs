<template>
  <div class="categoryedit">
    <h1>{{ id ? '编辑' : '新建' }}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="广告">
        <el-button type="text" @click="model.items.push({})">
          <i class="el-icon-plus"></i> 添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="24" v-for="(item, i) in model.items" :key="i">
           
            <el-form-item label="链接新闻">
              <el-select v-model="item.news">
                <el-option
                  v-for="ni in newsItems"
                  :key="ni._id"
                  :label="ni.title"
                  :value="ni._id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="图片" style="margin-top:0.5rem;">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(item,'image',res.url)"
              >
                <img v-if="item.image" :src="item.image" class="slideshow" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-button type="danger" size="small" @click="model.items.splice(i,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
      model: {
        items: []
      },
      newsItems: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/ads", this.model);
      }

      this.$router.push("/ads/list");
      Message.success("保存成功");
    },

    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchNews() {
      const res = await this.$http.get(`rest/news`);
      this.newsItems= res.data;
    }
  },

  created() {
    this.fetchNews()
    this.id && this.fetch();
  }
};
</script>