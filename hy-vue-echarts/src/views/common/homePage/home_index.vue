<template>
	<div class="content">
		<h1 class="title">瀚叶·文化大数据</h1>
		<el-row style="text-align: center;">
      <div class="item" @click="link(6)" id="two">
        <div class="item-top" id="literature"></div>
        <div class="item-btn"><a href="javascript:" class="btn btn-sm animated-button victoria-four">文学作品</a></div>
      </div>
      <div class="item" @click="link(3)" id="three">
        <div class="item-top" id="star"></div>
        <div class="item-btn"><a href="javascript:" class="btn btn-sm animated-button victoria-four">剧本智库</a></div>
      </div>
		</el-row>
    <el-row style="text-align: center;vertical-align: middle;">
      <div class="item" @click="link(4)" id="seven">
      	<div class="item-top" id="game"></div>
      	<div class="item-btn"><a href="javascript:" class="btn btn-sm animated-button victoria-four">广告智库</a></div>
      </div>
      <div class="item" @click="link(7)" id="one">
      	<div class="item-top" id="entry"></div>
      	<div class="item-btn"><a href="javascript:" class="btn btn-sm animated-button victoria-four">文化百科</a></div>
      </div>
      <div class="item" @click="link(1)" id="four">
      	<div class="item-top" id="movie"></div>
      	<div class="item-btn"><a href="javascript:" class="btn btn-sm animated-button victoria-four">院线智库</a></div>
      </div>
    </el-row>
    <el-row style="text-align: center;">
      <div class="item" @click="link(8)" id="six">
      	<div class="item-top" id="enterprise"></div>
      	<div class="item-btn"><a href="javascript:" class="btn btn-sm animated-button victoria-four">评价体系</a></div>
      </div>
      <div class="item" @click="link(2)" id="five">
      	<div class="item-top" id="video"></div>
      	<div class="item-btn"><a href="javascript:" class="btn btn-sm animated-button victoria-four">视频智库</a></div>
      </div>
    </el-row>
		<!-- <el-row>
			<el-col style="text-align: center;">
				<div class="item" @click="link(1)">
					<svg height="131" width="145" xmlns="http://www.w3.org/2000/svg"><rect class="shape" height="131" width="145"></rect></svg>
					<div class="item-top" id="movie"></div>
					<div class="item-btn"><a href="javascript:" class="btn btn-sm animated-button victoria-four">院线智库</a></div>
				</div><div class="item" @click="link(2)">
					<svg height="131" width="145" xmlns="http://www.w3.org/2000/svg"><rect class="shape" height="131" width="145"></rect></svg>
					<div class="item-top" id="video"></div>
					<div class="item-btn"><a href="javascript:" class="btn btn-sm animated-button victoria-four">视频智库</a></div>
				</div>
				<div class="item" @click="link(3)">
					<svg height="131" width="145" xmlns="http://www.w3.org/2000/svg"><rect class="shape" height="131" width="145"></rect></svg>
					<div class="item-top" id="star"></div>
					<div class="item-btn"><a href="javascript:" class="btn btn-sm animated-button victoria-four">剧本库</a></div>
				</div>
				<div class="item" @click="link(4)">
					<svg height="131" width="145" xmlns="http://www.w3.org/2000/svg"><rect class="shape" height="131" width="145"></rect></svg>
					<div class="item-top" id="game"></div>
					<div class="item-btn"><a href="javascript:" class="btn btn-sm animated-button victoria-four">广告智库</a></div>
				</div>
			</el-col>
		</el-row>
		<el-row style="margin-top: 75px;">
			<el-col style="text-align: center;">
				<div class="item" @click="link(5)" style="margin: 0 37px;">
					<svg height="131" width="145" xmlns="http://www.w3.org/2000/svg"><rect class="shape" height="131" width="145"></rect></svg>
					<div class="item-top" id="short"></div>
					<div class="item-btn"><a href="javascript:" class="btn btn-sm animated-button victoria-four" style="width: 165px;"></a></div>
				</div>
				<div class="item" @click="link(6)">
					<svg height="131" width="145" xmlns="http://www.w3.org/2000/svg"><rect class="shape" height="131" width="145"></rect></svg>
					<div class="item-top" id="literature"></div>
					<div class="item-btn"><a href="javascript:" class="btn btn-sm animated-button victoria-four">文学作品</a></div>
				</div>
				<div class="item" @click="link(7)">
					<svg height="131" width="145" xmlns="http://www.w3.org/2000/svg"><rect class="shape" height="131" width="145"></rect></svg>
					<div class="item-top" id="entry"></div>
					<div class="item-btn"><a href="javascript:" class="btn btn-sm animated-button victoria-four">文化百科</a></div>
				</div>
				<div class="item" @click="link(8)">
					<svg height="131" width="145" xmlns="http://www.w3.org/2000/svg"><rect class="shape" height="131" width="145"></rect></svg>
					<div class="item-top" id="enterprise"></div>
					<div class="item-btn"><a href="javascript:" class="btn btn-sm animated-button victoria-four">评价体系</a></div>
				</div>
			</el-col>
		</el-row> -->
	</div>
</template>

