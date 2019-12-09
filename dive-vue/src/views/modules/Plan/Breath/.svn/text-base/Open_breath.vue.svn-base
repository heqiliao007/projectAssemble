<template>
    <div class="breath_open">
        <!-- 开式呼吸气 -->
        <el-tabs :tab-position="tabPosition"  class="left_table">
            <el-tab-pane label="第一步">
                <el-row type="flex" justify="center" class="toprow">
                    <el-col :span="18" :offset="6" style="font-weight:bold;">
                        潜水员常用气量
                        <el-input
                        value="0"
                        v-model="diameter"
                        clearable>
                        </el-input>
                        L/min
                        <el-button style="padding:6px 20px;font-weight:bold;">确定方法</el-button>
                    </el-col>
                </el-row>
                <el-row class="description border_box" style="padding-right:20px;">
                    <div class="tietle_box"><span>供氧通道</span></div>
                    <el-row style="margin-bottom:20px;">
                        <el-col :span="4">容积</el-col>
                        <el-col :span="7">
                        <el-input
                            value="0"
                            v-model="volume"
                            clearable>
                        </el-input>
                        L
                        </el-col>
                        <el-col :lg="6" :xl="6">充气后压强</el-col>
                        <el-col :span="7">
                        <el-input
                            value="0"
                            v-model="aerate"
                            clearable>
                        </el-input>
                        MPa
                        </el-col>
                    </el-row>
                    <el-row style="margin-bottom:20px;">
                        <el-col :span="4">测压时气温</el-col>
                        <el-col :span="7">
                        <el-input
                            value="0"
                            v-model="temperaturePre"
                            clearable>
                        </el-input>
                        ℃
                        </el-col>
                        <el-col :lg="6" :xl="6">规定储备压</el-col>
                        <el-col :span="7">
                        <el-input
                            value="0"
                            v-model="reservePre"
                            clearable>
                        </el-input>
                        MPa
                        </el-col>
                    </el-row>
                    <el-row style="margin-bottom:20px;">
                        <el-col :span="4">气瓶类型</el-col>
                        <el-col :span="7">
                        <el-input
                            value="0"
                            v-model="type"
                            clearable>
                        </el-input>
                        </el-col>
                        <el-col :lg="6" :xl="6">每次下潜携带的气瓶数</el-col>
                        <el-col :span="7">
                        <el-input
                            value="0"
                            v-model="bottleNums"
                            clearable>
                        </el-input>
                        瓶
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">氧气比例</el-col>
                        <el-col :span="7">
                        <el-input
                            value="0"
                            v-model="proportion"
                            clearable>
                        </el-input>%
                        </el-col>
                    </el-row>
                    </el-row>
                    <!-- 表格 -->
                    <el-table
                        border
                        max-height="130"
                        :data = "step_one_table"
                        :cell-style="{fontSize:'18px'}"
                        :header-cell-class-name="rowClass"
                        class="step_one_table tables"
                        >
                        <el-table-column prop="homework" label="作业" align="center"></el-table-column>
                        <el-table-column prop="deep" label="水深（m³）" align="center"></el-table-column>
                        <el-table-column prop="waterTem" label="最低水温（℃）" align="center"></el-table-column>
                        <el-table-column prop="totalTime" label="减压总时间（min）" align="center"></el-table-column>
                    </el-table>
                    <el-row class="bottom" type="flex" justify="space-between">
                        <el-col>
                            <el-button type="primary" style="font-size:16px;" @click="stepOneSubmit()">最终递交</el-button>
                        </el-col>
                        <el-col class="icons">
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
                </el-tab-pane>
                <el-tab-pane label="第二步">
                    <el-table
                    border
                    max-height="250"
                    :data = "step_two_table"
                    :cell-style="{fontSize:'14px'}"
                    class="step_two_table tables"
                    :header-cell-class-name="rowClass"
                    style="margin-top:70px;"
                    >
                    <el-table-column prop="homework" label="作业" align="center"></el-table-column>
                    <el-table-column prop="deep" label="水深（m）" align="center"></el-table-column>
                    <el-table-column prop="supplyTime" label="所携气量最长供应时间（min）" align="center"></el-table-column>
                    <el-table-column prop="stopTime" label="不减压停留时间极限（min）" align="center"></el-table-column>
                    <el-table-column prop="singleTime" label="确定单次潜水作业时间（min）" align="center"></el-table-column>
                    <el-table-column prop="needTime" label="需要的减压时间（min）" align="center"></el-table-column>
                    <el-table-column prop="totalTime" label="潜水总时间（min）" align="center"></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="第三步">
                <el-table
                    border
                    max-height="250"
                    :data = "step_three_table"
                    :cell-style="{fontSize:'18px'}"
                    class="step_three_table tables"
                    :header-cell-class-name="rowClass"
                    style="margin-top:70px;"
                    >
                    <el-table-column prop="homework" label="作业" align="center"></el-table-column>
                    <el-table-column prop="deep" label="水深" align="center"></el-table-column>
                    <el-table-column label="需要气体量计算值（瓶）" align="center">
                        <el-table-column
                            prop="needO2"
                            label="氧气">
                        </el-table-column>
                        <el-table-column
                            prop="needN2"
                            label="氮气">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="请确定需准备的气体量" align="center">
                        <el-table-column
                            prop="sureO2"
                            label="氧气">
                        </el-table-column>
                        <el-table-column
                            prop="sureN2"
                            label="氮气">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column prop="remind" label="提醒和说明" align="center"></el-table-column>
                </el-table>
                <el-row type="flex" justify="center" class="toprow" style="margin-top:50px;font-size:18px;font-weight:bold;">
                    <el-col :span="16">
                        需气总量
                        <el-input
                        value="0"
                        v-model="diameter"
                        clearable>
                        </el-input>
                        瓶
                    <!-- </el-col>
                    <el-col :span="6"> -->
                        <el-input
                        value="0.00"
                        v-model="diameter"
                        clearable>
                        </el-input>
                        M³
                    </el-col>
                </el-row>
                <el-row class="bottom" type="flex" justify="space-between" style="margin-top:120px;">
                    <el-col>
                        <el-button type="primary" style="font-size:16px;" @click="stepThreePre()">最终递交</el-button>
                    </el-col>
                    <el-col class="icons">
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
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
  name: 'OpenBreath',
  data () {
    return {
      tabPosition: 'left',
      diameter: '',
      volume: '',
      aerate: '',
      reservePre: '',
      temperaturePre: '',
      type: '',
      bottleNums: '',
      proportion: '',
      step_one_table: [{
        homework: '作业一',
        deep: 0,
        waterTem: 0,
        totalTime: 0
      },
      {
        homework: '作业二',
        deep: 0,
        waterTem: 0,
        totalTime: 0
      },
      {
        homework: '作业三',
        deep: 0,
        waterTem: 0,
        totalTime: 0
      }],
      step_two_table: [{
        homework: '作业一',
        deep: 2,
        supplyTime: 0,
        stopTime: 0,
        singleTime: 0,
        needTime: 0,
        totalTime: 0
      },
      {
        homework: '作业二',
        deep: 1,
        supplyTime: 0,
        stopTime: 0,
        singleTime: 0,
        needTime: 0,
        totalTime: 0
      }],
      step_three_table: [{
        homework: '作业一',
        deep: 2,
        needO2: 0,
        needN2: 0,
        sureO2: 0,
        sureN2: 0,
        remind: 0
      },
      {
        homework: '作业二',
        deep: 2,
        needO2: 0,
        needN2: 0,
        sureO2: 0,
        sureN2: 0,
        remind: 0
      }]
    }
  },
  methods: {
    // handleClick (tab, event) {
    //   console.log(tab, event)
    // },
    stepOneSubmit () {
      console.log('submit stepOneSubmit!')
    },
    rowClass (row) {
      return 'rowClass'
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/index.scss';

    /deep/ .breath_open .left_table .el-tabs__item{
      font-size: $text-size14;
      color: #363C40;
      background-color: $color-bg-white;
      border: 2px dashed #A9A9A9;
      margin-bottom: 34px;
      height: 36px;
      line-height: 36px;
      border-radius: 5px;
    }
    /deep/ .breath_open .left_table .el-tabs__item.is-active{
      background-color: #E5F4FF;
      border: 2px dashed $color-bg-blue;
      color: #363C40;
    }
    /deep/ .breath_open .left_table .el-tabs__active-bar{
       height: 0!important;
     }
    /deep/ .breath_open .el-tabs--left .el-tabs__nav-wrap.is-left{
      margin-right: 0px;
     }
    /deep/ .breath_open .left_table .el-tabs__header{
      padding-top: 65px;
    }
    /deep/ .breath_open .left_table .toprow .el-input {
      width: 20%;
    }
    /deep/ .breath_open .left_table .el-input {
      width: 60%;
      margin:0 5px 0 10px;
    }
    /deep/ .breath_open .left_table .el-tab-pane{
      margin-left:65px;
    }
    /deep/ .breath_open .rowClass{
        background-color: #F7FBFF;
        border-bottom: none;
        font-size: $text-size18;
        color: #666;
        font-weight: normal;
        border-left: 2px solid #AACEFE;
        &:first-of-type{
            border-left: 0;
        }
    }
    /deep/ .step_three_table .rowClass{
        border: 1px solid #AACEFE;
        border-bottom:0;
        // &:first-of-type{
        //       border-left: 1px solid #AACEFE;
        // }
    }
    .breath_open{
        .left_table{
            padding: 20px 0 30px 10px;
            font-size: $text-size18;
        }
        .tables{
            border: 1px solid $color-border-blue;
            margin-top:35px;
        }
        .step_one_table{
            border: 2px solid #EBEBEB;
        }
        .border_box{
            border: 2px solid $color-border-blue;
            margin-top: 30px;
            border-radius: 5px;
            padding: 55px 0 55px 40px;
            color: $color-text-333;
            font-size: $text-size18;
            font-weight: bold;
            position: relative;
            .tietle_box{
                position: absolute;
                top: -12px;
                left: 40px;
                background: #fff;
                font-weight: normal;
                padding: 0 25px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                &>span{
                border-left: 6px solid $color-bg-blue;
                padding-left: 7px;
                }
            }
        }
        .bottom{
            color: $color-text-333;
            font-size: $font-size-medium-x;
            margin-top: 24px;
            .icons{
                text-align: right;
                & span{
                    width: 36px;
                    height: 36px;
                    display: inline-block;
                    cursor: pointer;
                    margin-left: 2px;
                }
                .one_icon {
                    background: url(../img/baocun.png);
                    background-size:100% 100%;
                    
                }
                .one_icon:hover {
                    background: url(../img/baocun_select.png);
                    background-size:100% 100%;
                }
                .two_icon {
                    background: url(../img/dayin.png);
                    background-size:100% 100%;
                }
                .two_icon:hover {
                    background: url(../img/dayin_select.png);
                    background-size:100% 100%;
                }
                .three_icon {
                    background: url(../img/help_icon.png);
                    background-size:100% 100%;

                }
                .three_icon:hover {
                    background: url(../img/help_select.png);
                    background-size:100% 100%;
                }
                .four_icon {
                    background: url(../img/guanbi.png);
                    background-size:100% 100%;
                }
                .four_icon:hover {
                    background: url(../img/guanbi_select.png);
                    background-size:100% 100%;
                }
            } 
        }
    }
        
</style>