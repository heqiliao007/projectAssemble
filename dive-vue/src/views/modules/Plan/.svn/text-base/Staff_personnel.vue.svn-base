<template>
<div class="staff">
    <!-- <common-header :headChange="headChange"></common-header>
    <div class="box">
        <el-row  class="plan">
            <el-col :span="4">
                <common-plan-sidebar :curIndex='curIndex'></common-plan-sidebar>
            </el-col>
            <el-col :span="20"> -->
                <div style="background:#eeeeee; min-height:840px; overflow: hidden;">
                    <div class="box_one">
                      <div class="add" style="position: absolute; top: 33px;right: 32px; z-index: 999;">
                            <span class="minus">
                              <i class="el-icon-minus" @click="reduceData"></i>
                              <i class="el-icon-plus" @click="addData"></i>
                            </span>
                      </div>
                    <el-tabs v-model="activeName" @tab-click="handleClick" style="width: 95%;margin: 30px auto;">
                    <!-- 各岗位人员选择 -->
                    <el-tab-pane label="各岗位人员选择" name="second">
                      <div class="small_tabs">
                      <el-tabs tab-position="left" style="height: 325px;" v-model="activeName_children" @tab-click="handleClick">
                        <el-tab-pane label="组织指挥人员" name="third">
                        <div class="tops" style="min-height:320px; border: 1px solid #AACEFE;">
                        <el-table
                          :data="commanderData"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          style="width: 100%"
                          height="320"
                          @row-click="chooseRow"
                          highlight-current-row
                        >
                        <el-table-column 
                        prop="jobs" 
                        label="岗位" 
                        align="center" 
                        width="200">
                        <template slot-scope="scope">
                            <el-input type="text" v-model="scope.row.jobs"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="name" 
                        label="姓名" 
                        align="center" 
                        width="230">
                        <template slot-scope="scope">
                            <el-input type="text" v-model="scope.row.name"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="unit" 
                        label="单位" 
                        align="center" 
                        width="320">
                        <template slot-scope="scope">
                            <el-input type="text" v-model="scope.row.unit"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="position" 
                        label="职务" 
                        align="center">
                        <template slot-scope="scope">
                            <el-input type="text" v-model="scope.row.position"/>
                        </template>
                        </el-table-column>
                        </el-table>
                        </div>
                        </el-tab-pane>
                        <el-tab-pane label="潜水人员" name="four">
                          <div class="tops" style="min-height:320px; border: 1px solid #AACEFE;">
                        <el-table
                          :data="diversData"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          style="width: 100%"
                          @row-click="chooseRow"
                          highlight-current-row
                        >
                        <el-table-column 
                        prop="jobs" 
                        label="岗位" 
                        align="center" 
                        width="150">
                        <template slot-scope="scope">
                            <el-input type="text" v-model="scope.row.jobs"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="name" 
                        label="姓名" 
                        align="center" 
                        width="170">
                        <template slot-scope="scope">
                            <el-input type="text" v-model="scope.row.name"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="unit" 
                        label="单位" 
                        align="center"
                        width="300">
                        <template slot-scope="scope">
                            <el-input type="text" v-model="scope.row.unit"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="level" 
                        label="等级" 
                        align="center" 
                        width="150">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.level"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="position" 
                        label="职务" 
                        align="center">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.position"/>
                        </template>
                        </el-table-column>
                        </el-table>
                        </div>
                        </el-tab-pane>
                        <el-tab-pane label="其他保障人员" name="five">
                          <div class="tops" style="min-height:320px; border: 1px solid #AACEFE;">
                        <el-table
                          :data="securityData"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          style="width: 100%"
                          height="320"
                          @row-click="chooseRow"
                          highlight-current-row
                        >
                        <el-table-column 
                        prop="jobs" 
                        label="岗位" 
                        align="center" 
                        width="200">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.jobs"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="name" 
                        label="姓名" 
                        align="center" 
                        width="230">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.name"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="unit" 
                        label="单位" 
                        align="center" 
                        width="320">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.unit"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="position" 
                        label="职务" 
                        align="center">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.position"/>
                        </template>
                        </el-table-column>
                        </el-table>
                        </div>
                        </el-tab-pane>
                      </el-tabs>
                      </div>

                      <el-row class="bg" style="margin-top:20px;">
                        <el-col :span="14">
                          <el-table
                            :data="tableData"
                            style="width: 100%;"
                            height="350"
                          >
                            <el-table-column label="作业时间" align="center">
                              <el-table-column prop="date" label="岗位" align="center" width="150"></el-table-column>
                              <el-table-column label="开式自携式潜水" align="center">
                              <el-table-column prop="date" label="单人潜水" align="center" width="200"></el-table-column>
                              <el-table-column prop="date" label="结伴潜水" align="center" width="170"></el-table-column>
                              </el-table-column>
                              <el-table-column prop="date" label="水面供气式潜水" align="center"></el-table-column>
                            </el-table-column>
                          </el-table>
                        </el-col>
                        <el-col :span="10">
                          <el-form ref="form" :model="form" label-width="100px">
                            <el-form-item label="岗位职务 " style="font-weight:500; width:100%;">
                                <el-select
                                  v-model="form.region"
                                  placeholder
                                  size="mini"
                                  style="width:100%"
                                >
                                  <el-option label="区域一" value="shanghai"></el-option>
                                  <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="">
                                <el-input type="textarea" v-model="form.desc"></el-input>
                              </el-form-item>
                          </el-form>
                          <div class="right" style="position: absolute;bottom: 20px;right: 0px;">
                          <div class="one_icon"></div>
                          <div class="two_icon"></div>
                          <div class="three_icon"></div>
                          <div class="four_icon"></div>
                        </div>
                        </el-col>
                      </el-row>
                      

                    </el-tab-pane>
                    <!-- 潜水员准备 -->
                    <el-tab-pane label="潜水员准备" name="first">
                      <div class="small_tabs">
                      <el-tabs tab-position="left" style="height: 650px;" v-model="activeName_childrens" @tab-click="handleClick">
                        <el-tab-pane label="潜水员体检" name="six">
                        <div class="tops" style="min-height:650px;">
                          <div style="border: 1px solid #AACEFE; min-height:540px;">
                        <el-table
                          :data="medicalData"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          style="width: 100%"
                          @row-click="chooseRow"
                          highlight-current-row
                        >
                        <el-table-column prop="date" label="日期" align="center">
                        <el-table-column 
                        prop="startTime" 
                        label="开始" 
                        align="center" 
                        width="130">
                        <template slot-scope="scope">
                          <div class="Open_time">
                            <el-date-picker
                              v-model="scope.row.startTime"
                              align="right"
                              type="date"
                              prefix-icon="el-icon-date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd"
                            ></el-date-picker>
                          </div>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="endTime" 
                        label="结束" 
                        align="center" 
                        width="130">
                        <template slot-scope="scope">
                          <div class="Open_time">
                            <el-date-picker
                              v-model="scope.row.endTime"
                              align="right"
                              type="date"
                              prefix-icon="el-icon-date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd"
                            ></el-date-picker>
                          </div>
                        </template>
                        </el-table-column>
                        </el-table-column>
                        <el-table-column 
                        prop="date" 
                        label="医疗机构" 
                        align="center">
                        <el-table-column 
                        prop="name" 
                        label="名称" 
                        align="center" 
                        width="140">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.name"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="address" 
                        label="地址"
                        align="center"  
                        width="230">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.address"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="contactPeople" 
                        label="联系人" 
                        align="center"  
                        width="140">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.contactPeople"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="phone" 
                        label="电话" 
                        align="center">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.phone"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="projectleader" 
                        label="项目负责人" 
                        align="center">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.projectleader"/>
                        </template>
                        </el-table-column>
                        </el-table-column>
                        </el-table>
                        </div>
                        <div style="font-size:18px;">分析体检结果，所有潜水员均需满足“潜水员下潜前身体状况要求”；如有不满足者必须调整备选潜水人员。</div>
                        <div style="margin-top:10px; font-size:18px;"><a>点击</a>打开潜水员下潜前身体状况要求。</div>
                        <div class="right" style="position: absolute;bottom: 0px;right: 0px;">
                          <div class="one_icon"></div>
                          <div class="two_icon"></div>
                          <div class="three_icon"></div>
                          <div class="four_icon"></div>
                        </div>
                        </div>
                        </el-tab-pane>
                        <el-tab-pane label="加压锻炼" name="seven">
                        <div class="tops" style="min-height:650px;">
                          <div style="border: 1px solid #AACEFE; min-height:570px;">
                        <el-table
                          :data="exerciseData"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          style="width: 100%"
                          @row-click="chooseRow"
                          highlight-current-row
                        >
                        <el-table-column prop="date" label="解压方案" align="center">
                        <el-table-column prop="startTime" 
                        label="开始时间" 
                        align="center">
                        <template slot-scope="scope">
                          <div class="Open_time">
                            <el-date-picker
                              v-model="scope.row.startTime"
                              align="right"
                              type="date"
                              prefix-icon="el-icon-date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd"
                            ></el-date-picker>
                          </div>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="exerciseStress" 
                        label="锻炼压力(M)" 
                        align="center" >
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.exerciseStress"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="highPressureTime" 
                        label="高压下停留时间" 
                        align="center" 
                        width="150">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.highPressureTime"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="depth" 
                        label="深度(M)" 
                        align="center">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.depth"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="time" 
                        label="时间(MIN)" 
                        align="center">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.time"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="decompressionTable" 
                        label="减压表" 
                        align="center">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.decompressionTable"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="head" 
                        label="负责人" 
                        align="center">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.head"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="headPosition" 
                        label="负责人职务" 
                        align="center">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.headPosition"/>
                        </template>
                        </el-table-column>
                        </el-table-column>
                        </el-table>
                        </div>
                        <div class="right" style="position: absolute;bottom: 0px;right: 0px;">
                          <div class="one_icon"></div>
                          <div class="two_icon"></div>
                          <div class="three_icon"></div>
                          <div class="four_icon"></div>
                        </div>
                        </div>
                        </el-tab-pane>
                      </el-tabs>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                    </div>
                </div>
            <!-- </el-col>
        </el-row>
    </div> -->
