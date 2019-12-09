<template>
  <div style="position: relative">
    <!-- 图表 -->
    <el-row class="row-m20-p20" style="background: #ffffff;padding: 0;margin: 20px;">
      <el-col :span="24" style="padding: 0">
        <div style="padding: 16px 32px;overflow:hidden;border-bottom: 1px solid #DEDEDE">
          <div>
            <h2 style="font-size: 24px;color: #333333;font-weight: 400;margin: 0;float: left;">大盘日票房总趋势 <span style="font-size: 18px;font-weight: 400;margin-left: 32px;">{{CurentTime(date[0])+' -- '+CurentTime(date[1])}}</span></h2>
          </div>
          <div style="float: right;">
            <el-button :type="boxOfficecolor" round @click="boxOffice()">票房</el-button>
            <el-button :type="palyscolor" round @click="palys()">场次</el-button>
            <el-button :type="personscolor" round @click="persons()">人次</el-button>
          </div>
        </div>
        <div id="grail" style="height: 400px; width: 95%;" v-loading="charloading"></div>
      </el-col>
    </el-row>
    <div class="cover"  v-if="isSearching=='true'"/>
    <div class="search" v-if="isSearching=='true'">
      <div class="search-box">
        <span>日期:</span>
        <el-date-picker
          size="small"
          width='140'
          v-model="date"
          type="daterange"
          format="yyyy-MM-dd"
          @change="changeDate()"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>

        <span>影片制式:</span>
				<el-select v-model="standard" placeholder="请选择" style="width: 120px;" size="small">
					<el-option v-for="item in standardOption" :key="item.value" :label="item.label" :value="item.label"></el-option>
				</el-select>
        <span>影片类型:</span>
				<el-select v-model="typeName" @change='choosetype' placeholder="请选择" size="small">
					<el-option
					v-for="item in typeOptions"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
        <span style="margin-left:16px">城市： </span>
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
  export default {
    name: 'BoxOfficeMarket',
    components: {
    },
    data () {
      return {
        charloading: true,
        palyscolor:'',
        personscolor:'',
        boxOfficecolor:'primary',
        chartname:'',
        date:[new Date('2019-03-05'),new Date('2019-04-05')],
        isSearching:false,
        chartLine: null,
        datelist:[],
        palysReta:[],
        boxOfficeReta:[],
        personsReta:[],
        cityOption: [],
        cityvalue: '', // 城市
        cityId: '', // 	城市ID，传入需要封装到 params 中
        standardOption: [],
        standard: '', // 影片制式
        typeName: '',
        typeOptions: [], // 主类型列表
        movietype: '', // 传参-类型

      }
    },
    watch: {
      '$route' () {
        this.initMarketLine()
      }
    },
    created () {
      window.addEventListener('setItem', () => {
        this.newVal = sessionStorage.getItem('watchStorage')
        this.isSearching = this.newVal
      })
    },
    mounted () {
      this.initMarketLine()
      this.getDate()
      this.getCityList()
      this.getstandard()
      this.getmoviesType()
    },
    methods: {
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
      //获取电影制式
      getstandard() {
        this.$http({
          url: this.$http.adornUrl('web/movietrade/listMovieStandard'),
          method: 'GET'
        })
          .then(({ data }) => {
            this.standardOption = data.list;
          })
          .catch(err => {
            console.log('请求失败：');
          });
      },
      // 选择电影类型，并保存请求列表数据的参数
      choosetype (val) {
        this.movietype = val
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
            _this.cityOption = data.city
          } else {
            _this.cityOption = []
            alert('暂无数据')
          }
        })
      },
      // 选择城市
      changeCity (val) {
        console.log(val)
        this.cityId = val.id
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
      //获取相对当前日期隔num天的日期如隔后10天日期：getDay(10, '-')
      getDay(num, str) {
        var today = new Date();
        var nowTime = today.getTime();
        var ms = 24*3600*1000*num;
        today.setTime(parseInt(nowTime + ms));
        var oYear = today.getFullYear();
        var oMoth = (today.getMonth() + 1).toString();
        if (oMoth.length <= 1) oMoth = '0' + oMoth;
        var oDay = today.getDate().toString();
        if (oDay.length <= 1) oDay = '0' + oDay;
        return oYear + str + oMoth + str + oDay;
      },
      //生成图表
      initMarketLine (data) {
        console.log(data, this.datelist, this.chartname)
        var option = {
          'tooltip': {
            'trigger': 'axis',
            'formatter': '{c0}w'
          },
          'grid': {
            'left': '3%',
            'right': '4%',
            'bottom': '4%',
            'containLabel': true
          },
          'toolbox': {
            'feature': {
            }
          },
					color:['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
          'xAxis': {
            'type': 'category',
            'boundaryGap': false,
            'data': this.datelist
          },
          'yAxis': {
            'name': this.chartname,
            'type': 'value',
            axisLabel: {
              show: true,
              interval: 'auto'
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
              'data': data
            }
          ]
        }
        this.chartLine = echarts.init(document.getElementById('grail'))
        this.chartLine.setOption(option,true)
        window.addEventListener('resize', () => {
          this.chartLine.resize()
        })
        setTimeout(() => {
          this.charloading = false
        }, 500);
      },
      //获取图表数据
      getDate(){
        this.$http({
          url: this.$http.adornUrl('/web/boxoffice/broadermarket/'+this.productid+'/'+this.CurentTime(this.date[0])+'/'+this.CurentTime(this.date[1])),
          method: 'POST',
        }).then(({ data }) => {
          console.log(data)
          for(var i=0;i<data.list.length;i++){
            this.datelist.push(this.CurentTime(new Date(data.list[i].time)))
            this.boxOfficeReta.push(data.list[i].box_office/10000)
            this.palysReta.push(data.list[i].playtimes/10000)
            this.personsReta.push(data.list[i].person_time/10000)
          }
          this.chartname='票房(万)'
          this.initMarketLine(this.boxOfficeReta)
        }).catch(err => {
          // console.log('请求失败：');
        });
      },
      //点击场次
      palys(){
        this.chartname='场次(万)'
        this.initMarketLine(this.palysReta)
        this.palyscolor='primary'
        this.personscolor=''
        this.boxOfficecolor=''
      },
      //点击票房
      boxOffice(){
        this.chartname='票房(万)'
        this.initMarketLine(this.boxOfficeReta)
        this.palyscolor=''
        this.personscolor=''
        this.boxOfficecolor='primary'
      },
      //点击人次
      persons(){
        console.log(this.personsReta)
        this.chartname='人次(万)'
        this.initMarketLine(this.personsReta)
        this.palyscolor=''
        this.personscolor='primary'
        this.boxOfficecolor=''
      },
      //修改日期
      changeDate(){
        this.datelist=[]
        this.boxOfficeReta=[]
        this.palysReta=[]
        this.personsReta=[]
        this.getDate()
      },
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
