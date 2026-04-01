<template><div class="back-button"><el-button @click="$router.go(-1)" icon="el-icon-arrow-left" size="small">返回</el-button></div>
  <div class="about-page">
    <div class="page-back-btn">
      <el-button type="text" icon="el-icon-arrow-left" @click="goBack" class="back-button">杩斿洖</el-button>
    </div>
    <div class="page-header">
      <h2 class="page-title">鍏充簬鎴戜滑</h2>
      <p class="page-subtitle">鏅鸿兘铚傜绠＄悊绯荤粺</p>
    </div>

    <div class="content-section">
      <div class="section-header">
        <h3 class="section-title">绯荤粺浠嬬粛</h3>
      </div>
      <div class="section-content">
        <p>鏅鸿兘铚傜绠＄悊绯荤粺鏄竴涓熀浜庣墿鑱旂綉鎶€鏈殑铚滆渹鍏绘畺鐩戞帶涓庣鐞嗗钩鍙般€傜郴缁熼€氳繃浼犳劅鍣ㄧ綉缁滃疄鏃剁洃娴嬭渹绠辩幆澧冨弬鏁帮紝鍒╃敤浜哄伐鏅鸿兘绠楁硶鍒嗘瀽铚滆渹琛屼负锛屼负鍏昏渹浜烘彁渚涚瀛︾殑鍏绘畺鍐崇瓥鏀寔銆?/p>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <h3 class="section-title">涓昏鍔熻兘</h3>
      </div>
      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">
            <svg-icon icon-class="monitor" />
          </div>
          <div class="feature-content">
            <h4>瀹炴椂鐩戞帶</h4>
            <p>24灏忔椂涓嶉棿鏂洃鎺ц渹绠辨俯搴︺€佹箍搴︺€侀噸閲忕瓑鍏抽敭鍙傛暟</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <svg-icon icon-class="warning" />
          </div>
          <div class="feature-content">
            <h4>鏅鸿兘棰勮</h4>
            <p>鍩轰簬AI绠楁硶璇嗗埆寮傚父琛屼负锛屽強鏃跺彂鍑洪璀﹂€氱煡</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <svg-icon icon-class="chart" />
          </div>
          <div class="feature-content">
            <h4>鏁版嵁鍒嗘瀽</h4>
            <p>鍙鍖栨暟鎹姤琛紝甯姪鍒嗘瀽铚滆渹鐢熼暱瓒嬪娍</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <svg-icon icon-class="history" />
          </div>
          <div class="feature-content">
            <h4>鍘嗗彶璁板綍</h4>
            <p>瀹屾暣鐨勫巻鍙叉暟鎹瓨鍌ㄤ笌鏌ヨ鍔熻兘</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <h3 class="section-title">鎶€鏈灦鏋?/h3>
      </div>
      <div class="section-content">
        <p>绯荤粺閲囩敤鍓嶅悗绔垎绂绘灦鏋勶紝鍓嶇浣跨敤Vue.js + Element UI锛屽悗绔熀浜嶴pring Boot寰湇鍔℃灦鏋勶紝鏁版嵁搴撲娇鐢∕ySQL锛屾秷鎭槦鍒椾娇鐢≧abbitMQ锛岀紦瀛樹娇鐢≧edis銆?/p>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <h3 class="section-title">鑱旂郴鎴戜滑</h3>
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
          <span>鍖椾含甯傛捣娣€鍖轰腑鍏虫潙绉戞妧鍥?/span>
        </div>
      </div>
    </div>

    <div class="version-info">
      <p>褰撳墠鐗堟湰锛歷1.0.0</p>
      <p>鏈€鍚庢洿鏂帮細2026骞?鏈?/p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
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
.back-button { position: absolute; top: 10px; left: 10px; z-index: 1000; }</style>

