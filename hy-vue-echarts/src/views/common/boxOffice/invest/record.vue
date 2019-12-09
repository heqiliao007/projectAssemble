<template>
	<div style="position: relative">
		<!-- 表格 -->
		<el-row class="row-m20-p20">
			<el-col :span="24">
				<el-card>
					<div slot="header" style="margin:0 14px;" class="clearfix">
						<span style="float: left;font-size:23px">投资情报-电影备案</span>
						<!-- <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button> -->
						<!-- <el-button type="text" class="card-extra" style="color:#3295D9; font-size: 14px; line-height: 30px;">更多指标+</el-button> -->
					</div>
					<div>
						<el-table
							:data="tableData"
							style="width: 100%; font-size:18px"
							stripe
							v-loading="loading"
							row-class-name="table-row"
							:cell-style="cellStyle"
							header-row-class-name="table-header"
							:header-cell-style="headerCellStyle"
						>
              <el-table-column :render-header="renderHeader" fixed width="80">
								<template slot-scope="scope">
									<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
									<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
							<el-table-column prop="record_number" label="备案号" min-width="260px"></el-table-column>
							<el-table-column prop="name,id" label="影片名称" min-width="200px">
								<template slot-scope="scope">
									<a class="link text_hover" @click="alink(scope.row.id)" style="color:#3295D9; text-decoration：none">{{ scope.row.name }}</a>
								</template>
							</el-table-column>
							<el-table-column prop="company" label="备案单位" min-width="350px"></el-table-column>
							<el-table-column prop="writer" label="编辑" min-width="200px"></el-table-column>
							<el-table-column prop="result" label="备案结果" min-width="170px"></el-table-column>
							<el-table-column prop="time" label="备案时间" min-width="150px"></el-table-column>
							<el-table-column prop="area" label="所属" min-width="200px"></el-table-column>
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
				<el-date-picker type="date" size="small" style="width:157px" format="yyyy-MM-dd" prefix-icon="none" v-model="date"></el-date-picker>
				<span>所属城市：</span>
				<el-select v-model="citynow" placeholder="请选择" size="small"><el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option></el-select>
				<span>影片名称：</span>
				<el-input v-model="name" type="text" size="small" placeholder="请输入影片名称" style="width:120px"></el-input>
				<el-button type="primary" @click="search()">查询</el-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'BoxOfficeRecord',
	components: {},
	data() {
		return {
			name: '',
			loading: true,
			citynow: '',
			page: 1,
			totalPage: 10,
			productid: '',
			options: [],
			cellStyle: { 'padding-left': 20 + 'px', 'padding-right': 15 + 'px' },
			headerCellStyle: { color: '#fff',backgroundColor: '#C1C1C1' },
			date: '',
			isSearching: false,
			tableData: []
		};
	},
	watch: {},
	created() {
		window.addEventListener('setItem', () => {
			this.newVal = sessionStorage.getItem('watchStorage');
			this.isSearching = this.newVal;
		});
	},
	mounted() {
		this.productid = this.$cookie.get('productid');
		this.getcitys();
		this.gettableData();
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
		//获取城市列表
		getcitys() {
			this.$http({
				url: this.$http.adornUrl('/web/movinvest/recareas/' + this.productid),
				method: 'get'
			})
				.then(({ data }) => {
					this.options = data.list;
				})
				.catch(err => {
					// console.log('请求失败：');
				});
		},
		//获取列表数据
		gettableData() {
			if(this.date==''||this.date==undefined||this.date==null){
				var day=''
			}else{
				var day=this.CurentTime(this.date)
			}
			this.$http({
				url: this.$http.adornUrl(
					'/web/movinvest/recpage/' + this.productid + '?current=' + this.page + '&area=' + this.citynow + '&name=' + this.name + '&date=' + day
				),
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			})
				.then(({ data }) => {
					for (var i = 0; i < data.page.list.length; i++) {
						var time = data.page.list[i].time.split(' ')[0];
						data.page.list[i].time = time;
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
			this.gettableData();
			this.isSearching = !this.isSearching;
			var data = this.isSearching;
			sessionStorage.setItem('isSearching', data);
			this.resetSetItem('watchStorage', data);
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
