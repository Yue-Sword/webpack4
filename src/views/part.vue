<template>
<div class="container2" style="height: 90.5%;padding-top: 3%; padding-left: 5%; padding-right: 5%;">
  <div class="part2 part-alone">
    <div class="content2" style="padding: 0.5% 1%;">
    	<div class="main_duty" v-cloak>{{main_duty_title}}</div>
      <div class="crews-alone">
        <div class="member clearfix" v-for="(item, index) in options.crews" :key="index" @click="showProfile(item, index, group)">
          <el-avatar shape="square" :size="80" :src="'/static/mock/photos/' + (item.photo[0] ? item.photo[0] : 'avatar.png')"></el-avatar>
          <span class="station" :class="[{'space': item.station.length === 2}]">{{item.station}}</span>
          <span class="name" :class="[{'space2': item.name.length === 2, 'space3': item.name.length === 3}]">{{item.name}}</span>
          <span class="tenure">{{item.tenure}}</span>
        </div>
      </div>
      <div class="main_duty">
        <div class="main_duty_label">工作内容</div>
        <el-link 
          :title="options.main_duties?'':'数据采集中，暂无数据'"
          @click="showDetails(options.main_duties, 'main_duties')" 
          class="main_duty_link" 
          :disabled="!options.main_duties">
          查看详情
          <i class="el-icon--right el-icon-view" v-if="options.main_duties"></i>
          <i class="el-icon--right el-icon-warning-outline" v-else></i>
        </el-link>
      </div>
      <div class="main_duty">
        <div class="main_duty_label">工作总结</div>
        <el-link 
          :title="options.summary?'':'数据采集中，暂无数据'"
          @click="showDetails(options.summary, 'summary')" 
          class="main_duty_link" 
          :disabled="!options.summary">
          查看详情
          <i class="el-icon--right el-icon-view" v-if="options.summary"></i>
          <i class="el-icon--right el-icon-warning-outline" v-else></i>
        </el-link>
      </div>
      <div class="snapshot">
        <div class="glimpse_label">工作掠影</div>
        <el-carousel :autoplay="false" height="800px" v-if="options.snapshot && options.snapshot.length">
          <el-carousel-item v-for="(item, index) in options.snapshot" :key="index">
            <div class="glimpse-box" style="margin: 0 auto;max-width: 20%;height: 760px;">
              <el-image :src="item" fit="cover"></el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div  class="glimpses-empty" v-else>
          <el-image>
            <div slot="error" class="image-slot" style="text-align: center;">
              <i class="el-icon-picture-outline" style="font-size: 100px;"></i>
              <div class="empty-text">数据采集中，暂无数据</div>
            </div>
          </el-image>
        </div>
      </div>
    </div>
  </div>
  <div class="menu-actions clearfix">
    <el-button round type="danger" @click="backHome">返回</el-button>
    <el-button round type="danger" @click="previousPeriod" v-if="(group != 'RD' && period > 1) || (group == 'RD'&& period > 6)">上一届</el-button>
    <el-button round type="danger" @click="nextPeriod" v-if="(group != 'ZX' && period < 13) || (group == 'ZX' && period < 14)">下一届</el-button>
  </div>
  <el-dialog
    :title="detailTitle"
    :visible.sync="main_duty_visible"
    center
    append-to-body
    custom-class="dialog_custom_class2">
    <div class="main_duties" v-html="main_duties" style="maxHeight: 60vh"></div>
  </el-dialog>
  <el-dialog
    :title="profileTile"
    :visible.sync="profile_visible"
    center
    append-to-body
    custom-class="dialog_custom_class2">
    <div class="profile2" style="maxHeight: 60vh">
      <div class="profile_photo left">
        <el-image
          style="width: 160px; height: 200px"
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
import { getChineseNum } from "@utils"


