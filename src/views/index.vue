<template>
  <div class="page clearfix">
    <!-- <div class="header">玉树四大领导班子</div> -->
    <div class="container">
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
          <div class="main_duty">
            <label class="main_duty_label">工作内容</label>
            <div class="el-form-item__content" style="margin-left: 80px;">
              <el-link @click="showDetails(options.ZW.main_duties)">查看详情</el-link>
            </div>
          </div>
          <div class="snapshot">
            <label class="glimpse">工作掠影</label>
            <el-carousel :autoplay="false" height="200px" direction="vertical">
              <el-carousel-item v-for="(item, index) in glimpses" :key="index">
                <div class="glimpse-box">
                  <img :src="item.url"/>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <!-- <div class="main_duties" v-html="options.ZW.main_duties"></div> -->
        </div>
      </div>
      <div class="part rd">
        <div class="content">
          <div class="title">中共玉树州第九届人大领导</div>
          <div class="crews">
            <div class="member clearfix" v-for="(item, index) in options.RD.crews" :key="index">
              <span class="station">{{item.station}}</span>
              <span class="name">{{item.name}}</span>
              <span class="tenure">{{item.tenure}}</span>
            </div>
          </div>
          <div class="main_duty">
            <label class="main_duty_label">工作内容</label>
            <div class="el-form-item__content" style="margin-left: 80px;">
              <el-link @click="showDetails(options.RD.main_duties)">查看详情</el-link>
            </div>
          </div>
          <div class="snapshot">
            <label class="glimpse">工作掠影</label>
            <el-carousel :autoplay="false" height="200px" direction="vertical">
              <el-carousel-item v-for="(item, index) in glimpses" :key="index">
                <div class="glimpse-box">
                  <img :src="item.url"/>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <!-- <div class="main_duties" v-html="options.RD.main_duties"></div> -->
        </div>
      </div>
      <div class="part zf">
        <div class="content">
          <div class="title">中共玉树州第九届政府领导</div>
          <div class="crews">
            <div class="member clearfix" v-for="(item, index)  in options.ZF.crews" :key="index">
              <span class="station">{{item.station}}</span>
              <span class="name">{{item.name}}</span>
              <span class="tenure">{{item.tenure}}</span>
            </div>
          </div>
          <div class="main_duty">
            <label class="main_duty_label">工作内容</label>
            <div class="el-form-item__content" style="margin-left: 80px;">
              <el-link @click="showDetails(options.ZF.main_duties)">查看详情</el-link>
            </div>
          </div>
          <div class="snapshot">
            <label class="glimpse">工作掠影</label>
            <el-carousel :autoplay="false" height="200px" direction="vertical">
              <el-carousel-item v-for="(item, index) in glimpses" :key="index">
                <div class="glimpse-box">
                  <img :src="item.url"/>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <!-- <div class="main_duties" v-html="options.ZF.main_duties"></div> -->
        </div>
      </div>
      <div class="part zx">
        <div class="content clearfix">
          <div class="title">中共玉树州第九届政协领导</div>
          <div class="crews">
            <div class="member" v-for="(item, index)  in options.ZX.crews" :key="index">
              <span class="station">{{item.station}}</span>
              <span class="name">{{item.name}}</span>
              <span class="tenure">{{item.tenure}}</span>
            </div>
          </div>
          <div class="main_duty">
            <label class="main_duty_label">工作内容</label>
            <div class="el-form-item__content" style="margin-left: 80px;">
              <el-link @click="showDetails(options.ZX.main_duties)">查看详情</el-link>
            </div>
          </div>
          <div class="snapshot">
            <label class="glimpse">工作掠影</label>
            <el-carousel :autoplay="false" height="200px" direction="vertical">
              <el-carousel-item v-for="(item, index) in glimpses" :key="index">
                <div class="glimpse-box">
                  <img :src="item.url"/>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <!-- <div class="main_duties" v-html="options.ZX.main_duties"></div> -->
        </div>
      </div>
    </div>
    <el-dialog
      title="工作内容"
      :visible.sync="dialogVisible"
      width="50%"
      center>
      <div class="main_duties" v-html="main_duties"></div>
    </el-dialog>
    
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
      },
      glimpses: [
        {url: "/static/mock/glimpses/zw-01-001.JPG", name: "第一届001"},
        {url: "/static/mock/glimpses/zw-01-002.JPG", name: "第一届002"},
        {url: "/static/mock/glimpses/zw-01-003.JPG", name: "第一届003"}
      ],
      dialogVisible: false,
      main_duties: ''
    }
  },
  methods: {
    showDetails(text) {
      this.dialogVisible = true;
      this.main_duties = text;
    }
  },
  mounted() {
    const _this = this;
    Ajax({
      url: '../../static/mock/periods/period-9.json',
    }).then(data => {
      _this.options = data
      console.log(data)
    })
  }
}
</script>