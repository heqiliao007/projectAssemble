<template>
  <div style="width: 100%;">
    <div class="netwoeksDails">
      <!-- <p class="title_header">
        <span style="margin-right: 3px;">票房分析</span>
        <i class="iconfont iconarrow-right-copy-copy"></i>
        <span>影投详情</span>
      </p>-->
      <template>
        <p>
          <span
            style="color: #353535; font-size: 30px; font-weight: 700;"
          >{{castInfo.shadowCast_name}}</span>
        </p>
        <p>
          <span class="tag">标签1</span>
        </p>
        <p>
          <span class="nameTitle">影投排名 :</span>
          <span style="color: #4a4a4a;">{{castInfo.rank_num}}</span>
        </p>
        <p>
          <span class="nameTitle">总票房 :</span>
          <span style="color: #4a4a4a;">{{castInfo.box_office | filterBoxOffice}}万</span>
        </p>
        <p>
          <span class="nameTitle">投资数量 :</span>
          <span style="color: #4a4a4a;">{{castInfo.movie_num}}部</span>
        </p>
      </template>

      <div style="margin: 40px 0px;">
        <span style="display: inline-block; font-size: 18px; color: #4C4C4C;">
          影片票房
          <i
            style="display: block; width: 45px; border-bottom: 3px solid #40A9FF; margin-top: 10px;"
          ></i>
        </span>
      </div>
      <el-row :gutter="20">
        <el-col
          :span="8"
          style="height: 280px; margin-bottom: 10px; overflow: hidden;"
          v-for="(item, index) in list"
          :key="index"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="showImg text_hover">
                <img :src="item.movie_image" alt style="width: 100%; height: 100%;" />
              </div>
            </el-col>
            <el-col :span="10" style="margin-left: 10px;">
              <span
                style="color: #0084CF; font-size: 16px;"
                @click="alink({id: item.movie_id})"
                class="text_hover"
              >{{item.movie_name}}</span>
              <span style="color:#4c4c4c">{{item.show_time | filterTime}}</span>
              <p style="margin-top: 25px;">影片票房：{{item.box_office}}</p>
              <p>
                导演:
                <span
                  style="paddingRight:5px"
                  v-for="c in item.directors"
                  :key="c.staff_id"
                >{{c.staff_name}}</span>
              </p>
              <p>
                主演:
                <span
                  style="paddingRight:5px"
                  v-for="c in item.protagonists"
                  :key="c.staff_id"
                >{{c.staff_name}}</span>
              </p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <template v-if="pagination.total/pagination.size > 1">
        <el-pagination
          style="text-align:right;paddingRight:40px"
          background
          @current-change="handleChangeCurrent"
          @prev-click="handleChangeCurrent"
          @next-click="handleChangeCurrent"
          layout="prev, pager, next"
          :total="pagination.total"
        ></el-pagination>
      </template>
    </div>
  </div>
</template>

<script>
// import HeadEr from '../recommend/home'
// import picture from "";
import echarts from "echarts";
export default {
  data() {
    return {
      headerCellStyle: {
        color: "#fff",
        backgroundColor: "#C1C1C1"
      },
      basicImg: "", // 默认图片
      list: [
        // {
        //   name: "期望",
        //   image: "",
        //   box: "7646248",
        //   dir: "张艺谋、陈翔",
        //   actor: "赵丽颖、冯绍峰"
        // },
        // {
        //   name: "期望",
        //   image: "",
        //   box: "7646248",
        //   dir: "张艺谋、陈翔",
        //   actor: "赵丽颖、冯绍峰"
        // },
        // {
        //   name: "期望",
        //   image: "",
        //   box: "7646248",
        //   dir: "张艺谋、陈翔",
        //   actor: "赵丽颖、冯绍峰"
        // },
        // {
        //   name: "期望",
        //   image: "",
        //   box: "7646248",
        //   dir: "张艺谋、陈翔",
        //   actor: "赵丽颖、冯绍峰"
        // },
        // {
        //   name: "期望",
        //   image: "",
        //   box: "7646248",
        //   dir: "张艺谋、陈翔",
        //   actor: "赵丽颖、冯绍峰"
        // },
        // {
        //   name: "期望",
        //   image: "",
        //   box: "7646248",
        //   dir: "张艺谋、陈翔",
        //   actor: "赵丽颖、冯绍峰"
        // }
      ],
      castInfo: {},
      pagination: {
        total: 0,
        current: 1,
        size: 9
      }
    };
  },
  props: ["shadowCastId"],
  filters: {
    filterBoxOffice(val) {
      if (val && val.length < 5) return val;
      return val / 1000;
    },
    filterTime(val) {
      return val.substring(0, 4);
    }
  },
  components: {
    // HeadEr
  },
  created() {
    this.getBaseInfo(166); //dev 用的
    this.getInvestmentWork(166);
    // this.getBasePic();
  },
  methods: {
    // 获取默认图片
    // getBasePic() {
    //   let _this = this;
    //   let label = "others";
    //   _this
    //     .$http({
    //       url: _this.$http.adornUrl("/web/sysdict/defaultPic?label=" + label),
    //       method: "POST",
    //       data: _this.$http.adornData({
    //         label: label
    //       })
    //     })
    //     .then(({ data }) => {
    //       console.log(data, "默认图=====================");
    //       this.basicImg = data.url;
    //     });
    // },
    // // 找不到图片的时候
    // nofind() {
    //   var img = event.srcElement;
    //   img.src = this.basicImg;
    //   img.onerror = null; // 控制不要一直跳动
    // },
    async getBaseInfo(shadowCastId) {
      const { data } = await this.$http({
        url: this.$http.adornUrl(
          "/web/shadowcastdetailpage/getBasicStatistics?shadowCastId=" +
            shadowCastId
        ),
        method: "POST"
      });
      if (data.code === 0 && data.msg === "success") {
        this.castInfo = Object.assign({}, data.data);
      }
    },
    async getInvestmentWork(shadowCastId) {
      const { data } = await this.$http({
        url: this.$http.adornUrl(
          "/web/shadowcastdetailpage/getInvestmentWork?shadowCastId=" +
            shadowCastId +
            "&current=" +
            this.pagination.current
        ),
        method: "GET"
      });
      if (data.code === 0 && data.msg === "success") {
        console.log(data);
        this.pagination.total = Number(data.page.total);
        this.list = data.page.records;
      }
    },
    handleChangeCurrent(val) {
      this.pagination.current = val;
      this.getInvestmentWork(this.shadowCastId);
    }
  }
};
</script>

<style lang='scss'>
.tag {
  display: inline-block;
  height: 20px;
  background-color: #399bff;
  color: #fff;
  padding: 3px;
}
.nameTitle {
  color: #a3a3a3;
  display: inline-block;
  min-width: 80px;
  text-align: center;
  text-align-last: justify;
  text-align: justify;
  text-justify: distribute-all-lines; // 这行必加，兼容ie浏览器
}
.netwoeksDails {
  width: 95%;
  height: auto;
  margin: 10px auto;
  box-sizing: border-box;
  padding: 10px 5px;
  // .title_header {
  //   border-left: 2px solid #40a9ff;
  //   box-sizing: border-box;
  //   padding-left: 10px;
  //   font-size: 12px;
  // }
  .infoleft {
    position: relative;
    height: 266px;
    box-sizing: border-box;
    padding-left: 25px;
    padding-top: 20px;
    padding-bottom: 5px;
    .info-pic {
      position: absolute;
      left: 0;
      top: 0;
      width: 196px;
      height: 266px;
      background-color: #d3d3d3;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
}
</style>
