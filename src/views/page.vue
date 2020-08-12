<template>
<div class="container2">
  <div class="part2">
    <h1 class="title2">{{getTitle("ZW")}}</h1>
    <div class="content2">
      <div class="period2" v-for="(option, index) in ZWOptions" :key="index">
        <el-link class="time2" title="查看详情" @click="goto(option, 'ZW')">{{getTime(option, "ZW")}}</el-link>
        <div class="crews2">
           <div class="member2 clearfix" v-for="(item, index) in option.crews" :key="index" @click="showProfile(item, index)">
            <span class="station">{{item.station}}</span>
            <span class="name">{{item.name}}</span>
            <span class="tenure">{{item.tenure}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="part2">
    <h1 class="title2">{{getTitle("RD")}}</h1>
    <div class="content2">
      <div class="period2" v-for="(option, index) in RDOptions" :key="index">
        <el-link class="time2" title="查看详情"  @click="goto(option, 'RD')">{{getTime(option, "RD")}}</el-link>
        <div class="crews2">
           <div class="member2 clearfix" v-for="(item, index) in option.crews" :key="index" @click="showProfile(item, index)">
            <span class="station">{{item.station}}</span>
            <span class="name">{{item.name}}</span>
            <span class="tenure">{{item.tenure}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="part2">
    <h1 class="title2">{{getTitle("ZF")}}</h1>
    <div class="content2">
      <div class="period2" v-for="(option, index) in ZFOptions" :key="index">
        <el-link class="time2" title="查看详情" @click="goto(option, 'ZF')">{{getTime(option, "ZF")}}</el-link>
        <div class="crews2">
           <div class="member2 clearfix" v-for="(item, index) in option.crews" :key="index" @click="showProfile(item, index)">
            <span class="station">{{item.station}}</span>
            <span class="name">{{item.name}}</span>
            <span class="tenure">{{item.tenure}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="part2">
    <h1 class="title2">{{getTitle("ZX")}}</h1>
    <div class="content2">
      <div class="period2" v-for="(option, index) in ZXOptions" :key="index">
        <el-link class="time2" title="查看详情" @click="goto(option, 'ZX')">{{getTime(option, "ZX")}}</el-link>
        <div class="crews2">
           <div class="member2 clearfix" v-for="(item, index) in option.crews" :key="index" @click="showProfile(item, index)">
            <span class="station">{{item.station}}</span>
            <span class="name">{{item.name}}</span>
            <span class="tenure">{{item.tenure}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Ajax from "@utils/request.js"

export default {
  data () {
    return {
      ZWOptions: [],
      RDOptions: [],
      ZFOptions: [],
      ZXOptions: [],
      china: ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三', '十四'],
      explainText: '<div>特别说明：</div><div class="section">玉树州六届人大一次会议以前，均未设立常设机构，闭会期间，其职能由州人民委员会行使，1981年5月自治州第六届人民代表大会第一次会议选举产生了它的常设机关---州人民代表大会常务委员会。</div>'
    }
  },
  computed:{

  },
  methods: {
    // 获取标题
    getTitle(group) {
      let title = '';
      switch(group) {
        case 'ZW':
          title = "历届州委会领导";
          break;
        case 'RD':
          title = "历届人大领导";
          break;
        case 'ZF':
          title = "历届政府领导";
          break;
        case 'ZX':
          title = "历届政协领导";
          break;
      }
      return title
    },
    // 获取任期时间
    getTime(option, group) {
      let time = '';
      switch(group) {
        case 'ZW':
          time = "玉树州第" + this.china[option.period - 1] + "届州委委员会： " + option.time;
          break;
        case 'RD':
          time = "玉树州第" + this.china[option.period - 1] + "届人大常委会： " + option.time;
          break;
        case 'ZF':
          time = "玉树州第" + this.china[option.period - 1] + "届人代会： " + option.time;
          break;
        case 'ZX':
          time = "玉树州第" + this.china[option.period - 1] + "届政协委员会" + option.time;
          break;
      }
      return time
    },
    // 获取某一届数据
    getPeriodData() {
      const _this = this;
      Ajax({
        url: '/static/mock/periods/whole.json',
      }).then(data => {
        console.log(data)
        _this.ZWOptions = data.ZW;
        _this.RDOptions = data.RD;
        _this.ZFOptions = data.ZF;
        _this.ZXOptions = data.ZX;
      })
    },
    goto(option, group) {
      this.$router.push({
        name: 'part',
        params: {
          option: option,
          group: group
        }
      })
    }
  },
  mounted() {
    this.getPeriodData();
  }
}
</script>