<template>
	<div style="overflow: hidden;width: 100%;position: relative;">
		<!-- 图表  剧集-->
		<el-row style="background: #ffffff;padding: 0;margin: 20px;">
			<el-col :span="24" style="padding: 0">
				<div style="padding: 15px 20px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
					<div class="title-l">
						<el-button type="text" style="font-size: 23px; color: #333;">剧集类型占比</el-button>
						<el-button type="text">{{start}}至 {{end}}</el-button>
					</div>
					<el-button style="float: right;" type="text" class="download" icon="el-icon-hysj-xiazai"></el-button>
				</div>
				<div id="J_chartLineBox" style="height: 400px" v-loading='chartbarLoading'></div>
			</el-col>
		</el-row>
		<!-- 图表  电影-->
		<el-row style="background: #ffffff;padding: 0;margin: 20px;">
			<el-col :span="24" style="padding: 0">
				<div style="padding: 15px 20px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
					<div class="title-l">
						<el-button type="text" style="font-size: 23px; color: #333;">电影类型占比</el-button>
						<el-button type="text">{{start}}至 {{end}}</el-button>
					</div>
					<el-button style="float: right;" type="text" class="download" icon="el-icon-hysj-xiazai"></el-button>
				</div>
				<div id="J_chartLineBox_movie" style="height: 400px" v-loading='chartbarMovieLoading'></div>
			</el-col>
		</el-row>
		<!-- 图表  综艺类型占比-->
		<el-row style="background: #ffffff;padding: 0;margin: 20px;">
			<el-col :span="24" style="padding: 0">
				<div style="padding: 15px 20px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
					<div class="title-l">
						<el-button type="text" style="font-size: 23px; color: #333;">综艺类型占比</el-button>
						<el-button type="text">{{start}}至 {{end}}</el-button>
					</div>
					<el-button style="float: right;" type="text" class="download" icon="el-icon-hysj-xiazai"></el-button>
				</div>
				<div id="J_chartLineBox_variety" style="height: 400px" v-loading='chartbarVarietyLoading'></div>
			</el-col>
		</el-row>
		<!-- 图表  综艺类型占比-->
		<el-row style="background: #ffffff;padding: 0;margin: 20px;">
			<el-col :span="24" style="padding: 0">
				<div style="padding: 15px 20px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
					<div class="title-l">
						<el-button type="text" style="font-size: 23px; color: #333;">动漫类型占比</el-button>
						<el-button type="text">{{start}}至 {{end}}</el-button>
					</div>
					<el-button style="float: right;" type="text" class="download" icon="el-icon-hysj-xiazai"></el-button>
				</div>
				<div id="J_chartLineBox_mechains" style="height: 400px" v-loading='chartbarMechainsLoading'></div>
			</el-col>
		</el-row>
		<div class="cover" v-if="isSearching == 'true'" />
		<div class="search" v-if="isSearching == 'true'">
			<div class="search-box">
				<span>日期：</span>
				<el-date-picker size="small" v-model="date" @change="getNewDate" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
				<span>媒体：</span>
				<el-select size="small" v-model="regionnw" placeholder="请选择" style="width: 150px;">
					<el-option v-for="item in region" :key="item.id" :label="item.nameF" :value="item.id"></el-option>
				</el-select>
        <span>类型：</span>
				<el-select size="small" v-model="attributenow" placeholder="请选择" style="width: 100px;">
					<el-option v-for="item in attribute" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
				<el-button size="small" type="primary" @click="getBoxoffice()">查询</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import echarts from 'echarts';