<script>
export default {
	data() {
		return {
			screenWidth: document.body.clientHeight,
		};
	},
	watch: {
	  '$route' () {
	    this.getwidth()
      this.order()
	  }
	},
	created: function() {},
	mounted: function() {
		this.getwidth()
    this.order()
	},
	watch:{
		screenWidth(val){
			// 为了避免频繁触发resize函数导致页面卡顿，使用定时器
			if(!this.timer){
				// 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
				this.screenWidth = val
				this.timer = true
				let that = this
				setTimeout(function(){
					// 打印screenWidth变化的值
					that.timer = false
				},400)
			}
		}
	},
	methods: {
    order(){
      console.log(1)
      setTimeout(function(){
        document.getElementById('one').style.transition='0.2s'
        document.getElementById('one').style.transform='scale(1)'
      },0)
      setTimeout(function(){
         console.log(1)
        // document.getElementById('two').style.visibility='visible'
        document.getElementById('two').style.transition='0.2s'
        document.getElementById('two').style.transform='scale(1)'
      },100)
      setTimeout(function(){
         console.log(1)
        // document.getElementById('three').style.visibility='visible'
        document.getElementById('three').style.transition='0.2s'
        document.getElementById('three').style.transform='scale(1)'
      },200)
      setTimeout(function(){
         console.log(1)
        // document.getElementById('four').style.visibility='visible'
        document.getElementById('four').style.transition='0.2s'
        document.getElementById('four').style.transform='scale(1)'
      },300)
      setTimeout(function(){
         console.log(1)
        // document.getElementById('five').style.visibility='visible'
        document.getElementById('five').style.transition='0.2s'
        document.getElementById('five').style.transform='scale(1)'
      },400)
      setTimeout(function(){
         console.log(1)
        // document.getElementById('six').style.visibility='visible'
        document.getElementById('six').style.transition='0.2s'
        document.getElementById('six').style.transform='scale(1)'
      },500)
      setTimeout(function(){
         console.log(1)
        // document.getElementById('seven').style.visibility='visible'
        document.getElementById('seven').style.transition='0.2s'
        document.getElementById('seven').style.transform='scale(1)'
      },600)
    },
		getwidth(){
			var userAgent = navigator.userAgent;
			if(this.screenWidth<950){
				if(userAgent.indexOf("Firefox") > -1){
					document.getElementsByClassName('btm')[0].style.transform='scale('+this.screenWidth/950+')'
					document.getElementsByClassName('btm')[0].style.transformOrigin='top'
				}else{
					document.getElementsByClassName('btm')[0].style.zoom=this.screenWidth/1000
				}
			}
		},
		link(id){
			sessionStorage.setItem('moduleId',id)
			this.$cookie.set('_data_active_id', id);
			if(id==1){
				this.$router.push('/box_office/recommond/recommond');
			}else if(id==2){
				this.$router.push('/videoTank/drama');
			}else if(id==3){
				this.$router.push('playblack/goodsblack');
			}else if(id==4){
				this.$router.push('/Advertising/advertising');
			}else if(id==5){
				// this.$router.push('/wikipedia/createMovie');
			}else if(id==6){
				this.$router.push('/networkLiterature/index');
			}else if(id==7){
				this.$router.push('/wikipedia/index');
			}else if(id==8){
				this.$router.push('/evaluationSystem/invest');
			}
		}
	},
	components: {}
};
</script>

<style scoped>
 #one,#two,#three,#four,#five,#six,#seven{
    transform:scale(0);
    -webkit-transform:scale(0);
    -moz-transform:scale(0);
  }
  /* #two{
    visibility: hidden;
  }
  #three{
    visibility: hidden;
  }
  #four{
    visibility: hidden;
  }
  #five{
    visibility: hidden;
  }
  #six{
    visibility: hidden;
  }
  #seven{
    visibility: hidden;
  } */
.title{
  margin: 0;
	font-size: 72px;
	font-weight: normal;
	font-family: "Adobe Heiti Std";
	color: rgb(255, 255, 255);
	line-height: 2.741;
	text-align: center;
	height: 179px;
}
.item {
	display: inline-block;
  vertical-align: middle;
	cursor: pointer;
	text-align: center;
	margin: 0 47px;
}
#movie{
	background: url(./img/blue/movie-icon.png) no-repeat center;
}
.item:hover #movie{
	background: url(./img/white/movie-icon.png) no-repeat center;
}
#video{
	background: url(./img/blue/video-icon.png) no-repeat center;
}
.item:hover #video{
	background: url(./img/white/video-icon.png) no-repeat center;
}
#star{
	background: url(./img/blue/star-icon.png) no-repeat center;
}
.item:hover #star{
	background: url(./img/white/star-icon.png) no-repeat center;
}
#game{
	background: url(./img/blue/game-icon.png) no-repeat center;
}
.item:hover #game{
	background: url(./img/white/game-icon.png) no-repeat center;
}
#short{
	background: url(./img/blue/short-icon.png) no-repeat center;
}
.item:hover #short{
	background: url(./img/white/short-icon.png) no-repeat center;
}
#literature{
	background: url(./img/blue/literature-icon.png) no-repeat center;
}
.item:hover #literature{
	background: url(./img/white/literature-icon.png) no-repeat center;
}
#enterprise{
	background: url(./img/blue/enterprise-icon.png) no-repeat center;
}
.item:hover #enterprise{
	background: url(./img/white/enterprise-icon.png) no-repeat center;
}
#entry{
  width: 176px;
  height: 192px;
	background: url(./img/blue/entry-icon.png) no-repeat center;
}
.item:hover #entry{
	background: url(./img/white/entry-icon.png) no-repeat center;
}
.item-top {
  width: 135px;
  height: 147px;
}
.item-top img {
	/* vertical-align: middle; */
}
.item-btn {
	/* margin-top: 25px; */
	position: relative;
}
.item-btn a{
  overflow: hidden;
	display: inline-block;
	text-align: center;
  text-decoration: none;
	border: none;
	outline: none;
	font-size: 20px;
	font-family: "Microsoft YaHei";
	color: rgb(85, 169, 255);
	font-weight: bold;
}
.item:hover a{
  color: rgb(194, 225, 255);
}
</style>
