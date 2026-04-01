<template>
  <div class="history-page">
    <div class="page-header">
      <h2 class="page-title">历史记录</h2>
      <p class="page-subtitle">查看设备历史数据和操作记录</p>
    </div>

    <div class="action-bar">
      <div class="action-buttons">
        <div class="button-group">
          <el-button type="primary" size="small" icon="el-icon-document" @click="generateHealthReport">
            生成健康报告
          </el-button>
        </div>
        <div class="button-group">
          <el-button type="info" size="small" icon="el-icon-download">
            导出数据
          </el-button>
        </div>
      </div>
      <div class="filter-bar">
        <el-select v-model="filterType" placeholder="选择类型" size="small" style="width: 120px;">
          <el-option label="全部" value="" />
          <el-option label="预警记录" value="alert" />
          <el-option label="操作日志" value="operation" />
          <el-option label="设备日志" value="device" />
        </el-select>
        
        <!-- 快捷日期选择 -->
        <el-select v-model="quickDateRange" placeholder="快捷日期" size="small" style="width: 120px;" @change="handleQuickDateChange">
          <el-option label="最近7天" value="7d" />
          <el-option label="最近30天" value="30d" />
          <el-option label="最近90天" value="90d" />
          <el-option label="最近一年" value="1y" />
          <el-option label="自定义" value="custom" />
        </el-select>
        
        <!-- 日期范围选择（仅自定义时显示） -->
        <el-date-picker
          v-if="quickDateRange === 'custom'"
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          format="yyyy-MM-dd"
          :default-time="['00:00:00', '23:59:59']"
          popper-append-to-body
          style="width: 100%;"
        />
        
        <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
    </div>

    <div class="charts-section">
      <div class="chart-container">
        <div class="chart-header">
          <h3 class="chart-title">温度历史曲线</h3>
          <div class="chart-actions">
            <el-select v-model="tempDevice" placeholder="选择设备" size="mini" style="width: 120px;">
              <el-option label="全部设备" value="all" />
              <el-option label="设备 #001" value="001" />
              <el-option label="设备 #002" value="002" />
              <el-option label="设备 #003" value="003" />
            </el-select>
            <el-select v-model="tempPeriod" placeholder="时间范围" size="mini" style="width: 100px;">
              <el-option label="24小时" value="24h" />
              <el-option label="7天" value="7d" />
              <el-option label="30天" value="30d" />
            </el-select>
          </div>
        </div>
        <div class="chart-content">
          <div ref="temperatureChart" class="chart" style="height: 300px;"></div>
        </div>
      </div>

      <div class="chart-container">
        <div class="chart-header">
          <h3 class="chart-title">重量历史曲线</h3>
          <div class="chart-actions">
            <el-select v-model="weightDevice" placeholder="选择设备" size="mini" style="width: 120px;">
              <el-option label="全部设备" value="all" />
              <el-option label="设备 #001" value="001" />
              <el-option label="设备 #002" value="002" />
              <el-option label="设备 #003" value="003" />
            </el-select>
            <el-select v-model="weightPeriod" placeholder="时间范围" size="mini" style="width: 100px;">
              <el-option label="24小时" value="24h" />
              <el-option label="7天" value="7d" />
              <el-option label="30天" value="30d" />
            </el-select>
          </div>
        </div>
        <div class="chart-content">
          <div ref="weightChart" class="chart" style="height: 300px;"></div>
        </div>
      </div>
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
import * as echarts from 'echarts'

