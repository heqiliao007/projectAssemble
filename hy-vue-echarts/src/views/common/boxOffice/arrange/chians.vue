<template>
  <div style="position: relative">
    <!-- 图表  -->
    <el-row style="background: #ffffff;padding: 0;margin: 20px;">
      <el-col :span="24" style="padding: 0">
        <div style="padding: 15px 20px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
          <div class="title-l">
            <el-button type="text" style="color: #333; font-size: 18px;">排片分布（{{chartText}}）</el-button>
            <el-button type="text" style="color: #333;">{{time}}</el-button>
            <el-button :type="primarypaly1" @click="changeChart(false)">场次</el-button>
            <el-button :type="primaryseat1" @click="changeChart(true)">座位数</el-button>
          </div>
          <el-button style="float: right;" type="text" class="download" icon="el-icon-hysj-xiazai"></el-button>
        </div>
        <div id="J_chartbarBox2" style="height: 400px; width: 96%;" v-loading='chartLoading'></div>
      </el-col>
    </el-row>
    <!--表格-->
    <el-row style="background: #ffffff;padding: 0;margin: 20px;">
      <el-col :span="24" style="padding: 0">
        <div style="padding: 15px 20px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
          <div class="title-l">
            <el-button type="text" style="color: #333; font-size: 18px;">排片分布（{{tableText}}）</el-button>
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
            style="width: 97%; font-size:18px"
            stripe
            row-class-name="table-row"
            header-row-class-name="table-header"
            :cell-style='cellStyle'
            :header-cell-style='headerCellStyle'
            v-loading="loading"
            v-show='isseat === false'
          >
            <el-table-column :render-header="renderHeader" fixed width="80">
							<template slot-scope="scope">
								<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
								<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
							</template>
						</el-table-column>
            <el-table-column property ="name" min-width='200px;' label="影院名称">
               <template slot-scope="scope">
                  <span
                  style="color:#0084CF;
                  cursor:pointer;
                  "
                  @click="cinemaDetails(scope.row)"
                  >{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <template v-for="(item, index) in movieData_playtimes">
              <el-table-column :key='index' :property ="item.prop" width='240' :label="item.label">
                <template slot-scope="scope">
                  <span>{{scope.row[item.prop]}}</span>
                  <br/>
                  <span>{{item.prop1 ? Math.round((scope.row[item.prop1]*100)*1000)/1000 + '%' : ''}}</span>
                </template>
              </el-table-column>
            </template>
          </el-table>
          <el-table
            :data="tableData"
            style="width: 97%; font-size:18px"
            :stripe="true"
            row-class-name="table-row"
            header-row-class-name="table-header"
            :cell-style='cellStyle'
            :header-cell-style='headerCellStyle'
            v-loading="loading"
            v-show='isseat === true'
          >
            <el-table-column :render-header="renderHeader" fixed width="80">
							<template slot-scope="scope">
								<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
								<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
							</template>
						</el-table-column>
            <el-table-column property ="name" min-width='200px;' label="影院名称">
               <template slot-scope="scope">
                  <span
                  style="color:#0084CF;
                  cursor:pointer;
                  "
                  @click="cinemaDetails(scope.row)"
                  >{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <template v-for="(item, index) in movieData_seat">
              <el-table-column :key='index' :property ="item.prop" width='240' :label="item.label">
                <template slot-scope="scope">
                  <span>{{scope.row[item.prop]}}</span>
                  <br/>
                  <span>{{item.prop1 ? Math.round((scope.row[item.prop1]*100)*1000)/1000 + '%' : ''}}</span>
                  <!-- <span>{{Math.round((scope.row[item.prop1]*100)*1000)/1000}}%</span> -->
                </template>
              </el-table-column>
            </template>
          </el-table>
          <!-- <el-pagination
            style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
            background
            layout="prev, pager, next"
            @current-change = "changePage"
            :total="total"
          /> -->
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
        <span style="margin-left:56px">场次： </span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
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
        <el-button type="primary" size="small" @click="getData">查询</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'file',
  components: {},
  data() {
    return {
      loading: true,
      chartLoading: true,
      // cellStyle: {"padding-left": 20+'px', "padding-right": 15 +'px'},
      headerCellStyle: {color: '#fff',
				backgroundColor: '#C1C1C1'},
      time:new Date(),
      chooseregionText: '', // 已选择地区的页面显示文字
      noshow: false,
      urbanHierarchy: [], // 地域
      region: [], // 地区
      province: [], // 省份
      chiansOptions: [], // 院线
      productid: '', // 	产品ID
      urbanHierarchyCode: '', // 城市等级编码，传入需要封装到 params 中
      provinceCode: '', // 省份编码，传入需要封装到 params 中
      regionCode: '', // 区域编码，传入需要封装到 params 中
      cinemalineId: '', // 院线ID，传入需要封装到 params 中
      current: '1', // 当前页面
      value: '', // 场次
      options: [], // 场次
      chinasvalue: '', // 院线
      movieData_playtimes: [], // [排片表头
      movieData_seat: [], // 排座表头
      movieDataList: [], // 表头
      total: 0,
      activeName: 'first',
      isSearching:false,
      chartBar: null,
      isseatChart: false,
      chartText: '排片',
      primarypaly1: 'primary',
      primaryseat1: '',
      tableText: '场次',
      primarypaly: 'primary',
      isseat: false,
      primaryseat: '',
      tableData: [],
      xAxis: [], // 图表的x轴显示
      movieIds: [], // 电影id
    }
  },
  created () {
    window.addEventListener('setItem', () => {
      this.newVal = sessionStorage.getItem('watchStorage')
      this.isSearching = this.newVal
      // this.getData()
    })
  },
  mounted() {
    let _this = this
    _this.time = this.CurentTime(new Date('2019-04-02'))
    _this.getcookie()
    _this.getchinasList()
    _this.getCityList() // 获取城市列表
    _this.getData()
    // this.initChartBar()
  },
  methods: {
    renderHeader(h, { column }) {
      return h('i', {
        class: 'el-icon-setting'
      })
    },
    cellStyle({row, rowIndex}) {
        console.log('111', rowIndex)
        if (rowIndex === 0) {
          return {
            'color': '#3295D9',
            "padding-left": 20+'px',
            "padding-right": 15 +'px'
          }
        } else {
          return {
            "padding-left": 20+'px',
            "padding-right": 15 +'px'
          }
        }
      },
    // 绘制图表
    initChartBar(xAxis, tableData, isseat) {
      console.log('xAxis', xAxis)
      let _this = this
      var legend = []
      var series = []
      var records = tableData
      let yAxis = []
      for (var i = 1; i < records.length ; i++) {
        var record = records[i];
        var yAxistimes = [];
        var yAxisseats = [];
        for (var j = 0; j < _this.movieIds.length; j++) {
          yAxistimes.push(record[_this.movieIds[j] +"_playtimes"]);
          yAxisseats.push(record[_this.movieIds[j] +"_arranged_seating"]);
        }
        if (isseat === true) {
          yAxis = yAxisseats
        } else {
          yAxis = yAxistimes
        }
        legend.push(record.name)
        var mySeries = {
          name:record.name,
          type:'bar',
          stack:'总量',
          barWidth: 5,
          data:yAxis
        }
			  series.push(mySeries);
			}
      var option = {
				color:['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '2%',
          right: '2%',
          // y2: '140',
          containLabel: true
        },
        legend: {
          bottom: 20,
          right: 20,
          itemWidth: 25,
          itemHeight: 3,
          show: true,
          data: legend
        },
        xAxis: [
          {
            type: 'category',
            data: xAxis,
            axisLabel: {
                interval: 0,
                rotate: 10
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: this.chartText
          }
        ],
        series: series
      };
      this.chartBar = echarts.init(document.getElementById('J_chartbarBox2'))
      this.chartBar.setOption(option)
      window.addEventListener('resize', () => {
        this.chartBar.resize()
      })
      this.chartLoading = false
    },
    // 切换图表
    changeChart (isseatChart) {
      let _this = this
      if (isseatChart == true) {
        _this.primarypaly1 = ''
        _this.primaryseat1 = 'primary'
        let alldata = _this.allseat
        _this.isseatChart = true
        _this.chartText = '排座'
        _this.initChartBar(_this.xAxis, _this.tableData, isseatChart)
      } else {
        _this.primarypaly1 = 'primary'
        _this.primaryseat1 = ''
        let alldata = _this.alltimes
        _this.isseatChart = false
        _this.chartText = '场次'
        _this.initChartBar(_this.xAxis, _this.tableData, isseatChart)
      }
    },

    // 获取表格数据图表数据接口
    getData () {
      let _this = this
      _this.legendData = []
      _this.allseat = []
      _this.movieDataList = []
      _this.alltimes = []
      _this.$http({
        url: _this.$http.adornUrl('/web/moviecompany/screeningAnalysisWithCinemaline/'+_this.productid+ '/' + _this.time+'/?current='+_this.current+'&size=10'),
        method: 'POST',
        data: _this.$http.adornData({
          'productid': _this.productid,
          'time': _this.time,
          'cinemalineId': _this.cinemalineId,
          'current': _this.current,
          'size': 10,
          'urbanHierarchyCode': _this.urbanHierarchyCode,
          'provinceCode': _this.provinceCode,
          'regionCode': _this.regionCode
        })
      }).then(({data}) => {
        console.log(data, '获取到院线数据')
        if (data.code === 0) {
          var movieData_seat = [ // 排座的表格
            {label: '院线名称', prop: 'name', prop1: ''},
            {label: '总场次', prop: 'total_arrangedSeating', prop1: 'total_arranged_seating_rate'}
          ]
          var movieData_playtimes = [ // 排片的表格
            {label: '院线名称', prop: 'name', prop1: ''},
            {label: '总场次', prop: 'total_playtimes', prop1: 'total_playtimes_rate'}
          ]
          // table数据表头、
          let moviedataItem_seat = {}
          let moviedataItem_playtimes = {}
          let xAxis = []
          let movieIds = []
          if (data.movies != []) {
            for (let i = 0; i < data.movies.length; i++) {
              moviedataItem_playtimes = {
                label: data.movies[i].name,
                prop: data.movies[i].movie_id + '_playtimes',
                prop1: data.movies[i].movie_id + '_playtimes_rate'
              }
              movieData_playtimes.push(moviedataItem_playtimes) // 用于添加到排片的表名
              moviedataItem_seat = {
                label: data.movies[i].name,
                prop: data.movies[i].movie_id + '_arranged_seating',
                prop1: data.movies[i].movie_id + '_arranged_seating_rate'
              }
              movieData_seat.push(moviedataItem_seat) // 用于添加到排片的表名
              xAxis.push(data.movies[i].name);
              movieIds.push(data.movies[i].movie_id);
            }
            _this.movieData_playtimes = movieData_playtimes
            _this.movieData_seat = movieData_seat
            _this.xAxis = xAxis
            _this.movieIds = movieIds
          }

          var tableData = data.page.records
          _this.tableData = data.page.records // table数据赋值
          _this.total = data.page.total // 保存最大页
          // 画出图表、
          if (_this.isseat === true) {
            _this.movieDataList = _this.movieData_seat // 排座时候的表
          } else {
            _this.movieDataList = _this.movieData_playtimes // 排片时候，的表头
          }
            _this.initChartBar(xAxis, tableData, _this.isseat)
        }
        setTimeout(() => {
          _this.loading = false
        }, 100);
      })
    },
    // 点击切换表格的数据
    changeTable (isseat) {
      let _this = this
      _this.isseat = isseat
      // _this.loading = true
      console.log(_this.movieDataList, isseat)
      if (isseat === true) {
        _this.primarypaly = ''
        _this.primaryseat = 'primary'
        _this.movieDataList = _this.movieData_seat
        _this.tableData = _this.tableData
        // console.log(_this.movieDataList)
        // _this.isseat = isseat
        _this.tableText = '排座'
      } else {
        _this.movieDataList = _this.movieData_playtimes
        _this.primarypaly = 'primary'
        _this.primaryseat = ''
        // _this.$set(_this.movieDataList, _this.movieData_playtimes)
        _this.tableData = _this.tableData
        // _this.isseat = isseat
        _this.tableText = '场次'
      }
    },
    changePage (val) {
      let _this = this
      _this.current = val
      _this.getData()
    },
    handleClick(tab, event) {
    },
    // 获取缓存的产品id
    getcookie () {
      this.productid=this.$cookie.get('productid')
      if(this.productid==null){
        this.productid='9'
      }
    },
    // 选择时间
    changeDate (val) {
      this.time = this.CurentTime(val)
      this.getData()
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
      console.log(val)
      let _this = this
      _this.cinemalineId = val.id
      _this.chinasvalue = val.name
      _this.getData()
      // _this.getRegionData()
    },
    // 获取院线列表接口
    getchinasList () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('web/cinema/listcinema'),
        method: 'post',
        data: {}
      }).then(({data}) => {
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
        // console.log(data)
        if (data.code===0) {
          _this.urbanHierarchy = data.urbanHierarchy
          _this.region = data.region
          _this.province = data.province
        } else {
          _this.urbanHierarchy = []
          _this.region = []
          _this.province = []
          alert('暂无数据')
        }
      })
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
    // 跳转院线详情
    cinemaDetails (val){
      this.$router.push({
        path: '/cinemaDetails',
        query: {
          id: val.id,
          lastmenu: '排片分析'
        }
      });
      // this.$router.push({path: '/cinemaDetails'})
    }
  }
}
</script>
<style lang="scss" scoped>
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
  .title-l {
    float: left;
  }
  .title-l .el-button:nth-of-type(1) {
    font-size: 23px;
    color: #333333;
  }

  .title-l .el-button:nth-child(2) {
    margin: 0 35px 0 26px;
    color: #333333;
  }
  .download {
    color: #666666;
    font-size: 24px;
    padding-top: 10px;
  }

  .table-header {
    color: #333333;
  }

  .table-row .cel:nth-child(1) {
    padding-right: 0;
  }
</style>
