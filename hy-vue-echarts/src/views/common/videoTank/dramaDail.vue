<template>
	<div style="padding-right: 57px;">
		<el-row style="margin: 20px 0 ; padding:0 20px;">
			<ul style="list-style:none;">
				<li class="breadcrumb-item">您当前位置:</li>
				<li style="font-weight: 500;" @click="goPre" class='breadcrumb-item text_hover'>{{lastmenu}}</li>
				<li class="breadcrumb-item breadcrumb-item-active">{{basicData.nameCn || '...'}}</li>
			</ul>
		</el-row>
		<el-row style="margin:0px; padding:0 20px;" v-loading='basicLoading'>
			<el-col :span="8" style="padding:0;">
				<el-card class="grid-content">
					<div><img class="video-pictrue" :src="basicData.imageUrl" @error="nofind" /></div>
					<div class="video-info">
						<h3 class="video-title">{{basicData.nameCn || ' ...'}}</h3>
						<p><span style="display: inline-block;background: #0084cf;margin-right: 20px;line-height: 20px;padding: 0 12px;color: #ffffff;">标签-1</span><span style="display: inline-block;background: #0084cf;margin-right: 20px;line-height: 20px;padding: 0 12px;color: #ffffff;">标签-1</span></p>
						<ul class="video-info-list">
							<li>
								<span>地区：</span>
								<span>{{basicData.country || '无'}}</span>
							</li>
							<li>
								<span>作品类型：</span>
								<span>{{basicData.categoryName || '无'}}</span>
							</li>
							<li>
								<span>集数：</span>
								<span>{{basicData.videoNumber || '0'}}集</span>
							</li>
							<li>
								<span style="color: #999;">导演：</span>
								<span v-for="(dir, index) in basicData.rDirector" :key="index">
                  <a class="a_blue">
                    {{dir.name || '无'}}
                  </a>
                </span>
							</li>
							<li>
								<span style="color: #999;">主演：</span>
								<span v-for="(atc, index) in basicData.rActor" :key="index">
                  <a class="a_blue">
                    {{atc.name || '无'}}
                  </a>
                </span>
							</li>
							<li>
								<span>上映日期：</span>
								<span>{{basicData.releaseDate}}</span>
							</li>
						</ul>
					</div>
				</el-card>
			</el-col>
			<el-col :span="15" style="padding-left: 15px; padding-right: 0px;">
				<div class="grid-content">
					<div class="info-operate" style="padding-top: 20px;padding-right:20px;">
						<span>
							<img src="../video/img/icon_zhuanfa.png" />
							转发
						</span>
						<span>
							<img src="../video/img/icon_shoucang.png" />
							收藏
						</span>
					</div>
					<el-row style="border-bottom:1px solid #DEDEDE; height:100px; padding:15px 0;">
						<el-col :span="12" style="border-right:1px solid #DEDEDE;">
							<div class="num-center">{{basicData.allPlayCounts}}亿</div>
							<div class="txt-center">累计播放量</div>
						</el-col>
						<el-col :span="12">
							<div class="num-center">{{basicData.broadcastingIndex || 0}}</div>
							<div class="txt-center">播映指数</div>
						</el-col>
					</el-row>
					<el-row style="height:100px; padding:20px 0;">
						<el-col :span="12" style="border-right:1px solid #DEDEDE;">
							<div class="num-center">{{basicData.todayPlayNumber}}亿</div>
							<div class="txt-center">今日播放量</div>
						</el-col>
						<el-col :span="12">
							<div class="num-center">{{basicData.releaseDays}}天</div>
							<div class="txt-center">上映天数</div>
						</el-col>
					</el-row>
				</div>
			</el-col>
		</el-row>
		<el-row style="margin:20px ; " v-loading='basicLoading'>
			<el-card>
				<h5 style="font-size: 24px; margin-left: 20px;">基本资料</h5>
				<el-tabs v-model="activeName" @tab-click="handleClick" style=" margin:-12px 20px 0px 20px">
					<el-tab-pane label="" style="" name="first">
						<el-row>
							<el-col :span="9">
								<ul class="video-detail">
									<li class="video-detail-list">
										<span class="">中文名称</span>
										<span>{{basicData.nameCn || '无'}} </span>
									</li>
									<li class="video-detail-list">
										<span class="">国家地区</span>
										<span>{{basicData.country || '无'}}</span>
									</li>
									<li class="video-detail-list">
										<span class="">导演</span>
										<span v-if='basicData.companyInVideo.rDirector !== []'>
                      <a class="a_blue" v-for="(dir, index) in basicData.rDirector" :key="index">
                        {{dir.name || '无'}}
                      </a>
                    </span>
									</li>
									<li class="video-detail-list">
										<span class="">演员</span>
										<span v-if='basicData.companyInVideo.rActor !== []'>
                      <a class="a_blue" v-for="(atc, index) in basicData.rActor" :key="index">
                        {{atc.name || '无'}}
                      </a>
                    </span>
									</li>
									<li class="video-detail-list">
										<span class="">编剧</span>
										<span v-if='basicData.companyInVideo.rScriptwriter !== []'>
                      <a class="a_blue" v-for="(scri, index) in basicData.rScriptwriter" :key="index">
                        {{scri.name || '无'}}
                      </a>
                    </span>
									</li>
									<li class="video-detail-list">
										<span class="">制片人</span>
										<span v-if='basicData.companyInVideo.rProducer !== []'>
                      <a class="a_blue" v-for="(prod, index) in basicData.rProducer" :key="index">
                        {{prod.name || '无'}}
                      </a>
                    </span>
									</li>
									<li class="video-detail-list">
										<span class="">类型</span>
										<span v-if='basicData.companyInVideo.rType !== []'>
                      <a style="color: #444;" v-for="(type, index) in basicData.rType" :key="index">
                        {{type.name || '无'}}
                      </a>
                    </span>
									</li>
									<li class="video-detail-list">
										<span class="">首播平台</span>
										<span v-if="basicData.channelInVideo.first != []">
                      <a class="a_blue" v-for="(fir, index) in basicData.channelInVideo.first" :key="index">
                        {{fir.nameShort || '无'}}
                      </a>
                    </span>
									</li>
									<li class="video-detail-list">
										<span class="">制作公司</span>
										<span v-if='basicData.companyInVideo.production !== []'>
                      <a class="a_blue" v-for="(pro, index) in basicData.companyInVideo.production" :key="index">
                        {{pro.name || '无'}}
                      </a>
                    </span>
									</li>
								</ul>
							</el-col>
							<el-col :span="9">
								<ul class="video-detail">
									<li class="video-detail-list">
										<span class="">集数</span>
										<span>{{basicData.videoNumber || '0'}}集</span>
									</li>
									<li class="video-detail-list">
										<span class="">首播时间</span>
										<span>{{basicData.releaseDate || '无'}}</span>
									</li>
									<li class="video-detail-list">
										<span class="">出品时间</span>
										<span>{{basicData.productionDate || '无'}}</span>
									</li>
									<li class="video-detail-list">
										<span class="">信息网络传播权</span>
										<span v-if='basicData.companyInVideo.network !== []' >
                      <a class="a_blue" v-for="(net, index) in basicData.companyInVideo.network" :key="index">
                        {{net.name || '无'}}
                      </a>
                    </span>
									</li>
									<li class="video-detail-list">
										<span class="">在线播放平台</span>
										<span v-if='basicData.channelInVideo.normal != []'>
                      <a class="a_blue" v-for="(nor, index) in basicData.channelInVideo.normal" :key="index">
                        {{nor.nameShort || '无'}}
                      </a>
                    </span>
									</li>
									<li class="video-detail-list">
										<span class="">每集时长</span>
										<span>{{basicData.duration || '0'}}分钟</span>
									</li>
									<li class="video-detail-list">
										<span class="">拍摄地点</span>
										<span v-if='basicData.companyInVideo.rCity !== []'>
                      <a class="a_blue" v-for="(city, index) in basicData.rCity" :key="index">
                        {{city.name || '无'}}
                      </a>
                    </span>
									</li>
									<li class="video-detail-list">
										<span class="">发行公司</span>
										<span v-if='basicData.companyInVideo.release !== []'>
                      <a class="a_blue" v-for="(rel, index) in basicData.companyInVideo.release" :key="index">
                        {{rel.name || '无'}}
                      </a>
                    </span>
									</li>
								</ul>
							</el-col>
						</el-row>
					</el-tab-pane>
				</el-tabs>
			</el-card>
		</el-row>
		<el-row class="row-m20-p20">
			<el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
					<p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">播放趋势</p>
				</div>
				<div id="playTrend" style="height: 430px" v-loading='playTrendLoading'></div>
			</el-col>
			<el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-left: 10px solid #F5F5F5;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
					<p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">观看时间</p>
				</div>
				<div id="watchTime" style="width: 95%; height: 430px" v-loading='watchtimeLoading'></div>
			</el-col>
		</el-row>
		<el-row class="row-m20-p20">
			<el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
					<p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">今日播放量</p>
				</div>
				<div style="height: 250px; margin-left: 22px;">
					<el-table :data="todayPlayData" show-header height="250px" style="width: 100%; font-size:18px" row-class-name="table-row" header-row-class-name="table-header">
						<el-table-column prop="channelNameShort" label="平台"></el-table-column>
						<el-table-column prop="playNumber" label="总播放量"></el-table-column>
						<el-table-column prop="percent" label="播放占比"></el-table-column>
					</el-table>
				</div>
			</el-col>
			<el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-left: 10px solid #F5F5F5;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
					<p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">设备分布</p>
				</div>
				<div style="height: 250px; overflow: hidden;">
					<div class="bigbox" v-if="macine != []">
						<div class="pc" :style="{ width: macine[0].percent || 0}"></div>
						<div class="mobile"></div>
					</div>
					<div class="title">
						<div class="" style="color: #3fb1e3">{{ macine[0].name || ''}} : {{ macine[0].percent || 0}}</div>
						<div class="" style="color: #a0a7e6">{{ macine[1].name || '' }} : {{ macine[1].percent || 0}}</div>
					</div>
					<p style="margin: 0 auto;width: 100%; text-align: center;">
						<span style="color: #3fb1e3; margin-right: 20px;">
							<i class="leftIcon"></i>
							{{ macine[0].name || ''}}
						</span>
						<span style="color: #a0a7e6">
							<i class="rightIcon"></i>
							{{ macine[1].name || ''}}
						</span>
					</p>
				</div>
			</el-col>
		</el-row>
		<el-row class="row-m20-p20">
			<el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
					<p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">搜索热点趋势</p>
				</div>
				<div id="hotTrend" style="height: 430px" v-loading='hotLoading'></div>
			</el-col>
			<el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-left: 10px solid #F5F5F5;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
					<p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">媒体分布</p>
				</div>
				<div id="madiaDis" style="height: 430px" v-loading='madiaLoading'></div>
			</el-col>
		</el-row>
		<el-row class="row-m20-p20">
			<el-col :span="12" style="background: #ffffff;padding: 0 0 10px;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
					<p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">微博趋势</p>
				</div>
				<div id="blogTrend" style="height: 430px" v-loading='blogLoading'></div>
			</el-col>
			<el-col :span="12" style="background: #ffffff;padding: 0 0 10px;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
					<p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;height:72px; line-height: 72px;"></p>
				</div>
				<div style="height: 430px; border-left: 1px solid #F5F5F5;">
					<el-row style="height:100px; padding:15px 0;">
						<el-col :span="12" style="border-right:1px solid #DEDEDE;">
							<div class="num-center">{{weiboFansSum}}亿</div>
							<div class="txt-center">官微粉丝</div>
						</el-col>
						<el-col :span="12">
							<div class="num-center">{{weiboNumSum}}</div>
							<div class="txt-center">微博数量</div>
						</el-col>
					</el-row>
					<div style="height: 250px; margin-left: 22px;">
						<p style="color: #999999">微博热门话题</p>
						<el-table :data="blogData" show-header height="250px" style="width: 100%; font-size:18px" row-class-name="table-row" header-row-class-name="table-header" v-loading='blogdataLoading'>
							<el-table-column prop="index" width="100px" label="排名">
                <template slot-scope="scope">
              		<span>{{ scope.$index}}</span>
              	</template>
              </el-table-column>
							<el-table-column prop="topic" label="话题名称"></el-table-column>
							<el-table-column prop="discussionNumber" label="讨论量"></el-table-column>
							<el-table-column prop="readNumber" label="阅读量"></el-table-column>
						</el-table>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row class="row-m20-p20">
			<el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
					<p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">微信指数</p>
				</div>
				<div id="wechart" style="height: 430px" v-loading='weChartLoading'></div>
			</el-col>
			<el-col :span="12" style="background: #ffffff;padding: 0 0 10px;border-left: 10px solid #F5F5F5;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
					<p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">弹幕信息</p>
				</div>
				<div id="barrageInfo" style="height: 430px" v-loading='barrageLoading'></div>
			</el-col>
		</el-row>
		<el-row class="row-m20-p20">
			<el-col :span="12" style="background: #ffffff;padding: 0 0 10px;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
					<p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">用户画像</p>
					<span style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 22px;line-height: 72px;">
						<el-dropdown>
							<span class="el-dropdown-link">
								爱奇艺
								<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>腾讯</el-dropdown-item>
								<el-dropdown-item>优酷</el-dropdown-item>
								<el-dropdown-item>芒果</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</span>
				</div>
				<div style="height: 250px; overflow: hidden;">
					<p style="color: #333333; margin-top: 10px; margin-left: 20px;">性别分布</p>
					<div class="bigbox">
						<div class="pc" :style="{ width: sexDis[0].percent }"></div>
						<div class="mobile"></div>
					</div>
					<div class="title">
						<div class="" style="color: #3fb1e3">{{ sexDis[0].name }} : {{ sexDis[0].percent }} </div>
						<div class="" style="color: #a0a7e6">{{ sexDis[1].name }} : {{ sexDis[0].percent }} </div>
					</div>
					<p style="margin: 0 auto;width: 100%; text-align: center;">
						<span style="color: #3fb1e3; margin-right: 20px;">
              <!-- '#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91' -->
							<i class="leftIcon"></i>
							{{ sexDis[0].name }}
						</span>
						<span style="color: #a0a7e6">
							<i class="rightIcon"></i>
							{{ sexDis[1].name }}
						</span>
					</p>
				</div>
			</el-col>
			<el-col :span="12" style="background: #ffffff;padding: 0 0 10px;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
					<p style="font-size: 24px;color: #333333;float: left;margin: 0 0 0 0px; height:72px; line-height: 72px;"></p>
				</div>
				<div id="ageDis" style="height: 250px; border-left: 1px solid #F5F5F5;" v-loading='ageLoading'></div>
			</el-col>
		</el-row>
		<el-row class="row-m20-p20">
			<el-col :span="24" style="background: #ffffff;padding: 0 0 10px;border-right: 10px solid #F5F5F5;">
				<div style="overflow: hidden;border-bottom: 1px solid #DEDEDE;">
				</div>
				<div id="watchRegion" style="height: 430px" v-loading='regionLoading'></div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import echarts from 'echarts';
