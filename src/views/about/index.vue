<template>
  <div class="about-page">
    <div class="page-header">
      <h2 class="page-title">关于我们</h2>
      <p class="page-subtitle">智能蜂箱管理系统</p>
    </div>

    <div class="content-section">
      <div class="section-header">
        <h3 class="section-title">系统介绍</h3>
      </div>
      <div class="section-content">
        <p>智能蜂箱管理系统是一个基于物联网技术的蜜蜂养殖监控与管理平台。系统通过传感器网络实时监测蜂箱环境参数，利用人工智能算法分析蜜蜂行为，为养蜂人提供科学的养殖决策支持。</p>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <h3 class="section-title">主要功能</h3>
      </div>
      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">
            <svg-icon icon-class="monitor" />
          </div>
          <div class="feature-content">
            <h4>实时监控</h4>
            <p>24小时不间断监控蜂箱温度、湿度、重量等关键参数</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <svg-icon icon-class="warning" />
          </div>
          <div class="feature-content">
            <h4>智能预警</h4>
            <p>基于AI算法识别异常行为，及时发出预警通知</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <svg-icon icon-class="chart" />
          </div>
          <div class="feature-content">
            <h4>数据分析</h4>
            <p>可视化数据报表，帮助分析蜜蜂生长趋势</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <svg-icon icon-class="history" />
          </div>
          <div class="feature-content">
            <h4>历史记录</h4>
            <p>完整的历史数据存储与查询功能</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <h3 class="section-title">技术架构</h3>
      </div>
      <div class="section-content">
        <p>系统采用前后端分离架构，前端使用Vue.js + Element UI，后端基于Spring Boot微服务架构，数据库使用MySQL，消息队列使用RabbitMQ，缓存使用Redis。</p>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <h3 class="section-title">联系我们</h3>
      </div>
      <div class="contact-info">
        <div class="contact-item">
          <svg-icon icon-class="email" class="contact-icon" />
          <span>support@bee-protector.com</span>
        </div>
        <div class="contact-item">
          <svg-icon icon-class="phone" class="contact-icon" />
          <span>400-123-4567</span>
        </div>
        <div class="contact-item">
          <svg-icon icon-class="location" class="contact-icon" />
          <span>北京市海淀区中关村科技园</span>
        </div>
      </div>
    </div>

    <div class="version-info">
      <p>当前版本：v1.0.0</p>
      <p>最后更新：2026年3月</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="scss" scoped>
.about-page {
  padding: 20px;
  padding-bottom: 80px;
  background: #f5f7fa;
  min-height: calc(100vh - 50px);
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

.content-section {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  .section-header {
    margin-bottom: 16px;

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      margin: 0;
    }
  }

  .section-content {
    p {
      font-size: 14px;
      color: #606266;
      line-height: 1.6;
      margin: 0;
    }
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  .feature-item {
    display: flex;
    align-items: flex-start;

    .feature-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: #ecf5ff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      flex-shrink: 0;

      .svg-icon {
        width: 20px;
        height: 20px;
        color: #409EFF;
      }
    }

    .feature-content {
      h4 {
        font-size: 14px;
        font-weight: 600;
        color: #303133;
        margin: 0 0 4px 0;
      }

      p {
        font-size: 12px;
        color: #909399;
        margin: 0;
        line-height: 1.4;
      }
    }
  }
}

.contact-info {
  .contact-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }

    .contact-icon {
      width: 20px;
      height: 20px;
      color: #409EFF;
      margin-right: 12px;
    }

    span {
      font-size: 14px;
      color: #606266;
    }
  }
}

.version-info {
  text-align: center;
  padding: 20px 0;

  p {
    font-size: 12px;
    color: #909399;
    margin: 4px 0;
  }
}
</style>