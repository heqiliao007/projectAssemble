<template>
  <div style="margin: 10px 57px 0;">
    <el-header style="height:135px;">
      <HeadEr></HeadEr>
    </el-header>
    <el-row>
      <el-col :span="12">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="border-left: 2px solid rgb(65, 169, 254);padding-left: 6px;"
          @click.native='gopre'>
          <el-breadcrumb-item style="font-weight: 500;" class='text_hover'>{{ leftRoute }}</el-breadcrumb-item>
          <el-breadcrumb-item>影片-{{movieName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="12">
        <div class="right">
          <div class="mores" v-if="more == false">
            <span class="back"></span>
            <span class="nocollect" v-if="iscollect == false"></span>
            <span class="collect" v-else></span>
          </div>
          <span class="more" @click="mores()">
            <img src="./img/white/classify-icon.png" alt="" v-if="more" />
            <img src="./img/blue/classify-icon.png" alt="" v-else />
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin: 50px 0 30px;">
      <span class="name">{{actorInfo.name}}</span>
      <span>
        <!-- <img src="./img/contrast.png" width="10px;" alt=""> -->
        <!-- <img src="./img/contrast.png" width="20px;" alt=""> -->
      </span>
      <!-- <span class="contrast">对比</span> -->

    </el-row>
    <el-row>
      <img :src="actorInfo.image" alt="" class="photo" @error="nofind" />
      <p class="intro">
        {{actorInfo.intro}}
        <!-- 陈建斌，1970年6月27日生于新疆维吾尔自治区乌鲁木齐市天山区。中国影视、话剧演员，电影导演，中国电视艺术家协会演员工作委员会副会长。
				<br />
				1998年从中央戏剧学院表演系研究生毕业，2002年进入国家话剧院，1993年开始参演电视剧。2003年，主演高希希的电视剧《结婚十年》，夺得第24届电视飞天奖优秀男演员奖和22届金鹰奖最受喜爱男演员奖
				[1] 。2006年凭借《乔家大院》蝉联中国电视金鹰奖观众喜爱的电视剧男演员奖 [2] 。2010年在历史剧《三国》中饰演男主角“曹操" [3]
				。2011年，主演清宫剧《后宫甄嬛传》，饰演”雍正“一角 [4] 。
				2014年，凭借自编自导自演电影《一个勺子》获得第51届台湾电影金马奖最佳新导演奖、最佳男主角奖和第30届中国电影金鸡奖最佳导演处女作奖，同时凭借电影《军中乐园》获得金马奖最佳男配角奖
				[4] 。2016年主演的谍战剧《父亲的身份》和现实题材电视剧《中国式关系》均取得了不俗收视率和口碑 [5] 。 -->
      </p>
    </el-row>
    <el-row class="titles"><span class="title">演员资料</span></el-row>
    <el-row>
      <el-col :span="8" style="padding-right: 56px;">
        <div class="item">
          <span>中文名：</span>
          <p>{{actorInfo.name}}</p>
        </div>
        <div class="item">
          <span>星座：</span>
          <p>{{actorInfo.star}}</p>
        </div>
        <div class="item">
          <span>体重：</span>
          <p>{{actorInfo.weight}}kg</p>
        </div>
        <div class="item">
          <span>毕业院校：</span>
          <p>{{actorInfo.school}}</p>
        </div>
        <div class="item unfold" style="min-height: 47px;">
          <span>主要成就：</span>
          <p>
            <a>{{actorInfo.achievement}}</a>
          </p>
          <!-- <p>
						第51届
						<a>台湾电影金马奖</a>
						最佳男主角
					</p> -->
          <!-- <a class="open" @click="open()">
						<i class="el-icon-arrow-down"></i>
						展开
					</a> -->
          <div style="">
            <el-collapse-transition>
              <!-- <div v-show="show3">
								<p>
									第51届
									<a>台湾电影金马奖</a>
									最佳男配角
								</p>
								<p>
									第51届
									<a>台湾电影金马奖</a>
									最佳新导演
								</p>
							</div> -->
            </el-collapse-transition>
          </div>
        </div>
      </el-col>
      <el-col :span="8" style="padding: 0 28px;">
        <div class="item">
          <span>国籍：</span>
          <p>{{actorInfo.nationality}}</p>
        </div>
        <div class="item">
          <span>血型：</span>
          <p>{{actorInfo.bloodType}}型</p>
        </div>
        <div class="item">
          <span>出生地：</span>
          <p>{{actorInfo.birthplace}}</p>
        </div>
        <div class="item">
          <span>配偶：</span>
          <p><a>{{actorInfo.partner}}</a></p>
        </div>
        <div class="item">
          <span>经纪公司：</span>
          <p><a>{{actorInfo.talentAgency}}</a></p>
        </div>
      </el-col>
      <el-col :span="8" style="padding-Left: 56px;">
        <div class="item">
          <span>民族：</span>
          <p>{{actorInfo.nation}}</p>
        </div>
        <div class="item">
          <span>身高：</span>
          <p>{{actorInfo.stature}}</p>
        </div>
        <div class="item">
          <span>出生日期：</span>
          <p>{{actorInfo.birthday}}</p>
        </div>
        <!-- <div class="item">
          <span>代表作品：</span>
          <p>
            <a v-for="reprework in actorInfo.listWorks" :key='reprework'>{{reprework + '、'}}</a>
          </p>
        </div> -->
      </el-col>
    </el-row>
    <el-row class="titles"><span class="title">主要作品：</span></el-row>
    <el-row class="secondary" style="margin-left: 20px;">参演电视剧</el-row>
    <el-row style="margin-left: 20px;border-bottom: 1px solid #BCBCBC;margin-bottom: 30px;">
      <div class="moves" v-for="(tvinfo, index) in teleplays" :key='index'>
        <img style="width:140px; height:170px;" :src="tvinfo.image_url" alt="" @error="nofind">
        <div>
          <p class="move-name"><a>{{tvinfo.video_name}}</a></p>
          <p>饰演： {{tvinfo.role_name}}</p>
          <p>导演： <span v-for="item in tvinfo.directors" :key="item.staff_id">{{item.staff_name}}</span></p>
          <p style='line-height: 26px;'>主演： <span v-for="item in tvinfo.protagonists" :key="item.staff_id">{{item.staff_name}}</span></p>
        </div>
      </div>
      <div class="page" style="text-align: right;line-height: 35px;margin-top: -35px;">
        {{page1+'/'+alltotal}}
        <el-pagination style="display: inline-block;" :page-size="6" :total="total1" :current-page="page1"
          @current-change="handleCurrentChange1" layout="prev, next">
        </el-pagination>
      </div>
    </el-row>
    <el-row class="secondary" style="margin-left: 20px;">参演电影</el-row>
    <el-row style="">
      <div class="moves" v-for="movieinfo in movies" :key='movieinfo'>
        <img style="width:140px; height:170px;" :src="movieinfo.image" alt="" @error="nofind">
        <div>
          <p class="move-name"><a>{{movieinfo.movie_name}}</a></p>
          <p>饰演： {{movieinfo.role_name}}</p>
          <p>导演： <span v-for="item in movieinfo.directors" :key="item.staff_id">{{item.staff_name}}</span></p>
          <p style='line-height: 26px;'>主演： <span v-for="item in movieinfo.protagonists" :key="item.staff_id">{{item.staff_name}}</span></p>
        </div>
      </div>
      <div class="page" style="text-align: right;line-height: 35px;margin-top: -35px;">
        {{page2+'/'+alltotal2}}
        <el-pagination style="display: inline-block;" :page-size="6" :total="total2" :current-page="page2"
          @current-change="handleCurrentChange2" layout="prev,next">
        </el-pagination>
      </div>
    </el-row>
    <el-row class="titles"><span class="title">获奖记录</span></el-row>
    <div v-for="(win, index) in award" :key="index">
      <el-row class="secondary" style="margin-left: 20px;">{{win.prize}}</el-row>
      <el-row class="lists">
        <ul v-for="(winitem, i) in win.datas" :key="i">
          <li>• {{winitem.detail}}<!-- <a>{{winitem.name}}</a> <a>{{winitem.work}}</a>（{{winitem.result}}） -->
          </li>
        </ul>
      </el-row>
    </div>
    <el-row class="titles"><span class="title">历史代言</span></el-row>
    <el-row style="margin-left: 20px;">
      <div class="moves" v-for="(endorsementInfo, index) in endorsement" :key="index">
        <img style="width:140px; height:170px;" :src="endorsementInfo.image" alt="" @error="nofind">
        <div>
          <p class="move-name"><a>{{endorsementInfo.goods}}</a></p>
          <p>代言类型： {{endorsementInfo.type_name}}</p>
          <p>代言产品： {{endorsementInfo.goods}}</p>
          <!-- <p style='line-height: 26px;'>： {{endorsementInfo.mainactor}}</p> -->
        </div>
      </div>
      <div class="page" style="text-align: right;line-height: 35px;margin-top: -35px;">
        {{page3+'/'+alltotal3}}
        <el-pagination style="display: inline-block;" :page-size="6" :total="total3" :current-page="page3"
          @current-change="handleCurrentChange3" layout="prev, next">
        </el-pagination>
      </div>
    </el-row>
    <!-- <el-row class="titles"><span class="title">舆情信息</span></el-row> -->
    <el-row style="margin-left: 20px;">
      <el-col :span="12" style="padding-right: 76px;" v-for="(item, index) in actorInfo.opintionList" :key='index'>
        <div class="item">
          <p class="public">{{item.date}} <span>{{item.title}}</span></p>
        </div>
      </el-col>
    </el-row>
    <el-row class="titles"><span class="title">热度指数</span></el-row>
    <el-row>
      <span>日期</span>
      <el-date-picker size="mini" v-model="value1" type="daterange" range-separator="-" start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button size="mini" type="primary" @click="getheat()">查询</el-button>
    </el-row>
    <el-row style="width: 100%;overflow-x: auto;">
      <div style="height:400px;background: #ffffff;margin: 15px 15px 0 0;min-width: 100%;" id="hotRate" v-loading='hotRateLoading'></div>
    </el-row>
    <el-row class="titles"><span class="title">商业价值指数</span></el-row>
    <el-row>
      <span>日期</span>
      <el-date-picker size="mini" v-model="value2" type="daterange" range-separator="-" start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button size="mini" type="primary" @click="getbusiness()">查询</el-button>
    </el-row>
    <el-row style="width: 100%;overflow-x: auto;">
      <div style="height:400px;background: #ffffff;margin: 15px 15px 15px 0;min-width: 100%;" id="bussinessRate"
        v-loading='bussinessLoading'></div>
    </el-row>
  </div>
</template>
<script>
  import echarts from 'echarts';
  import HeadEr from '../recommend/home';
  import moment from 'moment';
  export default {
    name: 'actor',
    data() {
      return {
        basicImg: '', // 图片找不到的时候，显示默认图片
        leftRoute: '', // 路由呆参==上一级目录名称
        movieName: '', // 路由呆参===电影名称
        actorInfo: {},
        // actorData: [],
        id: '', // 路由呆参 === 演员id
        value1: [new Date(), this.getDateStr(15)],
        value2: [new Date(), this.getDateStr(15)],
        teleplays: [],
        movies: [],
        endorsement: [],
        award: [],
        total1: 0,
        alltotal: 1,
        page1: 1,
        alltotal2: 1,
        page2: 1,
        total2: 0,
        alltotal3: 1,
        page3: 1,
        total3: 0,
        hotRate: null,
        hotRateLoading: true,
        bussinessRate: null,
        bussinessLoading: true,
        show3: false,
        more: true,
        iscollect: false
      };
    },
    watch: {},
    created() {},
    mounted() {
      this.leftRoute = this.$route.query.lastmenu
      this.id = this.$route.query.id
      this.movieName = this.$route.query.movie
      // console.log(this.$route, '-------------------')
      this.getbasis()
      this.getteleplays()
      this.getmovies()
      this.getaward()
      this.getendorsement()
      this.getheat()
      this.getbusiness()
    },
    components: {
      HeadEr
    },
    methods: {
      getDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);
        return dd;
      },
      //获取基础信息
      getbasis() {
        this.$http({
            url: this.$http.adornUrl('web/actordetailpage/getBasicInfo?actorId=' + this.id),
            method: 'POST'
          })
          .then(({
            data
          }) => {
            this.actorInfo = data.data
          });
      },
      //获取参演电视剧
      getteleplays() {
        this.$http({
            url: this.$http.adornUrl('web/actordetailpage/getMasterWorksOfTeleplay?actorId=1845866&size=6&current=' +
              this.page1),
            method: 'POST'
          })
          .then(({
            data
          }) => {
            this.teleplays = data.page.records
            this.alltotal = data.page.pages
            this.total1 = data.page.total-0
          });
      },
      //参演电视剧翻页
      handleCurrentChange1(val) {
        this.page1 = val
        this.getteleplays()
      },
      //获取参演电影
      getmovies() {
        this.$http({
            url: this.$http.adornUrl('web/actordetailpage/getMasterWorksOfMovie?actorId='+ this.id+'&size=6&current=' +
              this.page2),
            method: 'POST'
          })
          .then(({
            data
          }) => {
            this.movies = data.page.records
            this.alltotal2= data.page.pages
            this.total2 = data.page.total-0
          });
      },
      //参演电影翻页
      handleCurrentChange2(val) {
        this.page2 = val
        this.getmovies()
      },
      //获取获奖记录
      getaward() {
        this.$http({
            url: this.$http.adornUrl('web/actordetailpage/getWinningRecord?actorId='+ this.id+'&size=9999'),
            method: 'POST'
          })
          .then(({
            data
          }) => {
            for (var i = 0; i < data.page.records.length; i++) {
              if (this.award.length == 0) {
                this.award.push({
                  prize: data.page.records[i].prize,
                  datas: [data.page.records[i]]
                })
              } else {
                for (var j = 0; j < this.award.length; j++) {
                  if (this.award[j].prize == data.page.records[i].prize) {
                    this.award[j].datas.push(data.page.records[i])
                    break;
                  } else if (j == this.award.length - 1) {
                    this.award.push({
                      prize: data.page.records[i].prize,
                      datas: [data.page.records[i]]
                    })
                  }
                }
              }
            }
          });
      },
      //获取历史代言
      getendorsement() {
        this.$http({
            url: this.$http.adornUrl('web/actordetailpage/getRepresentRecord?actorId='+ this.id+'&size=6&current=' + this.page3),
            method: 'POST'
          })
          .then(({
            data
          }) => {
            this.endorsement = data.page.records
            this.alltotal3 = data.page.pages
            this.total3 = data.page.total-0
          });
      },
      //历史代言翻页
      handleCurrentChange3(val) {
        this.page3 = val
        this.getmovies()
      },
      //获取热度指数数据
      getheat() {
        this.hotRateLoading = true;
        this.$http({
            url: this.$http.adornUrl('web/actordetailpage/getHeatIndex?actorId='+ this.id+'&size=999999&starDate=' + moment(
              this.value1[0]).format('YYYY-MM-DD') + '&endDate=' + moment(this.value1[1]).format('YYYY-MM-DD')),
            method: 'POST'
          })
          .then(({
            data
          }) => {
            var x = [],
              datas = []
            for (var i = 0; i < data.page.records.length; i++) {
              x.push(data.page.records[i].date)
              datas.push(data.page.records[i].heatIndex)
            }
            document.getElementById('hotRate').style.width = x.length * 100 + 'px';
            this.initHot(x, datas)
          });
      },
      //获取商业指数数据
      getbusiness() {
        this.bussinessLoading = true;
        this.$http({
            url: this.$http.adornUrl('web/actordetailpage/getBusinessValueIndex?actorId='+ this.id+'&size=999999&starDate=' +
              moment(this.value2[0]).format('YYYY-MM-DD') + '&endDate=' + moment(this.value2[1]).format(
                'YYYY-MM-DD')),
            method: 'POST'
          })
          .then(({
            data
          }) => {
            var x = [],
              datas = []
            for (var i = 0; i < data.page.records.length; i++) {
              x.push(data.page.records[i].date)
              datas.push(data.page.records[i].businessValue)
            }
            document.getElementById('bussinessRate').style.width = x.length * 100 + 'px';
            this.initBussiness(x, datas)
          });
      },
      //获取默认图
      getBasePic() {
        let _this = this
        let label = 'staff'
        _this.$http({
          url: _this.$http.adornUrl('/web/sysdict/defaultPic?label=' + label),
          method: 'POST',
          data: _this.$http.adornData({
            'label': label
          })
        }).then(({
          data
        }) => {
          this.basicImg = data.url
          // if (data.code === 0 && data.page.records.length > 0) {
          //   _this.weekshowList = data.page.records
          // }
        })
      },
      // 找不到图片的时候
      nofind() {
        var img = event.srcElement;
        img.src = this.basicImg;
        img.onerror = null; // 控制不要一直跳动
      },
      gopre() {
        this.$router.go(-1)
      },
      initHot(date, data) {
        let option = {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            bottom: '5%',
            right: '50',
            left: '50',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: date
          },
          yAxis: {
            type: 'value',
            min: 1,
            // max: 10,
            // interval: 2
          },
          series: [{
            data: data,
            type: 'line'
          }]
        };
        this.hotRate = echarts.init(document.getElementById('hotRate'));
        this.hotRate.setOption(option, true);
        window.addEventListener('resize', () => {
          this.hotRate.resize();
        });
        this.hotRateLoading = false;
      },
      initBussiness(date, data) {
        let option = {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            bottom: '5%',
            right: '50',
            left: '50',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: date
          },
          yAxis: {
            type: 'value',
            min: 1,
            // max: 10,
            // interval: 2
          },
          series: [{
            data: data,
            type: 'line'
          }]
        };
        this.bussinessRate = echarts.init(document.getElementById('bussinessRate'));
        this.bussinessRate.setOption(option, true);
        window.addEventListener('resize', () => {
          this.bussinessRate.resize();
        });
        this.bussinessLoading = false;
      },
      open() {
        var btn = document.getElementsByClassName('open')[0]
        if (this.show3 == true) {
          btn.innerHTML = '<i class="el-icon-arrow-down"></i>展开'
        } else {
          btn.innerHTML = '<i class="el-icon-arrow-up"></i>收起'
        }
        this.show3 = !this.show3
      },
      mores() {
        this.more = !this.more;
      }
    }
  };