import headEr from './videoTank';
// import header from '../head/head-er'
// import boxOffice from '../../'
export default {
	data() {
		return {
			id:'',
			lastmenu:'',
      activeName: 'first',
      basicLoading: true,
      basicData: { // 剧集基础信息
        imageUrl: '',
        nameCn: '',
        country: '',
        categoryName: '',
        videoNumber: '',
        rDirector: [
          {name: '张三', id: 1}
        ],
        rActor: [
          {name: '张三', id: 1}
        ],
        releaseDate: '',
        allPlayCounts: '',
        broadcastingIndex: '',
        todayPlayNumber: '',
        releaseDays: '',
        rScriptwriter: [],
        rProducer: [],
        rType: [],
        channelInVideo: {
          first: [],
          normal: []
        },
        companyInVideo: {
          production: [],
          network: [],
          release: []
        },
        startDate: '',
        productionDate: '',
        duration: '',
        rCity: []
      },
			value1: '',
			pcValue: '12.75',
			macine: [{ name: '', percent: '0%' }, { name: '', percent: '100%' }], // 设备数据
			// sexValue: '',
			sexDis: [{ name: '', percent: '0%' }, { name: '', percent: '100%' }], // 性别分布
      todayPlayData: [],
      todayPlayLoading: true,
      weiboNumSum: '',
      weiboFansSum: '',
			blogData: [],
      blogdataLoading: true,
      playTrendLoading: true,
      hotLoading: true,
      madiaLoading: true,
      blogLoading: true,
      weChartLoading: true,
      ageLoading: true,
      barrageLoading: true,
      regionLoading: true,
      watchtimeLoading: true,
      playTrendChart: null, // 播放趋势
			watchTimeChart: null, // 观看时间
      machineChart: null, // 设备分布
      hotTrendChart: null, // 搜索趋势
      madiaDisCharts: null, // 媒体分布
      blogTrendChart: null, // 微博趋势
      wechartChart: null, // 微信指数
      barrageInfoChart: null, // 弹幕指数
      ageDisChart: null, // 年龄分布
			watchRegionChart: null // 绘制受众图表
		};
	},
	created() {},
	mounted() {
    this.lastmenu = this.$route.query.lastmenu || ''
    this.getid()
    this.$nextTick(() => {
            // this.initplayTrendChart()
      this.getBasePic()

      // this.getBasePic()
      this.getdate()
      this.getPlayTrend()
      // this.getTodayPlay()
      this.getMacine() // 设备分布
      this.getGender() // 性别分布
      // this.initplayTrendChart(); // 绘制播放趋势图表
      this.getWatchtime()
      // this.initwatchTimeChart(); // 绘制观看时间图表
      // // // this.inithotTrendChart(); // 绘制搜索热点图表
      this.getHot()
      this.getMadia()
      // // // this.initmadiaDisChart(); // 绘制媒体分布
      this.getBlog()
      // // // this.initblogTrendChart(); // 绘制微博趋势图表
      this.getBlogData()
      // // this.initwechartChart(); // 绘制微信指数图表
      this.getWechart()
      this.getBarra()
      // // this.initbarrageInfoChart(); // 绘制弹幕指数图表
      this.gatAge()
      // // this.initageDisChart(); // 年龄分布图表
      this.getRegion()
      // this.initwatchRegionChart(); // 受众区域图表
    })

	},
	methods: {
		//获取影片id
		getid(){
      this.id = sessionStorage.getItem('dramaId')
    },
    // 获取默认图片
    getBasePic () {
      let _this = this
      let label = 'others'
      _this.$http({
        url: _this.$http.adornUrl('/web/sysdict/defaultPic?label=' + label),
        method: 'POST',
        data: _this.$http.adornData({
          'label': label
        })
      }).then(({data}) => {
        console.log(data, '默认图=====================')
        this.basicImg = data.url
      })
    },
    // 找不到图片的时候
    nofind () {
      var img = event.srcElement;
      img.src = this.basicImg;
      img.onerror = null; // 控制不要一直跳动
    },
    // 处理时间
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
		handleClick(e) {
			console.log(e);
    },
    getPlayTrend () {
      let startDate = ''
      let today = new Date()
      let start = today.setDate(today.getDate() - 10)
      startDate = new Date(start)
      let endDate = new Date()
      let xAxis = []
      let dealList = []
      this.$http({
				url: this.$http.adornUrl('web/videocontent/channelPlayStatistic/'+this.id + '/?startDate=' + this.CurentTime(startDate) + '&endDate=' + this.CurentTime(endDate)),
				method: 'POST'
			})
				.then(({ data }) => {
           if (data.code == 0 && data.list && data.list != []) {
             for (let i = 0; i < data.list.length; i++) {
                let channels = data.list[i].channels;
                if (i === 0) {
                    if (channels.length > 0) {
                      for (let j = 0; j < channels.length; j++) {
                        let obj = {};
                        obj['name'] = channels[j].nameFull;
                        obj['type'] = 'bar';
                        obj['stack'] = '播放趋势';
                        obj['barWidth'] = '23%';
                        obj['data'] = [];
                        dealList.push(obj);
                    }
                  }
                }
                for (let j = 0; j < channels.length; j++) {
                    dealList[j].data.push(channels[j].playNumber);
                }
            }
           }
          this.initplayTrendChart(xAxis, dealList)
          this.playTrendLoading = false

				})
				.catch(err => {
					console.log('请求失败：', err);
				});
    },
		// 播放趋势柱状图
		initplayTrendChart (xAxis, dealList) {
			var playTrendChartOption = {
				color: ['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				legend: {
					right: 30,
					top: 10,
					show: true
				},
				xAxis: [
					{
						type: 'category',
						data: xAxis,
						axisTick: {
							alignWithLabel: true
						}
					}
				],
				yAxis: [
					{
						name: '单位（万）',
						type: 'value',
						// min: 0,
						// max: 900,
						// interval: 300
					}
				],
        series: dealList
        // [
				// 	{
				// 		name: '腾讯',
        //     type: 'bar',
        //     stack: '播放趋势',
				// 		barWidth: '20%',
				// 		data: [100, 220, 200, 340, 300, 330, 100, 220, 200, 340, 300, 330, 509]
				// 	}, {
        //     name: '爱奇艺',
        //     type: 'bar',
        //     stack: '播放趋势',
				// 		barWidth: '20%',
				// 		data: [500, 520, 20, 340, 600, 630, 160, 220, 260, 340, 600, 630, 509]
        //   }
				// ]
			};
			this.playTrendChart = echarts.init(document.getElementById('playTrend'));
			this.playTrendChart.setOption(playTrendChartOption);
			window.addEventListener('resize', () => {
				this.playTrendChart.resize();
			});
    },
    getWatchtime () {
      let startDate = ''
      let today = new Date()
      let start = today.setDate(today.getDate() - 10)
      startDate = new Date(start)
      let endDate = new Date()
      let xAxis = []
      let chartData = []
      this.$http({
				url: this.$http.adornUrl('web/videocontent/getPlaySumInDatesByVideoId/'+this.id + '/?startDate=' + this.CurentTime(startDate) + '&endDate=' + this.CurentTime(endDate)),
				method: 'POST'
			})
				.then(({ data }) => {
          console.log(data, ' 观看时间')
          if (data.code == 0 && data.list != []) {
            for (let i = 0; i < data.list.length; i++) {
              xAxis.push(data.list[i].name)
              chartData.push(data.list[i].value)
            }
          }
          this.initwatchTimeChart(xAxis, chartData)
          this.watchtimeLoading = false
				})
				.catch(err => {
					console.log('请求失败：', err);
				});
    },
		// 观看时间
		initwatchTimeChart(xAxis, chartData) {
			var watchTimeChartOption = {
				tooltip: {
					trigger: 'axis'
					// 'formatter': '{c0}W'
        },
        color: ['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24']
				},
				yAxis: {
					type: 'value',
					name: '单位（万）',
					// min: 0,
					// max: 300,
					// interval: 100,
					show: true,
					splitLine: {
						show: true
					},
					axisLine: {
						lineStyle: {
							width: 0
						}
					}
				},
				legend: {
					right: 30,
					top: 10,
					show: true
        },
        grid: {left: '15%'},
				series: [
					{
						// name: '大江大河',
            symbol: 'none',
            center: ['70%', '35%'],
						itemStyle: {
							normal: {
								color: '#3295D9'
							}
						},
						data: chartData,
						type: 'line'
					}
				]
			};
			this.watchTimeChart = echarts.init(document.getElementById('watchTime'));
			this.watchTimeChart.setOption(watchTimeChartOption);
			window.addEventListener('resize', () => {
				this.watchTimeChart.resize();
			});
    },
    getHot () {
      let startDate = ''
      let today = new Date()
      let start = today.setDate(today.getDate() - 10)
      startDate = new Date(start)
      let endDate = new Date()
      this.$http({
				url: this.$http.adornUrl('/web/videocontent/getHotWordsStatistics/'+this.id + '/?beginDate=' + this.CurentTime(startDate) + '&endDate=' + this.CurentTime(endDate)),
				method: 'POST'
			})
				.then(({ data }) => {
          console.log(data);
          let xAxis = []
          let chartdata = []
          if (data.code === 0 && data.list != []) {
            for (let i = 0; i < data.list.length; i++) {
              xAxis.push(data.list[i].date)
              chartdata.push(data.list[i].hotWords)
            }
          }
          this.$nextTick(() => {
            this.inithotTrendChart(xAxis, chartdata)
          })
          this.hotLoading = false
				})
				.catch(err => {
					console.log('请求失败：', err);
				});
    },
		// 绘制搜索趋势
		inithotTrendChart(xAxis, chartdata) {
			var hotTrendChartOption = {
				tooltip: {
					trigger: 'axis'
					// 'formatter': '{c0}W'
        },
        color: ['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: xAxis
				},
				yAxis: {
					type: 'value',
					name: '单位（万）',
					min: 0,
					max: 30,
					interval: 10,
					show: true,
					splitLine: {
						show: true
					},
					axisLine: {
						lineStyle: {
							width: 0
						}
					}
				},
				legend: {
					right: 30,
					top: 10,
					show: true
				},
				series: [
					{
						name: name,
						symbol: 'none',
						itemStyle: {
							normal: {
								color: '#3295D9'
							}
						},
						data: chartdata,
						type: 'line'
					}
				]
			};
			this.hotTrendChart = echarts.init(document.getElementById('hotTrend'));
			this.hotTrendChart.setOption(hotTrendChartOption);
			window.addEventListener('resize', () => {
				this.hotTrendChart.resize();
			});
    },
    getMadia () {
      this.$http({
				url: this.$http.adornUrl('/web/videocontent/getPlayStatistics/'+this.id),
				method: 'POST'
			})
				.then(({ data }) => {
          console.log(data);
          // let xAxis = []
          let chartdata = []
          let char = {
            value: '',
            name: ''
          }
          if (data.code === 0 && data.list != []) {
            for (let i = 0; i < data.list.length; i++) {
              char = {
                value: data.list[i].playNumber,
                name: data.list[i].channelNameShort
              }
              chartdata.push(char)
            }
          }
          this.$nextTick(() => {
            this.initmadiaDisChart(chartdata)
          })

          this.madiaLoading = false
				})
				.catch(err => {
					console.log('请求失败：', err);
				});
    },
		// 绘制媒体分布
		initmadiaDisChart(chartdata) {
			var madiaDisChartOption = {
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
				series: [
					{
						name: '媒体分布',
						type: 'pie',
						// radius : '55%',
						radius: ['50%', '70%'],
            center: ['50%', '60%'],
            data: chartdata,
						// data: [{ value: 335, name: '腾讯' }, { value: 310, name: '爱奇艺' }, { value: 230, name: '优酷' }],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
				]
			};
			this.madiaDisCharts = echarts.init(document.getElementById('madiaDis'));
			this.madiaDisCharts.setOption(madiaDisChartOption);
			window.addEventListener('resize', () => {
				this.madiaDisCharts.resize();
			});
    },
    // 获取微博趋势数据
    getBlog () {
      let startDate = ''
      let today = new Date()
      let start = today.setDate(today.getDate() - 10)
      startDate = new Date(start)
      let endDate = new Date()
      this.$http({
				url: this.$http.adornUrl('/web/videocontent/getWeiboStatistics/'+this.id + '/?beginDate=' + this.CurentTime(startDate) + '&endDate=' + this.CurentTime(endDate)),
				method: 'POST'
			})
				.then(({ data }) => {
          console.log(data, '微博趋势');
          let xAxis = []
          let chartdata = []
          if (data.code === 0 && data.list != []) {
            for (let i = 0; i < data.list.length; i++) {
              xAxis.push(data.list[i].date)
              chartdata.push(data.list[i].weiboTrend)
            }
          }
          this.$nextTick(() => {
            this.initblogTrendChart(xAxis, chartdata)
          })
          this.blogLoading = false
				})
				.catch(err => {
					console.log('请求失败：', err);
				});
    },
		// 微博趋势绘制
		initblogTrendChart(xAxis, chartdata) {
			var blogTrendChartOption = {
				tooltip: {
					trigger: 'axis'
					// 'formatter': '{c0}W'
        },
        color: ['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: xAxis
				},
				yAxis: {
					type: 'value',
					name: '单位（万）',
					min: 0,
					max: 30,
					interval: 10,
					show: true,
					splitLine: {
						show: true
					},
					axisLine: {
						lineStyle: {
							width: 0
						}
					}
				},
				legend: {
					right: 30,
					top: 10,
					show: true
				},
				series: [
					{
						name: this.basicData.nameCn,
						symbol: 'none',
						itemStyle: {
							normal: {
								color: '#3295D9'
							}
						},
						data: chartdata,
						type: 'line'
					}
				]
			};
			this.blogTrendChart = echarts.init(document.getElementById('blogTrend'));
			this.blogTrendChart.setOption(blogTrendChartOption);
			window.addEventListener('resize', () => {
				this.blogTrendChart.resize();
			});
    },
    // 获取微博数据
    // 获取微博趋势数据
    getBlogData () {
      this.$http({
				url: this.$http.adornUrl('/web/videocontent/listWeiboTopic/'+this.id),
				method: 'POST'
			})
				.then(({ data }) => {
          if (data.code === 0 && data.result) {
            this.weiboNumSum = data.result.weiboNumSum
            this.weiboFansSum = data.result.weiboFansSum
            this.blogData = data.result.topicList
          }
          this.blogdataLoading = false
				})
				.catch(err => {
					console.log('请求失败：', err);
				});
    },
    // 获取微博趋势数据
    getWechart () {
      let startDate = ''
      let today = new Date()
      let start = today.setDate(today.getDate() - 10)
      startDate = new Date(start)
      let endDate = new Date()
      this.$http({
				url: this.$http.adornUrl('/web/videocontent/getWechatStatistics/'+this.id + '/?beginDate=' + this.CurentTime(startDate) + '&endDate=' + this.CurentTime(endDate)),
				method: 'POST'
			})
				.then(({ data }) => {
          let xAxis = []
          let chartdata = []
          if (data.code === 0 && data.list != []) {
            for (let i = 0; i < data.list.length; i++) {
              xAxis.push(data.list[i].date)
              chartdata.push(data.list[i].wechatIndex)
            }
          }
          this.$nextTick(() => {
            this.initwechartChart(xAxis, chartdata)
          })
          this.weChartLoading = false

				})
				.catch(err => {
					console.log('请求失败：', err);
				});
    },
		// 微信指数
		initwechartChart(xAxis, chartdata) {
			var wechartChartOption = {
				tooltip: {
					trigger: 'axis'
					// 'formatter': '{c0}W'
        },
        color: ['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: xAxis
				},
				yAxis: {
					type: 'value',
					name: '单位（万）',
					min: 0,
					max: 30,
					interval: 10,
					show: true,
					splitLine: {
						show: true
					},
					axisLine: {
						lineStyle: {
							width: 0
						}
					}
				},
				legend: {
					right: 30,
					top: 10,
					show: true
				},
				series: [
					{
						// name: '大江大河',
						symbol: 'none',
						itemStyle: {
							normal: {
								color: '#3295D9'
							}
						},
						data: chartdata,
						type: 'line'
					}
				]
			};
			this.wechartChart = echarts.init(document.getElementById('wechart'));
			this.wechartChart.setOption(wechartChartOption);
			window.addEventListener('resize', () => {
				this.wechartChart.resize();
			});
    },
    getBarra () {
      let startDate = ''
      let today = new Date()
      let start = today.setDate(today.getDate() - 10)
      startDate = new Date(start)
      let endDate = new Date()
      let xAxis = []
      let chartdata = []
      let iqiyiDanMu =  []
      let tencentDanMu = []
      let youkuDanMu = []
      this.$http({
				url: this.$http.adornUrl('/web/videocontent/listChannelDanMu/'+this.id + '/?beginDate=' + this.CurentTime(startDate) + '&endDate=' + this.CurentTime(endDate)),
				method: 'POST'
			})
				.then(({ data }) => {
          console.log(data, '弹幕')
          // let xAxis = []
          // let chartdata = []
          // let iqiyiDanMu =  []
          // let tencentDanMu = []
          // let youkuDanMu = []
          if (data.code === 0 && data.list != []) {
            for (let i = 0; i < data.list.length; i++) {
              xAxis.push(data.list[i].recordDate)
              iqiyiDanMu.push(data.list[i].iqiyiDanMu)
              tencentDanMu.push(data.list[i].tencentDanMu)
              youkuDanMu.push(data.list[i].youkuDanMu)
            }
          }
          this.$nextTick(() => {
            this.initwechartChart(xAxis, iqiyiDanMu, tencentDanMu, youkuDanMu)
          })
          this.barrageLoading = false
				})
				.catch(err => {
					console.log('请求失败：', err);
				});
    },
		// 弹幕信息
		initbarrageInfoChart(xAxis, iqiyiDanMu, tencentDanMu, youkuDanMu) {
			var barrageInfoChartOption = {
				tooltip: {
					trigger: 'axis'
					// 'formatter': '{c0}W'
        },
        color: ['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: xAxis
				},
				yAxis: {
					type: 'value',
					name: '单位（万）',
					min: 0,
					max: 6000,
					interval: 2000,
					show: true,
					splitLine: {
						show: true
					},
					axisLine: {
						lineStyle: {
							width: 0
						}
					}
				},
				legend: {
					right: 30,
					top: 10,
					show: true
				},
				series: [
					{
						name: '腾讯',
						symbol: 'none',
						itemStyle: {
							normal: {
								color: '#EBC84D'
							}
						},
						data: tencentDanMu,
						type: 'line'
					},
					{
						name: '爱奇艺',
						symbol: 'none',
						itemStyle: {
							normal: {
								color: '#88C36D'
							}
						},
						data: iqiyiDanMu,
						type: 'line'
					},
					{
						name: '优酷',
						symbol: 'none',
						itemStyle: {
							normal: {
								color: '#3295D9'
							}
						},
						data: youkuDanMu,
						type: 'line'
					}
				]
			};
			this.barrageInfoChart = echarts.init(document.getElementById('barrageInfo'));
			this.barrageInfoChart.setOption(barrageInfoChartOption);
			window.addEventListener('resize', () => {
				this.barrageInfoChart.resize();
			});
		},
		goPre () {
		  // console.log('===============返回上一级菜单')
		  this.$router.go(-1)
		},
		// 年龄分布
		initageDisChart(xAxis, chartdata) {
			var ageDisOption = {
				color: ['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				legend: {
					right: 30,
					top: 10,
					show: false
				},
				xAxis: [
					{
						type: 'category',
						data: xAxis,
						axisTick: {
							alignWithLabel: true
						}
					}
				],
				yAxis: [
					{
						name: '年龄分布',
						type: 'value'
					}
				],
				series: [
					{
						name: '',
						type: 'bar',
						barWidth: '20%',
						data: chartdata
					}
				]
			};
			this.ageDisChart = echarts.init(document.getElementById('ageDis'));
			this.ageDisChart.setOption(ageDisOption);
			window.addEventListener('resize', () => {
				this.ageDisChart.resize();
			});
    },
    gatAge () {
      this.$http({
				url: this.$http.adornUrl('/web/videocontent/listAgePercent/'+this.id + '/?channelId=' + ''),
				method: 'POST'
			})
				.then(({ data }) => {
          console.log(data, '年龄')
          let xAxis = []
          let chartdata = []
          if (data.code === 0 && data.list != []) {
            for (let i = 0; i < data.list.length; i++) {
              xAxis.push(data.list[i].name)
              chartdata.push(data.list[i].value)
            }
          }
          this.$nextTick(() => {
            this.initageDisChart(xAxis, chartdata)
          })

          this.ageLoading = false
				})
				.catch(err => {
					console.log('请求失败：', err);
				});
    },
    getRegion () {
      this.$http({
				url: this.$http.adornUrl('/web/videocontent/listProvincePercent/'+this.id + '/?channelId=' + ''),
				method: 'POST'
			})
				.then(({ data }) => {
          console.log('区域分布', data)
          let xAxis = []
          let chartdata = []
          if (data.code === 0 && data.list != []) {
            for (let i = 0; i < data.list.length; i++) {
              xAxis.push(data.list[i].name)
              chartdata.push(data.list[i].value)
            }
          }
          this.$nextTick(() => {
            this.initwatchRegionChart(xAxis, chartdata)
          })
          this.regionLoading = false
				})
				.catch(err => {
					console.log('请求失败：', err);
				});

    },
		// 受众地区
		initwatchRegionChart (xAxis, chartdata) {
			var watchRegionOption = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				legend: {
					right: 30,
					top: 10,
					show: false
				},
				xAxis: [
					{
						type: 'category',
						data: xAxis,
						axisTick: {
							alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: 30
            },
					}
				],
				yAxis: [
					{
						name: '区域分布',
						type: 'value',
					}
				],
				series: [
					{
						name: '',
						type: 'bar',
						barWidth: '20%',
						data: chartdata,
						itemStyle: {
							normal: {
								color: function(params) {
									let colorList = ['#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4', '#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4', '#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4', '#3fb1e3', '#6be6c1', '#a0a7e6', '#626c91', '#c4ebad', '#96dee8', '#b6a2de', '#ffb980', '#71b00a', '#588dba', '#d87a80', '#e5cf0d', '#59678c', '#588dd5', '#07a2a4']
									return colorList[params.dataIndex]
								}
							}
						}
					}
				]
			};
			this.watchRegionChart = echarts.init(document.getElementById('watchRegion'));
			this.watchRegionChart.setOption(watchRegionOption);
			window.addEventListener('resize', () => {
				this.watchRegionChart.resize();
			});
		},
		//获取影片相关信息
		getdate(){
			this.$http({
				url: this.$http.adornUrl('/web/videocontent/info/'+this.id),
				method: 'POST'
			})
				.then(({ data }) => {
          console.log(data);
          let basicData = { // 剧集基础信息
            nameCn: '',
            country: '',
            categoryName: '',
            videoNumber: '',
            rDirector: [
            ],
            rActor: [],
            releaseDate: '',
            allPlayCounts: '',
            broadcastingIndex: '',
            todayPlayNumber: '',
            releaseDays: '',
            rScriptwriter: [],
            rProducer: [],
            rType: [],
            channelInVideo: {
              first: [],
              normal: []
            },
            companyInVideo: {
              production: [],
              network: [],
              release: []
            },
            productionDate: '',
            duration: '',
            rCity: []
          }
          if (data.code === 0 && data.video) {
            basicData.nameCn = data.video.nameCn
            basicData.country = data.video.country
            basicData.categoryName = data.video.categoryName
            basicData.videoNumber = data.video.videoNumber
            basicData.releaseDate = data.video.releaseDate
            basicData.allPlayCounts = data.video.allPlayCounts
            basicData.broadcastingIndex = data.video.broadcastingIndex
            basicData.todayPlayNumber = data.video.todayPlayNumber
            basicData.releaseDays = data.video.releaseDays
            basicData.productionDate = data.video.productionDate
            basicData.duration = data.video.duration
            basicData.imageUrl = data.video.imageUrl
            basicData.channelInVideo.first = data.video.channelInVideo.first
            basicData.channelInVideo.normal = data.video.channelInVideo.normal
            basicData.companyInVideo.production = data.video.companyInVideo.production
            basicData.companyInVideo.network = data.video.companyInVideo.network
            basicData.companyInVideo.release = data.video.companyInVideo.release
            basicData.rActor = this.getArr(data.video.rActor)
            basicData.rDirector = this.getArr(data.video.rDirector)
            basicData.rProducer = this.getArr(data.video.rProducer)
            basicData.rScriptwriter = this.getArr(data.video.rScriptwriter)
            basicData.rType = this.getArr(data.video.rType)
            basicData.rCity = this.getArr(data.video.rCity)
          }
          this.basicData = basicData
          this.basicLoading = false
				})
				.catch(err => {
					console.log('请求失败：', err);
				});
    },
    // 获取今日播放量
		getTodayPlay(){
			this.$http({
				url: this.$http.adornUrl('web/videocontent/listTodayPlayNumber/'+this.id),
				method: 'POST'
			})
				.then(({ data }) => {
          if (data.code === 0 && data.list) {
            this.todayPlayData = data.list
          }
          this.todayPlayLoading = false
				})
				.catch(err => {
					console.log('请求失败：', err);
				});
    },
    // 获取设备分布信息
    getMacine(){
			this.$http({
				url: this.$http.adornUrl('/web/videocontent/listEquipmentPercent/'+this.id),
				method: 'POST'
			})
				.then(({ data }) => {
          console.log(data, '设备')
          if (data.code === 0 && data.list.length > 0) {
            this.macine = data.list
            // this.todayPlayData = data.list
            // macine: [{ name: 'PC', value: '12.75' }, { name: 'Mobile', value: '87.81' }], // 设备数据
          }
          this.todayPlayLoading = false
				})
				.catch(err => {
					console.log('请求失败：', err);
				});
    },
    getGender () {
      this.$http({
				url: this.$http.adornUrl('/web/videocontent/listGenderPercent/'+this.id),
				method: 'POST'
			})
				.then(({ data }) => {
          console.log('性别', data)
          if (data.code === 0 && data.list != []) {
            this.sexDis = data.list
            // this.todayPlayData = data.list
            // macine: [{ name: 'PC', value: '12.75' }, { name: 'Mobile', value: '87.81' }], // 设备数据
          }
          // this.todayPlayLoading = false
				})
				.catch(err => {
					console.log('请求失败：', err);
				});
    },
    // 处理用‘|’分割的数据
    getArr (str) {
      let actorList = str.split("|")
      let res = []
      let item = {
              name: '',
              id: ''
            }
      for (let a = 0; a < actorList.length; a++) {
        if (actorList[a] != '') {
          item = {
            name: actorList[a].split(',')[1],
            id: actorList[a].split(',')[0]
          }
          res.push(item)
        }
      }
      return res
    }
	},
	components: {
		headEr
		// boxOffice
	}
};
</script>

