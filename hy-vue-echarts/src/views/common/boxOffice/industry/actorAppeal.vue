<template>
	<div style="overflow: hidden;position: relative">
		<!-- 表格 -->
		<el-row class="row-m20-p20">
			<el-col :span="24">
				<el-card>
					<div slot="header" style="margin:0 14px;" class="clearfix">
						<span style="float: left;font-size:23px">演员号召力</span>
						<!-- <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button> -->
						<!-- <el-button type="text" class="card-extra" style="color:#3295D9; font-size: 12px; line-height: 30px;" @click="toMore">更多指标+</el-button> -->
					</div>
					<div>
						<el-table :data="tableData" v-loading="loading" style="width: 100%; font-size:18px" :header-cell-style='headerCellStyle' row-class-name="table-row" header-row-class-name="table-header">
              <el-table-column :render-header="renderHeader" fixed width="80">
								<template slot-scope="scope">
									<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
									<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
							<el-table-column type="index" label="排名" width="120px">
								<template slot-scope="scope">
									<span>{{ scope.$index + 1 + (page - 1) * 10 }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="staffNameCn" label="演员">
                <template slot-scope="scope">
									<a class="link text_hover" @click="alink(scope.row)" style="color:#3295D9;text-decoration:none">{{ scope.row.staffNameCn }}</a>
								</template>
              </el-table-column>
							<el-table-column prop="ticketapeal" label="票房号召力指数"></el-table-column>
							<el-table-column prop="movieNumber" label="主演作品数"></el-table-column>
							<el-table-column prop="boxOfficeSum" label="主演作品票房（万）"></el-table-column>
							<el-table-column prop="boxOfficeMax" label="主演最高票房（万）"></el-table-column>
							<el-table-column prop="latestMovieNameCn" label="最新主演作品"></el-table-column>
							<el-table-column prop="prepareMovieNameCn" label="制作中项目"></el-table-column>
							<el-table-column prop="prepareMovieState" label="制作中项目阶段">
								<!-- <template slot-scope="scope">
									<span v-if="scope.row.prepareMovieState == 1">拍摄中</span>
									<span v-if="scope.row.prepareMovieState == 2">上映中</span>
								</template> -->
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
				<span>日期:</span>
				<el-date-picker size="small" v-model="date" type="date" placeholder="选择日期"></el-date-picker>
				<span>性别:</span>
				<el-select size="small" v-model="gendernow" placeholder="请选择" style="width: 120px;">
					<el-option v-for="item in gender" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<span>片种:</span>
				<el-select size="small" v-model="filmKind" @change='choosefilmkind' placeholder="请选择">
					<el-option
					v-for="item in areaOptions"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
				<span>年龄:</span>
				<el-select size="small" v-model="agenow" placeholder="请选择" style="width: 120px;">
					<el-option v-for="item in ages" :key="item" :label="item" :value="item"></el-option>
				</el-select>
				<span>姓名:</span>
				<el-input size="small" v-model="name" placeholder="请输入内容" style="width: 120px;"></el-input>
				<el-button size="small" type="primary" @click="getBoxoffice()">查询</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import moreIndicators from '../../../common/moreIndicators/more_indicators';

export default {
	name: 'boxOfficeAdvertising',
	components: {
		moreIndicators
	},
	data() {
		return {
			headerCellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
			countries: [],
			countriesnow: '',
      gendernow: '',
      name: '',
			gender: [
				{
					label: '男',
					value: 1
				},
				{
					label: '女',
					value: 2
				},
				{
					label: '保密',
					value: 3
				}
			],
			agenow: '',
			ages: ['0~10', '10~20', '20~30', '30~40', '40~50', '50~60', '60~70', '70~80', '80~90', '90~100', '100~110', '110~120'],
			date: new Date(),
			page: 1,
      totalPage: 0,
      loading: true,
			isSearching: false,
			isShow: false,
      tableData: [],
      filmKind: '',
      filmKindCode: '', // 筛选条件-片种
      areaOptions: [
      ], // 片种列表
		};
	},
	created() {
		window.addEventListener('setItem', () => {
			this.newVal = sessionStorage.getItem('watchStorage');
			this.isSearching = this.newVal;
		});
	},
	mounted() {
		// this.getcountries();
    this.gettabledata();
    this.getlistFilmKind()
	},
	methods: {
    renderHeader(h, { column }) {
        return h('i', {
          class: 'el-icon-setting'
        })
      },
    // 获取片种类型接口
    getlistFilmKind () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/web/sysdict/listFilmKind'),
        method: 'GET'

      }).then( ({data}) => {
        console.log(data)
        if (data.code === 0) {
          _this.areaOptions = data.dict
          // _this.typeOptions = data.dict
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 选择片种
    choosefilmkind(val) {
      console.log(val)
      this.filmKindCode = val
    },
		//获取国籍
		getcountries() {
			this.$http({
				url: this.$http.adornUrl('web/movietrade/listStaffNationality'),
				method: 'GET'
			})
				.then(({ data }) => {
					this.countries = data.list;
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		toMore() {
			// console.log('跳转到更多指标')
			this.isShow = true;
		},
		// 关闭弹框
		handleClose(done) {
			console.log('关闭弹框');
		},
		gettabledata() {
			if (this.date == '' || this.data == undefined) {
				var day = '';
			} else {
				var day = this.CurentTime(this.date);
			}
			this.$http({
				url: this.$http.adornUrl(
					'web/movietrade/actorRank?size=10&current=' +
						this.page +
						'&gender=' +
						this.gendernow +
						'&nationality=' +
						this.countriesnow +
						'&staffName=' +
						this.name +
						'&releaseDay=' +
						day
				),
				method: 'GET'
			})
				.then(({ data }) => {
          this.loading = false;
          console.log('data', data)
					this.tableData = data.page.records;
					this.totalPage = Number(data.page.total);
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		//分页
		handleCurrentChange(val) {
			this.loading = true;
			this.page = val;
			this.gettabledata();
		},
		//点击查询
		getBoxoffice() {
			this.loading = true;
			this.page = 1;
			this.gettabledata();
    },
    //跳转验证人员详情
		alink (e) {
        console.log(e)
         this.$router.push({
          path: '/actor',
          query: {
            name: e.staffNameCn,
						lastmenu: '行业分析',
						movie: e.prepareMovieNameCn
          }
        })
				// this.$router.push({path:'/networkLiterature/networksDails'})
			},
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
