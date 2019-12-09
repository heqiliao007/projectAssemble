<template>
  <div style="overflow: hidden;position: relative;">
    <!-- 表格 -->
    <el-row :gutter="20" class="row-m20-p20">
      <el-col :span="24">
        <el-card>
          <div slot="header" style="margin:0 14px;" class="clearfix">
            <span style="float: left;font-size:23px">发行情报-热映中</span>
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
            >
              <el-table-column :render-header="renderHeader" fixed width="80">
								<template slot-scope="scope">
									<i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
									<!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
								</template>
							</el-table-column>
              <el-table-column prop="show_time" label="首映日期"></el-table-column>
              <el-table-column prop="movie_name" label="影片名称">
                <template slot-scope="scope">
                  <a class="link text_hover" @click="alink(scope.row.id)" style="color:#3295D9;text-decoration:none">{{scope.row.visitors}}</a>
                </template>
              </el-table-column>
              <el-table-column prop="category_name" label="影片类别"></el-table-column>
              <el-table-column prop="director" label="导演"></el-table-column>
              <el-table-column prop="film_kind_name" label="片种"></el-table-column>
              <el-table-column prop="publisher" label="发行公司"></el-table-column>
              <el-table-column prop="production_company" label="制作公司"></el-table-column>
              <el-table-column prop="product_company" label="出品公司"></el-table-column>
              <!-- <el-table-column prop="type" label="国家地区"></el-table-column> -->
            </el-table>
            <el-pagination
              style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
              background layout="prev, pager, next"
              :page-size="10" :total="totalPage"
              :current-page="page"
              @current-change="handleCurrentChange"/>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="cover"  v-if="isSearching=='true'"/>
    <div class="search" v-if="isSearching=='true'">
      <div class="search-box">
				<span>选择片种:</span>
				<el-select v-model="filmKind" @change='choosefilmkind' placeholder="请选择">
					<el-option
					v-for="item in areaOptions"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
				<span>影片类型:</span>
				<el-select v-model="typeName" @change='choosetype' placeholder="请选择">
					<el-option
					v-for="item in typeOptions"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
				<span style="margin-left:56px">影片名称：</span>
				<el-input v-model="movieName" type="text" size="small" placeholder="请输入" style="width:120px"></el-input>
			</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoxOfficeShowing",
  components: {},
  data() {
    return {
      headerCellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
      filmKind: '',
      typeName: '',
      page: 1,
      totalPage: 0,
      date:new Date(),
      isSearching:false,
      areaOptions: [
      ], // 国别列表
      filmKindCode: '', // 筛选条件-片种
      movieCategoryCode: '', // 筛选条件-电影类别
			typeOptions: [], // 主类型列表
      tableData: [
      ]
    }
  },
  created () {
    window.addEventListener('setItem', () => {
      this.newVal = sessionStorage.getItem('watchStorage')
      this.isSearching = this.newVal
    })
  },
  mounted() {
    this.getmoviesType()
    this.getlistFilmKind()
    this.getList()
  },
  methods: {
    renderHeader(h, { column }) {
      return h('i', {
        class: 'el-icon-setting'
      })
    },
    handleCurrentChange(val) {
			this.loading = true;
      this.page = val;
      this.getTableData()
			// this.gettableList();
		},
    // 获取电影类型接口
    // 获取电影类型接口
    getmoviesType () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/web/sysdict/listMovieCategory'),
        method: 'GET'

      }).then( ({data}) => {
        // console.log(data)
        if (data.code === 0) {
          _this.typeOptions = data.dict
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取片种类型接口
    getlistFilmKind () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/web/sysdict/listFilmKind'),
        method: 'GET'

      }).then( ({data}) => {
        console.log(data)
        if (data.code === 0) {
          _this.areaOptions = data.dict
          // _this.typeOptions = data.dict
        }
      }).catch(err => {
        console.log(err)
      })
    },
    choosefilmkind(val) {
      console.log(val)
      this.filmKindCode = val
    },
    //跳转影片详情
		//跳转影片详情
		alink (id) {
      sessionStorage.setItem('movieId', id);
      this.$router.push({
          path: '/video',
          query: {
            id: id,
            lastmenu: '影院情报'
          }
        })
		  // this.$router.push({name: 'video',params: {id: id}})
		},
    // 获取将上映列表
    getList () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/web/movie/hitMovieForToday?current=' + _this.page + '&size=10'),
        method: 'POST',
        data: _this.$http.adornData({
          year: _this.year,
          filmKindCode: _this.filmKindCode,
          movieTypeCode:_this.movieCategoryCode,
          movieName: _this.movieName
        })
      }).then( ({data}) => {
        console.log(data)
        if (data.code === 0) {
          _this.tableData = data.page.records
          _this.totalPage=data.page.total
        }
        // _this.listData = data.listData
      }).catch( err => {
        console.log(err)
      })
    },
    // 选择电影类型，并保存请求列表数据的参数
    choosetype (val) {
      this.movieCategoryCode = val
    }
  }
}
</script>

<style scoped>
  @import '../css/box-office.css';
  @import '../css/shape.css';
  @import '../css/legend.css';
  @import '../css/color.css';
.text_hover{
    cursor: pointer;
    display: inline-block;
  }
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
