<template>
  <div style="overflow: hidden;width: 100%;position: relative;">
    <!-- 图表  剧集-->
    <el-row style="padding: 0;margin: 5px;">
      <el-button :type="amount" @click="amountClick()">播放量</el-button>
      <el-button :type="number" @click="numberClick()">数量</el-button>
    </el-row>
    <el-row style="background: #ffffff;padding: 0;margin: 5px;">
      <el-col :span="24" style="padding: 0">
        <div style="padding: 5px 20px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
          <div class="title-l">
            <el-button type="text">剧集类型趋势</el-button>
            <el-button type="text">{{start}}——{{end}}</el-button>
          </div>
          <el-button style="float: right;" type="text" class="download" icon="el-icon-hysj-xiazai"></el-button>
        </div>
        <div id="J_chartbarBox5" style="height: 400px; width: 97%;" v-loading='loading'></div>
      </el-col>
    </el-row>
    <el-row style="background: #ffffff;padding: 0;margin: 5px;">
      <el-col :span="24" style="padding: 0">
        <div style="padding: 5px 20px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
          <div class="title-l">
            <el-button type="text">电影类型趋势</el-button>
            <el-button type="text">{{start}}——{{end}}</el-button>
          </div>
          <el-button style="float: right;" type="text" class="download" icon="el-icon-hysj-xiazai"></el-button>
        </div>
        <div id="J_chartbarBox5_movie" style="height: 400px; width: 97%;" v-loading='loading'></div>
      </el-col>
    </el-row>
    <el-row style="background: #ffffff;padding: 0;margin: 5px;">
      <el-col :span="24" style="padding: 0">
        <div style="padding: 5px 20px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
          <div class="title-l">
            <el-button type="text">综艺类型趋势</el-button>
            <el-button type="text">{{start}}——{{end}}</el-button>
          </div>
          <el-button style="float: right;" type="text" class="download" icon="el-icon-hysj-xiazai"></el-button>
        </div>
        <div id="J_chartbarBox5_variety" style="height: 400px; width: 97%;" v-loading='loading'></div>
      </el-col>
    </el-row>
    <!-- 图表  动漫-->
    <el-row style="background: #ffffff;padding: 0;margin: 5px;">
      <el-col :span="24" style="padding: 0">
        <div style="padding: 5px 20px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
          <div class="title-l">
            <el-button type="text">动漫类型趋势</el-button>
            <el-button type="text">{{start}}——{{end}}</el-button>
          </div>
          <el-button style="float: right;" type="text" class="download" icon="el-icon-hysj-xiazai"></el-button>
        </div>
        <div id="J_chartbarBox5_machins" style="height: 400px; width: 97%;" v-loading='loading'></div>
        <!-- <div id="J_chartbarBox5_machins" style="height: 400px"></div> -->
      </el-col>
    </el-row>
		<div class="cover" v-if="isSearching == 'true'" />
		<div class="search" v-if="isSearching == 'true'">
			<div class="search-box">
				<span>日期：</span>
				<el-date-picker v-model="date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
				<span>媒体：</span>
				<el-select v-model="regionnw" placeholder="请选择" style="width: 150px;">
					<el-option v-for="item in region" :key="item.id" :label="item.nameF" :value="item.id"></el-option>
				</el-select>
				<el-button type="primary" @click="getBoxoffice()">查询</el-button>
			</div>
		</div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
    // name: "boxOfficeIntelligence",
  components: {
  },
  data () {
    return {
      amount:'primary',
      start: '',
      end: '',
			number:'',
			regionnw: '',
			region: [],
      isSearching: false,
      loading: true,
			date: [new Date('2019-04-20'), new Date('2019-04-25')],
      chartbar: null, //剧集趋势
      chartbarMovie: null, //电影趋势
      chartbarVariety: null, //综艺趋势
      chartbarMechains: null, //动漫趋势
    }
  },
	created() {
		window.addEventListener('setItem', () => {
			this.newVal = sessionStorage.getItem('watchStorage');
			this.isSearching = this.newVal;
		});
	},
  mounted() {
    let _this = this
		_this.getDate('1')
		_this.getDate('2')
		_this.getDate('3')
		_this.getDate('4')
    _this.initChartBar()
    _this.initChartBar_movie()
    _this.initChartBar_variety()
    _this.initChartBar_machins()
		_this.getmedia()
  },
  methods: {
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
		//剧集趋势
    initChartBar (names, dates) {
      var option = {
          'tooltip': {
            'trigger': 'axis',
            // 'formatter': '{c0}W'
          },
           xAxis: {
               type: 'category',
             boundaryGap: false,
               data: names
           },
           yAxis: {
             type: 'value',
             name:' 单位（万）',
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
               data:['剧集类型趋势'],
               right:30,
               bottom:10,
               show: false,
               icon: "rect",
               itemWidth: 40,
               itemHeight: 4,
           },
           series: [{
               // name:'无双',
             symbol: 'none',
             itemStyle : {
               normal : {
                 color:'#3fb1e3'
               }
             },
               data: dates,
               type: 'line'
           }]
      };
       this.chartbar = echarts.init(document.getElementById('J_chartbarBox5'))
       this.chartbar.setOption(option,true)
       window.addEventListener('resize', () => {
           this.chartbar.resize()
      })
    },
    //电影趋势
		initChartBar_movie (names, dates) {
      var option = {
          'tooltip': {
            'trigger': 'axis',
            // 'formatter': '{c0}W'
          },
           xAxis: {
               type: 'category',
             boundaryGap: false,
               data: names
           },
           yAxis: {
             type: 'value',
             name:' 单位（万）',
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
               data:['剧集类型趋势'],
               right:30,
               bottom:10,
               show: false,
               icon: "rect",
               itemWidth: 40,
               itemHeight: 4,
           },
           series: [{
               name:'无双',
             symbol: 'none',
             itemStyle : {
               normal : {
                 color:'#6be6c1'
               }
             },
               data: dates,
               type: 'line'
           }]
      };
       this.chartbarMovie = echarts.init(document.getElementById('J_chartbarBox5_movie'))
       this.chartbarMovie.setOption(option,true)
       window.addEventListener('resize', () => {
           this.chartbarMovie.resize()
      })
    },
    //综艺趋势
		initChartBar_variety (names, dates) {
      var option = {
          'tooltip': {
            'trigger': 'axis',
            // 'formatter': '{c0}W'
          },
           xAxis: {
               type: 'category',
             boundaryGap: false,
               data: names
           },
           yAxis: {
             type: 'value',
             name:' 单位（万）',
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
               data:['剧集类型趋势'],
               right:30,
               bottom:10,
               show: false,
               icon: "rect",
               itemWidth: 40,
               itemHeight: 4,
           },
           series: [{
               name:'无双',
             symbol: 'none',
             itemStyle : {
               normal : {
                 color:'#a0a7eb'
               }
             },
               data: dates,
               type: 'line'
           }]
      };
       this.chartbarVariety = echarts.init(document.getElementById('J_chartbarBox5_variety'))
       this.chartbarVariety.setOption(option,true)
       window.addEventListener('resize', () => {
           this.chartbarVariety.resize()
      })
    },
    //动漫趋势
		initChartBar_machins (names, dates) {
      var option = {
          'tooltip': {
            'trigger': 'axis',
            // 'formatter': '{c0}W'
          },
           xAxis: {
               type: 'category',
             boundaryGap: false,
               data: names
           },
           yAxis: {
             type: 'value',
             name:' 单位（万）',
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
               data:['剧集类型趋势'],
               right:30,
               bottom:10,
               show: false,
               icon: "rect",
               itemWidth: 40,
               itemHeight: 4,
           },
           series: [{
               name:'无双',
             symbol: 'none',
             itemStyle : {
               normal : {
                 color:'#626c91'
               }
             },
               data: dates,
               type: 'line'
           }]
      };
       this.chartbarMechains = echarts.init(document.getElementById('J_chartbarBox5_machins'))
       this.chartbarMechains.setOption(option,true)
       window.addEventListener('resize', () => {
           this.chartbarMechains.resize()
      })
    },
    //获取播放量数据
		getDate(number){
			if (this.date == [] || this.date == undefined) {
				var start = '';
				var end = '';
			} else {
				var start = this.CurentTime(this.date[0]);
				var end = this.CurentTime(this.date[1]);
      }
      this.start = start
      this.end = end
			this.$http({
				url: this.$http.adornUrl('/web/channel/' + number + '/typeTendencyPlay'),
				method: 'POST',
				data: { startDate: start, endDate: end, from: this.regionnw }
			})
				.then(({ data }) => {
					var names=[],dates=[];
					for(var i=0;i<data.list.length;i++){
						names.push(data.list[i].date)
						dates.push(data.list[i].playNum/10000)
					}
					if (number == 1) {
            this.loading = false
						this.initChartBar(names, dates);
					} else if (number == 2) {
						this.initChartBar_movie(names, dates);
					} else if (number == 3) {
						this.initChartBar_variety(names, dates);
					} else if (number == 4) {
						this.initChartBar_machins(names, dates);
					}
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		//获取数量数据
		getNumDate(number){
			if (this.date == [] || this.date == undefined) {
				var start = '';
				var end = '';
			} else {
				var start = this.CurentTime(this.date[0]);
				var end = this.CurentTime(this.date[1]);
			}
			this.$http({
				url: this.$http.adornUrl('/web/channel/' + number + '/typeTendencyNum'),
				method: 'POST',
				data: { startDate: start, endDate: end, from: this.regionnw }
			})
				.then(({ data }) => {
					var names=[],dates=[];
					for(var i=0;i<data.list.length;i++){
						names.push(data.list[i].date)
						dates.push(data.list[i].typeNum/10000)
					}
					if (number == 1) {
            this.initChartBar(names, dates);
            this.loading = false
					} else if (number == 2) {
						this.initChartBar_movie(names, dates);
					} else if (number == 3) {
						this.initChartBar_variety(names, dates);
					} else if (number == 4) {
						this.initChartBar_machins(names, dates);
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
      this.loading = true
			this.getdate('1');
			this.getdate('2');
			this.getdate('3');
			this.getdate('4');
			this.isSearching = 'false';
		},
		//点击播放量
		amountClick(){
      this.loading = true
			this.amount='primary'
			this.number=''
			this.getDate('1')
			this.getDate('2')
			this.getDate('3')
			this.getDate('4')
		},
		//点击数量
		numberClick(){
      this.loading = true
			this.amount=''
			this.number='primary'
			this.getNumDate('1')
			this.getNumDate('2')
			this.getNumDate('3')
			this.getNumDate('4')
		}
  },
}
</script>

<style scoped>
  @import '../boxOffice/css/box-office.css';
  @import '../boxOffice/css/shape.css';
  @import '../boxOffice/css/legend.css';
  @import '../boxOffice/css/color.css';
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
