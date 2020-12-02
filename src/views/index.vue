<template>
<div class="container2">
  <div class="part2">
    <h1 class="title2">{{getTitle("ZW")}}</h1>
    <div class="content2">
      <div class="period2" v-for="(option, index) in ZWOptions" :key="index">
        <el-link class="time2" title="查看详情" @click="goto(option, 'ZW', ZWOptions)">{{getTime(option, "ZW")}}</el-link>
        <div class="crews2">
           <div class="member2 clearfix" v-for="(item, index) in option.crews" :key="index" @click="showProfile(item, 1)">
            <el-avatar shape="square" :size="50" :src="'/static/mock/photos/' + (item.photo[0] ? item.photo[0] : 'avatar.png')"></el-avatar>
            <div>
              <span class="station" :class="[{'space': item.station.length === 2}]">{{item.station}}</span>
              <span class="name" :class="[{'space2': item.name.length === 2, 'space3': item.name.length === 3}]">{{item.name}}</span>
              <span class="tenure">{{item.tenure}}</span>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <el-button round type="danger" @click="showDetails('main_duties', 'ZW', option, 1)">工作内容</el-button>
          <el-button round type="danger" @click="showDetails('summary', 'ZW', option, 1)" >工作总结</el-button>
          <el-button round type="danger" @click="showDetails('snapshot', 'ZW', option, 1)">工作掠影</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      :title="profileTile1"
      :visible.sync="profile_visible1"
      :modal-append-to-body="false"
      :lock-scroll="false"
      center
      class="dialog-absolute"
      custom-class="dialog_custom_class2">
      <div class="profile2" :style="{'max-height': part2Height + 'px'}">
        <div class="profile_photo left">
          <el-image
            style="width: 160px; height: 200px"
            :src="profile1.photo"
            fit="cover"
            lazy
            v-if="profile1.photo"></el-image>
          <img src="../assets/images/touxiang.jpg" v-else/>
        </div>
        <div class="profile_content" v-html="profile1.profile"></div>
      </div>
    </el-dialog>
    <el-dialog
      :title="detailTitle1"
      :visible.sync="main_duty_visible1"
      center
      :lock-scroll="false"
      :modal-append-to-body="false"
      custom-class="dialog_custom_class2"
      class="dialog-absolute">
      <div class="main_duties" :style="{'max-height': part2Height + 'px'}" v-html="main_duties1"></div>
    </el-dialog>
    <el-dialog
      :title="detailTitle1"
      :visible.sync="snapshot_visible1"
      center
      :lock-scroll="false"
      :modal-append-to-body="false"
      custom-class="dialog_custom_class2"
      class="dialog-absolute">
      <div class="main_duties">
        <el-carousel :autoplay="false" height="800px">
          <el-carousel-item v-for="(item, index) in snapshots1" :key="index" >
            <div class="glimpse-box">
              <el-image :src="item" fit="cover"></el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-dialog>
  </div>
  <div class="part2">
    <h1 class="title2">{{getTitle("RD")}}</h1>
    <div class="content2">
      <div class="period2" v-for="(option, index) in RDOptions" :key="index">
        <el-link class="time2" title="查看详情"  @click="goto(option, 'RD', RDOptions)">{{getTime(option, "RD")}}</el-link>
        <div class="crews2">
          <div class="member2 clearfix" v-for="(item, index) in option.crews" :key="index" @click="showProfile(item, 2)">
            <el-avatar shape="square" :size="50" :src="'/static/mock/photos/' + (item.photo[0] ? item.photo[0] : 'avatar.png')"></el-avatar>
            <div>
              <span class="station" :class="[{'space': item.station.length === 2}]">{{item.station}}</span>
              <span class="name" :class="[{'space2': item.name.length === 2, 'space3': item.name.length === 3}]">{{item.name}}</span>
              <span class="tenure">{{item.tenure}}</span>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <el-button round type="info" @click="showDetails('main_duties', 'RD', option, 2)">工作内容</el-button>
          <el-button round type="info" @click="showDetails('summary', 'RD', option, 2)">工作总结</el-button>
          <el-button round type="info" @click="showDetails('snapshot', 'RD', option, 2)">工作掠影</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      :title="profileTile2"
      :visible.sync="profile_visible2"
      :modal-append-to-body="false"
      :lock-scroll="false"
      center
      class="dialog-absolute"
      custom-class="dialog_custom_class2">
      <div class="profile2" :style="{'max-height': part2Height + 'px'}">
        <div class="profile_photo left">
          <el-image
            style="width: 160px; height: 200px"
            :src="profile2.photo"
            fit="cover"
            lazy
            v-if="profile2.photo"></el-image>
          <img src="../assets/images/touxiang.jpg" v-else/>
        </div>
        <div class="profile_content" v-html="profile2.profile"></div>
      </div>
    </el-dialog>
    <el-dialog
      :title="detailTitle2"
      :visible.sync="main_duty_visible2"
      center
      :lock-scroll="false"
      :modal-append-to-body="false"
      custom-class="dialog_custom_class2"
      class="dialog-absolute">
      <div class="main_duties" :style="{'max-height': part2Height + 'px'}" v-html="main_duties2"></div>
    </el-dialog>
    <el-dialog
      :title="detailTitle2"
      :visible.sync="snapshot_visible2"
      center
      :lock-scroll="false"
      :modal-append-to-body="false"
      custom-class="dialog_custom_class2"
      class="dialog-absolute">
      <div class="main_duties">
        <el-carousel :autoplay="false" height="800px">
          <el-carousel-item v-for="(item, index) in snapshots2" :key="index" >
            <div class="glimpse-box">
              <el-image :src="item" fit="cover"></el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-dialog>
  </div>
  <div class="part2">
    <h1 class="title2">{{getTitle("ZF")}}</h1>
    <div class="content2">
      <div class="period2" v-for="(option, index) in ZFOptions" :key="index">
        <el-link class="time2" title="查看详情" @click="goto(option, 'ZF', ZFOptions)">{{getTime(option, "ZF")}}</el-link>
        <div class="crews2">
           <div class="member2 clearfix" v-for="(item, index) in option.crews" :key="index" @click="showProfile(item, 3)">
            <el-avatar shape="square" :size="50" :src="'/static/mock/photos/' + (item.photo[0] ? item.photo[0] : 'avatar.png')"></el-avatar>
            <div>
              <span class="station" :class="[{'space': item.station.length === 2}]">{{item.station}}</span>
              <span class="name" :class="[{'space2': item.name.length === 2, 'space3': item.name.length === 3}]">{{item.name}}</span>
              <span class="tenure">{{item.tenure}}</span>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <el-button round type="success" @click="showDetails('main_duties', 'ZF', option, 3)">工作内容</el-button>
          <el-button round type="success" @click="showDetails('summary', 'ZF', option, 3)">工作总结</el-button>
          <el-button round type="success" @click="showDetails('snapshot', 'ZF', option, 3)">工作掠影</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      :title="profileTile3"
      :visible.sync="profile_visible3"
      :modal-append-to-body="false"
      :lock-scroll="false"
      center
      class="dialog-absolute"
      custom-class="dialog_custom_class2">
      <div class="profile2" :style="{'max-height': part2Height + 'px'}">
        <div class="profile_photo left">
          <el-image
            style="width: 160px; height: 200px"
            :src="profile3.photo"
            fit="cover"
            lazy
            v-if="profile3.photo"></el-image>
          <img src="../assets/images/touxiang.jpg" v-else/>
        </div>
        <div class="profile_content" v-html="profile3.profile"></div>
      </div>
    </el-dialog>
    <el-dialog
      :title="detailTitle3"
      :visible.sync="main_duty_visible3"
      center
      :lock-scroll="false"
      :modal-append-to-body="false"
      custom-class="dialog_custom_class2"
      class="dialog-absolute">
      <div class="main_duties" :style="{'max-height': part2Height + 'px'}" v-html="main_duties3"></div>
    </el-dialog>
    <el-dialog
      :title="detailTitle3"
      :visible.sync="snapshot_visible3"
      center
      :lock-scroll="false"
      :modal-append-to-body="false"
      custom-class="dialog_custom_class2"
      class="dialog-absolute">
      <div class="main_duties">
        <el-carousel :autoplay="false" height="800px">
          <el-carousel-item v-for="(item, index) in snapshots3" :key="index" >
            <div class="glimpse-box">
              <el-image :src="item" fit="cover"></el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-dialog>
  </div>
  <div class="part2">
    <h1 class="title2">{{getTitle("ZX")}}</h1>
    <div class="content2">
      <div class="period2" v-for="(option, index) in ZXOptions" :key="index">
        <el-link class="time2" title="查看详情" @click="goto(option, 'ZX', ZXOptions)">{{getTime(option, "ZX")}}</el-link>
        <div class="crews2">
           <div class="member2 clearfix" v-for="(item, index) in option.crews" :key="index" @click="showProfile(item, 4)">
            <el-avatar shape="square" :size="50" :src="'/static/mock/photos/' + (item.photo[0] ? item.photo[0] : 'avatar.png')"></el-avatar>
            <div>
              <span class="station" :class="[{'space': item.station.length === 2}]">{{item.station}}</span>
              <span class="name" :class="[{'space2': item.name.length === 2, 'space3': item.name.length === 3}]">{{item.name}}</span>
              <span class="tenure">{{item.tenure}}</span>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <el-button round type="warning" @click="showDetails('main_duties', 'ZX', option, 4)">工作内容</el-button>
          <el-button round type="warning" @click="showDetails('summary', 'ZX', option, 4)">工作总结</el-button>
          <el-button round type="warning" @click="showDetails('snapshot', 'ZX', option, 4)">工作掠影</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      :title="profileTile4"
      :visible.sync="profile_visible4"
      :modal-append-to-body="false"
      :lock-scroll="false"
      center
      class="dialog-absolute"
      custom-class="dialog_custom_class2">
      <div class="profile2" :style="{'max-height': part2Height + 'px'}">
        <div class="profile_photo left">
          <el-image
            style="width: 160px; height: 200px"
            :src="profile4.photo"
            fit="cover"
            lazy
            v-if="profile4.photo"></el-image>
          <img src="../assets/images/touxiang.jpg" v-else/>
        </div>
        <div class="profile_content" v-html="profile4.profile"></div>
      </div>
    </el-dialog>
    <el-dialog
      :title="detailTitle4"
      :visible.sync="main_duty_visible4"
      center
      :lock-scroll="false"
      :modal-append-to-body="false"
      custom-class="dialog_custom_class2"
      class="dialog-absolute">
      <div class="main_duties" :style="{'max-height': part2Height + 'px'}" v-html="main_duties4"></div>
    </el-dialog>
    <el-dialog
      :title="detailTitle4"
      :visible.sync="snapshot_visible4"
      center
      :lock-scroll="false"
      :modal-append-to-body="false"
      custom-class="dialog_custom_class2"
      class="dialog-absolute">
      <div class="main_duties">
        <el-carousel :autoplay="false" height="800px">
          <el-carousel-item v-for="(item, index) in snapshots4" :key="index" >
            <div class="glimpse-box">
              <el-image :src="item" fit="cover"></el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-dialog>
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
      explainText: '<div>特别说明：</div><div class="section">玉树州六届人大一次会议以前，均未设立常设机构，闭会期间，其职能由州人民委员会行使，1981年5月自治州第六届人民代表大会第一次会议选举产生了它的常设机关---州人民代表大会常务委员会。</div>',
      profile_visible1: false,
      profile_visible2: false,
      profile_visible3: false,
      profile_visible4: false,
      profileTile1: '',
      profileTile2: '',
      profileTile3: '',
      profileTile4: '',
      hasPre: false,
      hasNext: false,
      profile1: {},
      profile2: {},
      profile3: {},
      profile4: {},
      detailTitle1: '',
      detailTitle2: '',
      detailTitle3: '',
      detailTitle4: '',
      main_duty_visible1: false,
      main_duty_visible2: false,
      main_duty_visible3: false,
      main_duty_visible4: false,
      main_duties1: '',
      main_duties2: '',
      main_duties3: '',
      main_duties4: '',
      snapshot_visible1: false,
      snapshot_visible2: false,
      snapshot_visible3: false,
      snapshot_visible4: false,
      snapshots1: [],
      snapshots2: [],
      snapshots3: [],
      snapshots4: [],
      part2Height: 0
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
          time = "玉树州人大第" + this.china[option.period - 1] + "届常委会： " + option.time;
          break;
        case 'ZF':
          time = "玉树州政府第" + this.china[option.period - 1] + "届人代会： " + option.time;
          break;
        case 'ZX':
          time = "玉树州政协第" + this.china[option.period - 1] + "届委员会: " + option.time;
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
    showDetails(type, group, option, flag) {
      let title = type == 'snapshot' ? "工作掠影" : (type == 'summary' ? '工作总结' : '工作内容');
      this["detailTitle" + flag] = this.getFullTitle(option, group, title);
      switch(type) {
        case "snapshot": 
          if(option.snapshot && option.snapshot.length) {
            this["snapshot_visible" + flag] = true;
            this["snapshots" + flag] = option.snapshot.map(item =>{
              item = "/static/mock/glimpses/" + group.toLowerCase() + "/" + item;
              return item
            })
          } else {
            this.emptyNotice(title)
          }
          break;
        case "summary":
        case "main_duties":
          if(option[type]){
            this["main_duty_visible" + flag ] = true;
            let text = "<div class='section'>" + option[type] + "</div>"
            text = text.replace(/\n/g, "\n</div><div class='section'>");
            this["main_duties" + flag] = text;
          } else {
            this.emptyNotice(title)
          }
          break;
      }
    },
    emptyNotice(title) {
      this.$notify({
        title: title,
        message: '数据采集中，暂无数据',
        type: 'warning',
        duration: '1000'
      });
    },
    // 获取全部数据
    getWholePeriodData() {
      const _this = this;
      Ajax({
        url: '/static/mock/whole.json',
      }).then(data => {
        _this.ZWOptions = data.ZW;
        _this.RDOptions = data.RD;
        _this.ZFOptions = data.ZF;
        _this.ZXOptions = data.ZX;
      })
    },
    goto(option, group, options) {
      this.$router.push({
        name: 'part',
        params: {
          option: option,
          group: group,
          options:  options
        }
      })
    },
    showProfile(item, flag) {
      console.log(item, flag)
      if(item.more){
        this["profile_visible" + flag] = true;
        this["profileTile" + flag] = item.name + "  个人简介";
        this["profile" + flag] = {
          photo: item.photo,
          profile: item.profile
        };
        this.modifyProfile(flag);
      } else {
        this.emptyNotice(item.name)
      }
    },
    modifyProfile(flag) {
      if(this["profile" + flag].photo.length) {
        this["profile" + flag].photo = "/static/mock/photos/" + this["profile" + flag].photo[0];
      } else {
        this["profile" + flag].photo = ""
      }
      if(this["profile" + flag].profile) {
        let text = "<div class='section'>" + this["profile" + flag].profile + "</div>"
        text = text.replace(/\n/g, "\n</div><div class='section'>");
        this["profile" + flag].profile = text;
      } else {
        this["profile" + flag].profile = '数据采集中，暂无数据'
      }
    }
  },
  created() {
    // ...
  },
  mounted() {
    this.getWholePeriodData();
    let part2 = document.getElementsByClassName("part2")[0].getBoundingClientRect();
    this.part2Height = part2.height * 0.6
  }
}
</script>