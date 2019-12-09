<template>
	<div class="redbody">
		<div class="account-reg">
			<div class="account-box">
				<p class="logo">
					<img src="./img/reg-logo.png" alt="" />
					<span class="reg-flow">注册流程</span>
				</p>
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
					<el-button type="text" autocomplete="off" class="getcode" @click="getCode()" :disabled="checkResult">{{ codeText }}</el-button>
				</div>
				<div class="text">
					<span class="user-error" v-if="imgcodeError">{{ imgcodeErrorWhy }}</span>
					<img src="./img/blue/code-icon.png" alt="" v-show="oncode==true" id="code" />
					<img src="./img/white/code-icon.png" alt="" v-show="oncode==false"/>
					<input type="text" autocomplete="off" @focus="onfocus('code')" v-model="code" @blur="onblur('code')" placeholder="请输入手机验证码" />
				</div>
				<div class="text">
					<span class="user-error" v-if="codeError">{{ codeErrorWhy }}</span>
					<img src="./img/blue/pass-icon.png" alt="" v-show="onpass==true" id="pass" />
					<img src="./img/white/pass-icon.png" alt="" v-show="onpass==false"/>
					<input type="password" autocomplete="new-password" @focus="onfocus('pass')" v-model="pass" @blur="onblur('pass')" placeholder="请输入密码" />
				</div>
				<div class="text">
					<span class="user-error" v-if="passError">{{ passErrorWhy }}</span>
					<img src="./img/blue/company-icon.png" alt="" v-show="oncompany==true" id="company" />
					<img src="./img/white/company-icon.png" alt="" v-show="oncompany==false"/>
					<input type="text" autocomplete="off" @focus="onfocus('company')" v-model="company" @blur="onblur('company')" placeholder="请输入公司" />
				</div>
				<div class="text">
					<span class="user-error" v-if="companyError">{{ companyErrorWhy }}</span>
					<img src="./img/blue/post-icon.png" alt="" v-show="onpost==true" id="post" />
					<img src="./img/white/post-icon.png" alt="" v-show="onpost==false"/>
					<input type="text" autocomplete="off" @focus="onfocus('post')" v-model="post" @blur="onblur('post')" placeholder="请输入您的职位" />
				</div>
				<div class="remember">
					<span class="user-error" v-if="postError">{{ postErrorWhy }}</span>
					<el-checkbox v-model="deal" style="color: #ffffff;text-decoration: underline;">我已阅读并同意 服务及隐私条款</el-checkbox>
					<span class="deal-error" v-if="dealError">{{ dealErrorWhy }}</span>
				</div>
				<button class="login" @click="reg()">注册</button>
			</div>
			<router-link to="/home" class="down"><img src="./img/down-icon.png" alt="" /></router-link>
			<div style="text-align: center;">
				<router-link to="/login" class="reg">已有账号？马上登陆</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { getUUID } from '@/utils';
