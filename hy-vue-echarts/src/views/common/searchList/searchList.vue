<template>
	<div style="background: #EDEDED;">
		<div style="height:150px;"><top-header @checkdata="checkdata"></top-header></div>
    <div style="padding: 0 40px; margin-top: -20px;">
      <div style="border-left: 2px solid #40A9FF; padding-left: 10px; margin-bottom: 20px;">
        高级搜索
      </div>
      <div class="searchInput">
        <input v-model="parmas.name" style="width: 90%; height: 100%; border: none; outline:none; padding-left: 10px;"/>
        <!-- <i class="iconfont iconiconfontzhizuobiaozhun22" style="font-size: 20px;"></i>  -->
        <i class="iconfont iconiconfontzhizuobiaozhun22 inputIcon text_hover" @click='updateSearch'></i>
      </div>
      <div class="bannerBox">
        <!-- <div> -->
          <div>
            搜索条件：<span class="chooseItem" v-for="(item, index) in chooseList" :key="index"> {{item.name}}
              <i class="iconfont iconguanbi" style="margin-left: 5px;" @click='delItem(item)'></i>
            </span>
          </div>
          <div style="margin-top: 20px;">
            <p class="closeChoose" @click="showCheckList" :class="!isshowCheck ? 'noshowCheck' : ''">
              <i class="iconfont iconshouqianniuicon" style="font-size: 12px;"></i>
              {{isshowCheckText}}
            </p>
            <div class="chooseList" v-show="isshowCheck">
              <span class="chooseListTitle">搜索类型 ：</span>
              <el-checkbox-group
                v-model="chooseChecked"
                @change="checked">
                <el-checkbox :checked="item.checked" v-for="(item, index) in checkedOptions" :label="item.value" :key="index">{{item.label}}</el-checkbox>
              </el-checkbox-group>
              <div>
                <span v-if="titleDate != ''">{{titleDate}}</span>
                <el-dropdown v-if="titleDate != ''" style="width: 100px; border: 1px solid #ededed; padding: 0; line-height: 26px; text-align: center;" @command="changeDate">
                  <span class="el-dropdown-link">
                    {{titleDate}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item command="一周内">一周内</el-dropdown-item>
                  <el-dropdown-item command="一月内">一月内</el-dropdown-item>
                  <el-dropdown-item command="一年内">一年内</el-dropdown-item>
                  <el-dropdown-item divided>
                    从: <el-date-picker
                        v-model="parmas.start"
                        type="date"
                        @change.prev="changeStart"
                        placeholder="选择日期">
                      </el-date-picker>
                  </el-dropdown-item>
                  <el-dropdown-item style="margin-top: 5px;">
                    至: <el-date-picker
                          v-model="parmas.end"
                          type="date"
                          @change="changeEnd"
                          placeholder="选择日期">
                        </el-date-picker>
                  </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <!-- 电影：题材类型, 播出平台, 剧集类型（全部、电视剧、网络剧）; 综艺类型（全部、网络综艺、电视综艺）; -->
                <span style="margin-left: 13px;" v-if="titleThem != ''" >{{titleThem}}: </span>
                <el-select v-if="titleThem != ''" @change='changeThem' v-model="parmas.themeType" size="mini" placeholder="请选择">
                  <el-option
                    v-for="item in esThemeType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span style="margin-left: 13px;" v-if="titlePlat != ''">{{titlePlat}}: </span>
                <el-select
                  v-if="titlePlat != ''"
                  v-model="parmas.platform"
                  size="mini"
                  @change='changePlatform'
                  >
                  <el-option v-for="item in platform" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <span style="margin-left: 13px;" v-if="titlePlatType != ''">{{titlePlatType}}: </span>
                <el-select
                  v-if="titlePlatType != ''"
                  v-model="parmas.platformType"
                  size="mini"
                  @change='changePlatformType'
                  >
                  <el-option v-for="item in esPlatformType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div>
            <p style="font-size: 18px; color: #4C4C4C;">搜索结果</p>
				    <p style="width: 45px; border-bottom: 2px solid #40A9FF; margin-top: -10px;"></p>
            <div  v-loading='loading' class="searchlist" v-for="(item, index) in searchList" :key="index">
              <p class="searchlistTitle text_hover" @click="toDail(item)">{{item.object.name || ''}}</p>
              <p class="searchlistContain">{{item.object.intro || '暂无简介'}}</p>
              <p class="searchlistfooter">{{item.object.type || ''}}</p>
            </div>
            <div v-if='nodata' style="text-align: center;">
              <img src="./img/nodata.png" alt="">
            </div>
          </div>
          <el-pagination
            v-if="nodata != true"
            style="float: right; margin-top: 20px; margin-right: 20px;"
            background
            layout="prev, pager, next"
            :current-page="current"
						@current-change="handleCurrentChange"
            :total="totalPage">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
import headEr from '../recommend/home';
import { types } from 'util';
export default {
	// name: 'searchList',
	data() {
		return {
      loading: true,
      nodata: false, // 无数据时候，展示无数据的图片
      selected: '', // 输入框选择的内容
      chooseValue: '', // 下拉框选择的值
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
            console.log(time)
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
              console.log(picker)
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      chooseList: [], // 展示选择的标签
      checkedOptions: [], // 选择的筛选条件
      chooseChecked: [], // 已选择的数据
      isshowCheck: false,
      isshowCheckText: '展开筛选',
      searchList: [], // 获取到的数据列表
      titleDate: '', //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
      titleThem: '', // 剧集下拉列表
      titlePlat: '', // 播出平台下拉列表
      titlePlatType: '', // 平台类型
      esPlatformType: [], // 平台类型
      esThemeType: [], // 题材类型
      platform: [], // 平台
      parmas: {
        name: '', // 输入框输入的文字
        index: '', // 下拉选择的智库
        type: '', // 和 index参数 配合使用，见下表
        start: '', // 时间筛选起
        end: '', // 时间筛选止
        themeType: '', // 	题材类型(情感/剧情、喜剧、科幻、悬疑、犯罪、古装、其他、战争/革命)
        platform: '', // 播出平台，当 index = “video” 时才可以选择传入此参数。（爱奇艺，腾讯，优酷，搜狐等）
        platformType: '' //平台类型，当 index = “video” 时才可以选择传入此参数。（0-网络平台，电视平台，2-影院平台）
      },
      current: 1, // 当前页面数
      totalPage: 0, // 总页数
		};
  },
  computed: {

  },
	mounted () {
    let _this = this
    _this.parmas.name = _this.$route.query.nameinfo // 接收上一个页面传过来的参数
    _this.selected = _this.$route.query.selected // 接收上一个页面传过来的参数 包括了index， type
    // selectChange () {
      if (_this.selected == ',') { // 只选了全部的时候
          console.log('选择全部')
          _this.titleDate = '' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '' // 剧集下拉列表
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
        if (_this.selected == 'movie,default') {
          console.log('"电影"');
          _this.titleDate = '上映时间', //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '题材类型' // 题材类型
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''

        }
        if (_this.selected == 'staff,default') {
          console.log('"艺人"');
          _this.titleDate = '' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '' // 剧集下拉列表
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
        if (_this.selected == 'webliterary,default') {
          console.log('"网文"');
          _this.titleDate = '上架时间' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '题材类型' // 题材类型
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
        if (_this.selected == 'video,tv') {
          console.log('"剧集"');
          _this.titleDate = '播出时间' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '题材类型' // 题材类型
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '剧集类型' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
        if (_this.selected == 'video,cartoon') {
          console.log('"动漫"');
          _this.titleDate = '播出时间' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '' // 题材类型
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
        if (_this.selected == 'video,movie') {
          console.log('"网播电影"')
          _this.titleDate = '上线时间' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '' // 题材类型
          _this.titlePlat = '播出平台' // 播出平台下拉列表
          _this.titlePlatType = '' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
        if (_this.selected == 'video,show') {
          console.log('综艺')
          console.log('"网播电影"')
          _this.titleDate = '播出时间' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '' // 题材类型
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '综艺类型' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
    let arr = _this.selected.split(',') // 分割使用获得index和type
    _this.parmas.index = arr[0]
    _this.parmas.type = arr[1]
    _this.getDataList(_this.parmas) // 获取数据
    _this.getOptions() // 获取展开筛选的多选项
    _this.gettypeOptions() // 获取展开筛选的下拉选择器
    // _this.selectedlabel = _this.selectWorkName(this.selected
    let item = {
      name: this.parmas.name,
      type: 'name'
    }
    _this.chooseList.push(item) // 将标签显示到页面
  },
	watch: {},
	methods: {
    // 获取列表页面筛选多选 首次进入页面的时候会走这个方法
    getOptions () {
      let _this = this
      let label = ''
      _this.$http({
				url: _this.$http.adornUrl('/web/sysdict/esIndexAndType'),
				method: 'post'
			}).then(({data}) => {
        console.log(data, '=================全局搜索的下拉框')
        _this.checkedOptions = data.dict
        console.log(_this.checkedOptions)
        for (let i = 0; i < _this.checkedOptions.length; i++) {
          _this.checkedOptions[i]['checked'] = false
          if (_this.selected == _this.checkedOptions[i].value) {
            _this.checkedOptions[i].checked = true
            label = _this.checkedOptions[i].label
          }
        }
        let item = {
          name: label,
          type: 'checked'
        }
        _this.chooseList.unshift(item) // 将标签显示到页面
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取题材类型、平台类型、平台列表/web/sysdict/esOptions
    gettypeOptions () {
      this.$http({
				url: this.$http.adornUrl('/web/sysdict/esOptions'),
				method: 'post'
			}).then(({data}) => {
        console.log(data, '平台列表')
        if (data.code == 0) {
          this.esPlatformType = data.esPlatformType // 平台类型： 剧集类型， 综艺类型
          this.esThemeType = data.esThemeType // 题材类型
          this.platform = data.platform // 播出平台
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 搜索框输入内容时候，刷新页面
    updateSearch () {
      let _this = this
      _this.loading = true
      _this.chooseList.pop()
      let item = {
        name: this.parmas.name,
        type: 'name'
      }
      _this.chooseList.push(item)
      _this.chooseChecked = []
      _this.parmas.index = ''
      _this.parmas.type = ''
      _this.parmas.start = ''
      _this.parmas.end = ''
      _this.parmas.platform = ''
      _this.parmas.platformType = ''
      _this.parmas.themeType = ''
      _this.getDataList(_this.parmas) // 获取数据
    },
    // 获取列表信息
    getDataList (parmas) {
      let _this = this

      console.log('=======================搜索列表信息')
      _this.$http({
				url: _this.$http.adornUrl('/web/search?name=' + parmas.name + '&index=' + parmas.index + '&type=' + parmas.type + '&start=' + parmas.start + '&end=' + parmas.end + '&themeType=' + parmas.themeType + '&platform=' + parmas.platform + '&platformType=' + parmas.platformType + '&current='+ _this.current + '&size=10'),
        method: 'post',
        data: parmas
			}).then(({data}) => {
        console.log(data, '=================全局搜索的列表信息')
        if (data.code === 0) {
          // if (data.result.list.length > 0) {
            if (data.result == null) {
              _this.nodata = true
              _this.loading = false
              _this.searchList = []
            }
            _this.searchList = data.result.list
            _this.totalPage = data.result.totalPage
            _this.loading = false

          // for (let i = 0; i < data.result.list.length; i++) {
          // }
        }

      }).catch(err => {
        console.log(err)
      })
    },
    // 多选框操作增加筛选和减少筛选
    checked (val) {
      console.log(val)
      let _this = this
      _this.loading = true
      if (val.length > 1) {
        _this.titleDate = '', //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
        _this.titleThem = '', // 剧集下拉列表
        _this.titlePlat = '', // 播出平台下拉列表
        _this.titlePlatType = '', // 平台类型
        _this.parmas.themeType = ''
        _this.parmas.start = ''
        _this.parmas.end = ''
        _this.parmas.platform = ''
        _this.parmas.platformType = ''
        console.log('数组超过一位')

      } else {
        if (val[0] == ',') { // 只选了全部的时候
          console.log('选择全部')
          _this.titleDate = '' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '' // 剧集下拉列表
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
        if (val[0] == 'movie,default') {
          console.log('"电影"');
          _this.titleDate = '上映时间', //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '题材类型' // 题材类型
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''

        }
        if (val[0] == 'staff,default') {
          console.log('"艺人"');
          _this.titleDate = '' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '' // 剧集下拉列表
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
        if (val[0] == 'webliterary,default') {
          console.log('"网文"');
          _this.titleDate = '上架时间' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '题材类型' // 题材类型
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
        if (val[0] == 'video,tv') {
          console.log('"剧集"');
          _this.titleDate = '播出时间' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '题材类型' // 题材类型
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '剧集类型' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
        if (val[0] == 'video,cartoon') {
          console.log('"动漫"');
          _this.titleDate = '播出时间' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '' // 题材类型
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
        if (val[0] == 'video,movie') {
          console.log('"网播电影"')
          _this.titleDate = '上线时间' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '' // 题材类型
          _this.titlePlat = '播出平台' // 播出平台下拉列表
          _this.titlePlatType = '' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
        if (val[0] == 'video,show') {
          console.log('综艺')
          console.log('"网播电影"')
          _this.titleDate = '播出时间' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '' // 题材类型
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '综艺类型' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
      }
      // if (val[0] == '')
      let indexList = []
      let index = ''
      let typeList = []
      let type = ''
      _this.chooseList = []
      _this.selected = val
      console.log(val, 'sdahfksjfdksdjfskja')
      let label = ''
      for (let i = 0; i < val.length; i++) {
        console.log(val[i])
        indexList.push(val[i].split(',')[0]) // 分割使用获得index和type
        typeList.push(val[i].split(',')[1])
        for (let k = 0; k < _this.checkedOptions.length; k++) {
          if (val[i] == this.checkedOptions[k].value) {
            this.checkedOptions[k].checked = true
            label = this.checkedOptions[k].label
          }

        }
        let item = {
          name: label,
          type: 'checked'
        }
        _this.chooseList.unshift(item) // 将标签显示到页面
      }
      if (_this.parmas.name != '') {
        let item = {
          name: this.parmas.name,
          type: 'name'
        }
        _this.chooseList.push(item)
        // _this.chooseList.push(_this.parmas.name) // 将标签显示到页面
      }
      for (let k = 0; k < indexList.length; k++) {
        index += indexList[k] + ','
      }
      _this.parmas.index = index
      for (let j = 0; j < typeList.length; j++) {
        type += typeList[j] + ','
      }
      _this.parmas.type = type
      _this.getDataList(_this.parmas)
    },
    // 获取分页的数据
    handleCurrentChange (val) {
      console.log(val)
      let _this = this
      _this.current = val
      _this.loading = true
      _this.getDataList(_this.parmas)
    },
    // 选择是否展示筛选
    showCheckList () {
      this.isshowCheck = !this.isshowCheck
      if (this.isshowCheck === true) {
        this.isshowCheckText = '收起筛选'
      } else {
        this.isshowCheckText = '展开筛选'
      }
    },
    // 子路由传过来的搜索条件获取数据 ===此时的selected也只有一个
    checkdata (data) {
      let _this = this
      _this.loading = true
      _this.chooseList = []
      let label = ''
      console.log(data, '================子路由传过来的参数')
      if (data.selected) {
        _this.selected = data.selected
        for (let i = 0; i < _this.checkedOptions.length; i++) {
          // _this.checkedOptions[i]['checked'] = false
          if (_this.selected == _this.checkedOptions[i].value) {
            _this.checkedOptions[i].checked = true
            label = _this.checkedOptions[i].label
          }
        }
        let item = {
          name: label,
          type: 'checked'
        }
        _this.chooseList.unshift(item) // 将标签显示到页面
        // _this.chooseList.unshift(label) // 将标签显示到页面
      if (_this.selected == ',') { // 只选了全部的时候
          console.log('选择全部')
          _this.titleDate = '' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '' // 剧集下拉列表
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
        if (_this.selected == 'movie,default') {
          console.log('"电影"');
          _this.titleDate = '上映时间', //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '题材类型' // 题材类型
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''

        }
        if (_this.selected == 'staff,default') {
          console.log('"艺人"');
          _this.titleDate = '' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '' // 剧集下拉列表
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
        if (_this.selected == 'webliterary,default') {
          console.log('"网文"');
          _this.titleDate = '上架时间' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '题材类型' // 题材类型
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
        if (_this.selected == 'video,tv') {
          console.log('"剧集"');
          _this.titleDate = '播出时间' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '题材类型' // 题材类型
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '剧集类型' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
        if (_this.selected == 'video,cartoon') {
          console.log('"动漫"');
          _this.titleDate = '播出时间' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '' // 题材类型
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
        if (_this.selected == 'video,movie') {
          console.log('"网播电影"')
          _this.titleDate = '上线时间' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '' // 题材类型
          _this.titlePlat = '播出平台' // 播出平台下拉列表
          _this.titlePlatType = '' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
        if (_this.selected == 'video,show') {
          console.log('综艺')
          console.log('"网播电影"')
          _this.titleDate = '播出时间' //  电影：上映时间；网播电影：上线时间, 剧集：播出时间；综艺：播出时间;动漫：播出时间;网络文学：上架时间
          _this.titleThem = '' // 题材类型
          _this.titlePlat = '' // 播出平台下拉列表
          _this.titlePlatType = '综艺类型' // 平台类型
          _this.parmas.themeType = ''
          _this.parmas.start = ''
          _this.parmas.end = ''
          _this.parmas.platform = ''
          _this.parmas.platformType = ''
        }
      // }
        let arr = _this.selected.split(',') // 分割使用获得index和type
        _this.parmas.index = arr[0]
        _this.parmas.type = arr[1]
      }
      if (data.nameinfo != '') {
        let item = {
        name: this.parmas.name,
        type: 'name'
      }
      _this.chooseList.push(item)
        // _this.chooseList.push(data.nameinfo)
        _this.parmas.name = data.nameinfo
      }
      _this.getDataList(_this.parmas) // 获取数据
      console.log(this.chooseList)
    },
    // 跳转到各个标题详情页面
    toDail (e) {
      console.log(e.object.es_clazz, e)
      let id = e.id
      let menu = '高级搜索'
      if (e.object.es_clazz == 'movie') {
        sessionStorage.setItem('movieId', id);
        this.$router.push({
            path: '/video',
            query: {
              id: id,
              lastmenu: menu
            }
          })
      }
      if (e.object.es_clazz == 'video') {
        // this.$message.error('暂无法查看剧集详情');
        this.$router.push({
            path: '/videoTank/dramaDail',
            query: {
              id: id,
              lastmenu: menu
            }
          })
      }
      if (e.object.es_clazz == 'webliterary') {
        console.log('调转到文学详情')
        this.$router.push({
          path: '/networkLiterature/networksDails',
          query: {
            id: id,
            lastmenu: menu
          }
        })
      }
      if (e.object.es_clazz == 'staff') {
        this.$router.push({
          path: '/actor',
          query: {
          name: e.object.name,
				  lastmenu: menu,
				  movie: e.object.name
          }
        })
      }

    },
    // 删除搜索条件标签,并从新渲染数据
    delItem (val) {
      console.log(val)
      let _this = this
      _this.loading = true
      let temSelect = ''
      let temCheckOptions = []
      for (let i = 0; i < _this.chooseList.length; i++) {
        if (val === _this.chooseList[i]) {
          _this.chooseList.splice(i, 1)
        }
      }
      if (val.type == 'name') { // 删除的是输入框的名字
        _this.parmas.name = ''
      } else if (val.type == 'checked') { // 删除的是多选
        for (let k = 0; k < _this.checkedOptions.length; k++) {
          console.log('safjkhjfhsjdfhajsdh===================', _this.checkedOptions[k])
          console.log(_this.chooseChecked)
          if (val.name == _this.checkedOptions[k].label) {
            console.log('===================', _this.checkedOptions[k].label)
            _this.checkedOptions[k].checked = false
            temSelect = _this.checkedOptions[k].value
          }
        }
        for (let j = 0; j < _this.chooseChecked.length; j++) {
          if (temSelect == _this.chooseChecked[j]) {
            _this.chooseChecked.splice(j, 1);
          }
        }
      } else if (val.type == 'start') { // 删除的是开始时间
        _this.parmas.start = ''
      } else if (val.type == 'end') { // 删除的是结束时间
        _this.parmas.end = ''
      } else if (val.type == 'them') { // 删除的是题材类型
        _this.parmas.themeType = ''
      } else if (val.type == 'plam') { // 删除的是平台
        _this.parmas.platform = ''
      } else if (val.type == 'plamType') { // 删除的是平台类型
        _this.parmas.start = ''
      }
        let indexList = []
        let typeList = []
        let index = ''
        let type = ''
        temCheckOptions = _this.chooseChecked
        console.log(_this.chooseChecked, '======chooseChecked')
        if (temCheckOptions.length > 0) {
          for (let v = 0; v < temCheckOptions.length; v++) {
            indexList.push(temCheckOptions[v].split(',')[0]) // 分割使用获得index和type
            typeList.push(temCheckOptions[v].split(',')[1])
          }
          for (let h = 0; h < indexList.length; h++) {
          index += indexList[h] + ','
        }
          _this.parmas.index = index
          for (let g = 0; g < typeList.length; g++) {
            type += typeList[g] + ','
          }
          _this.parmas.type = type
        } else {
          _this.parmas.index = ''
          _this.parmas.type = ''
        }
        _this.getDataList(_this.parmas)
    },
    // 选择时间
    changeStart (e) {
      this.loading = true
      console.log(e)
      let start = this.CurentTime(e)
      this.parmas.start = start
      this.getDataList(this.parmas)
      let item = {
        name: this.parmas.start,
        type: 'start'
      }
      this.chooseList.push(item) // 将标签显示到页面
    },
    // 选择结束时间
    changeEnd (e) {
      console.log(e)
      this.loading = true
      let end = this.CurentTime(e)
      this.parmas.end = end
      this.getDataList(this.parmas)
      let item = {
        name: this.parmas.end,
        type: 'end'
      }
      this.chooseList.push(item) // 将标签显示到页面
    },
    // 选择开始时间
    changeDate (e) {
      this.loading = true
      console.log(e)
      if (e) {
        console.log(e)
        console.log(this.parmas)
        const end = new Date();
        let start = ''
        if (e == '一周内') {
          start = new Date(new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7))
        } else if (e == '一月内') {
          start = new Date(new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 30))
        } else if (e == '一年内') {
          start = new Date(new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 365))
        }
        console.log(this.CurentTime(end))
        console.log(this.CurentTime(start))
        this.parmas.start = this.CurentTime(start)
        this.parmas.end = this.CurentTime(end)
        this.chooseList.push({
          name: this.parmas.start,
          type: 'start'
        })
        this.chooseList.push({
          name: this.parmas.end,
          type: 'end'
        }) 
        // 将标签显示到页面
        this.getDataList(this.parmas)
      } else {
        console.log('时间选择器')
      }
    },
    // 选择题材类型
    changeThem () {
      this.loading = true
      console.log(this.parmas.themeType)
      let item = {
        name: this.parmas.themeType,
        type: 'them'
      }
      this.chooseList.push(item) // 将标签显示到页面
      this.getDataList(this.parmas)
    },
    // 选择平台
    changePlatform () {
      this.loading = true
      console.log(this.parmas.platform)
      let item = {
        name: this.parmas.platform,
        type: 'plam'
      }
      this.chooseList.push(item) // 将标签显示到页面
      this.getDataList(this.parmas)
    },
    changePlatformType () {
      this.loading = true
      console.log(this.parmas.platformType)
      let label = ''
      for (let i = 0; i < this.esPlatformType.length; i++) {
        if (this.parmas.platformType == this.esPlatformType[i].value) {
          label = this.esPlatformType[i].label
        }
      }
      let item = {
        name: label,
        type: 'plamType'
      }
      this.chooseList.push(item) // 将标签显示到页面
      this.getDataList(this.parmas)
    },
    // 格式化时间
    CurentTime (now) {
        var year = now.getFullYear()
        var month = now.getMonth() + 1
        var day = now.getDate()
        var clock = year + "-"
        if (month < 10)
          clock += "0"
        clock += month + "-"
        if (day < 10)
          clock += "0"
        clock += day
        return (clock)
    },
  },
	components: {
		'top-header': headEr
	}
};
</script>

<style scoped>
.lists {
	margin-bottom: 18px;
}
.text_hover{
    cursor: pointer;
    display: inline-block;
  }
.item {
	background: #ffffff;
	margin: 0 auto 18px;
	float: none;
	padding: 0 53px;
}
.item_title {
	margin: 0;
	padding-top: 22px;
	color: #0084cf;
	font-size: 22px;
}
.item_title span {
	color: #f60000;
}
.item_intro {
	margin: 10px 0;
	font-size: 16px;
	color: #7a7a7a;
	line-height: 22px;
}
.item_type {
	margin: 0;
	padding-bottom: 15px;
	font-size: 16px;
	color: #7a7a7a;
	line-height: 22px;
}
.searchInput {
  width: 374px;
  height: 40px;
  border: 1px solid rgba(0,0,0,1);
  background: rgba(255,255,255,1);
  overflow: hidden;
  position: relative;
}
.inputIcon {
  font-size: 25px;
  position: absolute;
  top: 8px;
  right: 10px;
  color: #0084CF;
  font-weight: 700;
}
.bannerBox {
  border-top: 1px solid #D4D4D4;
  width: 100%;
  padding-top: 10px;
  margin-top: 20px;
 padding-bottom: 100px;
}
/* 已选择标签的样式 */
.chooseItem {
  border: 1px dashed #0084CF;
  color: #0084CF;
  margin-right: 10px;
  padding: 5px;
}
/* 收起筛选的头部 */
.closeChoose {
  background: #fff;
  width: 90px;
  height: 30px;
  color: #0084CF;
  line-height: 30px;
  text-align: center;
}
.chooseList {
  margin-top: -14px;
  position: relative;
  width: 100%;
  /* height: 40px; */
  line-height: 40px;
  background: #fff;
  overflow: hidden;
  padding-left: 130px;
}
.chooseListTitle {
  position: absolute;
  left: 50px;
  font-weight: 700;
}
.noshowCheck {
  background:rgba(0,132,207,1);
  color: #fff;
}
/* 搜索列表的 */
.searchlist {
  width: 97%;
  margin-top: 20px;
}
.searchlistTitle {
  font-size:20px;
  font-family:SourceHanSansCN-Regular;
  font-weight:400;
  color:rgba(0,132,207,1);
}
.searchlistContain {
  width: 95%;
  font-size:14px;
  font-family:SimSun;
  font-weight:400;
  color:rgba(76,76,76,1);
  line-height:24px;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
}
.searchlistfooter {
  width: 86px;
  max-width:186px;
  height:18px;
  background:rgba(0,132,207,1);
  border-radius:2px;
  color: #fff;
  text-align: center;
}

</style>
