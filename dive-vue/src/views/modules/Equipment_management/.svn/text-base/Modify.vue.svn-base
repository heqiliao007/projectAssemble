<template>
  <div>
    <common-header :headChange="headChange"></common-header>
    <div class="box">
      <div class="modifya">
        <!-- 标题 -->
        <el-row :gutter="20">
          <el-col :span="22" :offset="1">
            <div class="title_one">装具检索</div>
          </el-col>
        </el-row>
        <!-- 表单 -->
        <el-row :gutter="20">
          <el-col :span="22" :offset="1">
            <div class="form_retrieval">
              <div class="kuang">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item style="width:100%">
                        <div slot="label">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</div>
                        <el-input v-model="formInline.number" style="width:93%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item>
                        <div slot="label">单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</div>
                        <el-input v-model="formInline.institution" style="width:93%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item>
                        <div slot="label">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</div>
                        <el-select v-model="formInline.diveEquipmentCategory" style="width:87%">
                          <el-option v-for="categorys in categorys" :key="categorys.id" :label="categorys.label" :value="categorys.value">{{categorys.label}}</el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item>
                        <div slot="label">型号：</div>
                        <el-select v-model="formInline.diveEquipmentCategoryType" style="width:87%">
                          <el-option v-for="categorys in categorys" :key="categorys.id" :label="categorys.label" :value="categorys.value">{{categorys.label}}</el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="12" class="purchase">
                      <span class="el-form-item__label">配购日期：</span>
                      <el-date-picker
                        v-model="value1"
                        type="datetimerange"
                        range-separator="至"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        size="mini"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </el-col>
                    <el-col :span="11" class="purchase_two">
                      <span class="el-form-item__label">首次使用：</span>
                      <el-date-picker
                        v-model="value2"
                        type="datetimerange"
                        range-separator="至"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        size="mini"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </el-col>
                    <el-col :span="1">
                      <el-form-item>
                        <el-button type="primary" @click="onSubmit" style="background:#1288FF">查询</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- 标题 -->
        <el-row :gutter="20">
          <el-col :span="22" :offset="1">
            <div class="title_two">潜水装具信息库</div>
          </el-col>
        </el-row>
        <!-- 表单 -->
        <el-row :gutter="20">
          <el-col :span="22" :offset="1">
            <div class="function_keys">
              <div class="top">
                <div class="left">
                  <el-button type="primary" @click="to_Details" v-if="buttonType === '1'">查看/修改</el-button>
                  <el-button type="primary" @click="deleteDetail" v-else>报废装具</el-button>
                </div>
                <div class="right">
                  <div class="one_icon" title="保存"></div>
                  <div class="two_icon" title="打印"></div>
                  <div class="three_icon" title="疑难"></div>
                  <div class="four_icon" title="关闭"></div>
                </div>
              </div>
              <div class="bottom">
                <el-table
                  border
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  :header-cell-class-name="handlemyclass"
                  :header-cell-style="headerstyle"
                  @current-change="handleSelectionChange"
                  
                >
                  <el-table-column
                    label="选中"
                    width="60"
                    align="center"
                    >
                    <template slot-scope="scope" >
                      <el-checkbox  v-model="scope.row.checked"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="编号" width="120" align="center">
                    <template slot-scope="scope">{{ scope.row.number }}</template>
                  </el-table-column>
                  <el-table-column  prop="tableData.number" label="型号" width="170" align="center">
                    <template slot-scope="scope">
                      <span v-for="(item,index) in categorys"  :key='index'>
                        <span  v-show="item.value == scope.row.diveEquipmentCategoryType">{{item.label}}</span>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="institution" label="单位" show-overflow-tooltip align="center"></el-table-column>
                  <el-table-column prop="purchaseTime" label="配购日期"  align="center" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="productionUnit" label="生产单位"  align="center"></el-table-column>
                  <el-table-column prop="firstUseTime" label="首次使用日期"  align="center"></el-table-column>
                </el-table>
              </div>
              <!-- 分页 -->
              <div class="paging">
                <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[ 20, 30]"
                  :page-size="10"
                  layout="slot, prev, pager, next, jumper"
                  :total="Number(totalCount)"
                  style="margin-top:20px;"
                  >
                  <span style="width:49%; margin-left:2%; margin-bottom:1%;">本页显示：{{(currentPage-1)*pageSize+1}}-{{currentPage*pageSize}} &nbsp;&nbsp;总记录数：{{totalCount}}</span>
                  </el-pagination>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="color"></div>
    </div>
  </div>