</div>
    
</template>

<script>
// import commonHeader from "../../common/base/Header";
// import headerIcon from "@/assets/img/icon/header/plan.png";
// import CommonPlanSidebar from '@/views/common/base/Plan_sidebar'
export default {
  name: 'Diving_program',
  data () {
    return {
      activeClass: -1,
      isshow: ['前苏联空气潜水减压表.doc', '前苏联空气潜水减压表.doc', '前苏联空气潜水减压表.doc', '前苏联空气潜水减压表.doc', '前苏联空气潜水减压表.doc'],
      dialogVisible: false,
      activeName: 'second',
      activeName_children: 'third',
      activeName_childrens: 'six',
      commanderData: [],
      diversData: [],
      securityData: [],
      medicalData: [],
      exerciseData: [],
      rowCommander: false,
      rowDivers: false,
      rowSecurity: false,
      rowMedical: false,
      rowExercise: false,
      tableData: [
        {
          date: '2016-05-02',
          name: '0',
          address: ' 1518 '
        }
      ],
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
      value1: '',
      // curIndex: 6,
      currentPage4: 5,
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    co (value, index) {
      this.activeClass = index
    },
    handleClick (tab, event) {
      console.log(tab.name)
      console.log(this.activeName_childrens)
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
    // 选择某一行
    chooseRow (row, event, column) {
      let _this = this
      _this.curRow = row.index
      if (_this.activeName === 'second') {
        if (_this.activeName_children === 'third') {
          // 组织指挥人员
          _this.rowCommander = true
        } else if (_this.activeName_children === 'four') {
          // 潜水人员
          _this.rowDivers = true
        } else if (_this.activeName_children === 'five') {
          // 其他保障人员
          _this.rowSecurity = true
        }
      } else {
        if (_this.activeName_childrens === 'six') {
          // 潜水员体检
          _this.rowMedical = true
        } else {
          // 加压锻炼
          _this.rowExercise = true
        }
      }
    },
    // 添加行
    addData () {
      let _this = this
      if (_this.activeName === 'second') {
        // 组织指挥人员
        if (_this.activeName_children === 'third') {
          _this.commanderData.push({'jobs': '', 'name': '', 'unit': '', 'position': ''})
        } else if (_this.activeName_children === 'four') {
          // 潜水人员
          _this.diversData.push({'jobs': '', 'name': '', 'unit': '', 'level': '', 'position': ''})
        } else {
          // 其他保障人员
          _this.securityData.push({'jobs': '', 'name': '', 'unit': '', 'position': ''})
        }
      } else {
        if (this.activeName_childrens === 'six') {
          _this.medicalData.push({'startTime': '', 'endTime': '', 'name': '', 'address': '', 'contactPeople': '', 'phone': '', 'projectleader': ''})
        } else {
          _this.exerciseData.push({'startTime': '', 'exerciseStress': '', 'highPressureTime': '', 'depth': '', 'time': '', 'decompressionTable': '', 'head': '', 'headPosition': ''})
        }
      }
    },
    // 删除一行
    reduceData () {
      let _this = this
      // console.log(_this.activeName)
      if (_this.activeName === 'second') {
        if (_this.activeName_children === 'third') {
          // 组织指挥人员
          if (_this.rowCommander) {
            _this.sureDelete(_this, _this.commanderData, _this.rowCommander)
          } else {
            _this.rowNull(_this)
          }
        } else if (_this.activeName_children === 'four') {
          // 潜水人员
          if (_this.rowDivers) {
            _this.sureDelete(_this, _this.diversData, _this.rowDivers)
          } else {
            _this.rowNull(_this)
          }
        } else if (_this.activeName_children === 'five') {
          // 其他保障人员
          if (_this.rowSecurity) {
            _this.sureDelete(_this, _this.securityData, _this.rowSecurity)
          } else {
            _this.rowNull(_this)
          }
        }
      } else {
        if (_this.activeName_childrens === 'six') {
        // 潜水员体检
          if (_this.rowMedical) {
            _this.sureDelete(_this, _this.medicalData, _this.rowMedical)
          } else {
            _this.rowNull(_this)
          }
        } else {
          // 加压锻炼
          if (_this.rowExercise) {
            _this.sureDelete(_this, _this.exerciseData, _this.rowExercise)
          } else {
            _this.rowNull(_this)
          }
        }
      }
    },
    // 未选择时弹窗提示
    rowNull (_this) {
      _this.$alert('操作失败，请确认是否选择了数据', '操作失败', {
        confirmButtonText: '确定'
      })
    },
    // 选择时弹窗提示
    sureDelete (_this, data, sign) {
      _this.$confirm('请确认是否删除选中的数据?', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(data)
        data.splice(_this.curRow, 1)
        console.log(_this.medicalData)
        sign = false
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
    .plan{
        background-color: #eeeeee;
        display: flex;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
    }
    .box_one {
        margin: 0 auto;
        background: #ffffff;
        height: 800px;
        width: 96%;
        margin-top: 39px;
        overflow: hidden;
        position: relative;

        .right {
            width: 180px;
            display: flex;
            justify-content: space-between;
          }

         
    }
    .box_two {
        height: 455px;
        width: 100%;
        border: 1px solid #8AB6E2;
    }
    .box_three {
        width: 80%;
        margin: 40px auto;
        .block {
            margin-bottom: 30px;
        }
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
.color {
  height: 20px;
  background: rgba(77, 77, 77, 1);
  margin-bottom: 0;
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
// 标题
.title_one {
  width: 300px;
  height: 40px;
  font-size: 30px;
  font-family: PingFang-SC-Regular;
  color: rgba(77, 77, 77, 1);
  border-bottom: 3px solid #1288ff;
}
.one {
  width: 100%;

  .one_left {
    border-left: 4px solid #1288ff;
    font-size: 18px;

    span {
      margin-left: 10px;
    }
  }
  .one_right {
    border-left: 4px solid #1288ff;
    font-size: 18px;

    span {
      margin-left: 10px;
    }
  }
}

</style>

<style lang="scss">
.staff {
    //整体的字体颜色
  .el-form-item__label {
    font-family: PingFang-SC-Regular;
    font-size:18px;
    color: rgba(51, 51, 51, 1);
  }
.el-input--medium .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: 1px;
}
.el-tabs__nav-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: #e4e7ed;
  z-index: 1;
}
//去掉选项卡下面的横线
.box_one {
  .el-tabs__active-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 0px!important;
  background-color: #ffffff;
  z-index: 1;
}
//选项卡字体颜色
.el-tabs__item.is-active {
  color: #1288ff;
}
//选项卡的颜色
.el-tabs__item:hover {
  color: #1288ff;
  cursor: pointer;
}
//选项卡的字体
.el-tabs__item {
  font-size: 24px;
  font-family: PingFang-SC-Regular;
  color: rgba(153, 153, 153, 1);
  padding: 0px 30px;
}

.cell {
  font-family: PingFang-SC-Medium;
  font-size: 18px;
  color: rgba(102, 102, 102, 1);
}
}
.txt {
        border-right: 1px solid rgba(170, 206, 254, 1);
        width: 3px;
      }

      // .el-form-item__content {
      //   width: 70%;
      // }
.el-radio__label {
  font-size: 18px;
}
.shell  .el-form-item__content {
  width: 75%;
}
.shell_two  .el-form-item__content {
  width: 75%;
}
.shell_two .cell {
  font-size: 16px;
}
//弹出框
.el-dialog__headerbtn {
    position: absolute;
    top: 10px;
    right: 20px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 20px;
}
.el-dialog__header {
    padding: 10px 20px 10px;
    color: #ffffff;
    background: #1288ff;
}
.el-dialog__title {
  color: #ffffff;
}
.el-dialog__headerbtn .el-dialog__close {
    color: #ffffff;
}
.el-dialog__footer {
    padding: 10px 20px 20px;
    text-align: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.bounced li:hover {
  background:#9FE1CE;
}
.a {
  background:#9FE1CE;
}
.el-textarea__inner {
  height:300px;
}
//去掉选项卡下面的横线
.el-tabs--left .el-tabs__nav-wrap.is-left::after, .el-tabs--left .el-tabs__nav-wrap.is-right::after, .el-tabs--right .el-tabs__nav-wrap.is-left::after, .el-tabs--right .el-tabs__nav-wrap.is-right::after {
    height: 100%;
    width: 0;
    bottom: auto;
    top: 0;
}
.small_tabs .el-tabs__item {
  font-size: 18px;
  font-family: PingFang-SC-Regular;
  color: #666666;
  padding: 0px 30px;
  background: #eeeeee;
}
.small_tabs .el-tabs--left .el-tabs__item.is-left {
    text-align: center;
}
.small_tabs .el-tabs__item.is-active {
  color: #666666!important;
  background: #AACEFE;
}
.bg .el-table thead.is-group th {
    background: #ffffff;
}
.bg .el-textarea__inner {
   height: 155px!important; 
}
}
// .box_one .el-tabs__content {
//   min-height: 100%;
// }

</style>

