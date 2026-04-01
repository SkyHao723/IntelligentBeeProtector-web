<template>
  <div class="help-page">
    <div class="page-back-btn">
      <el-button type="text" icon="el-icon-arrow-left" @click="goBack" class="back-button">杩斿洖</el-button>
    </div>
    <h2 class="title">浣跨敤甯姪</h2>

    <!-- 椤堕儴鎸夐挳宸茬Щ闄わ紝淇濈暀椤甸潰鍐呭 -->

    <section class="card" id="tutorial">
      <h3>浣跨敤鏁欑▼</h3>
      <ol>
        <li>鐧诲綍绯荤粺骞惰繘鍏ヤ华琛ㄧ洏锟?/li>
        <li>鍦ㄥ乏渚ц彍鍗曚腑閫夋嫨璁惧绠＄悊浠ユ坊鍔犺澶囷拷?/li>
        <li>鍦ㄧ洃鎺ч〉闈㈡煡鐪嬪疄鏃舵暟鎹苟閰嶇疆棰勮锟?/li>
        <li>浣跨敤鎶ヨ〃鍔熻兘瀵煎嚭鍘嗗彶璁板綍涓庣粺璁′俊鎭拷?/li>
      </ol>
    </section>

    <section class="card" id="faq">
      <h3>甯歌闂</h3>
      <ul>
        <li>Q锛氬浣曢噸缃瘑鐮侊紵 A锛氳繘鍏モ€滀釜浜鸿祫鏂欌€濋〉闈㈢偣鍑讳慨鏀瑰瘑鐮侊拷?/li>
        <li>Q锛氳澶囩绾挎€庝箞鍔烇紵 A锛氳妫€鏌ヨ澶囩綉缁滃苟鍦ㄨ澶囩鐞嗕腑鏌ョ湅杩炴帴淇℃伅锟?/li>
        <li>Q锛氬浣曞鍑烘姤琛紵 A锛氬湪鎶ヨ〃椤甸潰閫夋嫨鏃堕棿鑼冨洿骞剁偣鍑诲鍑猴拷?/li>
      </ul>
    </section>

    <section class="card" id="contact">
      <h3>鑱旂郴瀹㈡湇</h3>
      <p>鐢佃瘽锟?00-800-1234</p>
      <p>閭锛歴upport@intelligentbee.io</p>
      <el-button type="primary'" @click="openSupport">鍦ㄧ嚎瀹㈡湇</el-button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HelpPage',
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    openSupport() {
      this.$message({ message: '璇烽€氳繃鐢佃瘽鎴栭偖绠辫仈绯诲鏈嶏拷?, type: 'info' })
    }
  }
}
</script>

<style scoped>
.page-back-btn {
  padding: 0 0 12px 0;
  margin-bottom: 8px;
}

.page-back-btn .back-button {
  color: #409EFF;
  font-size: 14px;
}

.page-back-btn .back-button:hover {
  color: #66b1ff;
}

.help-page { 
  padding: 20px; 
  background: #f5f7fa;
  min-height: calc(100vh - 50px);
}
.title { font-size: 20px; margin-bottom: 12px; }
.help-actions { margin-bottom: 12px; display:flex; gap:8px; }
.card { background:#fff; padding:16px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.06); margin-bottom:12px; }
.back-button { position: absolute; top: 10px; left: 10px; z-index: 1000; }</style>


