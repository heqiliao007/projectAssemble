<template>
	<div>
		<sideNav></sideNav>
		<div class="isFixed">
			<div style="height:86px; background:#4c4c4c; color: #fff; border: none; overflow: hidden;" v-loading="menuloading">
				<div class="header_logo">
					<a @click="toindex()"><img class="logoPic" src="../../common/head/img/recommended_logo.png" /></a>
					<div class="searchbox" :class="{ changecolor: isOpen == true }" @click="handleOpen()">
						<i class="searchPic iconfont iconsousuopx" style="font-size: 30px;" :style="isOpen === true ? 'color: yellow' : 'color: #fff;'"></i>
					</div>
				</div>
				<div style="width: 62%;margin: 0 auto;">
					<el-menu
						:default-active="activeName"
						class="el-menu-vertical-demo"
						mode="horizontal"
						style="height: 100%; background:#4c4c4c; height: 100%; color: #FFFFFF; margin: auto 0; padding-left: 0;"
						active-text-color="#fff"
						text-color="#E9E9E9"
						@select="handleClick"
					>
						<el-menu-item v-for="rec in recommondData" :index="String(rec.id)" :key="rec.id" style="display: flex; flex-direction: column;">
							<img style="margin: 0 auto; height: 36px; margin-top: 10px;" :src="rec.icon || 'src/views/common/head/img/header.png'" alt="" />
							<span style="margin-top: -24px;text-align: center;">{{ rec.name }}</span>
						</el-menu-item>
					</el-menu>
				</div>
				<div class="header_right">
					<img src="../../../../static/img/advor.png" alt="" />
					<el-dropdown :hide-on-click="false" @visible-change="changeColor($event)">
						<span class="el-dropdown-link" :style="'color:' + color">
							刘航
							<i class="el-icon-arrow-up el-icon--right" :class="rotate"></i>
							<!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
						</span>
						<el-dropdown-menu slot="dropdown" style="z-index: 99999;">
							<el-dropdown-item>操作日志</el-dropdown-item>
							<el-dropdown-item @click.native="loginOut">退出系统</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</div>
			<div style="clear:both"></div>
			<div>
				<div class="searchHeader" v-if="isOpen">
					<div class="searchInputbox" style="border-radius: 100px;">
						<!-- <label for="">全部</label> -->
						<select
							v-model="value"
							:placeholder="value"
							style="width: 100px; text-algin:center; border: none; outline: none; padding-left: 24px;vertical-align: middle; overflow: scroll; z-index: 99999;"
						>
							<option v-for="item in options" selected :key="item.value" :label="item.label" :value="item.value">{{item.label}}</option>

						</select>
						<input v-model="nameinfo" style="width: 200px;margin-left: -10px; border: none;height: 100%;vertical-align: top; padding-left: 10px;" />
						<el-button
							icon="el-icon-search icon-fontSize"
							@click="tosearchList()"
							class="text_hover"
							style="margin-left: -10px; border: none; height: 100%;border-radius: 100px;"
						></el-button>
					</div>
					<div style="position: absolute; top: 50%; left: 630px; transform: translateY(-50%); ">
						<span style="color: #fff; margin-right: 30px;" class="text_hover" @click="tosearch()">高级搜索</span>
						<span style="color: #FFEA27" @click.stop="closeOpen"><i class="iconfont iconguanbi"></i></span>
					</div>
				</div>
				<div style="background:#fff;border-bottom: 1px solid #ebeef5;height: 50px;" :style="isSearching ? 'z-index: ' + '99999' : ''" v-if="subMemuList.length > 0">
					<div style="margin: 0 auto;text-align:center;position: relative; overflow: hidden;">
						<ul class="sub-memu">
							<li class="sub-memu-item" :class="{ 'sub-memu-item-active': rec.active }" @click="subMemuHandleClick(rec)" v-for="rec in subMemuList" :key="rec.id">
								{{ rec.name }}
							</li>
							<div class="search-button-shaixuan" v-if="showChoose" :style="isSearching ? 'color:' + '#3295D9' : ''" @click="toggleSearchBox">
								<i class="iconfont iconshaixuan" style="margin-right: 5px;"></i>
								<span>筛选</span>
							</div>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div style="padding-top: 136px;" class="boxs"><router-view></router-view></div>
		<!-- Content  -->
	</div>
</template>

<script>
import sideNav from './sidenav';

