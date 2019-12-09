<template>
	<div style="background: #ededed;">
		<el-header style="height: 126px;"><HeadEr></HeadEr></el-header>
		<el-row style="padding: 15px 75px 0; width: 100%;" class="text_hover" v-loading='basicLoading'>
			<el-breadcrumb separator-class="el-icon-arrow-right" style="border-left: 2px solid #41a9fe;padding-left: 6px;">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item @click.native="goPre" class="text_hover">{{lastmenu}}</el-breadcrumb-item>
			</el-breadcrumb>
			<el-row>
				<h1>{{baseInfo.cinemaline_name}}</h1>
				<p><span style="display: inline-block;background: #0084cf;margin-right: 20px;line-height: 20px;padding: 0 12px;color: #ffffff;">标签-1</span><span style="display: inline-block;background: #0084cf;margin-right: 20px;line-height: 20px;padding: 0 12px;color: #ffffff;">标签-1</span></p>
				<p class="names">
					<span>下属院线：</span>
					<span style="color: #0083d1;">{{baseInfo.underling_cinema_num}}个</span>
				</p>
			</el-row>
			<el-row>
				<el-col :span="8">
					<p class="names">
						<span class="name">公司类型：</span>
						<span style="color: #4c4c4c;font-weight: bold;">{{baseInfo.type_names}}</span>
					</p>
					<p class="names">
						<span class="name">发行影片：</span>
						<span style="color: #4c4c4c;font-weight: bold;">{{baseInfo.underling_film_num}}</span>
					</p>
					<p class="names">
						<span class="name">座位数：</span>
						<span style="color: #4c4c4c;font-weight: bold;">{{baseInfo.seating_num}}座</span>
					</p>
					<p class="names">
						<span class="name">银幕数：</span>
						<span style="color: #4c4c4c;font-weight: bold;">{{baseInfo.screen_num}}</span>
					</p>
					<p class="names">
						<span class="name">地址：</span>
						<span style="color: #4c4c4c;font-weight: bold;">{{baseInfo.area_name}}</span>
					</p>
				</el-col>
				<el-col :span="16" style="border-left: 1px solid #cdcdcd; padding-left: 30px;">
					<el-row>
						<el-col :span="9">
							<div style="width: 255px;margin: 0 auto;" :class="activeBox == '1'? 'activebox' : ''" @mouseover="handleMouse('1')" @mouseleave="mouseLeave">
								<p style="font-size: 20px;">
                  <img src="./img/icon/b_boxoffi.png" alt="" style="vertical-align: middle;" v-show="activeBox == '1'"/>
									<img src="./img/icon/g_boxoffi.png" alt="" style="vertical-align: middle;" v-show="activeBox != '1'"/>
									<span style="color: #0084cf;font-size: 55px;vertical-align: middle;">{{baseInfo.box_office}}</span>
									万
								</p>
								<p style="text-align: center;">今日实时票房</p>
							</div>
						</el-col>
						<el-col :span="9">
							<div style="width: 255px;margin: 0 auto;" :class="activeBox == '2'? 'activebox' : ''"  @mouseover="handleMouse('2')" @mouseleave="mouseLeave">
								<p style="font-size: 20px;">
									<img src="./img/icon/b_person.png" alt="" style="vertical-align: middle;" v-show="activeBox == '2'"/>
									<img src="./img/icon/g_person.png" alt="" style="vertical-align: middle;" v-show="activeBox != '2'"/>
									<span style="color: #16bdb5;font-size: 55px;vertical-align: middle;">{{baseInfo.person_time}}</span>
									万
								</p>
								<p style="text-align: center;">今日实时人次</p>
							</div>
						</el-col>
					</el-row>
					<el-row style="margin-top: 10px;">
						<el-col :span="9">
							<div style="width: 255px;margin: 0 auto;" :class="activeBox == '3'? 'activebox' : ''"  @mouseover="handleMouse('3')" @mouseleave="mouseLeave">
								<p style="font-size: 20px;">
									<img src="./img/icon/b_rank.png" alt="" style="vertical-align: middle;" v-show="activeBox == '3'"/>
									<img src="./img/icon/g_rank.png" alt="" style="vertical-align: middle;" v-show="activeBox != '3'"/>
									<span style="color: #d20100;font-size: 55px;vertical-align: middle;">{{baseInfo.rank_num}}</span>
								</p>
								<p style="text-align: center;">院线排名</p>
							</div>
						</el-col>
						<el-col :span="9">
							<div style="width: 255px;margin: 0 auto;" :class="activeBox == '4'? 'activebox' : ''"  @mouseover="handleMouse('4')" @mouseleave="mouseLeave">
								<p style="font-size: 20px;">
									<img src="./img/icon/b_city.png" alt="" style="vertical-align: middle;" v-show="activeBox == '4'"/>
									<img src="./img/icon/g_city.png" alt="" style="vertical-align: middle;" v-show="activeBox != '4'"/>
									<span style="color: #e9b501;font-size: 55px;vertical-align: middle;">{{baseInfo.city_person_time}}</span>
									万
								</p>
								<p style="text-align: center;">城市人次</p>
							</div>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</el-row>
    <el-row style="padding: 15px 75px 0; width: 100%;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="影片票房" name="tableContract">
            <div>
              <el-row>
                <el-button :type="currentName == 'times' ? 'primary' : ''"  @click="chooseCurrent('times')">时段</el-button>
                <el-button :type="currentName == 'films' ? 'primary' : ''" @click="chooseCurrent('films')">影片</el-button>
              </el-row>
              <el-row style="margin-top: 20px;">
                <span>日期：</span>
                <el-date-picker v-model="date" size="small" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" v-if="currentName == 'times'" @change="chooseDates_e"></el-date-picker>
                <el-date-picker v-model="time" size="small" type="date" v-else-if="currentName == 'films'" @change="chooseDate"></el-date-picker>
                <span>地区：</span>
                <el-button v-popover:popover2 style="width:100px; height: 34px; border: 1px solid #eee; text-align: center;">{{chooseregionText}}</el-button>
                <el-popover
                  ref="popover2"
                  placement="bottom"
                  title=""
                  width="380"
                  trigger="click"
                  content="">
                  <el-tabs v-model="active">
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
                  </el-tabs>
                </el-popover>
                <span>影院：</span>
                <el-select
                  size="small"
                  v-model="cinema"
                  filterable
                  reserve-keyword
                  remote
                  :remote-method="remoteMethod"
                  :loading="cinemaloading"
                  v-el-select-loadmore="loadmore"
                >
                  <el-option v-for="item in cinemaOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-checkbox v-model="checked">服务费</el-checkbox>
                <el-button type="primary" @click="searchData" size="small">查询</el-button>
              </el-row>
              <el-row style="background: #ffffff;height: 430px;margin-top: 20px;">
                <el-row style="margin: 5px 0 0 10px;">
                  <span v-if="currentName == 'times'"> 时段分析 {{start +'——'+ end }} </span>
                  <span v-else-if="currentName == 'films'"> 影片分析 {{ time }} </span>
                  <span style="color: #969696;">{{checked === true ? '已选择服务费' : ''}}</span>
                  <el-select v-model="value" placeholder="请选择" @change="chooseBoxType">
                    <el-option v-for="item in boxofficetype" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>

                </el-row>
                <div id="boxofficeTrend" style="height: 380px; width: 100%; margin-top: 20px;" v-loading="boxofficeTrendLoading"></div>
              </el-row>
              <el-row style="height: 58px;line-height: 58px;">
                <span v-if="currentName == 'times'"> 时段分析 {{start +'——'+ end }} </span>
                <span v-else-if="currentName == 'films'"> 影片分析 {{ time }} </span>
                <span style="color: #969696;">{{checked === true ? '已选择服务费' : ''}}</span>
              </el-row>
              <el-table :data="tableData" :header-cell-style="{background:'#c1c1c1','color':'#ffffff'}" stripe style="width: 100%" v-loading='tableLoading'>
                <el-table-column prop="date_str" label="日期" width="150"></el-table-column>
                <el-table-column :prop="checked === true ? 'box_office' : 'box_office_no_service'" label="票房(万)"></el-table-column>
                <el-table-column prop="box_office_rate" label="票房占比"></el-table-column>
                <el-table-column prop="person_time" label="人次"></el-table-column>
                <el-table-column prop="person_time_rate" label="人次占比"></el-table-column>
                <el-table-column prop="arranged_seating" label="排座"></el-table-column>
                <el-table-column prop="seating_rate" label="排座占比"></el-table-column>
                <el-table-column prop="service_cost" label="服务费(万)"></el-table-column>
                <el-table-column prop="avg_ticket_price" label="平均票价(万)" width="150"></el-table-column>
                <el-table-column prop="avg_screening_pserson" label="场均人次"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="电影排片" name="tableTodo">
            <div>
              <el-row>
                <span>日期：</span>
                <el-date-picker v-model="time2" size="small" type="date" @change="chooseDate2"></el-date-picker>
                <span>地区：</span>
                <el-button v-popover:popover3 style="width:100px; height: 34px; border: 1px solid #eee; text-align: center;">{{chooseregionText2}}</el-button>
                <el-popover
                  ref="popover3"
                  placement="bottom"
                  title=""
                  width="380"
                  trigger="click"
                  content="">
                  <el-tabs v-model="active2">
                    <el-tab-pane label="按地域" name="first2">
                      <template>
                        <el-table
                          :data="urbanHierarchy"
                          height="250"
                          :show-header='noshow'
                          @row-click='chooseUrban2'
                          style="width: 100%; border: none;">
                          <el-table-column
                            prop="label"
                            label=""
                            width="">
                          </el-table-column>
                        </el-table>
                      </template>
                    </el-tab-pane>
                    <el-tab-pane label="按地区" name="second2">
                      <template>
                        <el-table
                          :data="region"
                          height="250"
                          v-loading='loading'
                          @row-click='chooseRegion2'
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
                    <el-tab-pane label="按省份" name="third2">
                      <template>
                        <el-table
                          :data="province"
                          @row-click='chooseProvince2'
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
                  </el-tabs>
                </el-popover>
                <span>影院：</span>
                <el-select
                  size="small"
                  v-model="cinema2"
                  filterable
                  reserve-keyword
                  remote
                  :remote-method="remoteMethod"
                  :loading="cinemaloading"
                  v-el-select-loadmore="loadmore"
                >
                  <el-option v-for="item in cinemaOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-checkbox v-model="checked2">服务费</el-checkbox>
                <el-button type="primary" @click="searchData2" size="small">查询</el-button>
              </el-row>
              <el-row style="background: #ffffff;height: 430px;margin-top: 20px;">
                <el-row style="margin: 5px 0 0 10px;">
                  <span> 电影排片分析 {{ time2 }} </span>
                  <span style="color: #969696;">{{checked2 === true ? '已选择服务费' : '未选择服务费'}}</span>
                </el-row>
                <div id="boxofficeTrend2" style="height: 380px; width: 100%; margin-top: 20px;" v-loading="boxofficeTrendLoading2"></div>
              </el-row>
              <el-table :data="tableData2" :header-cell-style="{background:'#c1c1c1','color':'#ffffff'}" stripe style="width: 100%" v-loading='tableLoading2'>
                <el-table-column prop="movie_name" label="影片名称" width="150"></el-table-column>
                <el-table-column prop="days" label="上映天数"></el-table-column>
                <el-table-column prop="movie_types" label="影片类型"></el-table-column>
                <el-table-column prop="playtimes" label="放映场次"></el-table-column>
                <el-table-column prop="playtimes_ring" label="场次环比"></el-table-column>
                <el-table-column prop="total_playtimes" label="放映总场次"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-row>
	</div>
