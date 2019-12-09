<template>
  <div style="position: relative">
    <el-row class="row-m20-p20">
      <el-col :span="24">
        <el-button :type=" chooseChart == 1 ? primary : ''" size="small" @click="chooseChartChange('1')">票房</el-button>
        <el-button :type=" chooseChart == 2 ? primary : ''" size="small" @click="chooseChartChange('2')">场次</el-button>
        <el-button :type=" chooseChart == 3 ? primary : ''" size="small" @click="chooseChartChange('3')">人次</el-button>
        <el-button :type=" chooseChart == 4 ? primary : ''" size="small" @click="chooseChartChange('4')">上映数量</el-button>
      </el-col>
    </el-row>
    <el-row class="row-m20-p20">
      <el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
        <div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
          <p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">各类型分布 <span style="font-size: 16px;color: #666666;margin-left: 23px;">{{year.getFullYear()}}</span></p>
          <i class="el-icon-hysj-xiazai" style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;"></i>
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../img/icon_xianxing.png" alt="">
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../img/icon_zhuzhuang.png" alt="">
        </div>
        <div id="each" style="height: 430px; width: 97%;" v-loading='eachLoading'></div>
      </el-col>
      <el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-left: 10px solid #F5F5F5;">
        <div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
          <p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">各类型年趋势
            <span style="font-size: 16px;color: #666666;margin-left: 23px;">{{year.getFullYear()}}</span>
            <!-- <span v-for="list in lists" class="types" :key="list">{{list}}<i class="el-icon-close"></i></span> -->
            <!-- <img src="../img/icon_tianjia.png" alt=""> -->
          </p>
          <i class="el-icon-hysj-xiazai" style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;"></i>
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../img/icon_xianxing.png" alt="">
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../img/icon_zhuzhuang.png" alt="">
        </div>
        <div id="year" style="height: 430px; width: 97%;" v-loading='yearLoading'></div>
      </el-col>
    </el-row>
    <el-row class="row-m20-p20">
      <el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
        <div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
          <p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">各类型影片属性分布 <span style="font-size: 16px;color: #666666;margin-left: 23px;">{{year.getFullYear()}}</span></p>
          <i class="el-icon-hysj-xiazai" style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;"></i>
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../img/icon_xianxing.png" alt="">
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../img/icon_zhuzhuang.png" alt="">
        </div>
        <div id="moves" style="height: 430px; width: 97%;" v-loading='movieLoading'></div>
      </el-col>
      <el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-left: 10px solid #F5F5F5;">
        <div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
          <p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">各类型影片制式分布 <span style="font-size: 16px;color: #666666;margin-left: 23px;">{{year.getFullYear()}}</span></p>
          <i class="el-icon-hysj-xiazai" style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;"></i>
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../img/icon_xianxing.png" alt="">
          <img style="float: right;margin-top: 32px;height: 23px;margin-right: 32px;" src="../img/icon_zhuzhuang.png" alt="">
        </div>
        <div id="system" style="height: 430px; width: 97%;" v-loading='systemLoading'></div>
      </el-col>
    </el-row>
    <div class="cover"  v-if="isSearching=='true'"/>
    <div class="search" v-if="isSearching=='true'">
      <div class="search-box">
        <span>日期:</span>
        <el-date-picker
          v-model="year"
          align="right"
          type="year"
          placeholder="选择年">
        </el-date-picker>
        <span>影片制式:</span>
				<el-select v-model="standard" placeholder="请选择" style="width: 120px;" size="small">
					<el-option v-for="item in standardOption" :key="item.value" :label="item.label" :value="item.label"></el-option>
				</el-select>
				<el-button type="primary" @click="search()">查询</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
    export default {
      name: 'boxOfficeTrend',
      components: {
      },
      data () {
        return {
					year:new Date(),
          eachLoading: true,
          yearLoading: true,
          movieLoading: true,
          systemLoading: true,
          chooseChart: '1',
          primary: 'primary',
          isSearching:false,
          lists:['爱情','科幻','动作'],
          chartLine: null,
          chartBar: null,
          chartMoves: null,
          chartSystem: null,
          productid: '',
          standard:'',
          standardOption: [], // 影片制式
          type1: { // 各类型分布
            xAxis: [], // x轴显示
            boxoffice: { // 票房数据
              data: [], // 票房
              rate: [], // 票房占比
              compare: [] // 票房同比
            },
            playtimes: { // 场次数据
              data: [], // 场次
              rate: [], // 场次占比
              compare: [] // 场次同比
            },
            persontime: {//人次
              data: [], // 人次数据
              rate: [], // 人次占比
              compare: [] // 人次同比
            },
            movies: { // 上映数量
              data: [], // 人次数据
              rate: [], // 人次占比
              compare: [] // 人次同比
            }
          },
					type2:{ //各类型年趋势
						xAxis: [], // x轴显示
						types: [], //类型列表
						boxoffice: [] ,// 票房数据
						playtimes: [] ,// 场次数据
						persontime: [] ,//人次
						movies: []  // 上映数量
					},
					type3:{ //各类型影片属性分布
						xAxis: [], // x轴显示
						types: [], //类型列表
						boxoffice: [] ,// 票房数据
						playtimes: [] ,// 场次数据
						persontime: [] ,//人次
						movies: []  // 上映数量
					},
					type4:{ //各类型影片制式分布
						xAxis: [], // x轴显示
						types: [], //类型列表
						boxoffice: [] ,// 票房数据
						playtimes: [] ,// 场次数据
						persontime: [] ,//人次
						movies: []  // 上映数量
					}
        }
      },
      created () {
        window.addEventListener('setItem', () => {
          this.newVal = sessionStorage.getItem('watchStorage')
          this.isSearching = this.newVal
        })
      },
      mounted () {
        this.getcookie()
        this.getData()
        this.getyearData()
        this.getfilmData()
        this.getfilmCreateData()
        this.getstandard()
        // this.getfilmCreateData()
        // this.initChartYeay()
        // this.initChartMoves()
        // this.initChartSystem()
      },
      methods: {
        chooseChartChange(val) {
          this.chooseChart = val
          if (this. chooseChart == 1) {
            this.initChartLine(this.type1.boxoffice)
						this.initChartYeay(this.type2.boxoffice)
						this.initChartMoves(this.type3.boxoffice)
						this.initChartSystem(this.type3.boxoffice)
          }
          if (this.chooseChart == 2) {
            this.initChartLine(this.type1.playtimes)
						this.initChartYeay(this.type2.playtimes)
						this.initChartMoves(this.type3.playtimes)
						this.initChartSystem(this.type3.playtimes)
          }
          if (this.chooseChart == 3) {
            this.initChartLine(this.type1.persontime)
						this.initChartYeay(this.type2.persontime)
						this.initChartMoves(this.type3.persontime)
						this.initChartSystem(this.type3.persontime)
          }
          if (this.chooseChart == 4) {
            this.initChartLine(this.type1.movies)
						this.initChartYeay(this.type2.movies)
						this.initChartMoves(this.type3.movies)
						this.initChartSystem(this.type3.movies)
          }
        },
        getcookie(){
          this.productid=this.$cookie.get('productid')
          if(this.productid==null){
            this.productid='29'
          }
        },
        //获取电影制式
        getstandard() {
          this.$http({
            url: this.$http.adornUrl('web/cinemadetailpage/getDuringAnalysis?cinemaId=2325'),
            method: 'POST'
          })
            .then(({ data }) => {
              console.log('影片制式', data)
              // this.standardOption = data.list;
            })
            .catch(err => {
              console.log('请求失败：');
            });
        },
        getData () {
					if(this.year==''||this.year==undefined){
						var years=''
					}else{
						var years=this.year.getFullYear()
					}
          var params = new URLSearchParams();
            params.append('queryType', 1);
            params.append('year', years);
            params.append('types', '');
            params.append('years', '');
          this.$http({
            url: this.$http.adornUrl('/web/movinvest/calculate/' + this.productid),
            method: 'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            data: params
          }).then(({data}) => {
            console.log(data, '1')
            let boxoffice = []
            let xAxis = []
            let boxofficeRate = []
            let boxofficeCompare = []

            let playtimes = []
            let playtimesRate = []
            let playtimesCompare = []

            let persontime = []
            let persontimeRate = []
            let persontimeCompare = []

            let movies = []
            let moviesCompare = []
            let moviesRate = []
            for (let i = 0; i < data.list.length; i++) {
              xAxis.push(data.list[i].type)
              boxoffice.push(parseInt(data.list[i].boxoffice/10000))
              boxofficeRate.push(Math.floor(data.list[i].boxofficeRate * 100) / 100)
              boxofficeCompare.push(Math.floor(data.list[i].boxofficeCompare * 100) / 100)
              playtimes.push(parseInt(data.list[i].playtimes/10000))
              playtimesRate.push(Math.floor(data.list[i].playtimesRate * 100) / 100)
              playtimesCompare.push(Math.floor(data.list[i].playtimesCompare * 100) / 100)

              persontime.push(parseInt(data.list[i].persontime/10000))
              persontimeRate.push(Math.floor(data.list[i].persontimeRate * 100) / 100)
              persontimeCompare.push(Math.floor(data.list[i].persontimeCompare * 100) / 100)

              movies.push(parseInt(data.list[i].movies/10000))
              moviesCompare.push(Math.floor(data.list[i].moviesCompare * 100) / 100)
              moviesRate.push(Math.floor(data.list[i].moviesRate * 100) / 100)
            }
            // console.log(xAxis)
            this.type1.xAxis = xAxis
            this.type1 = {
              xAxis: xAxis,
              boxoffice: {
                data: boxoffice,
                compare: boxofficeCompare,
                rate: boxofficeRate
              },
              playtimes: {
                data: playtimes,
                compare: playtimesCompare,
                rate: playtimesRate
              },
              persontime: {
                data: persontime,
                compare: persontimeCompare,
                rate: persontimeRate
              },
              movies: {
                data: movies,
                compare: moviesCompare,
                rate: moviesRate
              }
            }
            this.initChartLine(this.type1.boxoffice)
          })
        },
        // 数组去重的方法
        uniq(array){
            var temp = []; //一个新的临时数组
            for(var i = 0; i < array.length; i++){
                if(temp.indexOf(array[i]) == -1){
                    temp.push(array[i]);
                }
            }
            return temp;
        },
        // 年趋势
        getyearData () {
					let _this = this
					console.log(_this.year=='')
					if(_this.year==''||_this.year==undefined){
						var years=''
					}else{
						var years=_this.year.getFullYear()
					}
          var params = new URLSearchParams();
            params.append('queryType', 2);
            params.append('year', years);
            params.append('types', '');
            params.append('years', '');
          _this.$http({
            url: _this.$http.adornUrl('/web/movinvest/calculate/' + _this.productid),
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data: params
          }).then(({data}) => {
            console.log(data, '2')
						var names=[]
						for(let i=0;i<data.list.length;i++){
							_this.type2.xAxis.push(data.list[i].year)
							for(let j=0;j<data.list[i].regroupData.length;j++){
								names.push(data.list[i].regroupData[j].type)
								if(i==data.list.length-1&&j==data.list[i].regroupData.length-1){
									_this.type2.types=_this.uniq(names)
								}
							}
						}
						for(let i=0;i<_this.type2.types.length;i++){
							_this.type2.boxoffice.push({
                'name': _this.type2.types[i],
                'type': 'line',
                symbol: 'circle',
                symbolSize: 10,
                'data': []
              })
							_this.type2.playtimes.push({
							  'name': _this.type2.types[i],
							  'type': 'line',
							  symbol: 'circle',
							  symbolSize: 10,
							  'data': []
							})
							_this.type2.persontime.push({
							  'name': _this.type2.types[i],
							  'type': 'line',
							  symbol: 'circle',
							  symbolSize: 10,
							  'data': []
							})
							_this.type2.movies.push({
							  'name': _this.type2.types[i],
							  'type': 'line',
							  symbol: 'circle',
							  symbolSize: 10,
							  'data': []
							})
						}
						for(let i=0;i<_this.type2.types.length;i++){
							for(let j=0;j<data.list.length;j++){
								for(let m=0;m<data.list[j].regroupData.length;m++){
									if(_this.type2.types[i]==data.list[j].regroupData[m].type){
										_this.type2.movies[i].data.push(parseInt(data.list[j].regroupData[m].movies/10000))
										_this.type2.persontime[i].data.push(parseInt(data.list[j].regroupData[m].persontime/10000))
										_this.type2.playtimes[i].data.push(parseInt(data.list[j].regroupData[m].playtimes/10000))
										_this.type2.boxoffice[i].data.push(parseInt(data.list[j].regroupData[m].boxoffice/10000))
										break;
									}else if(m==data.list[j].regroupData.length-1){
										_this.type2.movies[i].data.push('0')
										_this.type2.persontime[i].data.push('0')
										_this.type2.playtimes[i].data.push('0')
										_this.type2.boxoffice[i].data.push('0')
									}
								}
							}
						}
						_this.yearLoading=false
						_this.initChartYeay (_this.type2.boxoffice)
          })
        },
        // 影片属性
        getfilmData () {
          let _this = this
					if(_this.year==''||_this.year==undefined){
						var years=''
					}else{
						var years=_this.year.getFullYear()
					}
          var params = new URLSearchParams();
            params.append('queryType', 3);
            params.append('year', years);
            params.append('types', '');
            params.append('years', '');
          this.$http({
            url: this.$http.adornUrl('/web/movinvest/calculate/' + _this.productid),
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data: params
          }).then(({data}) => {
            console.log(data, '3')
						var names=[]
						for(let i=0;i<data.list.length;i++){
							_this.type3.xAxis.push(data.list[i].type)
							for(let j=0;j<data.list[i].regroupData.length;j++){
								names.push(data.list[i].regroupData[j].filmkind)
								if(i==data.list.length-1&&j==data.list[i].regroupData.length-1){
									_this.type3.types=_this.uniq(names)
								}
							}
						}
						for(let i=0;i<_this.type3.types.length;i++){
							_this.type3.boxoffice.push({
						    'name': _this.type3.types[i],
						    'type': 'line',
						    symbol: 'none',
						    'data': []
						  })
							_this.type3.playtimes.push({
							  'name': _this.type3.types[i],
							  'type': 'line',
							  symbol: 'none',
							  'data': []
							})
							_this.type3.persontime.push({
							  'name': _this.type3.types[i],
							  'type': 'line',
							  symbol: 'none',
							  'data': []
							})
							_this.type3.movies.push({
							  'name': _this.type3.types[i],
							  'type': 'line',
							  symbol: 'none',
							  'data': []
							})
						}
						for(let i=0;i<_this.type3.types.length;i++){
							for(let j=0;j<data.list.length;j++){
								for(let m=0;m<data.list[j].regroupData.length;m++){
									if(_this.type3.types[i]==data.list[j].regroupData[m].filmkind){
										_this.type3.movies[i].data.push(parseInt(data.list[j].regroupData[m].movies/10000))
										_this.type3.persontime[i].data.push(parseInt(data.list[j].regroupData[m].persontime/10000))
										_this.type3.playtimes[i].data.push(parseInt(data.list[j].regroupData[m].playtimes/10000))
										_this.type3.boxoffice[i].data.push(parseInt(data.list[j].regroupData[m].boxoffice/10000))
										break;
									}else if(m==data.list[j].regroupData.length-1){
										_this.type3.movies[i].data.push('0')
										_this.type3.persontime[i].data.push('0')
										_this.type3.playtimes[i].data.push('0')
										_this.type3.boxoffice[i].data.push('0')
									}
								}
							}
						}
						console.log(_this.type3)
						_this.movieLoading=false
						_this.initChartMoves(_this.type3.boxoffice)
          })
        },
        // 影片制式
        getfilmCreateData () {
          let _this = this
					if(_this.year==''||_this.year==undefined){
						var years=''
					}else{
						var years=_this.year.getFullYear()
					}
          var params = new URLSearchParams();
            params.append('queryType', 4);
            params.append('year', years);
            params.append('types', '');
            params.append('years', '');
          this.$http({
            url: this.$http.adornUrl('/web/movinvest/calculate/' + _this.productid),
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data: params
          }).then(({data}) => {
						console.log(data,'4')
          	var names=[]
          	for(let i=0;i<data.list.length;i++){
          		_this.type4.xAxis.push(data.list[i].type)
          		for(let j=0;j<data.list[i].regroupData.length;j++){
          			names.push(data.list[i].regroupData[j].standard)
          			if(i==data.list.length-1&&j==data.list[i].regroupData.length-1){
          				_this.type4.types=_this.uniq(names)
          			}
          		}
          	}
          	for(let i=0;i<_this.type4.types.length;i++){
          		_this.type4.boxoffice.push({
          	    'name': _this.type4.types[i],
          	    'type': 'line',
          	    symbol: 'none',
          	    'data': []
          	  })
          		_this.type4.playtimes.push({
          		  'name': _this.type4.types[i],
          		  'type': 'line',
          		  symbol: 'none',
          		  'data': []
          		})
          		_this.type4.persontime.push({
          		  'name': _this.type4.types[i],
          		  'type': 'line',
          		  symbol: 'none',
          		  'data': []
          		})
          		_this.type4.movies.push({
          		  'name': _this.type4.types[i],
          		  'type': 'line',
          		  symbol: 'none',
          		  'data': []
          		})
          	}
          	for(let i=0;i<_this.type4.types.length;i++){
          		for(let j=0;j<data.list.length;j++){
          			for(let m=0;m<data.list[j].regroupData.length;m++){
          				if(_this.type4.types[i]==data.list[j].regroupData[m].standard){
          					_this.type4.movies[i].data.push(parseInt(data.list[j].regroupData[m].movies/10000))
          					_this.type4.persontime[i].data.push(parseInt(data.list[j].regroupData[m].persontime/10000))
          					_this.type4.playtimes[i].data.push(parseInt(data.list[j].regroupData[m].playtimes/10000))
          					_this.type4.boxoffice[i].data.push(parseInt(data.list[j].regroupData[m].boxoffice/10000))
          					break;
          				}else if(m==data.list[j].regroupData.length-1){
          					_this.type4.movies[i].data.push('0')
          					_this.type4.persontime[i].data.push('0')
          					_this.type4.playtimes[i].data.push('0')
          					_this.type4.boxoffice[i].data.push('0')
          				}
          			}
          		}
          	}
          	console.log(_this.type4)
						_this.systemLoading=false
						_this.initChartSystem(_this.type4.boxoffice)
          })
        },
        //各类型分布
        initChartLine (data) {
					console.log(data)
          var option1 = {
						color:['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
            'tooltip': {
              'trigger': 'axis',
							formatter: function(data) {
								console.log(data)
								var result = '';
								result += data[0].name + '<br>';
								for (var i = 0; i < data.length; i++) {
									if(i==0){
										result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + 'W<br>';
									}else if (i == data.length - 1) {
										result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value+'%';
									} else {
										result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + '%<br>';
									}
								}
								return result;
							}
            },
            'legend': {
              'bottom': '2%',
              'right': '4%',
              'data': ['票房', '同比', '占比'],
              icon: "rect",
              itemWidth: 14,
              itemHeight: 4,
            },
            'grid': {
              'left': '3%',
              'right': '4%',
              'bottom': '10%',
              'containLabel': true
            },
            'toolbox': {
              'feature': {
              }
            },
            'xAxis': {
              'type': 'category',
              'boundaryGap': false,
              'data': this.type1.xAxis
            },
            'yAxis': [{
              'name': '票房（万）',
              'type': 'value',
              show: true,
              splitLine: {
                show: true,
              },
              axisLine:{
                lineStyle:{
                  width:0
                }
              }
            }, {
              'name': '同比/占用',
              'type': 'value',
              show: true,
              splitLine: {
                show: true,
              },
							axisLabel: {
								formatter: '{value} %'
							},
              axisLine:{
                lineStyle:{
                  width:0
                }
              }
            }
            ],
            'series': [
              {
                'name': '票房',
                symbol: 'circle',
                symbolSize: 10,
                'itemStyle' : {
                  'normal' : {
                    'color':'#3fb1e3'
                  }
                },
                'type': 'line',
                'data': data.data
              }, {
                'name': '同比',
                symbol: 'circle',
                symbolSize: 10,
                'itemStyle' : {
                  'normal' : {
                    'color':'#6be6c1'
                  }
                },
                'type': 'line',
                'yAxisIndex': 1,
                'data': data.compare
              }, {
                'name': '占比',
                symbol: 'circle',
                symbolSize: 10,
                'itemStyle' : {
                  'normal' : {
                    'color':'#a0a7e6'
                  }
                },
                'type': 'line',
                'yAxisIndex': 1,
                'data': data.rate
              }
            ]
          }
          this.chartLine = echarts.init(document.getElementById('each'))
          this.chartLine.setOption(option1,true)
          window.addEventListener('resize', () => {
            this.chartLine.resize()
          })
          this.eachLoading = false
        },
        // 各类型年趋势
        initChartYeay (datas) {
          var option2 = {
						color:['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
            'tooltip': {
              'trigger': 'axis',
							formatter: function(data) {
								console.log(data)
								var result = '';
								result += data[0].name + '<br>';
								for (var i = 0; i < data.length; i++) {
									if (i == data.length - 1) {
										result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + 'W';
									} else {
										result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + 'W<br>';
									}
								}
								return result;
							}
            },
            'legend': {
              'bottom': '2%',
              'right': '4%',
              icon: "rect",
              itemWidth: 14,
              itemHeight: 4,
              'data': this.type2.types
            },
            'grid': {
              'left': '3%',
              'right': '4%',
              'bottom': '10%',
              'containLabel': true
            },
            'toolbox': {
              'feature': {
              }
            },
            'xAxis': {
              'type': 'category',
              'boundaryGap': false,
              'data': this.type2.xAxis
            },
            'yAxis': {
              'name': '票房（万）',
              'type': 'value',
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
            'series': datas
          }
          this.chartBar = echarts.init(document.getElementById('year'))
          this.chartBar.setOption(option2,true)
          window.addEventListener('resize', () => {
            this.chartBar.resize()
          })
          this.yearLoading = false
        },
        // 各类型影片属性分布
        initChartMoves (datas) {
          var option3 = {
						color:['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
            'tooltip': {
              'trigger': 'axis',
							formatter: function(data) {
								console.log(data)
								var result = '';
								result += data[0].name + '<br>';
								for (var i = 0; i < data.length; i++) {
									if (i == data.length - 1) {
										result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + 'W';
									} else {
										result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + 'W<br>';
									}
								}
								return result;
							}
            },
            'legend': {
              'bottom': '2%',
              'right': '4%',
              icon: "rect",
              itemWidth: 14,
              itemHeight: 4,
              'data': this.type3.types
            },
            'grid': {
              'left': '3%',
              'right': '4%',
              'bottom': '10%',
              'containLabel': true
            },
            'toolbox': {
              'feature': {
              }
            },
            'xAxis': {
              'type': 'category',
              'boundaryGap': false,
              'data': this.type3.xAxis
            },
            'yAxis': {
              'name': '票房（万）',
              'type': 'value',
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
            'series': datas
          }
          this.chartMoves = echarts.init(document.getElementById('moves'))
          this.chartMoves.setOption(option3,true)
          window.addEventListener('resize', () => {
            this.chartMoves.resize()
          })
          this.movesLoading = false
        },
        // 各类型影片制式分布
        initChartSystem (datas) {
          var option4 = {
						color:['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
            'tooltip': {
              'trigger': 'axis',
              formatter: function(data) {
              	console.log(data)
              	var result = '';
              	result += data[0].name + '<br>';
              	for (var i = 0; i < data.length; i++) {
              		if (i == data.length - 1) {
              			result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + 'W';
              		} else {
              			result += data[i].marker + '' + data[i].seriesName + ' : ' + data[i].value + 'W<br>';
              		}
              	}
              	return result;
              }
            },
            'legend': {
              'bottom': '2%',
              'right': '10%',
              icon: "rect",
              itemWidth: 14,
              itemHeight: 4,
              'data': this.type4.types
            },
            'grid': {
              'left': '3%',
              'right': '4%',
              'bottom': '10%',
              'containLabel': true
            },
            'toolbox': {
              'feature': {
              }
            },
            'xAxis': {
              'type': 'category',
              'boundaryGap': false,
              'data': this.type4.xAxis
            },
            'yAxis': {
              'name': '票房（万）',
              'type': 'value',
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
            'series': datas
            //   {
            //     'name': '3D',
            //     'type': 'line',
            //     'symbol': 'none',
            //     'itemStyle' : {
            //       'normal' : {
            //         'color':'#B05454'
            //       }
            //     },
            //     'data': [ 4000, 5000, 6000, 8000, 6000, 7000, 3000, 4000, 6000 ]
            //   }, {
            //     'name': 'IMAX',
            //     'type': 'line',
            //     'symbol': 'none',
            //     'itemStyle' : {
            //       'normal' : {
            //         'color':'#6CA1AE'
            //       }
            //     },
            //     'data': [ 2000, 4000, 7000, 1000, 5000, 2000, 4000, 3000, 5000 ]
            //   }, {
            //     'name': '3DMAX',
            //     'type': 'line',
            //     'symbol': 'none',
            //     'itemStyle' : {
            //       'normal' : {
            //         'color':'#6DC0F4'
            //       }
            //     },
            //     'data': [ 3000, 3000, 5000, 7000, 4000, 5000, 6000, 2000, 4000 ]
            //   }
            // ]
          }
          this.chartSystem = echarts.init(document.getElementById('system'))
          this.chartSystem.setOption(option4,true)
          window.addEventListener('resize', () => {
            this.chartSystem.resize()
          })
          this.systemLoading = false
        },
				//点击查询
				search(){
					this.eachLoading=true
					this.yearLoading=true
					this.movieLoading=true
					this.systemLoading=true
					this.getcookie()
					this.getData()
					this.getyearData()
					this.getfilmData()
					this.getfilmCreateData()
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
</style>
