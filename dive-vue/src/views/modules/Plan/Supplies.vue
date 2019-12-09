<template>
<div class="supplies">
    <!-- <common-header :headChange="headChange"></common-header>
    <div class="box">
        <el-row  class="plan">
            <el-col :span="4">
                <common-plan-sidebar :curIndex='curIndex'></common-plan-sidebar>
            </el-col>
            <el-col :span="20"> -->
                <div style="background:#eeeeee; min-height:840px; overflow: hidden;" class="blank">
                    <div class="box_one">
                      <div class="add" style="position: absolute; top: 33px;right: 32px;">
                            <span class="minus">
                              <i class="el-icon-minus" @click="reduceData"></i>
                              <i class="el-icon-plus" @click="addData"></i>
                            </span>
                      </div>
                    <el-tabs v-model="activeName" @tab-click="handleClick" style="width: 95%;margin: 30px auto;">
                    <!-- 吸收剂 -->
                    <el-tab-pane label="吸收剂" name="second">
                      
                      <div class="border_one" style="border: 1px solid #AACEFE;">
                        <div class="top" style="min-height:640px;">
                        <el-table
                          :data="absorbentData"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          style="width: 100%"
                          @row-click="chooseRow"
                          highlight-current-row
                        >
                        <el-table-column 
                        prop="name" 
                        label="名称" 
                        align="center" 
                        width="180">
                        <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.name"/>
                          </template>
                        </el-table-column>
                        <el-table-column 
                        prop="brand" 
                        label="品牌规格" 
                        align="center" 
                        width="150">
                        <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.brand"/>
                          </template>
                        </el-table-column>
                        <el-table-column 
                        prop="number" 
                        label="数量" 
                        align="center" 
                        width="150">
                        <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.number"/>
                        </template>
                        </el-table-column>
                        <el-table-column 
                        prop="purchasing" 
                        label="采购点" 
                        align="center" 
                        width="280">
                        <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.purchasing"/>
                          </template>
                        </el-table-column>
                        <el-table-column 
                        prop="head" 
                        label="负责人" 
                        align="center" 
                        width="190">
                        <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.head"/>
                          </template>
                        </el-table-column>
                          <el-table-column align="center" label="完成时间">
                            <template slot-scope="scope">
                              <div class="block_right">
                                <el-date-picker
                                  v-model="scope.row.complete_time"
                                  align="right"
                                  type="date"
                                  suffix-icon="el-icon-date"
                                  placeholder
                                ></el-date-picker>
                              </div>
                            </template>
                          </el-table-column>
                        </el-table>
                        <div class="right" style="position: absolute;bottom: 40px;right: 20px;">
                          <div class="one_icon" title="保存"></div>
                          <div class="two_icon" title="打印"></div>
                          <div class="three_icon" title="疑难"></div>
                          <div class="four_icon" title="关闭"></div>
                        </div>
                        </div>
                        </div>
                    </el-tab-pane>
                    <!-- 医疗用品 -->
                    <el-tab-pane label="医疗物品" name="first">
                    <div class="border_one" style="border: 1px solid #AACEFE;">
                        <div class="top" style="min-height:640px;">
                            <el-table
                                :data="medicalData"
                                :header-cell-class-name="handlemyclass"
                                :header-cell-style="headerstyle"
                                style="width: 100%"
                                @row-click="chooseRow"
                                highlight-current-row
                                >
                                <el-table-column 
                                prop="name" 
                                label="名称" 
                                align="center" 
                                width="200">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.name"/>
                                </template>
                                </el-table-column>
                                <el-table-column 
                                prop="number" 
                                label="数量" 
                                align="center" 
                                width="180">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.number"/>
                                </template>
                                </el-table-column>
                                <el-table-column
                                    label="采购点"
                                    align="center"
                                    style="background: red"
                                    width="350"
                                >
                                    <template slot-scope="scope">
                                    <el-form ref="form" :model="form" label-width="80px">
                                        <el-select v-model="scope.row.purchasingPoint" placeholder="请选择活动区域">
                                        <el-option label="潜水战位" value="shanghai"></el-option>
                                        <el-option label="加压舱内" value="beijing"></el-option>
                                        <el-option label="医务室" value="beijing"></el-option>
                                        </el-select>
                                    </el-form>
                                    </template>
                                </el-table-column>
                                <el-table-column 
                                prop="userPeople" 
                                label="使用人" 
                                align="center" 
                                width="200">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.userPeople"/>
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
                            </el-table>
                        </div>
                        <div class="right" style="position: absolute;bottom: 40px;right: 20px;">
                          <div class="one_icon" title="保存"></div>
                          <div class="two_icon" title="打印"></div>
                          <div class="three_icon" title="疑难"></div>
                          <div class="four_icon" title="关闭"></div>
                        </div>
                    </div>
                    </el-tab-pane>
                    <!-- 卫生用品 -->
                    <el-tab-pane label="卫生用品" name="third">
                        <div class="border_one" style="border: 1px solid #AACEFE;">
                        <div class="top" style="min-height:640px;">
                            <el-table
                                :data="healthData"
                                :header-cell-class-name="handlemyclass"
                                :header-cell-style="headerstyle"
                                style="width: 100%"
                                @row-click="chooseRow"
                                highlight-current-row
                                >
                                <el-table-column 
                                prop="name" 
                                label="名称" 
                                align="center" 
                                width="200">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.name"/>
                                </template>
                                </el-table-column>
                                <el-table-column 
                                prop="number" 
                                label="数量" 
                                align="center" 
                                width="180">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.number"/>
                                </template>
                                </el-table-column>
                                <el-table-column
                                    label="采购点"
                                    align="center"
                                    style="background: red"
                                    width="350"
                                >
                                    <template slot-scope="scope">
                                    <el-form ref="form" :model="form" label-width="80px">
                                        <el-select v-model="scope.row.purchasingPoint" placeholder="请选择活动区域">
                                        <el-option label="潜水战位" value="shanghai"></el-option>
                                        <el-option label="加压舱内" value="beijing"></el-option>
                                        <el-option label="医务室" value="beijing"></el-option>
                                        </el-select>
                                    </el-form>
                                    </template>
                                </el-table-column>
                                <el-table-column 
                                prop="putTime" 
                                label="摆放时间(天)" 
                                align="center" 
                                width="200">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.putTime"/>
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
                            </el-table>
                        </div>
                        <div class="right" style="position: absolute;bottom: 40px;right: 20px;">
                          <div class="one_icon" title="保存"></div>
                          <div class="two_icon" title="打印"></div>
                          <div class="three_icon" title="疑难"></div>
                          <div class="four_icon" title="关闭"></div>
                        </div>
                    </div>
                    </el-tab-pane>
                    <!-- 个人用品 -->
                    <el-tab-pane label="个人用品" name="fourth">
                      <div class="border_one" style="border: 1px solid #AACEFE;">
                        <div class="top" style="min-height:640px;">
                            <el-table
                                :data="personalData"
                                :header-cell-class-name="handlemyclass"
                                :header-cell-style="headerstyle"
                                style="width: 100%"
                                @row-click="chooseRow"
                                highlight-current-row
                                >
                                <el-table-column 
                                prop="name" 
                                label="名称" 
                                align="center" 
                                width="200">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.name"/>
                                </template>
                                </el-table-column>
                                <el-table-column 
                                prop="number" 
                                label="数量" 
                                align="center" 
                                width="180">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.number"/>
                                </template>
                                </el-table-column>
                                <el-table-column 
                                prop="requirements" 
                                label="要求" 
                                align="center" 
                                width="350">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.requirements"/>
                                </template>
                                </el-table-column>
                                <el-table-column 
                                prop="putTime" 
                                label="摆放时间(天)" 
                                align="center" 
                                width="200">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.putTime"/>
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
                            </el-table>
                        </div>
                        <div class="right" style="position: absolute;bottom: 40px;right: 20px;">
                          <div class="one_icon" title="保存"></div>
                          <div class="two_icon" title="打印"></div>
                          <div class="three_icon" title="疑难"></div>
                          <div class="four_icon" title="关闭"></div>
                        </div>
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
      absorbentData: [],
      medicalData: [],
      healthData: [],
      personalData: [],
      rowQuaSign: false,
      rowEduSign: false,
      rowHealth: false,
      rowExpSign: false,
      tableData: [
        {
          date: '2016-05-02',
          name: '0',
          address: ' 1518 '
        }
      ],
      form: {
        purchasingPoint: ''
      },
      value1: '',
      // curIndex: 5,
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
        // 吸收剂
        _this.rowQuaSign = true
      } else if (_this.activeName === 'first') {
        // 医疗物品
        _this.rowEduSign = true
      } else if (_this.activeName === 'third') {
        // 卫生用品
        _this.rowHealth = true
      } else {
        // 个人用品
        _this.rowExpSign = true
      }
    },
    // 添加行
    addData () {
      let _this = this
      if (_this.activeName === 'second') {
        // 吸收剂
        _this.absorbentData.push({'name': '', 'brand ': '', 'number ': '', 'purchasing  ': '', 'head  ': '', 'complete_time  ': ''})
      } else if (_this.activeName === 'first') {
        // 医疗物品
        _this.medicalData.push({'name': '', 'number ': '', 'purchasingPoint': '', 'userPeople': '', 'head': ''})
      } else if (_this.activeName === 'third') {
        // 卫生用品
        _this.healthData.push({'name': '', 'number ': '', 'purchasingPoint': '', 'putTime': '', 'head': ''})
      } else {
        // 个人用品
        _this.personalData.push({'name': '', 'number': '', 'requirements': '', 'putTime': '', 'head': ''})
      }
    },
    // 删除一行
    reduceData () {
      let _this = this
      // console.log(_this.activeName)
      console.log(_this.curRow)
      if (_this.activeName === 'second') {
        // 吸收剂
        if (_this.rowQuaSign) {
          _this.sureDelete(_this, _this.absorbentData, _this.rowQuaSign)
        } else {
          _this.rowNull(_this)
        }
      } else if (_this.activeName === 'first') {
        // 医疗用品
        if (_this.rowEduSign) {
          _this.sureDelete(_this, _this.medicalData, _this.rowEduSign)
        } else {
          _this.rowNull(_this)
        }
      } else if (_this.activeName === 'third') {
        // 卫生用品
        if (_this.rowHealth) {
          _this.sureDelete(_this, _this.healthData, _this.rowHealth)
        } else {
          _this.rowNull(_this)
        }
      } else {
        // 个人用品
        if (_this.rowExpSign) {
          _this.sureDelete(_this, _this.personalData, _this.rowExpSign)
        } else {
          _this.rowNull(_this)
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
        data.splice(_this.curRow, 1)
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
.supplies {
    //整体的字体颜色
  .el-form-item__label {
    font-family: PingFang-SC-Regular;
    font-size:18px;
    color: rgba(51, 51, 51, 1);
  }
.el-tabs__header {
  width:80%;
}
  //去掉选项卡下面的横线
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
  height: 2px;
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
.blank .el-input--medium .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: 1px;
}
}
// .box_one .el-tabs__content {
//   min-height: 100%;
// }

</style>

