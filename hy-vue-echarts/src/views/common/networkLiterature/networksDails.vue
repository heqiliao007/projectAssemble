<template>
	<div style="width: 97%;">
		<div class="netwoeksDails" v-loading='loading' style="width: 97%;">
			<p class="title_header">
				<span style="margin-right: 3px;" @click="goPre" class='text_hover'>{{lastmenu}}</span>
				<i class="iconfont iconarrow-right-copy-copy"></i>
				<span>作品类别 - {{pageinfo.type_names}} - {{pageinfo.name}}</span>
			</p>
      <p style="text-align: right; width: 90%; margin: 0 auto; ">
        <i class="iconfont iconbianji"></i>编辑
        <i class="iconfont iconzhuanfa"></i>转发
        <i class="iconfont iconshoucang"></i>收藏
      </p>
			<p>
				<span style="color: #353535; font-size: 30px; font-weight: 700;">{{pageinfo.name}}</span>
				<!-- <span style="color: #0084CF; font-size: 12px; margin-left: 10px;">对比 <i class="iconfont iconhistogram"></i></span> -->
			</p>
			<p><span style="display: inline-block;background: #0084cf;margin-right: 20px;line-height: 20px;padding: 0 12px;color: #ffffff;">标签-1</span><span style="display: inline-block;background: #0084cf;margin-right: 20px;line-height: 20px;padding: 0 12px;color: #ffffff;">标签-1</span></p>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="infoleft">
            <div class="info-pic">
              <img style="width: 100%; height:100%;" :src="pageinfo.image" alt="" @error="nofind">
            </div>
            <div style="border-right: 1px solid #CDCDCD; line-height: 30px; overflow: hidden;word-wrap:break-word">
              <el-row :gutter="20" style="">
                <el-col :span="9" style="color: #A3A3A3;">作者</el-col>
                <el-col :span="13" style="color: #4a4a4a;">{{pageinfo.author_name}}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="9" style="color: #A3A3A3;">作品类型</el-col>
                <el-col :span="13" style="color: #4a4a4a;">{{pageinfo.type_names}}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="9" style="color: #A3A3A3;">签约平台</el-col>
                <el-col :span="13" style="color: #4a4a4a;">{{pageinfo.platform_names}}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="9" style="color: #A3A3A3;">是否付费</el-col>
                <el-col :span="13" style="color: #4a4a4a;">{{pageinfo.charge == '1'? '收费' : '免费'}}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="9" style="color: #A3A3A3;">连载状态</el-col>
                <el-col :span="13" style="color: #4a4a4a;">{{pageinfo.state == '2' ? '连载中' : '完结'}}</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="5" style="margin-left: 20px;">
          <el-row
            class="zhishubox"
            :class="activeBox == '1' ? 'activebox' : ''"
            >
            <img class="zhishutupian" v-show="activeBox != '1'" src="./img/zongzishu_gray.png">
            <img class="zhishutupian" v-show="activeBox == '1'" src="./img/zongzishu.png">
            <div class="zhishuwenzi"
            @mouseover="handleMouse('1')"
        	  @mouseleave="mouseLeave"
            >
            <span style="white-space:nowrap; font-size: 24px; text-align: center;">
              <span style="color: #0084CF; font-size: 50px; font-weight: 700;">{{Math.floor(pageinfo.word/10000 * 100) / 100}}</span>万
            </span>

              <p>
                总字数
              </p>
            </div>
          </el-row>
          <!-- <el-row class="zhishubox" :class="activeBox == '2' ? 'activebox' : ''">
            <img class="zhishutupian" v-show="activeBox != '2'" src="./img/zhoutuijian_gray.png" alt="">
            <img class="zhishutupian" v-show="activeBox == '2'" src="./img/zhoutuijian.png" alt="">
            <div
              class="zhishuwenzi"
              @mouseover="handleMouse('2')"
        	    @mouseleave="mouseLeave"
              style="white-space : normal nowrap;"
              >
              <span style="color: #CF0000; font-size: 50px; font-weight: 700; white-space:nowrap;">{{ Math.floor(pageinfo.week_recommendation / 10000 * 100) / 100}}</span>
              <span style='font-size: 24px; text-align: center; white-space:nowrap;'>万</span>
              <p>
                周推荐
              </p>
            </div>
          </el-row> -->
        </el-col>
        <el-col :span="4" style="margin-left: 40px;">
          <el-row class="zhishubox" :class="activeBox == '3' ? 'activebox' : ''">
            <img class="zhishutupian" v-show="activeBox != '3'" src="./img/zhoudianji_gray.png" alt="">
            <img class="zhishutupian" v-show="activeBox == '3'" src="./img/zhoudianji.png" alt="">
            <div class="zhishuwenzi"
              @mouseover="handleMouse('3')"
        	    @mouseleave="mouseLeave"
              style="white-space: nowrap;"
            >
              <span style="color: #14BDB3; font-size: 50px; font-weight: 700;">{{Math.floor(pageinfo.week_hits / 10000 * 100 )/100}}</span>
              <span style='font-size: 24px; text-align: center;'>万</span>
              <p>
                浏览量总和
              </p>
            </div>
          </el-row>
          <!-- <el-row class="zhishubox" :class="activeBox == '4' ? 'activebox' : ''">
            <img class="zhishutupian" v-show="activeBox != '4'" src="./img/yuetuijian_gray.png" alt="">
            <img class="zhishutupian" v-show="activeBox == '4'" src="./img/yuetuijian.png" alt="">
            <div
            class="zhishuwenzi"
            @mouseover="handleMouse('4')"
        	  @mouseleave="mouseLeave"
            style="white-space : nowrap;"
            >
              <span style="color: #EAB600; font-size: 50px; font-weight: 700;">{{Math.floor(pageinfo.month_recommendation / 10000 * 100) / 100}}</span>
              <span style='font-size: 24px; text-align: center;'>万</span>
              <p>
                月推荐
              </p>
            </div>
          </el-row> -->
        </el-col>
        <el-col :span="4" style="margin-left: 40px;">
          <el-row class="zhishubox" :class="activeBox == '5' ? 'activebox' : ''">
            <img class="zhishutupian" v-show="activeBox != '5'" src="./img/yuedianji_gray.png" alt="">
            <img class="zhishutupian" v-show="activeBox == '5'" src="./img/yuedianji.png" alt="">
            <div class="zhishuwenzi"
            @mouseover="handleMouse('5')"
        	  @mouseleave="mouseLeave"
            style="white-space: nowrap;"
            >
              <span style="color: #63D84C; font-size: 50px; font-weight: 700;">{{pageinfo.comment}}</span>
              <!-- <span style='font-size: 24px; text-align: center;'>万</span> -->
              <p>
                总评论量
              </p>
            </div>
          </el-row>
          <!-- <el-row class="zhishubox" :class="activeBox == '6' ? 'activebox' : ''">
            <img class="zhishutupian" v-show="activeBox != '6'" src="./img/fensi_gray.png" alt="">
            <img class="zhishutupian" v-show="activeBox == '6'" src="./img/fensi.png" alt="">
            <div class="zhishuwenzi"
            @mouseover="handleMouse('6')"
        	  @mouseleave="mouseLeave"
            style="white-space: nowrap;">
              <span style="color: #B451CA; font-size: 50px; font-weight: 700;">{{Math.floor(pageinfo.fans / 10000 *100) / 100}}</span>
              <span style='font-size: 24px; text-align: center;'>万</span>
              <p>
                粉丝数
              </p>
            </div>
          </el-row> -->
        </el-col>
      </el-row>
      <div>
        <p style="font-size: 18px; color: #4C4C4C;">作品信息
				</p>
				<p style="width: 45px; border-bottom: 2px solid #40A9FF; margin-top: -10px;"></p>
        <div style="border-bottom: 1px solid #E0E0E0; padding-left: 20px;">
          <!-- 紫月升起之夜，时代颠覆之时。 -->
          <p>
            <!-- 茫茫黑暗中，灭亡倒计时开始... -->
            {{pageinfo.info}}
          </p>
          <!-- <p>书友群：627900916</p> -->
        </div>
      </div>
      <el-row class="row-bg" :gutter="24">
        <el-col :span="8">
          <div class="zuopininfobox" style="text-align: center;">
            <img class="zuopininfopic" src="./img/dianjizhishu.png" alt="">
            <p style="white-space: nowrap;">
              <span style="color: #0084CF; font-size: 45px; font-weight: 700;">
                {{Math.floor(pageinfo.hits / 10000 * 100) / 100}}
              </span>
              <span>万</span>
            </p>
            <span style="margin-left: -10px;">月票</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="zuopininfobox" style="text-align: center;">
            <img class="zuopininfopic" src="./img/tuijianzhishu.png" alt="">
            <p style="white-space: nowrap;">
              <span style="color: #0084CF; font-size: 45px; font-weight: 700; white-space: nowrap;">
                {{Math.floor(pageinfo.recommendation / 10000 * 100) / 100}}
              </span>
              <span>万</span>
            </p>
            <span style="margin-left: -10px;">浏览量总和</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="zuopininfobox" style="text-align: center;">
            <img class="zuopininfopic" src="./img/pinglunzhishu.png" alt="">
            <p style="white-space: nowrap;">
              <span style="color: #0084CF; font-size: 45px; font-weight: 700;">
                {{pageinfo.comment}}
              </span>
              <!-- <span>万</span> -->
            </p>
            <span style="margin-left: -10px;">总评论量</span>
          </div>
        </el-col>
      </el-row>
      <div style="margin-top: 30px;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- <el-tab-pane label="月票" name="first">
            <div class="chartBox">
              <div>
                <span>月票</span>
              </div>
              <div></div>
            </div>
          </el-tab-pane> -->
          <el-tab-pane label="点击数" name="点击数">
            <div class="chartBox">
              <div>
                <span style="font-weight: 700;">点击数</span>
                <el-dropdown @command='handleChooseType' style='margin-left: 10px; border: 1px solid #ccc; background-color: #fff; width: 100px; text-align: center; line-height: 30px;'>
                  <span class="el-dropdown-link">
                    {{dateChoose}}<i class="iconfont iconsanjiaoxing" style="margin-left: 40px;"></i>
                  </span>
                  <!-- 本周， 本年， 全部 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                    :command="item.label"
                    v-for="item in weekoptions"
                    :key="item.value">{{item.label}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <!-- 点击数的图表 -->
              <div id="clickChart" style="height: 400px"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="推荐数" name="推荐数">
            <div class="chartBox">
              <div class="charttitle">
                <span style="font-weight: 700;">推荐数</span>
                <el-dropdown @command='handleChooseType' style='margin-left: 10px; border: 1px solid #ccc; background-color: #fff; width: 100px; text-align: center; line-height: 30px;'>
                  <span class="el-dropdown-link">
                    {{dateChoose}}<i class="iconfont iconsanjiaoxing" style="margin-left: 40px;"></i>
                  </span>
                  <!-- 本周， 本年， 全部 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                    :command="item.label"
                    v-for="item in weekoptions"
                    :key="item.value">{{item.label}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div id="recommendChart" style="height: 400px"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="粉丝数" name="粉丝数">
            <div class="chartBox">
              <div>
                <span style="font-weight: 700;">粉丝数</span>
                <el-dropdown @command='handleChooseType' style='margin-left: 10px; border: 1px solid #ccc; background-color: #fff; width: 100px; text-align: center; line-height: 30px;'>
                  <span class="el-dropdown-link">
                    {{dateChoose}}<i class="iconfont iconsanjiaoxing" style="margin-left: 40px;"></i>
                  </span>
                  <!-- 本周， 本年， 全部 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                    :command="item.label"
                    v-for="item in weekoptions"
                    :key="item.value">{{item.label}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div id="fansChart" style="height: 400px"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="评论数" name="评论数">
            <div class="chartBox">
              <div>
                <span style="font-weight: 700;">评论数</span>
                <el-dropdown @command='handleChooseType' style='margin-left: 10px; border: 1px solid #ccc; background-color: #fff; width: 100px; text-align: center; line-height: 30px;'>
                  <span class="el-dropdown-link">
                    {{dateChoose}}<i class="iconfont iconsanjiaoxing" style="margin-left: 40px;"></i>
                  </span>
                  <!-- 本周， 本年， 全部 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                    :command="item.label"
                    v-for="item in weekoptions"
                    :key="item.value">{{item.label}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div id="commentChart" style="height: 400px"></div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
		</div>
	</div>
</template>

<script>
  // import HeadEr from '../recommend/home'
  import picture from "./img/basic.png";
  import echarts from 'echarts'
	export default {
		data () {
			return {
        loading: true,
        basicImg: '', // 图片找不到的时候，显示默认图片
        lastmenu: '', // 上级菜单的名字
        productid: '', // 产品id-请求数据
        literaryid: '1', // 请求作品详情时需要传递的参数
        pageinfo: {
          author_name: '', // 作者姓名
          type_names: '', // 作品类型
          platform_names: '', // 签约平台
          charge: '', // 是否付费2是不收费，1是收费
          state: '', // 连载状态0是连载，1是完结
          word: '', // 总字数
          week_hits: '', // 周点击
          month_hits: '', // 月点击
          week_recommendation: '', // 周推荐
          month_recommendation: '', // 月推荐
          fans: '', // 粉丝数
          hits: '', // 点击指数
          recommendation: '', // 推荐指数
          comment: '', // 评论指数
          info: '', // 信息
          image: ''
        },
        activeBox: '',
        picture: picture,
        activeName: '点击数',
        dateChoose: '本周', // 选择时间显示
        dateType: '0', // 日期类型（近七天0/本年2/全部3）
        startDate: '2019-5-16', // 	作品的开始日期（2019-5-16）
        indexType: '1', // 指数类型（月票0/点击1/推荐2/粉丝3/评论4）
        weekoptions: [
          {label: '本周', value: '1'},
          {label: '本年', value: '2'},
          {label: '全部', value: '3'}
        ],
        chartLine: null, // 图表
        chartData: [
          {date: '2019-5-17', data: '0'},
          {date: '2019-5-18', data: '47.8729'},
          {date: '2019-5-19', data: '8.933'},
          {date: '2019-5-20', data: '218.0624'},
          {date: '2019-5-21', data: '481.6265'},
          {date: '2019-5-22', data: '581.6265'},
          {date: '2019-5-23', data: '218.0624'}
        ],
        xAxis: [],
        activeChart: 'clickChart'
        // chartData: ['0', '47.8729', '8.933', '218.0624', '218.0624', '481.6265', '581.6265']
			}
		},
		components: {
		  // HeadEr
    },
    mounted() {
      console.log(this.$route.query.id, '==============作品id')
      this.literaryid = this.$route.query.id || '2'
      this.lastmenu = this.$route.query.lastmenu || ''
      this.getcookie()
      this.getData() // 详情信息接口-已经调通
      this.getBasePic() // 获取默认图片
      // this.getChartData() // 获取chart数据
    },
    methods: {
      getBasePic () {
        let _this = this
        let label = 'staff'
        _this.$http({
          url: _this.$http.adornUrl('/web/sysdict/defaultPic?label=' + label),
          method: 'POST',
          data: _this.$http.adornData({
            'label': label
          })
        }).then(({data}) => {
          console.log(data, '默认图=====================')
          this.basicImg = data.url
          // if (data.code === 0 && data.page.records.length > 0) {
          //   _this.weekshowList = data.page.records
          // }
        })
      },
      // 返回上一级菜单
      goPre () {
        // console.log('===============返回上一级菜单')
        this.$router.go(-1)
      },
      // 找不到图片的时候
      nofind () {
        var img = event.srcElement;
        img.src = this.basicImg;
        img.onerror = null; // 控制不要一直跳动
      },
      // 获取缓存的产品id
      getcookie () {
        this.productid=this.$cookie.get('productid')
        if(this.productid==null){
          this.productid='9'
        }
      },
      // 获取作评详情/web/webliterary/getDetailsByWork/{productid}/{literaryid}
      getData () {
        let _this = this
        _this.$http({
          url: _this.$http.adornUrl('/web/webliterary/getDetailsByWork/'+_this.productid + '/' + _this.literaryid),
          method: 'POST',
        }).then(({data}) => {
          console.log(data, '作品详情-详情页')
          if (data.code === 0 && data.details != []) {
            _this.pageinfo = data.details[0]
            // _this.weekshowList = data.page.records
            _this.loading = false
            _this.startDate = data.details[0].start_time
            _this.getChartData()
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取chartData的数据/web/webliterary/getStatisticalData/{productid}/{literaryid}/{indexType}/{dateType}/{startDate}
      getChartData () {
        let _this = this
        _this.$http({
          url: _this.$http.adornUrl('/web/webliterary/getStatisticalData/'+_this.productid + '/' + _this.literaryid +'/'+ _this.indexType + '/' + _this.dateType + '/' + _this.startDate),
          method: 'POST',
          data: _this.$http.adornData({
            'productid': _this.productid,
            'literaryid': _this.literaryid,
            'indexType': _this.indexType,
            'dateType': _this.dateType,
            'startDate': _this.startDate
          })
        }).then(({data}) => {
          console.log(data, '作品===图表数据')
          let listData = {}
          let xAxis = []
          let chartData = []
          if (data.code === 0) {
            // console.log(data)
            listData = data.map
            for(let i in listData){
              console.log(i);	//a b c d
              xAxis.push(i)
              console.log(listData[i]);	// aa bb cc dd
              chartData.push(listData[i])
            }
            this.xAxis = xAxis
            this.chartData = chartData
            this.initMarketLine(this.xAxis, this.activeChart, this.chartData)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      handleChooseType(command) {
        console.log(command)
        this.dateChoose = command
        if (command == '本周') {
          this.dateType = 0
          if (this.activeName == '点击数') {
            this.activeChart = 'clickChart'
            this.indexType = 1
            this.$nextTick(() => {
              this.getChartData()
              // let xAxis = ['2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15']
              // let data = ['291.11', '24224.33', '313122', '32323', '32343', '12444', '23232']
              // this.initMarketLine(xAxis, 'clickChart', data)
            })
          } else if (this.activeName == '推荐数') {
            this.activeChart = 'recommendChart'
            this.$nextTick(() => {
              this.getChartData()
              // let xAxis = ['2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15']
              // let data = ['3911.11', '24224.33', '333122', '3323', '3243', '12144', '13232']
              // this.initMarketLine(xAxis, 'recommendChart', data)
            })
          } else if (this.activeName == '粉丝数') {
            this.activeChart = 'fansChart'
            this.$nextTick(() => {
              this.getChartData()
              // let xAxis = ['2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15']
              // let data = ['1291.11', '4224.33', '33122', '3323', '3343', '12444', '13232']
              // this.initMarketLine(xAxis, 'fansChart', data)
            })
          } else if (this.activeName == '评论数') {
            this.activeChart = 'commentChart'
            this.$nextTick(() => {
              this.getChartData()
              // let xAxis = ['2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15']
              // let data = ['12191.11', '24224.33', '133122', '13323', '23343', '15444', '33232']
              // this.initMarketLine(xAxis, 'commentChart', data)
            })
          }
        }
        if (command == '本年') {
          this.dateType = 2
          if (this.activeName == '点击数') {
            this.activeChart = 'clickChart'
            this.indexType = 1
            this.$nextTick(() => {
              this.getChartData()
              // let xAxis = ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
              // let data = ['2912.11', '21224.33', '113122', '12323', '32343', '42444', '2232', '2912.11', '21224.33', '113122', '12323', '32343']
              // this.initMarketLine(xAxis, 'clickChart', data)
            })
          } else if (this.activeName == '推荐数') {
            this.activeChart = 'recommendChart'
            this.$nextTick(() => {
              this.getChartData()
              // let xAxis = ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
              // let data = ['2912.11', '21224.33', '113122', '12323', '32343', '42444', '2232', '2912.11', '21224.33', '113122', '12323', '32343']
              // this.initMarketLine(xAxis, 'recommendChart', data)
            })
          } else if (this.activeName == '粉丝数') {
             this.activeChart = 'fansChart'
            this.$nextTick(() => {
              this.getChartData()
              // let xAxis = ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
              // let data = ['2912.11', '21224.33', '113122', '12323', '32343', '42444', '2232', '2912.11', '21224.33', '113122', '12323', '32343']
              // this.initMarketLine(xAxis, 'fansChart', data)
            })
          } else if (this.activeName == '评论数') {
            this.activeChart = 'commentChart'
            this.$nextTick(() => {
              this.getChartData()
              // let xAxis = ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
              // let data = ['2912.11', '21224.33', '113122', '12323', '32343', '42444', '2232', '2912.11', '21224.33', '113122', '12323', '32343']
              // this.initMarketLine(xAxis, 'commentChart', data)
            })
          }
        }
        if (command == '全部') {
          this.dateType = 3
          if (this.activeName == '点击数') {
            this.activeChart = 'clickChart'
            this.indexType = 1
            this.$nextTick(() => {
              this.getChartData()
              // let xAxis = ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
              // let data = ['2912.11', '21224.33', '113122', '12323', '32343', '42444', '2232', '2912.11', '21224.33', '113122', '12323', '32343']
              // this.initMarketLine(xAxis, 'clickChart', data)
            })
          } else if (this.activeName == '推荐数') {
            this.activeChart = 'recommendChart'
            this.$nextTick(() => {
              this.getChartData()
              // let xAxis = ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
              // let data = ['2912.11', '21224.33', '113122', '12323', '32343', '42444', '2232', '2912.11', '21224.33', '113122', '12323', '32343']
              // this.initMarketLine(xAxis, 'recommendChart', data)
            })
          } else if (this.activeName == '粉丝数') {
             this.activeChart = 'fansChart'
            this.$nextTick(() => {
              this.getChartData()
              // let xAxis = ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
              // let data = ['2912.11', '21224.33', '113122', '12323', '32343', '42444', '2232', '2912.11', '21224.33', '113122', '12323', '32343']
              // this.initMarketLine(xAxis, 'fansChart', data)
            })
          } else if (this.activeName == '评论数') {
            this.activeChart = 'commentChart'
            this.$nextTick(() => {
              this.getChartData()
              // let xAxis = ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
              // let data = ['2912.11', '21224.33', '113122', '12323', '32343', '42444', '2232', '2912.11', '21224.33', '113122', '12323', '32343']
              // this.initMarketLine(xAxis, 'commentChart', data)
            })
          }
        }
      },
      handleClick(tab, event) {
        console.log(tab, event);
        this.dateChoose = '本周'
        this.dateType = 0
        if (tab.name == '月票') {
          this.indexType= 0
          // this.activeChart = 'clickChart'
          // console.log(tab.name)
          // this.$nextTick(() => {
          //   this.initdayshowsChart('', data)
          // })
          // this.initcopyrightChart()
        }
        if (tab.name == '点击数') {
          console.log(tab.name)
          this.indexType= 1
          this.activeChart = 'clickChart'
          this.$nextTick(() => {
            this.getChartData()
            // let xAxis = ['2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15', '2019-5-15']
            // let data = ['291.11', '24224.33', '313122', '32323', '32343', '12444', '23232']
            // this.initMarketLine(xAxis, 'clickChart', data)
          })
          // this.initcopyrightChart()
        }
        console.log(tab.name, event);
        if (tab.name == '推荐数') {
          // console.log(tab.name)
          this.indexType= 2
          this.activeChart = 'recommendChart'
          this.$nextTick(() => {
            this.getChartData()
          })
        }
        if (tab.name == '粉丝数') {
          console.log(tab.name)
          this.indexType= 3
          this.activeChart = 'fansChart'
          this.$nextTick(() => {
          this.getChartData()
          })
        }
        if (tab.name == '评论数') {
          this.indexType= 4
          this.activeChart = 'commentChart'
          this.$nextTick(() => {
            this.getChartData()
          })
        }
      },

      // handleChooseType(command) {
			// 	this.typeChoose = command
      // },
      initMarketLine (xAxis, chartid, data) {
        console.log('绘制图表')
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
          'xAxis': {
            'type': 'category',
            'boundaryGap': false,
            'data': xAxis
          },
          'yAxis': {
            'name': '周数据',
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
        this.chartLine = echarts.init(document.getElementById(chartid))
        this.chartLine.setOption(option,true)
        window.addEventListener('resize', () => {
          this.chartLine.resize()
        })
      },
      handleMouse(val) {
        console.log(val, 'sdfskdfa')
        this.activeBox = val
      },
      mouseLeave() {
        this.activeBox = ''
      }
    },
	}
</script>

<style lang='scss' scoped>
  @import '../boxOffice/css/box-office.css';
  @import '../boxOffice/css/shape.css';
  @import '../boxOffice/css/legend.css';
  @import '../boxOffice/css/color.css';
  .activebox {
    border-bottom: 2px solid #399BFF
  }
  .text_hover{
    cursor: pointer;
    display: inline-block;
  }
	.netwoeksDails {
		width: 95%;
		height: auto;
		margin: 0px auto;
    margin-top: -40px;
		box-sizing: border-box;
		padding: 1px 5px;
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
      padding-left: 215px;
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
      height: 450px;
      .charttitle {
        line-height: 30px; font-size: 14px; color: #4c4c4c;
        padding-left: 20px;
      }
    }

	}
</style>
