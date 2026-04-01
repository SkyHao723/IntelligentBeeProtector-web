<template><div class="back-button"><el-button @click="$router.go(-1)" icon="el-icon-arrow-left" size="small">返回</el-button></div>
  <div class="errPage-container">
    <el-button icon="arrow-left" class="pan-back-btn" @click="back">
      杩斿洖
    </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          401閿欒!
        </h1>
        <h2>鎮ㄦ病鏈夎闂潈闄愶紒</h2>
        <h6>瀵逛笉璧凤紝鎮ㄦ病鏈夎闂潈闄愶紝璇蜂笉瑕佽繘琛岄潪娉曟搷浣滐紒鎮ㄥ彲浠ヨ繑鍥炰富椤甸潰</h6>
        <ul class="list-unstyled">
          <li class="link-type">
            <router-link to="/">
              鍥為椤?
            </router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'

export default {
  name: 'Page401',
  data() {
    return {
      errGif: errGif + '?' + +new Date()
    }
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;
    .pan-back-btn {
      background: #008489;
      color: #fff;
      border: none!important;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
.back-button { position: absolute; top: 10px; left: 10px; z-index: 1000; }</style>


