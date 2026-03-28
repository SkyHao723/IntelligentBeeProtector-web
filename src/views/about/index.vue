<template>
  <div class="about-page">
    <h2 class="title">关于我们</h2>

    <section class="card">
      <h3>团队介绍</h3>
      <p>我们是智能蜜蜂保护系统的开发团队，致力于为用户提供可靠的设备管理、告警处理与运维监控功能。团队聚焦于大数据和物联网技术，拥有产品、研发和运维等多学科背景的工程师。</p>
    </section>

    <section class="card">
      <h3>产品介绍</h3>
      <p>智能蜜蜂保护系统是一款面向养殖与监测场景的综合平台，集设备接入、实时监控、告警管理、历史追溯与报表分析于一体，帮助用户降低运维成本并提升响应效率。</p>
    </section>

    <section class="card version">
      <h3>版本信息</h3>
      <p>当前版本：v1.0.0</p>
      <p>构建时间：2026-03-28</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
.about-page {
  padding: 24px;
}
.title {
  font-size: 20px;
  margin-bottom: 16px;
}
.card {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  margin-bottom: 12px;
}
.card h3 {
  margin: 0 0 8px 0;
}
.version p {
  margin: 4px 0;
}
</style>
