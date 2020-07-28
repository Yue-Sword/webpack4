<template>
  <div class="page clearfix">
    <div class="container">
<!--       <div class="class0">
        <div class="class1 left">
          <img src="../assets/images/touxiang.jpg" alt="#" style="display: block;max-height:150px;max-width: 150px;">
        </div>
        <div class="class2">
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
    </div> -->
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
<!--             <el-carousel :autoplay="false" height="200px" v-if="option.snapshot.length">
              <el-carousel-item v-for="(item, index) in option.snapshot" :key="index">
                <div class="glimpse-box">
                  <img :src="item"/>
                </div>
              </el-carousel-item> -->
            </el-carousel>
            <div>
              <img src="../assets/images/empty.png">
            </div>
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
        // {url: "/static/mock/glimpses/zw-01-001.JPG", name: "第一届001"},
        // {url: "/static/mock/glimpses/zw-01-002.JPG", name: "第一届002"},
        // {url: "/static/mock/glimpses/zw-01-003.JPG", name: "第一届003"}
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
        data[key].snapshot = data[key].snapshot.map(item =>{
          console.log(item)
          item = "/static/mock/glimpses/" + key.toLowerCase() + "/" + item;
          return item
        })
        _this.options.push(data[key])
      }
    })
  }
}
</script>
<style>
.class0 {
  margin: 10px 17px;
}
.class1 {
  margin: 10px 20px 0;
}
.class2 div {
  text-indent: 2em;
  text-align: justify;
}
</style>