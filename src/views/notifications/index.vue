<template>
  <div class="notifications-page">
    <h2 class="title">消息通知</h2>
    <div class="list-card">
      <el-list>
        <el-list-item v-for="msg in messages" :key="msg.id">
          <div class="item-left">
            <div class="msg-title">{{ msg.title }}</div>
            <div class="msg-time">{{ msg.time }}</div>
          </div>
          <div class="item-right">
            <div class="msg-body">{{ msg.body }}</div>
            <el-button size="mini" @click="markRead(msg)" v-if="!msg.read">标为已读</el-button>
          </div>
        </el-list-item>
      </el-list>
      <div v-if="messages.length===0" class="empty">暂无消息</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationsPage',
  data() {
    return {
      messages: [
        { id: 1, title: '设备离线', time: '2026-03-28 10:12', body: '设备 ID: A1001 已离线，请检查网络。', read: false },
        { id: 2, title: '预警触发', time: '2026-03-27 18:05', body: '温度阈值超限，已触发预警。', read: true }
      ]
    }
  },
  methods: {
    markRead(msg) {
      msg.read = true
      this.$message({ message: '已标记为已读', type: 'success' })
    }
  }
}
</script>

<style scoped>
.notifications-page { padding: 20px; }
.title { font-size: 20px; margin-bottom: 12px; }
.list-card { background:#fff; padding:12px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.06); }
.item-left { float:left; width:30%; }
.item-right { margin-left:30%; }
.msg-title { font-weight:600; }
.msg-time { color:#999; font-size:12px; }
.msg-body { margin-top:6px; }
.empty { text-align:center; color:#999; padding:20px 0 }
</style>
