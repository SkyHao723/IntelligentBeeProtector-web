<template>
  <div class="my-page">
    <div class="user-header">
      <div class="avatar-wrapper">
        <img src="@/assets/images/profile.jpg" alt="avatar" class="user-avatar">
        <div class="avatar-edit">
          <svg-icon icon-class="edit" />
        </div>
      </div>
      <div class="user-info">
        <h3 class="user-name">管理员</h3>
        <p class="user-role">系统管理员</p>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-item">
        <span class="stat-value">128</span>
        <span class="stat-label">管理设备</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">56</span>
        <span class="stat-label">处理预警</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">365</span>
        <span class="stat-label">在线天数</span>
      </div>
    </div>

    <div class="menu-section">
      <div class="menu-group">
        <div class="menu-item" @click="$router.push('/user/profile')">
          <div class="menu-icon">
            <svg-icon icon-class="user" />
          </div>
          <span class="menu-text">个人资料</span>
          <svg-icon icon-class="right" class="menu-arrow" />
        </div>
        <div class="menu-item">
          <div class="menu-icon">
            <svg-icon icon-class="password" />
          </div>
          <span class="menu-text">修改密码</span>
          <svg-icon icon-class="right" class="menu-arrow" />
        </div>
        <div class="menu-item">
          <div class="menu-icon">
            <svg-icon icon-class="settings" />
          </div>
          <span class="menu-text">系统设置</span>
          <svg-icon icon-class="right" class="menu-arrow" />
        </div>
      </div>

      <div class="menu-group">
        <div class="menu-item" @click="$router.push('/notifications')">
          <div class="menu-icon">
            <svg-icon icon-class="message" />
          </div>
          <span class="menu-text">消息通知</span>
          <el-badge :value="3" class="menu-badge" />
          <svg-icon icon-class="right" class="menu-arrow" />
        </div>
        <div class="menu-item">
          <div class="menu-icon">
            <svg-icon icon-class="bell" />
          </div>
          <span class="menu-text">预警设置</span>
          <svg-icon icon-class="right" class="menu-arrow" />
        </div>
      </div>

      <div class="menu-group">
        <div class="menu-item" @click="$router.push('/help')">
          <div class="menu-icon">
            <svg-icon icon-class="documentation" />
          </div>
          <span class="menu-text">使用帮助</span>
          <svg-icon icon-class="right" class="menu-arrow" />
        </div>
        <div class="menu-item" @click="$router.push('/about')">
          <div class="menu-icon">
            <svg-icon icon-class="info" />
          </div>
          <span class="menu-text">关于我们</span>
          <svg-icon icon-class="right" class="menu-arrow" />
        </div>
      </div>
    </div>

    <div class="logout-section">
      <el-button type="danger" plain class="logout-btn" @click="handleLogout">
        退出登录
      </el-button>
    </div>

    <div class="version-info">
      <p>智能蜜蜂保护系统 v1.0.0</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPage',
  methods: {
    handleLogout() {
      this.$confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
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
</style>
