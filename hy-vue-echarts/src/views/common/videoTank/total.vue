<template>
	<div style="position: relative;width: 97%;">
		<el-row class="row-m20-p20">
			<el-col :span="24">
				<el-button :type="all" size="small" @click="classflylist('all')">全部</el-button>
				<el-button :type="episode" size="small" @click="classflylist('1')">剧集</el-button>
				<el-button :type="variety" size="small" @click="classflylist('3')">综艺</el-button>
				<el-button :type="movie" size="small" @click="classflylist('2')">电影</el-button>
				<el-button :type="anime" size="small" @click="classflylist('4')">动漫</el-button>
			</el-col>
		</el-row>
		<el-row class="row-m20-p20">
			<el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
					<p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">
						全网热播榜
						<span style="font-size: 16px;color: #666666;margin-left: 23px;">{{start}} - {{end}}</span>
					</p>
				</div>
				<div style="min-height: 430px;">
					<el-table :data="allData" style="width: 100%; font-size:18px" v-loading="loadingAll" row-class-name="table-row" header-row-class-name="table-header" stripe :header-cell-style='headerCellStyle'>
						<el-table-column type="index" width="80" label="排名">
							<template slot-scope="scope">
								<span>{{ scope.$index + 1 + (pageAll - 1) * 10 }}</span>
							</template>
						</el-table-column>
						<el-table-column width="200px" prop="nameCn" label="名称">
							<template slot-scope="scope">
								<a class="link text_hover" @click="alink()" style="color:#3295D9;text-decoration:none">{{ scope.row.nameCn }}</a>
							</template>
						</el-table-column>
						<el-table-column width="100" prop="attribute" label="属性"></el-table-column>
						<el-table-column width="100" prop="num" label="播放次数"></el-table-column>
						<el-table-column width="120" prop="linkCompore" label="环比涨幅"></el-table-column>
						<el-table-column width="200" prop="platform" label="播放平台"></el-table-column>
					</el-table>
					<el-pagination
						style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
						background
						layout="prev, pager, next"
						:page-size="10"
						:total="totalPageAll"
						:current-page="pageAll"
						@current-change="currentChangeAll"
					/>
				</div>
			</el-col>
			<el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-left: 10px solid #F5F5F5;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
					<p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">
						爱奇艺热播榜
						<span style="font-size: 16px;color: #666666;margin-left: 23px;">{{start}} - {{end}}</span>
					</p>
				</div>
				<div style="min-height: 430px;">
					<el-table :data="aiData" style="width: 100%; font-size:18px" v-loading="loadingai" row-class-name="table-row" header-row-class-name="table-header" stripe :header-cell-style='headerCellStyle'>
						<el-table-column type="index" width="80" label="排名">
							<template slot-scope="scope">
								<span>{{ scope.$index + 1 + (pageai - 1) * 10 }}</span>
							</template>
						</el-table-column>
						<el-table-column width="200px" prop="nameCn" label="名称">
							<template slot-scope="scope">
								<a class="link text_hover" @click="alink()" style="color:#3295D9;text-decoration:none">{{ scope.row.nameCn }}</a>
							</template>
						</el-table-column>
						<el-table-column width="100" prop="attribute" label="属性"></el-table-column>
						<el-table-column width="100" prop="num" label="播放次数"></el-table-column>
						<el-table-column width="100" prop="linkCompore" label="环比涨幅"></el-table-column>
						<el-table-column width="220" prop="platform" label="播放平台"></el-table-column>
					</el-table>
					<el-pagination
						style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
						background
						layout="prev, pager, next"
						:page-size="10"
						:total="totalPageai"
						:current-page="pageai"
						@current-change="currentChangeai"
					/>
				</div>
			</el-col>
		</el-row>
		<el-row class="row-m20-p20">
			<el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
					<p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">
						腾讯热播榜
						<span style="font-size: 16px;color: #666666;margin-left: 23px;">{{start}} - {{end}}</span>
					</p>
				</div>
				<div style="min-height: 430px;">
					<el-table :data="tenData" style="width: 100%; font-size:18px" v-loading="loadingten" row-class-name="table-row" header-row-class-name="table-header" stripe :header-cell-style='headerCellStyle'>
						<el-table-column width="80" type="index" label="排名">
							<template slot-scope="scope">
								<span>{{ scope.$index + 1 + (pageten - 1) * 10 }}</span>
							</template>
						</el-table-column>
						<el-table-column width="200px" prop="nameCn" label="名称">
							<template slot-scope="scope">
								<a class="link text_hover" @click="alink()" style="color:#3295D9;text-decoration:none">{{ scope.row.nameCn }}</a>
							</template>
						</el-table-column>
						<el-table-column width="100" prop="attribute" label="属性"></el-table-column>
						<el-table-column width="100" prop="num" label="播放次数"></el-table-column>
						<el-table-column width="100" prop="linkCompore" label="环比涨幅"></el-table-column>
						<el-table-column width="220" prop="platform" label="播放平台"></el-table-column>
					</el-table>
					<el-pagination
						style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
						background
						layout="prev, pager, next"
						:page-size="10"
						:total="totalPageten"
						:current-page="pageten"
						@current-change="currentChangeten"
					/>
				</div>
			</el-col>
			<el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
					<p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">
						优酷热播榜
						<span style="font-size: 16px;color: #666666;margin-left: 23px;">{{start}} - {{end}}</span>
					</p>
					<i class="el-icon-hysj-xiazai" style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;"></i>
				</div>
				<div style="min-height: 430px;">
					<el-table :data="youData" style="width: 100%; font-size:18px" v-loading="loadingyou" row-class-name="table-row" header-row-class-name="table-header" stripe :header-cell-style='headerCellStyle'>
						<el-table-column type="index" width="80" label="排名">
							<template slot-scope="scope">
								<span>{{ scope.$index + 1 + (pageyou - 1) * 10 }}</span>
							</template>
						</el-table-column>
						<el-table-column width="200px" prop="nameCn" label="名称">
							<template slot-scope="scope">
								<a class="link text_hover" @click="alink()" style="color:#3295D9;text-decoration:none">{{ scope.row.nameCn }}</a>
							</template>
						</el-table-column>
						<el-table-column width="100" prop="attribute" label="属性"></el-table-column>
						<el-table-column width="100" prop="num" label="播放次数"></el-table-column>
						<el-table-column width="100" prop="linkCompore" label="环比涨幅"></el-table-column>
						<el-table-column width="220" prop="platform" label="播放平台"></el-table-column>
					</el-table>
					<el-pagination
						style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
						background
						layout="prev, pager, next"
						:page-size="10"
						:total="totalPageyou"
						:current-page="pageyou"
						@current-change="currentChangeyou"
					/>
				</div>
			</el-col>
		</el-row>
		<div class="cover" v-if="isSearching == 'true'" />
		<div class="search" v-if="isSearching == 'true'">
			<div class="search-box">
				<span>日期：</span>
				<el-date-picker v-model="date" type="daterange" @change="chooseDate" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
				<el-button type="primary" @click="getBoxoffice()">查询</el-button>
			</div>
		</div>
	</div>
