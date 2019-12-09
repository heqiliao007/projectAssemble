<template>
	<div>
		<div class="navMatu">
			<div class="bluemask"></div>
			<div class="menuList">
				<div
					v-for="(item, id) in list"
					:key="id"
					style="position: relative; height: 60px; line-height: 60px; margin-top: 5px;"
					:class="hoverid === item.id || activeid == item.id ? 'currtHover' : ''"
					@mouseenter="changeHoverIdshow(item.id)"
					@mouseleave="changeHoverIdhide(item.id)"
					@click="changeactiveId(item.id, item.path)"
				>
					<span v-show="hoverid == item.id" class="navName">{{ item.name }}</span>
					<img class="navPic" :src="activeid == item.id ? item.activePic : item.pic" alt="" />
				</div>
				<!-- <a href="./serviceAnalysis/index.html">
				<a href="./src/views/common/serviceAnalysis/index.html">
					<div
						style="position: relative; height: 60px; line-height: 60px; margin-top: 5px;"
						:class="hoverid === '10' ? 'currtHover' : ''"
						@mouseenter="changeHoverIdshow('10')"
						@mouseleave="changeHoverIdhide('10')"
					>
						<span v-show="hoverid == 10" class="navName">自助式分析</span>
						<img class="navPic" :src="activeid == 10 ? zizhuAcitivepic : zizhupic" alt="" />
					</div>
				</a> -->
			</div>
			<div class="duibiMask" :style="activeid == 9 ? 'width:' + '230px' : 'width:' + '0px'">
				<div style="color: #333; font-size: 24px; line-height: 40px; width: 90%; margin: 0 auto;" @click="closeMask">
					<i class="el-icon-arrow-right"></i>
					电影对比
				</div>
				<div v-for="(movie, index) in chooseMovieList" :key="index" class="chooseList" v-show="chooseMovieList.length > 0">
					<p style="position: relative; width: 90%; margin: 0 auto; height: 30px; border-bottom: 1px solid #ccc; line-height: 30px;">
						<span style="display: inline-block; width: 80%;">{{ movie.name }}</span>
						<i class="el-icon-close" @click.stop="deletMove(movie.name)"></i>
					</p>
				</div>
				<div style="width: 90%; margin: 10px auto;">
					<el-select v-model="movieName" filterable @change="addMovie($event)" placeholder="请选择">
						<el-option v-for="item in movieList" :key="item.id" :label="item.name" :value="item.name"></el-option>
					</el-select>
				</div>
				<div style="width: 90%; margin: 10px auto;">
					<span
						style="display: inline-block; width: 80px; text-align: center; line-height: 30px; background: #0084CF; color: #fff; border-radius: 5px; margin-top: 20px;"
					>
						开始对比
					</span>
					<span style="color: #ccc; margin-left: 5px; font-size: 10px;">最多6个</span>
				</div>
				<p style="width: 90%; margin: 10px auto;" @click="clearChooseMovieList" :style="chooseMovieList.length > 0 ? 'color:' + '#0084CF' : 'color:' + '#333'">清空</p>
			</div>
		</div>
	</div>
</template>

<script>
import dianyingpic from './icon/w_dianying.png';
import dianyingActivepic from './icon/y_dianying.png';

import shipinggpic from './icon/w_shiping.png';
import shipingActivepic from './icon/y_shiping.png';

import mingxingpic from './icon/w_mingxing.png';
import mingxingActivepic from './icon/y_mingxing.png';

import youxipic from './icon/w_youxi.png';
import youxiActivepic from './icon/y_youxi.png';

import duanshippic from './icon/w_duanship.png';
import duanshipActivepic from './icon/y_duanship.png';

import wenxuepic from './icon/w_wenxue.png';
import wenxueActivepic from './icon/y_wenxue.png';

import qiyepic from './icon/w_qiye.png';
import qiyeActivepic from './icon/y_qiye.png';

import baikepic from './icon/w_baike.png';
import baikeActivepic from './icon/y_baike.png';

import duibipic from './icon/w_duibi.png';
import duibiActivepic from './icon/y_duibi.png';

