<template>
  <div>
    <sideNav></sideNav>
    <div class="isFixed">
			<div style="">
				<div style="height:86px; background:#4c4c4c; color: #fff; border: none; overflow: hidden;">
				  <div class="header_logo">
				    <a @click="toindex()"><img class="logoPic" src="../../common/head/img/recommended_logo.png" /></a>
				    <div class="searchbox" :class="{'changecolor':isOpen == true}" @click="handleOpen()">
				      <!-- <img class="searchPic" v-show="isOpen === false" src="../../common/head/img/search.png">
				      <img class="searchPic" v-show="isOpen === true" src="../../common/head/img/searchyellow.png"> -->
              <i class="searchPic iconfont iconsousuopx" style='font-size: 30px;' :style="isOpen === true ? 'color: yellow' : 'color: #fff;'"></i>
				    </div>
				  </div>
				  <div style="width: 62%; margin: 0 auto;">
				    <el-menu
				      :default-active="activeName"
				      class="el-menu-vertical-demo"
				      mode="horizontal"
				      style="height: 100%; background:#4c4c4c; height: 100%; color: #FFFFFF; margin: auto 0; padding-left: 0;"
				      active-text-color="#fff"
				      text-color="#E9E9E9"
				      @select="handleClick"
				    >
				      <el-menu-item v-for="rec in recommondData" :index="rec.id" :key="rec.id" style="display: flex; flex-direction: column;">
				        <img style="margin: 0 auto; height: 36px; margin-top: 10px; " :src='rec.icon || pic' alt="">
				        <span style="margin-top: -24px;text-align: center;">
				          {{rec.name}}
				        </span>
				      </el-menu-item>
				    </el-menu>
				  </div>
				  <div class="header_right">
				    <img src="../head/img/touxiang.png" alt="">
				    <el-dropdown :hide-on-click="false" @visible-change ="changeColor($event)">
				      <span class="el-dropdown-link" :style='"color:" + color'>
				        刘航<i class="el-icon-arrow-up el-icon--right" :class='rotate'></i>
				      </span>
				      <el-dropdown-menu slot="dropdown">
				        <el-dropdown-item>操作日志</el-dropdown-item>
				        <el-dropdown-item>退出系统</el-dropdown-item>
				      </el-dropdown-menu>
				    </el-dropdown>
				  </div>
				</div>
				<div style="clear:both"></div>
			</div>
			<div>
			  <div class="searchHeader" v-if="isOpen">
			    <div class="searchInputbox" style="border-radius: 100px;">
			      <!-- <label for="">全部</label> -->
			      <select v-model="value" :placeholder="value" style="width: 100px;height: 100%; border: none; outline: none; padding-left: 22px;">
			        <option
			          v-for="item in options"
			          selected
			          :key="item.value"
			          :label="item.label"
			          :value="item.value">
			        </option>
			      </select>
			      <input style="width: 200px;margin-left: -10px; border: none;height: 100%;" />
			      <el-button icon="el-icon-search icon-fontSize" style="margin-left: -10px; border: none; height: 100%;border-radius: 100px;"></el-button>
			    </div>
			    <div style="position: absolute; top: 50%; left: 630px; transform: translateY(-50%); ">
			      <span style="color: #fff; margin-right: 30px;">高级搜索</span>
			      <span style='color: #FFEA27' @click.stop="closeOpen"><i class='iconfont iconguanbi'></i></span>
			    </div>
			  </div>
			  <div style="background:#fff;border-bottom: 1px solid #ebeef5;height: 50px;" v-if="subMemuList.length > 0">
			    <div style="width:100%; margin: 0 auto;text-align:center; position: relative;">
			      <ul class="sub-memu">
			        <li
			          class="sub-memu-item"
			          :class="{'sub-memu-item-active':rec.active}"
			          @click="subMemuHandleClick(rec)"
			          v-for="rec in subMemuList"
			          :key="rec.id"
			        >{{rec.name}}
			        </li>
			        <div class="search-button" style="display:inline-block" :style="isSearching?'color:' + '#3295D9' : ''" @click="toggleSearchBox">
			          <i class="iconfont iconshaixuan" style="margin-right: 5px;"></i>
			          <span>筛选</span>
			        </div>
			      </ul>
			    </div>
			  </div>
			</div>
			<div>
    </div>
		</div>
		<div style="margin-top: 149px;">
				<router-view/>
		</div>
  </div>
</template>