</template>

<script>
import HeadEr from '../recommend/home';
import echarts from 'echarts';
export default {
  directives: {
		'el-select-loadmore': {
			bind(el, binding) {
				// 获取element-ui定义好的scroll盒子
				const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
				SELECTWRAP_DOM.addEventListener('scroll', function() {
					/**
					 * scrollHeight 获取元素内容高度(只读)
					 * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
					 * clientHeight 读取元素的可见高度(只读)
					 * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
					 * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
					 */
					const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
					if (condition) {
						binding.value();
					}
				});
			}
		}
	},
	data() {
		return {
      tableData:[],
      tableData2:[],
      checked: '',
      checked2: '',
      date: '',
      time: '',
      time2: '', // 电影排片的时间
      activeBox: '1',
      activeName: 'tableContract',
      currentName: 'times', // 选择时段或者影片
      active: 'first', // 切换地区选择
      active2: 'first2', // 切换地区选择
      basicLoading: true, // 基础信息缓冲
      lastmenu: '', // 上一个页面菜单名字
      id: '', // 上个页面带过来的参数，用于当前页面的数据参数
      cinema: '', // 影院-下拉列表
      cinema2: '', // 影院-下拉列表
      cinemaloading: true,
      cinemaOptions: [], // 影院的列表获取到的后台返回结果
      formData: {
				pageIndex: 1,
				pageSize: 20
      },
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
      baseInfo: {
        cinemaline_name: '',
        underling_cinema_num: '',
        type_names: '',
        underling_film_num: '',
        seating_num: '',
        screen_num: '',
        area_name: '',
        box_office: '',
        person_time: '',
        rank_num: '',
        city_person_time: ''
      },
      chooseregionText: '', // 已选择地区的页面显示文字
      chooseregionText2: '', // 已选择地区的页面显示文字
      urbanHierarchy: [], // 地域
      urbanHierarchyCode: '', //
      region: [], // 地区
      province: [], // 省份
      provinceCode: '', // 	省份编码，传入需要封装到 params 中
      regionCode: '', // 区域编码，传入需要封装到 params 中
      noshow: false,
      boxofficeTrend: null, // 院线趋势的图表
      boxofficeTrend2: null, // 电影排片趋势
      boxofficeTrendLoading: true, // 票房趋势部分的图表缓冲
      boxofficeTrendLoading2: true, // 票房趋势部分的图表缓冲
      loading: true,
      start: '',
      end: '',
      areaId: '',
      areaId2: '',
      // date: new Date(), //
      cinemaId: '', // 影院id
      cinemaId2: '', // 影院id
      tableLoading: true,
      tableLoading2: true,
      chartData: {
        type: '', // line或者bar
        xAxisData: [],
        boxdata: [],
        personData: [],
        playtiemsdata: [],
        boxdataser: []
      },
      chartData2: {
        xAxisData: [],
        data: []
      }

		}
	},
	created() {},
	mounted() {
    this.lastmenu = this.$route.query.lastmenu || '';
    this.id = this.$route.query.id || '';
    this.getBasicInfo(this.id)
    this.getCityList() // 获取城市列表
    this.getEndDate() // 获得默认的开始和结束时间
    this.initChartBoxTrend()
  },
	methods: {
    tabClick({name}){
      console.log(name)
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
    chooseDate (val) {
      console.log(val)
      this.time = this.CurentTime(val)
    },
    chooseDates_e (val) {
      this.start = this.CurentTime(val[0])
      this.end = this.CurentTime(val[1])
      console.log(this.start, this.end)
    },
    chooseDate2 (val) {
      console.log(val)
      this.time2 = this.CurentTime(val)
    },
    // 获取开始时间和结束时间
    getEndDate () {
      let end = Date.parse(new Date())
      let day = 15
      let start = end - 3600000*24*(day-1)
      this.end = this.CurentTime(new Date(end))
      this.start = this.CurentTime(new Date(start))
      this.$nextTick(() => {
        this.gettimeList(this.id, this.start, this.end)
      })
    },
    // 返回上一页
    goPre() {
			this.$router.go(-1);
    },
    // 获取院线基本信息
    getBasicInfo (id) {
      let _this = this;
			let label = 'movie';
			_this
				.$http({
					url: _this.$http.adornUrl('web/cinemalinedetailpage/getBasicInfo?cinemaLineId=' + id),
					method: 'POST',
					data: _this.$http.adornData({
						cinemaLineId: id
					})
				})
				.then(({ data }) => {
          console.log('基础信息，，，，，，，，，，，，，，', data)
          if (data.code === 0 && data.data) {
            this.baseInfo = {
              cinemaline_name: data.data.cinemaline_name,
              underling_cinema_num: data.data.underling_cinema_num,
              type_names: data.data.type_names,
              underling_film_num: data.data.underling_film_num,
              seating_num: data.data.seating_num,
              screen_num: data.data.screen_num,
              area_name: data.data.area_name,
              box_office: data.data.box_office,
              person_time: data.data.person_time,
              rank_num: data.data.rank_num== -1 ? '0' : data.data.rank_num,
              city_person_time: data.data.city_person_time
            }
            this.basicLoading = false
          }
				})
    },
    // 改变样式
    handleMouse (val) {
      console.log(val)
      this.activeBox = val
      console.log(this.activeBox)
    },
    mouseLeave () {
      this.activeBox = ''
    },
    // 选择时段或者影片
    chooseCurrent (val) {
      this.currentName = val
      if (val === 'times') {
        this.tableLoading = true
        this.boxofficeTrendLoading = true
        this.$nextTick(() => {
          this.gettimeList(this.id, this.start, this.end)
        })
      } else if (val === 'films') {
        this.tableLoading = true
        this.boxofficeTrendLoading = true
        let time = new Date()
        this.time = this.CurentTime(time)
        console.log(time)

        // this.time = this.CurentTime(val)
        this.$nextTick(() => {
          this.getfilmList(this.id, this.time)
        })

      }
    },
    //获取影院列表
		loadmore() {
			this.formData.pageIndex++;
			this.getList(this.cinemaname);
		},
		getList(name) {
			// console.log(name);
			this.$http({
				url: this.$http.adornUrl('web/cinema/queryCinemaNameAndId?size=' + this.formData.pageSize + '&current=' + this.formData.pageIndex + '&name=' + name),
				method: 'GET'
			}).then(({ data }) => {
				this.cinemaloading = false;
				for (var i = 0; i < data.page.records.length; i++) {
					this.cinemaOptions.push(data.page.records[i]);
				}
			});
			// 这里是接口请求数据, 带分页条件
			// const _res = [1, 2, 3]; // 请求得到的数据
			// this.options = [...this.options, ..._res];
    },
    remoteMethod(query) {
			// console.log(1);
			this.cinemaOptions = [];
			if (query !== '') {
				this.cinemaloading = true;
				this.cinemaname = query;
			}
			// console.log(this.cinemaname);
			this.getList(this.cinemaname);
		},
    // 获取时段的图表列表
    gettimeList (id, start, end) {
      let _this = this;
      console.log(_this.checked)
			// let label = 'movie';
			_this.$http({
					url: _this.$http.adornUrl('web/cinemalinedetailpage/getDuringAnalysis?cinemaLineId=' + id + '&startDate=' + start + '&endDate=' + end + '&areaId=' + this.areaId + '&cinemaId=' + this.cinema),
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
          this.tableLoading = false
          this.boxofficeTrendLoading = false
          if (data.code == 0 && data.page.records) {
            this.tableData = data.page.records
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
          } else {
            this.tableData = []
            let x = []
            let data = []
            let type = 'line'
            this.initChartBoxTrend(x, data, chartData.type)
          }
				})
    },
    // 获取影片的图表列表
    getfilmList (id, date) {
      let _this = this;
			_this.$http({
					url: _this.$http.adornUrl('/web/cinemalinedetailpage/getFilmAnalysis?cinemaLineId=' + id + '&date=' + date + '&areaId=' + _this.areaId + '&cinemaId=' + _this.cinema),
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
          this.tableLoading = false
          this.boxofficeTrendLoading = false
          if (data.code == 0 && data.page.records) {
            this.tableData = data.page.records
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
          } else {
            this.tableData = []
            let data = []
            let x = []
            this.initChartBoxTrend(x, data, 'bar')
          }
				})
    },
    // 获取电影排片
    getfilmPlayList (id) {
      let _this = this;
      console.log(_this.checked2)
			// let label = 'movie';
			_this.$http({
					url: _this.$http.adornUrl('/web/cinemalinedetailpage/getFilmScheduleAnalysis?cinemaLineId=' + id + '&date=' + this.time2 + '&areaId=' + this.areaId2 + '&cinemaId=' + this.cinema2),
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
          this.tableLoading2 = false
          if (data.code == 0 && data.page.records) {
            this.tableData2 = data.page.records
            let chartData = {
              xAxisData: [],
              data: []
            }
            for (let i = 0; i < data.page.records.length; i++) {
              chartData.xAxisData.push(data.page.records[i].movie_name)
              chartData.data.push(data.page.records[i].playtimes)
            }
            this.chartData2 = chartData
            this.initChartBoxTrend2(this.chartData2.xAxisData, this.chartData2.data)
          } else {
            this.tableData2 = []
            this.chartData2 = {
              xAxisData: [],
              data: []
            }
            this.initChartBoxTrend2(this.chartData2.xAxisData, this.chartData2.data)
          }
				})
    },
    // 点击查询按钮
    searchData () {
      if (this.currentName === 'times') {
        this.tableLoading = true
        this.boxofficeTrendLoading = true
        this.$nextTick(() => {
          this.gettimeList(this.id, this.start, this.end)
        })
        // this.gettimeList(this.id, this.start, this.end)
      } else if (this.currentName === 'films') {
        this.tableLoading = true
        this.boxofficeTrendLoading = true
        let date = this.time
        this.$nextTick(() => {
          this.getfilmList(this.id, date)
        })

      }
    },
    // 点击查询按钮
    searchData2 () {
      this.tableLoading2 = true
      this.boxofficeTrendLoading2 = true
      this.$nextTick(() => {
        this.getfilmPlayList(this.id)
        // this.gettimeList(this.id, this.start, this.end)
      })
        // this.gettimeList(this.id, this.start, this.end)
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
    // 获取基础图片
    getBasePic() {
			let _this = this;
			let label = 'movie';
			_this
				.$http({
					url: _this.$http.adornUrl('/web/sysdict/defaultPic?label=' + label),
					method: 'POST',
					data: _this.$http.adornData({
						label: label
					})
				})
				.then(({ data }) => {
					this.basicImg = data.url;
				});
    },
    handleClick(tab, event) {
      this.regionCode = ''
      this.provinceCode = ''
      this.urbanHierarchyCode = ''
      this.areaId = ''
      let time = new Date()
      this.time2 = this.CurentTime(time)
      this.$nextTick(() => {
        this.getfilmPlayList(this.id)
      })
    },
    // 选择地域
    chooseUrban (val) {
      let _this = this
      // console.log(val)
      _this.chooseregionText = val.label
      _this.urbanHierarchyCode = val.value
      _this.areaId = val.value
      // _this.getData()
    },
    // 选择地区
    chooseRegion (val) {
      let _this = this
      console.log(val)
      _this.regionCode = val.value
      _this.chooseregionText = val.label
      _this.areaId = val.value
      // _this.getData()
    },
    // 选择省份
    chooseProvince (val) {
      let _this = this
      console.log(val)
      _this.provinceCode = val.id
      _this.chooseregionText = val.value
      _this.areaId = val.value
    },
    // 选择地域
    chooseUrban2 (val) {
      let _this = this
      console.log(val)
      _this.chooseregionText2 = val.label
      _this.urbanHierarchyCode2 = val.value
      _this.areaId2 = val.value
      // _this.getData()
    },
    // 选择地区
    chooseRegion2 (val) {
      console.log(val)
      let _this = this
      console.log(val)
      _this.regionCode2 = val.value
      _this.chooseregionText2 = val.label
      _this.areaId2 = val.value
      // _this.getData()
    },
    // 选择省份
    chooseProvince2 (val) {
      let _this = this
      console.log(val)
      _this.provinceCode2 = val.id
      _this.chooseregionText2 = val.value
      _this.areaId2 = val.value
    },
    // 地区获取列表
    getCityList () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/web/sysdict/dictOfRegion'),
        method: 'post',
        data: {}
      }).then(({data}) => {
        // console.log(data)
        if (data.code===0) {
          _this.loading = false
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

      this.boxofficeTrend = echarts.init(document.getElementById('boxofficeTrend'));
      this.boxofficeTrend.setOption(option, true);
			window.addEventListener('resize', () => {
				this.boxofficeTrend.resize()
      })
      this.boxofficeTrendLoading = false
    },
    // 绘制票房趋部分的图表
		initChartBoxTrend2(xAxisData, data) {
      let color = ['#0084CF']
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
            type: 'bar',
            barWidth: 20
        }]
      }

      this.boxofficeTrend2 = echarts.init(document.getElementById('boxofficeTrend2'));
      this.boxofficeTrend2.setOption(option, true);
			window.addEventListener('resize', () => {
				this.boxofficeTrend2.resize()
      })
      this.boxofficeTrendLoading2 = false
		}
	},
	components: {
		HeadEr
	}
};
</script>

<style scoped>
.names {
	color: #959595;
}
.name {
	min-width: 70px;
	text-align: justify;
	text-align-last: justify;
}
.name {
	display: inline-block;
	min-width: 70px;
	text-align: justify;
	height: 16px;
	vertical-align: middle;
}
.name:after {
	display: inline-block;
	content: '';
	padding-left: 100%;
}
.text_hover {
	cursor: pointer;
	display: inline-block;
}
.activebox {
  border-bottom: 2px solid #399BFF;
}
</style>
