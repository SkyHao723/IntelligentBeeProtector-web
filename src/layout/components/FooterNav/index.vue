<template>
  <div class="footer-nav-container">
    <nav class="footer-nav">
      <div
        v-for="item in navItems"
        :key="item.path"
        class="nav-item"
        :class="{ active: isActive(item) }"
        @click="handleNavClick(item)"
      >
        <div class="icon-wrapper">
          <svg-icon :icon-class="item.icon" class="nav-icon" />
          <i class="active-dot"></i>
        </div>
        <span class="nav-text">{{ item.title }}</span>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'FooterNav',
  data() {
    return {
      navItems: [
        { title: '首页', icon: 'dashboard', path: '/homePage' },
        { title: '监控', icon: 'monitor', path: '/monitorPage' },
        { title: '历史', icon: 'log', path: '/historyPage' },
        { title: '我的', icon: 'user', path: '/myPage' }
      ]
    }
  },
  computed: {
    activeMenu() {
      const { meta, path } = this.$route
      return meta.activeMenu || path
    }
  },
  methods: {
    isActive(item) {
      return this.activeMenu === item.path || this.activeMenu.startsWith(item.path + '/')
    },
    handleNavClick(item) {
      if (this.$route.path !== item.path) {
        this.$router.push(item.path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 定义主题色变量
$primary-color: #007AFF; // 更现代的 iOS 风格蓝色
$text-gray: #94a3b8;
$bg-glass: rgba(255, 255, 255, 0.85);

.footer-nav-container {
  position: fixed;
  bottom: 20px; // 悬浮感：距离底部一段距离
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 1000;
  padding: 0 16px;
  // 适配 iOS 安全区域
  padding-bottom: env(safe-area-inset-bottom);
}

.footer-nav {
  display: flex;
  width: 100%;
  max-width: 500px; // 限制大屏下的宽度
  height: 64px;
  background: $bg-glass;
  backdrop-filter: blur(12px); // 毛玻璃核心
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 40px; // 圆润的边角
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  .nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-tap-highlight-color: transparent;

    .icon-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2px;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

      .nav-icon {
        width: 22px;
        height: 22px;
        color: $text-gray;
        transition: color 0.3s;
      }

      .active-dot {
        position: absolute;
        bottom: -6px;
        width: 4px;
        height: 4px;
        background: $primary-color;
        border-radius: 50%;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
      }
    }

    .nav-text {
      font-size: 11px;
      font-weight: 500;
      color: $text-gray;
      transition: all 0.3s;
    }

    // 激活状态样式
    &.active {
      .icon-wrapper {
        transform: translateY(-2px) scale(1.1); // 激活时轻微上浮放大
        .nav-icon {
          color: $primary-color;
        }
        .active-dot {
          opacity: 1;
          transform: scale(1);
        }
      }
      .nav-text {
        color: $primary-color;
        transform: scale(1.05);
      }
    }

    // 点击时的反馈效果
    &:active {
      opacity: 0.7;
      transform: scale(0.95);
    }
  }
}
</style>
