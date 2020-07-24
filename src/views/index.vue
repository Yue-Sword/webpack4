<template>
  <div style="overflow:hidden">
    <div class="main_duties" v-html="options.ZW.main_duties"></div>
    <div class="main_duties" v-html="options.RD.main_duties"></div>
    <div class="main_duties" v-html="options.ZF.main_duties"></div>
    <div class="main_duties" v-html="options.ZX.main_duties"></div>
  </div>
</template>
<script>
import Ajax from "@utils/request.js"

export default {
  data () {
    return {
      options: {
        ZW: {},
        RD: {},
        ZF: {},
        ZX: {}
      }
    }
  },
  methods: {

  },
  mounted() {
    const _this = this;
    Ajax({
      url: '../../static/mock/period-9.json',
    }).then(data => {
      _this.options = data
      console.log(data)
    })
  }
}
</script>