<template>
  <div class="history-page">
    <div class="page-header">
      <h2 class="page-title">历史记录</h2>
      <p class="page-subtitle">查看设备历史数据和操作记录</p>
    </div>

    <div class="filter-bar">
      <el-select v-model="filterType" placeholder="选择类型" size="small" style="width: 120px;">
        <el-option label="全部" value="" />
        <el-option label="告警记录" value="alert" />
        <el-option label="操作日志" value="operation" />
        <el-option label="设备日志" value="device" />
      </el-select>
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="small"
        style="width: 220px;"
      />
      <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
    </div>

    <div class="timeline-container">
      <div class="timeline">
        <div class="timeline-item" v-for="(item, index) in historyList" :key="index">
          <div class="timeline-dot" :class="item.type"></div>
          <div class="timeline-content">
            <div class="timeline-header">
              <span class="timeline-title">{{ item.title }}</span>
              <span class="timeline-time">{{ item.time }}</span>
            </div>
            <div class="timeline-desc">{{ item.desc }}</div>
            <div class="timeline-tags">
              <el-tag size="mini" :type="getTagType(item.type)">{{ getTagName(item.type) }}</el-tag>
              <el-tag size="mini" type="info">{{ item.device }}</el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="load-more">
      <el-button type="text" :loading="loading">加载更多</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryPage',
  data() {
    return {
      filterType: '',
      dateRange: null,
      loading: false,
      historyList: [
        {
          title: '设备 #003 温度告警已处理',
          desc: '温度已恢复正常范围，当前温度 37.2°C',
          time: '2026-03-28 10:45:00',
          type: 'alert',
          device: '设备 #003'
        },
        {
          title: '系统参数已更新',
          desc: '管理员修改了温度告警阈值，由 40°C 调整为 42°C',
          time: '2026-03-28 10:30:00',
          type: 'operation',
          device: '系统设置'
        },
        {
          title: '设备 #007 病虫害预警',
          desc: '检测到疑似蜂螨感染，已通知相关人员',
          time: '2026-03-28 09:15:00',
          type: 'alert',
          device: '设备 #007'
        },
        {
          title: '设备 #128 上线',
          desc: '新设备已成功接入系统，开始数据采集',
          time: '2026-03-28 08:00:00',
          type: 'device',
          device: '设备 #128'
        },
        {
          title: '数据备份完成',
          desc: '系统已自动完成每日数据备份',
          time: '2026-03-28 03:00:00',
          type: 'operation',
          device: '系统任务'
        },
        {
          title: '设备 #012 离线',
          desc: '设备网络连接中断，请检查网络状态',
          time: '2026-03-27 22:30:00',
          type: 'device',
          device: '设备 #012'
        }
      ]
    }
  },
  methods: {
    getTagType(type) {
      const map = {
        alert: 'danger',
        operation: 'warning',
        device: 'success'
      }
      return map[type] || 'info'
    },
    getTagName(type) {
      const map = {
        alert: '告警',
        operation: '操作',
        device: '设备'
      }
      return map[type] || '其他'
    }
  }
}
</script>

<style lang="scss" scoped>
.history-page {
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

.filter-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.timeline-container {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.timeline {
  position: relative;
  padding-left: 24px;

  &::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #e4e7ed;
  }

  .timeline-item {
    position: relative;
    padding-bottom: 24px;

    &:last-child {
      padding-bottom: 0;
    }

    .timeline-dot {
      position: absolute;
      left: -20px;
      top: 4px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #fff;
      border: 2px solid #409EFF;

      &.alert {
        border-color: #f56c6c;
        background: #f56c6c;
      }

      &.operation {
        border-color: #e6a23c;
        background: #e6a23c;
      }

      &.device {
        border-color: #67c23a;
        background: #67c23a;
      }
    }

    .timeline-content {
      background: #f5f7fa;
      border-radius: 8px;
      padding: 12px 16px;

      .timeline-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;

        .timeline-title {
          font-size: 14px;
          font-weight: 500;
          color: #303133;
        }

        .timeline-time {
          font-size: 12px;
          color: #909399;
        }
      }

      .timeline-desc {
        font-size: 13px;
        color: #606266;
        margin-bottom: 8px;
        line-height: 1.5;
      }

      .timeline-tags {
        display: flex;
        gap: 8px;
      }
    }
  }
}

.load-more {
  text-align: center;
  padding: 20px 0;
}
</style>
