<template>
<div class="period">
  <!-- Next period -->
  <el-button 
    class="next-button" 
    icon="el-icon-arrow-right"
    v-if="period < 14" 
    @click="nextPeriod"
    >下一届</el-button>
  <!-- Previous period -->
  <el-button 
    class="previous-button" 
    icon="el-icon-arrow-left" 
    v-if="period > 1" 
    @click="previousPeriod"
    >上一届</el-button>
  <div class="page clearfix">
    <div class="container">
      <div class="part" v-for="option in options" :key="option.group">
        <div class="content">
          <div class="title">{{getTitle(option)}}</div>
            <template v-if="!(option.group == 'RD' && period < 6)">
              <div class="crews">
                <div class="member clearfix" v-for="(item, index) in option.crews" :key="index" @click="showProfile(item, index, option.group)">
                  <span class="station">{{item.station}}</span>
                  <span class="name">{{item.name}}</span>
                  <span class="tenure">{{item.tenure}}</span>
                </div>
              </div>
              <div class="main_duty" v-if="option.main_duties">
                <label class="main_duty_label">工作内容</label>
                <div class="el-form-item__content" style="margin-left: 80px;height:40px;">
                  <el-link @click="showDetails(option.main_duties)">查看详情</el-link>
                </div>
              </div>
              <div class="snapshot">
                <label class="glimpse_label">工作掠影</label>
                <el-carousel :autoplay="false" height="200px" v-if="option.snapshot.length">
                  <el-carousel-item v-for="(item, index) in option.snapshot" :key="index">
                    <div class="glimpse-box">
                      <img :src="item"/>
                    </div>
                  </el-carousel-item>
                </el-carousel>
                <div  class="glimpses-empty" v-else>
                  <img src="../assets/images/empty.png">
                  <div>暂无数据</div>
                </div>
              </div>
            </template>
            <template v-else>
              <div>
                特别说明：玉树州六届人大一次会议以前，均未设立常设机构，闭会期间，其职能由州人民委员会行使，1981年5月自治州第六届人民代表大会第一次会议选举产生了它的常设机关---州人民代表大会常务委员会。
              </div>
            </template>
        </div>
      </div>
    </div>
    <el-dialog
      title="工作内容"
      :visible.sync="main_duty_visible"
      width="50%"
      center
      append-to-body>
      <div class="main_duties" v-html="main_duties"></div>
    </el-dialog>
    <el-dialog
      :title="profileTile"
      :visible.sync="profile_visible"
      width="50%"
      center
      append-to-body>
      <div class="profile">
        <div class="profile_photo left">
          <img :src="profile.photo" v-if="profile.photo">
          <img src="../assets/images/touxiang.jpg" v-else>
        </div>
        <div class="profile_content" v-html="profile.profile"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="prePerson" v-if="hasPre">上一位</el-button>
        <el-button type="primary" v-if="hasNext" @click="nextPerson">下一位</el-button>
      </span>
    </el-dialog>
  </div>
</div>
</template>
<script>
import Ajax from "@utils/request.js"

export default {
  data () {
    return {
      options: [],
      glimpses: [],
      main_duty_visible: false,
      main_duties: '',
      profileTile: '',
      profile_visible: false,
      profile: '',
      period: 1,
      china: ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三', '十四'],
      curPersonIndex: -1,
      curGroup: null,
      hasPre: false,
      hasNext: false
    }
  },
  computed:{

  },
  methods: {
    // 获取标题
    getTitle(option) {
      let title = '';
      switch(option.group) {
        case 'ZW':
          title = "中共玉树州第" + this.china[this.period - 1] + "届州委会领导";
          break;
        case 'RD':
          title = "中共玉树州第" + this.china[this.period - 1] + "届人大领导";
          break;
        case 'ZF':
          title = "中共玉树州第" + this.china[this.period - 1] + "届政府领导";
          break;
        case 'ZX':
          title = "中共玉树州第" + this.china[this.period - 1] + "届政协领导";
          break;
      }
      return title
    },
    // 个人简介
    showProfile(item, index, group) {
      this.curPersonIndex = index;
      this.curGroup = group;
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
          message: '数据搜集中，暂无数据',
          type: 'warning',
          duration: '1000'
        });
      }
    },
    // 工作内容
    showDetails(text) {
      if(text == "...") {
        this.$confirm('数据搜集中，暂无数据', '工作内容', {
          confirmButtonText: '知道了',
          type: 'warning',
          center: true
        })
      }else {
        this.main_duty_visible = true;
        text = "<div class='section'>" + text + "</div>"
        text = text.replace(/\n/g, "\n</div><div class='section'>");
        this.main_duties = text;
      }
    },
    // 下一届
    nextPeriod() {
      this.period++;
      this.getPeriodData();
    },
    // 上一届
    previousPeriod() {
      this.period--;
      this.getPeriodData();
    },
    // 获取某一届数据
    getPeriodData() {
      const _this = this;
      Ajax({
        url: '/static/mock/periods/period-' + this.period + '.json',
      }).then(data => {
        console.log(data)
        _this.options = [];
        for(let key in data) {
          data[key]["group"] = key;
          data[key].snapshot = data[key].snapshot.map(item =>{
            item = "/static/mock/glimpses/" + key.toLowerCase() + "/" + item;
            return item
          })
          _this.options.push(data[key])
        }
      })
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
      return this.options.filter(option => {
        return option.group === this.curGroup
      })[0].crews;
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
        this.profile.profile = '数据搜集中，暂无数据'
      }
    }
  },
  mounted() {
    this.getPeriodData();
  }
}
</script>