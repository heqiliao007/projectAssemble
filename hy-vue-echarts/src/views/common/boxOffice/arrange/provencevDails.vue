<template>
	<div style="width: 100%;">
		<div class="netwoeksDails">
			<p class="title_header">
				<span style="margin-right: 3px;">票房分析</span>
				<i class="iconfont iconarrow-right-copy-copy"></i>
				<span @click.native="goPre">省份详情</span>
			</p>
			 <p style="margin-top: 30px;">
				<span style="color: #353535; font-size: 30px; font-weight: 700;">{{provinceDetail.area_name}}</span>
			</p>
<p><span style="display: inline-block;background: #0084cf;margin-right: 20px;line-height: 20px;padding: 0 12px;color: #ffffff;">标签-1</span><span style="display: inline-block;background: #0084cf;margin-right: 20px;line-height: 20px;padding: 0 12px;color: #ffffff;">标签-1</span></p>
      <el-row :gutter="20" v-loading='basicLoading'>
        <el-col :span="8">
          <div class="infoleft">
            <!-- <div class="info-pic" :style="{ 'background-image': 'url(' + picture + ')'}"></div> -->
            <div style="border-right: 1px solid #CDCDCD; line-height: 30px; overflow: hidden;word-wrap:break-word">
              <el-row :gutter="20" style="">
                <el-col :span="8" style="color: #A3A3A3;">院线数</el-col>
                <el-col :span="12" style="color: #0084CF;">{{provinceDetail.cinemaline_num}}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8" style="color: #A3A3A3;">营业中的影院数</el-col>
                <el-col :span="13" style="color: #0084CF;">{{provinceDetail.cinema_num}}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8" style="color: #A3A3A3;">发行电影数</el-col>
                <el-col :span="13" style="color: #0084CF;">{{provinceDetail.movie_num}}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8" style="color: #A3A3A3;">下属城市数</el-col>
                <el-col :span="13" style="color: #0084CF;">{{provinceDetail.area_num}}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8" style="color: #A3A3A3;">座位数</el-col>
                <el-col :span="13" style="color: #4C4C4C;">{{provinceDetail.seating_num}} 座</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8" style="color: #A3A3A3;">银幕数</el-col>
                <el-col :span="13" style="color: #4C4C4C;">{{provinceDetail.screen_num}}</el-col>
              </el-row>

            </div>
          </div>
        </el-col>
        <el-col :span="6" style="margin-left: 20px;">
          <el-row
            class="zhishubox"
            :class="activeBox == '1' ? 'activebox' : ''"
            >
            <img class="zhishutupian" v-show="activeBox != '1'" src="./img/today_gray.png">
            <img class="zhishutupian" v-show="activeBox == '1'" src="./img/today.png">
            <div class="zhishuwenzi"
            @mouseover="handleMouse('1')"
        	  @mouseleave="mouseLeave" >
              <span style="color: #0084CF; font-size: 50px; font-weight: 700;">{{provinceDetail.box_office_num}}</span>
              <span style='font-size: 24px; text-align: center;'>万</span>
              <p>
                今日实时票房
              </p>
            </div>
          </el-row>
          <el-row class="zhishubox" :class="activeBox == '2' ? 'activebox' : ''">
            <img class="zhishutupian" v-show="activeBox != '2'" src="./img/invet_gray.png" alt="">
            <img class="zhishutupian" v-show="activeBox == '2'" src="./img/invet.png" alt="">
            <div
              class="zhishuwenzi"
              @mouseover="handleMouse('2')"
        	    @mouseleave="mouseLeave"
              >
              <span style="color: #CF0000; font-size: 50px; font-weight: 700;">{{provinceDetail.rank_sort}}</span>
              <span style='font-size: 24px; text-align: center;'>名</span>
              <p>
                省份排名
              </p>
            </div>
          </el-row>
        </el-col>
        <el-col :span="4" style="margin-left: 40px;">
          <el-row class="zhishubox" :class="activeBox == '3' ? 'activebox' : ''">
            <img class="zhishutupian" v-show="activeBox != '3'" src="./img/person_gray.png" alt="">
            <img class="zhishutupian" v-show="activeBox == '3'" src="./img/person_gary.png" alt="">
            <div class="zhishuwenzi"
              @mouseover="handleMouse('3')"
        	    @mouseleave="mouseLeave"
            >
              <span style="color: #14BDB3; font-size: 50px; font-weight: 700;">{{provinceDetail.person_time_num}}</span>
              <span style='font-size: 24px; text-align: center;'>万</span>
              <p>
                今日实时人次
              </p>
            </div>
          </el-row>
          <el-row class="zhishubox" :class="activeBox == '4' ? 'activebox' : ''">
            <img class="zhishutupian" v-show="activeBox != '4'" src="./img/average_gray.png" alt="">
            <img class="zhishutupian" v-show="activeBox == '4'" src="./img/anverage.png" alt="">
            <div
            class="zhishuwenzi"
            @mouseover="handleMouse('4')"
        	  @mouseleave="mouseLeave"
            >
              <span style="color: #EAB600; font-size: 50px; font-weight: 700;">{{provinceDetail.avg_ticket_price}}</span>
              <span style='font-size: 24px; text-align: center;'>万</span>
              <p>
                平均票价
              </p>
            </div>
          </el-row>
        </el-col>
      </el-row>

      <div>
        <span @click="show('1')" style="display: inline-block; font-size: 18px; color: #4C4C4C;" :class="active == '1'? 'active' : ''">
          影片票房
          <i v-show="active=='1'" style="display: block; width: 45px; border-bottom: 3px solid #40A9FF; margin-top: 10px;"></i>
        </span>
        <span @click="show('2')" style="display: inline-block; font-size: 18px; color: #4C4C4C; margin-left: 30px;" :class="active == '2'? 'active' : ''">
          电影排片
          <i v-show="active=='2'" style="display: block; width: 45px; border-bottom: 3px solid #40A9FF; margin-top: 10px;"></i>
        </span>
      </div>
      <div style="margin-top: 30px; font-size: 18px;">
        <el-button v-show="active=='1'" :type="currentName == 'times' ? 'primary' : ''"  @click="chooseCurrent('times')">时段</el-button>
        <el-button v-show="active=='1'" :type="currentName == 'films' ? 'primary' : ''" @click="chooseCurrent('films')">影片</el-button>
        <el-row style="margin-top: 30px;">
          <span class="demonstration">时间：</span>
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="-"
            @change="chooseDates_e"
            v-if="currentName == 'times'"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <!-- <el-date-picker v-model="date" size="small" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" v-if="currentName == 'times'" @change="chooseDates_e"></el-date-picker> -->
          <el-date-picker v-model="time" size="small" type="date" v-else-if="currentName == 'films'" @change="chooseDate"></el-date-picker>
          <span class="demonstration">城市：</span>
          <el-select v-model="cityId" placeholder="请选择">
            <el-option
              v-for="item in cityOptions"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
          <span class="demonstration">院线：</span>
          <el-select v-model="cinemaLineId" placeholder="请选择">
            <el-option
              v-for="item in ciOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-checkbox v-show="active == '1'" v-model="checked">服务费</el-checkbox>
          <el-button type="primary" @click="searchData" size="small">查询</el-button>
        </el-row>
        <el-row style="width: 100%; height: 400px; backgroundColor: #fff; margin-top: 30px;">
          <div style="height: 60px; line-height: 60px; padding-left: 30px; margin-bottom: 10px;">
            <span v-if="currentName == 'times'"> 时段分析 {{start +'——'+ end }} </span>
            <span v-else-if="currentName == 'films'"> 影片分析 {{ time }} </span>
            <span style="color: #4C4C4C; font-size: 12px;" v-show='checked' >已选择服务费</span>
            <el-select v-model="value" placeholder="请选择" @change="chooseBoxType" v-show="active == '1'">
              <el-option v-for="item in boxofficetype" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          </div>
          <i class="el-icon-hysj-xiazai" style="float: right;margin-top: 5px;height: 23px;margin-right: 132px;"></i>
          <i class="iconfont iconzhuzhuangtu" style="float: right;margin-top: 5px;height: 23px;margin-right: 32px;"></i>
          <i class="iconfont iconxianxingtu" style="float: right;margin-top: 5px;height: 23px;margin-right: 32px;"></i>
          <div id="chartLine" style="height: 360px" v-loading='boxofficeTrendLoading'></div>
        </el-row>
        <el-row>
          <div style="height: 60px; line-height: 60px; padding-left: 30px; margin-bottom: 10px; margin-top: 30px;">
            <span v-if="currentName == 'times'"> 时段分析 {{start +'——'+ end }} </span>
            <span v-else-if="currentName == 'films'"> 影片分析 {{ time }} </span>
            <span style="color: #4C4C4C; font-size: 12px;" v-show='checked' >已选择服务费</span>
          </div>
          <el-table
            v-if="active === '1'"
						:data="tableData"
						stripe
            v-loading='tableLoading'
						:header-cell-style='headerCellStyle'
						style="width: 100%">
						<el-table-column
							:render-header="renderHeader"
							width="40">
						</el-table-column>
            <el-table-column
							label="日期"
							prop="date_str"
							width="100">
						</el-table-column>
						<el-table-column
							label="票房（万）"
							:prop="checked === true ? 'box_office' : 'box_office_no_service'">
							<template slot-scope="scope">
								<!-- <i class="iconfont iconhistogram" style="color: #0084CF;"></i> -->
								<span style="margin-left: 10px; color: #0084CF;"  @click="alink(scope.row)">{{ scope.row.name }}</span>
							</template>
						</el-table-column>
						<el-table-column
							label="票房占比"
							prop="box_office_rate">
						</el-table-column>
						<el-table-column
							label="人次"
							prop="person_time">
						</el-table-column>
						<el-table-column
							label="人次占比"
							prop="person_time_rate">
						</el-table-column>
						<el-table-column
							label="排座"
							prop="arranged_seating">
						</el-table-column>

						<el-table-column
							label="排座占比"
							prop="seating_rate">
						</el-table-column>
						<el-table-column
							label="服务费（万）"
							prop="service_cost">
						</el-table-column>
						<el-table-column
							label="平均票价（万）"
							prop="avg_ticket_price">
						</el-table-column>
						<el-table-column
							label="场均人次"
							prop="avg_screening_pserson">
						</el-table-column>
					</el-table>
          <el-table v-if="active === '2'" :data="tableData" :header-cell-style="{background:'#c1c1c1','color':'#ffffff'}" stripe style="width: 100%" v-loading='tableLoading'>
            <el-table-column prop="movie_name" label="影片名称" width="150"></el-table-column>
            <el-table-column prop="days" label="上映天数"></el-table-column>
            <el-table-column prop="movie_types" label="影片类型"></el-table-column>
            <el-table-column prop="playtimes" label="放映场次"></el-table-column>
            <el-table-column prop="playtimes_ring" label="场次环比"></el-table-column>
            <el-table-column prop="total_playtimes" label="放映总场次"></el-table-column>
          </el-table>
					<el-pagination
							style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
							background
							layout="prev, pager, next"
							:page-size="10"
							:total="total"
							:current-page="page"
							@current-change="handleCurrentChange"
						/>
        </el-row>
      </div>
		</div>
	</div>
