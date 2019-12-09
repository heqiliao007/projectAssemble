<template>
  <div style="position: relative">
    <!-- 图表  -->
    <el-row style="background: #ffffff;padding: 0;margin: 20px;">
      <el-col :span="24" style="padding: 0">
        <div style="padding: 15px 20px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
          <div class="title-l">
            <el-button type="text" style="color: #333; font-size: 18px;">排片分布（{{chartText}}）</el-button>
            <el-button type="text" style="color: #333;">{{date}}</el-button>
            <el-button :type="primarypaly1" @click="changeChart(false)">场次</el-button>
            <el-button :type="primaryseat1" @click="changeChart(true)">座位数</el-button>
          </div>
          <el-button style="float: right;" type="text" class="download" icon="el-icon-hysj-xiazai"></el-button>
        </div>
        <div id="J_chartbarBox" style="height: 400px; width: 96%;" v-loading='chartLoading'></div>
      </el-col>
    </el-row>
    <!--表格-->
    <el-row style="background: #ffffff;padding: 0;margin: 20px;">
      <el-col :span="24" style="padding: 0">
        <div style="padding: 15px 20px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
          <div class="title-l">
            <el-button type="text" style="color: #333; font-size: 18px;">排片分布（{{tableText}}）</el-button>
            <el-button type="text" style="color: #333;">{{date}}</el-button>
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
            :stripe="true"
            row-class-name="table-row"
            header-row-class-name="table-header"
            :cell-style='cellStyle'
            :header-cell-style='headerCellStyle'
            v-loading="loading"
            v-show="isseat === false"
          >
            <el-table-column :render-header="renderHeader" fixed width="80">
							<template slot-scope="scope">
								<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
								<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
							</template>
						</el-table-column>
            <el-table-column key='index' property ="urbanHierarchyCode"  min-width='200px;' label="区域登记">
            </el-table-column>
            <template v-for="(item, index) in movieData_playtimes">
              <el-table-column :key='index' :property ="item.prop" min-width='180px;' :label="item.label">
                <template slot-scope="scope">
                  <span>{{scope.row[item.prop]}}</span>
                  <br/>
                  <span>{{Math.round((scope.row[item.prop1]*100)*1000)/1000}}%</span>
                </template>
              </el-table-column>
            </template>
          </el-table>
          <el-table
            :data="tableData"
            style="width: 97%; font-size:18px;"
            stripe
            row-class-name="table-row"
            header-row-class-name="table-header"
            :cell-style='cellStyle'
            :header-cell-style='headerCellStyle'
            v-loading="loading"
            v-show="isseat === true"
          >
            <el-table-column :render-header="renderHeader" width="80">
							<template slot-scope="scope">
								<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
								<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
							</template>
						</el-table-column>
            <el-table-column fixed='left' property ="urbanHierarchyCode" width='200px;' label="区域登记">
            </el-table-column>
            <template v-for="(item, index) in movieData_seat">
              <el-table-column :key='index' :property ="item.prop" min-width='180px;' :label="item.label">
                <template slot-scope="scope">
                  <span>{{scope.row[item.prop]}}</span>
                  <br/>
                  <span>{{Math.round((scope.row[item.prop1]*100)*1000)/1000}}%</span>
                </template>
              </el-table-column>
            </template>
          </el-table>
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
          v-model="date"
        ></el-date-picker>
        <span>场次:</span>
        <el-select v-model="value" placeholder="全部">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span style="margin-left:56px">院线：</span>
        <el-select v-model="chianname" @change="changeChian" placeholder="请选择院线">
          <el-option
            v-for="item in chiansOptions"
            :key="item.id"
            :label="item.name"

            :value="item">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" @click="getRegionData">查询</el-button>
        <!-- <el-input type="text" size="small" placeholder="请输入" style="width:120px"></el-input> -->
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
      headerCellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
      productid: '', // 用于获取数据的产品id
      chianname: '', // 选中后的院线名称
      cinemalineId: '', // 院线id
      tablename: ['总场次', '区域登记'],
      tableList: [
      ],
      chartText: '场次',
      tableText: '场次',
      primarypaly: 'primary',
      primaryseat: '',
      primarypaly1: 'primary',
      primaryseat1: '',
      playtimesList: [], // 排片场次数组
      seatingList: [], // 座位数组
      value: '',
      page: 1,
      totalpage: 0,
      options: [],
      chiansOptions : [],
      date: '',
      isSearching:false,
      chartBar: null,
      tableData: [
      ],
      chartList: [],
      chartName: [],
      movieData_playtimes: [], // [排片表头
      movieData_seat: [], // 排座表头
      movieDataList: [], // 表头
      isseat: false, // 判断是场次还是排片
      isseatChart: false,
      xAxis: [], // 图表的x轴显示
      movieIds: [], // 电影id
    }
  },
  computed: {
  },
  created () {
    window.addEventListener('setItem', () => {
      this.newVal = sessionStorage.getItem('watchStorage')
      this.isSearching = this.newVal
    })
  },
  mounted() {
    let _this = this
    _this.date = this.CurentTime(new Date('2019-04-02'))
    _this.getcookie()
    _this.getchinasList()
    _this.getRegionData()
  },
  methods: {
    renderHeader(h, { column }) {
      return h('i', {
        class: 'el-icon-setting'
      })
    },
    // // 分页数据获取
    // changePage (val) {
    //   let _this = this
    //   _this.page = val
    //   _this.getRegionData()
    // },
    // 获取缓存的产品id
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
    getcookie(){
      this.productid=this.$cookie.get('productid')
      if(this.productid==null){
        this.productid='9'
      }
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
    changeDate (val) {
      this.date = this.CurentTime(val)
      this.getRegionData()
    },
    // 点击切换表格的数据
    changeTable (isseat) {
      let _this = this
      if (isseat === true) {
        _this.primarypaly = ''
        _this.primaryseat = 'primary'
        _this.tableData = this.tableData
        // _this.movieDataList = _this.movieData_seat
        _this.isseat = true
        _this.tableText = '排座'
      } else {
        // _this.movieDataList = _this.movieData_playtimes
        _this.primarypaly = 'primary'
        _this.primaryseat = ''
        _this.tableData = this.tableData
        _this.isseat = false
        _this.tableText = '场次'
      }
    },
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
    // 选择院线保存院线id
    changeChian (val) {
      let _this = this
      _this.cinemalineId = val.id
      _this.chianname = val.name
      _this.getRegionData()
    },
    // 获取地域数据
    getRegionData () {
      let _this = this
      _this.loading = true
      let chartName = []
      var arrList = [] // 空数组用于临时装表头名
      _this.$http({
        url: _this.$http.adornUrl('/web/moviecompany/screeningAnalysisWithRegion/'+_this.productid+ '/' + _this.date+'/?current='+_this.page+'&size=10'),
        method: 'POST',
        data: _this.$http.adornData({
          'productid': _this.productid,
          'time': _this.date,
          'cinemalineId': _this.cinemalineId,
          'current': _this.page,
          'size': 10
        })
      }).then(({data}) => {
        console.log('获取到新的数据', data.page)
        if (data.code === 0) {
          var movieData_seat = [ // 排座的表格
            {label: '总场次', prop: 'total_arranged_seating', prop1: 'total_arranged_seating_rate'}
          ]
          var movieData_playtimes = [ // 排片的表格
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
          var tableData = []
          let kIndex = -1
            for (let k = 0; k < data.page.records.length; k++) {
              console.log(data.page.records[k].urbanHierarchyCode)
              if (data.page.records[k]['urbanHierarchyCode'] != null) {
                if (data.page.records[k].urbanHierarchyCode == 1) {
                  data.page.records[k].urbanHierarchyCode = '一线城市'
                } else if(data.page.records[k].urbanHierarchyCode === 2) {
                  data.page.records[k].urbanHierarchyCode = '二线城市'
                } else if (data.page.records[k].urbanHierarchyCode === 3) {
                  data.page.records[k].urbanHierarchyCode = '三线城市'
                } else if (data.page.records[k].urbanHierarchyCode === 4) {
                  data.page.records[k].urbanHierarchyCode = '四线城市'
                } else if (data.page.records[k].urbanHierarchyCode === 5) {
                  data.page.records[k].urbanHierarchyCode = '五线城市'
                } else if (data.page.records[k].urbanHierarchyCode === null) {
                  data.page.records[k].urbanHierarchyCode = '其他'
                  data.page.records.splice(k)
                }
              }
              if (data.page.records[k]['value']) {
                data.page.records[k]['urbanHierarchyCode'] = '总计占比'
                // tableData.unshift(data.page.records[k])
              }
              if (data.page.records[k]['urbanHierarchyCode'] == null) {
                console.log(k, '需要筛掉')
                // data.page.records.splice(k)
                kIndex = k

              }
            }
            data.page.records.splice(kIndex, 1)
          var tableData = data.page.records
          _this.tableData = tableData // table数据赋值
          _this.total = data.page.total // 保存最大页
          // 画出图表、
          if (_this.isseat === true) {
            _this.movieDataList = _this.movieData_seat // 排座时候的表
          } else {
            _this.movieDataList = _this.movieData_playtimes // 排片时候，的表头
          }
          this.loading = false
            _this.initChartBar(xAxis, tableData, _this.isseat)
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
    // 数组去重
    unique (arr) {
      let res =[]
      for(var i=0,len=arr.length;i<len;i++){
        var obj = arr[i]
        if(res.indexOf(obj)===-1) res.push(obj)
      }
      return res
    },
    // 绘制图表
    initChartBar(xAxis, tableData, isseat) {
      var legend = []
      var series = []
      var records = tableData
      let yAxis = []
      for (var i = 1; i < records.length ; i++) {
        console.log(records[i])
        var record = records[i];
        var yAxistimes = [];
        var yAxisseats = [];
        for (var j = 0; j < this.movieIds.length; j++) {
          yAxistimes.push(record[this.movieIds[j] +"_playtimes"]);
          yAxisseats.push(record[this.movieIds[j] +"_arranged_seating"]);
        }
        if (isseat === true) {
          yAxis = yAxisseats
        } else {
          yAxis = yAxistimes
        }
        legend.push(record.urbanHierarchyCode)
        var mySeries = {
          name:record.urbanHierarchyCode,
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
          containLabel: true
        },
        legend: {
          bottom: 20,
          right: 20,
          itemWidth: 25,
          itemHeight: 3,
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
            // min: 0,
            // max: 90000,
            // minInterval: 30000,
            // name: chartText
          }
        ],
        series: series
      };
      this.chartBar = echarts.init(document.getElementById('J_chartbarBox'))
      this.chartBar.setOption(option)
      window.addEventListener('resize', () => {
        this.chartBar.resize()
      })
      setTimeout(() => {
        this.chartLoading = false
      }, 100)
    },

    setTitle(line, tabEle) {
      switch(line){
            case 1:
              tabEle["title"] = "一线城市"
              break;
            case 2:
              tabEle["title"] = "二线城市"
              break;
            case 3:
              tabEle["title"] = "三线城市"
              break;
            case 4:
              tabEle["title"] = "四线城市"
              break;
            case 5:
              tabEle["title"] = "五线城市"
              break;
            }
    },
    // 获取总排片数或者总排座数
    getTotal(records, filmName) {
      records.forEach(element => {
        if (element.name == filmName) {
          return element.playtimes
        }
      })
    },
    // 获取总排座数
    getseatTotal (records, filmName) {
      records.forEach(element => {
        if (element.name == filmName) {
          return element.arrangedSeating
        }
      })
    },
    // 获取排片总占比
    getTotalRate(records, filmName) {
      let _this = this
        records.forEach(element => {
          if (element.name == filmName) {
            return element.playtimesRate
          }
        })
    },
    // 获取排座总占比
    getTotalseatRate(records, filmName) {
      let _this = this
        records.forEach(element => {
          if (element.name == filmName) {
            return element.arrangedSeatingRate
          }
        })
    }
  },


}
</script>
<style>

</style>
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
 /*
  .title-l .el-button:nth-child(2) {
    margin: 0 35px 0 26px;
    color: #333333;
  }

  .title-l .el-button:nth-child(3) {
    background-color: #3295D9;
    padding-left: 30px;
    padding-right: 30px;
    color: #fff;
  }

  .title-l .el-button:nth-child(4) {
    background-color: #f5f5f5;
  } */
  .download {
    color: #666666;
    font-size: 24px;
    padding-top: 10px;
  }

  .el-table td:nth-child(1) {
    padding-left: 60px;
  }

  .table-header th:nth-of-type(1) {
    padding-left: 60px;
  }

  .table-header {
    color: #333333;
  }
</style>
