<template>
  <div>
    <!-- <el-row class="row-m20-p20">
      <el-col :span="24">
        <el-button type="primary" size="small">票房</el-button>
        <el-button type="info" size="small">场次</el-button>
        <el-button type="info" size="small">人次</el-button>
        <el-button type="info" size="small">上映数量</el-button>
      </el-col>
    </el-row> -->
    <el-row class="row-m20-p20">
      <el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
        <div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
          <p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">性别</p>
          <!-- <i class="el-icon-hysj-xiazai" style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;"></i>
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../boxOffice/img/icon_xianxing.png" alt="">
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../boxOffice/img/icon_zhuzhuang.png" alt="">
          <i class="el-icon-refresh" style="float: right;margin-top: 36px;height: 33px;margin-right: 32px;"></i> -->
        </div>
        <div id="sexChart" style="height: 430px"></div>
      </el-col>
      <el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-left: 10px solid #F5F5F5;">
        <div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
          <p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">年龄
          </p>
          <!-- <i class="el-icon-hysj-xiazai" style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;"></i>
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../boxOffice/img/icon_xianxing.png" alt="">
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../boxOffice/img/icon_zhuzhuang.png" alt="">
          <i class="el-icon-refresh" style="float: right;margin-top: 36px;height: 33px;margin-right: 32px;"></i> -->
        </div>
        <div id="ageChart" style="height: 430px"></div>
      </el-col>
    </el-row>
    <el-row class="row-m20-p20">
      <el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
        <div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
          <p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">学历</p>
          <!-- <i class="el-icon-hysj-xiazai" style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;"></i>
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../boxOffice/img/icon_xianxing.png" alt="">
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../boxOffice/img/icon_zhuzhuang.png" alt="">
          <i class="el-icon-refresh" style="float: right;margin-top: 36px;height: 50px;margin-right: 32px;"></i> -->

        </div>
        <div id="educationChart" style="height: 430px"></div>
      </el-col>
      <el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
        <div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
          <p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">星座</p>
          <!-- <i class="el-icon-hysj-xiazai" style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;"></i>
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../boxOffice/img/icon_xianxing.png" alt="">
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../boxOffice/img/icon_zhuzhuang.png" alt="">
          <i class="el-icon-refresh" style="float: right;margin-top: 36px;height: 33px;margin-right: 32px;"></i> -->
        </div>
        <div id="constellationChart" style="height: 430px"></div>
      </el-col>
    </el-row>
    <el-row class="row-m20-p20">
      <el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
        <div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
          <p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">兴趣爱好</p>
          <!-- <i class="el-icon-hysj-xiazai" style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;"></i>
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../boxOffice/img/icon_xianxing.png" alt="">
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../boxOffice/img/icon_zhuzhuang.png" alt="">
          <i class="el-icon-refresh" style="float: right;margin-top: 36px;height: 33px;margin-right: 32px;"></i> -->

        </div>
        <div id="hobbyChart" style="height: 430px"></div>
      </el-col>
      <el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
        <div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
          <p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">区域图</p>
          <!-- <i class="el-icon-hysj-xiazai" style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;"></i>
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../boxOffice/img/icon_xianxing.png" alt="">
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../boxOffice/img/icon_zhuzhuang.png" alt="">
          <i class="el-icon-refresh" style="float: right;margin-top: 36px;height: 33px;margin-right: 32px;"></i> -->
        </div>
        <div id="regionChart" style="height: 430px"></div>
      </el-col>
    </el-row>
    <div class="cover" v-if="isSearching == 'true'" />
		<div class="search" v-if="isSearching == 'true'">
			<div class="search-box">
				<span>日期：</span>
				<el-date-picker size="small" v-model="date" @change="getNewDate" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
				<span>媒体：</span>
				<el-select size="small" v-model="regionnw" placeholder="请选择" style="width: 150px;">
					<el-option v-for="item in region" :key="item.id" :label="item.nameF" :value="item.id"></el-option>
				</el-select>
        <span>类型：</span>
				<el-select size="small" v-model="attributenow" placeholder="请选择" style="width: 100px;">
					<el-option v-for="item in attribute" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
				<el-button size="small" type="primary" @click="getBoxoffice()">查询</el-button>
			</div>
		</div>

  </div>
</template>

