<template>
	<div style="position: relative">
		<el-row class="row-m20-p20">
			<el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
					<p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">
						各类型分布
						<span style="font-size: 16px;color: #666666;margin-left: 23px;">2018-11-13</span>
					</p>
					<i class="el-icon-hysj-xiazai" style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;"></i>
					<img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../img/icon_xianxing.png" alt="" />
					<img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../img/icon_zhuzhuang.png" alt="" />
				</div>
				<div id="each" style="height: 400px" v-loading='eachLoading'></div>
			</el-col>
			<el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-left: 10px solid #F5F5F5;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
					<p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">
						各类型年趋势
						<span style="font-size: 16px;color: #666666;margin-left: 23px;">2018-11-13</span>
					</p>
					<i class="el-icon-hysj-xiazai" style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;"></i>
					<img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../img/icon_xianxing.png" alt="" />
					<img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../img/icon_zhuzhuang.png" alt="" />
				</div>
				<div id="year" style="height: 400px" v-loading='yearLoading'></div>
			</el-col>
		</el-row>
		<el-row class="row-m20-p20">
			<el-col :span="24">
				<el-card>
					<div slot="header" style="margin:0 14px;" class="clearfix">
						<span style="float: left;font-size:23px">投资情报-制作中</span>
						<!-- <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button> -->
						<!-- <el-button type="text" class="card-extra" style="color:#3295D9; font-size: 14px; line-height: 30px;">更多指标+</el-button> -->
					</div>
					<div>
						<el-table
							:data="tableData"
							style="width: 100%; font-size:18px"
							stripe
							row-class-name="table-row"
							header-row-class-name="table-header"
							:header-cell-style="headerCellStyle"
							:cell-style="cellStyle"
							v-loading="loading"
						>
              <el-table-column :render-header="renderHeader" fixed width="80">
								<template slot-scope="scope">
									<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
									<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
							<el-table-column prop="name,id" label="影片名称" width="200px">
								<template slot-scope="scope">
									<a class="link text_hover" @click="alink(scope.row.id)" style="color:#3295D9;text-decoration:none">{{ scope.row.name }}</a>
								</template>
							</el-table-column>
							<el-table-column prop="maintype" label="主类型"></el-table-column>
							<el-table-column prop="director" label="导演"></el-table-column>
							<el-table-column prop="state" label="影片状态"></el-table-column>
							<el-table-column prop="productcompany" label="出品公司"></el-table-column>
							<el-table-column prop="productioncompany" label="制作公司"></el-table-column>
							<el-table-column width="120" prop="areaname" label="国家地区"></el-table-column>
							<el-table-column width="140" prop="showtime" label="拟上映年份"></el-table-column>
							<el-table-column prop="num" label="投资规模"></el-table-column>
							<el-table-column prop="actor" label="主演"></el-table-column>
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
		<div class="cover" v-if="isSearching == 'true'" />
		<div class="search" v-if="isSearching == 'true'">
			<div class="search-box">
				<span>拟上映日期:</span>
				<el-date-picker type="date" size="small" style="width:157px" format="yyyy-MM-dd" prefix-icon="none" v-model="date"></el-date-picker>
				<span>影片制式：</span>
				<el-select v-model="standard" placeholder="请选择" style="width:157px" size="small">
					<el-option v-for="item in standardOptions" :key="item.label" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<span>主类型：</span>
				<el-select v-model="mainType" placeholder="请选择" style="width:157px" size="small">
					<el-option v-for="item in listMovieCategoryOption" :key="item.label" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<span>影片状态：</span>
				<el-select v-model="citynow" placeholder="请选择" style="width:157px" size="small">
					<el-option v-for="item in movieStateOption" :key="item.label" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<span>影片名称：</span>
				<el-input type="text" size="small" v-model="name" placeholder="请输入影片名称" style="width:120px"></el-input>
				<el-button size="small" type="primary" @click="search()" style="margin-right: 77px;">查询</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
	name: 'boxOfficeProduction',
	components: {},
	data() {
		return {
      loading: true,
      eachLoading: true,
      yearLoading: true,
      citynow: '',
			name: '',
			mainType: '',
      standard: '',
      standardOptions: [],
      listMovieCategoryOption: [],
      movieStateOption: [],
			page: 1,
			totalPage: 10,
			cellStyle: { 'padding-left': 20 + 'px', 'padding-right': 15 + 'px' },
			headerCellStyle: { color: '#fff',backgroundColor: '#C1C1C1'},
			date: '',
			isSearching: false,
			chartLine: null,
			chartBar: null,
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
		this.productid = this.$cookie.get('productid');
		this.initChartLine();
		this.initChartYeay();
		// this.initChartMoves()
		// this.initChartSystem()
    this.gettableData();
    this.getmovStandard()
    this.getlistMovieCategory()
    this.getlistmovieState()
	},
	methods: {
    renderHeader(h, { column }) {
      return h('i', {
        class: 'el-icon-setting'
      })
    },
		//跳转影片详情
		//跳转影片详情
		alink (id) {
      sessionStorage.setItem('movieId', id);
      this.$router.push({
          path: '/video',
          query: {
            id: id,
            lastmenu: '投资情报'
          }
        })
		  // this.$router.push({name: 'video',params: {id: id}})
		},
    // 获取影片制式的列表/web/sysdict/movStandard
    getmovStandard() {
      this.$http({
        url: this.$http.adornUrl('web/movietrade/listMovieStandard'),
        method: 'GET'
      }).then(({data}) => {
        console.log(data)
        this.standardOptions = data.list
      })
    },
    // 获取主类型的列表/web/sysdict/listMovieCategory
    getlistMovieCategory() {
      this.$http({
        url: this.$http.adornUrl('/web/sysdict/listMovieCategory'),
        method: 'GET'
      }).then(({data}) => {
        console.log(data, '主类型')
        this.listMovieCategoryOption = data.dict
        // this.standardOptions = data.dict
      })
    },
    // 获取电影状态/web/sysdict/movieState
    getlistmovieState() {
      this.$http({
        url: this.$http.adornUrl('/web/sysdict/movieState'),
        method: 'GET'
      }).then(({data}) => {
        console.log(data)
        this.movieStateOption = data.dict
        // this.standardOptions = data.dict
      })
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
		//各类型分布
		initChartLine() {
			var option1 = {
				color:['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
				tooltip: {
					trigger: 'axis',
					formatter: function(params) {
						var result = '2018-11-23</br>';
						params.forEach(function(item) {
							result += item.marker + ' ' + item.value + '</br>';
						});
						return result;
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '10%',
					containLabel: true
				},
				toolbox: {
					feature: {}
				},
				xAxis: {
					// 'type': 'category',
					// 'boundaryGap': false,
					data: ['动作', '喜剧', '剧情', '动画', '科幻', '爱情', '奇幻', '记录片', '惊悚']
				},
				yAxis: {
					name: '票房（万）',
					type: 'value'
				},
				series: [
					{
						name: '票房',
						type: 'bar',
						barWidth: 10,
						data: [4000, 5000, 6000, 8000, 6000, 7000, 3000, 4000, 6000]
					}
				]
			};
			this.chartLine = echarts.init(document.getElementById('each'));
			this.chartLine.setOption(option1);
			window.addEventListener('resize', () => {
				this.chartLine.resize();
      });
      setTimeout(() => {
        this.eachLoading = false
      }, 500);

		},
		// 各类型年趋势
		initChartYeay() {
			var option2 = {
				color:['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					orient: 'vertical',
					right: 30,
					top: 80,
					data: ['未知', '小成本', '中成本', '超高成本', '中小成本', '中高成本', '高成本']
				},
				series: [
					{
						label: {
							normal: {
								formatter: '{d}%'
							}
						},
						name: '访问来源',
						type: 'pie',
						radius: ['50%', '70%'],
						center: ['30%', '50%'],
						data: [
							{ value: 335, name: '未知' },
							{ value: 310, name: '小成本' },
							{ value: 234, name: '中成本' },
							{ value: 135, name: '超高成本' },
							{ value: 1548, name: '中小成本' },
							{ value: 1548, name: '中高成本' },
							{ value: 1548, name: '高成本' }
						]
					}
				]
			};
			this.chartBar = echarts.init(document.getElementById('year'));
			this.chartBar.setOption(option2);
			window.addEventListener('resize', () => {
				this.chartBar.resize();
      });
      setTimeout(() => {
        this.yearLoading = false
      }, 500);
		},
		gettableData() {
			var params = new URLSearchParams();
      // params.showTime = this.CurentTime(this.date);
      var showtime = ''
      params.showTime = ''
			params.standard = this.standard;
			params.mainType = this.mainType;
			params.name = this.name;
			params.current = this.page;
			this.$http({
				url: this.$http.adornUrl('/web/movinvest/filming/' + this.productid +'?showTime=' + showtime + '&standard=' + this.standard + '&mainType=' + this.mainType + '&name=' + this.name),
				method: 'post',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: params
			})
				.then(({ data }) => {
					for (var i = 0; i < data.page.list.length; i++) {
						var time = data.page.list[i].showtime.split('-')[0];
						data.page.list[i].showtime = time;
					}
					this.loading = false;
					this.tableData = data.page.list;
          this.totalPage = data.page.totalCount;

				})
				.catch(err => {
					// console.log('请求失败：');
				});
		},
		//分页
		handleCurrentChange(val) {
			this.loading = true;
			this.page = val;
			this.gettableData();
		},
		//点击查询
		search() {
			this.loading = true;
      this.page = 1;
      // this.
			this.gettableData();
		}
	}
};
</script>

<style scoped>
@import '../css/box-office.css';
@import '../css/shape.css';
@import '../css/legend.css';
@import '../css/color.css';
.text_hover{
    cursor: pointer;
    display: inline-block;
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
</style>
