<template>
  <div style="position: relative">
    <!-- 表格 -->
    <el-row :gutter="20" class="row-m20-p20">
      <el-col :span="24">
        <el-card>
          <div slot="header" style="margin:0 14px;" class="clearfix">
            <span style="float: left;font-size:23px">海外票房</span>
            <!-- <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button> -->
            <!-- <el-button type="text" class="card-extra" style="font-size: 14px; line-height: 30px; color: #0084CF;">更多指标+</el-button> -->
          </div>
          <div>
            <el-table
              :data="tableData"
              style="width: 100%; font-size:18px"
              v-loading="loading"
              stripe
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
              <el-table-column prop="rowno" width="120px" label="今日排名"></el-table-column>
              <el-table-column prop="rownoYesterday" width="120px" label="昨日排名"></el-table-column>
              <el-table-column prop="changemap changenum" width="120px" label="排名变化">
                <template slot-scope="scope">
                  <span v-if="scope.row.changemap=='eq'"><img src="../img/icon_bubian.png" alt=""></span>
                  <span v-if="scope.row.changemap=='up'"><img src="../img/icon_shangshen.png" alt="">{{scope.row.changenum}}</span>
                  <span v-if="scope.row.changemap=='down'"><img src="../img/icon_xiajiang.png" alt="">{{scope.row.changenum}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="foreign_name,id" label="影片名称">
								<template slot-scope="scope">
									<a class="link" @click="alink(scope.row.id)" style="color:#3295D9;text-decoration:none">{{ scope.row.foreign_name }}</a>
								</template>
							</el-table-column>
              <el-table-column prop="studio" width="150px" label="制片公司">
								<template slot-scope="scope">
									<a class="link" style="color:#3295D9;text-decoration:none">{{ scope.row.studio }}</a>
								</template>
							</el-table-column>
              <el-table-column prop="onlineday" width="100px" label="上线天数"></el-table-column>
              <el-table-column prop="dailybox" width="140px" label="今日票房"></el-table-column>
              <!--<el-table-column prop="" label="北美本土票房（万）"></el-table-column>-->
              <el-table-column prop="todayboxs" width="140px" label="累计票房"></el-table-column>
            </el-table>
            <el-pagination style="float: right; padding: 3px 0;margin:8px 34px 40px 0" background layout="prev, pager, next" :page-size="10" :total="totalPage" :current-page="page" @current-change="handleCurrentChange"/>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="cover"  v-if="isSearching=='true'"/>
    <div class="search" v-if="isSearching=='true'">
      <div class="search-box">
        <span>国家: </span>
				<el-select v-model="countriesnow" placeholder="请选择" style="width: 120px;" size="small">
					<el-option v-for="item in countries" :key="item.nationality" :label="item.nationality" :value="item.nationality"></el-option>
				</el-select>
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
        <el-button type="primary" size="small">查询</el-button>
        <!-- <el-date-picker
          type="date"
          size="small"
          style="width:157px"
          format="yyyy-MM-dd"
          prefix-icon="none"
          v-model="date"
          @change="changeDate()"
        ></el-date-picker> -->
      </div>
    </div>
    <comparison v-if="contrastbox"  @down="onDown()"></comparison>
  </div>
</template>

<script>
export default {
  name: 'BoxOfficeCinema',
  components: {
  },
  data () {
    return {
      headercellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
      page:1,
      totalPage:'',
      loading:true,
      date:new Date('2019-03-14'),
      isSearching:false,
      contrastbox:false,
      title: '',
      tableData: [],
      countriesnow: '',
      countries: [],
      datelist:[],
    }
  },
  watch: {
    '$route' () {
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
    this.gettableDate()
    this.getcountries();
  },
  methods: {
    renderHeader(h, { column }) {
      return h('i', {
        class: 'el-icon-setting'
      })
    },
    contrast () {
      this.contrastbox=true
    },
    //获取国籍
		getcountries() {
			this.$http({
				url: this.$http.adornUrl('web/movietrade/listStaffNationality'),
				method: 'GET'
			})
				.then(({ data }) => {
					this.countries = data.list;
				})
				.catch(err => {
					console.log('请求失败：');
				});
		},
		alink (id) {
			sessionStorage.setItem('movieId', id);
			this.$router.push({
			    path: '/video',
			    query: {
			      id: id,
			      lastmenu: '海外票房'
			    }
			  })
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
    //获取相对当前日期隔num天的日期如隔后10天日期：getDay(10, '-',new Date())
    getDay(num, str,day) {
      console.log(num, str,day)
      var today = day;
      var todays = new Date()
      var nowTime = today.getTime();
      var ms = 24*3600*1000*num;
      todays.setTime(parseInt(nowTime + ms));
      var oYear = todays.getFullYear();
      var oMoth = (todays.getMonth() + 1).toString();
      if (oMoth.length <= 1) oMoth = '0' + oMoth;
      var oDay = todays.getDate().toString();
      if (oDay.length <= 1) oDay = '0' + oDay;
      return oYear + str + oMoth + str + oDay;
    },
    //获取productid
    getcookie(){
      this.productid=this.$cookie.get('productid')
    },
    //列表数据
    gettableDate(){
      this.$http({
        url: this.$http.adornUrl('/web/foreignbox/Ranking/'+this.productid+'/'+this.CurentTime(this.date)+'?current='+this.page),
        method: 'get'
      }).then(({ data }) => {
        var msg=data
        for(let i=0;i<msg.page.records.length;i++){
          this.$http({
            url: this.$http.adornUrl('/web/foreignbox/RankingYesterday/'+msg.page.records[i].foreign_name+'/'+this.getDay(-1,'-',this.date)+'/'+msg.page.records[i].rowno),
            method: 'get'
          }).then(({ data }) => {
            console.log(this.date)
            console.log(this.getDay(-1,'-',this.date))
            msg.page.records[i].rownoYesterday=data.rownoYesterday
            if(data.map.up!=undefined){
              msg.page.records[i].changemap='up'
              msg.page.records[i].changenum=data.map.up
            }else if(data.map.down!=undefined){
              msg.page.records[i].changemap='down'
              msg.page.records[i].changenum=data.map.down
            }else if(data.map.eq!=undefined){
              msg.page.records[i].changemap='eq'
              msg.page.records[i].changenum=data.map.eq
            }
            if(i==msg.page.records.length-1){
              this.loading=false
              console.log(msg)
              this.totalPage=msg.page.total-0
              this.tableData=msg.page.records
            }
          }).catch(err => {
            // console.log('请求失败：');
          });
        }
      }).catch(err => {
        // console.log('请求失败：');
      })
    },
    //分页
    handleCurrentChange(val) {
      this.loading=true
      this.page = val;
      this.gettableDate ()
    },
    //修改日期
    //修改日期
      changeDate(){
        this.datelist=[]
        // this.getDate()
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
