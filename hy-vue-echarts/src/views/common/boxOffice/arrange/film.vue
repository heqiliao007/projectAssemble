<template>
    <div style="position: relative">
    <!-- 图表  -->
    <el-row style="background: #ffffff;padding: 0;margin: 20px;">
      <el-col :span="24" style="padding: 0">
        <div style="padding: 15px 20px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
          <div class="title-l">
            <el-button type="text" style="color: #333; font-size: 18px;">排片分布（{{chartText}}）</el-button>
            <el-button type="text" style="color: #333; font-size: 14px;">{{time}}</el-button>
            <el-button :type="primarypaly1" @click="changeChart(false)">场次</el-button>
            <el-button :type="primaryseat1" @click="changeChart(true)">座位数</el-button>
          </div>
          <el-button style="float: right;" type="text" class="download" icon="el-icon-hysj-xiazai"></el-button>
        </div>
        <div id="film_chart" style="height: 400px; width: 96%;" v-loading='chartLoading'></div>
      </el-col>
    </el-row>
    <!--表格-->
    <el-row style="background: #ffffff;padding: 0;margin: 20px;">
      <el-col :span="24" style="padding: 0">
           <div style="padding: 15px 20px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
            <div class="title-l">
                <el-button type="text" style="color: #333; font-size: 16px;">排片分布（{{tableText}}）</el-button>
              <el-button type="text" style="color: #333;">{{time}}</el-button>
              <el-button :type="primarypaly" @click="changeTable(false)">场次</el-button>
              <el-button :type="primaryseat" @click="changeTable(true)">座位数</el-button>
            </div>
            <!-- <div style="float: right;">
                <el-button type="text" class="f-blue">更多指标+</el-button>
                <el-button type="text" class="download" icon="el-icon-hysj-xiazai"></el-button>
            </div> -->
          </div>
          <div>
            <el-table
              :data="tableData"
              style="width: 98%; font-size:18px"
              stripe
              row-class-name="table-row"
              header-row-class-name="table-header"
              :cell-style= 'cellStyle'
              :header-cell-style= 'headerCellStyle'
              v-loading="loading"
            >
              <el-table-column :render-header="renderHeader" fixed width="80">
								<template slot-scope="scope">
									<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
									<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
              <el-table-column type="index" label="排名" width="80px">
              	<template slot-scope="scope">
              		<span>{{ scope.$index + 1 + (current - 1) * 10 }}</span>
              	</template>
              </el-table-column>
              <el-table-column prop="name,id" label="剧名">
								<template slot-scope="scope">
									<a class="link text_hover" @click="alink(scope.row.id)" style="color:#3295D9;text-decoration:none">{{ scope.row.name }}</a>
								</template>
              </el-table-column>
              <el-table-column prop="showDays" label="上映天数"></el-table-column>
              <el-table-column prop="movieTypes" label="类型" style="word-break: break-all; word-wrap: break-word;">

              </el-table-column>
              <el-table-column prop="show_time" label="上线日期"></el-table-column>
              <el-table-column prop="totalPlaytimes" :label="label1"></el-table-column>
              <el-table-column prop="playtimesRatio" :label="label2"></el-table-column>
            </el-table>
            <el-pagination
              style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
              background
              layout="prev, pager, next"
              :total="totalPage"
							:current-page="current"
							@current-change="handleCurrentChange"
            />
          </div>
      </el-col>
    </el-row>
      <div class="cover"  v-if="isSearching=='true'"/>
      <div class="search" v-if="isSearching=='true'">
        <div class="search-box">
          <span>日期:</span>
          <el-date-picker
            @change="changeDate"
            type="date"
            size="small"
            style="width:157px"
            format="yyyy-MM-dd"
            prefix-icon="none"
            v-model="time"
          ></el-date-picker>
        <span style="margin-left:56px">地区： </span>
        <el-button v-popover:popover2 style="width:100px; height: 40px; border: 1px solid #eee; text-align: center;">{{chooseregionText}}</el-button>
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
        <el-select v-model="cityvalue" @change="changeCity" placeholder="请选择">
          <el-option
            v-for="item in cityOption"
            :key="item.id"
            :label="item.value"
            :value="item">
          </el-option>
        </el-select>
        <span style="margin-left:56px">院线： </span>
        <el-select v-model="chinasvalue" @change="changeChian" placeholder="请选择">
          <el-option
            v-for="item in chiansOptions"
            :key="item.id"
            :label="item.name"
            :value="item">
          </el-option>
        </el-select>
        <span style="margin-left:56px">影院名称：</span>
        <el-input type="text" v-model='cinemaName' size="small" placeholder="请输入影院" style="width:120px"></el-input>
        <el-button type="primary" size="small" @click="getData">查询</el-button>
        </div>
      </div>
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
    name:'file',
    components: {
    },
    data () {
        return {
          loading: true,
          chartLoading: true,
          cellStyle: {"padding-left": 20+'px', "padding-right": 15 +'px'},
          headerCellStyle: {color: '#fff',
				backgroundColor: '#C1C1C1'},
          productid: '', // 产品id-请求数据
          time:new Date(), // 日期 2019-04-02
          current: 1,
          chinasvalue: '', // 院线
          cinemalineId: '', // 院线ID，传入需要封装到 params 中
          urbanHierarchyCode: '', // 城市等级编码，传入需要封装到 params 中
          provinceCode: '', // 	省份编码，传入需要封装到 params 中
          regionCode: '', // 区域编码，传入需要封装到 params 中
          cityId: '', // 	城市ID，传入需要封装到 params 中
          cinemaName: '', // 影院名称，传入需要封装到 params 中
          isSearching:false,
          total: 0,
          activeName: 'first',
          chooseregionText: '', // 已选择地区的页面显示文字
          noshow: false,
          urbanHierarchy: [], // 地域
          region: [], // 地区
          province: [], // 省份
          chiansOptions: [], // 院线
          cityOption: [],
          cityvalue: '', // 城市
          chartBar: null,
          tableData: [],
          isseat: false,
          timesTable: [],
          seatsTable: [],
          tableText: '场次',
          label1: '放映总场次',
          label2: '总场次环比',
          primarypaly: 'primary',
          primaryseat: '',
          chartData_times: [],
          chartData_seats: [],
          chartText: '排片',
          primarypaly1: 'primary',
          primaryseat1: '',
          isseatChart: false,
          totalPage: 0 // 总页数
        }
    },
  created () {
    window.addEventListener('setItem', () => {
      this.newVal = sessionStorage.getItem('watchStorage')
      this.isSearching = this.newVal
      // this.getData()
    })
  },
    mounted () {
      this.getcookie()
      this.getchinasList()
      this.time = this.CurentTime(new Date('2019-04-02'))
      this.getCityList() // 获取城市列表
      this.getData()
    },
    methods: {
      renderHeader(h, { column }) {
        return h('i', {
          class: 'el-icon-setting'
        })
      },
      handleCurrentChange(val) {
			this.loading = true;
      this.current = val;
      this.getData()
			// this.gettableList();
		},
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
      handleClick(tab, event) {
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
      // 获取缓存的产品id
      getcookie () {
        this.productid=this.$cookie.get('productid')
        if(this.productid==null){
          this.productid='9'
        }
      },
      //跳转影片详情
      alink (id) {
        sessionStorage.setItem('movieId', id);
        this.$router.push({
            path: '/video',
            query: {
              id: id,
              lastmenu: '排片分析'
            }
          })
        // this.$router.push({name: 'video',params: {id: id}})
      },
			// //跳转影片详情
			// alink (id) {
      //   sessionStorage.setItem('movieId', id);

			//   // this.$router.push({name: 'video',params: {id: id}})
			// },
      // 切换table
      changeTable (isseat) {
        let _this = this
        if (isseat === true) {
          _this.primarypaly = ''
          _this.primaryseat = 'primary'
          _this.tableData = _this.seatsTable
          _this.isseat = true
          _this.tableText = '排座'
          _this.label1 = '总排座数'
          _this.label2 = '排座环比'
        } else {
          _this.primarypaly = 'primary'
          _this.primaryseat = ''
          _this.tableData = _this.timesTable
          _this.isseat = false
          _this.tableText = '场次'
          _this.label1 = '放映总场次'
          _this.label2 = '总场次环比'
        }
      },
      // 选择城市
      changeCity (val) {
        console.log(val)
        this.cityId = val.id
      },
    // 选择时间
    changeDate (val) {
      console.log(val)
      let _this = this
      _this.time = _this.CurentTime(val)
      _this.getData()
    },
    // 选择地域
    chooseUrban (val) {
      let _this = this
      // console.log(val)
      _this.chooseregionText = val.label
      _this.urbanHierarchyCode = val.value
      _this.getData()
    },
    // 选择地区
    chooseRegion (val) {
      let _this = this
      console.log(val)
      _this.regionCode = val.value
      _this.chooseregionText = val.label
      _this.getData()
    },
    // 选择省份
    chooseProvince (val) {
      let _this = this
      console.log(val)
      _this.provinceCode = val.id
      _this.chooseregionText = val.value
      _this.getData()
    },
    // 选择院线保存院线id
    changeChian (val) {
      let _this = this
      _this.cinemalineId = val.id
      _this.chinasvalue = val.name
      _this.getData()
      // _this.getRegionData()
    },
      // 获取表格数据图表数据接口
      getData () {
        let _this = this
        _this.loading = true
        _this.legendData = []
        _this.allseat = []
        _this.movieDataList = []
        _this.alltimes = []
        _this.$http({
          url: _this.$http.adornUrl('/web/moviecompany/screeningAnalysisWithMovie/'+_this.productid+ '/' + _this.time+'/?current='+_this.current+'&size=10'),
          method: 'POST',
          data: _this.$http.adornData({
            'productid': _this.productid,
            'time': _this.time,
            'cinemalineId': _this.cinemalineId,
            'current': _this.current,
            'size': 10,
            'urbanHierarchyCode': _this.urbanHierarchyCode,
            'provinceCode': _this.provinceCode,
            'regionCode': _this.regionCode,
            'cinemaName': _this.cinemaName,
            'cityId': _this.cityId
          })
        }).then(({data}) => {
          let seatsItem = {}
          let timesTable = []
          let timesItem = {}
          let seatsTable = []
          let chartData_times = []
          let chartData_seats = []
          let chart_times = {}
          let chart_seats = {}
          if (data.code === 0 && data.page.records.length > 0) {
            console.log(data, '-------------------')
            _this.totalPage = Number(data.page.total)
            for (let i = 0; i < data.page.records.length; i++) {
              if (data.page.records[i].movieTypes.substr(0, 1) == '/'){
                data.page.records[i].movieTypes = data.page.records[i].movieTypes.substr(1)
              }
              if (data.page.records[i].analysisDatas[0] == null) {
                timesItem = {
                  name: data.page.records[i].name || '',
                  movieTypes: data.page.records[i].movieTypes || '',
                  showDays: '',
                  show_time: '',
                  totalPlaytimes: '',
                  playtimesRatio: ''
                }
                seatsItem = {
                  name: data.page.records[i].name || '',
                  movieTypes: data.page.records[i].movieTypes || '',
                  showDays: '',
                  show_time: '',
                  totalPlaytimes: '',
                  playtimesRatio: ''
                }
              } else {
                timesItem = {
									id:data.page.records[i].movie_id,
                  name: data.page.records[i].name,
                  movieTypes: data.page.records[i].movieTypes,
                  showDays: data.page.records[i].analysisDatas[0].showDays,
                  show_time: data.page.records[i].analysisDatas[0].show_time,
                  totalPlaytimes: data.page.records[i].analysisDatas[0].total_playtimes,
                  playtimesRatio: data.page.records[i].analysisDatas[0].playtimes_ratio
                }
                seatsItem = {
									id:data.page.records[i].movie_id,
                  name: data.page.records[i].name,
                  movieTypes: data.page.records[i].movieTypes,
                  showDays: data.page.records[i].analysisDatas[0].showDays,
                  show_time: data.page.records[i].analysisDatas[0].show_time,
                  totalPlaytimes: data.page.records[i].analysisDatas[0].total_arranged_seating,
                  playtimesRatio: data.page.records[i].analysisDatas[0].arranged_seating_ratio
                }
              }
              timesTable.push(timesItem)
              seatsTable.push(seatsItem)
              chart_times = {
              name: data.page.records[i].name,
              data: data.page.records[i].playtimes
              }
              chart_seats = {
                name: data.page.records[i].name,
                data: data.page.records[i].arranged_seating
              }
              chartData_times.push(chart_times)
              chartData_seats.push(chart_seats)
            }
            _this.chartData_times = chartData_times
            _this.chartData_seats = chartData_seats
            _this.timesTable = timesTable
            _this.seatsTable = seatsTable
            if (_this.isseat === true) {
              _this.tableData = _this.seatsTable
              let title = '排座数'
              _this.initChartBar(_this.chartData_seats, title)
            } else {
              let title = '场次'
              _this.tableData = _this.timesTable
              _this.initChartBar(_this.chartData_times, title)
            }
          } else {
            let title = ''
            _this.tableData = []
            _this.chartData_times = []
            _this.chartData_seats = []
            _this.initChartBar(_this.chartData_times, title)
          }
        })
        setTimeout(() => {
        _this.loading = false
      }, 100)
      },
      changeChart (isseatChart) {
        let _this = this
        if (isseatChart == true) {
          _this.primarypaly1 = ''
          _this.primaryseat1 = 'primary'
          _this.isseatChart = true
          _this.chartText = '排座'
          _this.initChartBar(_this.chartData_seats, _this.chartText)
        } else {
          _this.primarypaly1 = 'primary'
          _this.primaryseat1 = ''
          _this.isseatChart = false
          _this.chartText = '场次'
          _this.initChartBar(_this.chartData_times, _this.chartText)
        }
      },
      initChartBar (data, title) {
        console.log('===============data', data)
        let xAxis = []
        let seriesdata = []
        for (let i = 0; i < data.length; i++) {
          xAxis.push(data[i].name)
          seriesdata.push(data[i].data)
        }
        var option = {
            color:['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '2%',
              right: '2%',
              containLabel: true
            },
            legend: {
              bottom: 20,
              right: 20,
              itemWidth: 25,
              itemHeight: 3,
            },
            xAxis : [
              {
                type : 'category',
                data : xAxis,
                axisLabel: {
                  interval: 0,
                  rotate: 10
                },
              }
            ],
            yAxis : [
              {
                type : 'value',
                name: this.chartText
              }
            ],
            series : [
              {
                 name: title,
                 type:'bar',
                 barWidth : 15,
                 data: seriesdata
              }
            ]
          };
          this.chartBar = echarts.init(document.getElementById('film_chart'))
          this.chartBar.setOption(option)
          window.addEventListener('resize', () => {
            this.chartBar.resize()
          })
          this.chartLoading = false
        }
      },
}
</script>
<style lang="scss" scoped>
.text_hover{
    cursor: pointer;
    display: inline-block;
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
// @import '../css/box-office.css';
@import '../css/color.css';
.title-l{
    float: left;
}
.title-l .el-button:nth-of-type(1) {
    font-size: 23px;
    color: #333333;
  }
.download{
    color:#666666;
    font-size:24px;
    padding-top: 10px;
}
.el-table td:nth-child(1){
    padding-left: 60px;
}
.table-header th:nth-of-type(1){
    padding-left: 60px;
}
.table-header{
    color:#333333;
}
</style>