<script>
import sideNav from "../recommend/sidenav";
import { constants } from 'crypto';
import pic from '../../common/head/img/header.png'
export default {
  name: "viedeoTank-Home",
  data() {
    return {
      pic: pic,
      color: '#fff',
      rotate: '',
      isFixed: false,
      isOpen: false, // 是否打开搜索框
      subMemuList: [],
      activeName: "1",
			secondid:'',
      isSearching: false,
      value: '全部', // 搜索框下拉的选项值
      input5: '', // 搜索框的值
      options: [
        {value: 0, label: '全部'},
        {value: 1, label: '电影'},
        {value: 2, label: '明星'},
        {value: 3, label: '影院'},
        {value: 4, label: '导演'}
      ],
      recommondData: [],
      date: new Date()
    };
  },
  created() {
    this.value = this.options[0].value;
  },
  mounted () {
		this.secondid=this.$cookie.get('secondmenu')
    this.getList()
    // window.addEventListener('scroll', this.handleScroll)
    this.getmenu()
  },
  watch: {
    date: function(newdate, olddate) {
      this.CurentTime(newdate)
      var date = this.CurentTime(newdate)
      sessionStorage.setItem('_date_str', date)
      this.resetSetItem('watchStorage', date)
    }
  },
  methods: {
    // 改变用户头像颜色
    changeColor (e) {
      console.log(e)
      if (e == true) {
        this.color = '#40A9FF'
        this.rotate = 'rotate'
      } else {
        this.color = '#fff'
        this.rotate = ''
      }
    },
    // 监听页面滚动
    handleScroll () {
      let _this = this.$cookie.get('secondmenu')
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      console.log(scrollTop)
      if (scrollTop > 100) {
        // console.log('qqq')
        _this.isFixed = true
      } else {
				_this.isFixed = false
			}
    },
    handleOpen () {
      console.log('显示搜索')
      this.isOpen = !this.isOpen
    },
    closeOpen() {
      this.isOpen = false
    },
    getList(){
      this.$http({
        url: this.$http.adornUrl('/web/product/navigationbar/2'),
        method: 'get'
      }).then(({ data }) => {
        console.log(data)
        var menu=[]
        var msg=data
				this.subMemuList=[]
				for(let m = 0; m < msg.navigationbars.length; m++){
					menu.push({ id: msg.navigationbars[m].id, name: msg.navigationbars[m].name, icon: msg.navigationbars[m].icon, children: []});
				}
        for(let i=0;i<menu.length;i++){
          this.$http({
            url: this.$http.adornUrl('/web/product/navigationbar/'+menu[i].id),
            method: 'get'
          }).then(({ data }) => {
            console.log(data)
            // if(data.navigationbars==0){
            //   console.log(msg.navigationbars[i].icon)
            //   menu.push({ id: msg.navigationbars[i].id, name: msg.navigationbars[i].name, icon: msg.navigationbars[i].icon})
            // }else {
              // var secondary={ id: msg.navigationbars[i].id, name: msg.navigationbars[i].name, icon: msg.navigationbars[i].icon, children:[]}
              for(let j=0;j<data.navigationbars.length;j++){
								if(i==0&&data.navigationbars.length!=0){
									console.log(111111)
									if(this.secondid==''||this.secondid==undefined||this.secondid==null){

										if(j==0){
											this.subMemuList.push({ id: data.navigationbars[j].id, name: data.navigationbars[j].name,active:true})
										}else{
											this.subMemuList.push({ id: data.navigationbars[j].id, name: data.navigationbars[j].name})
										}
									}else{
										if(this.secondid==data.navigationbars[j].id){
											this.subMemuList.push({ id: data.navigationbars[j].id, name: data.navigationbars[j].name,active:true})
										}else{
											this.subMemuList.push({ id: data.navigationbars[j].id, name: data.navigationbars[j].name})
										}
									}
								}
                menu[i].children.push({ id: data.navigationbars[j].id, name: data.navigationbars[j].name})
              }
              // menu.push(secondary)
              // console.log(menu)
            // }
            if(i == msg.navigationbars.length-1){
              this.recommondData = menu
							this.getmenu()
              // console.log(this.recommondData)
            }
          }).catch(err => {
            // console.log('请求失败：');
          });
        }
      }).catch(err => {
        // console.log('请求失败：');
      });
    },
    // 根据链接显示当前菜单
    getmenu() {
      this.activeName = this.$cookie.get('firstmenu')
			console.log(this.activeName)
      if (this.activeName == null||this.activeName == undefined||this.activeName == ''||this.activeName == ' ') {
        this.activeName = '1127752927051096066'
      }
			var second = this.$cookie.get('secondmenu')
			if (second != null) {
				console.log(22222222222)
			  this.subMemuList = JSON.parse(sessionStorage.getItem('secondmenus'))
			  this.subMemuList.forEach(item => {
					console.log(second,item)
			    if (item.id == second) {
			      item.active = true;
			    } else {
			      item.active = false;
			    }
			  });
			}
    },
    handleClick(args) {
      this.isOpen = false
      var selected = null;
      for (let i = 0; i < this.recommondData.length; i++) {
        if (args === this.recommondData[i].id) {
          selected = this.recommondData[i];
          break;
        }
      }
      //点击一级菜单有二级菜单跳转
      if (selected.children && selected.children.length > 0) {
        if(selected.name=='渠道分析'){
          console.log(selected)
          for(var i=0;i<selected.children.length;i++){
            if(selected.children[i].name=='类型分析'){
              selected.children[i].path='/videoTank/type'
            }else if(selected.children[i].name=='类型趋势'){
              // selected.children[i].name='typeTrend'
              selected.children[i].path='/videoTank/typeTrend'
            }else if(selected.children[i].name=='人群画像'){
              selected.children[i].path='/videoTank/personAdvator'
            }
          }
        }
        if(selected.name=='类型趋势'){
          console.log(selected)
          for(var i=0;i<selected.children.length;i++){
            if(selected.children[i].name=='类型分析'){
              selected.children[i].path='/videoTank/type'
            }else if(selected.children[i].name=='类型趋势'){
              selected.children[i].path='/videoTank/typeTrend'
            }else if(selected.children[i].name=='人群画像'){
              selected.children[i].path='/videoTank/personAdvator'
            }
          }
        }
        this.subMemuList = selected.children;
        this.subMemuList.forEach(item => {
          item.active = false;
        });
        this.subMemuList[0].active = true;
        console.log('active', this.subMemuList[0])
        this.$cookie.set('firstmenu', selected.id)
        this.$cookie.set('secondmenu', selected.children[0].id)
        sessionStorage.setItem('secondmenus', JSON.stringify(selected.children))
        this.$cookie.set('productid', selected.children[0].id)
        console.log(this.subMemuList)
        if(selected.children[0].path==undefined){
          this.$router.push({
            name: selected.children[0].name
          });
        }else {
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
        this.$cookie.set('firstmenu', selected.id)
        sessionStorage.setItem('secondmenus', '')
        this.$cookie.set('productid', selected.id)
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
      // constants.log(selected)
      if (selected.name) {
				this.$cookie.set('secondmenu', selected.id);
				this.$cookie.set('productid', selected.id);
        if (selected.path == undefined) {
          this.$router.push({
            name: selected.name
          })
        } else {
          this.$router.push({
            path: selected.path
          })
        }
      }
    },
    toggleSearchBox() {
      this.isSearching = !this.isSearching
      var data=this.isSearching
      sessionStorage.setItem('isSearching', data)
      this.resetSetItem('watchStorage', data)
    },
    //格式化时间
    CurentTime(now){
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var clock = year + "-";
      if(month < 10)
        clock += "0";
      clock += month + "-";
      if(day < 10)
        clock += "0";
      clock+=day
      return(clock);
    },
		//点击logo跳转首页
		toindex(){
			this.$cookie.set('firstmenu', '');
			this.$cookie.set('secondmenu', '')
			sessionStorage.setItem('secondmenus', '');
			this.$router.push({ path: '/home_modul' });
		}
  },
  components: {
    // headEr
    sideNav
  },
  destroyed () {
    // window.removeEventListener('scroll', this.handleScroll)
  },
};
</script>

<style lang="scss">
	// html, body {overflow:auto;margin: 0;}
body {height:100%;overflow:auto;margin: 0;}
.el-menu-item.is-active {
   background-color: rgba(231, 235, 240, 0.3) !important;
}
.el-menu-item:hover {
  color: red;
  background-color: rgba(231, 235, 240, 0.3) !important;
}
.el-menu--horizontal>.el-menu-item {
  padding-top: 5px;
  height: 100%;
  line-height: 76px;
  font-size: 12px;
  text-align: center;
}
.rotate {
  transform: rotate(180deg);
}
.isFixed {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 99;
	// bottom: 0px;
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
/* 顶部样式 */
 /* 顶部样式 */
   .header_logo {
     width: 19%;
     min-width: 259px;
     height: 86px;
     background-color: #0084CF;
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
    background-color: #40A9FF;
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
    top: 0;
    right: 0;
  }
  .searchHeader {
    position: relative;
    width: 100%;
    height:50px;
    background-color: #40A9FF;
    padding-left: 240px;
    padding-top: 5px;
    padding-bottom: 3px;
  }
  .searchInputbox {
    background-color: #FFFFFF;
    width: 360px;
    height: 103%;
   overflow: hidden;
  }
  input:focus{
    outline: none;
  }
  .searchPic {
    width: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

.el-menu--horizontal {
  border-bottom: none;
  font-size: 14px;
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
	color: #3295D9;
	border-bottom: 3px solid #3295D9;
}

.search-button {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  /* float: right; */
  margin-right: 72px;
}
.search-button:hover {
  cursor: pointer;
}
.search-box {
  height: 58px;
  line-height: 58px;
  margin: 0 auto;
  text-align: center;
}
</style>
