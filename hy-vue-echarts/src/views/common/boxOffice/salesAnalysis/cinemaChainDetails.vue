<template>
  <div>
     <div style="height:1px;">
      <headEr></headEr>
    </div>
    <el-row style="margin: 20px 0 ; padding:0 20px;">
      <ul style="list-style:none;">
        <li class="breadcrumb-item">您当前位置:</li>
        <li class="breadcrumb-item">票房分析<span>></span></li>
        <li class="breadcrumb-item">影片<span>></span></li>
        <li class="breadcrumb-item breadcrumb-item-active">无名之辈</li>
      </ul>
    </el-row>
    <el-row style="margin:0px; padding:0 20px;">
      <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7" style="padding:0;">
        <el-card class="grid-content">
          <!-- <div>
            <img class="video-pictrue" src="../video/img/video.png">
          </div> -->
          <div class="video-info">
            <h3 class="video-title">中影数字院线</h3>
            <h6 style="font-weight: 500; font-size: 12px; color: #999;">Zhongying Digital Courtyard Line</h6>
            <!-- <span class="addicon"><img src="../img/icon_tianjia.png">对比</span> -->
            <ul class="video-info-list">
              <li><span>公司类型：</span><span>发行公司/影院投资管理公司/院线公司/制作公司</span></li>
              <li><span>下属影院（运营中）：</span><span>886</span></li>
              <li><span>发行影片：</span><span>140</span></li>
              <li><span>座位数：</span><span>120,500</span></li>
              <li><span>银幕数：</span><span>5,450</span></li>
              <li><span>地址：</span><span>北京市西城区北展北街15号华远企业号E座2层</span></li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="17" :sm="17" :md="17" :lg="17" :xl="17" style="padding-left: 15px; padding-right: 0px;">
        <div class="grid-content">
          <div class="info-operate" style="padding-top: 20px;padding-right:20px;">
            <!-- <span><img src="../../video/img/icon_zhuanfa.png">转发</span> -->
            <!-- <span><img src="../../video/img/icon_shoucang.png">收藏</span> -->
          </div>
          <el-row style="border-bottom:1px solid #DEDEDE; height:100px; padding:15px 0;">
            <el-col :span="12" style="border-right:1px solid #DEDEDE;">
              <div class="num-center">2,450.90万</div>
              <div class="txt-center">今日实时票房</div>
            </el-col>
            <el-col :span="12">
              <div class="num-center">320,000万</div>
              <div class="txt-center">今日实时人次</div>
            </el-col>
          </el-row>
          <el-row style="height:100px; padding:20px 0;">
            <el-col :span="12" style="border-right:1px solid #DEDEDE;">
              <div class="num-center">5</div>
              <div class="txt-center">排名</div>
            </el-col>
            <el-col :span="12">
              <div class="num-center">2</div>
              <div class="txt-center">城市人次</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin:20px ; ">
      <el-card >
        <el-tabs v-model="activeName" @tab-click="handleClick" style=" margin:0 20px">
              <el-tab-pane label="票房" name="first">
                <p>
                  <el-button type='primary'>时段</el-button>
                  <el-button type='primary'>影片</el-button>
                </p>
                <el-row style="margin-top: 10px;">
                  <el-col>
                    <div class="block">
                      <span class="demonstration">日期:</span>
                      <el-date-picker
                        v-model="value6"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                      <span class="demonstration">地区:</span>
                      <el-select v-model="value" placeholder="中国">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <span style="color: #3295D9">✔</span>
                      <span class="demonstration">服务费</span>
                    </div>
                    <el-button type='primary' style="float: right; margin-top: -40px;">查询</el-button>
                  </el-col>
                  <el-col>
                    <div class="block">

                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="排片" name="third">
                <el-row>
                  <el-col>
                    <div class="block">
                      <span class="demonstration">默认</span>
                      <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
      </el-card>
    </el-row>
    <el-row class="row-m20-p20">
      <el-col :span="24" style="background: #ffffff;padding: 0 0 10px;border-left: 10px solid #F5F5F5;">
        <div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
          <p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">中影数字院线时段分析
            <span>2018年11月23日-2018年11月30日</span>
            <span style="font-size: 14px;color: #333333;">已选择服务费</span>
            <el-button style="border-radius: 20px;">票房占比</el-button>
            <el-select v-model="value2" placeholder="当前票房">
              <el-option
                v-for="item in option2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </p>
          <p style="font-size: 24px;color: #333333;float: right;margin: 0 0 0 22px;line-height: 72px;">
            <span><img src="../img/icon_xianxing.png"></span>
            <span><img src="../img/icon_zhuzhuang.png"></span>
            <span><img src="../img/icon_xiazai.png"></span>
          </p>
        </div>
        <div id="watchTime" style="height: 430px"></div>
      </el-col>
    </el-row>
    <el-row class="row-m20-p20">
      <el-col :span="24" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
        <div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
          <p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">中影数字院线时段分析
            <span style="color:#666666; font-size: 10px">2018-11-23 </span>
          </p>
          <p style="font-size: 14px;color: #333333;float: right;margin: 0 0 0 22px;line-height: 72px;">更多指标+
            <span><img src="../img/icon_xiazai.png"></span>
          </p>
        </div>
        <div style="height: 250px; margin-left: 22px;">
          <el-table
              :data="todayPlayData"
              show-header
              stripe
              style="width: 100%; font-size:18px"
              row-class-name="table-row"
              :header-cell-style = 'headercellStyle'
              header-row-class-name="table-header"
            >
            <el-table-column width="130px" prop="name" label="日期"></el-table-column>
            <el-table-column prop="total" label="票房（万）"></el-table-column>
            <el-table-column prop="total" label="票房占比"></el-table-column>
            <el-table-column prop="name" label="人次"></el-table-column>
            <el-table-column prop="total" label="人次占比"></el-table-column>
            <el-table-column prop="percent" label="排座"></el-table-column>
            <el-table-column prop="name" label="排座占比"></el-table-column>
            <el-table-column prop="total" label="服务费（万）"></el-table-column>
            <el-table-column prop="percent" label="平均票价（元）"></el-table-column>
            <el-table-column prop="name" label="场均人次"></el-table-column>
          </el-table>
          <el-pagination
              style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
              background
              layout="prev, pager, next"
              :total="1000"
            />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import headEr from '../../recommend/home'
  // import header from '../head/head-er'
  // import boxOffice from '../../'
  export default {
    data() {
      return {
        headercellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
        activeName: 'first',
        value6: '',
        option2: [{
          value: '1',
          label: '当前票房'
        }, {
          value: '2',
          label: '上周票房'
        }],
        value2: '',
        options: [{
          value: '1',
          label: '中国'
        }, {
          value: '2',
          label: '日本'
        }, {
          value: '3',
          label: '韩国'
        }],
        value: '',
        todayPlayData: [
          {name: '腾讯', total: '118.6万', percent: '72.60%'},
          {name: '优酷', total: '28.4万', percent: '27.40%'},
          {name: '腾讯', total: '118.6万', percent: '72.60%'},
          {name: '优酷', total: '28.4万', percent: '27.40%'},
          {name: '腾讯', total: '118.6万', percent: '72.60%'},
          {name: '优酷', total: '28.4万', percent: '27.40%'},
          {name: '腾讯', total: '118.6万', percent: '72.60%'},
          {name: '优酷', total: '28.4万', percent: '27.40%'},
          {name: '腾讯', total: '118.6万', percent: '72.60%'},
          {name: '优酷', total: '28.4万', percent: '27.40%'}
        ],
        // playTrendChart: null, // 播放趋势
        watchTimeChart: null, // 观看时间
      }
    },
    created () {

    },
    mounted() {
      // this.initplayTrendChart() // 绘制播放趋势图表
      this.initwatchTimeChart() // 绘制观看时间图表
    },
    methods: {
      handleClick (e) {
        console.log(e)
      },
        // 观看时间
      initwatchTimeChart () {
         var watchTimeChartOption = {
             'tooltip': {
               'trigger': 'axis',
               // 'formatter': '{c0}W'
             },
             xAxis: {
                 type: 'category',
               boundaryGap: false,
                 data: ['2018-12-10', '2018-12-10', '2018-12-10', '2018-12-10', '2018-12-10', '2018-12-10', '2018-12-10', '2018-12-10', '2018-12-10', '2018-12-10', '2018-12-10']
             },
             yAxis: {
               type: 'value',
               name:'',
               min: 0,
               max: 30000,
               interval: 10000,
               show: true,
               splitLine: {
                 show: true,
               },
               axisLine:{
                 lineStyle:{
                   width:0
                 }
               }
             },
             legend: {
                 right:30,
                 top:10,
                 show: true
             },
             series: [{
                 name:'场次占比',
               symbol: 'none',
               itemStyle : {
                 normal : {
                   color:'#3295D9'
                 }
               },
                 data: [10111, 21110, 21113, 21113, 22225, 22217, 12228, 12223, 22221, 12223, 22223],
                 type: 'line'
             }]
         };
         this.watchTimeChart = echarts.init(document.getElementById('watchTime'))
         this.watchTimeChart.setOption(watchTimeChartOption)
         window.addEventListener('resize', () => {
             this.watchTimeChart.resize()
         })
      }
    },
    components: {
      headEr
      // boxOffice
    }
  }