export default {
  data () {
    return {
      options: {
      	crews: [],
      	main_duties: '',
      	summary: '',
      	snapshot: []
      },
      option: {},
      group: '',
      main_duty_visible: false,
      main_duties: '',
      profileTile: '',
      profile_visible: false,
      profile: {},
      period: 1,
      curPersonIndex: -1,
      hasPre: false,
      hasNext: false,
      detailTitle: '',
      main_duty_title: '',
      wholeData: []
    }
  },
  computed:{
    //...
  },
  methods: {
    // 获取任期时间
    getTime() {
      let time = '';
      switch(this.group) {
        case 'ZW':
          time = "中共玉树州委第" + getChineseNum(this.options.period) + "届委员会： " + this.options.time;
          break;
        case 'RD':
          time = "玉树州人大第" + getChineseNum(this.options.period) + "届常委会： " + this.options.time;
          break;
        case 'ZF':
          time = "玉树州政府第" + getChineseNum(this.options.period) + "届人代会： " + this.options.time;
          break;
        case 'ZX':
          time = "玉树州政协第" + getChineseNum(this.options.period) + "届委员会" + this.options.time;
          break;
      }
      return time
    },
    // 个人简介
    showProfile(item, index, group) {
      this.curPersonIndex = index;
      this.hasPre = this.checkPre();
      this.hasNext = this.checkNext();
      if(item.more){
        this.profile_visible = true;
        this.profileTile = item.name + "个人简介";
        this.profile = {
          photo: item.photo,
          profile: item.profile
        };
        this.modifyProfile();
      } else {
         this.$notify({
          title: item.name,
          message: '数据采集中，暂无数据',
          type: 'warning',
          duration: '1000'
        });
      }
    },
    // 工作内容
    showDetails(text, type) {
      this.detailTitle = type === "main_duties" ? "工作内容" : "工作总结";
      this.main_duty_visible = true;
      text = "<div class='section'>" + text + "</div>"
      text = text.replace(/\n/g, "\n</div><div class='section'>");
      this.main_duties = text;
    },
    // 下一届
    nextPeriod() {
      if(!((this.group != 'ZX' && this.period < 13) || (this.group == 'ZX' && this.period < 14))) return
      this.period++;
      this.getPeriodData();
    },
    // 上一届
    previousPeriod() {
      if((this.group != 'RD' && this.period == 1)|| (this.group == 'RD' && this.period == 6)) return;
      this.period--;
      this.getPeriodData();
    },
    backHome() {
      this.$router.push('/');
    },
    prePerson() {
      let idx = [];
      let crews = this.getCurCrews().filter((crew, index) => {
        if(crew.more && index < this.curPersonIndex) {
          idx.push(index)
        }
        return crew.more && index < this.curPersonIndex
      });
      this.curPersonIndex = idx.pop();
      let crew = crews.pop();
      this.profileTile = crew.name + "  个人简介";
      this.profile = {
        photo: crew.photo,
        profile: crew.profile
      };
      this.modifyProfile();
      this.hasPre = this.checkPre();
      this.hasNext = this.checkNext();
    },
    nextPerson() {
      let idx = [];
      let crews = this.getCurCrews().filter((crew, index) => {
        if(crew.more && index > this.curPersonIndex) {
          idx.push(index)
        }
        return crew.more && index > this.curPersonIndex
      });
      this.curPersonIndex = idx.shift();
      this.profileTile = crew.name + "  个人简介";
      let crew = crews.shift();
      this.profile = {
        photo: crew.photo,
        profile: crew.profile
      };
      this.modifyProfile();

      this.hasPre = this.checkPre();
      this.hasNext = this.checkNext();
    },
    getCurCrews() {
      return this.options.crews;
    },
    checkPre() {
      return this.checkMore(false);
    },
    checkNext() {
      return this.checkMore(true)
    },
    checkMore(orientation) {
      // 约定true为next, false为prev
      let state = false;
      const _this = this;
      if((this.curPersonIndex > -1 && orientation) || (this.curPersonIndex > 0 && !orientation)) {
        let crews = this.getCurCrews();
        crews.forEach((crew, index) => {
          if(crew.more) {
            if(orientation) {
              if(_this.curPersonIndex < index) state = true;
            } else {
              if(_this.curPersonIndex > index) state = true;
            }
          }
          if(crew.more && _this.curPersonIndex < index) state = true;
        })
      }
      return state
    },
    modifyProfile() {
      if(this.profile.photo.length) {
        this.profile.photo = "/static/mock/photos/" + this.profile.photo[0];
      }
      if(this.profile.profile) {
        let text = "<div class='section'>" + this.profile.profile + "</div>"
        text = text.replace(/\n/g, "\n</div><div class='section'>");
        this.profile.profile = text;
      } else {
        this.profile.profile = '数据采集中，暂无数据'
      }
    },
    getPeriodData() {
      this.options = JSON.parse(JSON.stringify(this.wholeData)).filter(item => {
        return item.period === this.period;
      })[0];
      this.main_duty_title = this.getTime();
      this.options.snapshot = this.options.snapshot.map(item =>{
        item = "/static/mock/glimpses/" + this.group.toLowerCase() + "/" + item;
        return item
      })
    }
  },
  created() {
    //...
  },
  mounted() {
  	if(this.$route.params.group) {
      this.wholeData = JSON.parse(JSON.stringify(this.$route.params.options));
  		this.options = this.$route.params.option;
      this.group = this.$route.params.group;
      this.period = this.options.period;
      this.main_duty_title = this.getTime();
      this.options.snapshot = this.options.snapshot.map(item =>{
        item = "/static/mock/glimpses/" + this.group.toLowerCase() + "/" + item;
        return item
      })
    }else{
  		history.back();
  	}
  }
}
</script>