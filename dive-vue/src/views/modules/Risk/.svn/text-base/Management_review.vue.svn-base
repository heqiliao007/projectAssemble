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
                      <div class="title_one">管理审核</div>
                      <div class="add" style="position: absolute; top: 35px;right: 12px;">
                        <span class="minus">
                        <i class="el-icon-minus"></i>
                        <i class="el-icon-plus"></i>
                        </span>
                    </div>
                        <!-- 表格 -->
                        <div class="kuang" style=" border: 2px solid #AACEFE; width:98%;margin:0 auto;">
                        <el-table
                          :data="tableData"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          style="width: 100%; min-height:158px;"
                          class="ta"
                        >
                          <el-table-column prop="name" label="审核人" width="150" align="center"></el-table-column>
                          <el-table-column 
                          prop="date" 
                          label="潜水监督" 
                          align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.region" v-if="scope.row.name == '姓名'"/>
                                <div class="Open_time" v-else>
                                <el-date-picker
                                    placeholder="选择日期"
                                    style="width:100%"
                                    v-model="scope.row.fallIllTime"
                                    align="right"
                                    type="date"
                                    prefix-icon="el-icon-date"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                ></el-date-picker>
                                </div>
                             </template>
                          </el-table-column>
                          <el-table-column 
                          prop="date" label="潜水长" 
                          align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.region" v-if="scope.row.name == '姓名'"/>
                                <div class="Open_time" v-else>
                                    <el-date-picker
                                    placeholder="选择日期"
                                    style="width:100%"
                                    v-model="scope.row.fallIllTime"
                                    align="right"
                                    type="date"
                                    prefix-icon="el-icon-date"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    ></el-date-picker>
                                </div>
                                </template>
                          </el-table-column>
                          <el-table-column 
                          prop="date" label="现场指挥" 
                          align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.region" v-if="scope.row.name == '姓名'"/>
                                <div class="Open_time" v-else>
                                    <el-date-picker
                                    placeholder="选择日期"
                                    style="width:100%"
                                    v-model="scope.row.fallIllTime"
                                    align="right"
                                    type="date"
                                    prefix-icon="el-icon-date"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    ></el-date-picker>
                                </div>
                                </template>
                          </el-table-column>
                          <el-table-column 
                          prop="date" 
                          label="总指挥" 
                          align="center">
                            <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.region" v-if="scope.row.name == '姓名'"/>
                              <div class="Open_time" v-else>
                                <el-date-picker
                                 placeholder="选择日期"
                                  style="width:100%"
                                  v-model="scope.row.fallIllTime"
                                  align="right"
                                  type="date"
                                  prefix-icon="el-icon-date"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                ></el-date-picker>
                              </div>
                            </template>
                          </el-table-column>
                          <el-table-column 
                          prop="date" 
                          label="支持船业务领导" 
                          align="center">
                            <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.region" v-if="scope.row.name == '姓名'"/>
                              <div class="Open_time" v-else>
                                <el-date-picker
                                 placeholder="选择日期"
                                  style="width:100%"
                                  v-model="scope.row.fallIllTime"
                                  align="right"
                                  type="date"
                                  prefix-icon="el-icon-date"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                ></el-date-picker>
                              </div>
                            </template>
                          </el-table-column>
                          <el-table-column 
                          prop="date" 
                          label="单位首长" 
                          align="center">
                            <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.region" v-if="scope.row.name == '姓名'"/>
                              <div class="Open_time" v-else>
                                <el-date-picker
                                 placeholder="选择日期"
                                  style="width:100%"
                                  v-model="scope.row.fallIllTime"
                                  align="right"
                                  type="date"
                                  prefix-icon="el-icon-date"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                ></el-date-picker>
                              </div>
                            </template>
                          </el-table-column>
                        </el-table>
                        </div>
                        <div class="head">
                            <div style="background:rgb(244, 249, 255); height:40px;"><span style="margin-left:2%; line-height:40px; ">本项目风险管理责任人</span></div>
                            <el-form ref="form" :model="form" label-width="80px" style="margin-top:10px;">
                                <el-col :span="12">
                                <el-form-item label="姓名">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                <el-form-item label="职务">
                                    <el-select v-model="form.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                </el-col>
                                <el-col :span="20">
                                <el-form-item label="单位">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                                </el-col>
                            </el-form>
                        </div>
                        <el-button type="primary" style="position:absolute; top:350px;right:155px;">完成审核</el-button>
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
  name: 'Management_review',
  data () {
    return {
      // curIndex: 0,
      form: {
        name: '',
        region: '',
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
        date: '姓名',
        name: '姓名',
        address: '上海市普陀区 1518 弄'
      }, {
        date: '时间',
        name: '时间',
        address: '上海市普陀区 1517 弄'
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
    .box_one {
        margin: 0 auto;
        background: #ffffff;
        min-height: 846px;
        width: 96%;
        margin-top: 29px;
        overflow: hidden;
        position: relative;
    }
    .box_two {
        height: 455px;
        width: 100%;
        border: 1px solid #8AB6E2;
    }
    .title_one {
        width: 210px;
        margin: 40px auto;
        height: 15px;
        font-size: 26px;
        color: #999999FF;
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
    
    //icon图标大小
.minus .el-icon-minus {
  font-size: 36px;
  background: rgba(244, 244, 244, 1);
  border: 2px solid rgba(98, 98, 98, 1);
  opacity: 0.21;
  border-radius: 2px;
  margin: 0 5px;
}
.minus .el-icon-plus {
  font-size: 36px;
  background: rgba(244, 244, 244, 1);
  border: 2px solid rgba(98, 98, 98, 1);
  opacity: 0.21;
  border-radius: 2px;
}
.head {
    width: 67%;
    height: 160px;
    margin-left: 1%;
    margin-top: 30px;
    border: 2px solid #AACEFE;
    display: inline-block;
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
.ta .el-input--medium .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: 1px;
}

}

</style>

