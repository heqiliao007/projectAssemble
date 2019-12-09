<template>
  <div style="background: #F5F5F5">
    <el-header style="height:150px;padding-left: 0;">
      <headEr></headEr>
    </el-header>
    <el-row style="margin: 20px 0 ; padding:0 20px;">
      <ul style="list-style:none;">
        <li class="breadcrumb-item">您当前位置:</li>
        <li class="breadcrumb-item">票房分析<span>></span></li>
        <li class="breadcrumb-item">影院<span>></span></li>
        <li class="breadcrumb-item breadcrumb-item-active">对比详情</li>
      </ul>
    </el-row>
    <el-row class="row-m20-p20">
      <el-col :span="24" style="background: #ffffff;min-height: 116px;position: relative">
        <ul style="list-style: none;line-height: 58px;font-size:18px;font-weight: bold;padding-left: 32px;">
          <li>*金逸北京大悦城店</li>
          <li>*首都电影院昌平店</li>
        </ul>
        <span class="add"><i class="el-icon-plus"></i>添加对比影院</span>
      </el-col>
    </el-row>
    <el-row class="row-m20-p20">
      <el-col :span="24" style="background: #ffffff">
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户管理" name="first" style="padding-left: 56px;">
            <span v-for="(item,index) in text_bott" :key="item.value">
                <div class="text_bott" @click="text_botts(item,index)" :class="{text_bott_bg:item.show == true}">{{item.name}}</div>
            </span>
            <div style="margin-top: 22px;margin-bottom: 12px;">
              日期：
              <el-date-picker
                v-model="value6"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期" style="margin-right: 30px;">
              </el-date-picker>
              <el-checkbox v-model="checked">服务费</el-checkbox>
            </div>
          </el-tab-pane>
          <el-tab-pane label="配置管理" name="second" style="padding-left: 56px;">
            <span v-for="(item,index) in text_bott" :key="item.value">
                <div class="text_bott" @click="text_botts(item,index)" :class="{text_bott_bg:item.show == true}">{{item.name}}</div>
            </span>
            <div style="margin-top: 22px;margin-bottom: 12px;">
              日期：
              <el-date-picker
                v-model="value6"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期" style="margin-right: 30px;">
              </el-date-picker>
              <el-checkbox v-model="checked">服务费</el-checkbox>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-row class="row-m20-p20">
      <el-col :span="24" style="background: #ffffff">
        <div class="top">
          <p style="display: inline-block;">金逸北京大悦城店VS首都电影昌平店</p>
          <el-select v-model="value" placeholder="请选择" size="mini" style="margin-right: 48px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          日期：
          <el-select v-model="datavalue" placeholder="请选择" size="mini" class="selecttime">
            <el-option
              v-for="item in datas"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>
            <img src="../img/icon_xianxing.png" alt="">
            <img src="../img/icon_zhuzhuang.png" alt="">
            <img src="../img/icon_xiazai.png" alt="">
          </span>
        </div>
        <div id="vsbox" style="height: 532px;"></div>
      </el-col>
    </el-row>
    <el-row class="row-m20-p20">
      <el-tabs v-model="moviename" class="movies">
        <el-tab-pane label="金逸北京大悦城店" name="dayue">
          <div style="background: #ffffff;overflow:hidden;">
            <div class="clearfix">
              <span style="float: left;font-size:23px">金逸北京大悦城店</span>
              <div>
                <el-button type="text" class="card-extra" style="font-size:18px;color:rgba(50,149,217,1);">更多指标+</el-button>
                <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button>
              </div>
            </div>
            <el-table :data="firstTableData" stripe style="width: 100%">
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
              <el-table-column prop="name" label="票房（万）" width="180"></el-table-column>
              <el-table-column prop="address" label="票房占比"></el-table-column>
              <el-table-column prop="address" label="人次"></el-table-column>
              <el-table-column prop="address" label="人次占比"></el-table-column>
              <el-table-column prop="address" label="人次占比"></el-table-column>
              <el-table-column prop="address" label="排座"></el-table-column>
              <el-table-column prop="address" label="排座占比"></el-table-column>
              <el-table-column prop="address" label="服务费（万）"></el-table-column>
              <el-table-column prop="address" label="平均票价（元）"></el-table-column>
              <el-table-column prop="address" label="场均人次"></el-table-column>
            </el-table>
            <el-pagination
              style="float: right; padding: 3px 0;margin:67px 52px 40px 0"
              background
              layout="prev, pager, next"
              :total="1000"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="首都电影昌平店" name="pinchan ">
          <div style="background: #ffffff;overflow:hidden;">
            <div class="clearfix">
              <span style="float: left;font-size:23px">首都电影昌平店</span>
              <div>
                <el-button type="text" class="card-extra" style="font-size:18px;color:rgba(50,149,217,1);">更多指标+</el-button>
                <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button>
              </div>
            </div>
            <el-table :data="firstTableData" stripe style="width: 100%">
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
              <el-table-column prop="name" label="票房（万）" width="180"></el-table-column>
              <el-table-column prop="address" label="票房占比"></el-table-column>
              <el-table-column prop="address" label="人次"></el-table-column>
              <el-table-column prop="address" label="人次占比"></el-table-column>
              <el-table-column prop="address" label="人次占比"></el-table-column>
              <el-table-column prop="address" label="排座"></el-table-column>
              <el-table-column prop="address" label="排座占比"></el-table-column>
              <el-table-column prop="address" label="服务费（万）"></el-table-column>
              <el-table-column prop="address" label="平均票价（元）"></el-table-column>
              <el-table-column prop="address" label="场均人次"></el-table-column>
            </el-table>
            <el-pagination
              style="float: right; padding: 3px 0;margin:67px 52px 40px 0"
              background
              layout="prev, pager, next"
              :total="1000"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import headEr from '../../head/head-er'
