<template>
  <div style="position: relative">
    <el-row class="row-m20-p20">
      <el-col :span="24">
        <el-card>
          <div slot="header" style="margin:0 14px" class="clearfix">
            <el-radio-group size="small" style="float:left" v-model="show" @change="showChange()">
              <el-radio-button label="即将上映"></el-radio-button>
              <el-radio-button label="已上映"></el-radio-button>
            </el-radio-group>
            <div style="float: right;">
              <el-button :type="timeType == 'yesterday' ? 'primary' : ''" round @click="chooseTimeType('yesterday')">前一天</el-button>
              <el-button :type="timeType == 'week' ? 'primary' : ''" round @click="chooseTimeType('week')">七天</el-button>
              <el-button :type="timeType == 'month' ? 'primary' : ''" round @click="chooseTimeType('month')">近30天场</el-button>
            </div>
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
              <el-table-column :render-header="renderHeader" fixed width="80">
								<template slot-scope="scope">
									<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
									<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
              <el-table-column type="index" width="100px" label="排名">
                <template slot-scope="scope">
                  <span>{{scope.$index + 1 + (page-1) *10}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name movieId" label="影片名称">
                <template slot-scope="scope">
                  <a class="link" @click="alink(scope.row.movieId)" style="color:#3295D9;text-decoration:none">{{scope.row.name}}</a>
                </template>
              </el-table-column>
              <el-table-column prop="showTime" label="上映时间"></el-table-column>
              <el-table-column prop="score" label="认知指数"></el-table-column>
              <el-table-column prop="movieTypes" label="影片类型"></el-table-column>
              <el-table-column prop="volume,num" label="排名变化">
                <template slot-scope="scope">
                  <span v-if="scope.row.volume=='center'"><img src="../img/icon_bubian.png" alt=""></span>
                  <span v-if="scope.row.volume=='top'"><img src="../img/icon_shangshen.png" alt="">{{scope.row.num}}</span>
                  <span v-if="scope.row.volume=='btm'"><img src="../img/icon_xiajiang.png" alt="">{{scope.row.num}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination style="float: right; padding: 3px 0;margin:8px 34px 40px 0" background layout="prev, pager, next" :page-size="10" :total="totalPage" :current-page="page" @current-change="handleCurrentChange"/>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'BoxOfficeMarketing',
  components: {},
  data() {
    return {
      headercellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
      show:'即将上映',
      loading:true,
      totalPage: 0,
      productid:'',
      source: '',
      title: '',
      tableData: [],
      isOnshow:false,
      page:1,
      timeType: 'yesterday',  // yesterday-前一天 week-一周前， month-30天前
    }
  },
  watch: {
  },
  created() {
    // this.source = this.$route.query.type
  },
  mounted() {
    this.getcookie()
    this.perceiveDate (this.timeType)
  },
  methods: {
    renderHeader(h, { column }) {
      return h('i', {
        class: 'el-icon-setting'
      })
    },
    //获取productid
    getcookie(){
      this.productid=this.$cookie.get('productid')
      this.source = this.$route.query.type
    },
    //获取相对当前日期隔num天的日期如隔后10天日期：getDay(10, '-',new Date())
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
    // 获取认知指数/web/acknowledge/rankingVerTwo/{timeType}/{isOnshow}
    perceiveDate (val) {
      this.$http({
        url: this.$http.adornUrl('/web/acknowledge/rankingVerTwo/'+ val +'/'+ this.isOnshow+'?current='+this.page+'&size=10'),
        method: 'get',
      }).then(({ data }) => {
				console.log(data)
        this.totalPage = Number(data.page.total) || 0
        if(data.page.total!=0){
          for(let i=0;i<data.page.records.length;i++){
            if(data.page.records[i].showTime!=null){
              var day=data.page.records[i].showTime.split(' ')[0]
              data.page.records[i].showTime=day
            }
            if(data.page.records[i].ranking<0){
              data.page.records[i].volume='btm'
              data.page.records[i].num=Math.abs(data.page.records[i].ranking)
            }else if(data.page.records[i].ranking>0){
              data.page.records[i].volume='btm'
              data.page.records[i].num=data.page.records[i].ranking
            }else {
              data.page.records[i].volume='btm'
            }
            if(i==data.page.records.length-1){
              this.loading=false
              this.tableData=data.page.records
            }
          }
        }else {
          this.loading=false
          this.tableData=[]
        }
      }).catch(err => {
        // console.log('请求失败：');
      })
    },
		//切换上一天、七天、进30天
    chooseTimeType (val) {
			this.loading=true
      this.page = 1
      this.timeType = val
      this.perceiveDate(val)
    },
    //分页
    handleCurrentChange(val) {
      this.loading=true
      this.page = val;
      this.perceiveDate (this.timeType)
    },
    //修改上映和即将上映
    showChange(){
      if(this.show=='即将上映'){
        this.loading=true
        this.isOnshow=false
        this.page = 1;
        this.perceiveDate (this.timeType)
      }else {
        this.loading=true
        this.isOnshow=true
        this.page = 1;
        this.perceiveDate (this.timeType)
      }
    },
		//跳转详情
		alink(id){
			sessionStorage.setItem('movieId', id);
			this.$router.push({
				path: '/video',
				query: {
					id: id,
					lastmenu: '认知指数榜'
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
	.link{
		cursor: pointer;
	}
</style>
