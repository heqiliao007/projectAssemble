<template>
  <div style="position: relative">
    <!-- 图表 -->
    <el-row class="row-m20-p20" style="background: #ffffff;padding: 0;margin: 20px;">
      <el-col :span="24" style="padding: 0">
        <div>
          <h2 style="font-size: 24px;color: #333333;font-weight: 400;line-height: 64px;margin: 0 0 0 31px;">城市场次占比 <span style="font-size: 18px;font-weight: 400;margin-left: 32px;">{{time}}</span></h2>
        </div>
        <div style="padding: 16px 32px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
          <div style="float: left;">
						<el-button :type="palyscolor" round @click="palys()">场次占比</el-button>
						<el-button :type="personscolor" round @click="persons()">人次占比</el-button>
						<el-button :type="boxOfficecolor" round @click="boxOffice()">票房占比</el-button>
          </div>
          <div style="float: right;">
            <el-button type="primary" round>全天</el-button>
            <el-button round>上午场</el-button>
            <el-button round>下午场</el-button>
            <el-button round>黄金场</el-button>
          </div>
        </div>
        <div id="cityBox" style="height: 400px; width: 95%;" v-loading="charloading"></div>
      </el-col>
    </el-row>
    <!--表格-->
    <el-row class="row-m20-p20">
      <el-col :span="24">
        <el-card>
          <div slot="header" style="margin:0 14px;" class="clearfix">
            <span style="float: left;font-size:23px">城市票房</span>
            <span style="font-size: 18px;font-weight: 400;margin-left: 32px;">{{time}}</span>
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
              :header-cell-style = 'headercellStyle'
            >
              <el-table-column :render-header="renderHeader" fixed width="50">
								<template slot-scope="scope">
									<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
									<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
              <el-table-column type="index" label="排名" width="100px">
                <template slot-scope="scope">
                  <span>{{scope.$index + 1 + (current-1) *10}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="value id" label="城市">
								<template slot-scope="scope">
									<a class="link" @click="alink(scope.row.id)" style="color:#3295D9;text-decoration:none;cursor: pointer;">{{ scope.row.value }}</a>
								</template>
							</el-table-column>
              <el-table-column prop="box_office" label="票房（万）">
                <template slot-scope="scope">
                  <span>{{scope.row.box_office/10000}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="box_office" label="服务费（万）">
                <template slot-scope="scope">
                  <span>{{scope.row.box_office/10000}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="boxOfficeReta" label="票房占比">
                <template slot-scope="scope">
                  <span>{{Math.round((scope.row.boxOfficeReta*100)*1000)/1000+'%'}}</span>
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
                  <span>{{Math.round((scope.row.personsReta*100)*1000)/1000+'%'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="playtimes" label="影院数"></el-table-column>
              <el-table-column prop="screen_numbers" label="银幕数"></el-table-column>
            </el-table>
            <el-pagination
              style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
              background
              layout="prev, pager, next"
              :total="total"
              @current-change="handleCurrentChange"
              :current-page.sync="current"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <comparison v-if="contrastbox"  @down="onDown()"></comparison>
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
        <el-button type="primary" size="small">查询</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import comparison from '../contrast/comparison'
  export default {
    name: 'BoxOfficeCity',
    components: {
      comparison
    },
    data () {
      return {
        headercellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
        personscolor: '',
        palyscolor: 'primary',
        boxOfficecolor: '',
        charloading: true,
        loading:true,
        date:new Date('2019-04-02'),
        isSearching:false,
        total: 0,
        time:'',
        productid:'',
        current:1,
        contrastbox:false,
        chartLine: null,
        tableData: [],
				names:[],
				palysReta:[],
				boxOfficeReta:[],
        personsReta:[],
        chooseregionText: '', // 已选择地区的页面显示文字
        activeName: 'first',
        urbanHierarchy: [], // 地域
        urbanHierarchyCode: '', // 城市等级编码，传入需要封装到 params 中
        regionCode: '', // 区域编码，传入需要封装到 params 中
        region: [], // 地区
        province: [], // 省份
        provinceCode: '', // 	省份编码，传入需要封装到 params 中
        noshow: false,
        cityOption: [],
        cityvalue: '', // 城市
        cityId: '', // 	城市ID，传入需要封装到 params 中
      }
    },
    watch: {
      '$route' () {
        this.initCityLine()
      }
    },
    created () {
      window.addEventListener('setItem', () => {
        this.newVal = sessionStorage.getItem('watchStorage')
        this.isSearching = this.newVal
      })
    },
    mounted () {
      this.time = sessionStorage.getItem('_date_str')
      if (this.time == null) {
        this.time = '2019-04-02'
      }
      this.productid = this.$cookie.get('productid')
      // this.initCityLine()
      this.getDate()
      this.getCityList() // 获取城市列表
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
      handleClick(tab, event) {
      },
      // 选择城市
      changeCity (val) {
        console.log(val)
        this.cityId = val.id
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
      //生成图表
      initCityLine (datas,names) {
				this.first=false
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
            'data': names
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
              'stack': '总量',
              'symbol': 'none',
              'itemStyle' : {
                'normal' : {
                  'color':'#3295D9'
                }
              },
              'data': datas
            }
          ]
        }
        this.chartLine = echarts.init(document.getElementById('cityBox'))
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
      getDate(){
        this.$http({
          url: this.$http.adornUrl('/web/boxoffice/citycialboxoffice/'+this.productid+'/'+this.CurentTime(this.date)+ '?current=' + this.current),
          method: 'POST',
          data: this.$http.adornData({
            'productid': this.productid,
            'time': this.time
          })
        }).then(({ data }) => {
          this.loading=false
          this.total = data.page.total-0
          this.tableData=data.page.records
					for(var i=0;i<data.page.records.length;i++){
						this.names.push(data.page.records[i].value)
						this.palysReta.push(((data.page.records[i].palysReta*100)*1000)/1000)
						this.boxOfficeReta.push(((data.page.records[i].boxOfficeReta*100)*1000)/1000)
						this.personsReta.push(((data.page.records[i].personsReta*100)*1000)/1000)
					}
					this.initCityLine(this.palysReta,this.names)
        }).catch(err => {
          // console.log('请求失败：');
        });
      },
      //分页
      handleCurrentChange(val) {
        this.loading=true
        this.current = val
        this.getDate()
      },
			//点击场次占比
			palys(){
			  this.initCityLine(this.palysReta,this.names)
			  this.palyscolor='primary'
			  this.personscolor=''
			  this.boxOfficecolor=''
			},
			//点击票房占比
			boxOffice(){
			  this.initCityLine(this.boxOfficeReta,this.names)
			  this.palyscolor=''
			  this.personscolor=''
			  this.boxOfficecolor='primary'
			},
			//点击人次占比
			persons(){
			  this.initCityLine(this.personsReta,this.names)
			  this.palyscolor=''
			  this.personscolor='primary'
			  this.boxOfficecolor=''
			},
      //修改日期
      changeDate(){
        this.loading=true
        this.current = 1
        this.getDate()
      },
			//跳转详情页
			alink(id){
				this.$router.push({
					path: '/cityDetails',
					query: {
						id: id,
						lastmenu: '城市'
					}
				});
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
