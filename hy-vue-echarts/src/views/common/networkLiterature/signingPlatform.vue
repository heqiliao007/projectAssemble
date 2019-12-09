<template>
	<div style="width: 100%;">
		<div class="netwoeksDails">
      <div style="margin-top: 30px;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="日均浏览量" name="first">
            <div class="chartBox">
              <div class="charttitle">
                <span>日均浏览量</span>
              </div>
              <div id="dayshowsChart" style="height: 360px"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="版权作品数" name="second">
            <div class="chartBox">
              <div class="charttitle">
                <span>版权作品数</span>
              </div>
              <div id="copyrightChart" style="height: 360px"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="签约作者数" name="third">
            <div class="chartBox">
              <div class="charttitle">
                <span>签约作者数</span>
              </div>
              <div id="recommendChart" style="height: 360px"></div>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="平台用户数" name="fourth">
            <div class="chartBox">
              <div class="charttitle" >
                <span>平台用户数</span>
                  <el-dropdown @command='handleChooseDate' style='margin-left: 20px;border: 1px solid #ccc; height: 30px; margin-top: 5px; width: 70px; text-align: center;'>
                  <span class="el-dropdown-link" style="border: 1px soild #ededed;">
                    {{dateChoose}}<i class="iconfont iconsanjiaoxing"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                    :command="item.label"
                    v-for="item in dateChooseOption"
                    :key="item.value">{{item.label}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div id="usersChart" style="height: 360px"></div>
            </div>
          </el-tab-pane> -->
        </el-tabs>
      </div>
      <div style="margin-top: 30px;">
        <p>平台列表</p>
        <el-row>
					<el-table
            v-loading='loading'
						:data="tableData"
						stripe
						:header-cell-style='headerCellStyle'
						style="width: 97%">
						<el-table-column
							:render-header="renderHeader"
							fixed
							width="50">
							<template slot-scope="scope">
								<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
								<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
							</template>
						</el-table-column>
						<el-table-column
							label="中文名"
              fixed
              width="200"
							prop="name">
							<template slot-scope="scope">
								<!-- <i class="iconfont iconhistogram" style="color: #0084CF;"></i> -->
								<span style="margin-left: 10px; color: #0084CF;"  @click="alink(scope.row)">{{ scope.row.name }}</span>
							</template>
						</el-table-column>
						<el-table-column
							label="外文名"
							prop="english_name"
							width="200">
						</el-table-column>
						<!-- <el-table-column
							label="类型"
							prop="type"
							width="100">
						</el-table-column> -->
						<el-table-column
							label="创办时间"
							prop="opening_time">
						</el-table-column>
						<el-table-column
							label="创始人"
							prop="founder_names"
							width="170">
						</el-table-column>
            <el-table-column
							label="所属公司"
							prop="company_name"
							width="170">
						</el-table-column>
           <!-- <el-table-column
							label="官网"
							prop="score"
							width="100">
						</el-table-column> -->
            <el-table-column
							label="签约作者数"
							prop="contract_author_count"
							width="100">
						</el-table-column>
						<el-table-column
							label="版权作品数"
							prop="contract_literary_count"
							width="100">
						</el-table-column>
						<el-table-column
							label="平台用户数"
							prop="user_count"
							width="100">
						</el-table-column>
						<el-table-column
							label="日均浏览量"
							prop="daily_pageview"
							width="100">
						</el-table-column>
           <!-- <el-table-column
							label="频道分布"
							prop="monthtime"
							width="100">
						</el-table-column> -->
					</el-table>
					<!-- <el-pagination
					  style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
					  background
					  layout="prev, pager, next"
					  :total="1000"
					/> -->
				</el-row>
      </div>
		</div>
	</div>
</template>

<script>
  // import HeadEr from '../recommend/home'
  import echarts from 'echarts'
	export default {
		data () {
			return {
        loading: true,
        productid: '', // 请求数据时候所传参数
        platformIndexType: '0', // 网络平台指数类型（0-日均浏览量,1-版权作品数,2-签约作者数,3-平台用户数）
        dateType: '0', // 日期类型（0-近七天，1-近30天，默认近七天）
        headerCellStyle: {
					"color":"#fff",
					'backgroundColor': '#C1C1C1'
        },
        dateChoose: '本周',
        activeName: 'first',
        // typeChoose: '本周',
        dateChooseOption: [
				  {label: '本周', value: '0'},
          {label: '本月', value: '1'}
        ],
        chartLine: null, // 图表
        copyrightChart: null, // 版权作品数
        dateshowChart: null, // 日均浏览量的图表
        usersChart: null, // 平台用户图表
        dayshowsChart: null, // 日均访问量
        dateshowChartData: [
          // {date: '2019-5-17', data: '0'},
          // {date: '2019-5-18', data: '47.8729'},
          // {date: '2019-5-19', data: '8.933'},
          // {date: '2019-5-20', data: '218.0624'},
          // {date: '2019-5-21', data: '481.6265'},
          // {date: '2019-5-22', data: '581.6265'},
          // {date: '2019-5-23', data: '218.0624'}
        ],
        chartData: [
          // {date: '2019-5-17', data: '0'},
          // {date: '2019-5-18', data: '47.8729'},
          // {date: '2019-5-19', data: '8.933'},
          // {date: '2019-5-20', data: '218.0624'},
          // {date: '2019-5-21', data: '481.6265'},
          // {date: '2019-5-22', data: '581.6265'},
          // {date: '2019-5-23', data: '218.0624'}
        ],
        tableData: [
        ],
        legendData: [],
        xAxis: [],
        seriesData: []
        // chartData: ['0', '47.8729', '8.933', '218.0624', '218.0624', '481.6265', '581.6265']
			}
		},
		components: {
		  // HeadEr
    },
    mounted() {
      this.getcookie()
      this.getChartData()
      // this.initChart()
      this.getTableData()
    },
    methods: {
      getcookie () {
        this.productid=this.$cookie.get('productid')
        console.log(this.productid)
        if(this.productid==null){
          this.productid='9'
        }
      },
      handleClick(tab, event) {
        if (tab.name == 'first') {
          console.log(tab.name)
          this.platformIndexType = 0 // 日均浏览量
          this.dateType = 0
          this.$nextTick(() => {
            // this.initdayshowsChart()
            this.getChartData()
            // this.getTableData()
          })
          // this.initcopyrightChart()
        }
        if (tab.name == 'second') {
          console.log(tab.name)
          this.platformIndexType = 1 // 版权作品
          this.dateType = 0
          this.$nextTick(() => {
            // this.initcopyrightChart()
            this.getChartData()
            // this.getTableData()
          })
          // this.initcopyrightChart()
        }
        console.log(tab.name, event);
        if (tab.name == 'third') {
          console.log(tab.name)
          this.platformIndexType = 2 // 签约作者
          this.dateType = 0
          this.$nextTick(() => {
            // this.initMarketLine()
            this.getChartData()
            // this.getTableData()
          })
          // this.initcopyrightChart()
        }
        if (tab.name == 'fourth') {
          console.log(tab.name)
          this.platformIndexType = 3 // 平台用户
          this.dateType = 0
          // this.dateChoose = '本周'
          // let xAxis = ['2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15']
          // let legendData = ['起点中文网','创世中文网','红袖添香','腾讯文学','17k小说网', '纵横中文网', '晋江文学城', '潇湘书院', '小说阅读网']
          // let serisData = [
          //     {
          //         name:'起点中文网',
          //         type:'line',
          //         stack: '总量',
          //         data:[120, 132, 101, 134, 90, 230, 210]
          //     },
          //     {
          //         name:'创世中文网',
          //         type:'line',
          //         stack: '总量',
          //         data:[220, 182, 191, 234, 290, 330, 310]
          //     },
          //     {
          //         name:'红袖添香',
          //         type:'line',
          //         stack: '总量',
          //         data:[150, 232, 201, 154, 190, 330, 410]
          //     },
          //     {
          //         name:'腾讯文学',
          //         type:'line',
          //         stack: '总量',
          //         data:[320, 332, 301, 334, 390, 330, 320]
          //     },
          //     {
          //         name:'17k小说网',
          //         type:'line',
          //         stack: '总量',
          //         data:[820, 932, 901, 934, 1290, 1330, 1220]
          //     },
          //     {
          //         name:'纵横中文网',
          //         type:'line',
          //         stack: '总量',
          //         data:[280, 332, 401, 934, 120, 130, 1420]
          //     },
          //     {
          //         name:'晋江文学城',
          //         type:'line',
          //         stack: '总量',
          //         data:[820, 532, 601, 634, 190, 330, 1320]
          //     },
          //     {
          //         name:'潇湘书院',
          //         type:'line',
          //         stack: '总量',
          //         data:[820, 432, 701, 934, 1290, 330, 320]
          //     },
          //     {
          //         name:'小说阅读网',
          //         type:'line',
          //         stack: '总量',
          //         data:[420, 532, 701, 1024, 1190, 1350, 1420]
          //     },
          //   ]
          this.$nextTick(() => {
            // this.initusersChart(xAxis, legendData, serisData)
            this.getChartData()
            // this.getTableData()
          })
        }

      },
      // 修改表头图标
			renderHeader(h, {column}) {
				return h ('i', {
							'class':'el-icon-setting'
						})
			},
      handleChooseDate(command) {
        this.dateChoose = command
        console.log(command)
        console.log(this.dateChoose)
        if (this.dateChoose == '本周') {
           console.log('本周')
          this.dateType = 0
          this.$nextTick(() => {
            this.getChartData()
            // this.initusersChart(xAxis, legendData, serisData)
          })
        } else if (this.dateChoose == '本月'){
          console.log('本月')
          this.dateType = 1
          this.$nextTick(() => {
            // this.initusersChart(xAxis, legendData, serisData)
            this.getChartData()
          })
        }
      },
      // 版权作品数
      initcopyrightChart (legendData, xAxis, seriesData) {
        // console.log('绘制图表')
        var option = {
          title: {
              text: ''
          },
          tooltip: {
              trigger: 'axis'
          },
          color: ['#3fb1e3', '#6be6c1', '#a0a7eb', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
          legend: {
            data: legendData
              // data:['起点中文网','创世中文网','红袖添香','腾讯文学','17k小说网', '纵横中文网', '晋江文学城', '潇湘书院', '小说阅读网']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxis
              // data: ['2013','2014','2015','2016','2017','2018','2019']
          },
          yAxis: {
              type: 'value'
          },
          series: seriesData
          // series: [
              // {
              //     name:'起点中文网',
              //     type:'line',
              //     stack: '总量',
              //     data:[120, 132, 101, 134, 90, 230, 210]
              // },
              // {
              //     name:'创世中文网',
              //     type:'line',
              //     stack: '总量',
              //     data:[220, 182, 191, 234, 290, 330, 310]
              // },
              // {
              //     name:'红袖添香',
              //     type:'line',
              //     stack: '总量',
              //     data:[150, 232, 201, 154, 190, 330, 410]
              // },
              // {
              //     name:'腾讯文学',
              //     type:'line',
              //     stack: '总量',
              //     data:[320, 332, 301, 334, 390, 330, 320]
              // },
              // {
              //     name:'17k小说网',
              //     type:'line',
              //     stack: '总量',
              //     data:[820, 932, 901, 934, 1290, 1330, 1220]
              // },
              // {
              //     name:'纵横中文网',
              //     type:'line',
              //     stack: '总量',
              //     data:[280, 332, 401, 934, 120, 130, 1420]
              // },
              // {
              //     name:'晋江文学城',
              //     type:'line',
              //     stack: '总量',
              //     data:[820, 532, 601, 634, 190, 330, 1320]
              // },
              // {
              //     name:'潇湘书院',
              //     type:'line',
              //     stack: '总量',
              //     data:[820, 432, 701, 934, 1290, 330, 320]
              // },
              // {
              //     name:'小说阅读网',
              //     type:'line',
              //     stack: '总量',
              //     data:[420, 532, 701, 1024, 1190, 1350, 1420]
              // },
            // ]
          }
        this.copyrightChart = echarts.init(document.getElementById('copyrightChart'))
        window.addEventListener('resize', () => {
          resizeMainContainer()
          this.copyrightChart.resize()
        })
        this.copyrightChart.setOption(option,true)
      },
      // 签约作者图表
      initMarketLine (legendData, xAxis, seriesData) {
        // console.log('绘制图表')
        var option = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          color: ['#3fb1e3', '#6be6c1', '#a0a7eb', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
          legend: {
            data: legendData
            // data:['起点中文网','创世中文网','红袖添香','腾讯文学','17k小说网', '纵横中文网', '晋江文学城', '潇湘书院', '小说阅读网']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxis
              // data: ['2013','2014','2015','2016','2017','2018','2019']
          },
          yAxis: {
              type: 'value'
          },
          series: seriesData
        }
        this.chartLine = echarts.init(document.getElementById('recommendChart'))
        window.addEventListener('resize', () => {
          resizeMainContainer()
          this.chartLine.resize()
        })
        this.chartLine.setOption(option,true)
      },
      // 平台用户数
      initusersChart (legendData, xAxis, serisData) {
        // console.log('绘制图表')
        var option = {
          title: {
              text: ''
          },
          color: ['#3fb1e3', '#6be6c1', '#a0a7eb', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data: legendData
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              // data: ['2019-5-1','2019-5-2','2019-5-3','2019-5-4','2019-5-5','2019-5-6','2019-5-7']
              data: xAxis
          },
          yAxis: {
              type: 'value'
          },
          series: serisData
          }
        this.usersChart = echarts.init(document.getElementById('usersChart'))
        window.addEventListener('resize', () => {
          resizeMainContainer()
          this.usersChart.resize()
        })
        this.usersChart.setOption(option,true)
      },
      // 日均浏览量
      initChart (xAxis, seriesData) {
        var option = {
          color: ['#3fb1e3', '#6be6c1', '#a0a7eb', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
          xAxis: {
              type: 'category',
              data: xAxis
          },
          yAxis: {
              type: 'value'
          },
          series: {
            type: 'bar',
            data: seriesData,
            barWidth: '25'
          }
          }
        this.dayshowsChart = echarts.init(document.getElementById('dayshowsChart'))
        window.addEventListener('resize', () => {
          resizeMainContainer()
          this.dayshowsChart.resize()
        })
        this.dayshowsChart.setOption(option,true)
      },
      // 获取图表数据/web/wlplatform/getAnalysisWithPlatformChart/{{productid}}/{platformIndexType}
      getChartData () {
        let _this = this
        _this.$http({
          url: _this.$http.adornUrl('/web/wlplatform/getAnalysisWithPlatformChart/'+_this.productid + '/' + _this.platformIndexType),
          method: 'POST',
          data: _this.$http.adornData({
            'productid': _this.productid,
            'platformIndexType': _this.platformIndexType,
            'dateType': _this.dateType
          })
        }).then(({data}) => {
          // console.log(data, '签约平台===图表数据')
          let legend = []
          let serisDataitem = {
            name: '',
            type: 'line',
            stack: '总量',
            data: []
          }
          let seriesData = []
          let xAxis = []
          if (data.code === 0) {
            // this.chartData = data.list
            if (_this.platformIndexType == 0) { // 日均浏览量
              console.log('0')
              for (let i = 0; i < data.list.length; i++) {
                xAxis.push(data.list[i].name)
                seriesData.push(data.list[i].num)
              }
              _this.initChart(xAxis, seriesData)
            } else if (_this.platformIndexType == 1) { // 版权作品数
              // alert('1')
              console.log('1')
              xAxis = data.date
              console.log(data.list)
              for (let i = 0; i < data.list.length; i++) {
                legend.push(data.list[i].name)
                serisDataitem = {
                  name: data.list[i].name,
                  type: 'line',
                  stack: '总量',
                  data: data.list[i].data
                }
                seriesData.push(serisDataitem)
              }
              _this.initcopyrightChart(legend, xAxis, seriesData)

            } else if (_this.platformIndexType == 2) { // 签约作者数
            console.log('2')
              xAxis = data.date
              for (let i = 0; i < data.list.length; i++) {
                legend.push(data.list[i].name)
                serisDataitem = {
                  name: data.list[i].name,
                  type: 'line',
                  stack: '总量',
                  data: data.list[i].data
                }
                seriesData.push(serisDataitem)
              }
              _this.initMarketLine(legend, xAxis, seriesData)
            } else if (_this.platformIndexType == 3) { // 平台作品数
              console.log('3', data)
              xAxis = data.date
              for (let i = 0; i < data.list.length; i++) {
                legend.push(data.list[i].name)
                serisDataitem = {
                  name: data.list[i].name,
                  type: 'line',
                  stack: '总量',
                  data: data.list[i].data
                }
                seriesData.push(serisDataitem)
              }
              console.log(xAxis, 'xAxis')
              console.log(legend, 'legend')
              console.log(seriesData, 'seriesData')
              _this.initusersChart(legend, xAxis, seriesData)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取列表数据/web/wlplatform/getAnalysisWithPlatformList/{productid}
      getTableData () {
        let _this = this
        _this.$http({
          url: _this.$http.adornUrl('/web/wlplatform/getAnalysisWithPlatformList/' + _this.productid),
          method: 'POST',
          data: _this.$http.adornData({
            'productid': _this.productid
          })
        }).then(({data}) => {
          console.log(data, '签约平台===列表数据')
          if (data.code === 0) {
            _this.tableData = data.list
            this.loading = false
            // _this.pageinfo = data.details[0]
            // _this.weekshowList = data.page.records
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
	}
</script>

<style lang='scss' scoped>
  @import '../boxOffice/css/box-office.css';
  @import '../boxOffice/css/shape.css';
  @import '../boxOffice/css/legend.css';
  @import '../boxOffice/css/color.css';
	.netwoeksDails {
		width: 95%;
		height: auto;
		margin: 10px auto;
		box-sizing: border-box;
		padding: 10px 5px;
		.title_header {
			border-left: 2px solid #40A9FF;
			box-sizing: border-box;
			padding-left: 10px;
			font-size: 12px;
		}
    .infoleft {
      position: relative;
      height: 266px;
      box-sizing: border-box;
      padding-left: 205px;
      padding-top: 20px;
      padding-bottom: 5px;
      .info-pic {
        position: absolute;
        left: 0;
        top: 0;
        width:196px;
        height: 266px;
        background-color: #D3D3D3;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
    .zhishubox {
      position: relative; width: 100%; height: 110px; padding-left: 55px; margin-bottom: 20px;
    }
    .zhishutupian {
      width: 50px; position: absolute; top: 10px; left: 0;
    }
    .zhishuwenzi {
      width: 100%;
      text-align: center
    }
    .zuopininfobox {
      position: relative;
      padding: 20px;
      padding-left: 25%;
      .zuopininfopic {
        position: absolute;
        left: 30%;
        top: 40px;
        transform: translateX(-40%);
      }
    }
    .chartBox {
      width: 100%;
      background-color: #fff;
      height: 430px;
      .charttitle {
        line-height: 30px; font-size: 14px; color: #4c4c4c;
        padding-left: 20px;
      }
    }

	}
</style>