export default {
  name: 'HistoryPage',
  data() {
    return {
      filterType: '',
      dateRange: null,
      quickDateRange: '7d', // 默认显示最近7天
      loading: false,
      tempDevice: 'all',
      tempPeriod: '24h',
      weightDevice: 'all',
      weightPeriod: '24h',
      temperatureChart: null,
      weightChart: null,
      historyList: [
        {
          title: '设备 #003 温度预警已处理',
          desc: '温度已恢复正常范围，当前温度 37.2°C',
          time: '2026-03-28 10:45:00',
          type: 'alert',
          device: '设备 #003'
        },
        {
          title: '系统参数已更新',
          desc: '管理员修改了温度预警阈值，由 40°C 调整为 42°C',
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
  mounted() {
    this.initCharts()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    if (this.temperatureChart) {
      this.temperatureChart.dispose()
    }
    if (this.weightChart) {
      this.weightChart.dispose()
    }
  },
  watch: {
    tempDevice() {
      this.updateTemperatureChart()
    },
    tempPeriod() {
      this.updateTemperatureChart()
    },
    weightDevice() {
      this.updateWeightChart()
    },
    weightPeriod() {
      this.updateWeightChart()
    }
  },
  methods: {
    initCharts() {
      this.temperatureChart = echarts.init(this.$refs.temperatureChart)
      this.weightChart = echarts.init(this.$refs.weightChart)
      this.updateTemperatureChart()
      this.updateWeightChart()
    },
    handleResize() {
      if (this.temperatureChart) {
        this.temperatureChart.resize()
      }
      if (this.weightChart) {
        this.weightChart.resize()
      }
    },
    updateTemperatureChart() {
      const hours = []
      const temperatures = []
      
      // 生成模拟数据
      for (let i = 0; i < 24; i++) {
        hours.push(`${i}:00`)
        // 模拟温度数据，在35-40度之间波动
        const baseTemp = 37.5
        const variation = Math.sin(i * 0.5) * 1.5
        const random = (Math.random() - 0.5) * 0.8
        temperatures.push(parseFloat((baseTemp + variation + random).toFixed(1)))
      }
      
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br/>{a}: {c}°C'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: hours,
          axisLine: {
            lineStyle: {
              color: '#dcdfe6'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '温度(°C)',
          min: 34,
          max: 41,
          axisLine: {
            lineStyle: {
              color: '#dcdfe6'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#f0f0f0'
            }
          }
        },
        series: [
          {
            name: '温度',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              color: '#f56c6c'
            },
            lineStyle: {
              color: '#f56c6c',
              width: 2
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(245, 108, 108, 0.3)' },
                { offset: 1, color: 'rgba(245, 108, 108, 0.05)' }
              ])
            },
            data: temperatures
          }
        ]
      }
      
      this.temperatureChart.setOption(option)
    },
    updateWeightChart() {
      const hours = []
      const weights = []
      
      // 生成模拟数据
      for (let i = 0; i < 24; i++) {
        hours.push(`${i}:00`)
        // 模拟重量数据，在45-55kg之间波动
        const baseWeight = 50
        const variation = Math.sin(i * 0.3) * 3
        const random = (Math.random() - 0.5) * 1.2
        weights.push(parseFloat((baseWeight + variation + random).toFixed(1)))
      }
      
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br/>{a}: {c}kg'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: hours,
          axisLine: {
            lineStyle: {
              color: '#dcdfe6'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '重量(kg)',
          min: 42,
          max: 58,
          axisLine: {
            lineStyle: {
              color: '#dcdfe6'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#f0f0f0'
            }
          }
        },
        series: [
          {
            name: '重量',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              color: '#409EFF'
            },
            lineStyle: {
              color: '#409EFF',
              width: 2
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(64, 158, 255, 0.3)' },
                { offset: 1, color: 'rgba(64, 158, 255, 0.05)' }
              ])
            },
            data: weights
          }
        ]
      }
      
      this.weightChart.setOption(option)
    },
    generateHealthReport() {
      this.$confirm('确定要生成健康报告吗？报告将包含最近24小时的数据分析。', '生成健康报告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.loading = true
        // 模拟生成报告的过程
        setTimeout(() => {
          this.loading = false
          this.$message({
            type: 'success',
            message: '健康报告生成成功！报告已保存到"我的文档"文件夹。'
          })
        }, 1500)
      }).catch(() => {})
    },
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
        alert: '预警',
        operation: '操作',
        device: '设备'
      }
      return map[type] || '其他'
    },
    // 禁用未来日期的函数
    disabledDateFn(time) {
      // 只禁用未来的日期，允许选择过往日期
      return time.getTime() > Date.now()
    },
    // 处理快捷日期选择
    handleQuickDateChange(value) {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      
      switch(value) {
        case '7d':
          this.dateRange = [new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000), today]
          break
        case '30d':
          this.dateRange = [new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000), today]
          break
        case '90d':
          this.dateRange = [new Date(today.getTime() - 89 * 24 * 60 * 60 * 1000), today]
          break
        case '1y':
          this.dateRange = [new Date(today.getTime() - 364 * 24 * 60 * 60 * 1000), today]
          break
        case 'custom':
          // 自定义模式，清空日期让用户选择
          this.dateRange = null
          break
      }
    },
    // 搜索按钮点击事件
    handleSearch() {
      if (this.quickDateRange && this.quickDateRange !== 'custom') {
        this.$message({
          type: 'success',
          message: `已搜索 ${this.quickDateRange} 的数据`
        })
      } else if (this.dateRange && this.dateRange.length === 2) {
        const [startDate, endDate] = this.dateRange
        this.$message({
          type: 'success',
          message: `已搜索从 ${startDate} 至 ${endDate} 的数据`
        })
      } else if (this.quickDateRange === 'custom') {
        this.$message({
          type: 'warning',
          message: '请选择日期范围'
        })
      }
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
  /* 确保不限制弹层显示 */
  overflow: visible !important;
  
  @media (max-width: 768px) {
    padding-bottom: 20px;
  }
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

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    .button-group {
      display: flex;
      gap: 8px;
    }
    
    @media (max-width: 768px) {
      width: 100%;
      
      .button-group {
        width: 100%;
        
        .el-button {
          width: 100%;
        }
      }
    }
  }

  .filter-bar {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    flex: 1;
    min-width: 0;
    
    @media (max-width: 768px) {
      flex-direction: column;
      width: 100%;
      
      .el-select,
      .el-date-picker,
      .el-button {
        width: 100%;
        flex: 1;
        min-width: 100px;
      }
    }
  }
}

