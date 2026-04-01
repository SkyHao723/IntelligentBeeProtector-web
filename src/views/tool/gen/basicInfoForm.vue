<template><div class="back-button"><el-button @click="$router.go(-1)" icon="el-icon-arrow-left" size="small">����</el-button></div>
  <el-form ref="basicInfoForm" :model="info" :rules="rules" label-width="150px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="表名�? prop="tableName">
          <el-input placeholder="请输入仓库名�? v-model="info.tableName" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="表描�? prop="tableComment">
          <el-input placeholder="请输�? v-model="info.tableComment" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="实体类名�? prop="className">
          <el-input placeholder="请输�? v-model="info.className" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="作�? prop="functionAuthor">
          <el-input placeholder="请输�? v-model="info.functionAuthor" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" :rows="3" v-model="info.remark"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      rules: {
        tableName: [
          { required: true, message: "请输入表名称", trigger: "blur" }
        ],
        tableComment: [
          { required: true, message: "请输入表描述", trigger: "blur" }
        ],
        className: [
          { required: true, message: "请输入实体类名称", trigger: "blur" }
        ],
        functionAuthor: [
          { required: true, message: "请输入作�?, trigger: "blur" }
        ]
      }
    }
  }
}
</script>