</script>

<style>
  @import '../css/box-office';
  @import '../css/shape.css';
  @import '../css/legend.css';
  @import '../css/color.css';
  .breadcrumb-item{
    font-size:16px;
    font-weight:400;
    display: inline;
    /* margin-right: 27px; */
    color: #999999;
  }
  .breadcrumb-item-active{
    color: #3295D9;
  }
  *{
    margin:0;
    padding:0;
  }
    body{
      background:#f5f5f5;
    }
    .addicon {
      position: absolute;
      right: -325px;
      top: 13px;
    }
    .el-breadcrumb {
      font-size: 14px;
      line-height: 60px;
      height: 60px;
      padding-left: 20px;
    }

    .grid-content{
        background:#fff;
        /* padding:22px; */
        min-height:280px;
    }

    .video-pictrue{
        float:left;
        width:190px;
        height:260px;
        padding-bottom:1.5rem;
    }

    .video-pictrue img{

    }

    .video-info{
      position: relative;
      float:left;
      margin-left:33px;
    }

    .video-info-list{
      float:left;
      list-style:none;
      padding:0;
      margin:0;
    }

    .video-info-list li{
      line-height:28px;
    }

    .video-info-list li span:first-child{
      color:#999
    }

    .video-info-list li span:last-child{
      color:#333
    }

    .video-title{
      line-height:60px;
      font-size:24px;

    }

    .num-center{
      text-align:center;
      line-height:40px;
      font-size:30px;
      color:#3295D9
    }

    .txt-center{
      text-align:center;
      line-height:30px;
      font-size:18px;
      color:#333
    }

    .info-operate{
      text-align:right;
      height:60px;
    }

    .info-operate span{
      margin-left:30px;
    }

    .info-operate span img{
      margin-right:10px;
    }

    .el-tabs{
      background:#fff;
    }

    .video-detail{
      padding-left:15px;

    }
    .video-detail-list{
      height:50px;
      line-height:50px;
      border-bottom:1px solid #DEDEDE;
      list-style:none;
    }

    .video-detail-list span:first-child{
      color:#333;
      float: left;
      min-width: 140px;
    }

    .video-detail-list span:last-child{
      color:#666
    }

    a {
      cursor:pointer;
    }
    .title-l{
    float: left;
  }
  .bigbox {
    width: 80%;
    height: 28px;
    margin: 0 auto;
    margin-top: 100px;
    background-color: #3295D9;
    border-radius: 28px;
    display: flex;
  }
  .pc {
    height: 100%;
    background-color: #BF4C5B;
    border-radius: 28px;
  }
  .mobile {
    height: 100%;
  }
  .title {
    width: 80%;
    height: 28px;
    margin: 0 auto;
    margin-top: 10px;
    display: flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .leftIcon {
    display: inline-block;
    height: 5px;
    width: 20px;
    margin-bottom: 5px;
    background-color: #BF4C5B
  }
  .rightIcon {
    display: inline-block;
    height: 5px;
    width: 20px;
    margin-bottom: 5px;
    background-color: #3295D9;
  }
</style>
