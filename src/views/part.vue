<template>
  <div class="part zw">
    <div class="content">
      <div class="title">中共玉树州第九届州委领导</div>
      <div class="crews">
        <div class="member clearfix" v-for="(item, index) in options.ZW.crews" :key="index">
          <span class="station">{{item.station}}</span>
          <span class="name">{{item.name}}</span>
          <span class="tenure">{{item.tenure}}</span>
        </div>
      </div>
      <div class="main_duties" v-html="options.ZW.main_duties"></div>
    </div>
  </div>
  
</template>
<script>

export default {
  name: "depart",
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