<template>
	<div class="recommond" style="margin-top: -20px;">
		<InfoCardChange />

		<el-row class="row-m20-p20">
			<ul class="select-ul">
				<li class="select-li" :class="{ 'select-active': isList }" @click="toogleList(true)">列表</li>
				<li class="select-li" :class="{ 'select-active': !isList }" @click="toogleList(false)">图表</li>
			</ul>
		</el-row>
		<!-- 表格 -->
		<el-row class="row-m20-p20" v-show="isList == true">
			<el-col :span="24">
				<el-card :body-style="bodyStyle">
					<div slot="header" style="margin:0 14px;" class="clearfix">
						<span style="float: left;font-size:23px">影片数据</span>
						<!-- <el-button class="card-extra" type="text" icon="iconfont iconxiazai"></el-button> -->
						<!-- <el-button type="text" class="card-extra" style="font-size: 12px; margin-top: 8px; color: #0084CF;">
							更多指标
							<i class="iconfont iconjia"></i>
						</el-button> -->
					</div>
					<div>
						<el-table
							:data="tableData"
							style="width: 100%; font-size:18px"
							stripe
							v-loading="loading"
							row-class-name="table-row"
							header-row-class-name="table-header"
							:header-cell-style="headerCellStyle"
						>
							<el-table-column :render-header="renderHeader" fixed width="50">
								<template slot-scope="scope">
									<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
									<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
							<el-table-column prop="name,foregin_name,id" label="剧名">
								<template slot-scope="scope">
									<a class="link" @click="alink(scope.row.id)" v-if="scope.row.name != null" style="color:#3295D9;text-decoration:none">{{ scope.row.name }}</a>
									<a class="link" @click="alink(scope.row.id)" v-else style="color:#3295D9;text-decoration:none">{{ scope.row.foregin_name }}</a>
								</template>
							</el-table-column>
							<el-table-column prop="person_time" label="人次（万）">
								<template slot-scope="scope">
									<span>{{ scope.row.person_time / 10000 }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="dayPersonTimeRate" label="人次占比">
								<template slot-scope="scope">
									<span>{{ Math.round(scope.row.dayPersonTimeRate * 100 * 1000) / 1000 + '%' }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="playtimes" label="场次（万）">
								<template slot-scope="scope">
									<span>{{ scope.row.playtimes / 10000 }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="dayPlaytimesRate" label="场次占比">
								<template slot-scope="scope">
									<span>{{ Math.round(scope.row.dayPlaytimesRate * 100 * 1000) / 1000 + '%' }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="box_office" label="票房（万）">
								<template slot-scope="scope">
									<span>{{ scope.row.box_office / 10000 }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="dayBoxRate" label="票房占比">
								<template slot-scope="scope">
									<span>{{ Math.round(scope.row.dayBoxRate * 100 * 1000) / 1000 + '%' }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="typename" label="类型"></el-table-column>
							<el-table-column prop="show_time" label="上映日期"></el-table-column>
						</el-table>
						<el-pagination
							style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
							background
							layout="prev, pager, next"
							:page-size="10"
							:total="totalPage"
							:current-page="page"
							@current-change="handleCurrentChange"
						/>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<!-- 图表 -->
		<el-row class="row-m20-p20" v-show="isList == false">
			<!-- <el-col :span="12" style="padding-right: 10px;display: inline-block;">
        <el-card style="height: 478px;">
          <div slot="header" style="margin:0 14px;" class="clearfix">
            <span style="font-size:23px">占比分析</span>
            <el-button class="card-extra" type="text" icon="iconfont iconfenxiang"></el-button>
            <el-button class="card-extra" type="text" icon="iconfont iconxiazai"></el-button>
          </div>
          <div id="propAnalysisChartRef" v-loading="first" style="height: 370px;width: 100%;"></div>
        </el-card>
      </el-col> -->
			<el-col :span="24" style="display: inline-block">
				<el-card style="height: 478px;">
					<div slot="header" style="margin:0 14px;" class="clearfix">
						<span style="font-size:23px">{{primaryselect}}趋势</span>
						<el-button class="card-extra" type="text" icon="iconfont iconfenxiang"></el-button>
						<el-button class="card-extra" type="text" icon="iconfont iconxiazai"></el-button>
					</div>
					<div style="position: relative;">
						<el-row style="height:32px;">
							<el-col :span="12">
								<el-radio-group size="small" style="float:left" v-model="analysisselect" @change="analysisdays()">
									<el-radio-button label="全天"></el-radio-button>
									<el-radio-button label="上午"></el-radio-button>
									<el-radio-button label="下午"></el-radio-button>
								</el-radio-group>
								<!-- <span style="font-size:12px;color:rgb(153,153,153);line-height: 32px;padding-left: 20px;">单位（万）</span> -->
							</el-col>
							<el-col :span="11">
								<el-radio-group size="small" style="float:right" v-model="primaryselect" @change="analysisdays()">
									<el-radio-button label="票房"></el-radio-button>
									<el-radio-button label="场次"></el-radio-button>
									<el-radio-button label="人次"></el-radio-button>
								</el-radio-group>
							</el-col>
						</el-row>
						<div id="analysisDataChartRef" v-loading="second" style="height: 370px;width: 100%"></div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row class="row-m20-p20" v-show="isList == false">
			<el-col :span="24" style="display: inline-block">
				<el-card>
					<div slot="header" style="margin:0 14px;">
						<span style="font-size:23px">票房动态</span>
						<el-button class="card-extra" type="text" icon="iconfont iconfenxiang"></el-button>
						<el-button class="card-extra" type="text" icon="iconfont iconxiazai"></el-button>
					</div>
					<div style="position: relative;">
						<el-row style="height:32px;">
							<el-col :span="5">
								<el-radio-group size="small" v-model="dynamic" style="float:left" @change="dynamicchange()">
									<el-radio-button label="票房"></el-radio-button>
									<el-radio-button label="场次"></el-radio-button>
								</el-radio-group>
							</el-col>
						</el-row>
						<div id="boxOfficeTrendsChartRef" v-loading="third" style="height: 370px;width: 100%;"></div>
					</div>
				</el-card>
			</el-col>
			<!-- <el-col :span="12" style="padding-left: 10px;display: inline-block">
        <el-card>
          <div slot="header" style="margin:0 14px;">
            <span style="font-size:23px">{{ primarytitle }}</span>
            <el-button class="card-extra" type="text" icon="iconfont iconfenxiang"></el-button>
            <el-button class="card-extra" type="text" icon="iconfont iconxiazai"></el-button>
          </div>
          <div style="position: relative;">
            <el-row style="height:32px;z-index: 9;position: absolute;top: 0;width: 100%;">
              <el-radio-group size="small" style="float:left" v-model="primaryselect" @change="proportion()">
                <el-radio-button label="票房"></el-radio-button>
                <el-radio-button label="场次"></el-radio-button>
              </el-radio-group>
            </el-row>
            <div id="boxOfficeChartRef" v-loading="fourth" style="height: 370px;"></div>
          </div>
        </el-card>
      </el-col> -->
		</el-row>
	</div>
</template>

<script>
import InfoCardChange from '../info-card/info-card-change';
import echarts from 'echarts';
import { setTimeout } from 'timers';
  import moment from 'moment'
export default {
	data() {
		return {
			bodyStyle: {
				padding: '0px'
			},
			headerCellStyle: {
				color: '#fff',
				backgroundColor: '#C1C1C1'
			},
			value10: '',
			analysisnames: [],
			allDay:{
				name:[],
				boxOffice:[],
				session:[],
				mantime:[],
				boxOfficeof:[],
				sessionof:[],
				mantimeof:[],
			},
			am:{
				name:[],
				boxOffice:[],
				session:[],
				mantime:[],
				boxOfficeof:[],
				sessionof:[],
				mantimeof:[],
			},
			pm:{
				name:[],
				boxOffice:[],
				session:[],
				mantime:[],
				boxOfficeof:[],
				sessionof:[],
				mantimeof:[],
			},
			fourth: true,
			third: true,
			second: true,
			first: true,
			loading: true,
			productid: '9',
			page: 1,
			totalPage: 10,
			analysisselect: '全天',
			primaryselect: '票房',
			dynamic: '票房',
			primarytitle: '票房占比',
			boxoffice: '',
			session: '',
			mantime: '',
			value1: new Date('2019-04-02'),
			propChartHeight: window.innerHeight - 60,
			propAnalysisData: [],
			propAnalysisLegendData: [],
			analysisLegendData: [],
			analysisData: [],
			BoxOfficedata: [],
			BoxOfficenames: [],
			BoxOfficehours: [],
			sessiondata: [],
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
						return item.point.movieName + '\n' + val;
					}
				}
			],
			pieStyle: {
				stroke: '#fff',
				lineWidth: 1
			},
			boxOfficePropScale: [{ dataKey: 'percent', min: 0, formatter: '.0%' }],
			isList: true,
			tableData: []
		};
	},
	created() {},
	mounted() {
		this.getcookie();
		this.getTableData();
		this.analysisDatas();
		this.getdynamicdata();
	},
	methods: {
    // 修改表头图标
		renderHeader(h, { column }) {
			return h('i', {
				class: 'el-icon-setting'
      })
    },
		//获取productid
		getcookie() {
			this.productid = this.$cookie.get('productid');
			if (this.productid == null) {
				this.productid = '9';
			}
		},
		toogleList(isList) {
			this.isList = isList;
			if (isList == false) {
				this.$nextTick(function() {
					this.chartBar.resize();
					this.chartbar.resize();
				});
			}
		},
		//数据分析图表
		initAnlysisChart(names,data1,data2) {
			let _this=this
			var option2 = {
				tooltip: {
					trigger: 'axis',
					formatter: function(data) {
						console.log(data)
						var result = '';
						result += data[0].name + '<br>';
						for (var i = 0; i < data.length; i++) {
							if (i == data.length - 1) {
								result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + '%';
							} else {
								result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + '<br>';
							}
						}
						return result;
					}
				},
				grid:{
                    bottom:'25%',
                },
				legend: {
					data: [_this.primaryselect,_this.primaryselect+'占比'],
					top: 'top'
				},
				xAxis: [
					{
						type: 'category',
						data: names,
						axisPointer: {
							type: 'shadow'
						},
						axisLabel: {
						   interval:0,
						   rotate:-25
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						name: '数量（万）                ',
						min: 0,
						// max: 10,
						// interval: 2,
						axisLabel: {
							formatter: '{value}'
						}
					},
					{
						type: 'value',
						name: '占比',
						min: 0,
						// max: 100,
						// interval: 20,
						axisLabel: {
							formatter: '{value} %'
						}
					}
				],
				series: [
					{
						name: _this.primaryselect,
						type: 'bar',
						color: ['#2ec7c9'],
						yAxisIndex: 0,
						barWidth : 20,
						data: data1
					},
					{
						name: _this.primaryselect+'占比',
						type: 'line',
						yAxisIndex: 1,
						color: ['#b39fdd'],
						barWidth: '10',
						data: data2
					},
				]
			};
			this.second = false;
			this.chartbar = echarts.init(document.getElementById('analysisDataChartRef'));
			this.chartbar.setOption(option2, true);
			window.addEventListener('resize', () => {
				this.chartbar.resize();
			});
		},
		//票房、场次动态图表
		initBoxOfficeTrendsChart(datas) {
			var option3 = {
				tooltip: {
					trigger: 'axis'
				},
				grid: {
					top: '21%',
					bottom: '5%',
					right: '7%',
					containLabel: true
				},
				color: [
					'#3fb1e3',
					'#6be6c1',
					'#a0a7e6',
					'#626c91',
					'#c4ebad',
					'#96dee8',
					'#b6a2de',
					'#ffb980',
					'#71b00a',
					'#588dba',
					'#d87a80',
					'#e5cf0d',
					'#59678c',
					'#588dd5',
					'#07a2a4'
				],
				legend: {
					data: this.BoxOfficenames,
					right: '2%'
				},
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: this.BoxOfficehours
					}
				],
				yAxis: {
					name: '票房（万）                ',
					type: 'value',
					// show: true,
					axisLabel: {
						show: true,
						interval: 'auto'
					},
					axisLine: {
						lineStyle: {
							width: 0
						}
					}
				},
				series: datas
			};
			this.chartBar = echarts.init(document.getElementById('boxOfficeTrendsChartRef'));
			this.chartBar.setOption(option3, true);
			window.addEventListener('resize', () => {
				this.chartBar.resize();
			});
		},
		//跳转影片详情
		alink(id) {
			sessionStorage.setItem('movieId', id);
			this.$router.push({
				path: '/video',
				query: {
					id: id,
					lastmenu: '智库推荐'
				}
			});
		},
		//列表数据
		getTableData() {
			this.$http({
				url: this.$http.adornUrl('/web/boxoffice/listandicon/' + this.productid + '/1/' + this.CurentTime(this.value1) + '?current=' + this.page + '&size=10'),
				method: 'POST',
				data: this.$http.adornData({
					productid: this.productid,
					type: 1
				})
			})
				.then(({ data }) => {
					var msg = data;
					for (let k = 0; k < msg.page.records.length; k++) {
						if (msg.page.records[k].show_time != null) {
							var time = msg.page.records[k].show_time.split(' ')[0];
							msg.page.records[k].show_time = time;
						}
						this.$http({
							url: this.$http.adornUrl('/web/movietype/findMovieTypeNameByList/' + msg.page.records[k].type_id),
							method: 'get',
							data: this.$http.adornData({
								types: msg.page.records[k].type_id
							})
						})
							.then(({ data }) => {
								var typename = '';
								for (var m = 0; m < data.list.length; m++) {
									if (m == data.list.length - 1) {
										typename += data.list[m].type_name;
									} else {
										typename += data.list[m].type_name + ',';
									}
								}
								msg.page.records[k].typename = typename;
								if (k == msg.page.records.length - 1) {
									this.loading = false;
									this.tableData = msg.page.records;
									this.totalPage = msg.page.total - 0;
								}
							})
							.catch(err => {
								// console.log('请求失败：');
							});
					}
				})
				.catch(err => {
					// console.log('请求失败：');
				});
		},
		//分页
		handleCurrentChange(val) {
			this.loading = true;
			this.page = val;
			this.getTableData();
		},
		//格式化时间
		CurentTime(now) {
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			var day = now.getDate();
			var clock = year + '-';
			if (month < 10) clock += '0';
			clock += month + '-';
			if (day < 10) clock += '0';
			clock += day;
			return clock;
		},
		//切换日期
		getBoxoffice(day) {
			this.value1=new Date(day)
			console.log(this.value1)
			this.analysisnames = [];
			this.sessiondata = [];
			this.BoxOfficedata = [];
			this.analysisselect = '全天';
			this.primaryselect = '票房';
			this.primarytitle = '票房占比';
			this.dynamic = '票房';
			this.loading = true;
			this.fourth = true;
			this.third = true;
			this.second = true;
			this.first = true;
			this.page = 1;
			this.getTableData();
			this.analysisDatas();
			this.getdynamicdata();
			this.allDay={
				name:[],
				boxOffice:[],
				session:[],
				mantime:[],
				boxOfficeof:[],
				sessionof:[],
				mantimeof:[],
			}
			this.am={
				name:[],
				boxOffice:[],
				session:[],
				mantime:[],
				boxOfficeof:[],
				sessionof:[],
				mantimeof:[],
			}
			this.pm={
				name:[],
				boxOffice:[],
				session:[],
				mantime:[],
				boxOfficeof:[],
				sessionof:[],
				mantimeof:[],
			}
		},
		//数据分析数据
		analysisDatas () {
			 this.$http({
			    url: this.$http.adornUrl('web/boxoffice/listRankedMovieByBoxOffice?date='+this.CurentTime(this.value1)),
			    method: 'POST'
			  })
			    .then(({data}) => {
			      for(var i=0;i<data.data.day.length;i++){
			      	this.allDay.name.push(data.data.day[i].movieName)
			      	this.allDay.boxOffice.push(parseInt(data.data.day[i].boxOffice/10000))
			      	this.allDay.session.push(parseInt(data.data.day[i].playTimes/10000))
			      	this.allDay.mantime.push(parseInt(data.data.day[i].personTime/10000))
			      	this.allDay.boxOfficeof.push(data.data.day[i].boxOfficePercent)
			      	this.allDay.sessionof.push(data.data.day[i].playTimesPercent)
			      	this.allDay.mantimeof.push(data.data.day[i].personTimePercent)
			      }
			      for(var i=0;i<data.data.am.length;i++){
			      	this.am.name.push(data.data.am[i].movieName)
			      	this.am.boxOffice.push(parseInt(data.data.am[i].boxOffice/10000))
			      	this.am.session.push(parseInt(data.data.am[i].playTimes/10000))
			      	this.am.mantime.push(parseInt(data.data.am[i].personTime/10000))
			      	this.am.boxOfficeof.push(data.data.am[i].boxOfficePercent)
			      	this.am.sessionof.push(data.data.am[i].playTimesPercent)
			      	this.am.mantimeof.push(data.data.am[i].personTimePercent)
			      }
			      for(var i=0;i<data.data.pm.length;i++){
			      	this.pm.name.push(data.data.pm[i].movieName)
			      	this.pm.boxOffice.push(parseInt(data.data.pm[i].boxOffice/10000))
			      	this.pm.session.push(parseInt(data.data.pm[i].playTimes/10000))
			      	this.pm.mantime.push(parseInt(data.data.pm[i].personTime/10000))
			      	this.pm.boxOfficeof.push(data.data.pm[i].boxOfficePercent)
			      	this.pm.sessionof.push(data.data.pm[i].playTimesPercent)
			      	this.pm.mantimeof.push(data.data.pm[i].personTimePercent)
			      }
			      this.initAnlysisChart(this.allDay.name,this.allDay.boxOffice,this.allDay.boxOfficeof)
			    })
		},
		//切换数据分析全天、上午、下午、票房、场次、人次
		analysisdays () {
		  if (this.analysisselect == '全天'&&this.primaryselect=='票房') {
		   this.initAnlysisChart(this.allDay.name,this.allDay.boxOffice,this.allDay.boxOfficeof)
		  } else if (this.analysisselect == '全天'&&this.primaryselect=='场次') {
		    this.initAnlysisChart(this.allDay.name,this.allDay.session,this.allDay.sessionof)
		  } else if (this.analysisselect == '全天'&&this.primaryselect=='人次') {
		    this.initAnlysisChart(this.allDay.name,this.allDay.mantime,this.allDay.mantimeof)
		  } else if (this.analysisselect == '上午'&&this.primaryselect=='票房') {
		    this.initAnlysisChart(this.am.name,this.am.boxOffice,this.am.boxOfficeof)
		  } else if (this.analysisselect == '上午'&&this.primaryselect=='票房') {
		    this.initAnlysisChart(this.am.name,this.am.session,this.am.sessionof)
		  } else if (this.analysisselect == '上午'&&this.primaryselect=='票房') {
		    this.initAnlysisChart(this.am.name,this.am.mantime,this.am.mantimeof)
		  } else if (this.analysisselect == '下午'&&this.primaryselect=='票房') {
		    this.initAnlysisChart(this.pm.name,this.pm.boxOffice,this.pm.boxOfficeof)
		  } else if (this.analysisselect == '下午'&&this.primaryselect=='票房') {
		    this.initAnlysisChart(this.pm.name,this.pm.session,this.pm.sessionof)
		  } else if (this.analysisselect == '下午'&&this.primaryselect=='票房') {
		    this.initAnlysisChart(this.pm.name,this.pm.mantime,this.pm.mantimeof)
		  }
		},
		//票房动态数据
		getdynamicdata() {
			var width = document.getElementById('boxOfficeTrendsChartRef').offsetWidth;
			console.log(width + 'wwwwwwww');
			this.$http({
				url: this.$http.adornUrl('/web/realtimebox/byHour/' + this.productid + '?day=' + this.CurentTime(this.value1)),
				method: 'POST'
			})
				.then(({ data }) => {
					for (let i = 0; i < data.list.length; i++) {
						this.BoxOfficehours.push(data.list[i].hour + ':00');
						for (let j = 0; j < data.list[i].regroupData.length; j++) {
							if (i == 0 && j < 4) {
								this.BoxOfficenames.push(data.list[i].regroupData[j].name);
								this.BoxOfficedata.push({
									name: data.list[i].regroupData[j].name,
									type: 'line',
									data: [data.list[i].regroupData[j].box / 10000]
								});
								this.sessiondata.push({
									name: data.list[i].regroupData[j].name,
									type: 'line',
									data: [data.list[i].regroupData[j].playtimes / 10000]
								});
							} else if (i != 0 && j < 4) {
								this.BoxOfficedata[j].data.push(data.list[i].regroupData[j].box / 10000);
								this.sessiondata[j].data.push(data.list[i].regroupData[j].playtimes / 10000);
							}
						}
					}
					this.third = false;
					this.initBoxOfficeTrendsChart(this.BoxOfficedata);
				})
				.catch(err => {
					// console.log('请求失败：');
				});
		},
		//切换票房动态的票房和场次
		dynamicchange() {
			if (this.dynamic == '票房') {
				this.initBoxOfficeTrendsChart(this.BoxOfficedata);
			} else {
				this.initBoxOfficeTrendsChart(this.sessiondata);
			}
		}
	},
	components: {
		// InfoCard,
		InfoCardChange
	}
};
</script>

<style>
/* 	.el-card__body {
          padding: 0;
      } */
</style>

<style scoped>
@import '../css/box-office.css';
@import '../css/shape.css';
@import '../css/legend.css';
@import '../css/color.css';

.recommond {
	background-color: #f5f5f5;
}

a:hover {
	text-decoration: none;
	cursor: pointer;
}

.legend1-ul {
	padding: 0;
}
</style>
<style>
#foruth .g2-tooltip-title {
	display: none;
}
</style>
