<template>
  <div class="monitor-page">
    <div class="page-back-btn">
      <el-button type="text" icon="el-icon-arrow-left" @click="goBack" class="back-button">杩斿洖</el-button>
    </div>
    <!-- 铚傜璇︽儏寮圭獥 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleDialogClose"
    >
      <div class="device-detail">
        <div class="detail-header">
          <div class="device-icon">
            <svg-icon icon-class="bee1" />
          </div>
          <div class="device-basic">
            <h3>{{ currentDevice.name }}</h3>
            <div :class="currentDevice.statusClass" class="device-status-tag">
              {{ currentDevice.status }}
            </div>
          </div>
        </div>
        
        <div class="detail-content">
          <div class="detail-section">
            <h4>鍩烘湰淇℃伅</h4>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">铚傜缂栧彿</span>
                <span class="value">{{ currentDevice.id }}</span>
              </div>
              <div class="info-item">
                <span class="label">瀹夎鏃堕棿</span>
                <span class="value">{{ currentDevice.installTime }}</span>
              </div>
              <div class="info-item">
                <span class="label">浣嶇疆</span>
                <span class="value">{{ currentDevice.location }}</span>
              </div>
              <div class="info-item">
                <span class="label">璐熻矗锟?/span>
                <span class="value">{{ currentDevice.manager }}</span>
              </div>
            </div>
          </div>
          
          <div class="detail-section">
            <h4>瀹炴椂鏁版嵁</h4>
            <div class="data-grid">
              <div class="data-item">
                <span class="label">娓╁害</span>
                <span class="value">{{ currentDevice.temperature }}</span>
              </div>
              <div class="data-item">
                <span class="label">婀垮害</span>
                <span class="value">{{ currentDevice.humidity }}</span>
              </div>
              <div class="data-item">
                <span class="label">閲嶉噺</span>
                <span class="value">{{ currentDevice.weight }}</span>
              </div>
              <div class="data-item">
                <span class="label">棰勪及浜ч噺</span>
                <span class="value">{{ currentDevice.production }}</span>
              </div>
            </div>
          </div>
          
          <div class="detail-section">
            <h4>璁惧鐘讹拷?/h4>
            <div class="status-info">
              <div class="status-item">
                <span class="label">杩愯鐘讹拷?/span>
                <span :class="currentDevice.statusClass" class="status-value">
                  {{ currentDevice.status }}
                </span>
              </div>
              <div class="status-item">
                <span class="label">鏈€鍚庢洿鏂版椂锟?/span>
                <span class="value">{{ currentDevice.lastUpdate }}</span>
              </div>
              <div class="status-item">
                <span class="label">鍦ㄧ嚎鏃堕暱</span>
                <span class="value">{{ currentDevice.onlineTime }}</span>
              </div>
            </div>
          </div>
          
          <div class="detail-section" v-if="currentDevice.alerts && currentDevice.alerts.length > 0">
            <h4>棰勮淇℃伅</h4>
            <div class="alert-list">
              <div class="alert-item" v-for="(alert, index) in currentDevice.alerts" :key="index">
                <div class="alert-icon">
                  <svg-icon icon-class="warning" />
                </div>
                <div class="alert-content">
                  <div class="alert-title">{{ alert.title }}</div>
                  <div class="alert-time">{{ alert.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">鍏抽棴</el-button>
        <el-button type="primary" @click="handleExportReport">瀵煎嚭鎶ュ憡</el-button>
      </span>
    </el-dialog>

    <div class="page-header">
      <h2 class="page-title">鐩戞帶涓績</h2>
      <p class="page-subtitle">瀹炴椂鐩戞帶铚傜杩愯鐘讹拷?/p>
    </div>

    <div class="status-bar">
      <div class="status-item healthy">
        <span class="status-dot"></span>
        <span>鍋ュ悍: 84</span>
      </div>
      <div class="status-item warning">
        <span class="status-dot"></span>
        <span>棰勮: 12</span>
      </div>
      <div class="status-item abnormal">
        <span class="status-dot"></span>
        <span>寮傚父: 20</span>
      </div>
      <div class="status-item production">
        <span class="status-dot"></span>
        <span>棰勪及浜ч噺: 128kg</span>
      </div>
    </div>

    <div class="monitor-grid">
      <div class="monitor-card" v-for="i in 8" :key="i">
        <div class="card-header">
          <span class="device-name">铚傜 #{{ String(i).padStart(3, '0') }}</span>
          <span :class="getDeviceStatusClass(i)" class="device-status">{{ getDeviceStatus(i) }}</span>
        </div>
        <div class="card-body">
          <div class="monitor-preview">
            <svg-icon icon-class="bee1" class="preview-icon" />
          </div>
          <div class="monitor-info">
            <div class="info-item">
              <span class="label">娓╁害</span>
              <span class="value">{{ getTemperature(i) }}</span>
            </div>
            <div class="info-item">
              <span class="label">婀垮害</span>
              <span class="value">{{ getHumidity(i) }}</span>
            </div>
            <div class="info-item">
              <span class="label">棰勪及浜ч噺</span>
              <span class="value">{{ getProduction(i) }}</span>
            </div>
          </div>
          <div class="card-actions">
            <el-button type="primary" size="mini" @click="viewBeeMonitor(i)">瀹炴椂瑙傛祴</el-button>
          </div>
        </div>
        <div class="card-footer">
          <span class="update-time">鏇存柊锟?{{ getUpdateTime(i) }}</span>
          <el-button type="text" size="mini" @click="viewDeviceDetail(i)">鏌ョ湅璇︽儏</el-button>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <h3 class="section-title">棰勮淇℃伅</h3>
        <span class="view-more">鏌ョ湅鍏ㄩ儴</span>
      </div>
      <div class="alert-list">
        <div class="alert-item warning">
          <div class="alert-icon">
            <svg-icon icon-class="warning" />
          </div>
          <div class="alert-content">
            <div class="alert-title">铚傜 #003 娓╁害寮傚父</div>
            <div class="alert-desc">褰撳墠娓╁害 42.5掳C锛岃秴杩囬槇锟?40掳C</div>
            <div class="alert-time">2026-03-28 10:30:00</div>
          </div>
          <el-button type="primary" size="mini">澶勭悊</el-button>
        </div>
        <div class="alert-item danger">
          <div class="alert-icon">
            <svg-icon icon-class="bug" />
          </div>
          <div class="alert-content">
            <div class="alert-title">铚傜 #007 妫€娴嬪埌鐥呰櫕锟?/div>
            <div class="alert-desc">鐤戜技铚傝灗鎰熸煋锛屽缓璁珛鍗冲锟?/div>
            <div class="alert-time">2026-03-28 09:15:00</div>
          </div>
          <el-button type="danger" size="mini">绱ф€ュ锟?/el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonitorPage',
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '铚傜璇︽儏',
      currentDevice: {
        id: '',
        name: '',
        status: '',
        statusClass: '',
        installTime: '',
        location: '',
        manager: '',
        temperature: '',
        humidity: '',
        weight: '',
        production: '',
        lastUpdate: '',
        onlineTime: '',
        alerts: []
      }
    }
  },
  methods: {
    getDeviceStatus(deviceId) {
      // 妯℃嫙璁惧鐘舵€侊細1-4鍋ュ悍锟?-6棰勮锟?-8寮傚父
      if (deviceId <= 4) {
        return '鍋ュ悍'
      } else if (deviceId <= 6) {
        return '棰勮'
      } else {
        return '寮傚父'
      }
    },
    getDeviceStatusClass(deviceId) {
      // 杩斿洖瀵瑰簲鐨凜SS绫诲悕
      if (deviceId <= 4) {
        return 'healthy'
      } else if (deviceId <= 6) {
        return 'warning'
      } else {
        return 'abnormal'
      }
    },
    getTemperature(deviceId) {
      // 妯℃嫙娓╁害鏁版嵁
      const baseTemp = 36.5
      const variation = (deviceId % 3) * 0.5
      const random = (Math.random() - 0.5) * 0.8
      return (baseTemp + variation + random).toFixed(1) + '掳C'
    },
    getHumidity(deviceId) {
      // 妯℃嫙婀垮害鏁版嵁
      const baseHumidity = 65
      const variation = (deviceId % 4) * 2
      const random = (Math.random() - 0.5) * 3
      return Math.round(baseHumidity + variation + random) + '%'
    },
    getUpdateTime(deviceId) {
      // 妯℃嫙鏇存柊鏃堕棿
      const minutes = (deviceId * 2) % 10 + 1
      return `${minutes}鍒嗛挓鍓峘
    },
    getProduction(deviceId) {
      // 妯℃嫙浜ч噺棰勪及鏁版嵁
      // 鍩虹浜ч噺 + 璁惧宸紓 + 闅忔満娉㈠姩
      const baseProduction = 15.5
      const variation = (deviceId % 5) * 0.8
      const random = (Math.random() - 0.5) * 1.2
      const production = baseProduction + variation + random
      
      // 鏍规嵁璁惧鐘舵€佽皟鏁翠骇锟?
      let statusFactor = 1.0
      if (deviceId <= 4) {
        statusFactor = 1.2  // 鍋ュ悍璁惧浜ч噺鏇撮珮
      } else if (deviceId <= 6) {
        statusFactor = 0.8  // 棰勮璁惧浜ч噺闄嶄綆
      } else {
        statusFactor = 0.5  // 寮傚父璁惧浜ч噺澶у箙闄嶄綆
      }
      
      return (production * statusFactor).toFixed(1) + 'kg'
    },
    viewDeviceDetail(deviceId) {
      // 鏄剧ず璁惧璇︽儏寮圭獥
      const deviceName = `铚傜 #${String(deviceId).padStart(3, '0')}`
      const status = this.getDeviceStatus(deviceId)
      const statusClass = this.getDeviceStatusClass(deviceId)
      
      // 妯℃嫙璁惧鏁版嵁
      this.currentDevice = {
        id: deviceName,
        name: deviceName,
        status: status,
        statusClass: statusClass,
        installTime: `2026-0${deviceId % 3 + 1}-${String(deviceId * 2).padStart(2, '0')}`,
        location: `鍏昏渹锟?${String.fromCharCode(65 + (deviceId % 3))}鍖篳,
        manager: `鍏昏渹锟?${String.fromCharCode(65 + (deviceId % 5))}`,
        temperature: this.getTemperature(deviceId),
        humidity: this.getHumidity(deviceId),
        weight: `${(45 + deviceId % 10 + Math.random() * 3).toFixed(1)}kg`,
        production: this.getProduction(deviceId),
        lastUpdate: this.getUpdateTime(deviceId),
        onlineTime: `${deviceId * 3 + 15}澶ー,
        alerts: deviceId <= 6 ? [] : [
          {
            title: '娓╁害寮傚父棰勮',
            time: '2026-03-28 10:30:00'
          }
        ]
      }
      
      this.dialogTitle = `${deviceName} - 璇︾粏淇℃伅`
      this.dialogVisible = true
    },
    handleDialogClose(done) {
      this.$confirm('纭鍏抽棴寮圭獥锟?, '鎻愮ず', {
        confirmButtonText: '纭畾',
        cancelButtonText: '鍙栨秷',
        type: 'warning'
      }).then(() => {
        done()
      }).catch(() => {})
    },
    handleExportReport() {
      this.$message({
        message: `姝ｅ湪瀵煎嚭 ${this.currentDevice.name} 鐨勬姤鍛奰,
        type: 'success',
        duration: 2000
      })
      this.dialogVisible = false
    },
    viewBeeMonitor(deviceId) {
      this.$router.push(`/beeMonitor/${deviceId}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-back-btn {
  // padding: 0 0 12px 0;
  // margin-bottom: 8px;

  .back-button {
    // color: #409EFF;
    // font-size: 14px;
    
    // &:hover {
    //   color: #66b1ff;
    // }
  }
}

.monitor-page {
  padding: 20px;
  padding-bottom: 80px;
  background: #f5f7fa;
  min-height: calc(100vh - 50px);
}

.page-header {
  margin-bottom: 16px;
  text-align: center;

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

      &.healthy .status-dot {
        background: #67c23a;
      }

      &.warning .status-dot {
        background: #e6a23c;
      }

      &.abnormal .status-dot {
        background: #f56c6c;
      }
      
      &.production .status-dot {
        background: #409EFF;
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

      &.healthy {
        background: #f0f9eb;
        color: #67c23a;
      }

      &.warning {
        background: #fdf6ec;
        color: #e6a23c;
      }

      &.abnormal {
        background: #fef0f0;
        color: #f56c6c;
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
      margin-bottom: 12px;

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

    .card-actions {
      text-align: center;
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

/* 寮圭獥鏍峰紡 */
.device-detail {
  .detail-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;

    .device-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;

      .svg-icon {
        width: 24px;
        height: 24px;
        color: #fff;
      }
    }

    .device-basic {
      flex: 1;

      h3 {
        font-size: 18px;
        font-weight: 600;
        color: #303133;
        margin: 0 0 8px 0;
      }

      .device-status-tag {
        display: inline-block;
        font-size: 12px;
        padding: 4px 12px;
        border-radius: 12px;

        &.healthy {
          background: #f0f9eb;
          color: #67c23a;
        }

        &.warning {
          background: #fdf6ec;
          color: #e6a23c;
        }

        &.abnormal {
          background: #fef0f0;
          color: #f56c6c;
        }
      }
    }
  }

  .detail-content {
    .detail-section {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }

      h4 {
        font-size: 14px;
        font-weight: 600;
        color: #303133;
        margin: 0 0 12px 0;
        padding-bottom: 8px;
        border-bottom: 1px solid #f0f0f0;
      }

      .info-grid, .data-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;

        .info-item, .data-item {
          .label {
            font-size: 12px;
            color: #909399;
            display: block;
            margin-bottom: 4px;
          }

          .value {
            font-size: 14px;
            font-weight: 500;
            color: #303133;
          }
        }
      }

      .status-info {
        .status-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f5f5f5;

          &:last-child {
            border-bottom: none;
          }

          .label {
            font-size: 13px;
            color: #606266;
          }

          .value, .status-value {
            font-size: 13px;
            font-weight: 500;

            &.healthy {
              color: #67c23a;
            }

            &.warning {
              color: #e6a23c;
            }

            &.abnormal {
              color: #f56c6c;
            }
          }
        }
      }

      .alert-list {
        .alert-item {
          display: flex;
          align-items: center;
          padding: 8px;
          background: #fdf6ec;
          border-radius: 6px;
          margin-bottom: 8px;

          &:last-child {
            margin-bottom: 0;
          }

          .alert-icon {
            width: 24px;
            height: 24px;
            background: #faecd8;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 8px;

            .svg-icon {
              width: 14px;
              height: 14px;
              color: #e6a23c;
            }
          }

          .alert-content {
            flex: 1;

            .alert-title {
              font-size: 12px;
              font-weight: 500;
              color: #303133;
              margin-bottom: 2px;
            }

            .alert-time {
              font-size: 11px;
              color: #909399;
            }
          }
        }
      }
    }
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
}
.back-button { position: absolute; top: 10px; left: 10px; z-index: 1000; }</style>


