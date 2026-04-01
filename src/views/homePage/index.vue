<template>
  <div class="home-page">
    <div class="page-back-btn">
      <el-button type="text" icon="el-icon-arrow-left" @click="goBack" class="back-button">杩斿洖</el-button>
    </div>
    <div class="page-header">
      <h2 class="page-title">鏅鸿渹鍗＋</h2>
      <p class="page-subtitle">鏅鸿兘铚傜绠＄悊绯荤粺</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <svg-icon icon-class="peoples" />
        </div>
        <div class="stat-info">
          <div class="stat-value">128</div>
          <div class="stat-label">铚傜鎬绘暟</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
          <svg-icon icon-class="monitor" />
        </div>
        <div class="stat-info">
          <div class="stat-value">96</div>
          <div class="stat-label">鍦ㄧ嚎铚傜</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
          <svg-icon icon-class="bug" />
        </div>
        <div class="stat-info">
          <div class="stat-value">32</div>
          <div class="stat-label">棰勮浜嬩欢</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
          <svg-icon icon-class="chart" />
        </div>
        <div class="stat-info">
          <div class="stat-value">98.5%</div>
          <div class="stat-label">绯荤粺鍋ュ悍锟?/div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <h3 class="section-title">蹇€熸搷锟?/h3>
      </div>
      <div class="quick-actions">
        <div class="action-item" @click="$router.push('/monitorPage')">
          <svg-icon icon-class="eye" class="action-icon" />
          <span>鏌ョ湅鐩戞帶</span>
        </div>
        <div class="action-item" @click="$router.push('/historyPage')">
          <svg-icon icon-class="log" class="action-icon" />
          <span>鍘嗗彶璁板綍</span>
        </div>
        <div class="action-item" @click="$router.push('/myPage')">
          <svg-icon icon-class="settings" class="action-icon" />
          <span>绯荤粺璁剧疆</span>
        </div>
        <div class="action-item" @click="$router.push('/notifications')">
          <svg-icon icon-class="xiaoxi" class="action-icon" />
          <span>娑堟伅閫氱煡</span>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <h3 class="section-title">鏈€鏂板姩锟?/h3>
        <span class="view-more">鏌ョ湅鏇村</span>
      </div>
      <div class="activity-list">
        <div class="activity-item">
          <div class="activity-dot"></div>
          <div class="activity-content">
            <div class="activity-title">铚傜 #001 妫€娴嬪埌寮傚父</div>
            <div class="activity-time">5鍒嗛挓锟?/div>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-dot success"></div>
          <div class="activity-content">
            <div class="activity-title">绯荤粺鍗囩骇瀹屾垚</div>
            <div class="activity-time">1灏忔椂锟?/div>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-dot"></div>
          <div class="activity-content">
            <div class="activity-title">鏂板铚傜 #128 涓婄嚎</div>
            <div class="activity-time">3灏忔椂锟?/div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    goBack() {
      this.$router.go(-1)
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

.home-page {
  padding: 20px;
  padding-bottom: 80px;
  background: #f5f7fa;
  min-height: 100vh;
}



.page-header {
  margin-bottom: 24px;
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
.back-button { position: absolute; top: 10px; left: 10px; z-index: 1000; }</style>


