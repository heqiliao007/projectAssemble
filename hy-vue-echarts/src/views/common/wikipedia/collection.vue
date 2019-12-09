<template>
	<div>
		<el-row style="margin-bottom: 20px;">
			<el-col :span="22" class="center">
				<div class="top"><span class="information">收藏词条</span></div>
			</el-col>
		</el-row>
		<el-row class="lists">
			<el-col :span="22" class="item" v-for="item in datas" :key="item.entry_id">
				<p class="item_title">
					<span>{{item.entry_name}}</span>
				</p>
				<p class="item_intro">简介：{{item.introduction}}</p>
				<p class="item_type">{{item.create_date}} | 类型：{{item.type_name}}</p>
				<img src="./img/delect.png" @click="delect(item.entry_id)" class="delect">
			</el-col>
		</el-row>
		<el-row class="lists">
			<el-col :span="22" class="item" style="padding: 0;">
				<el-pagination
					style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
					background
					layout="prev, pager, next"
					:page-size="10"
					:total="totalPage"
					:current-page="page"
					@current-change="handleCurrentChange"
				/>
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
			totalPage:0,
			page:1,
			datas:[]
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
		this.getData()
	},
	methods: {
		getData(){
			this.$http({
				url: this.$http.adornUrl('/web/entry/listOfFavorite?current='+this.page),
				method: 'POST'
			})
				.then(({ data }) => {
					this.datas=data.page.records
					this.totalPage=data.page.total-0
				})
				.catch(err => {
					// this.$message.error('请求失败');
				});
		},
		//取消收藏
		delect(id){
			this.$http({
				url: this.$http.adornUrl('/web/entry/cancelCollectionEntry?ids='+id),
				method: 'POST'
			})
				.then(({ data }) => {
					let _this=this
					_this.$message({
						message:'取消收藏成功',
						onClose:function(){
							_this.getData()
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
.lists {
	margin-bottom: 18px;
}
.item {
	position: relative;
	background: #ffffff;
	margin: 0 auto 18px;
	float: none;
	padding: 0 53px;
}
.delect{
	position: absolute;
	top: 9px;
	right: 9px;
	cursor: pointer;
}
.item_title {
	margin: 0;
	padding-top: 22px;
	color: #0084cf;
	font-size: 22px;
}
.item_title span {
	color: #f60000;
}
.item_intro {
	margin: 10px 200px 10px 0;
	font-size: 16px;
	color: #7a7a7a;
	line-height: 22px;
}
.item_type {
	margin: 0;
	padding-bottom: 15px;
	font-size: 16px;
	color: #7a7a7a;
	line-height: 22px;
}
</style>
