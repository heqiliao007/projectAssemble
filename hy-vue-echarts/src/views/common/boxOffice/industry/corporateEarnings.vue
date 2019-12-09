<template>
	<div style="overflow: hidden;position: relative;width: 100%;">
		<!-- 表格 -->
		<el-row style="background: #ffffff;padding: 0;margin: 20px;">
			<el-col :span="24" style="padding: 0">
				<div style="padding: 15px 20px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
					<!-- <div class="title-l"> -->
					<el-button type="text" style="font-size: 22px; color: #333;">营业总收入</el-button>
					<el-button type="text" style="color: #333;">2019</el-button>
					<el-button :type="one" @click="alterdata('grossRevenue')">营业总收入</el-button>
					<el-button :type="two" @click="alterdata('totalOperatingCosts')">营业总成本</el-button>
					<el-button :type="three" @click="alterdata('operatingProfit')">营业利润</el-button>
					<el-button :type="four" @click="alterdata('totalProfit')">利润总额</el-button>
					<el-button :type="five" @click="alterdata('netMargin')">净利润</el-button>
					<el-button :type="six" @click="alterdata('netMarginShareholders')">股东净利润</el-button>
					<el-button :type="seven" @click="alterdata('basicEps')">基本每股收益</el-button>
					<el-button>综合收益总额</el-button>
					<!-- </div> -->
					<!-- <div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;"> -->
					<!-- <p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">各类型分布 <span style="font-size: 16px;color: #666666;margin-left: 23px;">2018-11-13</span></p> -->
          <i class="iconfont iconxiazai" style="float: right;margin-top: 5px;font-size: 24px;margin-right: 42px;"></i>
          <i class="iconfont iconxianxingtu" style="float: right;margin-top: 5px; font-size: 24px;margin-right: 42px;"></i>
          <i class="iconfont iconhistogram-copy" style="float: right;margin-top: 5px;margin-right: 42px; font-size: 24px;"></i>
					<!-- <img style="float: right;margin-top: 5px;height: 23px;margin-right: 42px;" src="../img/icon_xianxing.png" alt="" />
					<img style="float: right;margin-top: 5px;height: 23px;margin-right: 42px;" src="../img/icon_zhuzhuang.png" alt="" /> -->
					<!-- </div> -->
					<!-- <el-button style="float: right;" type="text" class="download" icon="el-icon-hysj-xiazai"></el-button> -->
				</div>
				<div id="grossoperatingIncome" style="height: 400px" v-loading='chartloading'></div>
			</el-col>
		</el-row>
		<el-row class="row-m20-p20">
			<el-col :span="24">
				<el-card>
					<div slot="header" style="margin:0 14px;" class="clearfix">
						<span style="float: left;font-size:23px">公司财报</span>
						<!-- <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button> -->
						<!-- <el-button type="text" class="card-extra" style="color:#3295D9; font-size: 14px; line-height: 30px;">更多指标+</el-button> -->
					</div>
					<div>
						<el-table
              :data="tableData"
              style="width: 100%; font-size:18px"
              v-loading="loading"
              stripe
              row-class-name="table-row"
              header-row-class-name="table-header"
              :header-cell-style='headerCellStyle'
              >
              <el-table-column :render-header="renderHeader" fixed width="80">
								<template slot-scope="scope">
									<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
									<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
							<!-- <el-table-column prop="visitors" label="影片名称">
                <template slot-scope="scope">
                  <a class="link" style="color:#3295D9;text-decoration:none">{{scope.row.visitors}}</a>
                </template>
              </el-table-column> -->
							<el-table-column fixed width="200px" prop="companyName" label="公司"></el-table-column>
							<el-table-column width="180px" prop="grossRevenue" label="营业总收入（万）"></el-table-column>
							<el-table-column width="100px" prop="grossRevenuePercent" label="同比"></el-table-column>
							<el-table-column width="180px" prop="totalOperatingCosts" label="营业总成本（万）"></el-table-column>
							<el-table-column width="100px" prop="totalOperatingCostsPercent" label="同比"></el-table-column>
							<el-table-column width="180px" prop="operatingProfit" label="营业利润（万）"></el-table-column>
							<el-table-column width="100px" prop="operatingProfitPercent" label="同比"></el-table-column>
							<el-table-column width="180px" prop="totalProfit" label="利润总额（万）"></el-table-column>
							<el-table-column width="100px" prop="totalProfitPercent" label="同比"></el-table-column>
							<el-table-column width="180px" prop="netMargin" label="净利润（万）"></el-table-column>
							<el-table-column width="100px" prop="netMarginPercent" label="同比"></el-table-column>
							<el-table-column width="180px" prop="netMarginShareholders" label="属于上市公司股东的净利润（万）"></el-table-column>
							<el-table-column width="180px" prop="netMarginShareholdersPercent" label="同比"></el-table-column>
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
				<span>选择年份:</span>
				<el-date-picker v-model="year" align="right" type="year" placeholder="选择年"></el-date-picker>
				<span style="margin-left:56px">选择季度：</span>
				<el-select v-model="quarternow" placeholder="请选择">
					<el-option v-for="item in quarters" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<el-button type="primary" @click="getBoxoffice()">查询</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import echarts from 'echarts';

