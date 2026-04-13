<template>
  <div class="bee-monitor-page">
    <div class="page-back-btn">
      <el-button type="text" icon="el-icon-arrow-left" @click="goBack" class="back-button">返回</el-button>
    </div>
    <div class="page-header">
      <h2 class="page-title">实时观测 - 蜂箱 #{{ String(beeId).padStart(3, '0') }}</h2>
      <p class="page-subtitle">实时监控蜂箱内部和外部情况</p>
    </div>

    <div class="monitor-images">
      <div class="image-section">
        <h3>蜂箱内部</h3>
        <div class="image-container">
          <div class="image-overlay">
            <div class="live-badge">LIVE</div>
            <div class="timestamp">{{ currentTime }}</div>
          </div>
          <img :src="selectedBeePicturein" alt="蜂箱内部图片" class="monitor-image" />
        </div>
      </div>

      <div class="image-section">
        <h3>蜂箱外部</h3>
        <div class="image-container">
          <div class="image-overlay">
            <div class="live-badge">LIVE</div>
            <div class="timestamp">{{ currentTime }}</div>
          </div>
          <img :src="selectedBeePictureout" alt="蜂箱外部图片" class="monitor-image" />
        </div>
      </div>
    </div>

    <div class="control-panel">
      <el-button type="primary" icon="el-icon-camera" @click="takePhoto" :loading="takingPhoto">
        {{ takingPhoto ? '拍照中...' : '一键拍照' }}
      </el-button>
      <el-button @click="goBack">返回监控中心</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeeMonitor',
  data() {
    return {
      beeId: this.$route.params.id,
      takingPhoto: false,
      currentTime: '',
      timeInterval: null,
      beePictureinImages: [
        require('@/assets/beePicturein/08.jpg'),
        require('@/assets/beePicturein/09.jpg'),
        require('@/assets/beePicturein/10.jpg'),
        require('@/assets/beePicturein/11.jpg'),
        require('@/assets/beePicturein/12.jpg'),
        require('@/assets/beePicturein/13.jpg')
      ],
      beePictureoutImages: [
        require('@/assets/beePictureout/01.png'),
        require('@/assets/beePictureout/02.jpg'),
        require('@/assets/beePictureout/03.png'),
        require('@/assets/beePictureout/04.png'),
        require('@/assets/beePictureout/05.png'),
        require('@/assets/beePictureout/06.png'),
        require('@/assets/beePictureout/07.png')
      ]
    }
  },
  computed: {
    selectedBeePicturein() {
      // 根据蜂箱ID选择内部图片
      const index = (this.beeId - 1) % this.beePictureinImages.length
      return this.beePictureinImages[index]
    },
    selectedBeePictureout() {
      // 根据蜂箱ID选择外部图片
      const index = (this.beeId - 1) % this.beePictureoutImages.length
      return this.beePictureoutImages[index]
    }
  },
  mounted() {
    this.updateTime()
    this.timeInterval = setInterval(this.updateTime, 1000)
  },
  beforeDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval)
    }
  },
  methods: {
    updateTime() {
      const now = new Date()
      this.currentTime = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    },
    async takePhoto() {
      this.takingPhoto = true
      
      try {
        // 模拟拍照过程
        await this.sleep(2000)
        
        // 显示成功消息
        this.$message({
          message: '拍照成功！图片已保存',
          type: 'success',
          duration: 3000
        })
        
        // 可以在这里添加实际的拍照逻辑，比如调用摄像头API或发送请求到后端
        console.log('拍照完成 - 蜂箱 #' + this.beeId)
        
      } catch (error) {
        this.$message({
          message: '拍照失败，请重试',
          type: 'error',
          duration: 3000
        })
        console.error('拍照失败:', error)
      } finally {
        this.takingPhoto = false
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
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

.bee-monitor-page {
  padding: 20px;
  background: #f5f7fa;
  min-height: calc(100vh - 50px);
  overflow-y: auto;
  padding-bottom: 100px; /* 增加底部padding以确保内容完全可见 */
}

.page-header {
  margin-bottom: 24px;
  text-align: center;

  .page-title {
    margin: 0 0 8px 0;
    color: #303133;
    font-size: 24px;
    font-weight: 500;
  }

  .page-subtitle {
    margin: 0;
    color: #909399;
    font-size: 14px;
  }
}

.monitor-images {
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;

  .image-section {
    flex: 1;
    max-width: 500px;
    min-width: 300px;

    h3 {
      margin: 0 0 16px 0;
      color: #303133;
      font-size: 18px;
      text-align: center;
    }

    .image-container {
      background: #fff;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      position: relative;

      .image-overlay {
        position: absolute;
        top: 20px;
        left: 20px;
        z-index: 10;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .live-badge {
        background: #f56c6c;
        color: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        display: inline-block;
        animation: pulse 2s infinite;
      }

      .timestamp {
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
      }

      .monitor-image {
        width: 100%;
        height: auto;
        border-radius: 4px;
        display: block;
      }
    }
  }
}

.control-panel {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .el-button {
    padding: 12px 24px;
    font-size: 16px;

    &.el-button--primary {
      background-color: #409EFF;
      border-color: #409EFF;

      &:hover {
        background-color: #66b1ff;
        border-color: #66b1ff;
      }
    }
  }
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .bee-monitor-page {
    padding: 10px;
  }

  .monitor-images {
    flex-direction: column;
    align-items: center;

    .image-section {
      max-width: 100%;
    }
  }

  .control-panel {
    flex-direction: column;
    align-items: center;

    .el-button {
      width: 200px;
    }
  }
}
</style>
