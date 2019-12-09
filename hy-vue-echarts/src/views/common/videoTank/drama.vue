<template>
	<div style="overflow: hidden;position: relative;width: 100%;">
		<!-- 表格 -->
		<el-row class="row-m20-p20" style="position: relative;">
			<el-col :span="24">
				<el-card>
					<div slot="header" style="margin:0 14px;" class="clearfix">
						<span style="float: left;font-size:18px">播映指数排行</span>
						<!-- <i class="iconfont iconxiazai" style="font-size: 24px; float: right; color: #ccc; margin-top: 5px"></i> -->
						<!-- <el-button type="text" class="card-extra" style="color:#3295D9; font-size: 16px; line-height: 30px;">更多指标+</el-button> -->
					</div>
					<div>
						<el-table
							:data="tableData"
							style="width: 100%; font-size:18px"
							v-loading="loading"
              stripe
							row-class-name="table-row"
							header-row-class-name="table-header"
							highlight-current-row
              :header-cell-style='headerCellStyle'
						>
              <el-table-column :render-header="renderHeader" fixed width="80">
								<template slot-scope="scope">
									<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
									<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
							<el-table-column type="index" label="排名" width="100">
								<template slot-scope="scope">
									<span>{{ scope.$index + 1 + (page - 1) * 10 }}</span>
								</template>
							</el-table-column>
							<el-table-column width="220" prop="nameCn id" label="剧名">
								<template slot-scope="scope">
									<a class="link text_hover" @click="getdates(scope.row.id)" style="color:#3295D9;text-decoration:none">{{ scope.row.nameCn }}</a>
								</template>
							</el-table-column>
							<el-table-column width="150" prop="broadcastingIndex" label="播映指数"></el-table-column>
							<el-table-column width="150" prop="releaseDate" label="上线日期"></el-table-column>
							<el-table-column width="150" prop="attributeName" label="属性"></el-table-column>
							<el-table-column width="150" prop="mediaHot" label="媒体热度"></el-table-column>
							<el-table-column width="150" prop="userHot" label="用户热度"></el-table-column>
							<el-table-column width="150" prop="praiseDegree" label="好评度"></el-table-column>
							<!-- <el-table-column width="150" prop="type" label="观看度"></el-table-column> -->
							<el-table-column width="220" prop="formalNumber" label="当前播放量（万）">
								<template slot-scope="scope">
									<span>{{ scope.row.formalNumber / 10000 }}</span>
								</template>
							</el-table-column>
							<el-table-column width="220" prop="playNumber" label="累计播放量（万）">
								<template slot-scope="scope">
									<span>{{ scope.row.playNumber / 10000 }}</span>
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
				<span>日期：</span>
				<el-date-picker v-model="date" type="date" placeholder="选择日期" style="width: 150px;"></el-date-picker>
				<span>地区：</span>
				<el-select v-model="regionnw" placeholder="请选择" style="width: 150px;">
					<el-option v-for="item in region" :key="item" :label="item" :value="item"></el-option>
				</el-select>
				<span>上线时间：</span>
				<el-date-picker v-model="online" type="date" placeholder="开始日期" style="width: 150px;"></el-date-picker>
				<span>属性：</span>
				<el-select v-model="typenow" placeholder="请选择" style="width: 150px;">
					<el-option v-for="item in type" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
				<span>剧集名称：</span>
				<el-input v-model="name" placeholder="请输入名称" style="width: 150px;"></el-input>
				<el-button type="primary" @click="getBoxoffice()">查询</el-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "drama",
	components: {},
	data() {
		return {
      headerCellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
			typenow:'',
			regionnw:'',
			type:[],
      region:[],
      newVal: '',
			name:'',
			online:'',
			date: new Date('2019-04-24'),
			isSearching: false,
			loading: true,
			page: 1,
			totalPage: 0,
			currentRow: null,
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
		this.getregion();
		this.gettableList();
		this.gettype();
	},
	methods: {
    renderHeader(h, { column }) {
      return h('i', {
        class: 'el-icon-setting'
      })
    },
		//获取地区
		getregion(){
			this.$http({
				url: this.$http.adornUrl(
					'/web/videocontent/listCountry'
				),
				method: 'POST'
			})
				.then(({ data }) => {
          console.log(data, '==============剧集地区')
					this.region=data.list
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		//获取属性
		gettype(){
			this.$http({
				url: this.$http.adornUrl(
					'/web/videoattribute/listAll/1'
				),
				method: 'POST'
			})
				.then(({ data }) => {
					this.type=data.list
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
		//点击剧名跳转详情页
		getdates(val) {
      console.log(val);
      sessionStorage.setItem('dramaId', val)
			this.$router.push({ path: '/videoTank/dramaDail', query: { id: val, lastmenu: '内容分析'} });
		},
		//获取列表数据
		gettableList() {
			if(this.date==''||this.date == undefined){
				var curent=''
			}else{
				var curent=this.CurentTime(this.date)
			}
			if(this.online==''||this.online == undefined){
				var online=''
			}else{
				var online=this.CurentTime(this.online)
			}
			this.$http({
				url: this.$http.adornUrl(
					'/web/videocontent/list?categoryCode=1&size=10&startDate=' +
						curent +
						'&endDate='+curent
						+'&current=' +
						this.page +
						'&country=' +
						this.regionnw +
						'&attributeCode=' +
						this.typenow +
						'&releaseDate=' +
						online +
						'&videoName=' +
						this.name
				),
				method: 'POST'
			})
				.then(({ data }) => {
          console.log(data)
					this.loading = false;
					this.tableData = data.page.records;
					this.totalPage = Number(data.page.total);
				})
				.catch(err => {
					console.log('请求失败：', err);
				});
		},
		//分页
		handleCurrentChange(val) {
			this.loading = true;
			this.page = val;
			this.gettableList();
		},
		//点击查询
		getBoxoffice() {
			this.loading = true;
			this.page = 1;
			this.gettableList();
			this.isSearching='false'
		}
	}
};
</script>

<style scoped>
@import '../boxOffice/css/box-office.css';
@import '../boxOffice/css/shape.css';
@import '../boxOffice/css/legend.css';
@import '../boxOffice/css/color.css';
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
