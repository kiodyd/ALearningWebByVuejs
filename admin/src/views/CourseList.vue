<template>
  <div>
    <h2>课程列表</h2>
    <el-button type="primary" size="small" @click="$router.push('/courses/create')">添加</el-button>
    <el-card style=" margin-top: 1rem">
      <el-row type="flex" style="flex-wrap: wrap;">
        <el-col :md="4" v-for="(item, i) in items" :key="i">
          <a-card hoverable style="width: 250px; margin-bottom:1rem">
            <img :src="item.cover" slot="cover" />
            <template class="ant-card-actions" slot="actions">
              <a-icon type="edit" @click="$router.push(`/courses/edit/${items[i]._id}`)" />
              <a-icon type="delete" @click="remove(items[i])" />
              <a-icon type="ellipsis" @click="$router.push(`/chapters/${items[i]._id}`)" />
            </template>
            <a-card-meta :title="item.name" :description="item.description"></a-card-meta>
          </a-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>


<script>
import { Message, MessageBox } from "element-ui";
export default {
  data() {
    return {
      items: [
        {
          _id: "",
          name: "",
          description: "",
          cover: "",
          price: 0
        }
      ]
    };
  },

  methods: {
    async fetch() {
      const res = await this.$http.get("rest/courses");
      this.items = res.data;
    },
    async remove(row) {
      MessageBox.confirm(`是否确认删除课程 "${row.name}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/courses/${row._id}`);
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

<style>
</style>