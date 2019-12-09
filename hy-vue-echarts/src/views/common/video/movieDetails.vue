<template>
	<div style="background: #ededed;">
		<el-row style="padding: 15px 75px 0;">
			<el-breadcrumb separator-class="el-icon-arrow-right" style="border-left: 2px solid #41a9fe;padding-left: 6px;">
				<el-breadcrumb-item style="font-weight: 500;" @click.native="goPre" class="text_hover">{{ lastmenu }}</el-breadcrumb-item>
				<el-breadcrumb-item>影院详情</el-breadcrumb-item>
			</el-breadcrumb>
			<el-row>
				<h1>{{ render_data.name }}</h1>
				<p><span style="display: inline-block;background: #0084cf;margin-right: 20px;line-height: 20px;padding: 0 12px;color: #ffffff;">标签-1</span><span style="display: inline-block;background: #0084cf;margin-right: 20px;line-height: 20px;padding: 0 12px;color: #ffffff;">标签-1</span></p>
				<p class="names">
					<span>所属院线：</span>
					<span style="color: #0083d1;">{{ render_data.chainName }}</span>
				</p>
			</el-row>
			<el-row>
				<el-col :span="5">
					<p class="names">
						<span class="name">城市：</span>
						<span style="color: #4c4c4c;font-weight: bold;">{{ render_data.cityName }}</span>
					</p>
					<p class="names">
						<span class="name">地区：</span>
						<span style="color: #4c4c4c;font-weight: bold;">{{ render_data.areaName }}</span>
					</p>
					<p class="names">
						<span class="name">影院坐标：</span>
						<span
							style="color: #4c4c4c;font-weight: bold;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;width: calc(100% - 80px);display: inline-block;vertical-align: middle;"
						>
							{{ render_data.address }}
						</span>
					</p>
					<p class="names">
						<span class="name">所属公司：</span>
						<span style="color: #4c4c4c;font-weight: bold;" v-for="item in render_data.companyList" :key="item.id">{{ item.name }}</span>
					</p>
					<p class="names">
						<span class="name">建筑面积：</span>
						<span style="color: #4c4c4c;font-weight: bold;">{{ render_data.grouseFloorArea }}m²</span>
					</p>
					<p class="names">
						<span class="name">座位数：</span>
						<span style="color: #4c4c4c;font-weight: bold;">{{ render_data.seating }}</span>
					</p>
					<p class="names">
						<span class="name">银幕数：</span>
						<span style="color: #4c4c4c;font-weight: bold;">{{ render_data.screenNumber }}</span>
					</p>
					<p class="names">
						<span class="name">3D影厅：</span>
						<span style="color: #4c4c4c;font-weight: bold;">{{ render_data.threeDimensionNumber }}</span>
					</p>
					<p class="names">
						<span class="name">IMAX影厅：</span>
						<span style="color: #4c4c4c;font-weight: bold;">{{ render_data.imaxNumber }}</span>
					</p>
				</el-col>
				<el-col :span="19" style="border-left: 1px solid #cdcdcd;">
					<el-row style="text-align: center;">
						<el-col :span="8">
							<div class="item">
								<p class="item-top one">
									<span style="color: #0084CF;">{{ todayData.boxOffice / 10000 }}</span>
									万
								</p>
								<p class="item-btm">今日实时票房</p>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="item">
								<p class="item-top two">
									<span style="color: #14BDB3;">{{ todayData.personTime / 10000 }}</span>
									万
								</p>
								<p class="item-btm">今日实时人次</p>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="item">
								<p class="item-top four">
									<span style="color: #63D84C;">{{ todayData.countryRanking }}</span>
									名
								</p>
								<p class="item-btm">全国排名</p>
							</div>
						</el-col>
					</el-row>
					<el-row style="margin-top: 10px;text-align: center;">
						<el-col :span="8">
							<div class="item">
								<p class="item-top three">
									<span style="color: #CF0000;">{{ todayData.cityRanking }}</span>
									名
								</p>
								<p class="item-btm">城市排名</p>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="item">
								<p class="item-top five">
									<span style="color: #EAB600;">{{ todayData.chainRanking }}</span>
									名
								</p>
								<p class="item-btm">院线排名</p>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="item">
								<p class="item-top six">
									<span style="color: #B451CA;">{{ todayData.avgPersonTimes / 10000 }}</span>
									万
								</p>
								<p class="item-btm">场均人次</p>
							</div>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="影片票房" name="first">
					<el-row>
						<el-button :type="menuName == '时段' ? 'primary' : ''" @click="chooseMenu('时段')">时段</el-button>
						<el-button :type="menuName == '影片' ? 'primary' : ''" @click="chooseMenu('影片')">影片</el-button>
					</el-row>
					<el-row style="margin-top: 20px;">
						<span>日期：</span>
						<el-date-picker
							v-if="menuName == '时段'"
							v-model="date"
							value-format="yyyy-MM-dd"
							type="daterange"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
						></el-date-picker>
						<el-date-picker v-if="menuName == '影片'" v-model="filmDate" type="date" placeholder="选择日期"></el-date-picker>
						<el-checkbox v-model="checked">服务费</el-checkbox>
						<el-button type="primary" @click="select()">查询</el-button>
					</el-row>
					<el-row style="background: #ffffff;height: 400px;margin-top: 20px;">
						<el-row style="margin: 5px 0 0 10px;" v-if="menuName == '时段'">
							时段分析图表 {{ this.date1 }} - {{ this.date2 }}
							<span style="color: #969696;" v-if="service == true">已选择服务费</span>
						</el-row>
						<el-row style="margin: 5px 0 0 10px;" v-if="menuName == '影片'">
							影片分析图表 {{ this.date3 }}
							<span style="color: #969696;" v-if="service == true">已选择服务费</span>
						</el-row>
						<el-row style="width: 100%; overflow-x: auto;padding: 0;margin: 0;">
							<div id="charts" style="min-width: 99%;height: 370px;padding: 0;margin: 0;" v-loading="chartLoading"></div>
						</el-row>
					</el-row>
					<el-row style="height: 58px;line-height: 58px;" v-if="menuName == '时段'">
						时段分析图表 {{ this.date1 }} - {{ this.date2 }}
						<span style="color: #969696;" v-if="service == true">已选择服务费</span>
					</el-row>
					<el-row style="height: 58px;line-height: 58px;" v-if="menuName == '影片'">
						影片分析图表 {{ this.date3 }}
						<span style="color: #969696;" v-if="service == true">已选择服务费</span>
					</el-row>
					<el-table
						v-if="menuName == '时段'"
						:data="tableData"
						v-loading="tableloading"
						:header-cell-style="{ background: '#c1c1c1', color: '#ffffff' }"
						:row-class-name="tableRowClassName"
						stripe
						style="width: 100%"
					>
						<el-table-column :render-header="renderHeader" fixed width="50">
							<template slot-scope="scope">
								<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
								<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
							</template>
						</el-table-column>
						<el-table-column prop="date_str" label="日期" width="180"></el-table-column>
						<el-table-column prop="box_office" label="票房(万)" width="180" v-if="service == true">
							<template slot-scope="scope">
								<span>{{ Math.floor((scope.row.box_office / 10000) * 100) / 100 }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="box_office_no_service" label="票房(万)" width="180" v-if="service == false">
							<template slot-scope="scope">
								<span>{{ Math.floor((scope.row.box_office_no_service / 10000) * 100) / 100 }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="box_office_rate" label="票房环比">
							<template slot-scope="scope">
								<span v-if="scope.row.box_office_rate != null">{{ Math.round(scope.row.box_office_rate * 100 * 100) / 100 }}%</span>
							</template>
						</el-table-column>
						<el-table-column prop="playtimes" label="场次"></el-table-column>
						<el-table-column prop="playtimes_ring" label="场次环比">
							<template slot-scope="scope">
								<span v-if="scope.row.playtimes_ring != null && scope.row.playtimes_ring == 99999">--</span>
								<span v-if="scope.row.playtimes_ring != null && scope.row.playtimes_ring != 99999">{{ scope.row.playtimes_ring }}%</span>
							</template>
						</el-table-column>
						<el-table-column prop="person_time" label="人次"></el-table-column>
						<el-table-column prop="person_time_rate" label="人次环比">
							<template slot-scope="scope">
								<span v-if="scope.row.person_time_rate != null">{{ Math.round(scope.row.person_time_rate * 100 * 100) / 100 }}%</span>
							</template>
						</el-table-column>
						<el-table-column prop="service_cost" label="服务费(万)">
							<template slot-scope="scope">
								<span>{{ Math.floor((scope.row.service_cost / 10000) * 100) / 100 }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="avg_ticket_price" label="平均票价"></el-table-column>
						<el-table-column prop="avg_screening_pserson" label="场均人次"></el-table-column>
						<el-table-column prop="attendance" label="上座率">
							<template slot-scope="scope">
								<span v-if="scope.row.attendance != null">{{ Math.round(scope.row.attendance * 100 * 100) / 100 }}%</span>
							</template>
						</el-table-column>
					</el-table>
					<el-table
						v-if="menuName == '影片'"
						:data="tableDatafilm"
						v-loading="tablefilmloading"
						:header-cell-style="{ background: '#c1c1c1', color: '#ffffff' }"
						:row-class-name="tableRowClassName"
						stripe
						style="width: 100%"
					>
						<el-table-column :render-header="renderHeader" fixed width="50">
							<template slot-scope="scope">
								<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
								<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
							</template>
						</el-table-column>
						<el-table-column prop="movie_name movie_id" label="影片名称" width="180">
							<template slot-scope="scope">
								<span @click="alink(scope.row.movie_id)">{{ scope.row.movie_name }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="box_office" label="实时票房(万)" width="180" v-if="service == true">
							<template slot-scope="scope">
								<span>{{ Math.floor((scope.row.box_office / 10000) * 100) / 100 }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="box_office_no_service" label="实时票房(万)" width="180" v-if="service == false">
							<template slot-scope="scope">
								<span>{{ Math.floor((scope.row.box_office_no_service / 10000) * 100) / 100 }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="box_office_rate" label="票房占比">
							<template slot-scope="scope">
								<span v-if="scope.row.box_office_rate != null">{{ Math.round(scope.row.box_office_rate * 100 * 100) / 100 }}%</span>
							</template>
						</el-table-column>
						<el-table-column prop="playtimes" label="场次"></el-table-column>
						<el-table-column prop="play_times" label="场次占比">
							<template slot-scope="scope">
								<span v-if="scope.row.play_times != null && scope.row.play_times == 99999">--</span>
								<span v-if="scope.row.play_times != null && scope.row.play_times != 99999">{{ scope.row.play_times }}%</span>
							</template>
						</el-table-column>
						<el-table-column prop="person_time" label="人次"></el-table-column>
						<el-table-column prop="person_time_rate" label="人次占比">
							<template slot-scope="scope">
								<span v-if="scope.row.person_time_rate != null">{{ Math.round(scope.row.person_time_rate * 100 * 100) / 100 }}%</span>
							</template>
						</el-table-column>
						<el-table-column prop="service_cost" label="服务费(万)">
							<template slot-scope="scope">
								<span>{{ Math.floor((scope.row.service_cost / 10000) * 100) / 100 }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="avg_ticket_price" label="平均票价"></el-table-column>
						<el-table-column prop="total_box_office" label="总票房(万)">
							<template slot-scope="scope">
								<span v-if="scope.row.total_box_office != null">{{ Math.floor((scope.row.total_box_office / 10000) * 100) / 100 }}</span>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
						background
						layout="prev, pager, next"
						:page-size="10"
						:total="totalPage"
						:current-page="filmpage"
						@current-change="handleCurrentChange"
					/>
				</el-tab-pane>
				<el-tab-pane label="电影排片" name="second">
					<el-row style="margin-top: 20px;">
						<span>日期：</span>
						<el-date-picker v-model="scheduleDate" type="date" placeholder="选择日期"></el-date-picker>
						<!-- <el-checkbox v-model="schedulechecked">服务费</el-checkbox> -->
						<el-button type="primary" @click="scheduleselect()">查询</el-button>
					</el-row>
					<el-row style="background: #ffffff;height: 400px;margin-top: 20px;">
						<el-row style="margin: 5px 0 0 10px;">
							影片分析图表 {{ this.date4 }}
							<!-- <span style="color: #969696;" v-if="scheduleservice == true">已选择服务费</span> -->
						</el-row>
						<el-row style="width: 100%; overflow-x: auto;padding: 0;margin: 0;">
							<div id="schedulecharts" style="min-width: 99%;height: 370px;padding: 0;margin: 0;" v-loading="schedulechartLoading"></div>
						</el-row>
					</el-row>
					<el-row style="height: 58px;line-height: 58px;">
						影片分析图表 {{ this.date4 }}
						<!-- <span style="color: #969696;" v-if="scheduleservice == true">已选择服务费</span> -->
					</el-row>
					<el-table
						:data="tableDataschedule"
						v-loading="tablescheduleloading"
						:header-cell-style="{ background: '#c1c1c1', color: '#ffffff' }"
						stripe
						style="width: 100%"
					>
						<el-table-column :render-header="renderHeader" fixed width="50">
							<template slot-scope="scope">
								<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
								<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
							</template>
						</el-table-column>
						<el-table-column prop="movie_name movie_id" label="影片名称" width="180">
							<template slot-scope="scope">
								<span @click="alink(scope.row.movie_id)">{{ scope.row.movie_name }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="days" label="上映天数" width="180">
							<template slot-scope="scope">
								<span v-if="scope.row.days == -99999">--</span>
								<span v-if="scope.row.days != -99999">{{ scope.row.days }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="movie_types" label="影片类型" width="180"></el-table-column>
						<el-table-column prop="total_playtimes" label="放映场次" width="180"></el-table-column>
						<el-table-column prop="playtimes_ring" label="场次环比">
							<template slot-scope="scope">
								<span v-if="scope.row.playtimes_ring != null && scope.row.playtimes_ring == 99999">--</span>
								<span v-if="scope.row.playtimes_ring != null && scope.row.playtimes_ring != 99999">{{ scope.row.playtimes_ring }}%</span>
							</template>
						</el-table-column>
						<el-table-column prop="extra_total_playtimes" label="放映总场次"></el-table-column>
					</el-table>
					<el-pagination
						style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
						background
						layout="prev, pager, next"
						:page-size="10"
						:total="scheduletotalPage"
						:current-page="schedulepage"
						@current-change="scheduleCurrentChange"
					/>
				</el-tab-pane>
			</el-tabs>
		</el-row>
	</div>
</template>

<script>
import moment from 'moment';
import echarts from 'echarts';
export default {
	data() {
		return {
			lastmenu: '',
			menuName: '时段',
			tableData: [],
			tableDatafilm: [],
			tableDataschedule: [],
			checked: false,
			schedulechecked: false,
			service: false,
			scheduleservice: false,
			filmDate: new Date('2019-03-06'),
			scheduleDate: new Date('2019-03-07'),
			date: [new Date('2019-03-05'), new Date('2019-03-15')], //查询时间
			date1: '',
			date2: '',
			date3: '',
			date4: '',
			scheduletotalPage:0,
			schedulepage:1,
			totalPage: 0,
			filmpage: 1,
			chartLoading: true,
			tableloading: true,
			tablefilmloading: true,
			tablescheduleloading: true,
			schedulechartLoading: true,
			activeName: 'first',
			id: '',
			render_data: [], //影院基本信息
			todayData: {
				avgPersonTimes:0,
				chainRanking:0,
				cityRanking:0,
				countryRanking:0,
				personTime:0,
				boxOffice:0
			} //影院今日统计
		};
	},
	created() {},
	mounted() {
		this.lastmenu = this.$route.query.lastmenu || '';
		this.getid();
		this.render(); //渲染页面
		this.gettimechartdata();
		this.Statistics();
		this.gettimetabledata();
		// this.getchartdata()
		// this.gettabledata()
	},
	methods: {
		// 修改表头图标
		renderHeader(h, { column }) {
			return h('i', {
				class: 'el-icon-setting'
			});
		},
		goPre() {
			// console.log('===============返回上一级菜单')
			this.$router.go(-1);
		},
		//获取影院id
		getid() {
			this.date1 = moment(this.date[0]).format('YYYY年MM月DD');
			this.date2 = moment(this.date[1]).format('YYYY年MM月DD');
			this.date4 = moment(this.scheduleDate).format('YYYY年MM月DD');
			this.id = this.$route.query.id;
		},
		//表格第一行显示蓝色
		tableRowClassName({ row, rowIndex }) {
			if (rowIndex === 0) {
				return 'warning-row';
			}
			return '';
		},
		//影院基础信息
		render() {
			let _this = this;
			_this
				.$http({
					url: _this.$http.adornUrl('/web/cinemadetailpage/getCinemaById/' + _this.id),
					method: 'post',
					data: {}
				})
				.then(res => {
					if (res.data.code === 0) {
						_this.render_data = res.data.data;
					} else {
						_this.render_data = [];
					}
				});
		},
		// 获取今日统计的数据
		Statistics() {
			let _this = this;
			_this
				.$http({
					url: _this.$http.adornUrl('/web/cinemadetailpage/getBaseStatistics/' + _this.id),
					method: 'post',
					data: {}
				})
				.then(res => {
					if (res.data.code === 0) {
						_this.todayData = res.data.data;
					} else {
						_this.data = [];
						alert('暂无数据');
					}
				});
		},
		//生成影片票房时段图表
		draw(name, data) {
			var option3 = {
				tooltip: {
					trigger: 'axis',
					formatter: function(data) {
						console.log(data);
						var result = '';
						result += data[0].name + '<br>';
						for (var i = 0; i < data.length; i++) {
							if (i == data.length - 1) {
								result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + 'W';
							} else {
								result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + 'W<br>';
							}
						}
						return result;
					}
				},
				grid: {
					top: '21%',
					bottom: '5%',
					right: '60',
					left: '60',
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
				// legend: {
				// 	data: ['票房'],
				// 	right: '2%'
				// },
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						// axisLabel: {
						//    interval:0,
						//    rotate:40
						// },
						data: name
					}
				],
				yAxis: {
					name: '万元               ',
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
				series: [
					{
						name: '票房',
						type: 'line',
						data: data
					}
				]
			};
			this.chartBar = echarts.init(document.getElementById('charts'));
			this.chartBar.setOption(option3, true);
			window.addEventListener('resize', () => {
				this.chartBar.resize();
			});
			this.chartLoading = false;
		},
		//生成影片票房影片图表
		moviedraw(name, data) {
			var option3 = {
				tooltip: {
					trigger: 'axis',
					formatter: function(data) {
						console.log(data);
						var result = '';
						result += data[0].name + '<br>';
						for (var i = 0; i < data.length; i++) {
							if (i == data.length - 1) {
								result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + 'W';
							} else {
								result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + 'W<br>';
							}
						}
						return result;
					}
				},
				grid: {
					top: '21%',
					bottom: '5%',
					right: '60',
					left: '60',
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
				// legend: {
				// 	data: ['票房'],
				// 	right: '2%'
				// },
				xAxis: [
					{
						type: 'category',
						// boundaryGap: false,
						// axisLabel: {
						//    interval:0,
						//    rotate:40
						// },
						data: name
					}
				],
				yAxis: {
					name: '万元               ',
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
				series: [
					{
						name: '票房',
						barWidth: '25',
						type: 'bar',
						data: data
					}
				]
			};
			this.chartBar = echarts.init(document.getElementById('charts'));
			this.chartBar.setOption(option3, true);
			window.addEventListener('resize', () => {
				this.chartBar.resize();
			});
			this.chartLoading = false;
		},
		//获取时段图表数据
		gettimechartdata() {
			this.$http({
				url: this.$http.adornUrl(
					'web/cinemadetailpage/getDuringAnalysis?size=999999&cinemaId=' +
						this.id +
						'&startDate=' +
						moment(this.date[0]).format('YYYY-MM-DD') +
						'&endDate=' +
						moment(this.date[1]).format('YYYY-MM-DD')
				),
				method: 'POST'
			})
				.then(({ data }) => {
					var names = [],
						datas = [];
					if(data.page.tota!=0){
						document.getElementById('charts').style.width = data.page.records.length * 90 + 'px';
						for (var i = 0; i < data.page.records.length; i++) {
							names.push(data.page.records[i].date_str);
							if (this.service == false) {
								// console.log(i,data.page.records[i].box_office_no_service)
								datas.push(data.page.records[i].box_office_no_service / 10000);
							} else {
								datas.push(data.page.records[i].box_office / 10000);
							}
						}
					}else{
						
					}
					this.draw(names, datas);
				})
				.catch(err => {
					// console.log('请求失败：');
				});
		},
		//获取时段表格数据
		gettimetabledata() {
			this.$http({
				url: this.$http.adornUrl(
					'web/cinemadetailpage/getDuringAnalysis?cinemaId=' +
						this.id +
						'&startDate=' +
						moment(this.date[0]).format('YYYY-MM-DD') +
						'&endDate=' +
						moment(this.date[1]).format('YYYY-MM-DD') +
						'&current=' +
						this.filmpage
				),
				method: 'POST'
			})
				.then(({ data }) => {
					if(data.page.tota!=0){
						data.page.records.unshift({
							box_office: data.extra.total_boxOfice,
							box_office_no_service: data.extra.total_boxOfice - data.extra.total_serviceCost,
							arranged_seating: data.extra.total_avgAttendance,
							person_time: data.extra.total_personTime,
							service_cost: data.extra.total_serviceCost,
							avg_ticket_price: data.extra.total_avgTicketPrice,
							avg_screening_pserson: data.extra.total_avgScreeningPserson,
							attendance: data.extra.total_avgAttendance,
							playtimes: data.extra.total_playtimes
						});
						this.tableData = data.page.records;
					}else{
						this.tableData = [];
					}
					this.tableloading = false;
					this.totalPage = data.page.total - 0;
				})
				.catch(err => {
					// console.log('请求失败：');
				});
		},
		//获取影片图表数据
		getfilmchartdata() {
			this.$http({
				url: this.$http.adornUrl('web/cinemadetailpage/getFilmAnalysis?size=999999&cinemaId=' + this.id + '&date=' + moment(this.filmDate).format('YYYY-MM-DD')),
				method: 'POST'
			})
				.then(({ data }) => {
					var names = [],
						datas = [];
					if(data.page.tota!=0){
						document.getElementById('charts').style.width = data.page.records.length * 90 + 'px';
						for (var i = 0; i < data.page.records.length; i++) {
							names.push(data.page.records[i].movie_name);
							if (this.service == false) {
								// console.log(i,data.page.records[i].box_office_no_service)
								datas.push(data.page.records[i].box_office_no_service / 10000);
							} else {
								datas.push(data.page.records[i].box_office / 10000);
							}
						}
					}else{
					}
					this.moviedraw(names, datas);
				})
				.catch(err => {
					// console.log('请求失败：');
				});
		},
		//获取影片表格数据
		getfilmtabledata() {
			this.$http({
				url: this.$http.adornUrl(
					'web/cinemadetailpage/getFilmAnalysis?cinemaId=' + this.id + '&date=' + moment(this.filmDate).format('YYYY-MM-DD') + '&current=' + this.filmpage
				),
				method: 'POST'
			})
				.then(({ data }) => {
					if(data.page.tota!=0){
						data.page.records.unshift({
							box_office: data.page.records[1].extra_box_office,
							box_office_no_service: data.page.records[1].extra_box_office - data.page.records[1].extra_service_cost,
							person_time: data.page.records[1].extra_person_time,
							service_cost: data.page.records[1].extra_service_cost,
							avg_ticket_price: data.page.records[1].extra_avg_ticket_price,
							playtimes: data.page.records[1].extra_playtimes
						});
						this.tableDatafilm = data.page.records;
					}else{
						this.tableDatafilm = [];
					}
					this.tablefilmloading = false;
					this.totalPage = data.page.total - 0;
				})
				.catch(err => {
					// console.log('请求失败：');
				});
		},
		//翻页
		handleCurrentChange(val) {
			this.tableloading = true;
			this.filmpage = val;
			if (name == '时段') {
				this.gettimetabledata();
			} else {
				this.getfilmtabledata();
			}
		},
		//点击查询
		select() {
			this.tableloading = true;
			this.chartLoading = true;
			this.date1 = moment(this.date[0]).format('YYYY年MM月DD');
			this.date2 = moment(this.date[1]).format('YYYY年MM月DD');
			this.date3 = moment(this.filmDate).format('YYYY年MM月DD');
			this.filmpage = 1;
			this.service = this.checked;
			if (name == '时段') {
				this.gettimetabledata();
				this.gettimechartdata();
			} else {
				this.getfilmtabledata();
				this.getfilmchartdata();
			}
		},
		//电影排片图表
		scheduledraw(name, data) {
			var option3 = {
				tooltip: {
					trigger: 'axis',
					// formatter: function(data) {
					// 	console.log(data);
					// 	var result = '';
					// 	result += data[0].name + '<br>';
					// 	for (var i = 0; i < data.length; i++) {
					// 		if (i == data.length - 1) {
					// 			result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + 'W';
					// 		} else {
					// 			result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + 'W<br>';
					// 		}
					// 	}
					// 	return result;
					// }
				},
				grid: {
					top: '21%',
					bottom: '5%',
					right: '60',
					left: '60',
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
				// legend: {
				// 	data: ['票房'],
				// 	right: '2%'
				// },
				xAxis: [
					{
						type: 'category',
						// boundaryGap: false,
						// axisLabel: {
						//    interval:0,
						//    rotate:40
						// },
						data: name
					}
				],
				yAxis: {
					name: '场次               ',
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
				series: [
					{
						name: '票房',
						barWidth: '25',
						type: 'bar',
						data: data
					}
				]
			};
			this.chartBarSchedule = echarts.init(document.getElementById('schedulecharts'));
			this.chartBarSchedule.setOption(option3, true);
			window.addEventListener('resize', () => {
				this.chartBarSchedule.resize();
			});
			this.schedulechartLoading = false;
		},
		//切换时段和影片
		chooseMenu(name) {
			this.menuName = name;
			this.checked = false;
			this.service = this.checked;
			this.tableloading = true;
			this.chartLoading = true;
			this.filmpage = 1;
			this.date3 = moment(this.filmDate).format('YYYY年MM月DD');
			if (name == '时段') {
				this.gettimetabledata();
				this.gettimechartdata();
			} else {
				this.getfilmtabledata();
				this.getfilmchartdata();
			}
		},
		//电影排片图表数据
		getchartdata() {
			this.$http({
				url: this.$http.adornUrl('web/cinemadetailpage/getFilmScheduleAnalysis?size=999999&cinemaId=' + this.id + '&date=' + moment(this.scheduleDate).format('YYYY-MM-DD')),
				method: 'POST'
			})
				.then(({ data }) => {
					var names = [],
						datas = [];
					document.getElementById('schedulecharts').style.width = data.page.records.length * 90 + 'px';
					for (var i = 0; i < data.page.records.length; i++) {
						names.push(data.page.records[i].movie_name);
						datas.push(data.page.records[i].total_playtimes)
					}
					this.scheduledraw(names, datas);
				})
				.catch(err => {
					// console.log('请求失败：');
				});
		},
		//电影排片列表
		gettabledata(){
			this.$http({
				url: this.$http.adornUrl(
					'web/cinemadetailpage/getFilmScheduleAnalysis?cinemaId=' + this.id + '&date=' + moment(this.scheduleDate).format('YYYY-MM-DD') + '&current=' + this.schedulepage
				),
				method: 'POST'
			})
				.then(({ data }) => {
					// data.page.records.unshift({
					// 	box_office: data.page.records[1].extra_box_office,
					// 	box_office_no_service: data.page.records[1].extra_box_office - data.page.records[1].extra_service_cost,
					// 	person_time: data.page.records[1].extra_person_time,
					// 	service_cost: data.page.records[1].extra_service_cost,
					// 	avg_ticket_price: data.page.records[1].extra_avg_ticket_price,
					// 	playtimes: data.page.records[1].extra_playtimes
					// });
					this.tablescheduleloading = false;
					this.scheduletotalPage = data.page.total - 0;
					if(data.page.total!=0){
						this.tableDataschedule = data.page.records;
					}else{
						this.tableDataschedule = [];
					}
				})
				.catch(err => {
					// console.log('请求失败：');
				});
		},
		//电影排片点击查询
		scheduleselect(){
			this.date4 = moment(this.scheduleDate).format('YYYY年MM月DD');
			this.tablescheduleloading = true;
			this.schedulechartLoading = true;
			this.schedulepage = 1;
			this.getchartdata();
			this.gettabledata();
		},
		//电影排片翻页
		scheduleCurrentChange(val){
			this.schedulepage=val
			this.gettabledata();
		},
		handleClick() {
			if(this.activeName=='second'){
				this.getchartdata();
				this.gettabledata()
			}
		},
		alink(id) {
			sessionStorage.setItem('movieId', id);
			this.$router.push({
				path: '/video',
				query: {
					id: id,
					lastmenu: '影院'
				}
			});
		},
	}
};
</script>

<style scoped>
.names {
	color: #959595;
}
/* .name {
	min-width: 70px;
	text-align: justify;
	text-align-last: justify;
} */
.name {
	display: inline-block;
	min-width: 70px;
	text-align: justify;
	height: 16px;
	vertical-align: middle;
}
.name:after {
	display: inline-block;
	content: '';
	padding-left: 100%;
}
.item {
	display: inline-block;
	border-bottom: 3px solid transparent;
}
.item-top {
	padding-left: 80px;
	font-size: 24px;
	font-family: SourceHanSansCN-Regular;
	white-space: nowrap;
	color: #cdcdcd;
}
.item-top span {
	font-size: 50px;
	font-family: Arial-BoldMT;
	font-weight: bold;
}
.item-btm {
	padding-left: 85px;
}
.item:hover {
	border-bottom: 3px solid #399bff;
}
.item:hover .item-top {
	color: #4c4c4c;
}
.three {
	background: url(./img/white/three.png) no-repeat left center;
}
.item:hover .three {
	background: url(./img/blue/three.png) no-repeat left center;
}
.one {
	background: url(./img/white/one.png) no-repeat left center;
}
.item:hover .one {
	background: url(./img/blue/one.png) no-repeat left center;
}
.two {
	background: url(./img/white/six.png) no-repeat left center;
}
.item:hover .two {
	background: url(./img/blue/six.png) no-repeat left center;
}
.four {
	background: url(./img/white/seven.png) no-repeat left center;
}
.item:hover .four {
	background: url(./img/blue/seven.png) no-repeat left center;
}
.five {
	background: url(./img/white/eight.png) no-repeat left center;
}
.item:hover .five {
	background: url(./img/blue/eight.png) no-repeat left center;
}
.six {
	background: url(./img/white/nine.png) no-repeat left center;
}
.item:hover .six {
	background: url(./img/blue/nine.png) no-repeat left center;
}
.text_hover {
	cursor: pointer;
}
</style>

<style>
.warning-row {
	color: #1389d1;
}
</style>
