<template>
  <div style="position: relative">
    <!-- 表格 -->
    <el-row :gutter="20" class="row-m20-p20">
      <el-col :span="24">
        <el-card>
          <div slot="header" style="margin:0 14px;" class="clearfix">
            <span style="float: left;font-size:23px">影投票房</span>
            <!-- <el-button class="card-extra" type="text" icon="el-icon-hysj-xiazai"></el-button>
            <el-button
              type="text"
              class="card-extra"
              style="font-size: 14px; line-height: 30px; color: #0084CF;"
            >更多指标+</el-button> -->
          </div>
          <div>
            <el-table
              :data="tableData"
              style="width: 100%; font-size:18px"
              stripe
              row-class-name="table-row"
              v-loading="loading"
              header-row-class-name="table-header"
              :header-cell-style="headercellStyle"
            >
              <el-table-column :render-header="renderHeader" fixed width="50">
                <template slot-scope="scope">
                  <i class="iconfont iconhistogram-copy" style="color: #0084CF;"></i>
                  <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
                </template>
              </el-table-column>
              <el-table-column type="index" label="排名" width="100px">
                <template slot-scope="scope">
                  <span>{{scope.$index + 1 + (page-1) *10}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="影投名称" width="250px">
                <template slot-scope="scope">
                  <a
                    class="link"
                    @click="alink(scope.row)"
                    style="color:#3295D9;text-decoration:none"
                  >{{scope.row.name}}</a>
                </template>
              </el-table-column>
              <el-table-column prop="contrast" label="对比分析">
                <template slot-scope="scope">
                  <img src="../img/add.png" @click="contrast()" min-width="20" height="20" />
                </template>
              </el-table-column>
              <el-table-column prop="box_office" label="票房（万）" width="130"></el-table-column>
              <!-- <el-table-column prop="screen" label="银幕数"></el-table-column> -->
              <el-table-column prop="arranged_seating" label="座位数"></el-table-column>
              <el-table-column prop="boxOfficeReta" label="票房占比"></el-table-column>
              <el-table-column prop="playtimes" label="场次"></el-table-column>
              <el-table-column prop="person_time" label="人次（万）"></el-table-column>
              <el-table-column prop="personsReta" label="人次占比"></el-table-column>
              <!-- <el-table-column prop="now" label="当前排座"></el-table-column> -->
            </el-table>
            <el-pagination
              style="float: right; padding: 3px 0;margin:8px 34px 40px 0"
              background
              layout="prev, pager, next"
              :page-size="10"
              :total="totalPage"
              :current-page="page"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="cover" v-if="isSearching=='true'" />
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
        <span style="margin-left:16px">地区：</span>
        <el-button
          v-popover:popover2
          style="width:100px; height: 34px; border: 1px solid #eee; text-align: center;"
        >{{chooseregionText}}</el-button>
        <el-popover ref="popover2" placement="bottom" title width="380" trigger="click" content>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="按地域" name="first">
              <template>
                <el-table
                  :data="urbanHierarchy"
                  height="250"
                  :show-header="noshow"
                  @row-click="chooseUrban"
                  style="width: 100%; border: none;"
                >
                  <el-table-column prop="label" label width></el-table-column>
                </el-table>
              </template>
            </el-tab-pane>
            <el-tab-pane label="按地区" name="second">
              <template>
                <el-table
                  :data="region"
                  height="250"
                  v-loading="loading"
                  @row-click="chooseRegion"
                  :show-header="noshow"
                  style="width: 100%"
                >
                  <el-table-column prop="label" label width="320"></el-table-column>
                </el-table>
              </template>
            </el-tab-pane>
            <el-tab-pane label="按省份" name="third">
              <template>
                <el-table
                  :data="province"
                  @row-click="chooseProvince"
                  height="250"
                  v-loading="loading"
                  :show-header="noshow"
                  style="width: 100%"
                >
                  <el-table-column prop="value" label width="320"></el-table-column>
                </el-table>
              </template>
            </el-tab-pane>
            <!-- <el-tab-pane label="按城市" name="third">省份</el-tab-pane> -->
          </el-tabs>
        </el-popover>
        <span style="margin-left:16px">影投名称：</span>
        <el-input type="text" size="small" placeholder="请输入影投名称" style="width:120px"></el-input>
        <el-button type="primary" size="small">查询</el-button>
      </div>
    </div>
    <comparison v-if="contrastbox" @down="onDown()"></comparison>
  </div>
</template>

<script>
export default {
  name: "BoxOfficeCinema",
  components: {},
  data() {
    return {
      headercellStyle: {color: '#fff',backgroundColor: '#C1C1C1'},
      page: 1,
      totalPage: 0,
      productid: "",
      loading: true,
      date: new Date("2019-04-02"),
      isSearching: false,
      contrastbox: false,
      title: "",
      tableData: [],
      chooseregionText: "", // 已选择地区的页面显示文字
      activeName: "first",
      urbanHierarchy: [], // 地域
      urbanHierarchyCode: "", // 城市等级编码，传入需要封装到 params 中
      regionCode: "", // 区域编码，传入需要封装到 params 中
      region: [], // 地区
      province: [], // 省份
      provinceCode: "", // 	省份编码，传入需要封装到 params 中
      noshow: false
    };
  },
  watch: {
    $route() {}
  },
  created() {
    window.addEventListener("setItem", () => {
      this.newVal = sessionStorage.getItem("watchStorage");
      this.isSearching = this.newVal;
    });
  },
  mounted() {
    this.getcookie();
    this.gettableDate();
    this.getCityList(); // 获取城市列表
  },
  methods: {
    renderHeader(h, { column }) {
      return h("i", {
        class: "el-icon-setting"
      });
    },
    alink({ id }) {
      this.$router.push(`/box_office/arrange/investDails/id=${id}`);
    },
    // 获取c城市列表接口
    getCityList() {
      let _this = this;
      _this
        .$http({
          url: _this.$http.adornUrl("/web/sysdict/dictOfRegion"),
          method: "post",
          data: {}
        })
        .then(({ data }) => {
          if (data.code === 0) {
            _this.urbanHierarchy = data.urbanHierarchy;
            _this.region = data.region;
            _this.province = data.province;
            _this.cityOption = data.city;
          } else {
            _this.urbanHierarchy = [];
            _this.region = [];
            _this.province = [];
            alert("暂无数据");
          }
        });
    },
    contrast() {
      this.contrastbox = true;
    },
    handleClick(tab, event) {},
    // 选择地域
    chooseUrban(val) {
      let _this = this;
      // console.log(val)
      _this.chooseregionText = val.label;
      _this.urbanHierarchyCode = val.value;
      // _this.getData()
    },
    // 选择地区
    chooseRegion(val) {
      let _this = this;
      console.log(val);
      _this.regionCode = val.value;
      _this.chooseregionText = val.label;
      // _this.getData()
    },
    // 选择省份
    chooseProvince(val) {
      let _this = this;
      console.log(val);
      _this.provinceCode = val.id;
      _this.chooseregionText = val.value;
      // _this.getData()
    },
    // 格式化时间
    CurentTime(now) {
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var clock = year + "-";
      if (month < 10) clock += "0";
      clock += month + "-";
      if (day < 10) clock += "0";
      clock += day;
      return clock;
    },
    //获取productid
    getcookie() {
      this.productid = this.$cookie.get("productid");
    },
    //获取列表数据
    gettableDate() {
      this.$http({
        url: this.$http.adornUrl(
          "/web/boxoffice/boxofficeanalysiscinema/" +
            this.productid +
            "/" +
            this.CurentTime(this.date) +
            "?current=" +
            this.page +
            "&size=10"
        ),
        method: "POST"
      })
        .then(({ data }) => {
          console.log(data, "==============================");
          this.loading = false;
          this.tableData = data.page.records;
          this.totalPage = Number(data.page.total);
        })
        .catch(err => {
          // console.log('请求失败：');
        });
    },
    //分页
    handleCurrentChange(val) {
      this.loading = true;
      this.page = val;
      this.gettableDate();
    },
    //修改日期
    changeDate() {
      this.loading = true;
      this.page = 1;
      this.gettableDate();
    }
  }
};
</script>

<style scoped>
@import "../css/box-office.css";
@import "../css/shape.css";
@import "../css/legend.css";
@import "../css/color.css";
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