</template>

<script>
  // import HeadEr from '../recommend/home'
  // import picture from "";
  import echarts from 'echarts'
	export default {
		data () {
			return {
        headerCellStyle: {
					"color":"#fff",
					'backgroundColor': '#C1C1C1'
        },
        basicLoading: true,
        active: '1',
        activeBox: '',
        date: '',
        area: '',
        piaofang: '',
        value: '1',
        boxofficetype: [
          {
            value: '1',
            label: '当前票房'
          }, {
            value: '2',
            label: '当前场次'
          }, {
            value: '3',
            label: '当前人次'
          }
        ],
        checked: false,
        chartLine: null, // 图表
        chartData: {
          type: '', // line或者bar
          xAxisData: [],
          boxdata: [],
          personData: [],
          playtiemsdata: [],
          boxdataser: []
        },
        tableData: [],
        // chartData: ['0', '47.8729', '8.933', '218.0624', '218.0624', '481.6265', '581.6265']

        provinceDetail:"",
        constant:'', //省份 ID
        cityOptions: [],
        cityId: '',
        ciOptions: [],
        cinemaLineId: '', // 院线id
        start: '',
        end: '',
        tableLoading: true,
        total: 0,
        page: 1,
        boxofficeTrendLoading: true,
        currentName: 'times', // 选择时段或者影片
        time: ''
			}
		},
		components: {
		  // HeadEr
    },
    created(){

    },
    mounted() {
      this.constant = sessionStorage.getItem('cityId')
      this.getEndDate()
      console.log(this.constant, ',,,,,,,,,,,,,,,,,,,,,,,,,,,,')
      this.renderMessage()
      // this.initMarketLine()
      this.getCityList()
      this.getCi()
    },
    methods: {
      renderMessage(){
        let _this = this
        _this.$http({
          url: _this.$http.adornUrl('web/provincedetailpage/getBasicInfo'+`?areaId=`+_this.constant),
          method: 'post',
          data: {}
        }).then((res) => {
          if (res.data.code===0) {
            _this.basicLoading = false
            _this.provinceDetail = res.data.result
            console.log(_this.provinceDetail)
          } else {
          }
        })
      },
      // renderHeader(h, {column}) {
			// 	return h ('i', {
			// 				'class':'el-icon-setting'
			// 			})
      // },
      //分页
		handleCurrentChange(val) {
			this.loading = true;
      this.page = val;
      this.tableLoading = true
			this.gettimeList(this.constant, this.start, this.end, 10)
		},
      // 获取影片票房图表列表数据-时段
      gettimeList (id, start, end, size) {
        let _this = this;
        console.log(_this.checked)
        // let label = 'movie';
        _this.$http({
            url: _this.$http.adornUrl('web/provincedetailpage/getDuringAnalysisList?areaId=' + id + '&startDate=' + start + '&endDate=' + end  + '&cinemaLineId=' + this.cinemaLineId + '&cityId=' + this.cityId + '&current=' + this.page + '&size=' + size),
            method: 'POST',
            data: _this.$http.adornData({
              cinemaLineId: id,
              startDate: '',
              endDate: '',
              areaId: '',
              cinemaId: ''
            })
          })
          .then(({ data }) => {
            console.log('时段，，，，，，，，，，，，，，', data)
            // this.boxofficeTrendLoading = false
            if (data.code == 0 && data.page.records) {
              if (size === 10) {
                this.tableData = data.page.records
                this.total = Number(data.page.total)
                this.tableLoading = false
              } else {
                let chartData = {
                  type: 'line',
                  xAxisData: [],
                  boxdata: [],
                  personData: [],
                  playtiemsdata: [],
                  boxdataser: []
                }
                for (let i = 0; i < data.page.records.length; i++) {
                  chartData.xAxisData.push(data.page.records[i].date_str)
                  chartData.boxdata.push(data.page.records[i].box_office)
                  chartData.personData.push(data.page.records[i].person_time)
                  chartData.playtiemsdata.push(data.page.records[i].playtimes)
                  chartData.boxdataser.push(data.page.records[i].box_office_no_service)
                }
                this.chartData = chartData
                console.log(this.chartData, '////////')
                if (this.checked === true) {
                  this.initChartBoxTrend(chartData.xAxisData, chartData.boxdata, chartData.type)
                } else {
                  this.initChartBoxTrend(chartData.xAxisData, chartData.boxdataser, chartData.type)
                }
              }
            } else {
              if (size === 10){
                this.tableData = []
              } else {
                let x = []
                let data = []
                let type = 'line'
                this.initChartBoxTrend(x, data, chartData.type)
              }
            }
          })
        },
      // 获取影片票房图表列表数据-影片
      getfilmList (id, date, size) {
      let _this = this;
			_this.$http({
					url: _this.$http.adornUrl('/web/provincedetailpage/getDayAnalysisOfFilmList?cinemaLineId=' + this.cinemaLineId + '&date=' + date + '&areaId=' + _this.constant + '&cityId=' + this.cityId + '&current=' + this.page + '&size=' + size),
					method: 'POST',
					data: _this.$http.adornData({
            cinemaLineId: id,
            startDate: '',
            endDate: '',
            areaId: '',
            cinemaId: ''
					})
				})
				.then(({ data }) => {
          console.log('影片，，，，，，，，，，，，，，', data)

          if (data.code == 0 && data.page.records) {
            if (size === 10) {
              this.tableData = data.page.records
              this.tableLoading = false
            } else {

              let chartData = {
                type: 'bar',
                xAxisData: [],
                boxdata: [],
                personData: [],
                playtiemsdata: [],
                boxdataser: []
              }

              for (let i = 0; i < data.page.records.length; i++) {
                chartData.xAxisData.push(data.page.records[i].date_str)
                chartData.boxdata.push(data.page.records[i].box_office)
                chartData.personData.push(data.page.records[i].person_time)
                chartData.playtiemsdata.push(data.page.records[i].playtimes)
                chartData.boxdataser.push(data.page.records[i].box_office_no_service)
              }
              this.chartData = chartData
              console.log(this.chartData, '////////')
              if (this.checked === true) {
                this.initChartBoxTrend(chartData.xAxisData, chartData.boxdata, 'bar')
              } else {
                this.initChartBoxTrend(chartData.xAxisData, chartData.boxdataser, 'bar')
              }
              this.boxofficeTrendLoading = false
            }
          } else {
            if (size === 10) {
              this.tableData = []
            } else {
              let data = []
              let x = []
              this.initChartBoxTrend(x, data, 'bar')
            }
          }
				})
      },
      // 获取电影排片数据
      // 城市获取列表
      getCityList () {
        let _this = this
        _this.$http({
          url: _this.$http.adornUrl('/web/sysdict/dictOfRegion'),
          method: 'post',
          data: {}
        }).then(({data}) => {
          console.log(data)
          if (data.code===0) {
            this.cityOptions = data.city
          } else {
            alert('暂无数据')
            this.cityOptions = []
          }
        })
      },
      // 院线列表获取
      getCi () {
        let _this = this
        _this.$http({
          url: _this.$http.adornUrl('web/cinema/listcinema'),
          method: 'get',
          data: {}
        }).then(({data}) => {
          console.log(data)
          if (data.code===0) {
            this.ciOptions = data.listMap
          } else {
            alert('暂无数据')
            this.ciOptions = []
          }
        })
      },
      chooseDate (val) {
        console.log(val)
        this.time = this.CurentTime(val)
      },
      // 选择时段或者影片
      chooseCurrent (val) {
        this.currentName = val
        if (val === 'times') {
          this.tableLoading = true
          this.boxofficeTrendLoading = true
          this.$nextTick(() => {
            this.gettimeList(this.constant, this.start, this.end, 10)
            this.gettimeList(this.constant, this.start, this.end, 999999)
          })
        } else if (val === 'films') {
          this.tableLoading = true
          this.boxofficeTrendLoading = true
          let time = new Date()
          this.time = this.CurentTime(time)
          console.log(time)
          // this.time = this.CurentTime(val)
          this.$nextTick(() => {
            this.getfilmList(this.constant, this.time, 10)
            this.getfilmList(this.constant, this.time, 999999)
          })
        }
      },
      // 选择场次、人次、等
      chooseBoxType (val) {
        console.log(val)
        this.boxofficeTrendLoading = true
        let type = ''
        if (this.currentName == 'times') {
          type = 'line'
        } else {
          type = 'bar'
        }
        if (val == 1) { // 票房
        console.log('选择了票房')
          if (this.checked == true) {
            this.$nextTick(() => {
              this.initChartBoxTrend(this.chartData.xAxisData, this.chartData.boxdataser, type)
            })
          } else {
            this.$nextTick(() => {
              this.initChartBoxTrend(this.chartData.xAxisData, this.chartData.boxdata, type)
            })
          }
        } else if (val == 2) { // 场次
        console.log('场次')
        // let data = [234, 321, 452, 563, 111, 782, 321, 453, 123, 231]
          this.$nextTick(() => {
            this.initChartBoxTrend(this.chartData.xAxisData, this.chartData.playtiemsdata, this.chartData.type)
            // this.initChartBoxTrend(this.chartData.xAxisData, data, type)
          })
        } else if (val == 3) { // 人次
          console.log('人次')
          this.$nextTick(() => {
            this.initChartBoxTrend(this.chartData.xAxisData, this.chartData.personData, type)
          })
        }
        console.log(this.checked)
      },
      // 点击查询按钮
      searchData () {
        if (this.currentName === 'times') {
          this.tableLoading = true
          this.boxofficeTrendLoading = true
          this.$nextTick(() => {
            this.gettimeList(this.constant, this.start, this.end, 10)
            this.gettimeList(this.constant, this.start, this.end, 999999)
          })
          // this.gettimeList(this.constant, this.start, this.end)
        } else if (this.currentName === 'films') {
          this.tableLoading = true
          this.boxofficeTrendLoading = true
          let date = this.time
          this.$nextTick(() => {
            this.getfilmList(this.constant, date, 10)
            this.getfilmList(this.constant, date, 999999)
          })

        }
      },
      // 处理日期
      CurentTime(now) {
        if (now == '' || now == null || now == undefined || now == ' ') {
          return '';
        } else {
          var year = now.getFullYear();
          var month = now.getMonth() + 1;
          var day = now.getDate();
          var clock = year + '-';
          if (month < 10) clock += '0';
          clock += month + '-';
          if (day < 10) clock += '0';
          clock += day;
          return clock;
        }
      },
      // 选择时间段
      chooseDates_e (val) {
        this.start = this.CurentTime(val[0])
        this.end = this.CurentTime(val[1])
        console.log(this.start, this.end)
      },
      // 获取开始时间和结束时间
      getEndDate () {
        let end = Date.parse(new Date())
        let day = 15
        let start = end - 3600000*24*(day-1)
        this.end = this.CurentTime(new Date(end))
        this.start = this.CurentTime(new Date(start))
        this.$nextTick(() => {
          this.gettimeList(this.constant, this.start, this.end, 10)
          this.gettimeList(this.constant, this.start, this.end, 999999)
        })
      },
      // 返回上一页
      goPre() {
        this.$router.go(-1);
      },
      show (val) {
        this.active = val
        this.boxofficeTrendLoading = true
        this.tableLoading = true
        console.log(val)
        if (val === '2') { // 电影排片
          let time = new Date()
          this.time = this.CurentTime(time)
          console.log(time)
          this.$nextTick(() => {
            this.getfilmPlayList(this.constant)
          })
        } else if (val === '1') { // 影片票房
          this.$nextTick(() => {
            this.getEndDate()
            // this.gettimeList(this.constant, this.start, this.)
          })
        }
      },
      // 获取电影排片
      getfilmPlayList (id) {
        let _this = this;
        // let label = 'movie';    // this.constant  // this.time
        _this.$http({
            url: _this.$http.adornUrl('/web/provincedetailpage/getDayFilmScheduleAnalysisList?areaId=' + this.constant + '&date=' + this.time + '&cinemaLineId=' + this.cinemaLineId),
            method: 'POST',
            data: _this.$http.adornData({
              cinemaLineId: id,
              startDate: '',
              endDate: '',
              areaId: '',
              cinemaId: ''
            })
          })
          .then(({ data }) => {
            console.log('电影排片，，，，，，，，，，，，，，', data)
            this.tableLoading = false
            if (data.code == 0 && data.page.records) {
              this.tableData = data.page.records
              let chartData = {
                xAxisData: [],
                data: []
              }
              for (let i = 0; i < data.page.records.length; i++) {
                chartData.xAxisData.push(data.page.records[i].movie_name)
                chartData.data.push(data.page.records[i].playtimes)
              }
              this.chartData = chartData
              this.initChartBoxTrend(this.chartData.xAxisData, this.chartData.data, 'bar')
            } else {
              this.tableData2 = []
              this.chartData2 = {
                xAxisData: [],
                data: []
              }
              this.initChartBoxTrend(this.chartData.xAxisData, this.chartData.data, 'bar')
            }
          })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleChooseType(command) {
				this.typeChoose = command
      },
      // 绘制票房趋部分的图表
      initChartBoxTrend(xAxisData, data, type) {
        console.log(type)
        let color = []
        if (type === 'line') {
          color = ['#BF4C5B']
        } else if (type === 'bar') {
          color = ['#0084CF']
        }
        let option = {
          color: color,
          xAxis: {
              type: 'category',
              data: xAxisData,
              axisLabel: {
                interval: 0,
                rotate: 30
              },
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: data,
              type: type,
              barWidth: 20
          }]
        }

        this.chartLine = echarts.init(document.getElementById('chartLine'));
        this.chartLine.setOption(option, true);
        window.addEventListener('resize', () => {
          this.chartLine.resize()
        })
        this.boxofficeTrendLoading = false
      },
      handleMouse(val) {
        this.activeBox = val
      },
      mouseLeave() {
        this.activeBox = ''
      }
    },
	}