</template>

<script>
import commonHeader from '../../common/base/Header'
import headerIcon from '@/assets/img/icon/header/equipment.png'
export default {
  name: 'Modify',
  components: {
    commonHeader
  },
  // 注入依赖
  inject: ['reload'],
  data () {
    return {
      value1: '',
      categorys: [],
      value2: '',
      formInline: {
        'number': '',
        'institution': '',
        'diveEquipmentCategory': '',
        'diveEquipmentCategoryType': '',
        'purchaseStartTime': '',
        'purchaseEndTime': '',
        'firstUseStartTime': '',
        'firstUseEndTime': '',
        'query': {
          'currPage': '1',
          'limit': '10'
        }
      },
      file_id: '',
      headChange: {
        title: '潜水装备管理系统',
        headIcon: headerIcon
      },
      buttonType: '',
      multipleSelection: '',
      tableData: [],
      // 当前页数
      currentPage: 1,
      // 总页数
      totalPage: '',
      // 总记录数
      totalCount: '',
      // 每页显示多少条
      pageSize: 10,
      // 每页显示多少条
      query: {
        currPage: this.currentPage,
        pageSize: this.pageSize
      }
    }
  },
  mounted () {
    let _this = this
    // 判断是删除还是查看详情
    // console.log(_this.$route.query.type)
    _this.buttonType = _this.$route.query.type
  },
  created () {
    this.category()
    this.onSubmit()
  },
  methods: {
    // 刷新
    refresh () {
      this.reload()
    },
    onSubmit () {
      let _this = this
      _this.formInline.purchaseStartTime = _this.value1[0]
      _this.formInline.purchaseEndTime = _this.value1[1]
      _this.formInline.firstUseStartTime = _this.value2[0]
      _this.formInline.firstUseEndTime = _this.value2[1]
      console.log(this.formInline)
      _this.$http({
        url: _this.$http.adornUrl('/dive/dediveequipment/list'),
        method: 'POST',
        data: _this.formInline
      }).then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          data.page.list.forEach(item => {
            item.checked = false
          })
          _this.tableData = data.page.list
          this.totalPage = data.page.totalPage
          // 总记录数
          this.totalCount = data.page.totalCount
          // 当前页
          this.currentPage = data.page.currPage
          // 一页多少条
          this.pageSize = data.page.pageSize
          console.log(_this.tableData)
        }
      })
    },
    // 删除
    deleteDetail () {
      // console.log('删除')
      this.$confirm('请确认是否删除选中的数据?', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let dataArr = []
        dataArr.push(this.multipleSelection)
        this.$http({
          url: this.$http.adornUrl('/dive/dediveequipment/delete'),
          method: 'POST',
          data: JSON.stringify(dataArr)
        }).then(({data}) => {
          console.log(data)
          if (data && data.code === 0) {
            this.$message({
              message: '数据删除成功',
              type: 'success'
            })
            // 刷新
            this.refresh()
          } else {
            this.$message.error('数据删除失败')
          }
        })
      }).catch(() => {})
    },
    category () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: {
          'type': 'dive_equipment_category'
        }
      }).then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          _this.categorys = data.dict
        }
      })
    },
    handleSelectionChange (val) {
      this.tableData.forEach(item => {
        if (item.id !== val.id) {
          item.checked = false
        }
      })
      this.multipleSelection = val.id
    },
    handlemyclass (row, column, rowIndex, columnIndex) {
      if (row.columnIndex !== 7) {
        return 'txt'
      }
    },
    headerstyle () {
      return 'background:rgba(244,249,255,1)'
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      let _this = this
      _this.query.currPage = val
      _this.query.pageSize = 10
      _this.$http({
        url: _this.$http.adornUrl('/dive/dediveequipment/list'),
        method: 'POST',
        data: _this.query
      }).then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          _this.tableData = data.page.list
          this.totalPage = data.page.totalPage
          // 总记录数
          this.totalCount = data.page.totalCount
          // 当前页
          this.currentPage = data.page.currPage
          // 一页多少条
          this.pageSize = data.page.pageSize
        }
      })
    },
    to_Details () {
      this.$router.push({
        name: 'equipment_details',
        params: {
          id: this.multipleSelection
        }
      })
      console.log('Sss')
    }
  }
}
</script>

