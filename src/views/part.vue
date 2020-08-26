<template>
<div class="container2">
  <div class="part2 part-alone">
    <div class="content2">
    	<div class="main_duty">{{getTime()}}</div>
      <div class="crews-alone">
        <div class="member clearfix" v-for="(item, index) in options.crews" :key="index" @click="showProfile(item, index, group)">
          <el-avatar shape="square" :size="50" :src="'/static/mock/photos/' + (item.photo ? item.photo : 'avatar.png')"></el-avatar>
          <span class="station">{{item.station}}</span>
          <span class="name">{{item.name}}</span>
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
        <el-carousel :autoplay="false" height="400px" v-if="options.snapshot && options.snapshot.length">
          <el-carousel-item v-for="(item, index) in options.snapshot" :key="index">
            <div class="glimpse-box">
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
    width="900px"
    center
    append-to-body
    custom-class="dialog_custom_class2">
    <div class="main_duties" v-html="main_duties"></div>
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
      options: {
      	crews: [],
      	main_duties: '',
      	summary: '',
      	snapshot: []
      },
      china: ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三', '十四'],
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
    getTime() {
      let time = '';
    	switch(this.group) {
        case 'ZW':
          time = "玉树州第" + this.china[this.options.period - 1] + "届州委委员会： " + this.options.time;
          break;
        case 'RD':
          time = "玉树州第" + this.china[this.options.period - 1] + "届人大常委会： " + this.options.time;
          break;
        case 'ZF':
          time = "玉树州第" + this.china[this.options.period - 1] + "届人代会： " + this.options.time;
          break;
        case 'ZX':
          time = "玉树州第" + this.china[this.options.period - 1] + "届政协委员会" + this.options.time;
          break;
      }
      return time
    },
    // 个人简介
    showProfile(item, index, group) {
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
          console.log(data)
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
      this.profileTile = crew.name + "个人简介";
      const _this = this;
      Ajax({
        url: '/static/mock/profiles/' + crew.id + '.json',
      }).then(data => {
        if(data) {
          _this.profile = data.datas;
          _this.modifyProfile();
        }
      })
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
      let crew = crews.shift();
      this.profileTile = crew.name + "个人简介";
      const _this = this;
      Ajax({
        url: '/static/mock/profiles/' + crew.id + '.json',
      }).then(data => {
        if(data) {
          _this.profile = data.datas;
          _this.modifyProfile();
        }
      })
      this.hasPre = this.checkPre();
      this.hasNext = this.checkNext();
    },
    getCurCrews() {
      return this.options.crews;
    },
    checkPre() {
      let pre = false;
      if(this.curPersonIndex > 0) {
        const _this = this;
        let crews = this.getCurCrews();
        crews.forEach((crew, index) => {
          if(crew.more && _this.curPersonIndex > index) pre = true;
        })
      }
      return pre
    },
    checkNext() {
      let next = false;
      if(this.curPersonIndex > -1) {
        const _this = this;
        let crews = this.getCurCrews();
        crews.forEach((crew, index) => {
          if(crew.more && _this.curPersonIndex < index) next = true;
        })
      }
      return next
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

    // 获取某一届数据
    getPeriodData() {
      const _this = this;
      Ajax({
        url: '/static/mock/periods/period-' + this.period + '.json',
      }).then(data => {
        console.log(data)
        _this.options = data[_this.group];
        _this.options.snapshot = _this.options.snapshot.map(item =>{
          item = "/static/mock/glimpses/" + _this.group.toLowerCase() + "/" + item;
          return item
        })
      })
    }
  },
  mounted() {
  	if(this.$route.params.group) {
  		this.option = this.$route.params.option;
      this.group = this.$route.params.group;
      this.period = this.option.period;
      this.getPeriodData();
      let area = document.getElementsByClassName("ys-electronic-board")[0].getBoundingClientRect();
      let container2Dom = document.getElementsByClassName("container2")[0];
      container2Dom.style.paddingTop = (area.height*0.236/area.width*100).toFixed(1) + "%";
  	}else{
  		history.back();
  	}
  }
}
</script>