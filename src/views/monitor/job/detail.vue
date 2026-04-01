<template><div class="back-button"><el-button @click="$router.go(-1)" icon="el-icon-arrow-left" size="small">����</el-button></div>
  <el-dialog :title="type === 'log' ? '调度日志详细' : '任务详细'" :visible.sync="visible" width="780px" append-to-body @close="$emit('update:visible', false)">
    <div class="detail-wrap">

      <template v-if="type === 'log'">
        <!-- 基本信息 -->
        <div class="detail-card">
          <div class="detail-card-title"><i class="el-icon-info"></i> 基本信息</div>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">日志编号</span><span class="detail-value">{{ form.jobLogId }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item">
                <span class="detail-label">执行状�?/span>
                <el-tag v-if="form.status == 0" type="success" size="small">正常</el-tag>
                <el-tag v-else type="danger" size="small">失败</el-tag>
              </div>
            </el-col>
          </el-row>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">开始时�?/span><span class="detail-value">{{ form.startTime }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">结束时间</span><span class="detail-value">{{ form.endTime }}</span></div>
            </el-col>
          </el-row>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">记录时间</span><span class="detail-value">{{ form.createTime }}</span></div>
            </el-col>
            <el-col :span="12" v-if="form.status == 0 && form.startTime && form.endTime">
              <div class="detail-item"><span class="detail-label">执行耗时</span><span class="detail-value">{{ costTime }} 毫秒</span></div>
            </el-col>
          </el-row>
        </div>

        <!-- 任务信息 -->
        <div class="detail-card">
          <div class="detail-card-title"><i class="el-icon-time"></i> 任务信息</div>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">任务名称</span><span class="detail-value">{{ form.jobName }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item">
                <span class="detail-label">任务分组</span>
                <dict-tag :options="dict.type.sys_job_group" :value="form.jobGroup" />
              </div>
            </el-col>
          </el-row>
          <el-row class="detail-row">
            <el-col :span="24">
              <div class="detail-item"><span class="detail-label">日志信息</span><span class="detail-value">{{ form.jobMessage }}</span></div>
            </el-col>
          </el-row>
        </div>

        <!-- 调用目标 -->
        <div class="detail-card">
          <div class="detail-card-title"><i class="el-icon-s-operation"></i> 调用目标</div>
          <div class="code-body">
            <div class="code-wrap"><pre class="code-pre">{{ form.invokeTarget || '（无�? }}</pre></div>
          </div>
        </div>

        <!-- 异常信息 -->
        <div class="detail-card" v-if="form.status == 1">
          <div class="detail-card-title error-title"><i class="el-icon-warning"></i> 异常信息</div>
          <div class="error-body"><div class="error-msg">{{ form.exceptionInfo }}</div></div>
        </div>

      </template>

      <template v-else>
        <!-- 任务配置 -->
        <div class="detail-card">
          <div class="detail-card-title"><i class="el-icon-setting"></i> 任务配置</div>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">任务编号</span><span class="detail-value">{{ form.jobId }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">任务名称</span><span class="detail-value">{{ form.jobName }}</span></div>
            </el-col>
          </el-row>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item">
                <span class="detail-label">任务分组</span>
                <dict-tag :options="dict.type.sys_job_group" :value="form.jobGroup" />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item">
                <span class="detail-label">执行状�?/span>
                <el-tag v-if="form.status == 0" type="success" size="small">正常</el-tag>
                <el-tag v-else type="info" size="small">暂停</el-tag>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 调度信息 -->
        <div class="detail-card">
          <div class="detail-card-title"><i class="el-icon-date"></i> 调度信息</div>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">cron 表达�?/span><span class="detail-value mono">{{ form.cronExpression }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">下次执行时间</span><span class="detail-value">{{ parseTime(form.nextValidTime) }}</span></div>
            </el-col>
          </el-row>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item">
                <span class="detail-label">执行策略</span>
                <el-tag v-if="form.misfirePolicy == 0" type="info" size="small">默认策略</el-tag>
                <el-tag v-else-if="form.misfirePolicy == 1" type="warning" size="small">立即执行</el-tag>
                <el-tag v-else-if="form.misfirePolicy == 2" type="primary" size="small">执行一�?/el-tag>
                <el-tag v-else-if="form.misfirePolicy == 3" type="danger" size="small">放弃执行</el-tag>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item">
                <span class="detail-label">并发执行</span>
                <el-tag v-if="form.concurrent == 0" type="success" size="small">允许</el-tag>
                <el-tag v-else type="danger" size="small">禁止</el-tag>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 执行方法 -->
        <div class="detail-card">
          <div class="detail-card-title"><i class="el-icon-s-operation"></i> 执行方法</div>
          <div class="code-body">
            <div class="code-wrap"><pre class="code-pre">{{ form.invokeTarget || '（无�? }}</pre></div>
          </div>
        </div>

        <!-- 元信�?-->
        <div class="detail-card">
          <div class="detail-card-title"><i class="el-icon-document"></i> 元信�?/div>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">创建�?/span><span class="detail-value">{{ form.createBy || '-' }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">创建时间</span><span class="detail-value">{{ form.createTime }}</span></div>
            </el-col>
          </el-row>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">更新�?/span><span class="detail-value">{{ form.updateBy || '-' }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">更新时间</span><span class="detail-value">{{ form.updateTime || '-' }}</span></div>
            </el-col>
          </el-row>
          <el-row class="detail-row" v-if="form.remark">
            <el-col :span="24">
              <div class="detail-item"><span class="detail-label">备注</span><span class="detail-value">{{ form.remark }}</span></div>
            </el-col>
          </el-row>
        </div>
      </template>
    </div>
  </el-dialog>
</template>

<script>
export default {
  dicts: ['sys_job_group'],
  props: {
    visible: { type: Boolean, default: false },
    row: { type: Object, default: () => ({}) },
    // 'job' 任务详细 | 'log' 调度日志详细
    type: { type: String, default: 'job' }
  },
  computed: {
    form() { return this.row || {} },
    costTime() {
      if (!this.form.startTime || !this.form.endTime) return 0
      return new Date(this.form.endTime).getTime() - new Date(this.form.startTime).getTime()
    }
  }
}
</script>

<style scoped>
.detail-label {
  width: 80px;
}
</style>

