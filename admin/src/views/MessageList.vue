<template>
  <div>
    <h2>最近留言列表</h2>
    <a-pagination
        style="margin-right: 2rem"
        showSizeChanger
        :pageSize.sync="pageSize"
        @change="onChange"
        @showSizeChange="onChange"
        :total="total"
        v-model="current"
      />
    <el-table :data="items">
      <el-table-column prop="course.name" label="课程名字" width="250"></el-table-column>
      <el-table-column prop="user.username" label="用户昵称"></el-table-column>
      <el-table-column prop="content" label="留言内容"></el-table-column>
      <el-table-column prop="reply" label="回复内容"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" 
          @click="$router.push(`/messages/edit/${scope.row._id}`)">回复</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//import { Message,MessageBox } from 'element-ui';
export default {
  data() {
    return {
      items: [],
      pageSize: 10,
      current: 1,
      total: 0
    };
  },

  methods: {
    async fetch() {
      const res = await this.$http.get("rest/messages");
      this.items = res.data.reverse();
    },
    async onChange(page, pageSize) {
      const res = await this.$http.post("rest/messages/pagelist", {
        page: page,
        rows: pageSize
      });
      this.items = res.data.rows.reverse();
      this.total = res.data.total;
    },
  },

  created() {
    this.fetch();
    this.onChange(1, 10);
  }
};
</script>
