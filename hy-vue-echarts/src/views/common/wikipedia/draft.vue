<template>
	<div>
		<el-row style="margin-bottom: 20px;">
			<el-col :span="22" class="center">
				<div class="top"><span class="information">词条信息(草稿)</span></div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="22" class="center">
				<div style="background: #ffffff;margin-bottom: 80px;overflow: hidden;">
					<el-table :data="through" v-loading="loading" style="width: 100%" stripe :header-cell-style="{ background: '#C1C1C1', color: '#ffffff' }">
						<el-table-column prop="entry_nameentry_name" label="词条名" width="300px">
							<template slot-scope="scope">
								<a class="link" style="color:#0084CF;text-decoration:none">{{ scope.row.entry_name }}</a>
							</template>
						</el-table-column>
						<el-table-column prop="type_name" label="词条分类"></el-table-column>
						<el-table-column prop="save_date" label="保存时间"></el-table-column>
						<el-table-column prop="edit_count" label="编辑次数"></el-table-column>
						<el-table-column prop="entry_id" label="操作">
							<template slot-scope="scope">
								<a class="link" style="color:#3295D9;text-decoration:none">编辑</a>
								<a class="link" @click="delect(scope.row.entry_id)" style="color:#3295D9;text-decoration:none">删除</a>
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
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name: 'BoxOfficeRecord',
	components: {},
	data() {
		return {
			loading:true,
			totalPage:0,
			page:1,
			through: []
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
		this.gettableData()
	},
	methods: {
		//获取列表数据
		gettableData(){
			this.$http({
				url: this.$http.adornUrl('/web/entry/listOfDraftStatus?current='+this.page),
				method: 'POST'
			})
				.then(({ data }) => {
					this.loading=false
					this.through=data.page.records
					this.totalPage=data.page.total-0
				})
				.catch(err => {
					// this.$message.error('请求失败');
				});
		},
		//翻页
		handleCurrentChange(val){
			this.loading=true
			this.page=val
			this.gettableData()
		},
		//删除词条
		delect(id){
			this.$http({
				url: this.$http.adornUrl('/web/entry/delete?entryIds='+id),
				method: 'POST'
			})
				.then(({ data }) => {
					let _this=this
					_this.$message({
						message:'删除成功',
						onClose:function(){
							_this.gettableData()
						}
					});
				})
		}
	}
};
</script>

<style scoped>
.center {
	float: none;
	margin: 0 auto;
}
.top {
	margin-top: 42px;
}
.information {
	padding-bottom: 2px;
	border-bottom: 4px solid #40a9ff;
}
.item {
	text-align: center;
}
.item > img {
	display: inline-block;
}
.item_num {
	display: inline-block;
	vertical-align: middle;
	margin-left: 10px;
	font-size: 18px;
	color: #464646;
}
.item_num > span {
	display: block;
	font-size: 50px;
}
.create {
	display: block;
	margin: 20px auto 0;
}
.divider {
	width: 1px;
	height: 50px;
	background: #a3a3a3;
	float: right;
	margin-top: 20px;
}
.link{
	cursor: pointer;
}
</style>
