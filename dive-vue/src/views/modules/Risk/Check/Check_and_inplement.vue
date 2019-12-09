<template>
  <div class="check">
    <el-row class="grid-content">
        <!-- tab -->
        <el-tabs v-model="activeName" @tab-click="handleClick"  class="tabs">
            <!-- 潜水安全评估查对表 -->
            <el-tab-pane label="潜水安全评估查对表" name="first">
                <el-row class="titleTips">
                    <span class="spot"></span>
                    逐项核对潜水作业过程中可能涉及的安全事项，确保已被执行或已落实！
                </el-row>
                <el-row class="titleCenter">
                    <el-col>潜水作业安全准备步骤</el-col>
                    <el-col class="subTitle">详细周密的作业评估是潜水安全的重要保障</el-col>
                </el-row>
                <el-row>
                    <el-col :span="21" class="trees">
                      <el-tree
                        :data="data"
                        show-checkbox
                        :props="defaultProps"
                        node-key="id"
                        ref="tree"
                        highlight-current>
                        <span class="custom-tree-node" slot-scope="{ node,data }">
                          <span>
                              <img :class="data.className"/>
                              {{ node.label }}
                          </span>    
                        </span>
                      </el-tree>
                    </el-col>
                    <el-col :span="3" style="padding-left:18px;">
                      <el-button style="width:100%;" @click="lookUp">查看</el-button>
                      <el-button style="width:100%;margin:10px 0 0 0px;">打开表</el-button>
                    </el-col>
                </el-row>
                <el-row style="margin-top:18px;">
                  <el-form :inline="true" :model="formInline">  
                    <el-col :span="16" class="dutyForm">
                      <div style="background:#F1F7FF;height:34px;line-height:34px;padding-left:18px;">责任人</div>
                      <div style="padding:10px 18px 0px 38px;font-size:16px;">
                        <el-form-item label="姓名">
                          <el-input v-model="formInline.name"></el-input>
                        </el-form-item>
                        <el-form-item label="职务" style="margin-left:20px;">
                          <el-select v-model="formInline.post">
                            <el-option label="区域一" value="1"></el-option>
                            <el-option label="区域二" value="2"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="单位" style="width:100%;">
                          <el-input v-model="formInline.unit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8" style="padding:60px 0px 0 24px;">
                      <el-form-item label="查对日期">
                        <el-date-picker type="date" v-model="formInline.date" style="width:80%"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-row>
            </el-tab-pane>
            <!-- 潜水应急处置资源查对表 -->
            <el-tab-pane label="潜水应急处置资源查对表" name="second" class="emergency">
              <el-row class="titleTips">
                  <span class="spot"></span>
                  逐项核对潜水作业过程中可能涉及的安全事项，确保已被执行或已落实！
              </el-row>
              <el-row class="titleCenter" style="position:relative;">
                  <el-col>潜水应急处置资源查对表</el-col>
                  <span class="add-del">
                    <img src="../../../../assets/img/figure/narrow.png" style="margin-right:10px;"/>
                    <img src="../../../../assets/img/figure/enlarge.png"/>
                </span>
              </el-row>
              <el-row>
                <el-table
                  border
                  max-height="300"
                  :data = "emergencyData"
                  :cell-style="{fontSize:'18px'}"
                  class="tables"
                  :header-cell-class-name="headerCell"
                >
                  <el-table-column label="选中" align="center" width="80">
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.checked"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="类型名称" align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column  label="单位" align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.unit"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="负责人" align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.person"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="电话" align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.phone"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
              <el-row style="margin-top:18px;">
                <el-form :inline="true" :model="formInline">  
                  <el-col :span="16" class="dutyForm">
                    <div style="background:#F1F7FF;height:34px;line-height:34px;padding-left:18px;">责任人</div>
                    <div style="padding:10px 18px 0px 38px;font-size:16px;">
                      <el-form-item label="姓名">
                        <el-input v-model="formInline.name"></el-input>
                      </el-form-item>
                      <el-form-item label="职务" style="margin-left:20px;">
                        <el-select v-model="formInline.post">
                          <el-option label="区域一" value="1"></el-option>
                          <el-option label="区域二" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="单位" style="width:100%;">
                        <el-input v-model="formInline.unit"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8" style="padding:50px 0px 0 24px;">
                    <el-form-item label="查对日期">
                      <el-date-picker type="date" v-model="formInline.date" style="width:90%"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
            </el-tab-pane>
            <!-- 潜水应急处置程序查对表 -->
            <el-tab-pane label="潜水应急处置程序查对表" name="third">
              <el-row class="titleTips">
                  <span class="spot"></span>
                  本系统《潜水事故处置》中有大量事故处置指导流程，根据作业任务需要，选择并核对可能需要的处置程序，可打印备查或张贴！
              </el-row>
              <emergency-handle></emergency-handle>
            </el-tab-pane>
        </el-tabs>
        <el-row type="flex" justify="end" class="icons">
            <el-col style="text-align:right;">
                <span class="one_icon" title="保存">
                </span>
                <span class="two_icon" title="打印">
                </span>
                <span class="three_icon" title="疑难">
                </span>
                <span class="four_icon"  title="关闭">
                </span>
            </el-col>
        </el-row>
    </el-row>
    <el-dialog title="查对信息" :visible.sync="dialogFormVisible">
      <el-row class="dialog-content" style="padding-bottom:292px;">
        <el-col>选择潜水人员、潜水装具和制定应急救助程序</el-col>
        <el-col>潜水人员</el-col>
        <el-col>委派能胜任作业计划的潜水作业队</el-col>
        <el-col>潜水装具</el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import commonHeader from '@/views/common/base/Header'
