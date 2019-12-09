<template>
	<div style="overflow: hidden;position: relative">
		<el-row class="row-m20-p20">
			<el-col :span="24">
				<el-button type="primary" size="small">制作机构</el-button>
				<el-button type="info" size="small">发行机构</el-button>
				<el-button type="info" size="small">影院投资管理公司</el-button>
				<el-button type="info" size="small">院线公司</el-button>
			</el-col>
		</el-row>
		<!-- 表格 -->
		<el-row class="row-m20-p20">
			<el-col :span="24">
				<el-card>
					<div slot="header" style="margin:0 14px;" class="clearfix">
						<span style="float: left;font-size:23px">制作机构</span>
						<!-- <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button> -->
						<!-- <el-button type="text" class="card-extra" style="color:#3295D9; font-size: 12px; line-height: 30px;">更多指标+</el-button> -->
					</div>
					<div>
						<el-table :data="tableData" v-loading="loading" style="width: 100%; font-size:18px" stripe="true" row-class-name="table-row" header-row-class-name="table-header" :header-cell-style='headerCellStyle' >
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
							<el-table-column type="index" label="排名" width="120px">
								<template slot-scope="scope">
									<span>{{ scope.$index + 1 + (page - 1) * 10 }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="companyName" label="机构"></el-table-column>
							<el-table-column prop="totalPercent" label="市场份额"></el-table-column>
							<el-table-column prop="changePercent" label="同比变化"></el-table-column>
							<el-table-column prop="thisBoxOffice" label="参与制作作品总票房（万）"></el-table-column>
							<el-table-column prop="releaseSum" label="上映作品数"></el-table-column>
							<el-table-column prop="recordSum" label="立项作品数"></el-table-column>
							<el-table-column prop="threeDimensionsSum" label="3D作品数"></el-table-column>
							<el-table-column prop="date" label="制作中项目阶段"></el-table-column>
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
				<span>日期:</span>
				<el-date-picker size="small" v-model="date" align="right" type="year" placeholder="选择年"></el-date-picker>
        <span>作品数: </span>
				<el-select size="small" v-model="number" placeholder="请选择" style="width: 120px;">
					<el-option v-for="item in ages" :key="item" :label="item" :value="item"></el-option>
				</el-select>
				<span style="margin-left:56px">机构名称：</span>
				<el-input type="text" size="small" placeholder="请输入" style="width:120px"></el-input>
				<el-button size="small" type="primary" @click="getBoxoffice()">查询</el-button>

			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'boxOfficeAdvertising',
	components: {},
	data() {
		return {
			headerCellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
			page: 1,
			totalPage: 0,
			loading:true,
			date: new Date(),
			isSearching: false,
      tableData: [],
      ages: ['0~10', '10~20', '20~30', '30~40', '40~50', '50~60', '60~70', '70~80', '80~90', '90~100', '100~110', '110~120'],
		};
	},
	created() {
		window.addEventListener('setItem', () => {
			this.newVal = sessionStorage.getItem('watchStorage');
			this.isSearching = this.newVal;
		});
	},
	mounted() {
		this.getdata();
	},
	methods: {
    renderHeader(h, { column }) {
        return h('i', {
          class: 'el-icon-setting'
        })
      },
		getdata() {
			this.$http({
				url: this.$http.adornUrl('web/movietrade/companyStatistics?size=10&current=' + this.page + '&companyTypeInMovie=1'),
        method: 'POST',
        data: {
          companyTypeInMovie: '1',
          pastYear: '',
          movieCount: '',
          companyName: ''
        }
			})
				.then(({ data }) => {
					this.loading = false;
					this.tableData = data.page.records;
					this.totalPage = data.page.total;
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		//分页
		handleCurrentChange(val) {
			this.loading = true;
			this.page = val;
			this.getdata();
		},
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
