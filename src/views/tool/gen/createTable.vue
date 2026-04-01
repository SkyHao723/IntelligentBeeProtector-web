<template><div class="back-button"><el-button @click="$router.go(-1)" icon="el-icon-arrow-left" size="small">����</el-button></div>
  <!-- 创建�?-->
  <el-dialog title="创建�? :visible.sync="visible" width="800px" top="5vh" append-to-body>
    <span>创建表语�?支持多个建表语句)�?/span>
    <el-input type="textarea" :rows="10" placeholder="请输入文�? v-model="content"></el-input>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleCreateTable">�?�?/el-button>
      <el-button @click="visible = false">�?�?/el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createTable } from "@/api/tool/gen"
export default {
  data() {
    return {
      // 遮罩�?
      visible: false,
      // 文本内容
      content: ""
    }
  },
  methods: {
    // 显示弹框
    show() {
      this.visible = true
    },
    /** 创建按钮操作 */
    handleCreateTable() {
      if (this.content === "") {
        this.$modal.msgError("请输入建表语�?)
        return
      }
      createTable({ sql: this.content, tplWebType: 'element-ui' }).then(res => {
        this.$modal.msgSuccess(res.msg)
        if (res.code === 200) {
          this.visible = false
          this.$emit("ok")
        }
      })
    }
  }
}
</script>

