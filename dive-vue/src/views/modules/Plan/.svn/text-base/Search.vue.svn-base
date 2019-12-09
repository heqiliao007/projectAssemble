<template>
<div>
    <common-header :headChange="headChange"></common-header>
    <div class="box">
        <el-row class="plan">
            <el-col :span="4">
                  <common-plan-sidebar :curIndex='curIndex'></common-plan-sidebar>
            </el-col>
            <el-col :span="20">
                <div style="background:#eeeeee; min-height:905px; overflow: hidden;">
                    <div class="title_one">计划检索</div>
                    <div class="box_one">
                        <!-- 搜索 -->
                        <el-form ref="form" :model="form" label-width="180px" style="margin:0 auto; width:70%; margin-top: 50px; height:160px;">
                            <el-form-item>
                                <div slot="label" style="font-size:18px;">项目名称关键词：</div>
                                <el-input v-model="form.name" placeholder="请输入关键字" style="width:80%"></el-input>
                            </el-form-item>
                            <el-form-item>
                              <div slot="label" style="font-size:18px;">计划制定日期范围：</div>
                                <el-date-picker
                                  v-model="dates"
                                  type="daterange"
                                  style="width:80%;"
                                  range-separator="-"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  format="yyyy 年 MM 月 dd 日"
                                  value-format="yyyy-MM-dd">
                                </el-date-picker>
                                <el-button type="primary" @click="searchTable" size="medium" style="background:#1288FF;float:right;">搜索</el-button>
                              </el-form-item>
                        </el-form>
                        <!-- 调用 -->
                        <el-row style="width:98%;margin:20px auto 10px;" v-if="buttonType === '1'">
                          <el-button type="primary" style="font-size:16px;" @click="sureSelect('invoke')">确定</el-button>
                        </el-row>
                        <el-row style="width:98%;margin:20px auto 10px;" v-else>
                          <el-button type="primary" style="font-size:16px;" @click="sureSelect('edit')">确定</el-button>
                          <el-button type="primary" style="font-size:16px;" @click="deleteSelect">删除</el-button>
                        </el-row>
                        <!-- 表格 -->
                        <div class="kuang" style="border:1px solid #1288FF; width:98%;margin:0 auto;">
                        <el-table
                          :data="tableData"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          style="width: 100%; min-height:504px;"
                          @current-change="handleSelectionChange"
                        >
                          <el-table-column label="选中" width="60" align="center">
                            <template slot-scope="scope">
                              <el-checkbox v-model="scope.row.checked" @change="singleChange(scope.row)"></el-checkbox>
                            </template>
                          </el-table-column>
                          <el-table-column prop="name" label="潜水计划名称" align="center"></el-table-column>
                          <el-table-column prop="content" label="基本内容" align="center"></el-table-column>
                          <el-table-column prop="formulateStartTime" label="开始制定计划时间" align="center"></el-table-column>
                          <el-table-column prop="formulateEndTime" label="结束制定计划时间" align="center"></el-table-column>
                        </el-table>
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
                            <span style="width:45%; margin-left:2%; margin-bottom:1%;">本页显示：{{(currentPage-1)*pageSize+1}}-{{currentPage*pageSize}}&nbsp;&nbsp;总记录数：{{totalCount}}</span>
                            </el-pagination>
                        </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</div>
    
</template>

<script>
import commonHeader from '../../common/base/Header'
import CommonPlanSidebar from '@/views/common/base/Plan_sidebar'
import headerIcon from '@/assets/img/icon/header/plan.png'
import { mapMutations } from 'vuex'

