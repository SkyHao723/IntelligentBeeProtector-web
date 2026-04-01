<template>
  <div class="history-page">
    <div class="page-back-btn">
      <el-button type="text" icon="el-icon-arrow-left" @click="goBack" class="back-button">杩斿洖</el-button>
    </div>
    <div class="page-header">
      <h2 class="page-title">鍘嗗彶璁板綍</h2>
      <p class="page-subtitle">鏌ョ湅璁惧鍘嗗彶鏁版嵁鍜屾搷浣滆锟?/p>
    </div>

    <div class="action-bar">
      <div class="action-buttons">
        <div class="button-group">
          <el-button type="primary" size="small" icon="el-icon-document" @click="generateHealthReport">
            鐢熸垚鍋ュ悍鎶ュ憡
          </el-button>
        </div>
        <div class="button-group">
          <el-button type="info" size="small" icon="el-icon-download">
            瀵煎嚭鏁版嵁
          </el-button>
        </div>
      </div>
      <div class="filter-bar">
        <el-select v-model="filterType" placeholder="閫夋嫨绫诲瀷" size="small" style="width: 120px;">
          <el-option label="鍏ㄩ儴" value="" />
          <el-option label="棰勮璁板綍" value="alert" />
          <el-option label="鎿嶄綔鏃ュ織" value="operation" />
          <el-option label="璁惧鏃ュ織" value="device" />
        </el-select>
        
        <!-- 蹇嵎鏃ユ湡閫夋嫨 -->
        <el-select v-model="quickDateRange" placeholder="蹇嵎鏃ユ湡" size="small" style="width: 120px;" @change="handleQuickDateChange">
          <el-option label="鏈€锟?锟? value="7d" />
          <el-option label="鏈€锟?0锟? value="30d" />
          <el-option label="鏈€锟?0锟? value="90d" />
          <el-option label="鏈€杩戜竴锟? value="1y" />
          <el-option label="鑷畾锟? value="custom" />
        </el-select>
        
        <!-- 鏃ユ湡鑼冨洿閫夋嫨锛堜粎鑷畾涔夋椂鏄剧ず锟?-->
        <el-date-picker
          v-if="quickDateRange === 'custom'"
          v-model="dateRange"
          type="daterange"
          range-separator="锟?
          start-placeholder="寮€濮嬫棩锟?
          end-placeholder="缁撴潫鏃ユ湡"
          size="small"
          format="yyyy-MM-dd"
          :default-time="['00:00:00', '23:59:59']"
          popper-append-to-body
          style="width: 100%;"
        />
        
        <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">鎼滅储</el-button>
      </div>
    </div>

    <div class="charts-section">
      <div class="chart-container">
        <div class="chart-header">
          <h3 class="chart-title">娓╁害鍘嗗彶鏇茬嚎</h3>
          <div class="chart-actions">
            <el-select v-model="tempDevice" placeholder="閫夋嫨璁惧" size="mini" style="width: 120px;">
              <el-option label="鍏ㄩ儴璁惧" value="all" />
              <el-option label="璁惧 #001" value="001" />
              <el-option label="璁惧 #002" value="002" />
              <el-option label="璁惧 #003" value="003" />
            </el-select>
            <el-select v-model="tempPeriod" placeholder="鏃堕棿鑼冨洿" size="mini" style="width: 100px;">
              <el-option label="24灏忔椂" value="24h" />
              <el-option label="7锟? value="7d" />
              <el-option label="30锟? value="30d" />
            </el-select>
          </div>
        </div>
        <div class="chart-content">
          <div ref="temperatureChart" class="chart" style="height: 300px;"></div>
        </div>
      </div>

      <div class="chart-container">
        <div class="chart-header">
          <h3 class="chart-title">閲嶉噺鍘嗗彶鏇茬嚎</h3>
          <div class="chart-actions">
            <el-select v-model="weightDevice" placeholder="閫夋嫨璁惧" size="mini" style="width: 120px;">
              <el-option label="鍏ㄩ儴璁惧" value="all" />
              <el-option label="璁惧 #001" value="001" />
              <el-option label="璁惧 #002" value="002" />
              <el-option label="璁惧 #003" value="003" />
            </el-select>
            <el-select v-model="weightPeriod" placeholder="鏃堕棿鑼冨洿" size="mini" style="width: 100px;">
              <el-option label="24灏忔椂" value="24h" />
              <el-option label="7锟? value="7d" />
              <el-option label="30锟? value="30d" />
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
      <el-button type="text" :loading="loading">鍔犺浇鏇村</el-button>
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
      quickDateRange: '7d', // 榛樿鏄剧ず鏈€锟?锟?
      loading: false,
      tempDevice: 'all',
      tempPeriod: '24h',
      weightDevice: 'all',
      weightPeriod: '24h',
      temperatureChart: null,
      weightChart: null,
      historyList: [
        {
          title: '璁惧 #003 娓╁害棰勮宸插锟?,
          desc: '娓╁害宸叉仮澶嶆甯歌寖鍥达紝褰撳墠娓╁害 37.2掳C',
          time: '2026-03-28 10:45:00',
          type: 'alert',
          device: '璁惧 #003'
        },
        {
          title: '绯荤粺鍙傛暟宸叉洿锟?,
          desc: '绠＄悊鍛樹慨鏀逛簡娓╁害棰勮闃堝€硷紝锟?40掳C 璋冩暣锟?42掳C',
          time: '2026-03-28 10:30:00',
          type: 'operation',
          device: '绯荤粺璁剧疆'
        },
        {
          title: '璁惧 #007 鐥呰櫕瀹抽锟?,
          desc: '妫€娴嬪埌鐤戜技铚傝灗鎰熸煋锛屽凡閫氱煡鐩稿叧浜哄憳',
          time: '2026-03-28 09:15:00',
          type: 'alert',
          device: '璁惧 #007'
        },
        {
          title: '璁惧 #128 涓婄嚎',
          desc: '鏂拌澶囧凡鎴愬姛鎺ュ叆绯荤粺锛屽紑濮嬫暟鎹噰锟?,
          time: '2026-03-28 08:00:00',
          type: 'device',
          device: '璁惧 #128'
        },
        {
          title: '鏁版嵁澶囦唤瀹屾垚',
          desc: '绯荤粺宸茶嚜鍔ㄥ畬鎴愭瘡鏃ユ暟鎹锟?,
          time: '2026-03-28 03:00:00',
          type: 'operation',
          device: '绯荤粺浠诲姟'
        },
        {
          title: '璁惧 #012 绂荤嚎',
          desc: '璁惧缃戠粶杩炴帴涓柇锛岃妫€鏌ョ綉缁滅姸锟?,
          time: '2026-03-27 22:30:00',
          type: 'device',
          device: '璁惧 #012'
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
      
      // 鐢熸垚妯℃嫙鏁版嵁
      for (let i = 0; i < 24; i++) {
        hours.push(`${i}:00`)
        // 妯℃嫙娓╁害鏁版嵁锛屽湪35-40搴︿箣闂存尝锟?
        const baseTemp = 37.5
        const variation = Math.sin(i * 0.5) * 1.5
        const random = (Math.random() - 0.5) * 0.8
        temperatures.push(parseFloat((baseTemp + variation + random).toFixed(1)))
      }
      
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br/>{a}: {c}掳C'
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
          name: '娓╁害(掳C)',
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
            name: '娓╁害',
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
      
      // 鐢熸垚妯℃嫙鏁版嵁
      for (let i = 0; i < 24; i++) {
        hours.push(`${i}:00`)
        // 妯℃嫙閲嶉噺鏁版嵁锛屽湪45-55kg涔嬮棿娉㈠姩
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
          name: '閲嶉噺(kg)',
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
            name: '閲嶉噺',
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
      this.$confirm('纭畾瑕佺敓鎴愬仴搴锋姤鍛婂悧锛熸姤鍛婂皢鍖呭惈鏈€锟?4灏忔椂鐨勬暟鎹垎鏋愶拷?, '鐢熸垚鍋ュ悍鎶ュ憡', {
        confirmButtonText: '纭畾',
        cancelButtonText: '鍙栨秷',
        type: 'info'
      }).then(() => {
        this.loading = true
        // 妯℃嫙鐢熸垚鎶ュ憡鐨勮繃锟?
        setTimeout(() => {
          this.loading = false
          this.$message({
            type: 'success',
            message: '鍋ュ悍鎶ュ憡鐢熸垚鎴愬姛锛佹姤鍛婂凡淇濆瓨锟?鎴戠殑鏂囨。"鏂囦欢澶癸拷?
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
        alert: '棰勮',
        operation: '鎿嶄綔',
        device: '璁惧'
      }
      return map[type] || '鍏朵粬'
    },
    // 绂佺敤鏈潵鏃ユ湡鐨勫嚱锟?
    disabledDateFn(time) {
      // 鍙鐢ㄦ湭鏉ョ殑鏃ユ湡锛屽厑璁搁€夋嫨杩囧線鏃ユ湡
      return time.getTime() > Date.now()
    },
    // 澶勭悊蹇嵎鏃ユ湡閫夋嫨
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
          // 鑷畾涔夋ā寮忥紝娓呯┖鏃ユ湡璁╃敤鎴烽€夋嫨
          this.dateRange = null
          break
      }
    },
    // 鎼滅储鎸夐挳鐐瑰嚮浜嬩欢
    handleSearch() {
      if (this.quickDateRange && this.quickDateRange !== 'custom') {
        this.$message({
          type: 'success',
          message: `宸叉悳锟?${this.quickDateRange} 鐨勬暟鎹甡
        })
      } else if (this.dateRange && this.dateRange.length === 2) {
        const [startDate, endDate] = this.dateRange
        this.$message({
          type: 'success',
          message: `宸叉悳绱粠 ${startDate} 锟?${endDate} 鐨勬暟鎹甡
        })
      } else if (this.quickDateRange === 'custom') {
        this.$message({
          type: 'warning',
          message: '璇烽€夋嫨鏃ユ湡鑼冨洿'
        })
      }
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

.history-page {
  padding: 20px;
  padding-bottom: 80px;
  background: #f5f7fa;
  min-height: calc(100vh - 50px);
  /* 纭繚涓嶉檺鍒跺脊灞傛樉锟?*/
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

/* 鏃ユ湡閫夋嫨鍣ㄥ脊灞傛牱锟?- 绉诲姩绔€傞厤 */
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
    
    /* 纭繚鍐呭鍙互婊氬姩 */
    .el-picker-panel__body {
      overflow-y: auto;
      max-height: calc(70vh - 50px);
      
      @supports (padding: max(0px)) {
        max-height: calc(70vh - 50px - env(safe-area-inset-bottom));
      }
    }
  }
}

/* 鏃ユ湡閫夋嫨鍣ㄥ脊鍑哄眰鑳屾櫙閬僵 */
::v-deep .el-picker-panel__footer {
  @media (max-width: 768px) {
    padding: 12px 16px !important;
    background: #f5f7fa !important;
    border-top: 1px solid #ebeef5 !important;
  }
}

/* 绂佺敤鏃ユ湡閫夋嫨鍣ㄧ殑榛樿浣嶇疆璁＄畻锛屼娇锟?fixed */
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
.back-button { position: absolute; top: 10px; left: 10px; z-index: 1000; }</style>