import zizhupic from './icon/w_zizhu.png';
import zizhuAcitivepic from './icon/y_zizhu.png';
export default {
	data() {
		return {
			movieName: '',
			activeid: '',
			hoverid: 0,
      // tmpPic: tmpPic,
      // zizhupic: zizhupic,
      // zizhuAcitivepic: zizhuAcitivepic,
			list: [
				{ name: '院线智库', pic: dianyingpic, activePic: dianyingActivepic, id: 1, path: '/box_office/recommond/recommond' },
				{ name: '视频智库', pic: shipinggpic, activePic: shipingActivepic, id: 2, path: '/videoTank/drama' },
				{ name: '剧本智库', pic: mingxingpic, activePic: mingxingActivepic, id: 3, path: '/playblack/goodsblack' },
				{ name: '广告智库', pic: youxipic, activePic: youxiActivepic, id: 4, path: '/Advertising/advertising' },
				// { name: '短视频智库', pic: duanshippic, activePic: duanshipActivepic, id: 5, path: '' },
				{ name: '文学作品', pic: wenxuepic, activePic: wenxueActivepic, id: 6, path: '/networkLiterature/index' },
				{ name: '评价体系', pic: qiyepic, activePic: qiyeActivepic, id: 8, path: '' },
				{ name: '文化百科', pic: baikepic, activePic: baikeActivepic, id: 7, path: '/wikipedia/index' },
				{ name: '对比', pic: duibipic, activePic: duibiActivepic, id: 9, path: '' },
				{name: '自助式分析', pic: zizhupic, activePic: zizhuAcitivepic, id: 10, path: '/wikipedia/analysis'},
			],
			movieList: [
				{
					name: '无双',
					id: '1'
				},
				{
					name: '外星人的外星人',
					id: '2'
				},
				{
					name: '赌圣',
					id: '3'
				},
				{
					name: '无间道',
					id: '4'
				},
				{
					name: '澳门风云',
					id: '5'
				},
				{
					name: '小时代',
					id: '6'
				},
				{
					name: '寻龙诀',
					id: '7'
				}
			],
			chooseMovieList: []
		};
	},
	created() {},
	updated() {},
	mounted() {
		let _this = this;
		_this.activeid = this.$cookie.get('_data_active_id') || 0;
		// console.log(_this.activeid, '当前为')
	},
	methods: {
		// 鼠标进入菜单栏的时候，显示菜单栏的名称
		changeHoverIdshow(val) {
			// console.log(val)
			let _this = this;
			_this.hoverid = val;
		},
		// 鼠标离开菜单栏的时候，隐藏菜单栏的名称
		changeHoverIdhide(val) {
			// console.log(val)
			let _this = this;
			_this.hoverid = 0;
		},
		// 选择菜单栏，并根据id跳转页面
		changeactiveId(val, path) {
			// console.log('点击', val)
			let _this = this;
			let _data_active_id = val;
			_this.activeid = val;
			sessionStorage.setItem('lastmoduleId', '');
			sessionStorage.setItem('firstmenu', '');
			sessionStorage.setItem('secondmenu', '');
			sessionStorage.setItem('secondmenus', '');
			if (path != '' && val != 10) {
				sessionStorage.setItem('moduleId',_data_active_id)
				_this.$router.push({ path: path });
				_this.$cookie.set('_data_active_id', _data_active_id);
			}
			if (_this.activeid == 10) {
				_this.$router.push({ path: path });
			}
		},
		// 关闭对比弹框
		closeMask() {
			let _this = this;
			_this.activeid = 0;
		},
		// 选择筛选框中的值
		addMovie(val) {
			let _this = this;
			_this.movieName = '';
			// console.log(val)
			let movie = {
				name: val
			};
			let can;
			if (_this.chooseMovieList.length > 0 && _this.chooseMovieList.length < 6) {
				// console.log(_this.chooseMovieList)
				for (let i = 0; i < _this.chooseMovieList.length; i++) {
					if (val == _this.chooseMovieList[i].name) {
						// console.log('已经添加')
						can = false;
						alert('已添加该电影');
						return;
					} else {
						// console.log('未添加')
						can = true;
					}
				}
				if (can === true) {
					_this.chooseMovieList.push(movie);
				}
			} else if (_this.chooseMovieList.length === 0) {
				_this.chooseMovieList.push(movie);
			} else {
				alert('最多添加6个电影');
			}
		},
		// 点击X删除当前点击的元素
		deletMove(e) {
			// console.log(e)
			let _this = this;
			let index = -1;
			for (let i = 0; i < _this.chooseMovieList.length; i++) {
				if (e === _this.chooseMovieList[i].name) {
					index = i;
				}
			}
			_this.chooseMovieList.splice(index, 1);
		},
		// 清空选中的值
		clearChooseMovieList() {
			let _this = this;
			_this.chooseMovieList = [];
		}
	}
};
</script>

<style scoped>
.navMatu {
	position: fixed;
	display: flex;
	top: 86px;
	right: 0;
	z-index: 2002;
	min-width: 50px;
	/* width: 50px; */
	height: 100vh;
	background-color: #399bff;
}
.bluemask {
	width: 57px;
	height: 5px;
	position: absolute;
	top: 0;
	right: 0;
	background-color: #9ccdfb;
}
.currtHover {
	background-color: #0084cf;
}
.navName {
	position: absolute;
	display: block;
	width: 105px;
	text-align: center;
	/* width: 60px; */
	padding-left: 10px;
	padding-right: 10px;
	color: #fff;
	height: 60px;
	top: 0;
	left: -105px;
	background-color: #0084cf;
}
.menuList {
	position: relative;
}
.duibiMask {
	box-sizing: border-box;
	width: 0px;
	height: 100%;
	overflow: hidden;
	background-color: #ffffff;
	/* position: absolute; */
	top: 0;
	right: 0;
}
.navPic {
	width: 32px;
	height: 32px;
	margin: 2px 10px 8px 15px;
}
</style>