export default {
  name: 'Search',
  components: {
    commonHeader,
    CommonPlanSidebar
  },
  // 注入依赖
  inject: ['reload'],
  data () {
    return {
      headChange: {
        title: '潜水作业计划制定系统',
        headIcon: headerIcon
      },
      curIndex: -1,
      form: {
        name: '',
        formulateStartTime: '',
        formulateEndTime: ''
      },
      dates: '',
      tableData: [],
      // 当前页数
      currentPage: 1,
      // 总页数
      totalPage: '',
      // 总记录数
      totalCount: '',
      // 每页显示多少条
      pageSize: 10,
      query: {
        page: '',
        limit: ''
      },
      // 按钮类型
      buttonType: '',
      // 选中的id
      selectedId: '',
      // 确定类型
      selectedType: ''
    }
  },
  created () {
    // 判断是调用还是编辑
    this.buttonType = this.$route.query.type
  },
  mounted () {
    this.getTableData()
    // this['planId/changePlanId']('')
  },
  methods: {
    // 刷新
    refresh () {
      this.reload()
    },
    // 获取表格数据
    getTableData () {
      // 可以转换成字符串格式
      this.query.page = this.currentPage + ''
      this.query.limit = this.pageSize + ''
      this.$http({
        url: this.$http.adornUrl('/dive/makePlan/list'),
        method: 'POST',
        data: this.$http.adornData({
          'name': this.form.name,
          'formulateStartTime': this.form.formulateStartTime,
          'formulateEndTime': this.form.formulateEndTime,
          'query': this.query
        })
      }).then(({data}) => {
        console.log(data)
        if (data && data.code === 0) {
          data.data.list.forEach(item => {
            item.checked = false
          })
          // 总条数
          this.totalPage = data.data.totalPage
          // 总记录数
          this.totalCount = data.data.totalCount
          // 一页多少条
          this.pageSize = data.data.pageSize
          this.tableData = data.data.list
          // console.log(this.tableData)
        }
      })
    },
    // 点击确定跳转详情页
    sureSelect (param) {
      if (!this.selectedId) {
        this.$confirm('操作失败，请确认是否选择了数据', '操作失败', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        })
        return false
      }
      // 判断是调用还是编辑
      if (param === 'invoke') {
        this.selectedType = '1'
          // 调用
        this.$router.push({name: 'mission_profile', params: {id: this.selectedId, type: this.selectedType}})
      } else if (param === 'edit') {
        this.selectedType = '2'
          // 编辑
        this.$router.push({name: 'mission_profile', params: {id: this.selectedId, type: this.selectedType}})
      }
    },
    // 删除
    deleteSelect () {
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
          this.$http({
            url: this.$http.adornUrl('/dive/makePlan/delete/' + this.selectedId),
            method: 'POST'
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
    // 搜索
    searchTable () {
      // console.log('search!')
      this.getTableData()
    },
    handlemyclass (row, column, rowIndex, columnIndex) {
      // console.log(row.columnIndex)
      if (row.columnIndex !== 5) {
        // console.log(row, column, rowIndex, columnIndex)
        return 'txt'
      }
    },
    headerstyle () {
      return 'background:rgba(244,249,255,1)'
    },
    // 当选择项发生变化时触发
    handleSelectionChange (val) {
      // console.log(val)
      this.tableData.forEach(item => {
        // 单选
        if (item.id !== val.id) {
          item.checked = false
        }
      })
    },
    // 单个输入框发生改变时
    singleChange (val) {
      // console.log(val)
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
    },
    ...mapMutations(['planId/changePlanId'])
  },
  watch: {
    //  计划制定
    dates () {
      [this.form.formulateStartTime, this.form.formulateEndTime] = [this.dates[0], this.dates[1]]
      console.log(this.form.formulateStartTime, this.form.formulateEndTime)
    }
  }
}
</script>

<style lang="scss" scoped>
      .plan{
    display: flex;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
  }
    .box_one {
        margin: 0 auto;
        background: #ffffff;
        height: 866px;
        width: 96%;
        margin-top: 29px;
        overflow: hidden;
    }
    .box_two {
        height: 455px;
        width: 100%;
        border: 1px solid #8AB6E2;
    }
    .title_one {
        width: 105px;
        margin: 30px 2%;
        height: 35px;
        border-bottom: 3px solid #1288FF;
        font-size: 26px;
    }
    .txt {
    border-right: 1px solid rgba(170, 206, 254, 1);
    width: 3px;
    }
    
</style>

<style lang="scss">
.cell {
        font-size: 18px;
    }
</style>

