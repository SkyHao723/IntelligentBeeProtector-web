<template><div class="back-button"><el-button @click="$router.go(-1)" icon="el-icon-arrow-left" size="small">·µ»Ø</el-button></div>
  <i-frame :src="url" />
</template>
<script>
import iFrame from "@/components/iFrame/index"
export default {
  name: "Swagger",
  components: { iFrame },
  data() {
    return {
      url: process.env.VUE_APP_BASE_API + "/swagger-ui/index.html"
    }
  }
}
</script>

