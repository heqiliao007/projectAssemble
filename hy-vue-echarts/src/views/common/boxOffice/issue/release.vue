<template>
	<div style="position: relative; line-height: 40px; padding-top: 10px; background: #dcdfe6;">
    <el-breadcrumb separator="/" style="border-left: 2px solid #3295D9; width: 96%; margin: 0 auto;">
      <el-breadcrumb-item :to="{ path: '/' }" style="margin-left: 5px;">发行情报</el-breadcrumb-item>
      <el-breadcrumb-item>将上映</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="24" justify="space-between" style=" margin-top: 10px; width: 100%; height: 40px; margin: 0 auto; background: #dcdfe6;">
      <!-- 展示列表的时候，可以选择年份，2011年-2019年往后的5年 -->
      <el-col :span="20" v-show="curretPage == 'list'">
        <div class="" style="padding-left: 25px;">
          <el-dropdown @command='handleChooseYear'>
            <span class="el-dropdown-link">
              {{year}}<i class="iconfont iconsanjiaoxing"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
              :command="item.label"
              v-for="item in yearOptions"
              :key="item.value">{{item.label}}</el-dropdown-item>
              <!-- <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <!-- 日历的时候，可以选择月份和年份 -->
      <el-col :span="20" style="text-align: center;" v-show="curretPage == 'date'">
        <div >
          <i class="iconfont iconjiantou-copy2" style="font-size: 16px;"></i>
          <el-dropdown @command='handleChooseYear' style="margin-right: 10px;">
            <span class="el-dropdown-link">
              {{year}}<i class="iconfont iconsanjiaoxing"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
              :command="item.label"
              v-for="item in yearOptions"
              :key="item.value">{{item.label}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command='handleChooseMonth'>
            <span class="el-dropdown-link">
              {{month}}<i class="iconfont iconsanjiaoxing"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
              :command="item.label"
              v-for="item in monthOptions"
              :key="item.value">{{item.label}}</el-dropdown-item>
              <!-- <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-select v-model="month" filterable placeholder="请选择" style="border-style: none;">
            <el-option
              v-for="item in monthOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
          <i class="iconfont iconjiantou1-copy-copy-copy" style="font-size: 16px;"></i>
        </div>
      </el-col>
      <!-- 点击按钮，选择展示日历或者列表 -->
      <el-col :span="4" style="text-align: center;">
        <div class="">
          <i class="iconfont iconrili" @click="handleChooseShow('date')" style="margin-right: 10px;" :class="curretPage == 'date' ? 'curretPage' : '' "></i>
          <i class="iconfont iconliebiao" @click="handleChooseShow('list')" :class="curretPage == 'list' ? 'curretPage' : '' "></i>
        </div>
      </el-col>
    </el-row>
    <!-- 展示列表的内容，选中日期哪一年的数据，默认为2019年的数据 -->
    <div v-for='(item, index) in listData' :key='index' v-show="curretPage == 'list'" style='width: 96%; margin: 0 auto; padding-bottom: 10px;'>
        <el-row>
          <p style='border-left: 2px solid #ccc; line-height: 20px; padding-left: 10px;'>
            {{item.month}}
            ({{year}})
          </p>
          <el-row justify="space-between" style="width: 95%; margin: 0 auto; ">
          <!-- 列表 -->
            <el-col style="width: 30%; margin-right: 15px; margin-top: 10px;" v-for='(i, index) in item.data' :key='index'>
              <div>{{i.date}}
                <span
                 style='color: #4A4A4A; border-bottom: 1px solid #4A4A4A; margin-right: 5px;'
                 v-for='(movie, id) in i.movies'
                 :key='id'
                 :style="hoverid == movie.id ? 'color: #3295D9; border-bottom: 1px solid #3295D9;' : ''"> <i style="font-style: normal;" @mouseover="handleMouse(movie.id)"
        	      @mouseleave="mouseLeave">{{movie.movie_name}}</i></span>
              </div>
            </el-col>
          </el-row>
        </el-row>
    </div>
    <!-- 展示日历，选中月份的数据数据，默认为当前的月份 -->
    <div v-show="curretPage == 'date'" style='width: 96%; margin: 0 auto; padding-bottom: 10px;'>
      <!-- 日历 -->
      <full-calendar
        :config="config"
        :events="events"
        ref="calendar"
        @event-selected='eventClick'
        @day-click="dayClick">
      </full-calendar>
      <!-- <fullCalendar
        :events='monthData'
        :config='config'
        @changeMonth="changeMonth"
        @eventClick="eventClick"
        @dayClick="dayClick"
        @moreClick="moreClick"
      >
      </fullCalendar> -->
    </div>
		<!-- <div class="cover" v-if="isSearching == 'true'" /> -->
		<div class="search" v-if="isSearching == 'true'">
			<div class="search-box">

				<span>选择片种:</span>
				<el-select v-model="filmKind" @change='choosefilmkind' placeholder="请选择">
					<el-option
					v-for="item in areaOptions"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
				<span>影片类型:</span>
				<el-select v-model="typeName" @change='choosetype' placeholder="请选择">
					<el-option
					v-for="item in typeOptions"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
				<span style="margin-left:56px">影片名称：</span>
				<el-input v-model="movieName" type="text" size="small" placeholder="请输入" style="width:120px"></el-input>
			</div>
		</div>
	</div>
</template>

<script>

import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'
export default {
	name: 'boxOfficeRelease',
	components: {},
	data() {
		return {
      hoverid: '',
      monthData: [
        {
          title : 'title',  // 事件内容
          start : '2019-5-11', // 事件开始时间
          end: '2019-5-11',
          description: 'This is a cool event',
          cssClass: 'blue'       // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
        },
        {
          title : 'sdjjsakfd',  // 事件内容
          start : '2019-5-11', // 事件开始时间
          // description: 'This is a cool event',
          cssClass: 'blue'       // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
        },
        {
          title : 'title',  // 事件内容
          start : '2019-5-11', // 事件开始时间
          description: 'This is a cool event',
          cssClass: 'blue'       // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
        },
        {
          title : 'title',  // 事件内容
          start : '2019-5-11', // 事件开始时间
          description: 'This is a cool event',
          cssClass: 'blue'       // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
        },
        {
          title : 'title',  // 事件内容
          start : '2019-5-11', // 事件开始时间
          description: 'This is a cool event',
          cssClass: 'blue'       // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
        },
        {
          title : 'title',  // 事件内容
          start : '2019-5-11', // 事件开始时间
          description: 'This is a cool event',
          cssClass: 'blue'       // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
        },
        {
          title : 'title',  // 事件内容
          start : '2019-5-11', // 事件开始时间
          description: 'This is a cool event',
          cssClass: 'blue'       // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
        },
        {
          title : 'title',  // 事件内容
          start : '2019-5-11', // 事件开始时间
          description: 'This is a cool event',
          cssClass: 'blue'       // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
        },
        {
          title : 'title',  // 事件内容
          start : '2019-5-11', // 事件开始时间
          description: 'This is a cool event',
          cssClass: 'blue'       // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
        },
        {
          title : 'title',  // 事件内容
          start : '2019-5-11', // 事件开始时间
          description: 'This is a cool event',
          cssClass: 'blue'       // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
        },
        {
          title : 'sssss',
          start : '2019-5-14',
          end : '2019-5-14',
          cssClass: 'blue'
        },
        {
          title : 'dddddddd',
          start : '2019-5-15',
          end : '2019-5-15',
          description: 'This is a cool event',
          cssClass: ''
        },
        {
          title : 'cccccc',
          start : '2018-12-20',
          end : '2018-12-30',
          cssClass: 'red'
        },
        {
          title : 'aaaaaa',
          start : '2018-12-01',
          end : '2018-12-30',
          cssClass: 'red'
        },
        {
          title : 'bbbbbb',
          start : '2018-12-05',
          end : '2019-1-10',
          cssClass: 'blue'
        }],
      config: {
        firstDay:'0',//以周日为每周的第一天
        // weekends: true,//是否在日历中显示周末
        bootstrapGlyphicons: {
          close: 'glyphicon-remove',
          prev: 'glyphicon-chevron-left',
          next: 'glyphicon-chevron-right',
          prevYear: 'glyphicon-backward',
          nextYear: 'glyphicon-forward'
        },
        eventBackgroundColor: '',
        eventTextColor: '#ccc',
        themeSystem: 'bootstrap3',
        locale: 'zh-cn',//语言
        defaultView: 'month',//默认按月显示
        height: 'auto',//高度
        fixedWeekCount:false,//是否固定显示六周
        // weekMode:"liquid",//周数不定，每周的高度可变，整个日历高度不变
        allDaySlot:false,
        prev: '<',
        // backgroundColor: '#fff',
        // allDay:true,
        header: {//表头信息
          // left: 'prev, next, today',
          left: '',
          center: 'prev',
          right: ''
        },
      },
      events: [{
        id:1,
        title:'出差',
        start:'2019-04-03',
        borderColor: '#999999',
        backgroundColor: ''
        // end:'2019-04-05'
        }, {
          id:2,
          title:'春游',
          start:'2019-04-12',
        }, {
          id:3,
          title:'出去玩',
          start:'2019-04-12',
        }, {
          id:5,
          title:'总票房',
          start:'2019-04-12',
        }],
      curretPage: 'list', // list显示列表，date显示日历
      current: 1,
			totalPage: 1,
			weekslist: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      year: '2019', // 筛选条件-年份
      yearOptions: [
        {label: '2011', value: '1'},
        {label: '2012', value: '2'},
        {label: '2013', value: '3'},
        {label: '2014', value: '4'},
        {label: '2015', value: '5'},
        {label: '2016', value: '6'},
        {label: '2017', value: '7'},
        {label: '2018', value: '8'},
        {label: '2019', value: '9'},
        {label: '2020', value: '10'},
        {label: '2021', value: '11'},
        {label: '2022', value: '12'},
        {label: '2023', value: '13'},
        {label: '2024', value: '14'},
        {label: '2025', value: '15'},
        {label: '2026', value: '16'},
      ],
      month: '2', // 筛选条件-月份
      monthOptions: [
        {label: '01', value: '1'},
        {label: '02', value: '2'},
        {label: '03', value: '3'},
        {label: '04', value: '4'},
        {label: '05', value: '5'},
        {label: '06', value: '6'},
        {label: '07', value: '7'},
        {label: '08', value: '8'},
        {label: '09', value: '9'},
        {label: '10', value: '10'},
        {label: '11', value: '11'},
        {label: '12', value: '12'}

      ],
      filmKind: '',
			filmKindCode: '', // 筛选条件-片种
			areaOptions: [
      ], // 国别列表
      movieTypeCode: '', // 筛选条件-电影类别
      typeName: '',
			typeOptions: [], // 主类型列表
      movieName: '', // 筛选条件-电影名称
      listData: [], // 列表数据
			activeName:'first',
			date: new Date(),
			isSearching: false,
			weeks: [
				{
					show_time: '10-4（35,680,00）',
					movie_names: '无名之辈 新灰姑凉',
					content: '复仇者联盟2 全面内战报非法付付付付',
					box_office: '12452'
				}
			]
		};
  },
  components: {
    fullCalendar: FullCalendar
  },
	created() {
		window.addEventListener('setItem', () => {
			this.newVal = sessionStorage.getItem('watchStorage');
			this.isSearching = this.newVal;
		})
	},
	mounted() {
    this.getmoviesType()
    this.getList()
    this.getlistFilmKind()
    // this.getCalendarDate()
    // this.getWeeks()
	},
	methods: {
    handleMouse(val) {
      console.log(val)
      this.hoverid = val
    },
    mouseLeave() {
      this.hoverid = ''
    },
    // 查找type

    // 选择年份
    handleChooseYear(command) {
      this.year = command
      console.log('hahah', command)
    },
    // 选择片种
    choosefilmkind(val) {
      console.log(val)
      this.filmKindCode = val
    },
    // 获取电影类型接口
    getmoviesType () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/web/sysdict/listMovieCategory'),
        method: 'GET'

      }).then( ({data}) => {
        // console.log(data)
        if (data.code === 0) {
          _this.typeOptions = data.dict
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取片种类型接口
    getlistFilmKind () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/web/sysdict/listFilmKind'),
        method: 'GET'

      }).then( ({data}) => {
        console.log(data)
        if (data.code === 0) {
          _this.areaOptions = data.dict
          // _this.typeOptions = data.dict
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 选择电影类型，并保存请求列表数据的参数
    choosetype (val) {
      this.movieTypeCode = val
    },
    // 选择月份
    handleChooseMonth (command) {
      this.month = command
    },
    // 选择展示日历或者列表，list展示列表，date展示日历
    handleChooseShow(val) {
      console.log(val)
      this.curretPage = val
    },
    changeMonth (start, end, current) {
       console.log('changeMonth', start.format(), end.format(), current.format())
      },
      // 点击事件
      eventClick (event, jsEvent, pos) {
        console.log('eventClick', event, jsEvent, pos)
      },
      // 点击当天
      dayClick (day, jsEvent) {
         console.log('dayClick', day, jsEvent)
      },
      // 查看更多
      moreClick (day, events, jsEvent) {
        console.log('moreCLick', day, events, jsEvent)
      },
		getCalendarDate(){
      console.log('111')
			this.$http({
			  url: this.$http.adornUrl('/web/advertising/listAdType'),
			  method: 'GET',
			  // data: {'year':'2019','classify':'0001','type':'1'},
			}).then(({ data }) => {
				console.log(data)
			}).catch(err => {
			  // console.log('请求失败：');
			});
    },
    // 获取将上映列表
    getList () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/web/movie/upcomingMovieForList'),
        method: 'POST',
        data: _this.$http.adornData({
          year: _this.year,
          filmKindCode: _this.filmKindCode,
          movieTypeCode:_this.movieTypeCode,
          movieName: _this.movieName
        })
      }).then( ({data}) => {
        console.log(data)
        _this.listData = data.listData
      }).catch( err => {
        console.log(err)
      })
    },
    getWeeks() { // /web/movie/upcomingMovieFoCalendar
      console.log('获取日历数据')
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('web/movie/upcomingMovieFoCalendar'),
        method: 'POST',
        data: _this.$http.adornData({
          'areaCode': '',
          'typeCode': '',
          'movieName': ''
        })
      }).then (({data}) => {
				console.log(data)
				if (data.code == 0) {
					_this.weeks = data.page
					let weekDay = _this.weekslist
					var firstDay = new Date(Date.parse(data.page[0].show_time))
					console.log(weekDay[firstDay.getDay()])
					if (weekDay[firstDay.getDay()] === '星期一') {
						_this.weeks.push
					}
					// var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
		// var myDate = new Date(Date.parse("2019/5/19"));
		// console.log(weekDay[myDate.getDay()]);    // 星期六
				}
      }).catch(err => {
        console.log('获取失败')
      })
    },
    //分页
		handleCurrentChange(val) {
			this.loading = true;
			this.current = val;
		},
	}
};
</script>
<style>
  .fc th:nth-child(n){
    background-color: #0084cf;
    color: #fff;
  }
  .fc th:nth-child(2n){
    background-color: #3fabe9;
    color: #fff;
  }
