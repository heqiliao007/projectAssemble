<template>
<div>
    <!-- <common-header :headChange="headChange"></common-header>
    <div class="box">
        <el-row  class="plan">
            <el-col :span="4">
                <common-plan-sidebar :curIndex='curIndex'></common-plan-sidebar>
            </el-col>
            <el-col :span="20"> -->
                <div style="background:#eeeeee; min-height:840px; overflow: hidden;" class="blank">
                    <div class="box_one" style="position:relative">
                    <el-row style="    border-radius: 8px; border: 1px solid #91c6fc;width:90%; margin: 60px auto;">
                      <el-col :span="18" :offset="3">
                        <div class="announcement">
                          <el-row>
                            <el-col :span="20" :offset="3">
                              <div class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{text}}</div>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                    </el-row>
                    <div class="jump">
                        <el-button type="primary" plain round style="font-size:20px; color:#ffffff; background:#1288FF; box-shadow: 2px 3px 2px #707070;">立即进行风险管理</el-button>
                        <el-button type="primary" plain round style="font-size:20px; color:#ffffff; background:#86C681; box-shadow: 2px 3px 2px #707070;">稍后进行风险管理</el-button>
                    </div>
                        <div class="right" style="position: absolute;bottom: 35px;right: 32px;">
                            <el-popover
                                placement="top-start"
                                trigger="hover"
                                content="保存">
                                <div class="one_icon" slot="reference"></div>
                            </el-popover>
                          
                          <div class="two_icon"></div>
                          <div class="three_icon"></div>
                          <div class="four_icon"></div>
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
// import headerIcon from "@/assets/img/icon/header/plan.png";
// import CommonPlanSidebar from '@/views/common/base/Plan_sidebar'
export default {
  name: 'Diving_program',
  data () {
    return {
      text: '       制定潜水作业计划时，必须充分考虑本次潜水作业中的各类风险，以尽早识别、评估风险，并提前对风险因素进行处理、规避或准备好应对措施，最大可能减少潜水作业中的不安全因素，提高作业效率。',
      activeClass: -1,
      isshow: ['前苏联空气潜水减压表.doc', '前苏联空气潜水减压表.doc', '前苏联空气潜水减压表.doc', '前苏联空气潜水减压表.doc', '前苏联空气潜水减压表.doc'],
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
      // curIndex: 8,
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
            width: 145px;
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
  width: 30px;
  height: 29px;
}
.one_icon:hover {
  background: url(../../../assets/img/figure/baocun_select.png);
  background-size: 100% 100%;
  width: 30px;
  height: 29px;
}
.two_icon {
  background: url(../../../assets/img/figure/dayin.png);
  background-size: 100% 100%;
  width: 30px;
}
.two_icon:hover {
  background: url(../../../assets/img/figure/dayin_select.png);
  background-size: 100% 100%;
  width: 30px;
  height: 29px;
}
.three_icon {
  background: url(../../../assets/img/figure/help_icon.png);
  background-size: 100% 100%;
  width: 30px;
}
.three_icon:hover {
  background: url(../../../assets/img/figure/help_select.png);
  background-size: 100% 100%;
  width: 30px;
  height: 29px;
}
.four_icon {
  background: url(../../../assets/img/figure/guanbi.png);
  background-size: 100% 100%;
  width: 30px;
}
.four_icon:hover {
  background: url(../../../assets/img/figure/guanbi_select.png);
  background-size: 100% 100%;
  width: 30px;
  height: 29px;
}
.color {
  height: 20px;
  background: rgba(77, 77, 77, 1);
  margin-bottom: 0;
}
//icon图标大小
.minus .el-icon-minus {
  font-size: 28px;
  background: rgba(244, 244, 244, 1);
  border: 2px solid rgba(98, 98, 98, 1);
  opacity: 0.21;
  border-radius: 2px;
  margin: 0 5px;
}
.minus .el-icon-plus {
  font-size: 28px;
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
.jump {
    width: 40%;
    margin: 80px auto;
    display: flex;
    justify-content: space-between;
}

</style>

<style lang="scss">
.plan {
    //整体的字体颜色
  .el-form-item__label {
    font-family: PingFang-SC-Regular;
    font-size:18px;
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
.el-input__prefix {
    right:-170px;
}
.blank .el-input--medium .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: 1px;
}
.text {
  font-size: 38px;
  font-family: STKaiti;
  font-weight: bold;
  color: rgba(64, 64, 64, 1);
  line-height: 57px;
  margin-top: 45px;
  margin-bottom: 30px;
}

}
 .el-popover--plain {
    padding: 6px 6px;
}
 .el-popover {
    min-width: 0;
}
</style>

