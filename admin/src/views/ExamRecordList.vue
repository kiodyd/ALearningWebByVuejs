<template>
  <div>
    <h2>答题卡</h2>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="user.username" label="用户昵称"></el-table-column>
      <el-table-column prop="exam.title" label="试题名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" 
          @click="$router.push(`/exam_records/edit/${scope.row._id}`)">开始评卷</el-button>
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
      const res = await this.$http.get("rest/exam_records");
      this.items = res.data;
    },
    async remove(row) {
      MessageBox.confirm(`是否确认删除 "${row.title}"?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/exam_records/${row._id}`)
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
