<template>
  <div style="position: relative">
    <!-- 表格 -->
    <el-row :gutter="20" class="row-m20-p20">
      <el-col :span="24">
        <el-card>
          <div slot="header" style="margin:0 14px;" class="clearfix">
            <span style="float: left;font-size:23px">省份票房</span>
            <span style="font-size: 12px; margin-left: 10px; margin-right: 10px; line-height: 30px;">{{time}}</span>
            <!-- <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button> -->
            <!-- <el-button type="text" class="card-extra" style="font-size: 14px; line-height: 30px; color: #0084CF;">更多指标+</el-button> -->
          </div>
          <div>
            <el-table
              :data="tableData"
              style="width: 100%; font-size:18px;curson:pointer"
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
              <el-table-column type="index" label="排名" width="100px">
                <template slot-scope="scope">
                  <span>{{scope.$index + 1 + (current-1) *10}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="value" label="省份">
                <template slot-scope="scope">
									<a class="link" @click="alink(scope.row)" style="color:#3295D9;text-decoration:none">
                    {{ scope.row.value }}
                  </a>
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
              <el-table-column prop="box_office_rate" label="票房占比">
                <template slot-scope="scope">
                  <!-- <span>{{Math.round((scope.row.boxOfficeReta*100)*1000)/1000+'%'}}</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="playtimes" label="场次"></el-table-column>
              <el-table-column prop="person_time" label="人次（万）">
                <template slot-scope="scope">
                  <span>{{scope.row.person_time/10000}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="person_time_rate" label="人次占比">
                <template slot-scope="scope">
                  <!-- <span>{{Math.round((scope.row.personsReta*100)*1000)/1000+'%'}}</span> -->
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
        <span style="margin-left:16px">地区： </span>
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
        <el-button type="primary" size="small">查询</el-button>
        <!-- <span style="margin-left:56px">影片名称：</span> -->
        <!-- <el-input type="text" size="small" placeholder="请输入" style="width:120px"></el-input> -->
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
      loading:true,
      date:new Date('2019-04-02'),
      isSearching:false,
      total: 0,
      productid:'',
      current:1,
      contrastbox: false,
      tableData: [],
      time: '',
      chooseregionText: '', // 已选择地区的页面显示文字
      activeName: 'first',
      urbanHierarchy: [], // 地域
      urbanHierarchyCode: '', // 城市等级编码，传入需要封装到 params 中
      regionCode: '', // 区域编码，传入需要封装到 params 中
      region: [], // 地区
      province: [], // 省份
      provinceCode: '', // 	省份编码，传入需要封装到 params 中
      noshow: false,
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
    this.productid = this.$cookie.get('productid')
    this.getDate()
    this.time = this.CurentTime(this.date)
    this.getCityList() // 获取城市列表
  },
  methods: {
    renderHeader(h, { column }) {
      return h('i', {
        class: 'el-icon-setting'
      })
    },
    alink(e) {
      console.log(e.city_id)

      sessionStorage.setItem('cityId',e.city_id)
			this.$router.push('/box_office/arrange/provencevDails')
    },
    handleClick(tab, event) {
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
    contrast() {
      this.contrastbox = true
    },
    getDate(){
      this.$http({
        url: this.$http.adornUrl('/web/boxoffice/provincialboxoffice/'+this.productid+'/'+this.CurentTime(this.date)+ '?current=' + this.current),
        method: 'POST',
        data: this.$http.adornData({
          'productid': this.productid,
          'time':this.CurentTime(this.date)
        })
      }).then(({ data }) => {
        this.loading=false
        this.total = data.page.total-0
        this.tableData=data.page.records
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
    //修改日期
    changeDate(val){
      this.time = this.CurentTime(this.date)
      this.loading=true
      this.current=1
      this.getDate()
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
