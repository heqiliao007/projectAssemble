<template>
	<div style="width: 100%;">
    <p class="title_header_works">
				<span style="margin-right: 3px;">作品排行</span>
				<i class="iconfont iconarrow-right-copy-copy"></i>
        <span>{{activeName}}</span>
		</p>
		<div class="netwoeksDails">
      <div style="margin-top: 0px;">
        <div style="line-height: 30px;">
          <!-- <span style="display: inline-block; margin: 0 10px;" :class="indexType==0 ? 'activeName' : ''" @click="handleClick('0')">月票</span> -->
          <span
            style="display: inline-block; margin: 0 10px;" :class="indexType==1 ? 'activeName' : ''" @click="chooseTitle('1')" class='text_hover'>点击数</span>
          <span
          style="display: inline-block; margin: 0 10px;" :class="indexType==2 ? 'activeName' : ''" @click="chooseTitle('2')" class='text_hover'>推荐数
          </span>
          <span
          style="display: inline-block; margin: 0 10px;" :class="indexType==3 ? 'activeName' : ''" @click="chooseTitle('3')" class='text_hover'>粉丝数</span>
          <span
            style="display: inline-block; margin: 0 10px;" :class="indexType==4 ? 'activeName' : ''" @click="chooseTitle('4')" class='text_hover'>评论数</span>
          <!-- </span> -->
        </div>
        <div style="margin-top: 20px;">
          <span style="font-weight: 700; margin-right: 20px;">{{activeName}}</span>
          <el-dropdown @command='handleChooseOption' style='margin-left: 0px; border: 1px solid #ccc; background-color: #fff; width: 140px; text-align: center; line-height: 30px;' class="project-container">
					  <span class="el-dropdown-link">
					    {{option}}<i class="iconfont iconsanjiaoxing" style="margin-left: 40px;"></i>
					  </span>
					  <el-dropdown-menu slot="dropdown" class="project-dropdown">
					    <el-dropdown-item
              :class="option == item.name ? 'colorBlue' : ''"
					    :command="{label: item.name, id: item.id}"
					    v-for="item in options"
					    :key="item.id">{{item.name}}</el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
          <el-dropdown @command='handleChooseType' style='margin-left: 10px; border: 1px solid #ccc; background-color: #fff; width: 70px; text-align: center; line-height: 30px;' class="project-container">
					  <span class="el-dropdown-link">
					    {{typeChoose}}<i class="iconfont iconsanjiaoxing" style="margin-left: 10px;"></i>
					  </span>
					  <el-dropdown-menu slot="dropdown" class="project-dropdown">
					    <el-dropdown-item
              :class="typeChoose == item.label ? 'colorBlue' : ''"
					    :command="{label: item.label, id: item.value}"
					    v-for="item in typeOptions"
					    :key="item.value">{{item.label}}</el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
          <el-dropdown @command='handleChooseDate' style='margin-left: 10px; border: 1px solid #ccc; background-color: #fff; width: 100px; text-align: center; line-height: 30px;'>
            <span class="el-dropdown-link">
              {{dateChoose}}<i class="iconfont iconsanjiaoxing" style="margin-left: 40px;"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
              :class="dateChoose == item.label ? 'colorBlue' : ''"
              :command="item.label"
              v-for="item in weekoptions"
              :key="item.value">{{item.label}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div id="clickChart" style="height: 400px; width: 97%;"></div>
      </div>
      <div style="margin-top: 30px;">
        <p>{{tablename}}</p>
        <el-row>
					<el-table
            id='table'
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
							label="小说名称"
              fixed
							prop="name">
							<template slot-scope="scope">
								<!-- <i class="iconfont iconhistogram" style="color: #0084CF;"></i> -->
								<span style="margin-left: 10px; color: #0084CF;" class='text_hover'  @click="alink(scope.row)">{{ scope.row.name }}</span>
							</template>
						</el-table-column>
						<el-table-column
							label="作者"
							prop="author_name">
						</el-table-column>
						<el-table-column
							label="类型"
							prop="type_names">
						</el-table-column>
						<el-table-column
							label="连载状态"
							prop="state">
						</el-table-column>
						<el-table-column
							label="连载平台"
							prop="platform_names">
						</el-table-column>
            <el-table-column
							label="作品评分"
              prop="score"
							>
						</el-table-column>
            <el-table-column
							:label="labelname"
              :prop="propname"
							>
						</el-table-column>
					</el-table>
					<el-pagination
					  style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
					  background
					  layout="prev, pager, next"
					  :total="total"
            @current-change = "changePage"
					/>
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
        headerCellStyle: {
					"color":"#fff",
					'backgroundColor': '#C1C1C1'
        },
        loading: true,
        dateChoose: '本周', // 选择时间显示
        weekoptions: [
          {label: '本周', value: '1'},
          {label: '本年', value: '2'},
          {label: '全部', value: '3'}
        ],
        typeChoose: '平台',
        typeOptions: [
        ],
        current: 1,
        total: 1,
        activeName: '点击数', // 月票-点击数-推荐数-粉丝数，评论数
        labelname: '作品点击数',
        tablename: '点击数列表',
        propname: 'hits', // 点击的时候'hits'
        productid: '', // 调用接口时候，传参
        indexType: '1', // 调用接口的时候，传参
        dateType: '0', // 调用接口传参	日期类型（近七天0/近30天1/全部3）
        typeId: '1', // 类型id
        platformId: '3', // 平台id
        option: '全部',
        options: [
          {label: '小说阅读网', value: '3'},
          {label: '晋江文学城', value: '4'},
          {label: '潇湘书院', value: '5'},
        ],
        inintChart: null, // 图表
        xAxis: [],
        seriesdata: [],
        tableData: [
				]
			}
		},
		components: {
		  // HeadEr
    },
    mounted() {
      this.getcookie()
      this.getTypeOption()
      this.getOption()
      this.getTablleData()
      this.getChartData()
    },
    methods: {
      handleChooseOption (command) {
        console.log(command)
        // this.option = command
        this.option = command.label
        this.platformId = command.id
        this.current = 1
        this.getChartData()
      },
      alink(e) {
				console.log(e)
				this.$router.push({
					path: '/networkLiterature/networksDails',
					query: {
						id: e.id,
						lastmenu: '作品排行'
					}
				})
				// this.$router.push({path:'/networkLiterature/networksDails'})
			},
       // 获取平台
      getOption () {
        let _this = this
        _this.$http({
          url: _this.$http.adornUrl('/web/wlplatform/getPlatformList'),
          method: 'POST',
        }).then(({data}) => {
          console.log(data, '平台')
          if (data.code === 0) {
            _this.options = data.list
            console.log(data.list)
            _this.option = data.list[0].name
            _this.platformId = data.list[0].id

            // _this.pageinfo = data.details[0]
            // _this.weekshowList = data.page.records
          }
        })
      },
      handleChooseType(command) {
        this.typeChoose = command.label
        this.typeId = command.id
        this.getChartData()
        console.log('type', command)
      },
       // 获取文学类型/web/sysdict/webLiteraryType
      getTypeOption () {
        let _this = this
        _this.$http({
          url: _this.$http.adornUrl('/web/sysdict/webLiteraryType'),
          method: 'POST',
        }).then(({data}) => {
          console.log(data, '获取文学类型')
          if (data.code === 0) {
            _this.typeOptions = data.dict
            _this.typeChoose = data.dict[0].label
            _this.typeId = data.dict[0].value
          }
        })
      },
      chooseTitle (value) {
        this.dateChoose = '本周'
        console.log(value, '点击了')
        this.dateType = 0
        if (value == '0') {
          this.activeName = '月票数'
          this.labelname = '作品月票数'
          this.tablename = '月票数列表'
          this.propname = ''
          this.indexType = value
          this.loading = true
          this.getTablleData()
          this.getChartData()
        } else if (value == '1') {
          this.loading = true
          this.activeName = '点击数'
          this.labelname = '作品点击数'
          this.tablename = '点击数列表'
          this.propname = 'hits'
          this.indexType = value
          this.getTablleData()
          this.getChartData()
        } else if (value == '2') {
          this.loading = true
          this.activeName = '推荐数'
          this.labelname = '作品推荐数'
          this.tablename = '推荐数列表'
          this.propname = 'recommendation'
          this.indexType = value
          this.getTablleData()
          this.getChartData()
        } else if (value == '3') {
          this.loading = true
          this.activeName = '粉丝数'
          this.labelname = '作品粉丝数'
          this.tablename = '粉丝数列表'
          this.propname = 'fans'
          this.indexType = value
          this.getTablleData()
          this.getChartData()
        } else if (value == '4') {
          this.loading = true
          this.activeName = '评论数'
          this.labelname = '作品评论数'
          this.tablename = '评论数列表'
          this.propname = 'comment'
          this.indexType = value
          this.getTablleData()
          this.getChartData()
        }
      },
      // 修改表头图标
			renderHeader(h, {column}) {
				return h ('i', {
							'class':'el-icon-setting'
						})
			},
      handleChooseDate(command) {
        console.log(command)
        this.dateChoose = command
        if (command == '本周') {
          this.dateType = '0'
          this.getChartData()
        }
        if (command == '本年') {
          this.dateType = '1'
          this.getChartData()
        }
        if (command == '全部') {
          this.dateType = '3'
          this.getChartData()
        }
      },
      initMarketLine (xAxis, data) {
        console.log('绘制图表')
        var option = {
          'tooltip': {
            'trigger': 'axis',
            'formatter': '{c0}w'
          },
          'grid': {
            'left': '3%',
            'right': '4%',
            'bottom': '4%',
            'containLabel': true
          },
          'toolbox': {
            'feature': {
            }
          },
          'xAxis': {
            'type': 'category',
            'data': xAxis,
            axisLabel: {
                interval: 0,
                rotate: 10
            },
          },
          'yAxis': {
            'name': '周数据',
            'type': 'value'
          },
          'series': [
            {
              'type': 'bar',
              'stack': '总量',
              'symbol': 'none',
              'barWidth': '20px',
              'itemStyle' : {
                'normal' : {
                  'color':'#3295D9'
                }
              },
              'data': data
            }
          ]
        }
        this.inintChart = echarts.init(document.getElementById('clickChart'))
        this.inintChart.setOption(option,true)
        window.addEventListener('resize', () => {
          this.inintChart.resize()
        })
      },
      // 获取cookie
      getcookie () {
        this.productid=this.$cookie.get('productid')
        if(this.productid==null){
          this.productid='9'
        }
      },
      // 分页数据查询
      changePage (val) {
        // console.log(val)
        let _this = this
        _this.loading = true
        // console.log(_this.platformId, _this.typeId)
        _this.current = val
        _this.getTablleData()
      },
      scrollTop(selector) {
        let element = selector && document.querySelector(selector) || window;
        element.scrollTo(0, 0);
      },
       // 获取列表数据/web/webliterary/getRankingList/{productid}/{indexType}
      //  指数类型（月票0/点击1/推荐2/粉丝3/评论4）
      getTablleData () {
        let _this = this
        // _this.tableData = []
        _this.$http({
          url: _this.$http.adornUrl('/web/webliterary/getRankingList/' + _this.productid + '/' + _this.indexType + '?current=' + _this.current + '&size=10'),
          method: 'POST',
        }).then(({data}) => {
          console.log(data, '获取文学类型')
          if (data.code === 0) {
            for (let i = 0; i < data.page.records.length; i++) {
              if (data.page.records[i].state == 1) {
                data.page.records[i].state = '已完结'
              } else if (data.page.records[i].state == 2) {
                data.page.records[i].state = '连载中'
              }
            }
            _this.total = Number(data.page.total)
            _this.tableData = data.page.records
            _this.scrollTop('#table')
            _this.loading = false
          }
        })
      },
      // 获取图表数据/web/webliterary/getRankingChart/{{productid}}/{indexType}/{dateType}
      getChartData () {
        let _this = this
        let xAxis = []
        let seriesdata = []
        _this.$http({
          url: _this.$http.adornUrl('/web/webliterary/getRankingChart/' + _this.productid + '/' + _this.indexType +'/'+ this.dateType + '?platformId=' + _this.platformId + '&typeId='+ _this.typeId),
          method: 'POST',
        }).then(({data}) => {
          console.log(data, '获取图表')
          if (data.code == 0) {
            if (_this.indexType == '0') {
            console.log('月票数据')
            } else if (_this.indexType == 1) {
              for (let i = 0; i < data.list.length; i++) {
                xAxis.push(data.list[i].name)
                seriesdata.push(data.list[i].hits)
              }
            } else if (_this.indexType == 2) {
              for (let i = 0; i < data.list.length; i++) {
                xAxis.push(data.list[i].name)
                seriesdata.push(data.list[i].recommendation)
              }
            } else if (_this.indexType == 3) {
              for (let i = 0; i < data.list.length; i++) {
                xAxis.push(data.list[i].name)
                seriesdata.push(data.list[i].fans)
              }
            } else if (_this.indexType == 4) {
              for (let i = 0; i < data.list.length; i++) {
                xAxis.push(data.list[i].name)
                seriesdata.push(data.list[i].comment)
              }
            }
            _this.xAxis = xAxis
            _this.seriesdata = seriesdata
            _this.initMarketLine(_this.xAxis, _this.seriesdata)
          }
        })
      },
    },
	}
</script>

<style lang='scss' scoped>
  @import '../boxOffice/css/box-office.css';
  @import '../boxOffice/css/shape.css';
  @import '../boxOffice/css/legend.css';
  @import '../boxOffice/css/color.css';
  .text_hover{
    cursor: pointer;
    display: inline-block;
  }
  .colorBlue {
    color: #40A9FF;
  }
    .project-dropdown{
    width:150px;
    height:250px;
    overflow: auto;
  }
/* .project-dropdown::-webkit-scrollbar
  {
      width: 5px;
      height: 5px;
      background-color: #F5F5F5;
  }
.project-dropdown::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 10px;
      background-color: #F5F5F5;
  } */
  .title_header_works {
      margin-left: 42px;
			border-left: 2px solid #40A9FF;
			box-sizing: border-box;
			padding-left: 10px;
			font-size: 12px;
		}
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
      height: 450px;
      padding-top: 20px;
      padding-left: 20px;
      .charttitle {
        line-height: 30px; font-size: 14px; color: #4c4c4c;
        padding-left: 30px;
      }
    }

	}
  .activeName {
    display: inline-block;
    border-bottom: 2px solid #40A9FF;
  }
</style>
