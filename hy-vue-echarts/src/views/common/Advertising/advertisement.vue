<template>
	<div style="overflow: hidden;width: 100%; margin-top: -30px;">
		<el-row style="background:#ffffff;height:58px;width:100%;margin:5px 0;padding:0 40px; margin-top: 35px;">
			<el-col :span="4" style="line-height:58px;float:left; margin-right:15px">
				<span>上线时间:</span>
				<el-date-picker v-model="time" type="date" size="small" placeholder="选择日期" style="width: 130px;" @change="getBoxoffice()"></el-date-picker>
			</el-col>
			<el-col :span="4" style="line-height:58px;float:left; margin-right:5px">
				<span>视频分类：</span>
				<el-select size="small" v-model="typenow" placeholder="请选择" style="width: 100px;">
					<el-option v-for="item in types" :key="item.code" :label="item.name" :value="item.code"></el-option>
				</el-select>
			</el-col>
			<el-col :span="4" style="line-height:58px;float:left; margin-right:5px">
				<span>广告类型:</span>
				<el-select size="small" v-model="adtypenow" placeholder="请选择" style="width: 100px;">
					<el-option v-for="item in adtype" :key="item.code" :label="item.name" :value="item.code"></el-option>
				</el-select>
			</el-col>
			<el-col :span="4" style="line-height:58px;float:left; margin-right:5px">
				<span>品牌类型:</span>
				<el-select size="small" v-model="brandtypenow" placeholder="请选择" style="width: 100px;">
					<el-option v-for="item in brandtype" :key="item.code" :label="item.name" :value="item.code"></el-option>
				</el-select>
			</el-col>
			<!-- <el-col :span="4" style="line-height:58px;float:left; margin-right:15px">
				<span>播出平台:</span>
				<el-select v-model="channelnow" placeholder="请选择" style="width: 100px;">
					<el-option v-for="item in channel" :key="item.id" :label="item.nameF" :value="item.id"></el-option>
				</el-select>
			</el-col> -->
			<el-col :span="4" style="line-height:58px;float:left; margin-right:5px">
				<span>搜索：</span>
				<el-input size="small" v-model="input" style="display: inline-block; width: 160px;" placeholder="请输入视频名称"></el-input>
			</el-col>
			<el-col :span="2" style="float:right;line-height:58px;"><el-button type="primary" size="small" @click='search()'>查询</el-button></el-col>
		</el-row>
		<!-- 表格 -->
		<el-row class="row-m20-p20">
			<el-col :span="24">
				<el-card>
					<div slot="header" style="margin:0 14px;" class="clearfix">
						<span style="float: left;font-size:23px; margin-top: 5px;">广告情报</span>
						<!-- <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button> -->
						<!-- <el-button type="text" class="card-extra" style="color:#3295D9; font-size: 14px; line-height: 30px;">更多指标+</el-button> -->
					</div>
					<div>
						<el-table :data="tableData" v-loading="loading" style="width: 97%; font-size:18px" row-class-name="table-row" stripe header-row-class-name="table-header" :header-cell-style='headerCellStyle'>
              <el-table-column :render-header="renderHeader" fixed width="80">
								<template slot-scope="scope">
									<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
									<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
							<!-- <el-table-column prop="nameCn" label="作品名称"></el-table-column> -->
              <el-table-column prop="nameCn" label="影片名称">
                <template slot-scope="scope">
                  <a class="link text_hover" style="color:#3295D9;text-decoration:none">{{scope.row.nameCn}}</a>
                </template>
              </el-table-column>
							<el-table-column prop="brandName" label="品牌广告"></el-table-column>
							<el-table-column prop="compenyName" label="品牌公司"></el-table-column>
							<el-table-column prop="brandType" label="品牌类型"></el-table-column>
							<el-table-column prop="adType" label="广告类型"></el-table-column>
							<el-table-column prop="adInsertWay" label="植入方式"></el-table-column>
							<el-table-column prop="startDate" label="播出日期"></el-table-column>
							<el-table-column prop="channelName" label="演出平台"></el-table-column>
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
	</div>
</template>

<script>
export default {
	// name: "boxOfficeIntelligence",
	components: {},
	data() {
		return {
      headerCellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
			time:'',
			loading: true,
			page: 1,
			totalPage: 1,
			brandtypenow:'',
			brandtype:[],
			adtypenow:'',
			adtype:[],
			// channelnow:'',
			// channel:[],
			typenow:'',
			types:[],
			input: '',
			option1: [],
			value: '',
			value1: '1',
			tableData: []
		};
	},
	mounted() {
		this.getTypes();
		// this.getchannel();
		this.getAdTyoe();
		this.getBrandType();
		this.getTabledate()
	},
	methods: {
    renderHeader(h, { column }) {
      return h('i', {
        class: 'el-icon-setting'
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
		//点击剧名跳转详情页
		getdates(val) {
			console.log(val);
			this.$router.push({ path: '/videoTank/dramaDail', query: { id: val } });
			// this.currentRow = val;
		},
		//获取视频分类
		getTypes() {
			this.$http({
				url: this.$http.adornUrl('/web/videocategory/listWithoutVarietyShow'),
				method: 'GET'
			})
				.then(({ data }) => {
					this.types = data.list;
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		// //获取播出平台
		// getchannel() {
		// 	this.$http({
		// 		url: this.$http.adornUrl('/web/broadcast/listFrom'),
		// 		method: 'GET'
		// 	})
		// 		.then(({ data }) => {
		// 			this.channel = data.listFrom;
		// 		})
		// 		.catch(err => {
		// 			console.log('请求失败：');
		// 		});
		// },
		//获取广告分类
		getAdTyoe(){
			this.$http({
				url: this.$http.adornUrl('/web/advertising/listAdType'),
				method: 'GET'
			})
				.then(({ data }) => {
					this.adtype = data.listFrom;
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		//获取品牌类型
		getBrandType(){
			this.$http({
				url: this.$http.adornUrl('/web/advertising/listBrandType'),
				method: 'GET'
			})
				.then(({ data }) => {
					this.brandtype = data.listFrom;
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		//获取列表数据
		getTabledate() {
			if(this.time==''){
				var now=''
			}else{
				var now=this.CurentTime(this.time)
      }
      // let data = {
			// 		size: '10',
			// 		current: this.page,
			// 		time: now,
			// 		classify: this.typenow,
			// 		from: this.channelnow,
			// 		name: this.input,
			// 		adType:this.adtypenow,
			// 		brandType:this.brandtypenow
			// 	}
			this.$http({
				url: this.$http.adornUrl('/web/advertising/listad?current=' + this.page + '&size=10'),
        method: 'POST',
        data: this.$http.adornData({
					'time': now,
					'classify': this.typenow,
					'from': this.channelnow,
					'name': this.input,
					'adType':this.adtypenow,
					'brandType':this.brandtypenow
        })
        // data: {
        //   size: 10,
        //   current: 1,
        //   time: '',
        //   classify: '',
        //   from: '',
        //   name: '',
        //   adType: '',
        //   brandType: ''
        // }
				// data: JSON.stringify(data)
			})
				.then(({ data }) => {
					this.loading = false;
					this.totalPage = Number(data.page.total);
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
			this.getTabledate();
		},
		//点击查询
		search() {
			this.loading = true;
			this.page = '1';
			this.getTabledate();
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
</style>
