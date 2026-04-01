<template>
  <div class="notifications-page">
    <h2 class="title">消息通知</h2>
    <div class="list-card">
      <div v-if="messages.length > 0">
        <div class="notification-item" v-for="msg in messages" :key="msg.id" :class="{ 'is-read': msg.read }">
          <div class="item-content">
            <div class="msg-header">
              <div class="msg-title">{{ msg.title }}</div>
              <div class="msg-time">{{ msg.time }}</div>
            </div>
            <div class="msg-body">{{ msg.body }}</div>
          </div>
          <div class="item-footer" v-if="!msg.read">
            <el-button size="small" type="primary" @click="markRead(msg)">标为已读</el-button>
          </div>
          <div class="item-footer" v-else>
            <span class="read-label">已读</span>
          </div>
        </div>
      </div>
      <div v-else class="empty">暂无消息</div>
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
        { id: 2, title: '预警触发', time: '2026-03-27 18:05', body: '温度阈值超限，已触发预警。', read: false }
      ]
    }
  },
  methods: {
    // 从localStorage加载消息状态
    loadMessagesState() {
      const savedState = localStorage.getItem('notificationMessages')
      if (savedState) {
        try {
          const savedMessages = JSON.parse(savedState)
          // 合并保存的状态到当前消息中
          this.messages = this.messages.map(msg => {
            const savedMsg = savedMessages.find(s => s.id === msg.id)
            return savedMsg || msg
          })
        } catch (e) {
          console.error('Failed to load notification state:', e)
        }
      }
    },
    // 保存消息状态到localStorage
    saveMessagesState() {
      localStorage.setItem('notificationMessages', JSON.stringify(this.messages))
    },
    markRead(msg) {
      msg.read = true
      // 保存状态到localStorage
      this.saveMessagesState()
      this.$message({ message: '已标记为已读', type: 'success' })
      // 更新全局未读数计数
      const unreadCount = this.messages.filter(m => !m.read).length
      this.$store.commit('setUnreadCount', unreadCount)
    }
  },
  mounted() {
    // 先加载保存的状态
    this.loadMessagesState()
    // 初始化未读数
    const unreadCount = this.messages.filter(m => !m.read).length
    this.$store.commit('setUnreadCount', unreadCount)
  }
}
</script>

<style scoped>
.notifications-page {
  padding: 20px;
  background: #f5f7fa;
  min-height: calc(100vh - 50px);
}

.title {
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #303133;
}

.list-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.notification-item {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.3s ease;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background-color: #f9f9f9;
}

.notification-item.is-read {
  opacity: 0.6;
  background-color: #fafafa;
}

.item-content {
  flex: 1;
  margin-bottom: 12px;
}

.msg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.msg-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.msg-time {
  color: #909399;
  font-size: 12px;
}

.msg-body {
  color: #606266;
  font-size: 14px;
  line-height: 1.5;
}

.item-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.read-label {
  color: #909399;
  font-size: 12px;
  font-weight: 500;
}

.empty {
  text-align: center;
  color: #909399;
  padding: 40px 20px;
  font-size: 14px;
}
</style>