export default {
	name: 'Recommond-Home',
	data() {
		return {
			menuloading: true,
			mentId: '',
			showChoose: true,
			color: '#fff',
			rotate: '',
			isFixed: false,
			isOpen: false, // 是否打开搜索框
			value: '全部', // 搜索框下拉的选项值
			label: '', // 搜索下拉框选中的label
			nameinfo: '', // 搜索框输入的值
			input5: '', // 搜索框的值
			options: [], //
			text_bott: [
				{ name: '全部', show: false },
				{ name: '电影', show: false },
				{ name: '综艺', show: false },
				{ name: '剧集', show: false },
				{ name: '动漫', show: false },
				{ name: '明星', show: false }
			],
			subMemuList: [],
			activeName: '',
			isSearching: false,
			recommondData: [],
			date: new Date('2019-04-02')
		};
	},
	created() {
		window.addEventListener('setItem', () => {
			this.newVal = sessionStorage.getItem('watchStorage') == 'true';
			this.isSearching = this.newVal;
		});
	},
	mounted() {
		this.getmenuid();
		// this.getmenu();

		this.getOptions();
	},
	watch: {
		// 如果路由有变化，会再次执行该方法
		$route() {
			this.menuloading = true;
			this.subMemuList = [];
			this.getmenuid();
			// this.getmenu();
			// this.getList();
			this.getOptions();
		}
	},
	methods: {
		getOptions() {
			this.$http({
				url: this.$http.adornUrl('/web/sysdict/esIndexAndType'),
				method: 'post'
			})
				.then(({ data }) => {
					// console.log(data, '=================全局搜索的下拉框');
					this.options = data.dict;
					this.value = this.options[0].value;
				})
				.catch(err => {
					// console.log(err);
				});
		},
		getmenuid() {
			console.log(sessionStorage.getItem('lastmoduleId') + '------' + sessionStorage.getItem('moduleId'));
			if (sessionStorage.getItem('lastmoduleId') == sessionStorage.getItem('moduleId')) {
				this.menuloading = false;
				this.mentId = sessionStorage.getItem('moduleId');
				// console.log(JSON.parse(sessionStorage.getItem('menu')));
				this.recommondData = JSON.parse(sessionStorage.getItem('menu'));
				this.getmenu();
			} else {
				this.mentId = sessionStorage.getItem('moduleId');
				sessionStorage.setItem('lastmoduleId', this.mentId);
				this.getList();
				this.getmenu();
			}
		},
		// 改变用户头像颜色
		changeColor(e) {
			if (e == true) {
				this.color = '#40A9FF';
				this.rotate = 'rotate';
			} else {
				this.color = '#fff';
				this.rotate = '';
			}
		},
		// 监听滚动
		handleScroll() {
			let _this = this;
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			if (scrollTop > 100) {
				_this.isFixed = true;
			} else {
				_this.isFixed = false;
			}
		},
		handleOpen() {
			this.isOpen = !this.isOpen;
			// this.value = this.options[0].value;
		},
		closeOpen() {
			this.isOpen = false;
		},
		// 根据链接显示当前菜单
		getmenu() {
			var activeName = sessionStorage.getItem('firstmenu');
			if (activeName == null || activeName == undefined || activeName == '') {
			} else {
				this.menuloading = false;
				this.activeName = activeName;
				var second = sessionStorage.getItem('secondmenu');
				if (second != null) {
					this.subMemuList = JSON.parse(sessionStorage.getItem('secondmenus'));
					this.subMemuList.forEach(item => {
						if (item.id == second) {
							item.active = true;
							if (item.name == '文学作品') {
								this.showChoose = false;
							} else if (item.name == '签约平台') {
								this.showChoose = false;
							} else if (item.id == '19') {
								this.showChoose = false;
							}else{
								this.showChoose = true;
							}
						} else {
							item.active = false;
						}
					});
				}
			}
		},
		loginOut() {
			sessionStorage.setItem('lastmoduleId', '');
			sessionStorage.setItem('firstmenu', '');
			sessionStorage.setItem('secondmenu', '');
			sessionStorage.setItem('secondmenus', '');
			this.$cookie.set('token', '');
			this.$router.push({ path: '/home' });
		},
		//获取菜单
		getList() {
			this.$http({
				url: this.$http.adornUrl('/web/product/navigationbar/' + this.mentId),
				method: 'get'
			})
				.then(({ data }) => {
					console.log('========================菜单列表', data);
					var menu = [];
					var msg = data;
					for (let m = 0; m < msg.navigationbars.length; m++) {
						menu.push({ id: msg.navigationbars[m].id, name: msg.navigationbars[m].name, icon: msg.navigationbars[m].icon, children: [] });
					}
					// console.log(menu)
					for (let i = 0; i < menu.length; i++) {
						this.$http({
							url: this.$http.adornUrl('/web/product/navigationbar/' + menu[i].id),
							method: 'get'
						})
							.then(({ data }) => {
								var activeName = sessionStorage.getItem('firstmenu');
								var second = sessionStorage.getItem('secondmenu');
								if(i==0&&data.navigationbars.length==0){
									if (activeName == null || activeName == undefined || activeName == '' || activeName == ' ') {
										this.$cookie.set('productid', menu[0].id);
									}
								}
								for (var j = 0; j < data.navigationbars.length; j++) {
									// console.log(activeName);
									if (activeName == null || activeName == undefined || activeName == '' || activeName == ' ') {
										// console.log(second,j,i)
										this.activeName = msg.navigationbars[0].id;
										if (i == 0) {
											if (j == 0) {
												// console.log(second)
												if (second == null || second == undefined || second == '' || second == data.navigationbars[j].id) {
													sessionStorage.setItem('secondmenu', data.navigationbars[j].id);
													this.$cookie.set('productid', data.navigationbars[j].id);
													this.subMemuList.push({ id: data.navigationbars[j].id, name: data.navigationbars[j].name, active: true });
												} else {
													this.subMemuList.push({ id: data.navigationbars[j].id, name: data.navigationbars[j].name, active: false });
												}
											} else {
												if (second == data.navigationbars[j].id) {
													this.subMemuList.push({ id: data.navigationbars[j].id, name: data.navigationbars[j].name, active: true });
												} else {
													this.subMemuList.push({ id: data.navigationbars[j].id, name: data.navigationbars[j].name, active: false });
												}
											}
										}
									}
									menu[i].children.push({ id: data.navigationbars[j].id, name: data.navigationbars[j].name });
								}
								if (i == menu.length - 1) {
									this.menuloading = false;
									var activeName = sessionStorage.getItem('firstmenu');
									if (activeName == null || activeName == undefined || activeName == '') {
										this.activeName = msg.navigationbars[0].id;
										// console.log(menu);
										sessionStorage.setItem('secondmenus', JSON.stringify(menu[0].children));
										sessionStorage.setItem('firstmenu', msg.navigationbars[0].id);
									}
									sessionStorage.setItem('menu', JSON.stringify(menu));
									this.recommondData = menu;
								}
							})
							.catch(err => {
								// console.log('请求失败：');
							});
					}
				})
				.catch(err => {
					// console.log('请求失败：');
				});
		},
		handleClick(args) {
			// console.log(args);
			var selected = null;
			this.isOpen = false;
			for (let i = 0; i < this.recommondData.length; i++) {
				if (args == this.recommondData[i].id) {
					selected = this.recommondData[i];
					break;
				}
			}

			// 点击一级菜单有二级菜单跳转
			if (selected.children && selected.children.length > 0) {
				if (selected.name == '排片分析') {
					for (var i = 0; i < selected.children.length; i++) {
						if (selected.children[i].name == '影片') {
							selected.children[i].path = '/box_office/arrange/film';
						} else if (selected.children[i].name == '城市') {
							selected.children[i].path = '/box_office/arrange/city';
						} else if (selected.children[i].name == '院线') {
							selected.children[i].path = '/box_office/arrange/chians';
						} else if (selected.children[i].name == '影投') {
							selected.children[i].path = '/box_office/arrange/invest';
						} else if (selected.children[i].name == '影院') {
							selected.children[i].path = '/box_office/arrange/theater';
						}
					}
				}
				if (selected.name == '票房分析') {
					for (var i = 0; i < selected.children.length; i++) {
						if (selected.children[i].name == '影片') {
							selected.children[i].path = '/box_office/salesAnalysis/anlysis';
						} else if (selected.children[i].name == '城市') {
							selected.children[i].path = '/box_office/salesAnalysis/city';
						} else if (selected.children[i].name == '院线') {
							selected.children[i].path = '/box_office/salesAnalysis/cinemaChain';
						} else if (selected.children[i].name == '影投') {
							selected.children[i].path = '/box_office/salesAnalysis/shadow';
						} else if (selected.children[i].name == '影院') {
							selected.children[i].path = '/box_office/salesAnalysis/cinema';
						}
					}
				}
				if (selected.name == '渠道分析') {
					for (var i = 0; i < selected.children.length; i++) {
						if (selected.children[i].name == '类型分析') {
							selected.children[i].path = '/videoTank/type';
						} else if (selected.children[i].name == '类型趋势') {
							// selected.children[i].name='typeTrend'
							selected.children[i].path = '/videoTank/typeTrend';
						} else if (selected.children[i].name == '人群画像') {
							selected.children[i].path = '/videoTank/personAdvator';
						}
					}
				}
				if (selected.name == '类型趋势') {
					for (var i = 0; i < selected.children.length; i++) {
						if (selected.children[i].name == '类型分析') {
							selected.children[i].path = '/videoTank/type';
						} else if (selected.children[i].name == '类型趋势') {
							selected.children[i].path = '/videoTank/typeTrend';
						} else if (selected.children[i].name == '人群画像') {
							selected.children[i].path = '/videoTank/personAdvator';
						}
					}
				}
				// 没有筛选条件，隐藏筛选图标以及筛选字样
				if (selected.name == '网文分析') {
					this.showChoose = false;
					for (var i = 0; i < selected.children.length; i++) {
						if (selected.children[i].name == '文学作品') {
							this.showChoose = false;
						} else if (selected.children[i].name == '签约平台') {
							this.showChoose = false;
						}
					}
				} else if(selected.name == '票房分析'){
					this.showChoose = false;
				}else{
					// console.log(2)
					this.showChoose = true;
				}
				this.subMemuList = selected.children;
				this.subMemuList.forEach(item => {
					item.active = false;
				});
				this.subMemuList[0].active = true;
				var data = false;
				sessionStorage.setItem('isSearching', data);
				// this.showChoose = true
				this.resetSetItem('watchStorage', data);
				sessionStorage.setItem('firstmenu', selected.id);
				sessionStorage.setItem('secondmenu', selected.children[0].id);
				sessionStorage.setItem('secondmenus', JSON.stringify(selected.children));
				this.$cookie.set('productid', selected.children[0].id);
				if (selected.children[0].path == undefined) {
					this.$router.push({
						name: selected.children[0].name
					});
				} else {
					this.$router.push({
						path: selected.children[0].path
					});
				}
				return;
			} else {
				this.subMemuList = [];
				this.subMemuList.forEach(item => {
					item.active = false;
				});
			}
			//没有二级菜单直接跳转
			if (selected.name) {
				var data = false;
				sessionStorage.setItem('isSearching', data);
				this.resetSetItem('watchStorage', data);
				sessionStorage.setItem('firstmenu', selected.id);
				sessionStorage.setItem('secondmenus', '');
				this.$cookie.set('productid', selected.id);
				this.$router.push({
					name: selected.name
				});
			}
		},
		subMemuHandleClick(selected) {
			this.subMemuList.forEach(item => {
				item.active = false;
			});
			selected.active = true;
			//点击二级菜单
			if (selected.name) {
				if (selected.name == '文学作品') {
					this.showChoose = false;
				} else if (selected.name == '签约平台') {
					this.showChoose = false;
				} else if (selected.id == '19') {
					this.showChoose = false;
				}else{
					this.showChoose = true;
				}
				var data = false;
				sessionStorage.setItem('isSearching', data);
				this.resetSetItem('watchStorage', data);
				sessionStorage.setItem('secondmenu', selected.id);
				this.$cookie.set('productid', selected.id);
				if (selected.path == undefined) {
					this.$router.push({
						name: selected.name
					});
				} else {
					this.$router.push({
						path: selected.path
					});
				}
			}
		},
		toggleSearchBox() {
			this.isSearching = !this.isSearching;
			var data = this.isSearching;
			sessionStorage.setItem('isSearching', data);
			this.resetSetItem('watchStorage', data);
		},
		//跳转搜索列表
		tosearchList() {
			sessionStorage.setItem('lastmoduleId', '');
			sessionStorage.setItem('firstmenu', '');
			sessionStorage.setItem('secondmenu', '');
			sessionStorage.setItem('secondmenus', '');
			sessionStorage.setItem('secondmenus', '');
			// console.log('===========跳转到高级搜索', this.value, this.nameinfo);
			if (this.nameinfo == '') {
				this.$message.error('搜索内容不能为空');
				return;
			} else {
				let data = {
					selected: this.value,
					nameinfo: this.nameinfo
				};
				sessionStorage.setItem('moduleId', '9');
				this.isOpen = false;
				this.$emit('checkdata', data);
				this.$router.push({
					path: '/searchList',
					query: {
						selected: this.value,
						nameinfo: this.nameinfo
					}
				});
				this.nameinfo = '';
				this.value = '';
			}
		},
		tosearch(){
			sessionStorage.setItem('lastmoduleId', '');
			sessionStorage.setItem('firstmenu', '');
			sessionStorage.setItem('secondmenu', '');
			sessionStorage.setItem('secondmenus', '');
			sessionStorage.setItem('secondmenus', '');
			let data = {
				selected: this.value,
				nameinfo: this.nameinfo
			};
			sessionStorage.setItem('moduleId', '9');
			this.isOpen = false;
			this.$emit('checkdata', data);
			this.$router.push({
				path: '/searchList',
				query: {
					selected: this.value,
					nameinfo: this.nameinfo
				}
			});
			this.nameinfo = '';
			this.value = '';
		},
		//点击logo跳转首页
		toindex() {
			sessionStorage.setItem('lastmoduleId', '');
			sessionStorage.setItem('firstmenu', '');
			sessionStorage.setItem('secondmenu', '');
			sessionStorage.setItem('secondmenus', '');
			this.$router.push({ path: '/home_modul' });
		}
	},
	components: {
		sideNav
	},
	destroyed() {
		// window.removeEventListener('scroll', this.handleScroll)
	}
};
</script>
<style lang="scss" scoped>
.text_hover {
	cursor: pointer;
	display: inline-block;
}
.el-menu-item.is-active {
	background-color: rgba(231, 235, 240, 0.3) !important;
}
.el-menu-item:hover {
	background-color: rgba(231, 235, 240, 0.3) !important;
}
.el-menu--horizontal > .el-menu-item {
	padding-top: 5px;
	height: 100%;
	line-height: 76px;
	font-size: 12px;
	text-align: center;
}
.rotate {
	transform: rotate(180deg);
}
/* 顶部样式 */
.header_logo {
	width: 19%;
	min-width: 259px;
	height: 86px;
	background-color: #0084cf;
	position: absolute;
	left: 0;
	top: 0;
}
.header_right {
	position: absolute;
	right: 20px;
	top: 0;
	color: #fff;
	line-height: 86px;
}
.changecolor {
	background-color: #40a9ff;
}
.logoPic {
	width: 138px;
	position: absolute;
	top: 50%;
	left: 18px;
	transform: translateY(-50%);
}
.searchbox {
	position: absolute;
	width: 80px;
	height: 100%;
	/* background-color: red; */
	top: 0;
	right: 0;
}
.searchHeader {
	position: relative;
	width: 100%;
	height: 50px;
	background-color: #40a9ff;
	padding-left: 240px;
	padding-top: 5px;
}
.searchInputbox {
	background-color: #ffffff;
	width: 360px;
	height: 90%;
	overflow: hidden;
	margin: auto 0;
}
input:focus {
	outline: none;
}
.searchPic {
	width: 30px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
}
.search {
	background: #ffffff;
	position: absolute;
	top: 110px;
	width: 100%;
	z-index: 999;
}
.isFixed {
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	z-index: 2001;
	/* -webkit-transform: translateY(0); */
}
.searchfixed {
	position: fixed;
	width: 100%;
	top: 87px;
	left: 0;
	z-index: 99;
	// bottom: 0px;
}
.noFixed {
	position: relative;
}
.cover {
	position: absolute;
	left: 0;
	background: #333333;
	width: 100%; /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
	height: 100%;
	filter: alpha(opacity=35); /*设置透明度为60%*/
	opacity: 0.35; /*非IE浏览器下设置透明度为60%*/
	z-index: 666;
}

.el-menu--horizontal {
	border-bottom: none;
}

body {
	background: #f5f5f5;
}

.sub-memu {
	width: 62%;
	line-height: 50px;
	list-style: none;
	margin: 0 auto;
	text-align: left;
	padding-left: 0;
}

.sub-memu-item:hover {
	cursor: pointer;
}

.sub-memu-item {
	height: 50px;
	font-size: 16px;
	font-weight: 400;
	display: inline-block;
	padding: 0 5px;
	margin: 0 22px;
	color: #999999;
}

.sub-memu .sub-memu-item-active {
	color: #3295d9;
	border-bottom: 3px solid #3295d9;
}
.el-menu-item {
	font-size: 16px;
}

.search-button-shaixuan {
	display: inline-block;
}

.search-button-shaixuan:hover {
	cursor: pointer;
}

.search-box {
	height: 58px;
	line-height: 58px;
	margin: 0 auto;
	text-align: center;
}
</style>