import echarts from 'echarts'
export default {
    name: "contrastDetails",
  components: {
    headEr
  },
  data(){
      return{
        moviename:'dayue',
        value:'',
        datavalue:'',
        activeName:'first',
        checked:false,
        value6:'',
        text_bott: [
          { name: '时段', show: true },
          { name: '影片', show: false }
        ],
        options: [{
          value: '选项1',
          label: '票房'
        }, {
          value: '选项2',
          label: '影片'
        }],
        datas: [{
          value: '选项1',
          label: '按上映天数第一天-第十天'
        }, {
          value: '选项2',
          label: '按上映天数第十天-第二十天'
        }],
        firstTableData:[{
          date:'2018-11-15',
          name:'3200',
          address:'2,300'
        },{
          date:'2018-11-15',
          name:'3200',
          address:'2,300'
        },{
          date:'2018-11-15',
          name:'3200',
          address:'2,300'
        },{
          date:'2018-11-15',
          name:'3200',
          address:'2,300'
        },{
          date:'2018-11-15',
          name:'3200',
          address:'2,300'
        },{
          date:'2018-11-15',
          name:'3200',
          address:'2,300'
        },{
          date:'2018-11-15',
          name:'3200',
          address:'2,300'
        }
        ]
      }
  },
  created: function () {

  },
  mounted: function () {
    this.initMarketLine()
  },
  methods: {
    text_botts: function (item, index) {
      this.text_bott.forEach(a => {
        a.show = false
      })
      item.show = !item.show
    },
    initMarketLine () {
      var option = {
        'tooltip': {
          'trigger': 'axis',
          'formatter': '{c0}w'
        },
        'legend': {
          'bottom': '2%',
          'right': '4%',
          icon: "rect",
          itemWidth: 14,
          itemHeight: 4,
          'data': ['总量']
        },
        'grid': {
          'left': '3%',
          'right': '4%',
          'bottom': '10%',
          'containLabel': true
        },
        'toolbox': {
          'feature': {
          }
        },
        'xAxis': {
          'type': 'category',
          'boundaryGap': false,
          'data': ['2018-12-10', '2018-12-11', '2018-12-12', '2018-12-13', '2018-12-14', '2018-12-15', '2018-12-16', '2018-12-17', '2018-12-18', '2018-12-19', '2018-12-20']
        },
        'yAxis': {
          'name': '票房单位（万）',
          'type': 'value',
          axisLabel: {
            show: true,
            interval: 'auto'
          },
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
        'series': [
          {
            'type': 'line',
            'name': '总量',
            'symbol': 'none',
            'itemStyle' : {
              'normal' : {
                'color':'#3295D9'
              }
            },
            'data': [1000, 2000, 1500, 1400, 2000, 2100, 1800, 1900, 1200, 2300, 1600]
          }
        ]
      }
      this.chartLine = echarts.init(document.getElementById('vsbox'))
      this.chartLine.setOption(option)
      window.addEventListener('resize', () => {
        this.chartLine.resize()
      })
    },
  }
}
</script>

<style scoped>
  .clearfix{
    background: #ffffff;
    height:72px;
    line-height: 72px;
    padding-left: 30px;
  }
  .clearfix>div{
    float: right;
  }
  .card-extra{
    padding:3px 0;
    color:#666666;
    font-size:24px;
    margin-right:33px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .top{
    height: 72px;
    line-height: 72px;
    padding-left: 20px;
    border-bottom: 1px solid #DEDEDE;
  }
  .top>p{
    font-size:24px;
    margin: 0 80px 0 0;
  }
  .top .selecttime{
    width: 280px;
  }
  .top span{
    float: right;
  }
  .top span img{
    width: 25px;
    margin-right: 32px;
  }
  .text_bott{
    cursor: pointer;
    display: inline-block;
    width: 55px;
    height: 27px;
    border-radius: 2px;
    line-height: 27px;
    text-align: center;
    color: #333333;
    margin: 10px 12px 10px 0;
  }
  .text_bott_bg{
    background: #3295d9;
    color: #ffffff;
  }
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
  .row-m20-p20{
    padding: 0 40px 20px;
  }
  .add{
    display: block;
    width:160px;
    height:40px;
    background:rgba(222,222,222,1);
    position: absolute;
    top: 38px;
    right: 72px;
    font-size:16px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
  }
  .add i{
    margin-right: 13px;
  }
</style>
<style>
  .el-tabs__nav-wrap{
    padding-left: 20px;
  }
  .top .selecttime .el-input{
    width: 100%;
  }
  .movies .el-tabs__nav-wrap::after{
    background: none;
  }
</style>
