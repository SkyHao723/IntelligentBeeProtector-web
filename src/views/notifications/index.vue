<template>
  <div class="notifications-page">
    <div class="page-back-btn">
      <el-button type="text" icon="el-icon-arrow-left" @click="goBack" class="back-button">杩斿洖</el-button>
    </div>
    <h2 class="title">娑堟伅閫氱煡</h2>
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
            <el-button size="small" type="primary" @click="markRead(msg)">鏍囦负宸茶</el-button>
          </div>
          <div class="item-footer" v-else>
            <span class="read-label">宸茶</span>
          </div>
        </div>
      </div>
      <div v-else class="empty">鏆傛棤娑堟伅</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationsPage',
  data() {
    return {
      messages: [
        { id: 1, title: '璁惧绂荤嚎', time: '2026-03-28 10:12', body: '璁惧 ID: A1001 宸茬绾匡紝璇锋鏌ョ綉缁滐拷?, read: false },
        { id: 2, title: '棰勮瑙﹀彂', time: '2026-03-27 18:05', body: '娓╁害闃堝€艰秴闄愶紝宸茶Е鍙戦璀︼拷?, read: false }
      ]
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // 浠巐ocalStorage鍔犺浇娑堟伅鐘讹拷?
    loadMessagesState() {
      const savedState = localStorage.getItem('notificationMessages')
      if (savedState) {
        try {
          const savedMessages = JSON.parse(savedState)
          // 鍚堝苟淇濆瓨鐨勭姸鎬佸埌褰撳墠娑堟伅锟?
          this.messages = this.messages.map(msg => {
            const savedMsg = savedMessages.find(s => s.id === msg.id)
            return savedMsg || msg
          })
        } catch (e) {
          console.error('Failed to load notification state:', e)
        }
      }
    },
    // 淇濆瓨娑堟伅鐘舵€佸埌localStorage
    saveMessagesState() {
      localStorage.setItem('notificationMessages', JSON.stringify(this.messages))
    },
    markRead(msg) {
      msg.read = true
      // 淇濆瓨鐘舵€佸埌localStorage
      this.saveMessagesState()
      this.$message({ message: '宸叉爣璁颁负宸茶', type: 'success' })
      // 鏇存柊鍏ㄥ眬鏈鏁拌锟?
      const unreadCount = this.messages.filter(m => !m.read).length
      this.$store.commit('setUnreadCount', unreadCount)
    }
  },
  mounted() {
    // 鍏堝姞杞戒繚瀛樼殑鐘讹拷?
    this.loadMessagesState()
    // 鍒濆鍖栨湭璇绘暟
    const unreadCount = this.messages.filter(m => !m.read).length
    this.$store.commit('setUnreadCount', unreadCount)
  }
}
</script>

<style scoped>
.page-back-btn {
  padding: 0 0 12px 0;
  margin-bottom: 8px;
}

.page-back-btn .back-button {
  color: #409EFF;
  font-size: 14px;
}

.page-back-btn .back-button:hover {
  color: #66b1ff;
}

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
.back-button { position: absolute; top: 10px; left: 10px; z-index: 1000; }</style>


