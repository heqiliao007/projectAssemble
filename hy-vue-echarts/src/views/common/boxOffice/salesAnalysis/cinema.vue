<template>
  <div style="position: relative">
    <!-- 表格 -->
    <el-row class="row-m20-p20">
      <el-col :span="24">
        <el-card>
          <div slot="header" style="margin:0 14px;" class="clearfix">
            <span style="float: left;font-size:23px">影院票房</span>
            <!-- <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button> -->
            <!-- <el-button type="text" class="card-extra" style="font-size: 14px; line-height: 30px; color: #3295D9;">更多指标+</el-button> -->
          </div>
          <div>
            <el-table
              :data="tableData"
              style="width: 98%; font-size:18px"
              v-loading="loading"
              stripe
              :header-cell-style = 'headercellStyle'
              :row-class-name="tableRowClassName"
            >
              <el-table-column :render-header="renderHeader" fixed width="50">
								<template slot-scope="scope">
									<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
									<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
              <el-table-column type="index" label="排名" width="70px">
                <template slot-scope="scope">
                  <span>{{scope.$index + 1 + (current-1) *10}}</span>
                </template>
              </el-table-column>
               <el-table-column prop="name id" label="影院名称" width="300px">
                <template slot-scope="scope">
                  <a class="link" @click="alink(scope.row.id)" style="color:#3295D9;text-decoration:none">{{scope.row.name}}</a>
                </template>
              </el-table-column>
              <el-table-column label="对比分析">
                <template slot-scope="scope">
                  <img src="../img/add.png" @click="contrast()" min-width="20" height="20"/>
                </template>
              </el-table-column>
              <el-table-column prop="box_office" width="130" label="票房（万）">
                <template slot-scope="scope">
                  <span>{{scope.row.box_office/10000}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="screen_number" label="银幕数"></el-table-column>
              <el-table-column prop="seating" label="座位数"></el-table-column>
               <el-table-column prop="boxOfficeReta" label="票房占比">
                 <template slot-scope="scope">
                   <span>{{Math.round((scope.row.box_office_rate*100)*1000)/1000+'%'}}</span>
                 </template>
               </el-table-column>
               <el-table-column prop="playtimes" label="场次"></el-table-column>
              <el-table-column prop="person_time" width="130" label="人次（万）">
                <template slot-scope="scope">
                  <span>{{scope.row.person_time/10000}}</span>
                </template>
              </el-table-column>
               <el-table-column prop="personsReta" label="人次占比">
                 <template slot-scope="scope">
                   <span>{{Math.round((scope.row.person_time_rate*100)*1000)/1000+'%'}}</span>
                 </template>
               </el-table-column>
               <el-table-column prop="seating" label="当前排座"></el-table-column>
            </el-table>
						<el-pagination
							style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
							background
							layout="prev, pager, next"
							:page-size="10"
							:total="total"
							:current-page="current"
							@current-change="handleCurrentChange"
						/>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="cover"  v-if="isSearching=='true'"/>
    <div class="search" v-if="isSearching=='true'">
      <div class="search-box">
        <span>日期:</span>
        <el-date-picker
          type="date"
          size="small"
          style="width:157px"
          format="yyyy-MM-dd"
          prefix-icon="none"
          v-model="date"
          @change="changeDate()"
        ></el-date-picker>
          <span style="margin-left:16px">地区： </span>
        <el-button v-popover:popover2 style="width:100px; height: 34px; border: 1px solid #eee; text-align: center;">{{chooseregionText}}</el-button>
        <el-popover
          ref="popover2"
          placement="bottom"
          title=""
          width="380"
          trigger="click"
          content="">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="按地域" name="first">
              <template>
                <el-table
                  :data="urbanHierarchy"
                  height="250"
                  :show-header='noshow'
                  @row-click='chooseUrban'
                  style="width: 100%; border: none;">
                  <el-table-column
                    prop="label"
                    label=""
                    width="">
                  </el-table-column>
                </el-table>
              </template>
            </el-tab-pane>
            <el-tab-pane label="按地区" name="second">
              <template>
                <el-table
                  :data="region"
                  height="250"
                  v-loading='loading'
                  @row-click='chooseRegion'
                  :show-header='noshow'
                  style="width: 100%">
                  <el-table-column
                    prop="label"
                    label=""
                    width="320">
                  </el-table-column>
                </el-table>
              </template>
            </el-tab-pane>
            <el-tab-pane label="按省份" name="third">
              <template>
                <el-table
                  :data="province"
                  @row-click='chooseProvince'
                  height="250"
                  v-loading='loading'
                  :show-header='noshow'
                  style="width: 100%">
                  <el-table-column
                    prop="value"
                    label=""
                    width="320">
                  </el-table-column>
                </el-table>
              </template>
            </el-tab-pane>
            <!-- <el-tab-pane label="按城市" name="third">省份</el-tab-pane> -->
          </el-tabs>
        </el-popover>
        <span style="margin-left:16px">城市： </span>
        <el-select v-model="cityvalue" @change="changeCity" size="small" placeholder="请选择">
          <el-option
            v-for="item in cityOption"
            :key="item.id"
            :label="item.value"
            :value="item">
          </el-option>
        </el-select>
        <span style="margin-left:16px">院线： </span>
        <el-select v-model="chinasvalue" size="small" @change="changeChian" placeholder="请选择">
          <el-option
            v-for="item in chiansOptions"
            :key="item.id"
            :label="item.name"
            :value="item">
          </el-option>
        </el-select>
        <span style="margin-left:16px">影院名称：</span>
        <el-input type="text" size="small" placeholder="请输入" style="width:120px" v-model="cinemaName"></el-input>
        <el-button type="primary" size="small" @click="tosearch">查询</el-button>
      </div>
    </div>
    <comparison v-if="contrastbox" @down="onDown()"></comparison>
  </div>
</template>

<script>
import comparison from '../contrast/comparison'

export default {
  name: 'BoxOfficeCinema',
  components: {
    comparison
  },
  data() {
    return {
      headercellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
      loading:true,
      date:new Date('2019-04-02'),
      isSearching:false,
      contrastbox: false,
      tableData: [],
      total: 0,
      current: 1,
      size: 10,
      productid: '',
      noshow: false,
      activeName: 'first',
      urbanHierarchy: [], // 地域
      cityvalue: '',
      region: [], // 地区
      province: [], // 省份
      chiansOptions: [], // 院线
      chinasvalue: '', // 院线
      cityId: '', // 	城市ID，传入需要封装到 params 中
      chooseregionText: '', // 已选择地区的页面显示文字
      cinemalineId: '', // 院线ID，传入需要封装到 params 中
      urbanHierarchyCode: '', // 城市等级编码，传入需要封装到 params 中
      provinceCode: '', // 	省份编码，传入需要封装到 params 中
      regionCode: '', // 区域编码，传入需要封装到 params 中
      cinemaName: '', // 影院名称，传入需要封装到parmas中
      moviename: '', // 电影名称
    }
  },
  created() {
    window.addEventListener('setItem', () => {
      this.newVal = sessionStorage.getItem('watchStorage')
      this.isSearching = this.newVal
    })
  },
  computed: {},
  mounted() {
    let _this = this
    _this.productid = this.$cookie.get('productid')
    _this.getData()
    _this.getCityList() // 获取城市列表
    _this.getchinasList() // 获取院线列表
  },
  methods: {
    renderHeader(h, { column }) {
			return h('i', {
				class: 'el-icon-setting'
      })
    },
    // 获取c城市列表接口
    getCityList () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/web/sysdict/dictOfRegion'),
        method: 'post',
        data: {}
      }).then(({data}) => {
        if (data.code===0) {
          _this.urbanHierarchy = data.urbanHierarchy
          _this.region = data.region
          _this.province = data.province
          _this.cityOption = data.city
        } else {
          _this.urbanHierarchy = []
          _this.region = []
          _this.province = []
          alert('暂无数据')
        }
      })
    },
      // 获取院线列表接口
    getchinasList () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('web/cinema/listcinema'),
        method: 'post',
        data: {}
      }).then(({data}) => {
        console.log(data)
        if (data.code===0 && data.listMap != []) {
          _this.chiansOptions = data.listMap
        } else {
          _this.chiansOptions = []
          alert('暂无数据')
        }
      })
    },
    handleClick(tab, event) {
    },
    tableRowClassName({row, rowIndex}) {
        if (rowIndex%2==0) {
          return 'success-row';
        }
        return '';
    },
    // 选择地域
    chooseUrban (val) {
      let _this = this
      // console.log(val)
      _this.chooseregionText = val.label
      _this.urbanHierarchyCode = val.value
      // _this.getData()
    },
    // 选择地区
    chooseRegion (val) {
      let _this = this
      console.log(val)
      _this.regionCode = val.value
      _this.chooseregionText = val.label
      // _this.getData()
    },
    // 选择省份
    chooseProvince (val) {
      let _this = this
      console.log(val)
      _this.provinceCode = val.id
      _this.chooseregionText = val.value
      // _this.getData()
    },
    // 选择院线保存院线id
    changeChian (val) {
      console.log(val, '院线')
      let _this = this
      _this.cinemalineId = val.id
      _this.chinasvalue = val.name
      // _this.getData()
      // _this.getRegionData()
    },
    // 选择城市
    changeCity (val) {
      console.log(val)
      this.cityId = val.id
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
    contrast() {
      this.contrastbox = true
    },
    onDown() {
      this.contrastbox = false
    },
    tosearch () {
      this.current = 1
      this.loading=true
      this.isSearching = !this.isSearching;
			var data = this.isSearching;
			sessionStorage.setItem('isSearching', data);
      this.resetSetItem('watchStorage', data);
      this.getData()
    },
    //获取列表数据
    getData() {
      let _this = this
      var params = new URLSearchParams()
      params.append('date', _this.CurentTime(_this.date))
      params.append('province', _this.provinceCode)
      params.append('region', _this.regionCode)
      params.append('urban_hierarchy', _this.urbanHierarchyCode)
      params.append('city_id', _this.cityId)
      params.append('cinemaline_id', _this.cinemalineId)
      params.append('cinema_name', _this.cinemaName)
      params.append('mov_name', _this.moviename)

      _this.$http({
        url: this.$http.adornUrl('/web/boxoffice/cinemaList/' + _this.productid + '/?current=' + _this.current + '&size=' + _this.size),
        method: 'post',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data: params
      }).then(({data}) => {
        console.log(data)
        _this.loading=false
        if (data && data.page.records != []) {
          _this.tableData = data.page.records
          _this.total = data.page.total-1
        } else {
          // _this.tableData = []
          // alert('暂无数据')
          // this.getCaptcha()
          // this.$message.error(data.msg)
        }
      })
    },
    //分页
    handleCurrentChange(val) {
      let _this = this
      _this.loading=true
      _this.current = val
      _this.getData()
    },
    changeDate(){
      this.loading=true
      this.current =
      this.getData()
    },
		//跳转详情
		alink(id){
			this.$router.push({
					path: '/movieDetails',
					query: {
						id: id,
						lastmenu: '影院'
					}
			})
		}
  },
}
</script>

<style scoped>
  @import '../css/box-office.css';
  @import '../css/shape.css';
  @import '../css/legend.css';
  @import '../css/color.css';
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
 .el-table .success-row {
  background: #f5f5f5;
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
	.link{
		cursor: pointer;
	}
</style>