<style>
@import '../boxOffice/css/box-office.css';
@import '../boxOffice/css/shape.css';
@import '../boxOffice/css/legend.css';
@import '../boxOffice/css/color.css';
.breadcrumb-item {
	font-size: 16px;
	font-weight: 400;
	display: inline;
	/* margin-right: 27px; */
	color: #999999;
}
.breadcrumb-item-active {
	color: #3295d9;
}
* {
	margin: 0;
	padding: 0;
}
body {
	background: #f5f5f5;
}
.addicon {
	position: absolute;
	right: -325px;
	top: 13px;
}
.el-breadcrumb {
	font-size: 14px;
	line-height: 60px;
	height: 60px;
	padding-left: 20px;
}

.grid-content {
	background: #fff;
	/* padding:22px; */
	min-height: 280px;
}

.video-pictrue {
	float: left;
	width: 190px;
	height: 260px;
	padding-bottom: 1.5rem;
	margin-left: 22px;
}
.video-info {
	/* position: relative; */
	float: left;
	margin-left: 33px;
}

.video-info-list {
	float: left;
	list-style: none;
	padding: 0;
	margin: 0;
}

.video-info-list li {
	line-height: 28px;
}

.video-info-list li span:first-child {
	color: #999;
}

.video-info-list li span:last-child {
	color: #333;
}

