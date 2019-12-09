<template>
  <div>
    <!-- 图表 -->
    <el-row class="row-m20-p20" >
      <el-col :span="12">
        <el-card>
          <div slot="header" style="margin:0 14px;">
            <span style="font-size:23px">票房基础数据动态</span>
            <el-button class="card-extra" type="text" icon="el-icon-hysj-zhuanfa"></el-button>
            <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button>
          </div>
          <el-row style="height:32px">
            <el-col span="6">
            </el-col>
            <el-col span="18" style="text-align:right;">
              <ul class="legend1-ul">
                <li :class="{'legend1-li':boxOfficeTrendsLegendData.length<4,'legend2-li':boxOfficeTrendsLegendData.length>3}"
                  v-for="item in boxOfficeTrendsLegendData" :key="item.name" >
                  <div :class="{'dot-circle':boxOfficeTrendsLegendData.length<4,'dot-s-circle':boxOfficeTrendsLegendData.length>3}"
                    :style="{'background':item.color}" ></div>
                  <div :class="{'legend1-text':boxOfficeTrendsLegendData.length<4,'legend2-text':boxOfficeTrendsLegendData.length>3}"> {{item.name}} </div>
                </li>
              </ul>
            </el-col>
          </el-row>
          <v-chart ref="boxOfficeTrendsChartRef" :force-fit="true" :height="300" :data="boxOfficeTrendsData" :scale="scale">
            <v-tooltip/>
            <v-axis/>
            <v-line position="date*amount" color="movieName"/>
            <v-point
              position="date*amount"
              color="movieName"
              :size="4"
              :v-style="style"
              :shape="'circle'"
            />
          </v-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header" style="margin:0 14px;">
            <span style="font-size:23px">影片票房占比</span>
            <el-button class="card-extra" type="text" icon="el-icon-hysj-zhuanfa"></el-button>
            <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button>
          </div>
          <el-row style="height:32px">
          </el-row>
          <el-row>
            <el-col :span="12">
              <v-chart ref="boxOfficeChartRef" :forceFit="true" :height="300" :data="boxOfficePropData"
                :scale="boxOfficePropScale" >
                <v-axis></v-axis>
                <v-tooltip></v-tooltip>
                <v-pie position="count" color="movieName" :vStyle="pieStyle" :label="labelConfig"></v-pie>
                <v-coord type="theta" :radius="0.8" :innerRadius="0.75"></v-coord>
              </v-chart>
            </el-col>
            <el-col :span="12" style="display: flex;justify-content: center;height: 300px;align-items: Center;" >
              <ul class="legend1-ul" style="text-align:left">
                <li :class="{'legend1-li':boxOfficePropLegendData.length<4,'legend2-li':boxOfficePropLegendData.length>3}"
                  v-for="item in boxOfficePropLegendData" :key="item.name" style=" display: list-item; " >
                  <div :class="{'dot-circle':boxOfficePropLegendData.length<4,'dot-s-circle':boxOfficePropLegendData.length>3}"
                    :style="{'background':item.color}" ></div>
                  <div :class="{'legend1-text':boxOfficePropLegendData.length<4,'legend2-text':boxOfficePropLegendData.length>3}">
                    {{item.name}}
                  </div>
                  <div :class="{'legend1-text':boxOfficePropLegendData.length<4,'legend2-text':boxOfficePropLegendData.length>3}" style="float:right;margin-left:50px;">
                     {{Math.round(item.percent*100)}}%
                  </div>
                </li>
              </ul>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-row class="row-m20-p20">
      <el-col :span="24">
        <el-card>
          <div slot="header" style="margin:0 14px;" class="clearfix">
            <span style="float: left;font-size:23px">影片数据</span>
            <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button>
            <el-button type="text" class="card-extra">更多指标+</el-button>
          </div>
          <div>
            <el-table
              :data="tableData"
              style="width: 100%; font-size:18px"
              stripe="true"
              row-class-name="table-row"
              header-row-class-name="table-header"
            >
              <el-table-column prop="name,id" label="剧名">
                <template slot-scope="scope">
                  <a class="link" @click="alink(scope.row.id)" style="color:#3295D9;text-decoration：none" >{{scope.row.name}}</a>
                </template>
              </el-table-column>
              <el-table-column prop="visitors" label="人次（万）"></el-table-column>
              <el-table-column prop="visitor_per" label="人次占比"></el-table-column>
              <el-table-column prop="field" label="场次（万）"></el-table-column>
              <el-table-column prop="field_per" label="场次占比"></el-table-column>
              <el-table-column prop="volume" label="票房（万）"></el-table-column>
              <el-table-column prop="volume_per" label="票房占比"></el-table-column>
              <el-table-column prop="type" label="类型"></el-table-column>
              <el-table-column prop="date" label="上线日期"></el-table-column>
              <el-table-column prop="num" label="累计播放量（万）"></el-table-column>
            </el-table>
            <el-pagination
              style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
              background
              layout="prev, pager, next"
              :total="1000"
            />
          </div>
        </el-card>
        <!--<indicators></indicators>-->
        <!-- <div class="grid-content">
          <div style="margin-left:24px 32px 24px">
            <h2 >影片票房</h2>
          </div>
        </div>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { View } from '@antv/data-set'
