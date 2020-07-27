<template>
  <div class="page clearfix">
    <!-- <div class="header">玉树四大领导班子</div> -->
    <div class="container">
      <div class="part" v-for="option in options" :key="option.groups">
        <div class="content">
<!--           <div class="title">中共玉树州第九届州委领导</div> -->
          <div class="crews">
            <div class="member clearfix" v-for="(item, index) in option.crews" :key="index">
              <span class="station">{{item.station}}</span>
              <span class="name">{{item.name}}</span>
              <span class="tenure">{{item.tenure}}</span>
            </div>
          </div>
          <div class="main_duty">
            <label class="main_duty_label">工作内容</label>
            <div class="el-form-item__content" style="margin-left: 80px;height:40px;">
              <el-popover
                v-if="option.main_duties == '...'"
                placement="right"
                title="工作内容"
                width="200"
                trigger="click"
                content="数据搜集中，暂无数据">
                <el-link slot="reference">查看详情</el-link>
              </el-popover>
              <el-link @click="showDetails(option.main_duties)" v-else>查看详情</el-link>
            </div>
          </div>
          <div class="snapshot">
            <label class="glimpse_label">工作掠影</label>
            <el-carousel :autoplay="false" height="200px">
              <el-carousel-item v-for="(item, index) in glimpses" :key="index">
                <div class="glimpse-box">
                  <img :src="item.url"/>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
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
      options: [],
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
      if(text == "...") {
        this.$confirm('数据搜集中，暂无数据', '工作内容', {
          confirmButtonText: '知道了',
          type: 'warning',
          center: true
        })
      }else {
        this.dialogVisible = true;
        text = "<div class='section'>" + text + "</div>"
        text = text.replace(/\n/g, "\n</div><div class='section'>");
        this.main_duties = text;
      }
    }
  },
  mounted() {
    const _this = this;
    Ajax({
      url: '../../static/mock/periods/period-9.json',
    }).then(data => {
      _this.options = [];
      for(let key in data) {
        data[key]["groups"] = key;
        _this.options.push(data[key])
      }
    })
  }
}
</script>