</script>
<style scoped>
  .item {
    padding-top: 7px;
    line-height: 40px;
    border-bottom: 1px solid #e0e0e0;
    position: relative;
    margin-left: 20px;
  }

  .item:hover {
    border-bottom: 1px solid #399bff;
  }

  .item:hover::after {
    content: '';
    position: absolute;
    top: 18px;
    left: -19px;
    display: block;
    width: 4px;
    height: 20px;
    background: #399bff;
  }

  .item span {
    position: absolute;
    top: 7px;
    left: 0;
    display: inline-block;
    width: 90px;
    font-size: 14px;
    font-family: SimSun;
    font-weight: bold;
    color: rgba(76, 76, 76, 1);
  }

  .item p {
    margin: 0 0 0 90px;
    display: inline-block;
    width: calc(100% - 94px);
    font-size: 12px;
    font-family: SimSun;
    color: rgba(76, 76, 76, 1);
    line-height: 40px;
  }

  .item p a {
    color: #399bff;
    cursor: pointer;
  }

  .item p a:hover {
    text-decoration: none;
  }

  .item:hover .public span {
    color: #0084CF;
  }

  .item .public {
    font-size: 12px;
    font-family: SimSun;
    font-weight: 400;
    color: #4C4C4C;
    margin: 0;
    width: auto;
  }

  .item .public span {
    position: initial;
    width: auto;
    font-size: 12px;
    font-weight: 400;
    display: inline-block;
    margin-left: 20px;
  }