/* 日期选择器弹层样式 - 移动端适配 */
::v-deep .el-picker-panel {
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.15);
  
  @media (max-width: 768px) {
    position: fixed !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    top: auto !important;
    width: 100% !important;
    max-width: 100vw !important;
    max-height: 70vh !important;
    border-radius: 16px 16px 0 0 !important;
    margin: 0 !important;
    z-index: 2000 !important;
    display: flex !important;
    flex-direction: column !important;
    
    /* 确保内容可以滚动 */
    .el-picker-panel__body {
      overflow-y: auto;
      max-height: calc(70vh - 50px);
      
      @supports (padding: max(0px)) {
        max-height: calc(70vh - 50px - env(safe-area-inset-bottom));
      }
    }
  }
}

/* 日期选择器弹出层背景遮罩 */
::v-deep .el-picker-panel__footer {
  @media (max-width: 768px) {
    padding: 12px 16px !important;
    background: #f5f7fa !important;
    border-top: 1px solid #ebeef5 !important;
  }
}

/* 禁用日期选择器的默认位置计算，使用 fixed */
::v-deep .popper {
  @media (max-width: 768px) {
    &[x-placement^="bottom"],
    &[x-placement^="top"] {
      position: fixed !important;
      bottom: 0 !important;
      top: auto !important;
      left: 0 !important;
      right: 0 !important;
      width: 100% !important;
      margin: 0 !important;
      transform: none !important;
    }
  }
}

.charts-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
}

.chart-container {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 16px 0 16px;
    margin-bottom: 12px;

    .chart-title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      margin: 0;
    }

    .chart-actions {
      display: flex;
      gap: 8px;
    }
  }

  .chart-content {
    padding: 0 16px 16px 16px;

    .chart {
      width: 100%;
    }
  }
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
