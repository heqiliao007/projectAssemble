<template>
  <div>
    <common-header :headChange="headChange"></common-header>
    <div class="box">
      <div class="modify">
        <!-- 标题 -->
        <el-row :gutter="20">
          <el-col :span="22" :offset="1">
            <div class="title_one">人员检索</div>
          </el-col>
        </el-row>
        <!-- 表单 -->
        <div class="form_retrieval">
          <div class="kuang">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
              <el-row>
                <el-col :span="6">
                  <el-form-item>
                    <div slot="label">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</div>
                    <el-input v-model="formInline.number" placeholder></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item>
                    <div slot="label">单位：</div>
                    <el-input v-model="formInline.institution" placeholder></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item>
                    <div slot="label">等&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：</div>
                    <el-select v-model="formInline.skillGrade" placeholder>
                      <el-option v-for="(item,index) in skillGradeSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item>
                    <div slot="label">军衔：</div>
                    <el-select v-model="formInline.militaryRank" placeholder>
                      <!-- militaryRankSelection -->
                      <el-option v-for="(item,index) in militaryRankSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <el-form-item>
                    <div slot="label">婚&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姻：</div>
                    <el-select v-model="formInline.marriageStatus" placeholder>
                      <el-option v-for="(item,index) in marriageStatusSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item>
                    <div slot="label">籍贯：</div>
                    <el-input v-model="formInline.nativePlace" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <span class="el-form-item__label">首次潜水：</span>
                  <el-date-picker
                    v-model="formInline.firstDiveExperienceTime"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    size="mini"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                  <el-button type="primary" @click="queryData" size="small" style="margin-left:20px;">查询</el-button>
                </el-col>
              </el-row>

              <el-col :span="12">
                <span class="el-form-item__label">入伍日期：</span>
                <el-date-picker
                  v-model="formInline.enlistedTime"
                  type="daterange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="mini"
                ></el-date-picker>
              </el-col>
              <el-col :span="12">
                <span class="el-form-item__label">出生日期：</span>
                <el-date-picker
                  v-model="formInline.birthday"
                  type="daterange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  size="mini"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-col>
            </el-form>
          </div>
        </div>
        <!-- 标题 -->
        <el-row :gutter="20">
          <el-col :span="22" :offset="1">
            <div class="title_two">潜水人员信息库</div>
          </el-col>
        </el-row>
        <!-- 表单 -->
        <el-row :gutter="20">
          <el-col :span="22" :offset="1">
            <div class="function_keys">
              <div class="top">
                <div class="left">
                  <el-button type="primary" @click="watchDetail" v-if="buttonType === '1'">查看/修改</el-button>
                  <el-button type="primary" @click="deleteDetail" v-else>删除</el-button>
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
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%;"
                  @current-change="handleSelectionChange"
                  highlight-current-row
                  :header-cell-style="headerstyle" 
                >
                  <el-table-column label="选中" width="60" align="center">
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.checked" @change="singleChange(scope.row)"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="编号" width="140" align="center">
                    <template slot-scope="scope">{{ scope.row.number }}</template>
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" width="120" align="center"></el-table-column>
                  <el-table-column prop="institution" label="单位" show-overflow-tooltip align="center"></el-table-column>
                  <el-table-column prop="skillGrade" label="等级" width="120" align="center"></el-table-column>
                  <el-table-column prop="militaryRank" label="军衔" width="120" align="center"></el-table-column>
                  <el-table-column prop="firstDive" label="首次潜水日期" align="center"></el-table-column>
                </el-table>
              </div>
              <!-- 分页 -->
              <div class="paging">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
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
import headerIcon from '@/assets/img/icon/header/personal.png'
export default {
  name: 'Modify',
  components: {
    commonHeader
  },
  // 注入依赖
  inject: ['reload'],
  data () {
    return {
      headChange: {
        title: '潜水人员管理系统',
        headIcon: headerIcon
      },
      // firstDiveExperienceTimeStart: '',
      // firstDiveExperienceTimeEnd: '',
      // enlistedTimeStart: '',
      // enlistedTimeEnd: '',
      // birthdayStart: '',
      // birthdayEnd: '',
      // 选中的id
      selectedId: '',
      // 按钮的值
      buttonType: '',
      // 等级选项
      skillGradeSelection: '',
      // 军衔选项
      militaryRankSelection: '',
      // 婚姻状态选项
      marriageStatusSelection: '',
      formInline: {
        'number': '',
        'institution': '',
        'skillGrade': '',
        'militaryRank': '',
        'marriageStatus': '',
        'nativePlace': '',
        'firstDiveExperienceTime': '',
        'enlistedTime': '',
        'birthday': ''
      },
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
      // query: {
      //   currPage: 'currentPage',
      //   pageSize: pageSize
      // }
      query: {
        page: '',
        limit: ''
      }
    }
  },
  created () {
    let _this = this
    // 判断是删除还是查看详情
    // console.log(_this.$route.query.type)
    _this.buttonType = _this.$route.query.type
  },
  mounted () {
    let _this = this
    // 获取表格数据
    _this.getTableData()
    // 等级
    _this.getSkillGrade()
    // // 军衔
    _this.getMilitaryRank()
    // 婚姻
    _this.marriageStatus()
  },
  computed: {
    // 首次潜水开始时间
    firstDiveExperienceTimeStart: {
      get () {
        if (this.formInline.firstDiveExperienceTime !== '') {
          return this.formInline.firstDiveExperienceTime[0]
        } else {
          return ''
        }
      }
    },
    firstDiveExperienceTimeEnd: {
      // 首次潜水结束时间
      get () {
        if (this.formInline.firstDiveExperienceTime !== '') {
          return this.formInline.firstDiveExperienceTime[1]
        } else {
          return ''
        }
      }
    },
    enlistedTimeStart: {
      // 入伍开始时间
      get () {
        if (this.formInline.enlistedTime !== '') {
          return this.formInline.enlistedTime[0]
        } else {
          return ''
        }
      }
    },
    enlistedTimeEnd: {
      // 入伍结束时间
      get () {
        if (this.formInline.enlistedTime !== '') {
          return this.formInline.enlistedTime[1]
        } else {
          return ''
        }
      }
    },
    birthdayStart: {
      // 生日开始时间
      get () {
        if (this.formInline.birthday !== '') {
          return this.formInline.birthday[0]
        } else {
          return ''
        }
      }
    },
    birthdayEnd: {
      // 生日结束时间
      get () {
        if (this.formInline.birthday !== '') {
          return this.formInline.birthday[1]
        } else {
          return ''
        }
      }
    }
  },
  methods: {
    // 刷新
    refresh () {
      this.reload()
    },
    // 等级
    getSkillGrade () {
      this.$http({
        url: this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: this.$http.adornData({
          'type': 'diver_skill_grade'
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          console.log(data)
          this.skillGradeSelection = data.dict
        }
      })
    },
    // 军衔
    getMilitaryRank () {
      this.$http({
        url: this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: this.$http.adornData({
          'type': 'people_rank'
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          console.log(data)
          this.militaryRankSelection = data.dict
        }
      })
    },
    // 婚姻
    marriageStatus () {
      this.$http({
        url: this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: this.$http.adornData({
          'type': 'people_marriage_status'
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          console.log(data)
          this.marriageStatusSelection = data.dict
        }
      })
    },
    // 查询
    queryData () {
      // console.log(this.firstDiveExperienceTimeStart, this.firstDiveExperienceTimeEnd)
      this.getTableData()
    },
    // 删除
    deleteDetail () {
      // console.log('删除')
      if (this.selectedId === '') {
        this.$alert('操作失败，请确认是否选择了数据', '操作失败', {
          confirmButtonText: '确定'
        })
      } else {
        this.$confirm('请确认是否删除选中的数据?', '确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let dataArr = []
          dataArr.push(this.selectedId)
          this.$http({
            url: this.$http.adornUrl('/dive/diver/delete'),
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
      }
    },
    // 查看详情
    watchDetail () {
      this.$router.push({name: 'personnel_details', params: { id: this.selectedId }})
    },
    // 获取表格数据
    getTableData () {
      // 可以转换成字符串格式
      this.query.page = this.currentPage + ''
      this.query.limit = this.pageSize + ''
      this.$http({
        url: this.$http.adornUrl('/dive/diver/list'),
        method: 'POST',
        data: this.$http.adornData({
          'number': this.formInline.number,
          'institution': this.formInline.institution,
          'skillGrade': this.formInline.skillGrade,
          'militaryRank': this.formInline.militaryRank,
          'marriageStatus': this.formInline.marriageStatus,
          'nativePlace': this.formInline.nativePlace,
          'firstDiveExperienceTimeStart': this.firstDiveExperienceTimeStart,
          'firstDiveExperienceTimeEnd': this.firstDiveExperienceTimeEnd,
          'enlistedTimeStart': this.enlistedTimeStart,
          'enlistedTimeEnd': this.enlistedTimeEnd,
          'birthdayStart': this.birthdayStart,
          'birthdayEnd': this.birthdayEnd,
          'query': this.query
        })
      }).then(({data}) => {
        console.log(data)
        if (data && data.code === 0) {
          // data.page.list.forEach(item => {
            // item.checked = false
          // })
          // 总条数
          this.totalPage = data.page.totalPage
          // 总记录数
          this.totalCount = data.page.totalCount
          // 当前页
          // this.currentPage = data.page.currPage
          // 一页多少条
          this.pageSize = data.page.pageSize
          this.tableData = data.page.list
        }
      })
    },
    headerstyle () {
      return 'background:rgba(244,249,255,1)'
    },
    // 当选择项发生变化时触发
    handleSelectionChange (val) {
      console.log(val.id)
      this.tableData.forEach(item => {
        if (item.id !== val.id) {
          item.checked = false
        }
      })
    },
     // 单个输入框发生改变时
    singleChange (val) {
      console.log(val)
      if (!val.checked) {
        this.selectedId = ''
      } else {
        this.selectedId = val.id
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getTableData()
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
.modify {
  background: #eeeeee;
  width: 100%;
  min-height: 900px;
  overflow: hidden;
}
// 标题
.title_one {
  width: 104px;
  height: 37px;
  font-size: 26px;
  font-family: PingFang-SC-Regular;
  color: rgba(77, 77, 77, 1);
  border-bottom: 3px solid #1288ff;
  margin-top: 30px;
}
// 标题2
.title_two {
  width: 182px;
  height: 37px;
  font-size: 26px;
  font-family: PingFang-SC-Regular;
  color: rgba(77, 77, 77, 1);
  border-bottom: 3px solid #1288ff;
  margin-top: 30px;
}
// 表单
.form_retrieval {
  background: #ffffff;
  min-height: 240px;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 92%;
  margin: 15px auto;
}
//表格
.function_keys {
  background: #ffffff;
  min-height: 240px;
  margin-top: 15px;
  margin-bottom: 100px;
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
    border:1px solid #1288FF;
  }
}
//居中
.kuang {
  width: 94%;
  min-height: 110px;
}
.el-date-editor {
  width: 66%;
}

.line_two {
  display: inline-block;
}
@media (max-width: 768px) {
  .l .el-form-item--medium {
    margin-right: 0px !important;
    margin-left: 0px;
  }
  .m .el-form-item__label {
    margin-left: 0px;
  }
  .line_two {
    margin-top: 20px;
  }
}
</style>
<style lang="scss">
.l {
  width: 100px !important;
}

/* 分页 */
.top .el-button--primary {
  background-color: #1288ff;
  border-color: #1288ff;
}
.paging .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #1288ff;
  color: #fff;
}

@media (max-width: 768px) {
  .paging .btn-prev {
    margin-left: 0px !important;
  }
}
.el-form-item__label {
  font-family: PingFang-SC-Regular;
  font-size: 18px;
  color: rgba(51, 51, 51, 1);
}

.modify .el-form-item__content {
  width: 58%;
}
.modify .el-table {
  font-size: 18px;
}
.modify .el-table thead {
    color: #666666FF!important;
}
</style>