import { isMobile } from '@/utils/validate';
export default {
	data() {
		return {
			onphone:true,
			oncodeimg:true,
			oncode:true,
			onpass:true,
			oncompany:true,
			onpost:true,
			checkResult:false,
			phone:'',
			imgcode:'',
			code:'',
			pass:'',
			company:'',
			post:'',
			captchaPath:'',
			phoneErrorWhy:'',
			imgcodeErrorWhy:'',
			postErrorWhy:'',
			companyErrorWhy:'',
			passErrorWhy:'',
			codeErrorWhy:'',
			dealErrorWhy:'',
			phoneError:false,
			imgcodeError:false,
			postError:false,
			companyError:false,
			passError:false,
			codeError:false,
			dealError:false,
			deal:false,
			codeText: '获取验证码',
			screenWidth: document.body.clientHeight
		};
	},
	watch: {
	  '$route' () {
	    this.getwidth()
	  }
	},
	created() {},
	mounted: function() {
		this.getimgcode();
		this.getwidth();
	},
	methods: {
		getwidth() {
			var userAgent = navigator.userAgent;
			if (this.screenWidth < 950) {
				if (userAgent.indexOf('Firefox') > -1) {
					document.getElementsByClassName('account-reg')[0].style.transform = 'scale(' + this.screenWidth / 950 + ')';
					document.getElementsByClassName('btm')[0].style.height = 'calc(100% - 79px)';
					document.getElementsByClassName('imgcode')[0].style.margin='0 10px'
				} else {
					document.getElementsByClassName('imgcode')[0].style.margin='0 10px'
					document.getElementsByClassName('btm')[0].style.zoom = this.screenWidth / 1000;
				}
			}
		},
		//获取焦点
		onfocus(e) {
			if (e == 'pass') {
				this.onpass=false
				this.passError = false;
			} else if (e == 'phone') {
				this.onphone=false
				this.phoneError = false;
			} else if (e == 'code') {
				this.oncode=false
				this.codeError = false;
			} else if (e == 'codeimg') {
				this.oncodeimg=false
				this.imgcodeError = false;
			}else if (e == 'company') {
				this.oncompany=false
				this.imgcodeError = false;
			}else if (e == 'post') {
				this.onpost=false
				this.imgcodeError = false;
			}
			document.getElementById(e).parentNode.style.borderColor = '#ffffff';
		},
		//失去焦点
		onblur(e) {
			if (e == 'pass') {
				this.onpass=true
			} else if (e == 'phone') {
				this.onphone=true
			} else if (e == 'code') {
				this.oncode=true
			} else if (e == 'codeimg') {
				this.oncodeimg=true
			}else if (e == 'company') {
				this.oncompany=true
			}else if (e == 'post') {
				this.onpost=true
			}
			document.getElementById(e).parentNode.style.borderColor = '#144c85';
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
						  url: this.$http.adornUrl("/sendsms/registered/" + this.phone),
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
		//点击注册
		reg(){
			if(this.phone==''||this.phone==undefined||this.phone==null||this.phone==' '){
				this.phoneError=true
				this.phoneErrorWhy='手机号不能为空'
				document.getElementById('phone').parentNode.style.borderColor = 'red';
				var hasphone=false
			}else if(isMobile(this.phone)==false){
				this.phoneError=true
				this.phoneErrorWhy='请输入正确的手机号'
				document.getElementById('phone').parentNode.style.borderColor = 'red';
				var hasphone=false
			}else{
				var hasphone=true
			}
			if(this.code==''||this.code==undefined||this.code==null||this.code==' '){
				this.codeError=true
				this.codeErrorWhy='验证码不能为空'
				document.getElementById('code').parentNode.style.borderColor = 'red';
				var hascode=false
			}else{
				var hascode=true
			}
			if(this.pass==''||this.pass==undefined||this.pass==null||this.pass==' '){
				this.passError=true
				this.passErrorWhy='密码不能为空'
				document.getElementById('pass').parentNode.style.borderColor = 'red';
				var haspass=false
			}else{
				var haspass=true
			}
			if(this.company==''||this.company==undefined||this.company==null||this.company==' '){
				this.companyError=true
				this.companyErrorWhy='公司不能为空'
				document.getElementById('company').parentNode.style.borderColor = 'red';
				var hascompany=false
			}else{
				var hascompany=true
			}
			if(this.post==''||this.post==undefined||this.post==null||this.post==' '){
				this.postError=true
				this.postErrorWhy='职位不能为空'
				document.getElementById('post').parentNode.style.borderColor = 'red';
				var haspost=false
			}else{
				var haspost=true
			}
			if(this.deal==false){
				this.dealError=true
				this.dealErrorWhy='请先同意服务条款'
				var hasdeal=false
			}else{
				var hasdeal=true
			}
			if(hasdeal==true&&haspost==true&&hascompany==true&&haspass==true&&hascode==true&&hasphone==true){
				this.$http({
				  url: this.$http.adornUrl("/registered/" + this.code),
				  method: "post",
				  data: {
				    mobile:this.phone,
						password:this.pass,
						company:this.company,
						companyPosition:this.post,
						code:this.code
				  }
				}).then(({ data }) => {
					let _this=this
				    // 成功提示
					if (data && data.code === 0) {
						_this.$message({
							message: '注册成功',
							type: 'success',
							showClose:true,
							onClose:function(){
								console.log(1)
								_this.$router.push({ path: 'login' });
							}
						});
					}
				}).catch(err => {
				});
			}
		}
	}
};
</script>

<style scoped>
.account-reg {
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -312px;
	margin-left: -295px;
}
.account-box {
	margin: 0 auto;
	height: 625px;
	width: 590px;
	border-style: solid;
	border-width: 1px;
	border-color: rgb(197, 197, 197);
	border-radius: 5px;
	background-color: rgba(255, 255, 255, 0.302);
	box-shadow: 0px 0px 6.8px 1.2px rgba(4, 0, 0, 0.3);
}
.logo {
	padding-top: 26px;
	width: 530px;
	margin: 0 auto;
	text-align: left;
}
.reg-flow {
	display: inline-block;
	vertical-align: middle;
	margin-left: 12px;
	padding-left: 10px;
	line-height: 20px;
	border-left: 1px solid #ffffff;
	font-size: 12px;
	color: #ffffff;
}
.text {
	width: 530px;
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
.deal-error{
	display: block;
	padding: 10px 0 0 32px;
	font-size: 12px;
	color: red;
	line-height: 12px;
}
.text input {
	height: 25px;
	width: 490px;
	margin-left: 8px;
	vertical-align: middle;
	background: none;
	border: none;
	outline: none;
	font-size: 12px;
}
.down {
	position: absolute;
	top: 0;
	left: 640px;
}
.reg {
	display: inline-block;
	width: auto;
	height: 35px;
	margin: 11px auto 0;
	padding-left: 8px;
	padding-right: 30px;
	background: url('./img/blue/cycle-icon.png') no-repeat center;
	background-position-x: 95%;
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
.remember {
	position: relative;
	width: 530px;
	margin: 0 auto;
	height: 86px;
	padding: 28px 0 18px;
}
.reg:hover {
	background: rgba(255, 255, 255, 0.102) url('./img/white/cycle-icon.png') no-repeat center;
	background-position-x: 95%;
	color: #ffffff;
}
.codes {
	width: 530px;
	margin: 0 auto;
	height: 65px;
	position: relative;
	padding-top: 22px;
}
.code {
	display: inline-block;
	width: 300px;
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
	width: 260px;
	background: none!important;
	font-size: 12px;
}
.imgcode {
	height: 46px;
	width: 112px;
	margin: 0 20px;
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
input:-internal-autofill-selected{
    -webkit-animation-name: autofill;
    -webkit-animation-fill-mode: both;
}
input:-internal-autofill-selected{
	background: none!important;
}
</style>
