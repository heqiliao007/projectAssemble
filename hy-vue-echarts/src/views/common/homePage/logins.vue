<template>
	<div>
		<!-- 账号登录 -->
		<div class="account" v-if="isaccount">
			<div class="account-box">
				<p class="logo"><img src="./img/login-logo.png" alt="" /></p>
				<div class="text">
					<img src="./img/blue/user-icon.png" alt="" v-show="onuser==true" id="user"/>
					<img src="./img/white/user-icon.png" alt="" v-show="onuser==false" />
					<input type="text" autocomplete="off" @focus="onfocus('user')" v-model="user" @blur="onblur('user')" placeholder="请输入手机号/邮箱/用户名" />
				</div>
				<div class="text">
					<span class="user-error" v-if="userError">{{ userErrorWhy }}</span>
					<img src="./img/blue/pass-icon.png" alt="" v-show="onpass==true" id="pass" />
					<img src="./img/white/pass-icon.png" alt="" v-show="onpass==false"/>
					<input type="password" @keyup.enter="login()" autocomplete="new-password" @focus="onfocus('pass')" v-model="pass" @blur="onblur('pass')" placeholder="请输入密码" />
				</div>
				<div class="remember">
					<span class="user-error" v-if="passError">{{ passErrorWhy }}</span>
					<el-checkbox v-model="rememberPass" style="color: #ffffff;text-decoration: underline;">记住密码</el-checkbox>
					<router-link to="/login" class="forget">忘记密码?</router-link>
				</div>
				<button class="login" @click="login()">登录</button>
				<div class="others">
					<span class="account-login-now">账号登录</span>
					<span class="mobile-login" @click="phonelogin()">手机号</span>
					<router-link to="/login" class="weixin-login">微信登录</router-link>
				</div>
			</div>
			<router-link to="/home" class="down"><img src="./img/down-icon.png" alt="" /></router-link>
			<router-link to="/register" class="reg">没有账号？点击注册</router-link>
		</div>
		<!-- 手机号登录 -->
		<div class="phone" v-if="isphone">
			<div class="phone-box">
				<p class="logo"><img src="./img/login-logo.png" alt="" /></p>
				<div class="text">
					<img src="./img/blue/phone-icon.png" alt="" v-show="onphone==true" id="phone" />
					<img src="./img/white/phone-icon.png" alt="" v-show="onphone==false"/>
					<input type="text" autocomplete="off" @focus="onfocus('phone')" v-model="phone" @blur="onblur('phone')" placeholder="请输入手机号" />
				</div>
				<div class="codes">
					<span class="user-error" v-if="phoneError">{{ phoneErrorWhy }}</span>
					<div class="code">
						<img src="./img/blue/codeimg-icon.png" alt="" v-show="oncodeimg==true" id="codeimg" />
						<img src="./img/white/codeimg-icon.png" alt="" v-show="oncodeimg==false"/>
						<input type="text" autocomplete="off" @focus="onfocus('codeimg')" v-model="imgcode" @blur="onblur('codeimg')" placeholder="请输入图片验证码" />
					</div>
					<img :src="captchaPath" @click="getimgcode()" alt="" class="imgcode" />
					<el-button type="text" class="getcode" @click="getCode()" :disabled="checkResult">{{codeText}}</el-button>
				</div>
				<div class="text">
					<span class="user-error" v-if="imgcodeError">{{ imgcodeErrorWhy }}</span>
					<img src="./img/blue/code-icon.png" alt="" v-show="oncode==true" id="code" />
					<img src="./img/white/code-icon.png" alt="" v-show="oncode==false"/>
					<input type="text" autocomplete="new-password" @focus="onfocus('code')" v-model="code" @blur="onblur('code')" placeholder="请输入手机验证码" />
				</div>
				<div class="remember">
					<span class="user-error" v-if="codeError">{{ codeErrorWhy }}</span>
				</div>
				<button class="login" @click="phoneLogin()">登录</button>
				<div class="others">
					<span class="account-login" @click="accountlogin()">账号登录</span>
					<span class="mobile-login-now">手机号</span>
					<router-link to="/login" class="weixin-login">微信登录</router-link>
				</div>
			</div>
			<router-link to="/home" class="down"><img src="./img/down-icon.png" alt="" /></router-link>
			<router-link to="/register" class="reg">没有账号？点击注册</router-link>
		</div>
	</div>
</template>