export default {
	name: 'boxOfficeAdvertising',
	components: {},
	data() {
		return {
      chartloading: true,
      headerCellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
			one:'primary',
			two:'',
			three:'',
			four:'',
			five:'',
			six:'',
			seven:'',
			names:[],
			grossRevenue:[],//营业总收入
			totalOperatingCosts:[],//营业总成本
			operatingProfit:[],//营业利润
			totalProfit:[],//利润总额
			netMargin:[],//净利润
			netMarginShareholders:[],//股东净利润
			basicEps:[],//基本每股收益
			loading:true,
			page: 1,
			totalPage: 1,
			quarternow: '',
			quarters: [
				{
					label: '第一季度',
					value: 1
				},
				{
					label: '第二季度',
					value: 2
				},
				{
					label: '第三季度',
					value: 3
				},
				{
					label: '第四季度',
					value: 4
				}
			],
			year: new Date(),
			isSearching: false,
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
		this.initChartBar();
		this.getData();
	},
	methods: {
    renderHeader(h, { column }) {
        return h('i', {
          class: 'el-icon-setting'
        })
      },
		initChartBar(names,datas,title) {
			var option = {
				color:['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				// grid: {
				//     left: '2%',
				//     right: '2%',
				//     containLabel: true
				// },
				legend: {
					bottom: 20,
					right: 20,
					itemWidth: 45,
					itemHeight: 3
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
						name: title
					}
				],
				series: [
					{
						name: title,
						type: 'bar',
						barWidth: 20,
						stack: '排片分布',
						data: datas
					}
				]
			};
			this.chartBar = echarts.init(document.getElementById('grossoperatingIncome'));
			this.chartBar.setOption(option, true);
			window.addEventListener('resize', () => {
				this.chartBar.resize();
      });
      this.chartloading = false
		},
		getData() {
			this.$http({
				url: this.$http.adornUrl('/web/movietrade/companyFinancial?historyYear='+this.year.getFullYear()+'&current='+this.page+'&size=10&quarter='+this.quarternow),
				method: 'GET'
			})
				.then(({ data }) => {
					this.loading = false;
					console.log(data);
					this.tableData = data.page.records;
					this.totalPage = Number(data.page.total)
					for (var i = 0; i < data.page.records.length; i++) {
						this.names.push(data.page.records[i].companyName)
						this.grossRevenue.push(data.page.records[i].grossRevenue)//营业总收入
						this.totalOperatingCosts.push(data.page.records[i].totalOperatingCosts)//营业总成本
						this.operatingProfit.push(data.page.records[i].operatingProfit)//营业利润
						this.totalProfit.push(data.page.records[i].totalProfit)//利润总额
						this.netMargin.push(data.page.records[i].netMargin)//净利润
						this.netMarginShareholders.push(data.page.records[i].netMarginShareholders)//股东净利润
						this.basicEps.push(data.page.records[i].basicEps)//基本每股收益
					}
					this.one='primary'
					this.two=''
					this.three=''
					this.four=''
					this.five=''
					this.six=''
					this.seven=''
					this.initChartBar(this.names,this.grossRevenue,'营业总收入（万）');
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		//分页
		handleCurrentChange(val) {
			this.names.length=0
			this.grossRevenue.length=0
			this.totalOperatingCosts.length=0
			this.operatingProfit.length=0
			this.totalProfit.length=0
			this.netMargin.length=0
			this.netMarginShareholders.length=0
			this.basicEps.length=0
			this.loading = true;
			this.page = val;
			this.getData();
		},
		//点击查询
		getBoxoffice(){
			this.names.length=0
			this.grossRevenue.length=0
			this.totalOperatingCosts.length=0
			this.operatingProfit.length=0
			this.totalProfit.length=0
			this.netMargin.length=0
			this.netMarginShareholders.length=0
			this.basicEps.length=0
			this.loading = true;
			this.page = 1;
			this.getData();
			this.isSearching = false;
		},
		//点击顶部切换图表数据
		alterdata(data){
			if(data=='grossRevenue'){
				this.one='primary'
				this.two=''
				this.three=''
				this.four=''
				this.five=''
				this.six=''
				this.seven=''
				this.initChartBar(this.names,this.grossRevenue,'营业总收入（万）');
			}else if(data=='totalOperatingCosts'){
				this.one=''
				this.two='primary'
				this.three=''
				this.four=''
				this.five=''
				this.six=''
				this.seven=''
				this.initChartBar(this.names,this.totalOperatingCosts,'营业总成本（万）');
			}else if(data=='operatingProfit'){
				this.one=''
				this.two=''
				this.three='primary'
				this.four=''
				this.five=''
				this.six=''
				this.seven=''
				this.initChartBar(this.names,this.operatingProfit,'营业利润（万）');
			}else if(data=='totalProfit'){
				this.one=''
				this.two=''
				this.three=''
				this.four='primary'
				this.five=''
				this.six=''
				this.seven=''
				this.initChartBar(this.names,this.totalProfit,'利润总额（万）');
			}else if(data=='netMargin'){
				this.one=''
				this.two=''
				this.three=''
				this.four=''
				this.five='primary'
				this.six=''
				this.seven=''
				this.initChartBar(this.names,this.netMargin,'净利润（万）');
			}else if(data=='netMarginShareholders'){
				this.one=''
				this.two=''
				this.three=''
				this.four=''
				this.five=''
				this.six='primary'
				this.seven=''
				this.initChartBar(this.names,this.netMarginShareholders,'股东净利润（万）');
			}else if(data=='basicEps'){
				this.one=''
				this.two=''
				this.three=''
				this.four=''
				this.five=''
				this.six=''
				this.seven='primary'
				this.initChartBar(this.names,this.basicEps,'基本每股收益（万）');
			}
		}
	}
};
</script>

<style scoped>
  @import '../css/box-office.css';
  @import '../css/shape.css';
  @import '../css/legend.css';
  @import '../css/color.css';
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
