<template>
  <div>
    <h2>用户列表</h2>
    <el-button type="primary" size="small" @click="$router.push('/users/create')">添加</el-button>
    <div style="display: flex; margin: 2rem"> 
      <a-pagination
        style="margin-right: 2rem"
        showSizeChanger
        :pageSize.sync="pageSize"
        @change="onChange"
        @showSizeChange="onChange"
        :total="total"
        v-model="current"
      />
      <a-input-search placeholder="查询用户" style="width: 200px" @search="onSearch" />
    </div>
    <el-table :data="items">
      <el-table-column prop="username" label="昵称" ></el-table-column>
      <el-table-column prop="avatar" label="头像" >
        <template slot-scope="scope" ><img :src="scope.row.avatar" style="width:50px"></template>
      </el-table-column>
      <el-table-column prop="Email" label="邮箱"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="active" label="是否激活"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="active(scope.row)">启用</el-button>
          <el-button type="danger" size="small" @click="disactive(scope.row)">禁用</el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Message, MessageBox } from "element-ui";
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
    async onSearch(value) {
      const res = await this.$http.post("rest/users/searchByWord", {
        KeyWord: value,
      });
      this.items = res.data;
    },
    async onChange(page, pageSize) {
      const res = await this.$http.post("rest/users/pagelist", {
        page: page,
        rows: pageSize
      });
      this.items = res.data.rows;
      this.total = res.data.total;
    },
    async fetch() {
      const res = await this.$http.get("rest/users");
      this.items = res.data;
    },
    async remove(row) {
      MessageBox.confirm(`是否确认删除 "${row.username}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/users/${row._id}`);
          Message.success("删除成功!");
          this.fetch();
        })
        .catch(() => {});
    },
    async active(row) {
      row.active = "是";
      await this.$http.put(`rest/users/${row._id}`, row);
      this.fetch();
    },
    async disactive(row) {
      MessageBox.confirm(
        `这将导致账户 "${row.username}"暂停使用，是否继续？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          row.active = "否";
          await this.$http.put(`rest/users/${row._id}`, row);
          Message.success("停用成功!");
          this.fetch();
        })
        .catch(() => {});
    }
  },

  created() {
    this.fetch();
    this.onChange(1, 10);
  }
};
</script>