</style>
<style>
  body {
    background: #ededed;
  }

  .text_hover {
    cursor: pointer;
    display: inline-block;
  }

  .right {
    float: right;
    padding-right: 94px;
  }

  .more {
    display: inline-block;
    cursor: pointer;
    height: 24px;
    line-height: 24px;
    vertical-align: middle;
  }

  .mores {
    display: inline-block;
    margin-right: 17px;
    height: 24px;
    line-height: 24px;
    vertical-align: middle;
  }

  .mores span {
    cursor: pointer;
    display: inline-block;
  }

  .back {
    width: 24px;
    height: 25px;
    margin-right: 9px;
    background: url(./img/white/transmit-icon.png);
  }

  .back:hover {
    background: url(./img/blue/transmit-icon.png);
  }

  .nocollect {
    width: 47px;
    height: 23px;
    background: url(./img/white/collect-icon.png);
  }

  .nocollect:hover {
    background: url(./img/blue/collect-icon.png);
  }

  .collect {
    width: 47px;
    height: 23px;
    background: url(./img/blue/collect-icon.png);
  }

  .name {
    display: inline-block;
    margin-right: 27px;
    font-size: 30px;
    font-family: SourceHanSansCN-Bold;
    font-weight: bold;
  }

  .contrast {
    font-size: 12px;
    font-family: SimSun;
    font-weight: 400;
    color: rgba(0, 132, 207, 1);
  }

  .photo {
    display: inline-block;
    width: 196px;
    /* height: 266px; */
    margin-right: 30px;
    background: #000000;
    vertical-align: top;
  }

  .intro {
    margin-top: 35px;
    margin-bottom: 0;
    display: inline-block;
    width: calc(100% - 230px);
    font-size: 14px;
    font-family: SimSun;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 26px;
  }

  .titles {
    margin: 20px 0;
  }

  .title {
    font-size: 18px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(76, 76, 76, 1);
    position: relative;
  }

  .title::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    display: block;
    width: 45px;
    height: 2px;
    background: rgba(64, 169, 255, 1);
  }

  .unfold>a {
    position: absolute;
    bottom: 10px;
    right: 0;
    font-size: 12px;
    color: #399bff;
    cursor: pointer;
    line-height: initial;
  }

  .secondary {
    font-size: 14px;
    font-family: SimSun;
    font-weight: 400;
    color: rgba(76, 76, 76, 1);
    position: relative;
    margin-bottom: 28px;
    margin-left: 20px;
  }

  .secondary::after {
    content: '';
    position: absolute;
    top: -1px;
    left: -19px;
    display: block;
    width: 4px;
    height: 20px;
    background: #399bff;
  }

  .moves {
    height: 170px;
    width: 33%;
    display: inline-block;
    margin-bottom: 80px;
    overflow: hidden;
    position: relative;
    padding-left: 140px;
    vertical-align: top;
  }

  .moves img {
    position: absolute;
    display: inline-block;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 1);
    vertical-align: top;
  }

  .moves div {
    display: inline-block;
    margin-left: 26px;
  }

  .moves p {
    margin: 0 26px 10px 0;
    font-size: 12px;
    font-family: SimSun;
    color: #4C4C4C;
  }

  .moves .move-name {
    margin: 0 0 28px;
    font-weight: bold;
  }

  .move-name a {
    font-size: 16px;
    color: rgba(0, 132, 207, 1);
    padding-right: 6px;
  }

  .move-name a:hover {
    text-decoration: none;
    cursor: pointer;
  }

  .lists {
    margin-bottom: 27px;
    font-size: 12px;
    font-family: SimSun;
    color: #4C4C4C;
    line-height: 30px;
    margin-left: 20px;
    border-bottom: 1px solid #BCBCBC;
  }

  .lists ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .lists a {
    color: #0084CF;
  }

  .lists a:hover {
    text-decoration: none;
  }

  .el-pagination button.disabled {
    padding: 0;
    text-align: center;
    height: 35px;
    width: 35px;
    border: 1px solid #BFBFBF;
  }

  .el-pagination .btn-next,
  .el-pagination .btn-prev {
    margin-left: 10px;
    padding: 0;
    text-align: center;
    height: 35px;
    width: 35px;
    border: 1px solid #BFBFBF;
  }

  .el-pagination .btn-next:hover,
  .el-pagination .btn-prev:hove {
    border: 1px solid #409EFF;
  }
</style>
