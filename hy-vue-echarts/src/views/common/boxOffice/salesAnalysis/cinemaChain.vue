<template>
  <div style="position: relative">
    <!-- 图表 -->
    <el-row class="row-m20-p20" style="background: #ffffff;padding: 0;margin: 20px;">
      <el-col :span="24" style="padding: 0">
        <div style="padding: 16px 32px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
          <div style="float: left;">
            <span style="font-size: 12px; margin-left: 10px; margin-right: 10px;">{{time}}</span>
            <el-button :type="palyscolor" round @click="palys()">场次占比</el-button>
            <el-button :type="personscolor" round @click="persons()">人次占比</el-button>
            <el-button :type="boxOfficecolor" round @click="boxOffice()">票房占比</el-button>
          </div>
          <!-- <div style="float: right;">
            <el-button :type="daytype == '全天' ? primary : '' " round @click="chooseDayType('全天')">全天</el-button>
            <el-button :type="daytype == '上午场' ? primary : '' " round @click="chooseDayType('上午场')">上午场</el-button>
            <el-button :type="daytype == '下午场' ? primary : '' " round @click="chooseDayType('下午场')">下午场</el-button>
            <el-button :type="daytype == '黄金场' ? primary : '' " round @click="chooseDayType('黄金场')">黄金场</el-button>
          </div> -->
        </div>
        <div id="palysReta" style="height: 400px; width: 96%;" v-loading="charloading"></div>
      </el-col>
    </el-row>
    <!--表格-->
    <el-row class="row-m20-p20" style="background: #ffffff;padding: 0;margin: 20px;">
      <el-col :span="24">
        <el-card>
          <div slot="header" style="margin:0 14px;" class="clearfix">
            <span style="float: left;font-size:23px">院线票房</span>
            <span style="font-size: 12px; margin-left: 10px; margin-right: 10px; line-height: 30px;">{{time}}</span>
            <!-- <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button> -->
            <!-- <el-button type="text" class="card-extra" style="font-size: 14px; line-height: 30px; color: #0084CF;">更多指标+</el-button> -->
          </div>
          <div>
            <el-table
              :data="tableData"
              style="width: 100%; font-size:18px"
              stripe
              v-loading="loading"
              row-class-name="table-row"
              header-row-class-name="table-header"
              highlight-current-row
              :header-cell-style = 'headercellStyle'
            >
              <el-table-column :render-header="renderHeader" fixed width="50">
								<template slot-scope="scope">
									<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
									<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
            <!-- @current-change="handleCurrentChange" -->
              <el-table-column type="index" width="80px" label="排名">
                <template slot-scope="scope">
                  <span>{{scope.$index + 1 + (page-1) *10}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="院线名称" width="200px">
                <template slot-scope="scope">
                  <a class="link" style="color:#3295D9;text-decoration:none" @click="cinemaDetails(scope.row)">{{scope.row.name}}</a>
                </template>
              </el-table-column>
              <el-table-column prop="" label="对比分析">
                <template slot-scope="scope">
                  <img src="../img/add.png" @click="contrast()" min-width="20" height="20"/>
                </template>
              </el-table-column>
              <el-table-column prop="box_office" label="票房（万）">
                <template slot-scope="scope">
                  <span>{{scope.row.box_office/10000}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="screen_number" label="银幕数"></el-table-column>
              <el-table-column prop="arranged_seating" label="座位数"></el-table-column>
              <el-table-column prop="boxOfficeReta" label="票房占比 ">
                <template slot-scope="scope">
                  <span>{{Math.round((scope.row.box_office_rate*100)*1000)/1000+'%'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="playtimes" label="场次"></el-table-column>
              <el-table-column prop="person_time" label="人次（万）">
                <template slot-scope="scope">
                  <span>{{scope.row.person_time/10000}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="personsReta" label="人次占比">
                <template slot-scope="scope">
                  <span>{{Math.round((scope.row.person_time_rate*100)*1000)/1000+'%'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="arranged_seating" label="当前排座"></el-table-column>
            </el-table>
            <el-pagination style="float: right; padding: 3px 0;margin:8px 34px 40px 0" background layout="prev, pager, next" :page-size="10" :total="totalPage" :current-page="page" @current-change="handleCurrentChange"/>
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
        <span style="margin-left:56px">地区： </span>
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
        <span style="margin-left:56px">城市： </span>
        <el-select v-model="cityvalue" @change="changeCity" placeholder="请选择" size="small">
          <el-option
            v-for="item in cityOption"
            :key="item.id"
            :label="item.value"
            :value="item">
          </el-option>
        </el-select>
        <span style="margin-left:56px">院线： </span>
        <el-select v-model="chinasvalue" @change="changeChian" placeholder="请选择" size="small">
          <el-option
            v-for="item in chiansOptions"
            :key="item.id"
            :label="item.name"
            :value="item">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" @click="tosearch">查询</el-button>
        <!-- <span style="margin-left:56px">影片名称：</span> -->
        <!-- <el-input type="text" size="small" placeholder="请输入" style="width:120px"></el-input> -->
      </div>
    </div>
    <comparison v-if="contrastbox"  @down="onDown()"></comparison>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import comparison from '../contrast/comparison'
    export default {
       name: 'BoxOfficeCinemaChain',
      components: {
        comparison
      },
      data () {
        return {
          headercellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
          primary: 'primary',
          daytype: '全天',
					first:true,
          loading:true,
          charloading: true,
          palyscolor:'primary',
          personscolor:'',
          boxOfficecolor:'',
          names:[],
          palysReta:[],
          boxOfficeReta:[],
          personsReta:[],
          date:new Date('2019-04-02'),
          show: false,
          isSearching:false,
          contrastbox:false,
          chartLine: null,
          page:1,
          time: '',
          productid:'',
          totalPage:10,
          tableData: [],
          chooseregionText: '',
          activeName: 'first',
          noshow: false,
          urbanHierarchy: [], // 地域
          region: [], // 地区
          province: [], // 省份
          chiansOptions: [], // 院线
          cityOption: [],
          cityvalue: '', // 城市
          urbanHierarchyCode: '', // 城市等级编码，传入需要封装到 params 中
          chinasvalue: '', // 院线
          cinemalineId: '', // 院线ID，传入需要封装到 params 中
          regionCode: '', // 区域编码，传入需要封装到 params 中
          provinceCode: '', // 	省份编码，传入需要封装到 params 中
          cityId: '', // 	城市ID，传入需要封装到 params 中
        }
      },
      watch: {
        '$route' () {
          this.initChartLine()
        }
      },
      created () {
        window.addEventListener('setItem', () => {
          this.newVal = sessionStorage.getItem('watchStorage')
          this.isSearching = this.newVal
        })
      },
      mounted () {
        this.time = this.CurentTime(this.date)
        this.getcookie()
        this.getDate()
        this.getlistDate()
        this.getCityList() // 获取城市列表
        this.getchinasList() // 获取院线
      },
      methods: {
        renderHeader(h, { column }) {
          return h('i', {
            class: 'el-icon-setting'
          })
        },
        // 选择上午场、下午场、全天
        chooseDayType (e) {
          console.log(e)
          this.daytype = e
        },
        handleClick(tab, event) {
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
        // 选择城市
        changeCity (val) {
          console.log(val)
          this.cityId = val.id
        },
        // 选择院线保存院线id
        changeChian (val) {
          let _this = this
          _this.cinemalineId = val.id
          // _this.getData()
          // _this.getRegionData()
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
        //获取productid
        getcookie(){
          this.productid=this.$cookie.get('productid')
        },
         //生成折线图
        initChartLine (list) {
          var option = {
            'tooltip': {
              'trigger': 'axis',
              'formatter': '{c0}%'
            },
            'grid': {
              'left': '3%',
              'right': '4%',
              'bottom': '8%',
              'containLabel': true
            },
            'toolbox': {
              'feature': {
              }
            },
						color:['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
            'xAxis': {
              'axisLabel': {
                'interval': 0,
                'rotate': -40
              },
              'type': 'category',
              'boundaryGap': false,
              'data': this.names
            },
            'yAxis': {
              'type': 'value',
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value} %'
              },
              show: true,
              splitLine: {
                show: true,
              },
              axisLine:{
                lineStyle:{
                  width:0
                }
              }
            },
            'series': [
              {
                'type': 'line',
                'symbol': 'none',
								color:['#3fb1e3'],
                'itemStyle' : {
                  'normal' : {
                    'color':'#3295D9'
                  }
                },
                'data': list
              }
            ]
          }
          this.chartLine = echarts.init(document.getElementById('palysReta'))
          this.chartLine.setOption(option,true)
          window.addEventListener('resize', () => {
            this.chartLine.resize()
          })
          this.charloading = false
        },
        contrast () {
          this.contrastbox=true
        },
        onDown(){
          this.contrastbox=false
        },
        //获取列表数据
        getDate () {
          var params = new URLSearchParams()
          params.append('date', this.time)
          params.append('province', this.provinceCode)
          params.append('region', this.regionCode)
          params.append('urban_hierarchy', this.urbanHierarchyCode)
          params.append('city_id', this.cityId)
          params.append('cinemaline_id', this.cinemalineId)
          // params.append('cinema_name', this.cinemaName)
          params.append('length', '9')
          console.log(this.CurentTime(this.date))
          this.$http({ // /web/boxOffice/boxOfficeAnalysisInvestment
            url: this.$http.adornUrl('/web/boxoffice/chainList/'+this.productid+'/?current='+this.page+'&size=10'),
            method: 'post',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            data: params
          }).then(({ data }) => {
            console.log(data)
            this.loading=false
            this.tableData=data.page.records
            this.totalPage=data.page.total-0
          }).catch(err => {
            // console.log('请求失败：');
          });
        },
        //分页
        handleCurrentChange(val) {
          console.log('jajajajajjajajaj')
          this.loading=true
          this.page = val;
          this.getDate()
        },
        //获取图表数据
        getlistDate(){
          var params = new URLSearchParams()
          params.append('date', this.time)
          params.append('province', this.provinceCode)
          params.append('region', this.regionCode)
          params.append('urban_hierarchy', this.urbanHierarchyCode)
          params.append('city_id', this.cityId)
          params.append('cinemaline_id', this.cinemalineId)
          // params.append('cinema_name', this.cinemaName)
          params.append('length', '9')
          this.$http({
            url: this.$http.adornUrl('/web/boxoffice/chainChart/'+this.productid),
            method: 'post',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            data: params
          }).then(({ data }) => {
            console.log(data)
            for(var i=0;i<data.list.length;i++){
              this.palysReta.push(data.list[i].playtimes_rate*100)
              this.boxOfficeReta.push(data.list[i].box_office_rate*100)
              this.personsReta.push(data.list[i].person_time_rate*100)
              this.names.push(data.list[i].name)
            }
						this.first=false
            this.initChartLine(this.palysReta)
          }).catch(err => {
            // console.log('请求失败：');
          });
        },
        //点击场次占比
        palys(){
          this.initChartLine(this.palysReta)
          this.palyscolor='primary'
          this.personscolor=''
          this.boxOfficecolor=''
        },
        //点击票房占比
        boxOffice(){
          this.initChartLine(this.boxOfficeReta)
          this.palyscolor=''
          this.personscolor=''
          this.boxOfficecolor='primary'
        },
        //点击人次占比
        persons(){
          this.initChartLine(this.personsReta)
          this.palyscolor=''
          this.personscolor='primary'
          this.boxOfficecolor=''
        },
        //修改日期
        changeDate() {
          this.loading=true
					this.first=true
          this.page = 1
          this.time = this.CurentTime(this.date)
          this.getDate()
          this.getlistDate()
        },
        // 点击查询，搜索列表
        tosearch () {
          this.page = 1
          this.loading=true
          this.charloading = true
          this.isSearching = !this.isSearching;
          var data = this.isSearching;
          sessionStorage.setItem('isSearching', data);
          this.resetSetItem('watchStorage', data);
          this.getlistDate()
          this.getDate()
        },
        // 跳转院线详情
        cinemaDetails (val){
          console.log(val)
          this.$router.push({
            path: '/cinemaDetails',
            query: {
              id: val.id,
              lastmenu: '票房分析'
            }
          });
          // this.$router.push({path: '/cinemaDetails'})
        }
      }
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
</style>