import indicators from '../indicators'
import { setTimeout } from 'timers'
export default {
  name: 'BoxOfficeAnalysis',
  components: {
    indicators
  },
  data () {
    return {
      propChartHeight: window.innerHeight - 60,
      propAnalysisData: [],
      propAnalysisLegendData: [],
      analysisLegendData: [],
      analysisData: [],
      boxOfficePropData: [],
      boxOfficePropLegendData: [],
      boxOfficeTrendsData: [],
      boxOfficeTrendsLegendData: [],
      adjust: [
        {
          type: 'dodge',
          marginRatio: 1 / 4
        }
      ],
      scale: [
        {
          dataKey: 'date',
          min: 0,
          max: 1
        }
      ],
      labelConfig: [
        'percent',
        {
          formatter: (val, item) => {
            return item.point.movieName + '\n' + val
          }
        }
      ],
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
      boxOfficePropScale: [{ dataKey: 'percent', min: 0, formatter: '.0%' }],
      tableData: [
        {
          num: '1502',
          name: '无名之辈',
          analysis: '+',
          volume: '6665.5',
          volume_per: '10%',
          attribute: '院线电影',
          type: '剧情',
          visitors: '20',
          visitor_per: '5%',
          field: '30',
          field_per: '4%',
          date: '2018-11-01'
        },
        {
          num: '16058',
          name: '流浪地球',
          analysis: '+',
          volume: '290000.5',
          volume_per: '40%',
          attribute: '院线电影',
          type: '科幻',
          visitors: '500',
          visitor_per: '55%',
          field: '70',
          field_per: '44%',
          date: '2019-02-03'
        },
        {
          num: '2542',
          name: '新喜剧之王',
          analysis: '+',
          volume: '500.5',
          volume_per: '20%',
          attribute: '院线电影',
          type: '喜剧',
          visitors: '10',
          visitor_per: '2%',
          field: '10',
          field_per: '1%',
          date: '2019-02-01'
        },
        {
          num: '50158',
          name: '独自等待',
          analysis: '+',
          volume: '16665.5',
          volume_per: '30%',
          attribute: '院线电影',
          type: '爱情',
          visitors: '50',
          visitor_per: '15%',
          field: '20',
          field_per: '15%',
          date: '2018-11-01'
        }
      ]
    }
  },
  created () {},
  mounted () {
    this.initBoxOfficeTrendsChart()
    this.initboxOfficePropData()
    // this.getTableData()
    setTimeout(() => {
      this.boxOfficeTrendsLegendData = this.getLegendData(this.$refs.boxOfficeTrendsChartRef)
      this.boxOfficePropLegendData = this.getLegendData(this.$refs.boxOfficeChartRef)
      console.log(this.boxOfficePropLegendData)
    }, 200)
  },
  methods: {
    getLegendData (chartRef) {
      const showTitle = chartRef.chart.chartInstance._attrs.geoms[0]._attrs.attrs.color.field
      const items = chartRef.chart.chartInstance._attrs.geoms[0]._attrs.dataArray || [] // 获取图形对应的
      var legendData = items.map(item => {
        /* eslint no-underscore-dangle:0 */
        const origin = item[0]._origin
        origin.color = item[0].color
        origin.checked = true
        origin.name = origin[showTitle]
        return origin
      })
      return legendData
    },
    initBoxOfficeTrendsChart () {
      var data = [
        { date: '1月', 李茶的姑妈: 7.0, 无双: 3.9 },
        { date: '2月', 李茶的姑妈: 6.9, 无双: 4.2 },
        { date: '3月', 李茶的姑妈: 9.5, 无双: 5.7 },
        { date: '4月', 李茶的姑妈: 14.5, 无双: 8.5 },
        { date: '5月', 李茶的姑妈: 18.4, 无双: 11.9 },
        { date: '6月', 李茶的姑妈: 21.5, 无双: 15.2 },
        { date: '7月', 李茶的姑妈: 25.2, 无双: 17.0 },
        { date: '8月', 李茶的姑妈: 26.5, 无双: 16.6 },
        { date: '9月', 李茶的姑妈: 23.3, 无双: 14.2 },
        { date: '10月', 李茶的姑妈: 18.3, 无双: 10.3 },
        { date: '11月', 李茶的姑妈: 13.9, 无双: 6.6 },
        { date: '12月', 李茶的姑妈: 9.6, 无双: 4.8 }
      ]
      var dv = new View().source(data)
      dv.transform({
        type: 'fold',
        fields: ['李茶的姑妈', '无双'],
        key: 'movieName',
        value: 'amount'
      })
      this.boxOfficeTrendsData = dv.rows
    },
    initboxOfficePropData () {
      var data = [
        { movieName: '李茶的姑妈', count: 67.0 },
        { movieName: '无双', count: 95 },
        { movieName: '李茶的姑妈1', count: 97.0 },
        { movieName: '无双2', count: 195 }
      ]
      var dv = new View().source(data)
      dv.transform({
        type: 'percent',
        field: 'count',
        dimension: 'movieName',
        as: 'percent'
      })
      this.boxOfficePropData = dv.rows
    },
    alink (id) {
			sessionStorage.setItem('movieId', id);
			this.$router.push({
			    path: '/video',
			    query: {
			      id: id,
			      lastmenu: '票房分析'
			    }
			  })
      this.$router.push({name: 'video',params: {id: id}})
    },
    // getTableData () {
    //   this.$http({
    //     url: this.$http.adornUrl('/web/moviedate/list'),
    //     method: 'get'
    //   }).then(({data}) => {
    //     console.log(data)
    //   })
    // },
  }
}
</script>


<style scoped>
@import '../css/box-office.css';
@import '../css/shape.css';
@import '../css/legend.css';
@import '../css/color.css';
</style>