<script>
import { getUUID } from '@/utils';
import { isMobile } from '@/utils/validate';
export default {
	props: {},
	data() {
		return {
			onphone:true,
			onuser:true,
			onpass:true,
			oncodeimg:true,
			oncode:true,
			checkResult:false,
			codeText:'获取验证码',
			phone:'',
			imgcode:'',
			code:'',
			uuid:'',
			captchaPath:'',
			isaccount: true,
			isphone: false,
			user: '',
			pass: '',
			intervalTag: '',
			phoneErrorWhy:'',
			passErrorWhy: '',
			userErrorWhy: '',
			imgcodeErrorWhy:'',
			codeErrorWhy:'',
			imgcodeError:false,
			passError:false,
			userError: false,
			phoneError: false,
			codeError: false,
			rememberPass: false
		};
	},
	created() {},
	mounted: function() {
		this.getwidth();
    this.getuser();
		this.getimgcode();
	},
	methods: {
		getwidth() {
			var userAgent = navigator.userAgent;
			if (userAgent.indexOf('Firefox') > -1) {
				// document.getElementsByClassName('account')[0].removeAttribute("style");
				document.getElementsByClassName('btm')[0].removeAttribute("style");
				document.getElementsByTagName('body')[0].style.overflow = 'hidden';
			} else {
				document.getElementsByClassName('btm')[0].style.zoom = '1';
			}
		},
    //获取自动登录的用户名密码
    getuser(){
      this.user=this.$cookie.get('username');
      this.pass=this.$cookie.get('password');
      if(this.$cookie.get('login')=='true'){
        this.rememberPass=true
      }else{
        this.rememberPass=false
      }
    },
		//获取焦点
		onfocus(e) {
			if (e == 'pass') {
				this.onpass=false
				this.passError = false;
			} else if (e == 'user') {
				this.onuser=false
				this.userError = false;
			} else if (e == 'phone') {
				this.onphone=false
				this.phoneError = false;
			} else if (e == 'code') {
				this.oncode=false
				this.codeError = false;
			} else if (e == 'codeimg') {
				this.oncodeimg=false
				this.imgcodeError = false;
			}
			document.getElementById(e).parentNode.style.borderColor = '#ffffff';
			// now.removeAttribute('readonly')
		},
		//失去焦点
		onblur(e) {
			if (e == 'pass') {
				this.onpass=true
			} else if (e == 'user') {
				this.onuser=true
			} else if (e == 'phone') {
				this.onphone=true
			} else if (e == 'code') {
				this.oncode=true
			} else if (e == 'codeimg') {
				this.oncodeimg=true
			}
			document.getElementById(e).parentNode.style.borderColor = '#144c85';

			// now.setAttribute('readonly',true)
		},
		//账号登录
		login() {
			if (this.user == '') {
				this.userError = true;
				this.userErrorWhy = '用户名不能为空';
				document.getElementById('user').parentNode.style.borderColor = 'red'
			}
			if (this.pass == '') {
				this.passError = true;
				this.passErrorWhy = '密码不能为空';
				document.getElementById('pass').parentNode.style.borderColor = 'red'
			}
			if (this.pass != '' && this.user != '') {
				this.$http({
					url: this.$http.adornUrl('/rsaKey/'+this.user),
					method: 'get'
				})
					.then(({ data }) => {
            if(this.rememberPass==true){
              this.$cookie.set('username', this.user);
              this.$cookie.set('password', this.pass);
              this.$cookie.set('login', this.rememberPass);
            }else{
              this.$cookie.delete('username')
              this.$cookie.delete('password')
              this.$cookie.delete('login')
            }
						let msg=data
						let pword = this.pass
						//公钥
						let pwdKey=this.RSAUtils.getKeyPair(msg.exponent,'',msg.modulus)
						let reversedPwd=pword.split('').reverse().join('')
						console.log(pwdKey)
						//加密
						let encrypedpwd=this.RSAUtils.encryptedString(pwdKey,reversedPwd)

						this.$http({
							url: this.$http.adornUrl('/sys/login'),
							method: 'POST',
							data: this.$http.adornData({
								username: this.user,
								password: encrypedpwd
							})
						})
							.then(({ data }) => {
								if (data && data.code === 0) {
									this.$cookie.set('token', data.token);
									this.$router.push({ path: 'home' });
								}
							})
					})
			}
		},
		//点击手机号登录
		phonelogin() {
			this.isaccount = false;
			this.isphone = true;
			this.getimgcode();
		},
		//点击账号登录
		accountlogin() {
			this.isaccount = true;
			this.isphone = false;
		},
		//获取图片验证码
		getimgcode() {
			this.uuid = getUUID()
			this.captchaPath = this.$http.adornUrl(`/captcha.jpg?uuid=${this.uuid}`)
		},
		//点击获取验证码
		getCode(){
			if(this.phone==''||this.phone==undefined||this.phone==null||this.phone==' '){
				this.phoneError=true
				this.phoneErrorWhy='手机号不能为空'
				document.getElementById('phone').parentNode.style.borderColor = 'red';
			}else if(isMobile(this.phone)==false){
				this.phoneError=true
				this.phoneErrorWhy='请输入正确的手机号'
				document.getElementById('phone').parentNode.style.borderColor = 'red';
			}else if(this.imgcode!=''){
				this.$http({
				  url: this.$http.adornUrl("/checkVerificationCode"),
				  method: "post",
				  data: this.$http.adornData({
				    uuid: this.uuid,
				    code: this.imgcode
				  })
				}).then(({ data }) => {
					var msg=data
					if(msg.tureOrFalse==false){
						this.imgcodeError=true
						this.imgcodeErrorWhy='验证码错误'
						document.getElementById('codeimg').parentNode.style.borderColor = 'red';
						this.getimgcode()
					}else{
						this.$http({
						  url: this.$http.adornUrl("/sendsms/login/" + this.phone),
						  method: "post",
						  data: {
						    mobile:this.phone
						  }
						}).then(({ data }) => {
						    // 成功提示
						    this.codeText = 60;
							this.checkResult = true;
						    this.intervalTag = setInterval(() => {
						      if (this.codeText != 1) {
						        this.codeText = parseInt(this.codeText) - 1;
						      } else {
						        this.checkResult = false;
						        this.codeText = '获取验证码';
						        clearInterval(this.intervalTag)
						      }
						    }, 1000);
						}).catch(err => {
							this.getimgcode()
						});
					}
				})
			}
			if(this.imgcode==''||this.imgcode==undefined||this.imgcode==null||this.imgcode==' '){
				this.imgcodeError=true
				this.imgcodeErrorWhy='图片验证码不能为空'
				document.getElementById('codeimg').parentNode.style.borderColor = 'red';
			}
		},
		//手机号登录
		phoneLogin(){
			if(this.phone==''||this.phone==undefined||this.phone==null||this.phone==' '){
				this.phoneError=true
				this.phoneErrorWhy='手机号不能为空'
				document.getElementById('phone').parentNode.style.borderColor = 'red';
			}else if(isMobile(this.phone)==false){
				this.phoneError=true
				this.phoneErrorWhy='请输入正确的手机号'
				document.getElementById('phone').parentNode.style.borderColor = 'red';
			}else if(this.code!=''&&this.code!=' '){
				this.$http({
					url: this.$http.adornUrl('/sys/loginByPhone'),
					method: 'POST',
					data: this.$http.adornData({
						mobile: this.phone,
						content: this.code
					})
				})
					.then(({ data }) => {
						if (data && data.code === 0) {
							this.$cookie.set('token', data.token);
							this.$router.push({ path: 'home' });
						}
					})
					.catch(err => {
						// console.log('请求失败：');
					});
			}
			if(this.code==''||this.code==' '){
				this.codeError=true
				this.codeErrorWhy='手机验证码不能为空'
				document.getElementById('code').parentNode.style.borderColor = 'red';
			}
		}
	},
	watch: {}
};
</script>
<style scoped>
.account {
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -230px;
	margin-left: -205px;
}
.account-box {
	margin: 0 auto;
	height: 415px;
	width: 410px;
	border-style: solid;
	border-width: 1px;
	border-color: rgb(197, 197, 197);
	border-radius: 5px;
	background-color: rgba(255, 255, 255, 0.302);
	box-shadow: 0px 0px 6.8px 1.2px rgba(4, 0, 0, 0.3);
}
.logo {
	text-align: center;
}
.text {
	width: 330px;
	height: 65px;
	margin: 0 auto;
	padding-top: 22px;
	border-bottom: 2px solid #144c85;
	vertical-align: bottom;
	line-height: 45px;
	position: relative;
}
.text img {
	vertical-align: middle;
}
.user-error {
	position: absolute;
	top: 5px;
	left: 32px;
	font-size: 12px;
	color: red;
	line-height: 12px;
}
.text input {
	height: 25px;
	width: 298px;
	margin-left: 8px;
	vertical-align: middle;
	background: none!important;;
	border: none;
	outline: none;
	font-size: 12px;
}
.remember {
	position: relative;
	width: 330px;
	margin: 0 auto;
	padding: 28px 0 18px;
}
.forget {
	float: right;
	color: #ffffff;
	text-decoration: none;
}
.login {
	cursor: pointer;
	display: block;
	width: 330px;
	height: 45px;
	border: none;
	outline: none;
	margin: 0 auto;
	border-radius: 2px;
	background-color: rgb(36, 107, 179);
	box-shadow: 0px 3px 2px 0px rgba(255, 255, 255, 0.2);
	font-size: 20px;
	font-family: 'SourceHanSansCN';
	color: rgb(255, 255, 255);
}
.login:hover {
	background-color: #246bb3;
}
.others {
	text-align: center;
	line-height: 43px;
	font-size: 12px;
}
.account-login-now {
	display: inline-block;
	line-height: 18px;
	height: 18px;
	padding-left: 30px;
	background: url(./img/white/account-icon.png) no-repeat left center;
	color: #ffffff;
	text-decoration: none;
}
.account-login {
	cursor: pointer;
	display: inline-block;
	line-height: 18px;
	height: 18px;
	padding-left: 30px;
	background: url(./img/blue/account-icon.png) no-repeat left center;
	color: #c3c8c9;
	text-decoration: none;
}
.account-login:hover {
	background: url(./img/white/account-icon.png) no-repeat left center;
	color: #ffffff;
}
.mobile-login-now {
	display: inline-block;
	line-height: 18px;
	height: 18px;
	margin: 0 30px;
	padding-left: 30px;
	background: url(./img/white/mobile-icon.png) no-repeat left center;
	color: #ffffff;
	text-decoration: none;
}
.mobile-login {
	cursor: pointer;
	display: inline-block;
	line-height: 18px;
	height: 18px;
	margin: 0 30px;
	padding-left: 30px;
	background: url(./img/blue/mobile-icon.png) no-repeat left center;
	color: #c3c8c9;
	text-decoration: none;
}
.mobile-login:hover {
	background: url(./img/white/mobile-icon.png) no-repeat left center;
	color: #ffffff;
}
.weixin-login-now {
	display: inline-block;
	line-height: 18px;
	height: 18px;
	padding-left: 30px;
	background: url(./img/white/weixin-icon.png) no-repeat left center;
	color: #ffffff;
	text-decoration: none;
}
.weixin-login {
	cursor: pointer;
	display: inline-block;
	line-height: 18px;
	height: 18px;
	padding-left: 30px;
	background: url(./img/blue/weixin-icon.png) no-repeat left center;
	color: #c3c8c9;
	text-decoration: none;
}
.weixin-login:hover {
	background: url(./img/white/weixin-icon.png) no-repeat left center;
	color: #ffffff;
}
.down {
	position: absolute;
	top: 0;
	left: 430px;
}
.reg {
	display: block;
	width: 150px;
	height: 35px;
	margin: 11px auto 0;
	padding-right: 29px;
	background: url('./img/blue/cycle-icon.png') no-repeat center;
	background-position-x: 122px;
	border-style: solid;
	border-width: 1px;
	border-color: rgb(168, 168, 168);
	border-radius: 5px;
	background-color: rgba(255, 255, 255, 0.102);
	box-shadow: 0px 0px 6.8px 1.2px rgba(4, 0, 0, 0.1);
	font-size: 12px;
	color: #a8a8a8;
	text-align: right;
	line-height: 33px;
	text-decoration: none;
}
.reg:hover {
	background: rgba(255, 255, 255, 0.102) url('./img/white/cycle-icon.png') no-repeat center;
	background-position-x: 122px;
	color: #ffffff;
}
.phone {
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -265px;
	margin-left: -205px;
}
.phone-box {
	margin: 0 auto;
	height: 485px;
	width: 410px;
	border-style: solid;
	border-width: 1px;
	border-color: rgb(197, 197, 197);
	border-radius: 5px;
	background-color: rgba(255, 255, 255, 0.302);
	box-shadow: 0px 0px 6.8px 1.2px rgba(4, 0, 0, 0.3);
}
.codes {
	width: 330px;
	margin: 0 auto;
	height: 65px;
	position: relative;
	padding-top: 22px;
}
.code {
	display: inline-block;
	width: 130px;
	border-bottom: 2px solid #144c85;
	vertical-align: bottom;
	line-height: 45px;
}
.code img {
	vertical-align: middle;
}
.code input {
	padding: 0;
	margin-left: 8px;
	border: none;
	outline: none;
	width: 50px;
	width: 98px;
	background: none;
	font-size: 12px;
}
.imgcode {
	height: 46px;
	width: 112px;
	margin: 0 9px;
}
.getcode {
	width: 60px;
	padding: 0;
	display: inline-block;
	margin-bottom: 10px;
	cursor: pointer;
	font-size: 12px;
	color: #ffffff;
	text-align: center;
	vertical-align: bottom;
}
.getcode:hover {
	text-decoration: underline;
}
input::-webkit-input-placeholder {
  color: #d3d3d3;
}
input:-moz-placeholder {/* Firefox 18- */
  color: #d3d3d3;
}
input::-moz-placeholder{/* Firefox 19+ */
 color: #d3d3d3;
}
input:-ms-input-placeholder {
  color: #d3d3d3;
}
input:-webkit-autofill {
background-color: #FAFFBD!important;
background-image: none;
color: #000;
}
</style>
<style>
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #ffffff;
  }
</style>
