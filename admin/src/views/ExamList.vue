<template>
  <div>
    <h2>试题列表</h2>
    <el-button type="primary" size="small" @click="$router.push('/exams/create')">添加</el-button>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="title" label="试题名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" 
          @click="$router.push(`/exams/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click=remove(scope.row)>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Message,MessageBox } from 'element-ui';
export default {
  data() {
    return {
      items: []
    };
  },

  methods: {
    async fetch() {
      const res = await this.$http.get("rest/exams");
      this.items = res.data;
    },
    async remove(row) {
      MessageBox.confirm(`是否确认删除 "${row.title}"?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/exams/${row._id}`)
          Message.success('删除成功!')
          this.fetch()
        }).catch(() => {})
      },
  },

  created() {
    this.fetch();
  }
};
</script>
