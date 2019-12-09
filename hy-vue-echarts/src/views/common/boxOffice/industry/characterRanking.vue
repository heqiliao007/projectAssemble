<template>
	<div style="overflow: hidden;position: relative;width: 100%;">
		<!-- 表格 -->
		<el-row class="row-m20-p20">
			<el-col :span="24">
				<el-button :type="direct" size="small" @click="changenames('4')">导演</el-button>
				<el-button :type="supervise" size="small" @click="changenames('2')">监制</el-button>
				<el-button :type="producer" size="small" @click="changenames('3')">制片人</el-button>
				<el-button :type="actor" size="small" @click="changenames('1')">演员</el-button>
				<el-button :type="edit" size="small" @click="changenames('5')">编剧</el-button>
			</el-col>
		</el-row>
		<el-row class="row-m20-p20">
			<el-col :span="24">
				<el-card>
					<div slot="header" style="margin:0 14px;" class="clearfix">
						<span style="float: left;font-size:23px">{{title}}排行</span>
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
              :header-cell-style='headerCellStyle'
              v-loading='loading'>
              <el-table-column :render-header="renderHeader" fixed width="80">
								<template slot-scope="scope">
									<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
									<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
							<el-table-column width="100px" type="index" label="排名">
							  <template slot-scope="scope">
							    <span>{{scope.$index + 1 + (page-1) *10}}</span>
							  </template>
							</el-table-column>
							<el-table-column width="100px" prop="staffNameCn" :label="title">
                <template slot-scope="scope">
									<a class="link text_hover" @click="alink(scope.row)" style="color:#3295D9;text-decoration:none">{{ scope.row.staffNameCn }}</a>
								</template>
              </el-table-column>
							<el-table-column width="140px" prop="boxOfficeSum" label="票房（万）"></el-table-column>
							<el-table-column width="240px" prop="boxOfficeMax" label="单部影片最高票房（万）"></el-table-column>
							<el-table-column width="240px" prop="boxOfficeMin" label="单部影片最低票房（万）"></el-table-column>
							<el-table-column width="140px" prop="latestMovieNameCn" label="最新作品"></el-table-column>
							<el-table-column width="140px" prop="movieNumber" label="作品数"></el-table-column>
							<el-table-column width="140px" prop="prepareMovieNameCn" label="制作中项目"></el-table-column>
							<el-table-column prop="prepareMovieState" label="制作中项目阶段"></el-table-column>
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
				<span>作品类型:</span>
				<el-select size="small" v-model="typenow" placeholder="请选择" style="width: 120px;">
					<el-option v-for="item in type" :key="item.type" :label="item.typeName" :value="item.type"></el-option>
				</el-select>
				<span>影片制式:</span>
				<el-select size="small" v-model="standardnow" placeholder="请选择" style="width: 120px;">
					<el-option v-for="item in standard" :key="item.value" :label="item.label" :value="item.label"></el-option>
				</el-select>
				<span>姓名:</span>
				<el-input size="small" v-model="name" placeholder="请输入内容" style="width: 120px;"></el-input>
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
			title:'导演',
			loading:true,
			staffType: '4',
			direct: 'primary',
			supervise: '',
			producer: '',
			actor: '',
			edit:'',
			page: 1,
			totalPage: 0,
			standard: [],
			standardnow: '',
			type: [],
			typenow: '',
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
			date: '',
			isSearching: false,
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
		this.getcountries();
		this.gettype();
		this.getstandard();
    this.gettabledata();
    this.getlistFilmKind()
	},
	methods: {
    renderHeader(h, { column }) {
        return h('i', {
          class: 'el-icon-setting'
        })
      },
    // 跳转到演职人员详情页
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
		//获取类型
		gettype() {
			this.$http({
				url: this.$http.adornUrl('web/movietrade/listMovieType'),
				method: 'GET'
			})
				.then(({ data }) => {
					this.type = data.list;
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		//获取电影制式
		getstandard() {
			this.$http({
				url: this.$http.adornUrl('web/movietrade/listMovieStandard'),
				method: 'GET'
			})
				.then(({ data }) => {
					this.standard = data.list;
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		//获取表格数据
		gettabledata() {
			if(this.date==''||this.data==undefined){
				var day=''
			}else{
				var day=this.CurentTime(this.date)
			}
			this.$http({
				url: this.$http.adornUrl(
					'web/movietrade/personRank?size=10&current=' +
						this.page +
						'&staffType=' +
						this.staffType +
						'&standard=' +
						this.standardnow +
						'&movieType=' +
						this.typenow +
						'&gender='+
						this.gendernow+
						'&nationality='+
						this.countriesnow+
						'&staffName='+
						this.name+
						'&releaseDay='+
						day
				),
				method: 'GET'
			})
				.then(({ data }) => {
					this.loading=false
					this.tableData = data.page.records;
					this.totalPage = data.page.total;
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		//分页
		handleCurrentChange(val) {
			this.loading=true
			this.page = val;
			this.gettabledata();
		},
		//点击顶部切换图表
		changenames(id) {
			this.loading=true
			this.staffType = id;
			if (id == '4') {
				this.title='导演'
				this.direct = 'primary';
				this.supervise = '';
				this.producer = '';
				this.actor = '';
				this.edit='';
			} else if (id == '2') {
				this.title='监制'
				this.direct = '';
				this.supervise = 'primary';
				this.producer = '';
				this.actor = '';
				this.edit='';
			} else if (id == '3') {
				this.title='制片人'
				this.direct = '';
				this.supervise = '';
				this.producer = 'primary';
				this.actor = '';
				this.edit='';
			} else if (id == '1') {
				this.title='演员'
				this.direct = '';
				this.supervise = '';
				this.producer = '';
				this.edit='';
				this.actor = 'primary';
			} else if(id == '5'){
				this.title='编剧'
				this.edit='primary';
				this.direct = '';
				this.supervise = '';
				this.producer = '';
				this.actor = '';
			}
			this.page = 1;
			this.gettabledata();
		},
		//点击查询
		getBoxoffice(){
			this.loading=true
			this.page = 1;
			this.gettabledata();
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
	z-index: 666;
}
.search {
	background: #ffffff;
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 999;
}
.search-box {
	height: 58px;
	line-height: 58px;
	margin: 0 auto;
	text-align: center;
}
</style>