</script>

<style lang='scss'>
  .activebox {
    border-bottom: 2px solid #399BFF
  }
  .active {
    font-weight: 700;
  }
	.netwoeksDails {
		width: 95%;
		height: auto;
		margin: 10px auto;
		box-sizing: border-box;
		padding: 10px 5px;
		.title_header {
			border-left: 2px solid #40A9FF;
			box-sizing: border-box;
			padding-left: 10px;
			font-size: 12px;
		}
    .infoleft {
      position: relative;
      height: 266px;
      box-sizing: border-box;
      /* padding-left: 25px; */
      padding-top: 20px;
      padding-bottom: 5px;
      .info-pic {
        position: absolute;
        left: 0;
        top: 0;
        width:196px;
        height: 266px;
        background-color: #D3D3D3;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
    .zhishubox {
      position: relative; width: 100%; height: 110px; padding-left: 55px; margin-bottom: 20px;
    }
    .zhishutupian {
      width: 50px; position: absolute; top: 10px; left: 0;
    }
    .zhishuwenzi {
      width: 100%;
      text-align: center
    }
    .zuopininfobox {
      position: relative;
      padding: 20px;
      padding-left: 25%;
      .zuopininfopic {
        position: absolute;
        left: 30%;
        top: 40px;
        transform: translateX(-40%);
      }
    }
    .chartBox {
      width: 100%;
      background-color: #fff;
      height: 400px;
      .charttitle {
        line-height: 30px; font-size: 14px; color: #4c4c4c;
        padding-left: 20px;
      }
    }

	}
</style>
