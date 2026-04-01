<template>
  <div class="my-page">
    <div class="page-back-btn">
      <el-button type="text" icon="el-icon-arrow-left" @click="goBack" class="back-button">杩斿洖</el-button>
    </div>
    <div class="user-header">
      <div class="avatar-wrapper">
        <img src="@/assets/images/profile.jpg" alt="avatar" class="user-avatar">
        <div class="avatar-edit">
          <svg-icon icon-class="edit" />
        </div>
      </div>
      <div class="user-info">
        <h3 class="user-name">绠＄悊锟?/h3>
        <p class="user-role">绯荤粺绠＄悊锟?/p>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-item">
        <span class="stat-value">128</span>
        <span class="stat-label">绠＄悊璁惧</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">56</span>
        <span class="stat-label">澶勭悊棰勮</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">365</span>
        <span class="stat-label">鍦ㄧ嚎澶╂暟</span>
      </div>
    </div>

    <div class="menu-section">
      <div class="menu-group">
        <div class="menu-item" @click="$router.push('/user/profile')">
          <div class="menu-icon">
            <svg-icon icon-class="user" />
          </div>
          <span class="menu-text">涓汉璧勬枡</span>
          <svg-icon icon-class="right" class="menu-arrow" />
        </div>
        <div class="menu-item">
          <div class="menu-icon">
            <svg-icon icon-class="password" />
          </div>
          <span class="menu-text">淇敼瀵嗙爜</span>
          <svg-icon icon-class="right" class="menu-arrow" />
        </div>
        <div class="menu-item">
          <div class="menu-icon">
            <svg-icon icon-class="settings" />
          </div>
          <span class="menu-text">绯荤粺璁剧疆</span>
          <svg-icon icon-class="right" class="menu-arrow" />
        </div>
      </div>

      <div class="menu-group">
        <div class="menu-item" @click="$router.push('/notifications')">
          <div class="menu-icon">
            <svg-icon icon-class="message" />
          </div>
          <span class="menu-text">娑堟伅閫氱煡</span>
          <el-badge :value="unreadCount" v-if="unreadCount > 0" class="menu-badge" />
          <svg-icon icon-class="right" class="menu-arrow" />
        </div>
        <div class="menu-item">
          <div class="menu-icon">
            <svg-icon icon-class="bell" />
          </div>
          <span class="menu-text">棰勮璁剧疆</span>
          <svg-icon icon-class="right" class="menu-arrow" />
        </div>
      </div>

      <div class="menu-group">
        <div class="menu-item" @click="$router.push('/help')">
          <div class="menu-icon">
            <svg-icon icon-class="documentation" />
          </div>
          <span class="menu-text">浣跨敤甯姪</span>
          <svg-icon icon-class="right" class="menu-arrow" />
        </div>
        <div class="menu-item" @click="$router.push('/about')">
          <div class="menu-icon">
            <svg-icon icon-class="info" />
          </div>
          <span class="menu-text">鍏充簬鎴戜滑</span>
          <svg-icon icon-class="right" class="menu-arrow" />
        </div>
      </div>
    </div>

    <div class="logout-section">
      <el-button type="danger" plain class="logout-btn" @click="handleLogout">
        閫€鍑虹櫥锟?
      </el-button>
    </div>

    <div class="version-info">
      <p>鏅鸿兘铚滆渹淇濇姢绯荤粺 v1.0.0</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPage',
  data() {
    return {
      unreadCount: 2
    }
  },
  watch: {
    '$store.state.unreadCount'(newVal) {
      this.unreadCount = newVal
    }
  },
  mounted() {
    // 鍒濆鍖栨湭璇绘暟
    this.unreadCount = this.$store.state.unreadCount || 2
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    handleLogout() {
      this.$confirm('纭畾瑕侀€€鍑虹櫥褰曞悧锟?, '鎻愮ず', {
        confirmButtonText: '纭畾',
        cancelButtonText: '鍙栨秷',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/login'
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.page-back-btn {
  padding: 0 0 12px 0;
  margin-bottom: 8px;

  .back-button {
    color: #409EFF;
    font-size: 14px;
    
    &:hover {
      color: #66b1ff;
    }
  }
}

.my-page {
  padding: 20px;
  padding-bottom: 80px;
  background: #f5f7fa;
  min-height: calc(100vh - 50px);
}

.user-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  margin-bottom: 20px;

  .avatar-wrapper {
    position: relative;
    margin-right: 16px;

    .user-avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
    }

    .avatar-edit {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 20px;
      height: 20px;
      background: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      .svg-icon {
        width: 12px;
        height: 12px;
        color: #667eea;
      }
    }
  }

  .user-info {
    .user-name {
      font-size: 20px;
      font-weight: 600;
      color: #fff;
      margin: 0 0 4px 0;
    }

    .user-role {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
    }
  }
}

.stats-row {
  display: flex;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  .stat-item {
    flex: 1;
    text-align: center;
    border-right: 1px solid #f0f0f0;

    &:last-child {
      border-right: none;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 600;
      color: #303133;
      display: block;
    }

    .stat-label {
      font-size: 12px;
      color: #909399;
      margin-top: 4px;
      display: block;
    }
  }
}

.menu-section {
  .menu-group {
    background: #fff;
    border-radius: 12px;
    margin-bottom: 12px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .menu-item {
      display: flex;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #f5f5f5;
      cursor: pointer;
      transition: background 0.3s;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: #f5f7fa;
      }

      .menu-icon {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        background: #ecf5ff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;

        .svg-icon {
          width: 20px;
          height: 20px;
          color: #409EFF;
        }
      }

      .menu-text {
        flex: 1;
        font-size: 14px;
        color: #303133;
      }

      .menu-badge {
        margin-right: 8px;
      }

      .menu-arrow {
        width: 16px;
        height: 16px;
        color: #c0c4cc;
      }
    }
  }
}

.logout-section {
  margin-top: 20px;

  .logout-btn {
    width: 100%;
    height: 44px;
    font-size: 15px;
  }
}

.version-info {
  text-align: center;
  padding: 20px 0;

  p {
    font-size: 12px;
    color: #909399;
    margin: 0;
  }
}
.back-button { position: absolute; top: 10px; left: 10px; z-index: 1000; }</style>


