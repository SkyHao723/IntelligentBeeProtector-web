<template>
  <div class="home-page">
    <div class="page-header">
      <h2 class="page-title">首页</h2>
      <p class="page-subtitle">欢迎使用智能蜜蜂保护系统</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <svg-icon icon-class="peoples" />
        </div>
        <div class="stat-info">
          <div class="stat-value">128</div>
          <div class="stat-label">设备总数</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
          <svg-icon icon-class="monitor" />
        </div>
        <div class="stat-info">
          <div class="stat-value">96</div>
          <div class="stat-label">在线设备</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
          <svg-icon icon-class="bug" />
        </div>
        <div class="stat-info">
          <div class="stat-value">32</div>
          <div class="stat-label">预警事件</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
          <svg-icon icon-class="chart" />
        </div>
        <div class="stat-info">
          <div class="stat-value">98.5%</div>
          <div class="stat-label">系统健康度</div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <h3 class="section-title">快速操作</h3>
      </div>
      <div class="quick-actions">
        <div class="action-item" @click="$router.push('/monitorPage')">
          <svg-icon icon-class="eye" class="action-icon" />
          <span>查看监控</span>
        </div>
        <div class="action-item" @click="$router.push('/historyPage')">
          <svg-icon icon-class="log" class="action-icon" />
          <span>历史记录</span>
        </div>
        <div class="action-item" @click="$router.push('/myPage')">
          <svg-icon icon-class="settings" class="action-icon" />
          <span>系统设置</span>
        </div>
        <div class="action-item">
          <svg-icon icon-class="message" class="action-icon" />
          <span>消息通知</span>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <h3 class="section-title">最新动态</h3>
        <span class="view-more">查看更多</span>
      </div>
      <div class="activity-list">
        <div class="activity-item">
          <div class="activity-dot"></div>
          <div class="activity-content">
            <div class="activity-title">设备 #001 检测到异常</div>
            <div class="activity-time">5分钟前</div>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-dot success"></div>
          <div class="activity-content">
            <div class="activity-title">系统升级完成</div>
            <div class="activity-time">1小时前</div>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-dot"></div>
          <div class="activity-content">
            <div class="activity-title">新增设备 #128 上线</div>
            <div class="activity-time">3小时前</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style lang="scss" scoped>
.home-page {
  padding: 20px;
  padding-bottom: 80px;
  background: #f5f7fa;
  min-height: 100vh;
}



.page-header {
  margin-bottom: 24px;

  .page-title {
    font-size: 24px;
    font-weight: 600;
    color: #303133;
    margin: 0 0 8px 0;
  }

  .page-subtitle {
    font-size: 14px;
    color: #909399;
    margin: 0;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;

    .svg-icon {
      width: 24px;
      height: 24px;
      color: #fff;
    }
  }

  .stat-info {
    .stat-value {
      font-size: 24px;
      font-weight: 600;
      color: #303133;
    }

    .stat-label {
      font-size: 12px;
      color: #909399;
      margin-top: 4px;
    }
  }
}

.content-section {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      margin: 0;
    }

    .view-more {
      font-size: 12px;
      color: #409EFF;
      cursor: pointer;
    }
  }
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  .action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 8px;
    border-radius: 8px;
    background: #f5f7fa;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #ecf5ff;
    }

    .action-icon {
      width: 28px;
      height: 28px;
      color: #409EFF;
      margin-bottom: 8px;
    }

    span {
      font-size: 12px;
      color: #606266;
    }
  }
}

.activity-list {
  .activity-item {
    display: flex;
    align-items: flex-start;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }

    .activity-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #f56c6c;
      margin-top: 6px;
      margin-right: 12px;

      &.success {
        background: #67c23a;
      }
    }

    .activity-content {
      flex: 1;

      .activity-title {
        font-size: 14px;
        color: #303133;
        margin-bottom: 4px;
      }

      .activity-time {
        font-size: 12px;
        color: #909399;
      }
    }
  }
}
</style>
