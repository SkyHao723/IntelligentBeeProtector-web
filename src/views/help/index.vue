<template>
  <div class="help-page">
    <h2 class="title">使用帮助</h2>

    <!-- 顶部按钮已移除，保留页面内容 -->

    <section class="card" id="tutorial">
      <h3>使用教程</h3>
      <ol>
        <li>登录系统并进入仪表盘。</li>
        <li>在左侧菜单中选择设备管理以添加设备。</li>
        <li>在监控页面查看实时数据并配置告警。</li>
        <li>使用报表功能导出历史记录与统计信息。</li>
      </ol>
    </section>

    <section class="card" id="faq">
      <h3>常见问题</h3>
      <ul>
        <li>Q：如何重置密码？ A：进入“个人资料”页面点击修改密码。</li>
        <li>Q：设备离线怎么办？ A：请检查设备网络并在设备管理中查看连接信息。</li>
        <li>Q：如何导出报表？ A：在报表页面选择时间范围并点击导出。</li>
      </ul>
    </section>

    <section class="card" id="contact">
      <h3>联系客服</h3>
      <p>电话：400-800-1234</p>
      <p>邮箱：support@intelligentbee.io</p>
      <el-button type="primary'" @click="openSupport">在线客服</el-button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HelpPage',
  methods: {
    openSupport() {
      this.$message({ message: '请通过电话或邮箱联系客服。', type: 'info' })
    }
  }
}
</script>

<style scoped>
.help-page { padding: 20px; }
.title { font-size: 20px; margin-bottom: 12px; }
.help-actions { margin-bottom: 12px; display:flex; gap:8px; }
.card { background:#fff; padding:16px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.06); margin-bottom:12px; }
</style>