import CommonRiskSidebar from '@/views/common/base/Risk_sidebar'
import EmergencyHandle from '@/views/modules/Risk/Check/Emergency_handle'
import headerIcon from '@/assets/img/icon/header/risk.png'

export default {
  name: 'CheckAndInplement',
  components: {
    commonHeader,
    CommonRiskSidebar,
    EmergencyHandle
  },
  data () {
    return {
      headChange: {
        title: '潜水风险管理系统',
        headIcon: headerIcon
      },
      activeName: 'first',
      activeName1: 'first',
      formInline: {
        name: '',
        post: '',
        unit: '',
        date: ''
      },
      data: [{
        id: 1,
        label: '任务安全性分析',
        className: 'tree-icon',
        children: [{
          id: 5,
          label: '确定潜水作业目标',
          className: 'tree-icon'
        }, {
          id: 6,
          label: '确定作业任务不适于或无法通过非潜水作业方式完成',
          className: 'tree-icon'
        }, {
          id: 7,
          label: '应急救助协调工作',
          className: 'tree-icon'
        }, {
          id: 8,
          label: '回顾海战出版物和海军作业指令'
        }]
      }, {
        id: 2,
        label: '确定并分析潜在危险因素',
        className: 'tree-icon',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '选择潜水人员、潜水装具和制定应急救助程序',
        className: 'tree-icon',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }, {
        id: 4,
        label: '制定安全潜水作业程序',
        className: 'tree-icon',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dialogFormVisible: false,
      emergencyData: [{
        name: '水下救护潜水员'
      }, {
        name: '水下搜救潜水员'
      }, {
        name: '潜水医学专家'
      }, {
        name: '现场急救医师'
      }, {
        name: '装备急修专家'
      }, {
        name: '便携式加压舱'
      }, {
        name: '潜水加压舱'
      }, {
        name: '搜救舰船'
      }, {
        name: '搜救直升机'
      }, {
        name: '应急气源'
      }, {
        name: '治疗呼吸气'
      }, {
        name: '氧气及面罩'
      }, {
        name: 'CO2吸收剂'
      }, {
        name: '交通船'
      }, {
        name: '直升飞机'
      }, {
        name: '应急气源'
      }, {
        name: '陆上交通工具'
      }, {
        name: '上级主管部门'
      }, {
        name: '专业救助机构'
      }, {
        name: '附近其他部队'
      }, {
        name: '作业地地方政府'
      }, {
        name: '后送医疗机构'
      }]
    }
  },
  methods: {
    handleClick (tab, event) {
    //   console.log(tab, event)
    },
    headerCell (row, column, rowIndex, columnIndex) {
      return 'headerCell'
    },
    lookUp () {
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/index.scss';
    /deep/ .check .el-dialog__header{
      background: $color-bg-blue;
      padding: 0 20px;
    }
    /deep/ .check .el-dialog__title{
      font-size: $text-size22;
      color: $color-bg-white;
      height: 46px;
      line-height: 46px;
    }
    /deep/ .check .el-dialog__body{
      padding: 0; 
    }
    /deep/ .tabs .el-tabs__item{
      font-size: $text-size-medium-l;
      color: $color-text-999;
    }
    /deep/ .tabs  .el-tabs__header{
      margin: 6px 0 15px;
    }
    /deep/ .tabs .el-tabs__item.is-active{
      color: $color-bg-blue;
    }
    /deep/ .tabs .el-tabs__nav-wrap::after{
      height: 0;
    }
    /deep/ .tabs .el-tabs__active-bar{
      height: 0;
    }
    /deep/ .tabs .el-select-dropdown__list .el-select-dropdown__item{
      font-size: $text-size-small;
    }
    /deep/ .tabs .el-form-item__label{
      font-size: $text-size16;
    }
    /deep/ .emergency .tables .el-input__inner{
      border: none;
    }
    /deep/ .tabs .el-tree-node__label{
      font-size: $text-size16;
    }
    /deep/ .tabs .el-input--medium{
      font-size: $text-size16;
    }
    /deep/ .grid-content .headerCell{
      background-color:#F7FBFF;
      font-size: $text-size18;
      color: #666;
      border: 2px solid $color-border-blue;
      border-right: none;
      border-bottom: 0;
      &:first-of-type{
          border-left: none;
      }
    }
    /deep/ .tabs .el-input__prefix{
      right: 5px;
      left: auto;
    }
    .risk{
      .dialog-content{
        margin:0 15px 0px;
        padding:14px;
        border:1px solid #B5B5B5;
        font-size: $text-size16;
      }
      .dialog-footer{
        text-align: center;
        font-size: $text-size18;
      }
      .grid-content {
        margin:28px 39px 20px 28px;
        background-color: $color-bg-white;
        padding: 32px;
        border: 1px solid #BBD2DF;
        .titleTips{
          color: #AC3A3A;
          background: #F4F4F4;
          // height: 36px;
          line-height: 36px;
          padding-left: 10px;
          font-size: $text-size18;
          .spot{
            width:7px;
            height:7px;
            background:rgba(171,58,58,1);
            border-radius:50%;
            display: inline-block;
          }
        }
        .titleCenter{
          font-size: $text-size26;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          margin: 26px auto 16px;
          color: $color-text-333;
          .add-del{
            position:absolute;
            right: 2px;
            top: 0;
            &>img{
              cursor: pointer;
              width: 36px;
              height: 36px;
            }
          }
          .subTitle{
            font-size: $text-size22;
            margin-top: 8px;
            color: $color-text-666;
          }
        }
        .trees{
          border:2px solid $color-border-blue;
          // height: 192px;
          padding:16px 16px 200px;
          .tree-icon{
            display: inline-block;
            width: 18px;
            height: 18px;
            background: url(../img/folder.png);
            background-size:100% 100%;
          }
        }
        .dutyForm{
          border:2px solid $color-border-blue;
        }
        .tables{
          border:1px solid $color-border-blue;
          border-top:none;
        }
        .borders{
          border:2px solid $color-border-blue;
          height: 638px;
          & .tables{
            border-left:0;
            border-right:0;
          }
        }
      }
      .icons{
        height: 58px;
        padding-top:28px;
        & span{
            width: 36px;
            height: 36px;
            display: inline-block;
            cursor: pointer;
            margin-left: 10px;
        }
        .one_icon {
            background: url(../../../../assets/img/figure/baocun.png);
            background-size:100% 100%;
            
        }
        .one_icon:hover {
            background: url(../../../../assets/img/figure/baocun_select.png);
            background-size:100% 100%;
        }
        .two_icon {
            background: url(../../../../assets/img/figure/dayin.png);
            background-size:100% 100%;
        }
        .two_icon:hover {
            background: url(../../../../assets/img/figure/dayin_select.png);
            background-size:100% 100%;
        }
        .three_icon {
            background: url(../../../../assets/img/figure/help_icon.png);
            background-size:100% 100%;

        }
        .three_icon:hover {
            background: url(../../../../assets/img/figure/help_select.png);
            background-size:100% 100%;
        }
        .four_icon {
            background: url(../../../../assets/img/figure/guanbi.png);
            background-size:100% 100%;
        }
        .four_icon:hover {
            background: url(../../../../assets/img/figure/guanbi_select.png);
            background-size:100% 100%;
        }
      } 
    }
</style>