export default {
	// name: "boxOfficeIntelligence",
	components: {},
	data() {
		return {
			regionnw: '',
      region: [],
      attributenow: '',
      attribute: [],
			isSearching: false,
      date: [new Date('2019-04-20'), new Date('2019-04-25')],
      start: '2019-04-20', // 显示页面的开始时间
      end: '2019-04-25', // 结束时间
      chartbarLoading: true,
      chartbarMovieLoading: true,
      chartbarVarietyLoading: true,
      chartbarMechainsLoading: true,
			chartbar: null, //剧集类型占比
			chartbarMovie: null, //电影类型占比
			chartbarVariety: null, //综艺类型占比
			chartbarMechains: null //动漫类型占比
		};
	},
	created() {
		window.addEventListener('setItem', () => {
			this.newVal = sessionStorage.getItem('watchStorage');
			this.isSearching = this.newVal;
		});
	},
	mounted() {
    // this.CurentTime(this.date)
		this.getdate('1');
		this.getdate('2');
		this.getdate('3');
		this.getdate('4');
		this.initChartBar();
		this.initChartBar_movie();
		this.initChartBar_variety();
		this.initChartBar_mechains();
    this.getmedia()
    this.getattribute();
	},
	methods: {
    getNewDate(val) {
      // console.log(val)
      this.start = this.CurentTime(val[0])
      this.end = this.CurentTime(val[1])
      // console.log(start, end)
    },
    //获取类型
		getattribute() {
			this.$http({
				url: this.$http.adornUrl('/web/videotype/listAll/4'),
				method: 'POST'
			})
				.then(({ data }) => {
					this.attribute = data.list;
				})
				.catch(err => {
					console.log('请求失败：');
				});
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
		//剧集类型占比
		initChartBar(names, media, datas) {
			var option = {
				color: ['#3fb1e3', '#6be6c1', '#a0a7eb', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '2%',
					right: '2%',
					containLabel: true
				},
				legend: {
					bottom: 20,
					right: 120,
					itemWidth: 25,
					itemHeight: 3,
					data: media
				},
				xAxis: [
					{
						type: 'category',
            data: names,
            axisLabel: {
              'interval': 0,
              'rotate': 20
            },
					}
				],
				yAxis: [
					{
						type: 'value'
					}
				],
				series: datas
			};
			this.chartBar = echarts.init(document.getElementById('J_chartLineBox'));
      this.chartBar.setOption(option, true);
      this.chartbarLoading = false
			window.addEventListener('resize', () => {
				this.chartBar.resize();
			});
		},
		//电影类型占比
		initChartBar_movie(names, media, datas) {
			var option = {
				color: ['#3fb1e3', '#6be6c1', '#a0a7eb', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '2%',
					right: '2%',
					containLabel: true
				},
				legend: {
					bottom: 20,
					right: 120,
					itemWidth: 25,
					itemHeight: 3,
					data: media
				},
				xAxis: [
					{
						type: 'category',
						data: names
					}
				],
				yAxis: [
					{
						type: 'value',
						min: 0,
						minInterval: 50
					}
				],
				series: datas
			};
			this.chartbarMovie = echarts.init(document.getElementById('J_chartLineBox_movie'));
      this.chartbarMovie.setOption(option, true);
      this.chartbarMovieLoading = false
			window.addEventListener('resize', () => {
				this.chartbarMovie.resize();
			});
		},
		//综艺类型占比
		initChartBar_variety(names, media, datas) {
			var option = {
				color: ['#3fb1e3', '#6be6c1', '#a0a7eb', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '2%',
					right: '2%',
					containLabel: true
				},
				legend: {
					bottom: 20,
					right: 120,
					itemWidth: 25,
					itemHeight: 3,
					data: media
				},
				xAxis: [
					{
						type: 'category',
						data: names
					}
				],
				yAxis: [
					{
						type: 'value',
						min: 0,
						minInterval: 50,
					}
				],
				series: datas
			};
			this.chartbarVariety = echarts.init(document.getElementById('J_chartLineBox_variety'));
      this.chartbarVariety.setOption(option, true);
      this.chartbarVarietyLoading = false
			window.addEventListener('resize', () => {
				this.chartbarVariety.resize();
			});
		},
		//动漫类型占比
		initChartBar_mechains(names, media, datas) {
			var option = {
				color: ['#3fb1e3', '#6be6c1', '#a0a7eb', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '2%',
					right: '2%',
					containLabel: true
				},
				legend: {
					bottom: 20,
					right: 120,
					itemWidth: 25,
					itemHeight: 3,
					data: media
				},
				xAxis: [
					{
						type: 'category',
						data: names
					}
				],
				yAxis: [
					{
						type: 'value',
						min: 0,
						minInterval: 50,
					}
				],
				series: datas
			};
			this.chartbarMechains = echarts.init(document.getElementById('J_chartLineBox_mechains'));
      this.chartbarMechains.setOption(option, true);
      this.chartbarMechainsLoading = false
			window.addEventListener('resize', () => {
				this.chartbarMechains.resize();
			});
		},
		//获取占比数据
		getdate(number) {
			// if (this.date == [] || this.date == undefined) {
			// 	var start = '';
			// 	var end = '';
			// } else {
			// 	var start = this.CurentTime(this.date[0]);
			// 	var end = this.CurentTime(this.date[1]);
			// }
			this.$http({
				url: this.$http.adornUrl('/web/channel/' + number + '/typeAnalyze'),
				method: 'POST',
				data: { startDate: this.start, endDate: this.end, from: this.regionnw }
			})
				.then(({ data }) => {
					var platform = [],
						platformdata = [],
						media = [];
					for (let i = 0; i < data.list.length; i++) {
						platform.push(data.list[i].platform);
						for (let j = 0; j < data.list[i].data.length; j++) {
							if (platformdata.length == 0) {
								platformdata.push({
									name: data.list[i].data[j].name,
									type: 'bar',
									barWidth: 20,
									stack: '排片分布',
									data: [data.list[i].data[j].num]
								});
								media.push(data.list[i].data[j].name);
							} else {
								for (var k = 0; k < platformdata.length; k++) {
									if (platformdata[k].name == data.list[i].data[j].name) {
										platformdata[k].data.push(data.list[i].data[j].num);
										break;
									} else if (k == platformdata.length - 1) {
										media.push(data.list[i].data[j].name);
										platformdata.push({
											name: data.list[i].data[j].name,
											type: 'bar',
											barWidth: 20,
											stack: '排片分布',
											data: [data.list[i].data[j].num]
										});
									}
								}
							}
						}
					}
					if (number == 1) {
						this.initChartBar(platform, media, platformdata);
					} else if (number == 2) {
						this.initChartBar_movie(platform, media, platformdata);
					} else if (number == 3) {
						this.initChartBar_variety(platform, media, platformdata);
					} else if (number == 4) {
						this.initChartBar_mechains(platform, media, platformdata);
					}
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		//获取媒体下拉
		getmedia() {
			this.$http({
				url: this.$http.adornUrl('/web/broadcast/0/listFrom'),
				method: 'GET'
			})
				.then(({ data }) => {
					console.log(data);
					this.region = data.listFrom;
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		//点击查询
		getBoxoffice() {
			this.getdate('1');
			this.getdate('2');
			this.getdate('3');
			this.getdate('4');
			this.isSearching = 'false';
		}
	}
};
</script>

<style scoped>
@import '../boxOffice/css/box-office.css';
@import '../boxOffice/css/shape.css';
@import '../boxOffice/css/legend.css';
@import '../boxOffice/css/color.css';
.title-l {
    float: left;
    color: #333;
  }

   .title-l .el-button:nth-of-type(1) {
    font-size: 23px;
    color: #333333;
  }

  .title-l .el-button:nth-child(2) {
    margin: 0 35px 0 26px;
    color: #333333;
  }
.cover {
	position: fixed;
	left: 0;
	top: 148px;
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
	top: 148px;
	width: 100%;
	z-index: 2000;
}
.search-box {
	height: 58px;
	line-height: 58px;
	margin: 0 auto;
	text-align: center;
}
</style>
