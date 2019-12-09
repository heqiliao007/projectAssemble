<template>
  <div class="risk">
    <!-- <common-header :headChange="headChange"></common-header>
    <div class="box">
      <el-row class="plan">
        <el-col :span="4">
          <common-plan-sidebar :curIndex="curIndex"></common-plan-sidebar>
        </el-col>
        <el-col :span="20"> -->
          <el-col :span="24">
          <div style="background:#eeeeee; min-height:840px; overflow: hidden;">
            <div class="box_one">
              <div class="add" style="position: absolute; top: 33px;right: 32px;" >
                <span class="minus">
                  <i class="el-icon-minus"></i>
                  <i class="el-icon-plus"></i>
                </span>
              </div>
              <el-tabs
                v-model="activeName"
                @tab-click="handleClick"
                style="width: 95%;margin: 30px auto;"
              >
                <!-- 水面环境 -->
                <el-tab-pane label="水面环境" name="second">
                  <div class="border_one" style="border: 2px solid #AACEFE;">
                    <div class="top" style="min-height:640px;">
                      <el-table
                        :data="tableData"
                        :header-cell-class-name="handlemyclass"
                        :header-cell-style="headerstyle"
                        style="width: 100%;"
                      >
                        <el-table-column align="center">
                        <el-table-column prop="date" label="因素名称" align="center" width="220"></el-table-column>
                        </el-table-column>

                        <el-table-column label="因素等级" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="等级单位" align="center" ></el-table-column>
                        </el-table-column>
                        <el-table-column label="影响程度" align="center">
                        <el-table-column prop="date" label="影响程度等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="影响程度值" align="center" ></el-table-column>
                        </el-table-column>
                        <el-table-column label="作业风险" align="center">
                        <el-table-column prop="date" label="作业风险值" align="center" ></el-table-column>
                        <el-table-column prop="date" label="作业风险等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
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
                <el-tab-pane label="水下环境" name="first">
                  <div class="border_one" style="border: 2px solid #AACEFE;">
                    <div class="top" style="min-height:640px;">
                      <el-table
                        :data="tableData"
                        :header-cell-class-name="handlemyclass"
                        :header-cell-style="headerstyle"
                        style="width: 100%;"
                      >
                        <el-table-column align="center">
                        <el-table-column prop="date" label="因素名称" align="center" width="220"></el-table-column>
                        </el-table-column>

                        <el-table-column label="因素等级" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="等级单位" align="center" ></el-table-column>
                        </el-table-column>
                        <el-table-column label="影响程度" align="center">
                        <el-table-column prop="date" label="影响程度等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="影响程度值" align="center" ></el-table-column>
                        </el-table-column>
                        <el-table-column label="作业风险" align="center">
                        <el-table-column prop="date" label="作业风险值" align="center" ></el-table-column>
                        <el-table-column prop="date" label="作业风险等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
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
                <el-tab-pane label="特殊水域" name="third">
                  <div class="border_one" style="border: 2px solid #AACEFE;">
                    <div class="top" style="min-height:640px;">
                      <el-table
                        :data="tableData"
                        :header-cell-class-name="handlemyclass"
                        :header-cell-style="headerstyle"
                        style="width: 100%;"
                      >
                        <el-table-column align="center">
                        <el-table-column prop="date" label="因素名称" align="center" width="220"></el-table-column>
                        </el-table-column>

                        <el-table-column label="因素等级" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="等级单位" align="center" ></el-table-column>
                        </el-table-column>
                        <el-table-column label="影响程度" align="center">
                        <el-table-column prop="date" label="影响程度等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="影响程度值" align="center" ></el-table-column>
                        </el-table-column>
                        <el-table-column label="作业风险" align="center">
                        <el-table-column prop="date" label="作业风险值" align="center" ></el-table-column>
                        <el-table-column prop="date" label="作业风险等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
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
              </el-tabs>
            </div>
          </div>
          </el-col>
        <!-- </el-col>
      </el-row>
    </div> -->
  </div>
</template>

<script>
// import commonHeader from "../../common/base/Header";
// import headerIcon from "@/assets/img/icon/header/plan.png";
// import CommonPlanSidebar from "@/views/common/base/Plan_sidebar";
export default {
  name: 'Environmental_factors',
  data () {
    return {
      activeClass: -1,
      isshow: [
        '前苏联空气潜水减压表.doc',
        '前苏联空气潜水减压表.doc',
        '前苏联空气潜水减压表.doc',
        '前苏联空气潜水减压表.doc',
        '前苏联空气潜水减压表.doc'
      ],
      educationSelection: ['ddd', 'fsfg', 'skks'],
      dialogVisible: false,
      activeName: 'second',
      tableData: [
        {
          date: '2016-05-02',
          name: '0',
          address: ' 1518 '
        }
      ],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
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
      // curIndex: 3,
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
.plan {
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
    width:180px;
    display: flex;
    justify-content: space-between;
  }
}
.box_two {
  height: 455px;
  width: 100%;
  border: 1px solid #8ab6e2;
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
.risk {
  //整体的字体颜色
  .el-form-item__label {
    font-family: PingFang-SC-Regular;
    font-size: 18px;
    color: rgba(51, 51, 51, 1);
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
    border: 2px solid #AACEFE;
    border-right: none;
    border-top:0; 

    &:first-of-type{
            border-left: none;
        } 
    }

  // .el-form-item__content {
  //   width: 70%;
  // }
  .el-radio__label {
    font-size: 18px;
  }
  .shell .el-form-item__content {
    width: 75%;
  }
  .shell_two .el-form-item__content {
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
    background: #9fe1ce;
  }
  .a {
    background: #9fe1ce;
  }
  .el-textarea__inner {
    height: 300px;
  }
  //input去掉边框
.risk .el-input--medium .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: 1px;
}
}

</style>

