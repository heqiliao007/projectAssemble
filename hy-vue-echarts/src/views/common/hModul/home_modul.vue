<template>
	<div>
		<img width="100%" src="./img/Home-page_bg.png">
		<el-row>
			<el-col :span="24">
				<div class="grid-content search" style="position: relative;top: 0px;">
					<div class="search-main">
						<div class="logo">
							<img src="./img/Home-page_logo.png">
						</div>
						<div class="input-box">
							<searchWhite></searchWhite>
						</div>
						<div class="user-head">
							<img src="../../../../static/img/advor.png" style="width: 80px; margin-top: -25px;">
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-main>
			<el-row :gutter="20">
				<el-col :span="6" v-for="(product, index) in commonProducts" :key="index">
					<div class="grid-content zhiku-list " :class="{'active':product.active}">
						<el-row>
							<router-link v-if="product.name=='电影智库'" :to="'/box_office/recommond/recommond?id='+product.id">
								<el-col :span="24">
									<div class="grid-content">
										<img :src="product.icon">
									</div>
								</el-col>
								<el-col :span="24">
									<div class="grid-content modul-title">{{product.name}}</div>
								</el-col>
							</router-link>
							<router-link v-else-if="product.name=='视频智库'" :to="'/videoTank/drama?id='+product.id">
								<el-col :span="24">
									<div class="grid-content">
										<img :src="product.icon">
									</div>
								</el-col>
								<el-col :span="24">
									<div class="grid-content modul-title">{{product.name}}</div>
								</el-col>
							</router-link>
							<a href="./serviceAnalysis/index.html" v-else-if="product.name=='短视频智库'">
								<el-col :span="24">
									<div class="grid-content">
										<img :src="product.icon">
									</div>
								</el-col>
								<el-col :span="24">
									<div class="grid-content modul-title">{{product.name}}</div>
								</el-col>
							</a>
							<router-link v-else-if="product.name=='文学作品'" :to="'/networkLiterature/index?id='+product.id">
								<el-col :span="24">
									<div class="grid-content">
										<img :src="product.icon">
									</div>
								</el-col>
								<el-col :span="24">
									<div class="grid-content modul-title">{{product.name}}</div>
								</el-col>
							</router-link>
							<router-link v-else-if="product.name=='百科词条'" :to="'/wikipedia/index?id='+product.id">
								<el-col :span="24">
									<div class="grid-content">
										<img :src="product.icon">
									</div>
								</el-col>
								<el-col :span="24">
									<div class="grid-content modul-title">{{product.name}}</div>
								</el-col>
							</router-link>
							<router-link v-else :to="'/box_office/recommond?id='+product.id">
								<el-col :span="24">
									<div class="grid-content">
										<img :src="product.icon">
									</div>
								</el-col>
								<el-col :span="24">
									<div class="grid-content modul-title">{{product.name}}</div>
								</el-col>
							</router-link>
						</el-row>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<div class="partner">
						<h2 class="partner-h2">合作伙伴</h2>
						<div class="partner-pic">
							<a v-for="parter in parterList" :key="parter.id">
								<img :src="parter.logo">
							</a>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-main>
		<el-footer style="height: 120px;">
			<el-row>
				<el-col :span="24">
					<div class>
						<el-row>
							<el-col :span="4">
								<div class="footer-logo">
									<img src="./img/Home-page_foot_icon_logo.png">
								</div>
							</el-col>
							<el-col :span="16">
								<div class="footer-info">
									<div id>
										<a href="#">常见问题</a>
										<a href="#">产品服务</a>
										<a href="#">关于我们</a>
										<a href="#">联系我们</a>
									</div>
									<p>京ICP备14007358号-1 / 京公网安备11010802014104号 / Powered by 2008-2019 UI.CN</p>
								</div>
							</el-col>
							<el-col :span="4">
								<div class="footer-code">
									<img src="./img/code.png">
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>
		</el-footer>
	</div>
</template>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	body {
		margin: 0;
		padding: 0;
		background: #f5f5f5;
	}

	.el-row {
		margin-bottom: 0px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.el-input-group {
		border: 1px solid #eee;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.head {}
</style>

<style lang="scss" scoped>
	@import "./css/home_modul.css";
</style>

<script>
	import Vue from 'vue'
	import searchWhite from "../head/search-white";
	export default {
		data() {
			return {
				commonProducts: [],
				parterList: []
				//activeName: 'first',
			}
		},
		created() {
			// this.commonProducts = JSON.parse(sessionStorage.getItem('productList'))
			// this.getCommonProducts()
		},
		mounted() {
			let list = JSON.parse(sessionStorage.getItem('productList'))
			let newList = []
			for (let i = 0; i < list.length; i++) {
				if(list[i] != null) {
					newList.push(list[i])
				} else {

				}
			}
			this.commonProducts = newList
			// for()
			this.getPartner()
		},
		methods: {
			getCommonProducts() {
				let _this = this
				// _this.commonProducts = JSON.parse(sessionStorage.getItem('productList'))
				// _this.commonProducts = sessionStorage.getItem('productList')
				console.log(_this.commonProducts[0].name)
			},
			getPartner() {
				this.$http({
					url: this.$http.adornUrl('/web/partner/list'),
					method: 'post',
					data: {
						'token': Vue.cookie.get('token')
					}
				}).then(({
					data
				}) => {
					console.log(data)
					this.parterList = data.page.list
				})
			}
		},
		components: {
			searchWhite
		}
	}
</script>
