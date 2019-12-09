<template>
	<div style="position: relative">
		<!-- 图表 -->
		<el-row class="row-m20-p20">
			<el-col :span="24" style="padding-right: 10px;">
				<el-card style="height: 438.6px;">
					<div slot="header" style="margin:0 14px;">
						<span style="font-size:23px">票房基础数据</span>
						<!-- <span style="font-size:14px;margin-left: 30px;">{{ datatime }}</span> -->
						<el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button>
						<span>日期:</span>
						<el-date-picker
							type="date"
							size="small"
							style="width:157px"
							format="yyyy-MM-dd"
							prefix-icon="none"
							v-model="date"
							@change="getBoxoffice()"
						></el-date-picker>
						<span style="margin-left:6px">影片名称：</span>
						<el-input type="text" size="small" placeholder="请输入" style="width:100px" @change="getBoxoffice()" v-model="movieName"></el-input>
					</div>
					<el-row>
						<ul class="basis_list">
							<li>累计票房总额(万)</li>
							<li>{{ accumulative }}</li>
						</ul>
						<ul class="basis_list">
							<li>场次(场)</li>
							<li>{{ session }}</li>
						</ul>
						<ul class="basis_list">
							<li>人次(万)</li>
							<li>{{ mantime }}</li>
						</ul>
					</el-row>
					<div id="allBoxOffice" v-loading="chart1" style="height: 279px;"></div>
				</el-card>
			</el-col>
			<!-- <el-col :span="12" style="padding-left: 10px;">
				<el-card>
					<div slot="header" style="margin:0 14px;">
						<span style="font-size:23px">影片票房占比</span>
						<span style="font-size:14px;margin-left: 30px;">{{ datatime }}</span>
						<el-button class="card-extra" type="text" icon="el-icon-hysj-zhuanfa"></el-button>
						<el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button>
					</div>
					<div id="boxofficeRef" v-loading="first" style="height: 332px;"></div>
				</el-card>
			</el-col> -->
		</el-row>
		<!-- 表格 -->
		<el-row class="row-m20-p20">
			<el-col :span="24">
				<el-card>
					<div slot="header" style="margin:0 14px;" class="clearfix">
						<span style="float: left;font-size:23px">影片票房</span>
						<span style="font-size:14px;margin-left: 30px;margin-top: 10px;display: inline-block;">{{ CurentTime(date) }}</span>
						<span style="margin-left:6px">地区：</span>
						<el-button v-popover:popover2 size="small" style="width:100px; height: 30px; border: 1px solid #eee; text-align: center;">{{ chooseregionText }}</el-button>
						<el-popover ref="popover2" placement="bottom" title="" width="380" trigger="click" content="">
							<el-tabs v-model="activeName" @tab-click="handleClick">
								<el-tab-pane label="按地域" name="first">
									<template>
										<el-table :data="urbanHierarchy" height="250" :show-header="noshow" @row-click="chooseUrban" style="width: 100%; border: none;">
											<el-table-column prop="label" label="" width=""></el-table-column>
										</el-table>
									</template>
								</el-tab-pane>
								<el-tab-pane label="按地区" name="second">
									<template>
										<el-table :data="region" height="250" v-loading="loading" @row-click="chooseRegion" :show-header="noshow" style="width: 100%">
											<el-table-column prop="label" label="" width="320"></el-table-column>
										</el-table>
									</template>
								</el-tab-pane>
								<el-tab-pane label="按省份" name="third">
									<template>
										<el-table :data="province" @row-click="chooseProvince" height="250" v-loading="loading" :show-header="noshow" style="width: 100%">
											<el-table-column prop="value" label="" width="320"></el-table-column>
										</el-table>
									</template>
								</el-tab-pane>
								<!-- <el-tab-pane label="按城市" name="third">省份</el-tab-pane> -->
							</el-tabs>
						</el-popover>

						<span style="margin-left:6px">城市：</span>
						<el-select v-model="cityvalue" @change="changeCity" placeholder="请选择" size="small" style="width:100px">
							<el-option v-for="item in cityOption" :key="item.id" :label="item.value" :value="item"></el-option>
						</el-select>
						<span style="margin-left:6px">院线：</span>
						<el-select v-model="chinasvalue" size="small" @change="changeChian" placeholder="请选择">
							<el-option v-for="item in chiansOptions" :key="item.id" :label="item.name" :value="item"></el-option>
						</el-select>
						<span style="margin-left:6px">影院名称：</span>
						<el-input type="text" v-model="cinemaName" @change="getBoxoffice()" size="small" placeholder="请输入影院" style="width:100px"></el-input>
						<!-- <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button>
						<el-button type="text" class="card-extra">更多指标+</el-button> -->
					</div>
					<div>
						<el-table
							:data="tableData"
							style="width: 100%; font-size:18px"
							stripe
							v-loading="loading"
							header-row-class-name="table-header"
							:header-cell-style="headercellStyle"
							:row-class-name="tableRowClassName"
						>
              <el-table-column :render-header="renderHeader" fixed width="50">
								<template slot-scope="scope">
									<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
									<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
							<el-table-column type="index" width="100px;" label="排名">
								<template slot-scope="scope">
									<span>{{ scope.$index + 1 + (page - 1) * 10 }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="name,foregin_name,movie_id" label="剧名">
								<template slot-scope="scope">
									<a class="link text_hover" @click="alink(scope.row.movie_id)" v-if="scope.row.name != null" style="color:#3295D9;text-decoration:none">
										{{ scope.row.name }}
									</a>
									<a class="link text_hover" @click="alink(scope.row.movie_id)" v-else style="color:#3295D9;text-decoration:none">{{ scope.row.foregin_name }}</a>
								</template>
							</el-table-column>
							<el-table-column prop="" label="对比分析">
								<template slot-scope="scope">
									<img src="../img/add.png" @click="contrast()" min-width="20" height="20" />
								</template>
							</el-table-column>
							<el-table-column prop="box_office" label="票房（万）">
								<template slot-scope="scope">
									<span>{{ scope.row.box_office / 10000 }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="movtype" label="类型" style="word-break: break-all; word-wrap: break-word;"></el-table-column>
							<el-table-column prop="person_time" label="人次（万）">
								<template slot-scope="scope">
									<span>{{ scope.row.person_time / 10000 }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="playtimes" label="场次（万）">
								<template slot-scope="scope">
									<span>{{ scope.row.playtimes / 10000 }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="dayBoxRate" label="票房占比">
								<template slot-scope="scope">
									<span>{{ Math.round(scope.row.box_office_rate * 100 * 1000) / 1000 + '%' }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="dayPlaytimesRate" label="场次占比">
								<template slot-scope="scope">
									<span>{{ Math.round(scope.row.playtimes_rate * 100 * 1000) / 1000 + '%' }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="show_time" label="上线日期"></el-table-column>
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
	</div>
</template>

<script>
import moment from 'moment'
import echarts from 'echarts';
import { View } from '@antv/data-set';
import indicators from '../indicators';
import { setTimeout } from 'timers';
export default {
	name: 'BoxOfficeAnalysis',
	components: {
		indicators
	},
	data() {
		return {
			headercellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
			chooseregionText: '', // 已选择地区的页面显示文字
			activeName: 'first',
			urbanHierarchy: [], // 地域
			region: [], // 地区
			province: [], // 省份
			cityvalue: '', // 城市
			cityOption: [], // 城市列表
			chinasvalue: '', // 院线
			// date: '', // 时间传入需要封装到parmas中
			cinemalineId: '', // 院线ID，传入需要封装到 params 中
			urban_hierarchy: '', // 城市等级编码，传入需要封装到 params 中
			provinceCode: '', // 	省份编码，传入需要封装到 params 中
			regionCode: '', // 区域编码，传入需要封装到 params 中
			cityId: '', // 	城市ID，传入需要封装到 params 中
			cinemaName: '', // 影院名称，传入需要封装到 params 中
			movieName: '', // 电影名称
			chiansOptions: [], // 院线
			noshow: false,
			chart1: true,
			boxOfficeChartRefloading: true,
			datatime: '',
			first: true,
			second: true,
			loading: true,
			date: new Date('2019-04-02'),
			isSearching: false,
			accumulative: '',
			session: '',
			mantime: '',
			page: 1,
			totalPage: 0,
			productid: '',
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
						return item.point.movieName + '\n' + val;
					}
				}
			],
			pieStyle: {
				stroke: '#fff',
				lineWidth: 1
			},
			boxOfficePropScale: [{ dataKey: 'percent', min: 0, formatter: '.0%' }],
			tableData: []
		};
	},
	created() {
		window.addEventListener('setItem', () => {
			this.newVal = sessionStorage.getItem('watchStorage');
			this.isSearching = this.newVal;
		});
	},
	mounted() {
		this.getcookie();
		this.getTableData();
		this.getTopDate();
		this.refresh();
		this.proportion();
		this.getdynamicdata();
		this.getCityList(); // 获取城市列表
		this.getchinasList(); // 获取院线列表
	},
	methods: {
    // 修改表头图标
		renderHeader(h, { column }) {
			return h('i', {
				class: 'el-icon-setting'
      })
    },
		tableRowClassName({ row, rowIndex }) {
			if (rowIndex % 2 == 0) {
				return 'success-row';
			}
			return '';
		},
		// 选择地域
		chooseUrban(val) {
			let _this = this;
			console.log(val);
			_this.chooseregionText = val.label;
			_this.urban_hierarchy = val.value; // 选择城市等级，一线城市，二线城市...
			_this.getBoxoffice
		},
		// 选择地区
		chooseRegion(val) {
			let _this = this;
			console.log(val);
			_this.regionCode = val.value;
			_this.chooseregionText = val.label;
			_this.getBoxoffice
		},
		// 选择省份
		chooseProvince(val) {
			let _this = this;
			console.log(val);
			_this.provinceCode = val.id;
			_this.chooseregionText = val.value;
			_this.getBoxoffice
		},
		// 获取c城市列表接口
		getCityList() {
			let _this = this;
			_this
				.$http({
					url: _this.$http.adornUrl('/web/sysdict/dictOfRegion'),
					method: 'post',
					data: {}
				})
				.then(({ data }) => {
					if (data.code === 0) {
						_this.urbanHierarchy = data.urbanHierarchy;
						_this.region = data.region;
						_this.province = data.province;
						_this.cityOption = data.city;
					} else {
						_this.urbanHierarchy = [];
						_this.region = [];
						_this.province = [];
						alert('暂无数据');
					}
				});
		},
		handleClick(tab, event) {},
		// 选择城市
		changeCity(val) {
			console.log(val);
			this.cityId = val.id;
			this.getBoxoffice
		},
		// 获取院线列表接口
		getchinasList() {
			let _this = this;
			_this
				.$http({
					url: _this.$http.adornUrl('web/cinema/listcinema'),
					method: 'post',
					data: {}
				})
				.then(({ data }) => {
					console.log(data);
					if (data.code === 0 && data.listMap != []) {
						_this.chiansOptions = data.listMap;
					} else {
						_this.chiansOptions = [];
						alert('暂无数据');
					}
				});
		},
		// 选择院线保存院线id
		changeChian(val) {
			console.log(val, '院线');
			let _this = this;
			_this.cinemalineId = val.id;
			_this.chinasvalue = val.name;
			_this.getBoxoffice
			// _this.getData()
			// _this.getRegionData()
		},
		// 格式化时间为2019-04-02
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
		// 格式化时间为2.19-04-02 14:20
		CurentTimehours(now) {
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			var day = now.getDate();
			var hh = now.getHours();
			var mm = now.getMinutes();
			var clock = year + '-';
			if (month < 10) clock += '0';
			clock += month + '-';
			if (day < 10) clock += '0';
			clock += day + ' ';
			if (hh < 10) clock += '0';
			clock += hh + ':';
			if (mm < 10) clock += '0';
			clock += mm;
			return clock;
		},
		//修改时间重新填充数据
		getBoxoffice() {
			this.page = 1;
			this.chart1 = true;
			this.loading = true;
			this.first = true;
			this.second = true;
			this.getcookie();
			this.getdynamicdata();
			this.getTopDate();
			this.getTableData();
			this.refresh();
			this.proportion();
			this.isSearching = !this.isSearching;
			var data = this.isSearching;
			sessionStorage.setItem('isSearching', data);
			this.resetSetItem('watchStorage', data);
		},
		// 点击查询按钮
		// toSearch() {
		// 	this.page = 1;
		// 	this.chart1 = true;
		// 	this.loading = true;
		// 	this.first = true;
		// 	this.second = true;
		// 	this.getcookie();
		// 	this.getdynamicdata();
		// 	this.getTopDate();
		// 	this.getTableData();
		// 	this.refresh();
		// 	this.proportion();
		// 	this.isSearching = !this.isSearching;
		// 	var data = this.isSearching;
		// 	sessionStorage.setItem('isSearching', data);
		// 	this.resetSetItem('watchStorage', data);
		// },
		//获取productid
		getcookie() {
			this.productid = this.$cookie.get('productid');
			if (this.productid == null) {
				this.productid = '29';
			}
		},
		//生成图例
		getLegendData(chartRef) {
			const showTitle = chartRef.chart.chartInstance._attrs.geoms[0]._attrs.attrs.color.field;
			const items = chartRef.chart.chartInstance._attrs.geoms[0]._attrs.dataArray || []; // 获取图形对应的
			var legendData = items.map(item => {
				/* eslint no-underscore-dangle:0 */
				const origin = item[0]._origin;
				origin.color = item[0].color;
				origin.checked = true;
				origin.name = origin[showTitle];
				return origin;
			});
			return legendData;
		},
		//票房基础数据动态图表allBoxOffice
		initBoxOfficeTrendsChart(datas, hours) {
			var day = this.CurentTime(this.date);
			var option3 = {
				tooltip: {
					trigger: 'axis',
					formatter: function(data) {
						var result = '';
						result += day + '<br>';
						for (var i = 0; i < data.length; i++) {
							if (i == data.length - 1) {
								result += data[i].marker + '' + data[i].value + 'w';
							} else {
								result += data[i].marker + '' + data[i].value + 'w' + '<br>';
							}
						}
						return result;
					}
				},
				grid: {
					bottom: '20%',
					right: '7%',
					containLabel: true
				},
				legend: {
					data: day,
					right: '2%'
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
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: hours
					}
				],
				yAxis: {
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
			this.chartBar = echarts.init(document.getElementById('allBoxOffice'));
			this.chartBar.setOption(option3, true);
			window.addEventListener('resize', () => {
				this.chartBar.resize();
			});
		},
		//影片票房占比图表
		initboxOfficePropData(datas, names) {
			var option4 = {
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b}: {c} ({d}%)'
				},
				legend: {
					orient: 'vertical',
					right: '15%',
					top: '25%',
					itemGap: 20,
					data: names
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
				series: [
					{
						name: '票房占比',
						type: 'pie',
						radius: ['40%', '55%'],
						center: ['32%', '50%'],
						itemStyle: {
							normal: {
								label: {
									show: true,
									formatter: '{d}%'
								},
								labelLine: { show: true }
							}
						},
						data: datas
					}
				]
			};
			this.chartBar = echarts.init(document.getElementById('boxofficeRef'));
			this.chartBar.setOption(option4, true);
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
					lastmenu: '票房分析'
				}
			});
			// this.$router.push({name: 'video',params: {id: id}})
		},
		//列表数据
		getTableData() {
			this.$http({
				url: this.$http.adornUrl(
					'/web/boxoffice/movList/' +
						this.productid +
						'?date=' +
						this.CurentTime(this.date) +
						'&urban_hierarchy=' +
						this.urban_hierarchy +
						'&province=' +
						this.provinceCode +
						'&region=' +
						this.regionCode +
						'&city_id=' +
						this.cityId +
						'&cinemaline_id=' +
						this.cinemalineId +
						'&cinema_name=' +
						this.cinemaName +
						'&mov_name=' +
						this.movieName +
						'&current=' +
						this.page +
						'&size=10'
				),
				method: 'POST',
				data: this.$http.adornData({
					date: this.CurentTime(this.date),
					urban_hierarchy: this.urban_hierarchy,
					province: this.provinceCode,
					region: this.regionCode,
					city_id: this.cityId,
					cinemaline_id: this.cinemalineId,
					cinema_name: this.cinemaName,
					mov_name: this.movieName,
					current:this.page
				})
			})
				.then(({ data }) => {
					console.log(data);
					var msg = data;
					this.totalPage = msg.page.total - 0;
					if (msg.page.records.length == 0) {
						this.loading = false;
						this.tableData = msg.page.records;
					} else {
						for(var i=0;i<msg.page.records.length;i++){
							if (msg.page.records[i].show_time != null) {
								var time = msg.page.records[i].show_time.split(' ')[0];
								msg.page.records[i].show_time = time;
							}
						}
						this.tableData = msg.page.records;
						this.loading = false;
						// for (let k = 0; k < msg.page.records.length; k++) {
						// if (msg.page.records[k].show_time != null) {
						// 	var time = msg.page.records[k].show_time.split(' ')[0];
						// 	msg.page.records[k].show_time = time;
						// }
						// this.$http({
						// 	url: this.$http.adornUrl('/web/movietype/findMovieTypeNameByList/' + msg.page.records[k].type_id),
						// 	method: 'get',
						// 	data: this.$http.adornData({
						// 		types: msg.page.records[k].type_id
						// 	})
						// })
						// 	.then(({ data }) => {
						// 		var typename = '';
						// 		for (var m = 0; m < data.list.length; m++) {
						// 			if (m == data.list.length - 1) {
						// 				typename += data.list[m].type_name;
						// 			} else {
						// 				typename += data.list[m].type_name + ',';
						// 			}
						// 		}
						// 		msg.page.records[k].typename = typename;
						// 		if (k == msg.page.records.length - 1) {
						// 			this.loading = false;
						// 			this.tableData = msg.page.records;
						// 		}
						// 	})
						// 	.catch(err => {
						// 		// console.log('请求失败：');
						// 	});
						// }
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
		//影片票房占比数据
		proportion() {
			this.$http({
				url: this.$http.adornUrl('/web/boxoffice/listandicon/' + this.productid + '/1/' + this.CurentTime(this.date)),
				method: 'POST',
				data: this.$http.adornData({
					productid: this.productid,
					type: 1
				})
			})
				.then(({ data }) => {
					for (let k = 0; k < data.page.records.length; k++) {
						if (data.page.records[k].name == '') {
							data.page.records.splice(k, 1);
						}
					}
					var msg = [];
					var names = [];
					if (data.page.records.length < 6) {
						var n = data.page.records.length;
					} else {
						var n = 6;
					}
					for (var i = 0; i < n; i++) {
						names.push(data.page.records[i].name);
						msg.push({ value: data.page.records[i].dayBoxRate, name: data.page.records[i].name });
					}
					this.first = false;
					this.initboxOfficePropData(msg, names);
				})
				.catch(err => {
					// console.log('请求失败：');
				});
		},
		//票房基础数据动态顶部数据
		getTopDate() {
			var params = new URLSearchParams();
			params.append('date', this.CurentTime(this.date));
			params.append('province', this.provinceCode);
			params.append('region', this.regionCode);
			params.append('urban_hierarchy', this.urban_hierarchy);
			params.append('city_id', this.cityId);
			params.append('cinemaline_id', this.cinemalineId);
			params.append('cinema_name', this.cinemaName);
			params.append('mov_name', this.movieName);
			this.$http({
				url: this.$http.adornUrl('/web/boxoffice/sums/' + this.productid),
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: params
			})
				.then(({ data }) => {
					console.log(data);
					this.accumulative = data.data.box_office / 10000;
					this.session = data.data.playtimes;
					this.mantime = data.data.person_time / 10000;
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		//每隔5分钟刷新一次
		refresh() {
			let _this = this;
			_this.datatime = _this.CurentTimehours(new Date());
			let time = 1;
			var fivemint = setInterval(function() {
				time++;
				if (time === 300) {
					clearInterval(fivemint);
					time = 1;
					_this.chart1 = true;
					_this.page = 1;
					_this.loading = true;
					_this.first = true;
					_this.second = true;
					_this.getcookie();
					_this.getTopDate();
					_this.getTableData();
					_this.refresh();
					_this.getdynamicdata();
					_this.proportion();
				}
			}, 1000);
		},
		//票房基础数据图表数据
		getdynamicdata() {
			this.$http({
				url: this.$http.adornUrl('/web/boxoffice/basicDataChart/' + this.CurentTime(this.date)),
				method: 'POST',
				data: { time: this.CurentTime(this.date) }
			})
				.then(({ data }) => {
					var boxOfficeData = [
						{
							name: this.CurentTime(this.date),
							type: 'line',
							// color:'#3295D9',
							data: []
						}
					];
					var times = [];
					for (var i = 0; i < data.list.length; i++) {
						var time = data.list[i].time.split(' ')[1].split(':');
						time.pop();
						times.push(time.join(':'));
						boxOfficeData[0].data.push(data.list[i].day_box / 10000);
					}
					console.log(boxOfficeData);
					this.chart1 = false;
					this.initBoxOfficeTrendsChart(boxOfficeData, times);
				})
				.catch(err => {
					// console.log('请求失败：');
				});
		}
	}
};
</script>

<style scoped>
@import '../css/box-office.css';
@import '../css/shape.css';
@import '../css/legend.css';
@import '../css/color.css';
.text_hover {
	cursor: pointer;
	display: inline-block;
}
.card-extra {
	font-size: 14px;
	color: #0084cf;
	line-height: 30px;
}
.el-table .success-row {
	background: #f5f5f5;
}
.cover {
	position: fixed;
	left: 0;
	top: 128px;
	background: #333333;
	width: 100%; /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
	height: 100%;
	filter: alpha(opacity=35); /*设置透明度为60%*/
	opacity: 0.35; /*非IE浏览器下设置透明度为60%*/
	z-index: 2000;
}
.search {
	background: #ffffff;
	position: fixed;
	top: 128px;
	width: 100%;
	z-index: 2000;
}
.search-box {
	height: 58px;
	line-height: 58px;
	margin: 0 auto;
	text-align: center;
}
.basis_list {
	float: left;
	width: 30%;
	text-align: center;
	list-style: none;
	margin: 0;
}
.basis_list li {
	font-size: 24px;
	font-family: MicrosoftYaHei-Bold;
	font-weight: bold;
	color: rgba(51, 51, 51, 1);
}
.basis_list li:first-of-type {
	margin-bottom: 10px;
	font-size: 14px;
	font-family: MicrosoftYaHei;
	font-weight: 400;
	color: rgba(51, 51, 51, 1);
}
</style>
