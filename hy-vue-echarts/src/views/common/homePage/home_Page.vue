<template>
	<div style="height: 100%;">
		<div class="bkg"><div class="bkgimg"></div></div>
		<div class="conter">
			<el-header style="padding: 24px 28px 0 37px;height: 79px;">
				<el-col :span="10">
					<router-link to="/home_Page"><img src="./img/logo.png" alt="" style="height: 54px;"/></router-link>
					<span class="names">瀚叶股份(600226成员企业)</span>
				</el-col>
				<el-col :span="14" style="text-align: right;height: 54px;line-height: 54px;">
					<!-- <a href="javascript:" class="names">官网首页</a> -->
					<span @click="shujuzibao" class="names cu">数据日报</span>
					<router-link to="/home" class="names">智库平台</router-link>
					<router-link to="/home_we" class="names">了解我们</router-link>
					<!-- <router-link to="/home_Page" class="names">产品功能</router-link>
					<router-link to="/home_Page" class="names">版本定价</router-link>
					<router-link to="/home_Page" class="names">App下载</router-link> -->
					<span class="names">
						<img src="./img/phone.png" alt="" />
						185 1139 1190
					</span>
					<span v-if="islogin" style="margin-left: 20px;">
						<img src="../../../../static/img/advor.png" alt="" style="width: 30px;"/>
						<el-dropdown :hide-on-click="false" @visible-change="changeColor($event)" >
							<span class="el-dropdown-link" :style="'color:' + color">
								刘航
								<i class="el-icon-arrow-up el-icon--right" :class="rotate"></i>
								<!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
							</span>
							<el-dropdown-menu slot="dropdown" style="z-index: 99999;">
								<el-dropdown-item>操作日志</el-dropdown-item>
								<el-dropdown-item @click.native="quit">退出系统</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</span>
					<span v-else>
						<router-link to="/login" class="login"><img src="./img/login.png" alt=""></router-link>
						<router-link to="/register" class="reg"><img src="./img/reg.png" alt=""></router-link>
					</span>
				</el-col>
			</el-header>
			<div>
				<div class="btm">
					<router-view></router-view>
				</div>
				<el-footer class="footer">
					沪ICP备18005232号
					<!-- <router-link to="/home_Page" class="names">使用手册</router-link>
					<router-link to="/home_Page" class="names">帮助中心</router-link>
					<router-link to="/home_Page" class="names">快速入门</router-link>
					<router-link to="/home_Page" class="names">移动端介绍</router-link>
					<router-link to="/home_Page" class="names">媒体报道</router-link>
					<router-link to="/home_Page" class="names">数据安全</router-link>
					<router-link to="/home_Page" class="names">联系我们</router-link>
					<router-link to="/home_Page" class="names">App下载</router-link>
					<router-link to="/home_Page" class="names">微信公众号</router-link> -->
				</el-footer>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			color: '#fff',
			rotate: '',
			islogin:false
		};
	},
	watch: {
      '$route' () {
        this.hastoken()
      }
    },
	created() {},
	mounted() {
		this.hastoken();
	},
	methods: {
		shujuzibao(){
			sessionStorage.setItem('moduleId',84)
			this.$cookie.set('_data_active_id', 84);
			this.$router.push('/datadaily/dataDaily')
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
		//判断是否有token
		hastoken(){
			var tokens=this.$cookie.get('token')
			if(tokens==''||tokens==undefined||tokens==null||tokens==' '){
				this.islogin=false
			}else{
				this.islogin=true
			}
		},
		//退出登录
		quit(){
			this.$cookie.delete('token')
			this.hastoken()
		}
	},
	components: {}
};
</script>

<style lang="scss" scoped>
	.rotate {
		transform: rotate(180deg);
	}
	.cu{
		cursor: pointer;
	}
	.conter{
		height: 100%;
		position: relative;
		padding-bottom: 60px;
		overflow: hidden
	}
	.footer{
		position: absolute;
		width: 100%;
		text-align: center;
		bottom: 0;
		color: #ffffff;
		font-size: 14px;
		line-height: 60px;
		font-size: 18px;
	}
.bkg {
	height: 100%;
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: -1;
}
.bkgimg {
	width: 100%;
	height: 100%;
	background-image: url(./img/bkg.jpg);
	background-size: cover;
	background-position: 0 0;
}
.names {
	color: #ffffff;
	font-size: 18px;
	margin-left: 32px;
	text-decoration: none;
}
.login{
	margin-left: 20px;
	margin-right: -5px;
}
.reg{
	margin-left: -5px;
}
</style>