.fc th, .fc td {
  border: 1px solid #a9a9a9;
}
</style>
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  /* color: #409EFF; */
  }
.el-icon-arrow-down {
  font-size: 12px;
}
.movie_name_item::hover {
  color: red;
}
input {
  background-color: none;
}
.curretPage {
  color: #3295D9
}
.cover {
	position: fixed;
	left: 0;
	top: 128px;
	background: #333333;
	width: 100%; /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
	height: 100%;
	filter: alpha(opacity=35); /*设置透明度为60%*/
	opacity: 0.35; /*非IE浏览器下设置透明度为60%*/
	z-index: 2000;
}
.search {
	background: #ffffff;
	position: fixed;
	top: 128px;
	width: 100%;
	z-index: 2000;
}
.search-box {
	height: 58px;
	line-height: 58px;
	margin: 0 auto;
	text-align: center;
}
.week {
	margin: 0;
}

.week span {
	display: inline-block;
	width: 14%;
	text-align: center;
}

.weeks {
	width: 14.28%;
	height: 211px;
	margin-bottom: 10px;
	box-sizing: border-box;
	padding: 0 5px;
}

.weeks > div {
	overflow: hidden;
	height: 100%;
	background: #ffffff;
}

.weeks p {
	margin-left: 34px;
}

.item-title {
	margin-top: 21px;
	font-size: 16px;
	color: #333333;
}

.item-con {
	margin-top: 25px;
	font-size: 18px;
	color: #999999;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
</style>
<style>
.el-tabs__nav {
	margin-left: 30px;
}
.el-tabs__nav-wrap::after {
	display: none;
}
</style>