<script>
  import echarts from 'echarts'
  import hkJSON from '../../../../static/plugins/echarts-3.8.5/china.json'
  // import hkJSON from 'https://geo.datav.aliyun.com/areas/bound/100000.json'
    export default {
      name: 'boxOfficeTrend',
      components: {
      },
      data () {
        return {
          date: '',
          regionnw: '',
          region: [],
          lists:['爱情','科幻','动作'],
          sexChart: null,
          chartAge: null,
          ageOption: {
            xAxis: [],
            seriesData: []
          },
          educationOption: {
            xAxis: [],
            seriesData: []
          },
          sexOption: {
            legend: [],
            seriesData: []
          },
          constellationOtion: {
            indicatorData: [],
            seriesData: []
          },
          hobbiesOption: {
            indicatorData: [],
            seriesData: []
          },
          areaOption: [],
          chartEducation: null,
          chartConstellation: null,
          chartHobby: null,
          chartRegion: null,
          isSearching: false,
        }
      },
      created () {
        window.addEventListener('setItem', () => {
          this.newVal = sessionStorage.getItem('watchStorage');
          this.isSearching = this.newVal;
        });
      },
      mounted () {
        // this.initChartSex()
        // this.initChartAge()
        // this.initChartEducation()
        // this.initChartConstellation()
        // this.initChartHobby()
        // this.initChartRegion()
        this.getGender()
        this.getAge()
        this.getEducation()
        this.getConstellation()
        this.getHobbies()
        this.getArea()
        this.getmedia()
      },
      methods: {
        //获取媒体下拉
        getmedia() {
          this.$http({
            url: this.$http.adornUrl('/web/broadcast/0/listFrom'),
            method: 'GET'
          })
            .then(({ data }) => {
              console.log(data);
              this.region = data.listFrom;
            })
            .catch(err => {
              console.log('请求失败：');
            });
        },
        getNewDate(val) {
          // console.log(val)
          this.start = this.CurentTime(val[0])
          this.end = this.CurentTime(val[1])
          // console.log(start, end)
        },
        // 获取web/channel/people/{type}	类型（gender-性别；age-年龄；education-学历；constellation-星座；hobbies-兴趣爱好；area-区域图）
        getGender () {
          this.$http({
            url: this.$http.adornUrl('web/channel/people/'+ 'gender'),
            method: 'POST',
            data: {
              type: 'gender'
            }
          }).then(({data}) => {
            if (data.code == 0) {
              for (let i = 0; i < data.list.length; i++) {
                this.sexOption.legend.push(data.list[i].name)
              }
              this.sexOption.seriesData = data.list
              this.initChartSex(this.sexOption.xAxis, this.sexOption.seriesData)
            }
          }).catch(err => {
            console.log('请求失败：')
          })
        },
        getAge () {
          this.$http({
            url: this.$http.adornUrl('web/channel/people/'+ 'age'),
            method: 'POST',
            data: {
              type: 'age'
            }
          }).then(({data}) => {
            if (data.code == 0) {
              for (let i = 0; i < data.list.length; i++) {
                this.ageOption.xAxis.push(data.list[i].name)
                this.ageOption.seriesData.push(Math.round(data.list[i].value*100 * 1000) / 1000)
              }
              this.initChartAge(this.ageOption.xAxis, this.ageOption.seriesData)
            }
          }).catch(err => {
            console.log('请求失败：', err)
          })
        },
        getEducation () {
          this.$http({
            url: this.$http.adornUrl('web/channel/people/'+ 'education'),
            method: 'POST',
            data: {
              type: 'education'
            }
          }).then(({data}) => {
            if (data.code == 0) {
              for (let i = 0; i < data.list.length; i++) {
                this.educationOption.xAxis.push(data.list[i].name)
                this.educationOption.seriesData.push(Math.round(data.list[i].value*100 * 1000) / 1000)
              }
              // this.initChartEducation()
              this.initChartEducation(this.educationOption.xAxis, this.educationOption.seriesData)
            }
          }).catch(err => {
            console.log('请求失败：', err)
          })
        },
        getConstellation () {
          this.$http({
            url: this.$http.adornUrl('web/channel/people/'+ 'constellation'),
            method: 'POST',
            data: {
              type: 'constellation'
            }
          }).then(({data}) => {
            let item = {
              name: '',
              max: ''
            }
            if (data.code == 0) {
              for (let i = 0; i < data.list.length; i++) {
                item = {
                  name: data.list[i].name,
                  max: Math.round(data.list[i].max*100 * 1000) / 1000
                }
                this.constellationOtion.indicatorData.push(item)
                this.constellationOtion.seriesData.push(Math.round(data.list[i].value*100 * 1000) / 1000)
              }
              // this.initChartEducation()
              this.initChartConstellation(this.constellationOtion.indicatorData, this.constellationOtion.seriesData)
            }
          }).catch(err => {
            console.log('请求失败：', err)
          })
        },
        getHobbies () {
          this.$http({
            url: this.$http.adornUrl('web/channel/people/'+ 'hobbies'),
            method: 'POST',
            data: {
              type: 'hobbies'
            }
          }).then(({data}) => {
            let item = {
              name: '',
              max: ''
            }
            if (data.code == 0) {
              for (let i = 0; i < data.list.length; i++) {
                item = {
                  name: data.list[i].name,
                  max: data.list[i].max
                }
                this.hobbiesOption.indicatorData.push(item)
                this.hobbiesOption.seriesData.push(data.list[i].value)
              }
              this.initChartHobby(this.hobbiesOption.indicatorData, this.hobbiesOption.seriesData)
            }
          }).catch(err => {
            console.log('请求失败：', err)
          })
        },
        getArea () {
          this.$http({
            url: this.$http.adornUrl('web/channel/people/'+ 'area'),
            method: 'POST',
            data: {
              type: 'area'
            }
          }).then(({data}) => {
            if (data.code == 0) {
              this.areaOption = data.list
              // for (let i = 0; i < data.list.length; i++) {
              //   // this.areaOption.xAxis.push(data.list[i].name)
              //   // this.areaOption.seriesData.push(data.list[i].value)
              // }
              // this.initChartEducation()
              this.initChartRegion(this.areaOption)
            }
          }).catch(err => {
            console.log('请求失败：', err)
          })
        },
        //各类型分布
        initChartSex (legend, data) {
          var sexoption = {
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: ['#3fb1e3', '#6be6c1', '#a0a7eb', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
            legend: {
              'bottom': '2%',
              'right': '4%',
              'data': legend,
              icon: "rect",
              itemWidth: 14,
              itemHeight: 4,
            },
            // color:['#3295D9', '#BF4C5B'],
            series : [
              {
                name: '访问来源',
                type: 'pie',
                // radius : '55%',
                radius: ['50%', '70%'],
                center: ['50%', '60%'],
                data: data,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
          this.sexChart = echarts.init(document.getElementById('sexChart'))
          this.sexChart.setOption(sexoption )
          window.addEventListener('resize', () => {
            this.chartLine.resize()
          })
          },
        initChartAge (xAxis, data) {
          var ageOption = {
              color: ['#3fb1e3', '#6be6c1', '#a0a7eb', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function(data) {
                	var result = '';
                	result += data[0].name + '<br>';
                	for (var i = 0; i < data.length; i++) {
                		if (i == data.length - 1) {
                			result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + '%';
                		} else {
                			result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + '%<br>';
                		}
                	}
                	return result;
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : xAxis,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                  name: '人数',
                  type : 'value',
                  axisLabel:{
                    formatter:'{value}%'
                  }
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '20%',
                    data: data
                }
            ]
          }
          this.chartAge = echarts.init(document.getElementById('ageChart'))
          this.chartAge.setOption(ageOption)
          window.addEventListener('resize', () => {
            this.chartAge.resize()
          })
        },
        initChartEducation (xAxis, data) {
          var educationOption = {
              color: ['#3fb1e3', '#6be6c1', '#a0a7eb', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function(data) {
                	var result = '';
                	result += data[0].name + '<br>';
                	for (var i = 0; i < data.length; i++) {
                		if (i == data.length - 1) {
                			result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + '%';
                		} else {
                			result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + '%<br>';
                		}
                	}
                	return result;
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : xAxis,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                  name: '人数',
                  type : 'value',
                  axisLabel:{
                    formatter:'{value}%'
                  }
                }
            ],
            series : [
                {
                    name:'学历',
                    type:'bar',
                    barWidth: '20%',
                    data: data
                }
            ]
          }
          this.chartEducation = echarts.init(document.getElementById('educationChart'))
          this.chartEducation.setOption(educationOption)
          window.addEventListener('resize', () => {
            this.chartEducation.resize()
          })
        },
        // 各类型影片属性分布
        initChartConstellation (indicator, data) {
          var constellationOption = {
            tooltip: {
              formatter: function(data) {
              	var result = '';
              	result += '星座<br>';
              	for (var i = 0; i < data.value.length; i++) {
              		if (i == data.value.length - 1) {
              			result += data.value[i]+'%';
              		} else {
              			result += data.value[i]+'%<br>';
              		}
              	}
              	return result;
              }
            },
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#000',
                        // backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                  }
                },
                indicator: indicator
                // indicator: [
                //   { name: '金牛座', max: 6500},
                //   { name: '白羊座', max: 1600},
                //   { name: '天秤座', max: 3000},
                //   { name: '双鱼座', max: 3800},
                //   { name: '水瓶座', max: 5200},
                //   { name: '摩羯座', max: 2500},
                //   { name: '射手座', max: 6500},
                //   { name: '天蝎座', max: 1700},
                //   { name: '处女座', max: 3000},
                //   { name: '狮子座', max: 3800},
                //   { name: '巨蟹座', max: 5200},
                //   { name: '双子座', max: 2500}
                // ]
            },
            series: [{
                // name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                color: '#3fb1e3',
                // areaStyle: {normal: {}},
                data : [
                    {
                        // value : [430, 100, 2800, 3500, 5000, 190, 430, 100, 2800, 3500, 5000, 190],
                        value: data
                        // name : '预算分配（Allocated Budget）'
                    }
                ]
            }]
          };
          this.chartConstellation = echarts.init(document.getElementById('constellationChart'))
          this.chartConstellation.setOption(constellationOption)
          window.addEventListener('resize', () => {
            this.chartConstellation.resize()
          })
        },
        initChartHobby (indicator, data) {
          var hobbyOption = {
            tooltip: {},
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#333',
                        borderRadius: 3,
                        padding: [3, 5]
                  }
                },
                indicator: indicator
            },
            series: [{
                name: '兴趣爱好',
                type: 'radar',
                color: '#6be6c1',
                data : [
                    {
                        value: data,
                        name : '兴趣爱好'
                    }
                ]
            }]
          };
          this.chartHobby = echarts.init(document.getElementById('hobbyChart'))
          this.chartHobby.setOption(hobbyOption)
          window.addEventListener('resize', () => {
            this.chartHobby.resize()
          })
        },
        initChartRegion (data) {
          let option
          let myChartMap = echarts.init(document.getElementById('regionChart'))
          myChartMap.hideLoading()
          echarts.registerMap('CN', hkJSON)
          // mychartMap.showLoading()
          myChartMap.setOption(option = {
          tooltip: {
              trigger: 'item',
              formatter: '{b}<br/>{c} (p / km2)'
          },
          toolbox: {
              show: true,
              orient: 'vertical',
              left: 'right',
              top: 'center',
              feature: {
                  dataView: {readOnly: false},
                  restore: {},
                  saveAsImage: {}
              }
          },
          visualMap: {
              min: 0,
              max: 500000,
              // text:['High','Low'],
              realtime: false,
              calculable: true,
              inRange: {
                  color: ['#3fb1e3', '#6be6c1', '#a0a7eb']
              }
          },
          series: [
              {
                  type: 'map',
                  mapType: 'CN', // 自定义扩展图表类型
                  itemStyle:{
                      normal:{label:{show:true}},
                      emphasis:{label:{show:true}}
                  },
                  data: data
            //       data: [
            //     { name: '北京', selected: false, value: 11111 },
            //     { name: '天津', selected: false, value: 21323 },
            //     { name: '上海', selected: false, value: 313131 },
            //     { name: '重庆', selected: false, value: 41111 },
            //     { name: '河北', selected: false, value: 51313 },
            //     { name: '河南', selected: false, value: 61313 },
            //     { name: '云南', selected: false, value: 71313 },
            //     { name: '辽宁', selected: false, value: 81331 },
            //     { name: '黑龙江', selected: false, value: 13339 },
            //     { name: '湖南', selected: false, value: 105555 },
            //     { name: '安徽', selected: false, value: 11555 },
            //     { name: '山东', selected: false, value: 12333 },
            //     { name: '新疆', selected: false, value: 13333 },
            //     { name: '江苏', selected: false, value: 333314 },
            //     { name: '浙江', selected: false, value: 13335 },
            //     { name: '江西', selected: false, value: 33316 },
            //     { name: '湖北', selected: false, value: 13337 },
            //     { name: '广西', selected: false, value: 1338 },
            //     { name: '甘肃', selected: false, value: 33319 },
            //     { name: '山西', selected: false, value: 32333 },
            //     { name: '内蒙古', selected: false, value: 3353521 },
            //     { name: '陕西', selected: false, value: 22 },
            //     { name: '吉林', selected: false, value: 23 },
            //     { name: '福建', selected: false, value: 24 },
            //     { name: '贵州', selected: false, value: 25 },
            //     { name: '广东', selected: false, value: 26 },
            //     { name: '青海', selected: false, value: 27 },
            //     { name: '西藏', selected: false, value: 28 },
            //     { name: '四川', selected: false, value: 29 },
            //     { name: '宁夏', selected: false, value: 30 },
            //     { name: '海南', selected: false, value: 31 },
            //     { name: '台湾', selected: false, value: 32 },
            //     { name: '香港', selected: false, value: 33 },
            //     { name: '澳门', selected: false, value: 34 }
            // ], //各省地图颜色数据依赖value
              }
          ]
      })
          // echarts.
        }

      }
    }
</script>

<style scoped>
  @import '../boxOffice/css/box-office.css';
  @import '../boxOffice/css/shape.css';
  @import '../boxOffice/css/legend.css';
  @import '../boxOffice/css/color.css';
  .types{
    display: inline-block;
    width: 72px;
    height: 28px;
    margin-right: 10px;
    background: #3295D9;
    border-radius: 14px;
    line-height: 28px;
    color: #ffffff;
    font-size: 14px;
    text-align: center;
  }
  .types i{
    margin-left: 6px;
  }
.cover {
	position: fixed;
	left: 0;
	top: 148px;
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
	top: 148px;
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
