<template>

</template>

<script>
import ScrollPane from './ScrollPane'
import path from 'path'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      canScrollLeft: false,
      canScrollRight: false,
      isFullscreen: false,
      hiddenElements: []
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routes() {
      return this.$store.state.permission.routes
    },
    theme() {
      return this.$store.state.settings.theme
    },
    tagsIcon() {
      return this.$store.state.settings.tagsIcon
    },
    selectedDropdownTag() {
      return this.visitedViews.find(v => this.isActive(v)) || {}
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    },
    visitedViews() {
      this.$nextTick(() => {
        this.updateArrowState()
      })
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
    window.addEventListener('resize', this.updateArrowState)
    window.addEventListener('keydown', this.handleKeyDown)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateArrowState)
    window.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    handleKeyDown(event) {
      // 当按下Esc键且处于全屏状态时，退出全屏
      if (event.key === 'Escape' && this.isFullscreen) {
        this.toggleFullscreen()
      }
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    activeStyle(tag) {
      if (!this.isActive(tag)) return {}
      return {
        "background-color": this.theme,
        "border-color": this.theme
      }
    },
    isAffix(tag) {
      return tag && tag.meta && tag.meta.affix
    },
    isFirstView() {
      try {
        const tag = this.selectedTag && this.selectedTag.fullPath ? this.selectedTag : this.selectedDropdownTag
        return tag.fullPath === '/index' || tag.fullPath === this.visitedViews[1].fullPath
      } catch (err) {
        return false
      }
    },
    isLastView() {
      try {
        const tag = this.selectedTag && this.selectedTag.fullPath ? this.selectedTag : this.selectedDropdownTag
        return tag.fullPath === this.visitedViews[this.visitedViews.length - 1].fullPath
      } catch (err) {
        return false
      }
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      if (this.$store.state.settings.tagsViewPersist) {
        this.$store.dispatch('tagsView/loadPersistedViews')
      }
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        if (tag.name) {
          this.$store.dispatch('tagsView/addAffixView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    scrollLeft() {
      if (!this.canScrollLeft) return
      this.$refs.scrollPane.scrollToStart()
    },
    scrollRight() {
      if (!this.canScrollRight) return
      this.$refs.scrollPane.scrollToEnd()
    },
    updateArrowState() {
      this.$nextTick(() => {
        if (this.$refs.scrollPane) {
          const state = this.$refs.scrollPane.getScrollState()
          this.canScrollLeft = state.canLeft
          this.canScrollRight = state.canRight
        }
      })
    },
    toggleFullscreen() {
      const mainContainer = document.querySelector('.main-container')
      const navbar = document.querySelector('.navbar')
      const sidebar = document.querySelector('.sidebar-container')
      if (!mainContainer) return

      if (!this.isFullscreen) {
        mainContainer.classList.add('fullscreen-mode')
        document.body.style.overflow = 'hidden'
        const elementsToHide = [
          { el: navbar, originalDisplay: (navbar && navbar.style.display) || '' },
          { el: sidebar, originalDisplay: (sidebar && sidebar.style.display) || '' }
        ]
        elementsToHide.forEach(item => {
          if (item.el && item.el.style.display !== 'none') {
            item.originalDisplay = item.el.style.display
            item.el.style.display = 'none'
            this.hiddenElements.push(item)
          }
        })
        this.isFullscreen = true
      } else {
        mainContainer.classList.remove('fullscreen-mode')
        document.body.style.overflow = ''
        this.hiddenElements.forEach(item => {
          if (item.el) {
            item.el.style.display = item.originalDisplay
          }
        })
        this.hiddenElements = []
        const btn = document.querySelector('.tags-action-btn')
        if (btn) btn.blur()
        this.isFullscreen = false
      }
    },
    handleDropdownCommand(command) {
      const tag = this.selectedDropdownTag
      this.selectedTag = tag
      switch (command) {
        case 'refresh':
          this.refreshSelectedTag(tag)
          break
        case 'fullscreen':
          this.toggleFullscreen()
          break
        case 'close':
          this.closeSelectedTag(tag)
          break
        case 'closeOthers':
          this.closeOthersTags()
          break
        case 'closeLeft':
          this.closeLeftTags()
          break
        case 'closeRight':
          this.closeRightTags()
          break
        case 'closeAll':
          this.closeAllTags(tag)
          break
      }
    },
    refreshSelectedTag(view) {
      this.$tab.refreshPage(view)
      if (this.$route.meta.link) {
        this.$store.dispatch('tagsView/delIframeView', this.$route)
      }
    },
    closeSelectedTag(view) {
      this.$tab.closePage(view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeRightTags() {
      this.$tab.closeRightPage(this.selectedTag).then(visitedViews => {
        if (!visitedViews.find(i => i.fullPath === this.$route.fullPath)) {
          this.toLastView(visitedViews)
        }
      })
    },
    closeLeftTags() {
      this.$tab.closeLeftPage(this.selectedTag).then(visitedViews => {
        if (!visitedViews.find(i => i.fullPath === this.$route.fullPath)) {
          this.toLastView(visitedViews)
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag.fullPath).catch(() => {})
      this.$tab.closeOtherPage(this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      this.$tab.closeAllPage().then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === this.$route.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        if (view && view.name === 'Dashboard') {
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      this.left = e.clientX
      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    handleScroll() {
      this.closeMenu()
      this.updateArrowState()
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  display: flex;
  align-items: center;

  $btn-width: 28px;
  $btn-color: #71717a;
  $btn-hover-bg: #f0f2f5;
  $btn-hover-color: #303133;
  $btn-disabled-color: #c0c4cc;
  $divider: 1px solid #d8dce5;

  .tags-nav-btn {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: $btn-width;
    height: 34px;
    cursor: pointer;
    color: $btn-color;
    font-size: 13px;
    user-select: none;
    transition: background 0.15s, color 0.15s;

    &:hover:not(.disabled) {
      background: $btn-hover-bg;
      color: $btn-hover-color;
    }

    &.disabled {
      color: $btn-disabled-color;
      cursor: not-allowed;
    }

    &--left {
      border-right: $divider;
    }

    &--right {
      border-left: $divider;
    }
  }

  .tags-view-wrapper {
    flex: 1;
    min-width: 0;

    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      border-radius: 3px;

      &:first-of-type {
        margin-left: 6px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .tags-view-item.active.has-icon::before {
    content: none !important;
  }

  .tags-action-dropdown {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .tags-action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: $btn-width;
    height: 34px;
    cursor: pointer;
    color: $btn-color;
    font-size: 13px;
    border-left: $divider;
    user-select: none;
    transition: background 0.15s, color 0.15s;

    &:hover {
      background: $btn-hover-bg;
      color: $btn-hover-color;
    }
  }

  .tags-refresh-btn {
    width: 60px;
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: fixed;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}

/* 页签全屏模式样式 */
.main-container.fullscreen-mode {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.main-container.fullscreen-mode .fixed-header {
  display: block !important;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100% !important;
  z-index: 1000;
}

.main-container.fullscreen-mode .fixed-header .navbar {
  display: none !important;
}

.main-container.fullscreen-mode .app-main {
  position: fixed;
  top: 34px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 !important;
  padding: 0 !important;
  height: calc(100vh - 34px) !important;
  min-height: calc(100vh - 34px) !important;
  overflow: auto;
}
</style>
