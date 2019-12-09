<template>
	<div style="overflow: hidden;width: 100%;position: relative;">
		<!-- 表格 -->
		<el-row class="row-m20-p20">
			<el-col :span="24">
				<el-card>
					<div slot="header" style="margin:0 14px;" class="clearfix">
						<span style="float: left;font-size:23px; line-height: 30px;">机构榜</span>
						<!-- <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button> -->
						<!-- <el-button type="text" class="card-extra" style="color:#3295D9; font-size: 14px; line-height: 30px;">更多指标+</el-button> -->
					</div>
					<div>
						<el-table :data="tableData" style="width: 97%; font-size:18px" v-loading="loading" row-class-name="table-row" stripe header-row-class-name="table-header" :header-cell-style='headerCellStyle'>
							<el-table-column type="index" label="排名" width="80px">
								<template slot-scope="scope">
									<span>{{ scope.$index + 1 + (page - 1) * 10 }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="companyName" label="公司名称"></el-table-column>
							<el-table-column prop="num" label="播放量"></el-table-column>
							<el-table-column prop="playProportion" label="播放占比"></el-table-column>
							<el-table-column prop="episodeNum" label="数量（集）"></el-table-column>
							<el-table-column prop="episodeProportion" label="集数市场份额">
								<template slot-scope="scope">
									<span>{{ Math.round(scope.row.episodeProportion * 100 * 1000) / 1000 + '%' }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="partNum" label="数量（部）"></el-table-column>
							<el-table-column prop="partProportion" label="部数市场份额">
								<template slot-scope="scope">
									<span>{{ Math.round(scope.row.partProportion * 100 * 1000) / 1000 + '%' }}</span>
								</template>
							</el-table-column>
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
				<span>选择年份：</span>
				<el-date-picker v-model="year" align="right" type="year" placeholder="选择年"></el-date-picker>
				<span>电视状态：</span>
				<el-select v-model="regionnw" placeholder="请选择" style="width: 150px;">
					<el-option v-for="item in region" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
				<span>剧集类型：</span>
				<el-select v-model="typenow" placeholder="请选择" style="width: 150px;">
					<el-option v-for="item in type" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
				<el-button type="primary" @click="getBoxoffice()">查询</el-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	// name: "boxOfficeIntelligence",
	components: {},
	data() {
		return {
      headerCellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
			region: [
				{
					id: '0',
					name: '未知'
				},
				{
					id: '1',
					name: '项目暂停'
				},
				{
					id: '2',
					name: '前期筹备'
				},
				{
					id: '3',
					name: '拍摄中'
				},
				{
					id: '4',
					name: '后期制作中'
				},
				{
					id: '5',
					name: '制作完成'
				},
				{
					id: '6',
					name: '剧本'
				},
				{
					id: '7',
					name: '已上映'
				},
				{
					id: '8',
					name: '正在上映'
				},
				{
					id: '9',
					name: '备案'
				}
			],
			type: [],
			regionnw: '',
			typenow: '',
			year: '',
			isSearching: false,
			loading: true,
			page: 1,
			totalPage: 0,
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
		this.getTypes();
		this.getTableData();
	},
	methods: {
		//获取剧集类型
		getTypes() {
			this.$http({
				url: this.$http.adornUrl('/web/videotype/listAll/1'),
				method: 'POST'
			})
				.then(({ data }) => {
					console.log(data);
					this.type = data.list;
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		//获取列表数据
		getTableData() {
			if (this.year == '' || this.year == undefined) {
				var years = '';
			} else {
				var years = '' + this.year.getFullYear() + '';
			}
			this.$http({
				url: this.$http.adornUrl('/web/thermal/organizationList'),
				method: 'POST',
				data: {
					year: years,
					type: this.typenow,
					status: this.regionnw,
					current: ''+this.page+''
				}
			})
				.then(({ data }) => {
					console.log(data);
					this.loading = false;
					this.total = Number(data.page.total);
					this.tableData = data.page.records;
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		//分页
		handleCurrentChange(val) {
			this.loading = true;
			this.page = val;
			this.getTableData();
		},
		//点击查询
		getBoxoffice() {
			this.loading = true;
			this.page = 1;
			this.getTableData();
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
	left: 0;
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
