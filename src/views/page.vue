<template>
<div class="container2">
  <div class="part2">
    <h1 class="title2">{{getTitle("ZW")}}</h1>
    <div class="content2">
      <div class="period2" v-for="(option, index) in ZWOptions" :key="index">
        <el-link class="time2" title="查看详情" @click="goto(option, 'ZW')">{{getTime(option, "ZW")}}</el-link>
        <div class="crews2">
           <div class="member2 clearfix" v-for="(item, index) in option.crews" :key="index" @click="showProfile(item, index)">
            <el-avatar shape="square" :size="50" :src="'/static/mock/photos/' + (item.photo ? item.photo : 'avatar.png')"></el-avatar>
            <div>
              <span class="station" :class="[{'space': item.station.length === 2}]">{{item.station}}</span>
              <span class="name" :class="[{'space2': item.name.length === 2, 'space3': item.name.length === 3}]">{{item.name}}</span>
              <span class="tenure">{{item.tenure}}</span>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <el-button round type="danger" @click="showDetails('main_duties', 'ZW', option)">工作内容</el-button>
          <el-button round type="danger" @click="showDetails('summary', 'ZW', option)" >工作总结</el-button>
          <el-button round type="danger" @click="showDetails('snapshot', 'ZW', option)">工作掠影</el-button>
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
            <el-avatar shape="square" :size="50" :src="'/static/mock/photos/' + (item.photo ? item.photo : 'avatar.png')"></el-avatar>
            <div>
              <span class="station" :class="[{'space': item.station.length === 2}]">{{item.station}}</span>
              <span class="name" :class="[{'space2': item.name.length === 2, 'space3': item.name.length === 3}]">{{item.name}}</span>
              <span class="tenure">{{item.tenure}}</span>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <el-button round type="info" @click="showDetails('main_duties', 'RD', option)">工作内容</el-button>
          <el-button round type="info" @click="showDetails('summary', 'RD', option)">工作总结</el-button>
          <el-button round type="info" @click="showDetails('snapshot', 'RD', option)">工作掠影</el-button>
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
            <el-avatar shape="square" :size="50" :src="'/static/mock/photos/' + (item.photo ? item.photo : 'avatar.png')"></el-avatar>
            <div>
              <span class="station" :class="[{'space': item.station.length === 2}]">{{item.station}}</span>
              <span class="name" :class="[{'space2': item.name.length === 2, 'space3': item.name.length === 3}]">{{item.name}}</span>
              <span class="tenure">{{item.tenure}}</span>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <el-button round type="success" @click="showDetails('main_duties', 'ZF', option)">工作内容</el-button>
          <el-button round type="success" @click="showDetails('summary', 'ZF', option)">工作总结</el-button>
          <el-button round type="success" @click="showDetails('snapshot', 'ZF', option)">工作掠影</el-button>
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
            <el-avatar shape="square" :size="50" :src="'/static/mock/photos/' + (item.photo ? item.photo : 'avatar.png')"></el-avatar>
            <div>
              <span class="station" :class="[{'space': item.station.length === 2}]">{{item.station}}</span>
              <span class="name" :class="[{'space2': item.name.length === 2, 'space3': item.name.length === 3}]">{{item.name}}</span>
              <span class="tenure">{{item.tenure}}</span>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <el-button round type="warning" @click="showDetails('main_duties', 'ZX', option)">工作内容</el-button>
          <el-button round type="warning" @click="showDetails('summary', 'ZX', option)">工作总结</el-button>
          <el-button round type="warning" @click="showDetails('snapshot', 'ZX', option)">工作掠影</el-button>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    :title="detailTitle"
    :visible.sync="main_duty_visible"
    width="900px"
    center
    append-to-body
    custom-class="dialog_custom_class2">
    <div class="main_duties" v-html="main_duties"></div>
  </el-dialog>
  <el-dialog
    :title="detailTitle"
    :visible.sync="snapshot_visible"
    width="900px"
    center
    append-to-body
    custom-class="dialog_custom_class2">
    <div class="main_duties">
      <el-carousel :autoplay="false" height="400px">
        <el-carousel-item v-for="(item, index) in snapshots" :key="index" >
          <div class="glimpse-box">
            <el-image :src="item" fit="cover"></el-image>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-dialog>
  <el-dialog
    :title="profileTile"
    :visible.sync="profile_visible"
    width="900px"
    center
    append-to-body
    custom-class="dialog_custom_class2">
    <div class="profile2">
      <div class="profile_photo left">
        <el-image
          style="width: 150px; height: 150px"
          :src="profile.photo"
          fit="cover"
          lazy
          v-if="profile.photo"></el-image>
        <img src="../assets/images/touxiang.jpg" v-else/>
      </div>
      <div class="profile_content" v-html="profile.profile"></div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="prePerson" v-if="hasPre">上一位</el-button>
      <el-button type="primary" v-if="hasNext" @click="nextPerson">下一位</el-button>
    </span>
  </el-dialog>
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
      explainText: '<div>特别说明：</div><div class="section">玉树州六届人大一次会议以前，均未设立常设机构，闭会期间，其职能由州人民委员会行使，1981年5月自治州第六届人民代表大会第一次会议选举产生了它的常设机关---州人民代表大会常务委员会。</div>',
      profile_visible: false,
      profileTile: '',
      hasPre: false,
      hasNext: false,
      profile: {},
      curPersonIndex: -1,
      detailTitle: '',
      main_duty_visible: false,
      main_duties: '',
      snapshot_visible: false,
      snapshots: []
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
          title = "历届州委领导";
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
          time = "中共玉树州委第" + this.china[option.period - 1] + "届委员会： " + option.time;
          break;
        case 'RD':
          time = "中共玉树州人大第" + this.china[option.period - 1] + "届常委会： " + option.time;
          break;
        case 'ZF':
          time = "中共玉树州政府第" + this.china[option.period - 1] + "届人代会： " + option.time;
          break;
        case 'ZX':
          time = "中共玉树州政协第" + this.china[option.period - 1] + "届委员会: " + option.time;
          break;
      }
      return time
    },
    getFullTitle(option, group, title) {
      let fulltitle = '';
      switch(group) {
        case 'ZW':
          fulltitle = "玉树州第" + this.china[option.period - 1] + "届州委委员会 -- " + title;
          break;
        case 'RD':
          fulltitle = "玉树州第" + this.china[option.period - 1] + "届人大常委会 --  " + title;
          break;
        case 'ZF':
          fulltitle = "玉树州第" + this.china[option.period - 1] + "届人代会 -- " + title;
          break;
        case 'ZX':
          fulltitle = "玉树州第" + this.china[option.period - 1] + "届政协委员会 -- " + title;
          break;
      }
      return fulltitle
    },
    showDetails(type, group, option) {
      let title = type == 'snapshot' ? "工作掠影" : (type == 'summary' ? '工作总结' : '工作内容');
      this.detailTitle = this.getFullTitle(option, group, title);
      const _this = this;
      Ajax({
        url: '/static/mock/periods/period-' + option.period + '.json',
      }).then(data => {
        if(type === 'snapshot') {
          if(data[group][type] && data[group][type].length) {
            _this.snapshot_visible = true;
            _this.snapshots = data[group][type].map(item =>{
              item = "/static/mock/glimpses/" + group.toLowerCase() + "/" + item;
              return item
            })
          } else {
            _this.$notify({
              title: title,
              message: '数据采集中，暂无数据',
              type: 'warning',
              duration: '1000'
            });
          }
        } else {
          if(data[group][type]){
            _this.main_duty_visible = true;
            let text = "<div class='section'>" + data[group][type] + "</div>"
            text = text.replace(/\n/g, "\n</div><div class='section'>");
            _this.main_duties = text;
          } else {
            _this.$notify({
              title: title,
              message: '数据采集中，暂无数据',
              type: 'warning',
              duration: '1000'
            });
          }
        }
      })
    },
    // 获取全部数据
    getWholePeriodData() {
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
    },
    showProfile(item, index) {
      console.log(item,index)
      this.curPersonIndex = index;
      this.hasPre = this.checkPre();
      this.hasNext = this.checkNext();
      const _this = this;
      if(item.more){
        Ajax({
          url: '/static/mock/profiles/' + item.id + '.json',
        }).then(data => {
          if(data) {
            _this.profile_visible = true;
            _this.profileTile = item.name + "个人简介";
            _this.profile = data.datas;
            _this.modifyProfile();
          }
        })
      } else {
         this.$notify({
          title: item.name,
          message: '数据采集中，暂无数据',
          type: 'warning',
          duration: '1000'
        });
      }
    },
    modifyProfile() {
      if(this.profile.photo.length) {
        this.profile.photo = "/static/mock/photos/" + this.profile.photo[0];
      } else {
        this.profile.photo = ""
      }
      if(this.profile.profile) {
        let text = "<div class='section'>" + this.profile.profile + "</div>"
        text = text.replace(/\n/g, "\n</div><div class='section'>");
        this.profile.profile = text;
      } else {
        this.profile.profile = '数据采集中，暂无数据'
      }
    },
    checkPre() {
      let pre = false;
      // if(this.curPersonIndex > 0) {
      //   const _this = this;
      //   let crews = this.getCurCrews();
      //   crews.forEach((crew, index) => {
      //     if(crew.more && _this.curPersonIndex > index) pre = true;
      //   })
      // }
      return pre
    },
    checkNext() {
      let next = false;
      // if(this.curPersonIndex > -1) {
      //   const _this = this;
      //   let crews = this.getCurCrews();
      //   crews.forEach((crew, index) => {
      //     if(crew.more && _this.curPersonIndex < index) next = true;
      //   })
      // }
      return next
    },
    prePerson() {

    },
    nextPerson() {

    }
  },
  created() {
    let borderDom = document.getElementsByClassName("ys-electronic-board")[0];
    borderDom.style.maxWidth = "initial";
    borderDom.style.maxHeight = "initial";
    borderDom.style.minWidth = "3840px";
    borderDom.style.minHeight = "1080px";
  },
  mounted() {
    this.getWholePeriodData();
    let area = document.getElementsByClassName("ys-electronic-board")[0].getBoundingClientRect();
    let container2Dom = document.getElementsByClassName("container2")[0];
    container2Dom.style.paddingTop = (area.height*0.236/area.width*100).toFixed(1) + "%";
  }
}
</script>