<template>
  <div>
    <h2>回复留言</h2>
    <el-form label-width="120px" @submit.native.prevent="save">

      <el-form-item label="留言">
        {{model.content}}
      </el-form-item>
      <el-form-item label="回复">
        <el-input v-model="model.reply" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type = "submit">保存</el-button>
      </el-form-item>
      
      
    </el-form>
    
  </div>
</template>


<script>
import { Message } from 'element-ui';
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
    }
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/messages/${this.id}`,this.model)
      }
      
      this.$router.push('/messages/list')
      Message.success('保存成功')
    },
    
    async fetch() {
      const res = await this.$http.get(`rest/messages/${this.id}`)
      this.model = res.data
    }
  },

  created() {
    this.id && this.fetch()
  }
}
</script>