<style lang="scss" scoped>
// 四张图片
.one_icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../../../assets/img/figure/baocun.png);
  background-size: 100% 100%;
  width: 36px;
  height: 36px;
}
.one_icon:hover {
  background: url(../../../assets/img/figure/baocun_select.png);
  background-size: 100% 100%;
  width: 36px;
  height: 36px;
}
.two_icon {
  background: url(../../../assets/img/figure/dayin.png);
  background-size: 100% 100%;
  width: 36px;
  height: 36px;
}
.two_icon:hover {
  background: url(../../../assets/img/figure/dayin_select.png);
  background-size: 100% 100%;
  width: 36px;
  height: 36px;
}
.three_icon {
  background: url(../../../assets/img/figure/help_icon.png);
  background-size: 100% 100%;
  width: 36px;
  height: 36px;
}
.three_icon:hover {
  background: url(../../../assets/img/figure/help_select.png);
  background-size: 100% 100%;
  width: 36px;
  height: 36px;
}
.four_icon {
  background: url(../../../assets/img/figure/guanbi.png);
  background-size: 100% 100%;
  width: 36px;
  height: 36px;
}
.four_icon:hover {
  background: url(../../../assets/img/figure/guanbi_select.png);
  background-size: 100% 100%;
  width: 36px;
  height: 36px;
}
.color {
  height: 20px;
  background: rgba(77, 77, 77, 1);
}
.paging {
  height: 50px;
}
// 背景
.modifya {
  background: #eeeeee;
  width: 100%;
  min-height: 900px;
  overflow: hidden;
}
// 标题
.title_one {
  width: 104px;
  height: 35px;
  font-size: 26px;
  font-family: PingFang-SC-Regular;
  color: rgba(77, 77, 77, 1);
  border-bottom: 3px solid #1288ff;
  margin-top: 30px;
}
// 标题2
.title_two {
  width: 182px;
  height: 35px;
  font-size: 26px;
  font-family: PingFang-SC-Regular;
  color: rgba(77, 77, 77, 1);
  border-bottom: 3px solid #1288ff;
  margin-top: 30px;
}
// 表单
.form_retrieval {
  background: #ffffff;
  min-height: 200px;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
//表格
.function_keys {
  background: #ffffff;
  min-height: 240px;
  margin-top: 15px;
  .top {
    height: 60px;
    width: 96%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      width: 180px;
      display: flex;
      justify-content: space-between;
    }
  }
  .bottom {
    width: 96%;
    margin: 0 auto;
    min-height: 370px;
  }
}
//居中
.kuang {
  width: 96%;
  min-height: 110px;
  margin: 0 auto;
}

.line_two {
  display: inline-block;
}

</style>
<style lang="scss">
.txt {
        border-right: 1px solid rgba(170, 206, 254, 1)!important;
        width: 3px;
      }
.o .el-form-item__label {
  padding: 0 35px 0 0 !important;
}
.k .el-form-item__label {
  padding: 0 35px 0 0 !important;
}
.k .el-form-item {
  margin-right: 46px !important;
}
.l .el-form-item--medium {
  margin-right: 0px !important;
  margin-left: 35px;
}
.l {
  width: 100px !important;
}
.m .el-form-item__label {
  margin-left: 75px;
}
.top .el-button--primary {
  background-color: #1288ff;
  border-color: #1288ff;
}
.paging .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #1288ff;
  color: #fff;
}
.modifya .el-form--inline .el-form-item {
  margin-right: 0;
}

.el-form-item__label {
  font-family: PingFang-SC-Regular;
  font-size: 18px;
  color: rgba(51, 51, 51, 1);
}
.modifya .el-form-item__content {
  width: 60%;
}
.modifya .el-table {
  font-size: 18px;
}
.purchase .el-date-editor {
  width: 72%;
}
.purchase_two .el-date-editor {
  width: 68%;
}
</style>

