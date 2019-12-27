<template>
  <div>
    <h2>分类列表</h2>
    <el-button type="primary" size="small" @click="$router.push('/categories/create')">添加</el-button>
    
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" 
          @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
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
      const res = await this.$http.get("rest/categories");
      this.items = res.data;
    },
    async remove(row) {
      MessageBox.confirm(`是否确认删除分类 "${row.name}"?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/categories/${row._id}`)
          
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
