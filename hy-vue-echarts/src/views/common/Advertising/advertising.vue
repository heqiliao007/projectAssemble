<template>
  <div style="overflow: hidden">
    <div class="search-box" style="background: #ffffff; height: 80px; padding-left: 30px; padding-top: 20px;">
      <span style="margin-left:16px">品牌名称：</span>
      <el-input type="text" size="small" v-model='brand' placeholder="请输入品牌名称" style="width:120px"></el-input>
      <span style="margin-left:16px">品牌类型：</span>
      <el-select size="small" v-model="brandType" placeholder="请选择" style='width: 120px;'>
        <el-option
          v-for="(item, index) in brandTypeOption"
          :key="index"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <span style="margin-left:16px">植入方式：</span>
      <el-select size="small" v-model="implantationMode" placeholder="请选择" style='width: 120px;'>
        <el-option
          v-for="(item, index) in implantationModeOptions"
          :key="index"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <span style="margin-left:16px">电影名称：</span>
      <el-input type="text" v-model='movieName' size="small" placeholder="请输入影院" style="width:120px"></el-input>
      <el-button type="primary" @click="search()">查询</el-button>
    </div>
    <!-- 表格 -->
    <el-row class="row-m20-p20">
      <el-col :span="24">
        <el-card>
          <div slot="header" style="margin:0 14px;" class="clearfix">
            <span style="float: left;font-size:23px">电影植入广告</span>
            <!-- <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button> -->
            <!-- <el-button type="text" class="card-extra" style="color:#3295D9; font-size: 14px; line-height: 30px;">更多指标+</el-button> -->
          </div>
          <div>
            <el-table
              :data="tableData"
              style="width: 100%; font-size:18px"
              stripe
              row-class-name="table-row"
              header-row-class-name="table-header"
              :header-cell-style='headerCellStyle'
              v-loading='loading'
            >
              <el-table-column :render-header="renderHeader" fixed width="80">
								<template slot-scope="scope">
									<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
									<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
              <el-table-column prop="moviename" label="影片名称">
                <template slot-scope="scope">
                  <a class="link text_hover" @click="alink(scope.row.id)" style="color:#3295D9;text-decoration:none">{{scope.row.moviename}}</a>
                </template>
              </el-table-column>
              <el-table-column prop="brand" label="广告品牌"></el-table-column>
              <el-table-column prop="companyname" label="品牌公司"></el-table-column>
              <el-table-column prop="brandtype" label="品牌类型"></el-table-column>
              <el-table-column prop="implantationmode" label="植入方式"></el-table-column>
              <!-- <el-table-column prop="boxofficesum" label="累计票房（万）"></el-table-column>
              <el-table-column prop="persontimesum" label="观影人次（万）"></el-table-column> -->
              <el-table-column prop="showtime" label="上映日期"></el-table-column>
            </el-table>
            <el-pagination
              style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
              background
              layout="prev, pager, next"
              :total="total"
              :current-page="current"
							@current-change="handleCurrentChange"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "boxOfficeAdvertising",
  components: {
  },
  data () {
    return {
      headerCellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
      // brandOptions: [],
      productid: '', // 产品id-请求数据
      brand: '', // 品牌名称-请求数据
      brandType: '', // 品牌类型-请求数据
      implantationMode: '', // 植入方式-请求数据
      movieName: '', // 电影名称-请求数据
      brandTypeOption: [],
      implantationModeOptions: [],
      tableData: [],
      total: 0,
      current: 1,
      loading: true
    }
  },
  mounted() {
    this.getcookie()
    this.getbrandTypeList()
    this.getbrandmodeList()
    this.getTableData()
  },
  methods: {
    renderHeader(h, { column }) {
      return h('i', {
        class: 'el-icon-setting'
      })
    },
    handleCurrentChange(val) {
			this.loading = true;
      this.current = val;
      this.getTableData()
			// this.gettableList();
    },
    //跳转影片详情
		//跳转影片详情
		alink (id) {
      console.log(id, 'id')
      sessionStorage.setItem('movieId', id);
      this.$router.push({
          path: '/video',
          query: {
            id: id,
            lastmenu: '植入广告'
          }
        })
		  // this.$router.push({name: 'video',params: {id: id}})
		},
    getcookie () {
        this.productid=this.$cookie.get('productid')
        if(this.productid==null){
          this.productid='9'
        }
      },
    // 获取品牌类型/web/productplacement/brandTypeList/{productid}
    getbrandTypeList () {
        let _this = this
        _this.$http({
          url: _this.$http.adornUrl('web/productplacement/brandTypeList/' + _this.productid),
          method: 'post',
          data: {}
        }).then(({data}) => {
          console.log(data)
          _this.brandTypeOption = data.list
        })
      },
      // 获取植入方式/web/productplacement/modeList/{productid}
    getbrandmodeList () {
        let _this = this
        _this.$http({
          url: _this.$http.adornUrl('web/productplacement/modeList/' + _this.productid),
          method: 'post',
          data: {}
        }).then(({data}) => {
          console.log(data)
          _this.implantationModeOptions = data.list
        })
      },
      //点击查询
		search() {
			this.loading = true;
      this.page = 1;
      // this.
			this.getTableData();
		},
      // 获取表格数据/web/productplacement/webpage/{productid}
    getTableData() {
        let _this = this
        _this.$http({
          url: _this.$http.adornUrl('web/productplacement/webpage/' + _this.productid +'/?current='+_this.current+'&size=10' + '&brand=' + _this.brand + '&brandType=' + _this.brandType + '&implantationMode=' + _this.implantationMode + '&movieName=' + _this.movieName),
          method: 'post',
          data: _this.$http.adornData({
            'brand': _this.brand,
            'brandType': _this.brandType,
            'implantationMode': _this.implantationMode,
            'movieName': _this.movieName
          })
        }).then(({data}) => {
          console.log(data, 'getTableData')
          if(data.code === 0) {
            _this.tableData = data.page.list
            _this.total = data.page.totalCount
            console.log('total', data.page.totalCount)
            _this.loading = false
          }
          // _this.implantationModeOptions = data.list
        })
      }
  },
}
</script>

<style scoped>
  @import '../boxOffice/css/box-office.css';
  @import '../boxOffice/css/shape.css';
  @import '../boxOffice/css/legend.css';
  @import '../boxOffice/css/color.css';
  .text_hover{
    cursor: pointer;
    display: inline-block;
  }
</style>