.video-title {
	line-height: 60px;
	font-size: 24px;
}

.num-center {
	text-align: center;
	line-height: 40px;
	font-size: 30px;
	color: #3295d9;
}

.txt-center {
	text-align: center;
	line-height: 30px;
	font-size: 18px;
	color: #333;
}

.info-operate {
	text-align: right;
	height: 60px;
}

.info-operate span {
	margin-left: 30px;
}

.info-operate span img {
	margin-right: 10px;
}

.el-tabs {
	background: #fff;
}

.video-detail {
	padding-left: 15px;
}
.video-detail-list {
  /* min-width: 100%; */
	line-height: 40px;
  min-height: 40px;
	border-bottom: 1px solid #dedede;
	list-style: none;
}

.video-detail-list span:first-child {
	color: #333;
	float: left;
  text-align: left;
  min-width: 140px;
}

.video-detail-list span:last-child {
	color: #666;
	/* padding-left: 140px; */
	display: inherit;

}

a {
	cursor: pointer;
}
.title-l {
	float: left;
}
.bigbox {
	width: 80%;
	height: 28px;
	margin: 0 auto;
	margin-top: 100px;
	background-color: #a0a7e6;
	border-radius: 28px;
	display: flex;
}
.pc {
	height: 100%;
	background-color: #3fb1e3;
	border-radius: 28px;
}
.mobile {
	height: 100%;
}
.title {
	width: 80%;
	height: 28px;
	margin: 0 auto;
	margin-top: 10px;
	display: flex;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.leftIcon {
	display: inline-block;
	height: 5px;
	width: 20px;
	margin-bottom: 5px;
	background-color: #3fb1e3;
}
.rightIcon {
	display: inline-block;
	height: 5px;
	width: 20px;
	margin-bottom: 5px;
	background-color: #a0a7e6;
}
.a_blue{
	color: #3295D9;
}
.a_blue:hover{
	color: #3295D9;
}
.text_hover {
	cursor: pointer;
	display: inline-block;
}
</style>
