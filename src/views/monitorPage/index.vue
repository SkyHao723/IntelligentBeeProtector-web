<template>
  <div class="monitor-page">
    <div class="page-header">
      <h2 class="page-title">监控中心</h2>
      <p class="page-subtitle">实时监控设备运行状态</p>
    </div>

    <div class="status-bar">
      <div class="status-item online">
        <span class="status-dot"></span>
        <span>在线: 96</span>
      </div>
      <div class="status-item offline">
        <span class="status-dot"></span>
        <span>离线: 20</span>
      </div>
      <div class="status-item warning">
        <span class="status-dot"></span>
        <span>告警: 12</span>
      </div>
    </div>

    <div class="monitor-grid">
      <div class="monitor-card" v-for="i in 8" :key="i">
        <div class="card-header">
          <span class="device-name">设备 #{{ String(i).padStart(3, '0') }}</span>
          <span class="device-status online">在线</span>
        </div>
        <div class="card-body">
          <div class="monitor-preview">
            <svg-icon icon-class="eye" class="preview-icon" />
          </div>
          <div class="monitor-info">
            <div class="info-item">
              <span class="label">温度</span>
              <span class="value">36.5°C</span>
            </div>
            <div class="info-item">
              <span class="label">湿度</span>
              <span class="value">65%</span>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <span class="update-time">更新于 1分钟前</span>
          <el-button type="text" size="mini">查看详情</el-button>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <h3 class="section-title">告警信息</h3>
        <span class="view-more">查看全部</span>
      </div>
      <div class="alert-list">
        <div class="alert-item warning">
          <div class="alert-icon">
            <svg-icon icon-class="warning" />
          </div>
          <div class="alert-content">
            <div class="alert-title">设备 #003 温度异常</div>
            <div class="alert-desc">当前温度 42.5°C，超过阈值 40°C</div>
            <div class="alert-time">2026-03-28 10:30:00</div>
          </div>
          <el-button type="primary" size="mini">处理</el-button>
        </div>
        <div class="alert-item danger">
          <div class="alert-icon">
            <svg-icon icon-class="bug" />
          </div>
          <div class="alert-content">
            <div class="alert-title">设备 #007 检测到病虫害</div>
            <div class="alert-desc">疑似蜂螨感染，建议立即处理</div>
            <div class="alert-time">2026-03-28 09:15:00</div>
          </div>
          <el-button type="danger" size="mini">紧急处理</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonitorPage'
}
</script>

<style lang="scss" scoped>
.monitor-page {
  padding: 20px;
  padding-bottom: 80px;
  background: #f5f7fa;
  min-height: calc(100vh - 50px);
}

.page-header {
  margin-bottom: 16px;

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

.status-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;

  .status-item {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #606266;

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 6px;
    }

    &.online .status-dot {
      background: #67c23a;
    }

    &.offline .status-dot {
      background: #909399;
    }

    &.warning .status-dot {
      background: #e6a23c;
    }
  }
}

.monitor-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.monitor-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #f0f0f0;

    .device-name {
      font-size: 14px;
      font-weight: 500;
      color: #303133;
    }

    .device-status {
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 10px;

      &.online {
        background: #f0f9eb;
        color: #67c23a;
      }

      &.offline {
        background: #f4f4f5;
        color: #909399;
      }
    }
  }

  .card-body {
    padding: 16px;

    .monitor-preview {
      height: 80px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;

      .preview-icon {
        width: 32px;
        height: 32px;
        color: #fff;
        opacity: 0.8;
      }
    }

    .monitor-info {
      display: flex;
      justify-content: space-around;

      .info-item {
        text-align: center;

        .label {
          font-size: 12px;
          color: #909399;
          display: block;
          margin-bottom: 4px;
        }

        .value {
          font-size: 16px;
          font-weight: 600;
          color: #303133;
        }
      }
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    background: #fafafa;

    .update-time {
      font-size: 11px;
      color: #909399;
    }
  }
}

.content-section {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
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

.alert-list {
  .alert-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }

    &.warning {
      background: #fdf6ec;
    }

    &.danger {
      background: #fef0f0;
    }

    .alert-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;

      .svg-icon {
        width: 20px;
        height: 20px;
      }
    }

    &.warning .alert-icon {
      background: #faecd8;
      color: #e6a23c;
    }

    &.danger .alert-icon {
      background: #fde2e2;
      color: #f56c6c;
    }

    .alert-content {
      flex: 1;

      .alert-title {
        font-size: 14px;
        font-weight: 500;
        color: #303133;
        margin-bottom: 4px;
      }

      .alert-desc {
        font-size: 12px;
        color: #606266;
        margin-bottom: 4px;
      }

      .alert-time {
        font-size: 11px;
        color: #909399;
      }
    }
  }
}
</style>
