<template>
<div class="risk_search">
    <!-- <common-header :headChange="headChange"></common-header>
    <div class="box">
        <el-row class="plan">
            <el-col :span="4">
                  <common-plan-sidebar :curIndex='curIndex'></common-plan-sidebar>
            </el-col>
            <el-col :span="20"> -->
                <div style="background:#eeeeee; min-height:905px; overflow: hidden;">
                    <div class="box_one">
                      <div class="title_one">总体决策</div>
                        <!-- 表格 -->
                        <div class="kuang" style=" border: 2px solid #AACEFE; width:98%;margin:0 auto;">
                        <el-table
                          :data="tableData"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          style="width: 100%; min-height:335px;"
                        >
                        <el-table-column>
                          <el-table-column prop="address" label="项目类别" width="250" align="center"></el-table-column>
                        </el-table-column>
                        <el-table-column>
                          <el-table-column prop="date" label="项目数" align="center" width="130"></el-table-column>
                        </el-table-column>
                        <el-table-column label="各类别风险的项目数量" align="center">
                          <el-table-column prop="date" label="无" align="center" width="130"></el-table-column>
                          <el-table-column prop="date" label="低" align="center" width="130"></el-table-column>
                          <el-table-column prop="date" label="较低" align="center" width="130"></el-table-column>
                          <el-table-column prop="date" label="中" align="center" width="130"></el-table-column>
                          <el-table-column prop="date" label="较高" align="center" width="130"></el-table-column>
                          <el-table-column prop="date" label="高" align="center" width="130"></el-table-column>
                          <el-table-column prop="date" label="很高" align="center" width="130"></el-table-column>
                          <el-table-column prop="date" label="极高" align="center" width="130"></el-table-column>
                          <el-table-column 
                          prop="date" 
                          label="风险决策" 
                          width="260"
                          align="center">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.expRank" style="width:60%;">
                                    <el-option label="优秀" value="1"></el-option>
                                    <el-option label="良好" value="2"></el-option>
                                    <el-option label="尚可" value="3"></el-option>
                                    <el-option label="一般" value="4"></el-option>
                                    <el-option label="较差" value="5"></el-option>
                                </el-select>
                                <el-button >继续</el-button>
                             </template>
                        </el-table-column>
                        </el-table-column>
                        </el-table>
                        </div>
                        <el-form ref="form" :model="form" label-width="80px" label-position="top" class="evaluation">
                            <div class="left">
                                <el-form-item>
                                    <div slot="label" style="font-size:24px; corlor:#333333FF;">任务风险等级</div>
                                    <el-select v-model="form.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                    <el-input v-model="form.region" style="width:30%;margin-left:15px;"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <div slot="label" style="font-size:24px; corlor:#333333FF;">任务风险决策</div>
                                    <el-select v-model="form.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="right">
                                <el-form-item style="width:100%;">
                                    <div style="font-size:24px; corlor:#333333FF; margin:0 42%; width:100%;">任务风险决策</div>
                                    <el-input type="textarea" v-model="form.desc" style="margin-top:15px;"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                        <div style="position:relative">
                        <div class="right" style="position: absolute;bottom: -45px;right: 13px;">
                          <div class="one_icon" title="保存"></div>
                          <div class="two_icon" title="打印"></div>
                          <div class="three_icon" title="疑难"></div>
                          <div class="four_icon" title="关闭"></div>
                        </div>
                        </div>
                    </div>
                </div>
            <!-- </el-col>
        </el-row>
    </div> -->
</div>
    
</template>

<script>
// import commonHeader from "../../common/base/Header";
// import CommonPlanSidebar from '@/views/common/base/Plan_sidebar'
// import headerIcon from "@/assets/img/icon/header/plan.png";
export default {
  name: 'Overall_decision',
  data () {
    return {
      // curIndex: 0,
      form: {
        name: '',
        region: '0',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [{
        date: '20-05-02',
        name: '王小虎',
        address: '上海市普陀区 1518 弄'
      }, {
        date: '20-05-04',
        name: '王小虎',
        address: '上海市普陀区 1517 弄'
      }, {
        date: '20-05-01',
        name: '王小虎',
        address: '上海市普陀区 1519 弄'
      }, {
        date: '20-05-03',
        name: '王小虎',
        address: '上海市普陀区 1516 弄'
      }],
      value1: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handlemyclass (row, column, rowIndex, columnIndex) {
      console.log(row.columnIndex)
      if (row.columnIndex !== 5) {
        console.log(row, column, rowIndex, columnIndex)
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
      console.log(`当前页: ${val}`)
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
        min-height: 846px;
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
        width: 160px;
        margin: 50px auto;
        height: 15px;
        font-size: 34px;
    }

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
  .right {
    width: 180px;
    display: flex;
    justify-content: space-between;
  }
  .evaluation {
      width: 98%;
      margin: 10px auto;
      display: flex;
      justify-content: space-between;
      .left {
          width: 30%;
          height: 240px;
      }
      .right {
          width: 66%;
          height: 240px;
      }
  }
    
    
</style>

<style lang="scss">
.risk_search {
  .cell {
        font-size: 18px;
    }
.txt {
    border: 2px solid #AACEFE;
    border-right: none;
    border-top:0; 

    &:first-of-type{
            border-left: none;
        } 
    }
 .el-textarea__inner {
    height: 150px;
}

}

</style>