</template>

<script>
// import echarts from 'echarts'
export default {
	name: 'boxOfficeTrend',
	components: {},
	data() {
		return {
      headerCellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
			all: 'primary',
			episode: '',
			variety: '',
			movie: '',
			anime: '',
			loadingAll: true,
			loadingai: true,
			loadingten: true,
			loadingyou: true,
			classfly: '',
			totalPageAll: 0,
			pageAll: 1,
			totalPageai: 0,
			pageai: 1,
			totalPageten: 0,
			pageten: 1,
			totalPageyou: 0,
			pageyou: 1,
			isSearching: false,
      date: [new Date('2019-04-20'), new Date('2019-04-30')],
      start: '',
      end: '',
			allData: [],
			aiData: [],
			tenData: [],
			youData: []
		};
	},
	created() {
		window.addEventListener('setItem', () => {
			this.newVal = sessionStorage.getItem('watchStorage');
			this.isSearching = this.newVal;
		});
	},
	mounted() {
		this.getdata('all', null, this.pageAll);
		this.getdata('platform', '1', this.pageai);
		this.getdata('platform', '2', this.pageyou);
		this.getdata('platform', '5', this.pageten);
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
    chooseDate (val) {
      this.start = this.CurentTime(this.date[0])
			this.end = this.CurentTime(this.date[1])
    },
		//获取数据
		getdata(number, id, page) {
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
				url: this.$http.adornUrl('/web/thermal/' + number + '/list'),
				method: 'POST',
				data: { startDate: start, endDate: end, platformId: id, size: '10', current: '' + page + '', classfly: this.classfly }
			})
				.then(({ data }) => {
					if (number == 'all') {
						this.loadingAll = false
						this.allData = data.page.records
						this.totalPageAll = Number(data.page.total)
					} else if (id == 1) {
						this.loadingai = false
						this.aiData = data.page.records
						this.totalPageai = Number(data.page.total)
					} else if (id == 2) {
						this.loadingyou = false
						this.youData = data.page.records
						this.totalPageyou = Number(data.page.total)
					} else if (id == 5) {
						this.loadingten = false
						this.tenData = data.page.records
						this.totalPageten = Number(data.page.total)
					}
				})
				.catch(err => {
					console.log('请求失败：')
				});
		},
		//全网分页
		currentChangeAll(val) {
			this.loadingAll = true;
			this.pageAll = val;
			this.getdata('all', null, this.pageAll);
		},
		//爱奇艺风分页
		currentChangeai(val) {
			this.loadingai = true;
			this.pageai = val;
			this.getdata('platform', '1', this.pageai);
		},
		//腾讯分页
		currentChangeten(val) {
			this.loadingten = true;
			this.pageten = val;
			this.getdata('platform', '5', this.pageten);
		},
		//优酷分页
		currentChangeyou(val) {
			this.loadingyou = true;
			this.pageyou = val;
			this.getdata('platform', '2', this.pageyou);
		},
		//跳转影片详情
		alink() {
			this.$router.push({ name: 'video' });
		},
		//点击查询
		getBoxoffice() {
			this.loadingyou = true;
			this.loadingten = true;
			this.loadingai = true;
			this.loadingAll = true;
			this.pageAll = 1;
			this.pageai = 1;
			this.pageyou = 1;
			this.pageten = 1;
			this.getdata('all', null, this.pageAll);
			this.getdata('platform', '1', this.pageai);
			this.getdata('platform', '2', this.pageyou);
			this.getdata('platform', '5', this.pageten);
			this.isSearching = false;
		},
		//点击顶部类型
		classflylist(type) {
			this.loadingyou = true;
			this.loadingten = true;
			this.loadingai = true;
			this.loadingAll = true;
			if (type == 'all') {
				this.classfly = '';
				this.all = 'primary';
				this.episode = '';
				this.variety = '';
				this.movie = '';
				this.anime = '';
			} else {
				this.classfly = '' + type + '';
				if (type == '1') {
					this.all = '';
					this.episode = 'primary';
					this.variety = '';
					this.movie = '';
					this.anime = '';
				} else if (type == '3') {
					this.all = '';
					this.episode = '';
					this.variety = 'primary';
					this.movie = '';
					this.anime = '';
				} else if (type == '2') {
					this.all = '';
					this.episode = '';
					this.variety = '';
					this.movie = 'primary';
					this.anime = '';
				} else if (type == '4') {
					this.all = '';
					this.episode = '';
					this.variety = '';
					this.movie = '';
					this.anime = 'primary';
				}
			}
			this.pageAll = 1;
			this.pageai = 1;
			this.pageyou = 1;
			this.pageten = 1;
			this.getdata('all', null, this.pageAll);
			this.getdata('platform', '1', this.pageai);
			this.getdata('platform', '2', this.pageyou);
			this.getdata('platform', '5', this.pageten);
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
.types {
	display: inline-block;
	width: 72px;
	height: 28px;
	margin-right: 10px;
	background: #3295d9;
	border-radius: 14px;
	line-height: 28px;
	color: #ffffff;
	font-size: 14px;
	text-align: center;
}
.types i {
	margin-left: 6px;
}
.cover {
	position: fixed;
	left: 0;
	top: 145px;
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
	top: 145px;
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
