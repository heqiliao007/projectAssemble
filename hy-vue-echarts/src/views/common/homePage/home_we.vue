<template>
	<div class="about">
		<el-row>
			<el-col :span="12" class="left">
				<img src="./img/names-icon.png" alt="" class="title">
				<p>依托大数据、人工智能等前沿技术，提供数据、舆情、营销、IP评估、版权监测以及企业信用等多元化服务，为文娱市场的IP制造、转换、评估提供专业的视角和解读；同时引导产业对接资本，为资本布局文化内容、文化渠道、文化贸易、文化金融、文创功能区建设等提供咨询服务，推动文化创意产业健康高效发展。</p>
				<img src="./img/title-icon.png" alt="" class="name">
				<img src="./img/slogan-icon.png" alt="" class="slogan">
			</el-col>
			<el-col :span="12">
				<video :src="video" width="660" height="452" controls="controls" style="border: none;outline: none;"></video>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		props: {},
		data() {
			return {
				video:''
			};
		},
		created() {},
		mounted: function() {
			this.getwidth();
			this.gitvideo()
		},
		methods: {
			getwidth() {
				var userAgent = navigator.userAgent;
				if (userAgent.indexOf('Firefox') > -1) {
					document.getElementsByClassName('btm')[0].removeAttribute("style");
					document.getElementsByTagName('body')[0].style.overflow = 'hidden';
				} else {
					document.getElementsByClassName('btm')[0].style.zoom = '1';
				}
			},
			//获取视频地址
			gitvideo(){
				this.$http({
					url: this.$http.adornUrl('/web/sysdict/getVideo'),
					method: 'GET'
				})
					.then(({ data }) => {
						this.video=data.dict[0].value
					})
					.catch(err => {
						// console.log('请求失败：');
					});
			}
		},
		watch: {}
	};
</script>

<style scoped>
	.about{
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -226px;
		margin-left: -660px;
		height: 452px;
		width: 1320px;
	}
	.left{
		padding-right: 40px;
	}
	.left p{
		font-size: 14px;
		color: #ffffff;
		text-indent: 2em;
		text-align: left;
		line-height: 1.714;
	}
	.title{
		margin-top: 34px;
		margin-bottom: 20px;
	}
	.name{
		float: right;
		margin-top: 42px;
	}
	.slogan{
		display: block;
		margin: 154px auto 0;
	}
</style>
