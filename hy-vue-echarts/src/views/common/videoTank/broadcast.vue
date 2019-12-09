<template>
	<div style="overflow: hidden;width: 100%; margin-top: -20px;">
		<el-row style="background:#ffffff;height:58px;width:100%;margin:5px 0;padding:0 40px;">
			<el-col :span="4">
				<div style="line-height:58px;">
					<span>上线时间:</span>
					<el-date-picker v-model="time" type="date" size="small" placeholder="选择日期" @change="getBoxoffice()" style="width: 140px;"></el-date-picker>
				</div>
			</el-col>
			<el-col :span="4">
				<div style="line-height:58px;">
					<span>视频分类:</span>
					<el-select v-model="typenow" placeholder="请选择" style="width: 120px;">
						<el-option v-for="item in types" :key="item.code" :label="item.name" :value="item.code"></el-option>
					</el-select>
					<!-- <el-date-picker v-model="value1" type="se" size="small" placeholder="选择日期" @change="getBoxoffice()"></el-date-picker> -->
				</div>
			</el-col>
			<el-col :span="4">
				<div style="line-height:58px;">
					<span>渠道:</span>
					<el-select v-model="channelnow" placeholder="请选择" style="width: 120px;">
						<el-option v-for="item in channel" :key="item.id" :label="item.nameF" :value="item.id"></el-option>
					</el-select>
					<!-- <el-date-picker v-model="value1" type="se" size="small" placeholder="选择日期" @change="getBoxoffice()"></el-date-picker> -->
				</div>
			</el-col>
			<el-col :span="4">
				<div style="line-height:58px;">
					<span>视频状态:</span>
					<el-select v-model="statusnow" placeholder="请选择" style="width: 120px;">
						<el-option v-for="item in option1" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
			</el-col>
			<el-col :span="6">
				<div style="line-height:58px;">
					<span>搜索:</span>
					<el-input v-model="input" style="display: inline-block; width: 250px;" placeholder="请输入视频名称"></el-input>
				</div>
			</el-col>
			<el-col :span="2">
				<div style="line-height:58px;"><el-button type="primary" @click="search()">查询</el-button></div>
			</el-col>
		</el-row>
		<!-- 表格 -->
		<el-row class="row-m20-p20">
			<el-col :span="24">
				<el-card>
					<div slot="header" style="margin:0 14px;" class="clearfix">
						<span style="float: left;font-size:23px">播出情报</span>
						<!-- <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button> -->
						<!-- <el-button type="text" class="card-extra" style="color:#3295D9; font-size: 14px; line-height: 30px;">更多指标+</el-button> -->
					</div>
					<div>
						<el-table :data="tableData" style="width: 100%; font-size:18px" v-loading="loading" row-class-name="table-row" stripe header-row-class-name="table-header" :header-cell-style='headerCellStyle'>
              <el-table-column :render-header="renderHeader" fixed width="80">
								<template slot-scope="scope">
									<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
									<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
							<el-table-column prop="nameCn id" label="剧名">
								<template slot-scope="scope">
									<a class="link text_hover" @click="getdates(scope.row.id)" style="color:#3295D9;text-decoration:none">{{ scope.row.nameCn }}</a>
								</template>
							</el-table-column>
							<el-table-column prop="classify" label="视频分类"></el-table-column>
							<el-table-column prop="broadcastTime" label="播出日期"></el-table-column>
							<el-table-column prop="status" label="状态">
								<template slot-scope="scope">
									<span v-if="scope.row.status == 0">未知</span>
									<span v-if="scope.row.status == 1">项目暂停</span>
									<span v-if="scope.row.status == 2">前期筹备</span>
									<span v-if="scope.row.status == 3">拍摄中</span>
									<span v-if="scope.row.status == 4">后期制作中</span>
									<span v-if="scope.row.status == 5">制作完成</span>
									<span v-if="scope.row.status == 6">剧本</span>
									<span v-if="scope.row.status == 7">已上映</span>
									<span v-if="scope.row.status == 8">正在上映</span>
									<span v-if="scope.row.status == 9">备案</span>
								</template>
							</el-table-column>
							<el-table-column prop="type" label="类型"></el-table-column>
							<el-table-column prop="num" label="剧集数/时长"></el-table-column>
							<el-table-column prop="director" label="导演"></el-table-column>
							<el-table-column prop="actor" label="主演/嘉宾"></el-table-column>
							<el-table-column prop="startTime" label="开机时间"></el-table-column>
							<el-table-column prop="companyName" label="制作公司"></el-table-column>
							<el-table-column prop="media" label="播出媒体"></el-table-column>
						</el-table>
						<el-pagination
							style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
							background
							layout="prev, pager, next"
							:page-size="10"
							:total="totalPage"
							:current-page="Number(page)"
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
			loading: true,
			page: 1,
			totalPage: 1,
			time: new Date('2019-04-03'),
			channelnow: '',
			channel: [],
			typenow: '',
			types: [],
			input: '',
			value1: '1',
			option1: [
				{
					value: '0',
					label: '未知'
				},
				{
					value: '1',
					label: '项目暂停'
				},
				{
					value: '2',
					label: '前期筹备'
				},
				{
					value: '3',
					label: '拍摄中'
				},
				{
					value: '4',
					label: '后期制作中'
				},
				{
					value: '5',
					label: '制作完成'
				},
				{
					value: '6',
					label: '剧本'
				},
				{
					value: '7',
					label: '已上映'
				},
				{
					value: '8',
					label: '正在上映'
				},
				{
					value: '9',
					label: '备案'
				}
			],
			statusnow: '',
			tableData: []
		};
	},
	mounted() {
		this.getTypes();
		this.getchannel();
		this.getTabledate();
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
				url: this.$http.adornUrl('/web/broadcast/listClassify'),
				method: 'GET'
			})
				.then(({ data }) => {
					this.types = data.listClassify;
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		//获取渠道
		getchannel() {
			this.$http({
				url: this.$http.adornUrl('/web/broadcast/all/listFrom'),
				method: 'GET'
			})
				.then(({ data }) => {
					this.channel = data.listFrom;
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		//格式化数据
		formatting(msg) {
			var types = msg.replace(/\|/g, ',').split(',');
			console.log(types);
      var type = '';
      var reg=/,$/gi;
      // str=str.replace(reg,"");
			for (var j = 0; j < types.length; j++) {
				if (j % 2 && types[j] != '') {
          type += types[j] + ',';
        }
      }
      type = type.replace(reg,"");
			return type;
		},
		//获取列表数据
		getTabledate() {
			this.$http({
				url: this.$http.adornUrl('/web/broadcast/listbroadcast?current=' + this.page + '&size=10'),
				method: 'POST',
				data: {
					time: this.CurentTime(this.time),
					classify: this.typenow,
					from: this.channelnow,
					status: this.statusnow,
          name: this.input

				}
			})
				.then(({ data }) => {
					for (var i = 0; i < data.page.records.length; i++) {
						if (data.page.records[i].type != '') {
              data.page.records[i].type = this.formatting(data.page.records[i].type);
							data.page.records[i].director = this.formatting(data.page.records[i].director);
							data.page.records[i].actor = this.formatting(data.page.records[i].actor);
						}
					}
					console.log(data);
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
