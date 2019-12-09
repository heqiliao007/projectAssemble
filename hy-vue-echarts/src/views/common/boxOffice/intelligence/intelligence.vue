<template>
  <div style="overflow: hidden; margin-top: 0px;">
    <div class="search-box" style="background: #ffffff; height: 80px; padding-left: 30px; padding-top: 20px;">
      <span style="margin-left:16px">日期：</span>
      <el-date-picker
        style="width: 260px;"
        size="small"
        v-model="date"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <span style="margin-left:56px">地区： </span>
      <el-button size="small" v-popover:popover2 style="width:100px; height: 34px; border: 1px solid #eee; text-align: center;">{{chooseregionText}}</el-button>
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
      <span style="margin-left:16px">院线：</span>
      <el-select size="small" v-model="chinasvalue" @change="changeChian" placeholder="请选择">
          <el-option
            v-for="item in chiansOptions"
            :key="item.id"
            :label="item.name"
            :value="item">
          </el-option>
        </el-select>
      <span style="margin-left:16px">影院：</span>
      <el-input type="text" v-model='cinemaName' size="small" placeholder="请输入影院" style="width:120px"></el-input>
      <span style="margin-left:16px">银幕类型：</span>
      <el-select v-model="type" placeholder="请选择" size="small">
          <el-option
            v-for="item in typeOptions"
            :key="item.id"
            :label="item.name"
            :value="item">
          </el-option>
        </el-select>
      <el-button type="primary" @click="search()" size="small">查询</el-button>
    </div>
    <!-- 表格 -->
    <el-row class="row-m20-p20">
      <el-col :span="24">
        <el-card>
          <div slot="header" style="margin:0 14px;" class="clearfix">
            <span style="float: left;font-size:23px">影院情报</span>
            <div style="float: right;">
              <el-button type="primary" round>计划中</el-button>
              <el-button type="" round>建设中</el-button>
              <el-button type="" round>新建影院</el-button>
              <!-- <i class="iconfont iconxiazai" style="font-size: 24px; color: #ccc; line-height: 30px;"></i> -->
            </div>
          </div>
          <div>
            <el-table
              :data="tableData"
              style="width: 100%; font-size:18px"
              stripe
              v-loading="loading"
              row-class-name="table-row"
              header-row-class-name="table-header"
              :header-cell-style='headerCellStyle'
            >
              <el-table-column :render-header="renderHeader" fixed width="80">
								<template slot-scope="scope">
									<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
									<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
              <el-table-column prop="name" label="影院名称">
                <template slot-scope="scope">
                  <a class="link" @click="tocinema()" style="color:#3295D9;text-decoration:none">{{scope.row.name}}</a>
                </template>
              </el-table-column>
              <el-table-column prop="cinamelinenamename" label="所属院线">
								<template slot-scope="scope">
								  <a class="link" @click="chain()" style="color:#3295D9;text-decoration:none">{{scope.row.cinamelinenamename}}</a>
								</template>
							</el-table-column>
              <!--<el-table-column prop="city" label="城市"></el-table-column>-->
              <el-table-column prop="value" label="地区"></el-table-column>
              <el-table-column prop="opening_time" label="开业时间"></el-table-column>
              <el-table-column prop="state" label="状态"></el-table-column>
              <!-- <el-table-column prop="screen_number" label="银幕数"></el-table-column>
              <el-table-column prop="three_dimension_number" label="3D厅数"></el-table-column>
              <el-table-column prop="imax_number" label="IMAX厅数"></el-table-column>
              <el-table-column prop="digital_number" label="中国巨幕厅数"></el-table-column>
              <el-table-column prop="seating" label="座位数"></el-table-column>
              <el-table-column prop="phone_number" label="电话"></el-table-column>
              <el-table-column prop="type" label="投资公司"></el-table-column> -->
              <el-table-column prop="code" label="专资编码"></el-table-column>
            </el-table>
            <el-pagination
              style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
              background
              layout="prev, pager, next"
              :total="total"
              :current-page="page"
							@current-change="handleCurrentChange"
            />
            <!-- <el-pagination style="float: right; padding: 3px 0;margin:8px 34px 40px 0" background layout="prev, pager, next" :page-size="10" :total="totalPage" :current-page="page" @current-change="handleCurrentChange"/> -->
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "boxOfficeIntelligence",
  components: {
  },
  data () {
    return {
      headerCellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
      loading:true,
      totalPage: 1,
      total: 1,
      page:1,
      value:'',
      options:[],
      date:[new Date('2018-04-05'),new Date('2019-04-05')],
      productid:'',
      cdhainSelect:'',
      cdhain:[],
      tableData: [],
      chooseregionText: '', // 已选择地区的页面显示文字
      activeName: 'first',
      urbanHierarchyCode: '', // 城市等级编码，传入需要封装到 params 中
      urbanHierarchy: [], // 地域
      noshow: false, // 隐藏表头
      regionCode: '', // 区域编码，传入需要封装到 params 中
      region: [], // 地区
      provinceCode: '', // 省份编码，传入需要封装到 params 中
      province: [], // 省份
      chinasvalue: '', // 选中后的院线名称
      cinemalineId: '', // 院线ID，传入需要封装到 params 中
      chiansOptions: [], // 院线
      cinemaName: '', // 影院名称
      typeOptions: [], // 银幕类型
      type: '' // 银幕类型
    }
  },
  created(){

  },
  mounted(){
    this.getcookie()
    this.getChain()
    this.gettableDate()
    this.getCityList()
    this.getchinasList()
  },
  methods: {
    renderHeader(h, { column }) {
        return h('i', {
          class: 'el-icon-setting'
        })
      },
    // 获取院线列表接口
    getchinasList () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('web/cinema/listcinema'),
        method: 'post',
        data: {}
      }).then(({data}) => {
        if (data.code===0 && data.listMap != []) {
          _this.chiansOptions = data.listMap
        } else {
          _this.chiansOptions = []
          alert('暂无数据')
        }
      })
    },
    // 选择院线保存院线id
    changeChian (val) {
      let _this = this
      _this.cinemalineId = val.id
      _this.chinasvalue = val.name
      _this.getData()
      // _this.getRegionData()
    },
    // 获取c城市列表接口
    getCityList () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/web/sysdict/dictOfRegion'),
        method: 'post',
        data: {}
      }).then(({data}) => {
        // console.log(data)
        if (data.code===0) {
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
    handleClick(tab, event) {
      // console.log(tab, event)
    },
        // 选择地域
    chooseUrban (val) {
      let _this = this
      // console.log(val)
      _this.chooseregionText = val.label
      _this.urbanHierarchyCode = val.value
      _this.getData()
    },
    // 选择地区
    chooseRegion (val) {
      let _this = this
      console.log(val)
      _this.regionCode = val.value
      _this.chooseregionText = val.label
      _this.getData()
    },
    // 选择省份
    chooseProvince (val) {
      let _this = this
      console.log(val)
      _this.provinceCode = val.id
      _this.chooseregionText = val.value
      _this.getData()
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
    //获取productid
    getcookie(){
      this.productid=this.$cookie.get('productid')
      if(this.productid==null){
        this.productid='29'
      }
    },
    //获取院线列表
    getChain(){
      this.$http({
        url: this.$http.adornUrl('/web/cinema/listcinema'),
        method: 'POST',
      }).then(({ data }) => {
        this.cdhain=data.listMap
      }).catch(err => {
        // console.log('请求失败：');
      });
    },
    //获取列表数据
    gettableDate(){
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/web/cinema/cinemaintelligence/'+_this.productid+'/'+_this.CurentTime(_this.date[0])+'/'+_this.CurentTime(_this.date[1])+'?current='+_this.page+'&size=10'),
        method: 'POST',
        data: _this.$http.adornData({
          'productid': _this.productid,
          'start': _this.CurentTime(_this.date[0]),
          'end': _this.CurentTime(_this.date[1]),
          'name':'',
          'screentype':'',
          'cinamelinenameId':_this.cdhainSelect,
          'area':'',
        })
      }).then(({ data }) => {
        _this.totalPage = 111
        _this.total = 111
        if (data.code == 0) {
          for(var i=0;i<data.page.records.length;i++){
            var time=data.page.records[i].opening_time.split(' ')[0]
            data.page.records[i].opening_time=time
          }
          _this.loading=false
          _this.tableData=data.page.records
          _this.total = Number(data.page.total)
        }

        console.log('totalPage', _this.totalPage)
        // _this.totalPage=data.page.total

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
    //点击查询
    searchlist(){
      this.loading=true
      this.page = 1;
      this.gettableDate ()
    },
		//跳转影院详情
		tocinema(){
			this.$router.push({ path: '/movieDetails' });
		},
		//跳转院线详情
		chain(){
			this.$router.push({ path: '/movieDetails' });
		}
  }
}
</script>

<style scoped>
  @import '../css/box-office.css';
  @import '../css/shape.css';
  @import '../css/legend.css';
  @import '../css/color.css';
  .el-input--medium .el-input__inner{
    height: 34px;
  }
</style>
