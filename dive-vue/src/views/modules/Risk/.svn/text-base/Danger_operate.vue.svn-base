<template>
    <div>
        <el-row class="grid-content" style="position: relative;">
            <span style="position:absolute;right:32px;top:40px;" class="add-del">
                <img src="../../../assets/img/figure/narrow.png" style="margin-right:10px;"/>
                <img src="../../../assets/img/figure/enlarge.png"/>
            </span>
            <!-- tab -->
            <el-tabs v-model="activeName" @tab-click="handleClick"  class="tabs">
                <!-- 基本要素 -->
                <el-tab-pane label="基本要素" name="first">
                    <el-table
                        border
                        max-height="640"
                        :data = "primaryData"
                        :cell-style="{fontSize:'18px'}"
                        class="primary_table tables"
                        :header-cell-class-name="headerCell"
                    >
                        <el-table-column label="名称" prop="name" align="center">
                        </el-table-column>
                        <el-table-column label="深度(m)" align="center">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.priDeep"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="呼吸气体" align="center">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.priBreath">
                                    <el-option label="空气" value="1"></el-option>
                                    <el-option label="氮气" value="2"></el-option>
                                    <el-option label="氮氧" value="3"></el-option>
                                    <el-option label="氧气" value="4"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="作业方式" align="center">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.priHomework">
                                    <el-option label="开式自携" value="1"></el-option>
                                    <el-option label="半闭自携" value="2"></el-option>
                                    <el-option label="水面管供" value="3"></el-option>
                                    <el-option label="邦司" value="4"></el-option>
                                    <el-option label="饱和" value="5"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <!-- 作业准备 -->
                <el-tab-pane label="作业准备" name="second">
                    <el-table
                        border
                        max-height="554"
                        :data = "prepareData"
                        :cell-style ="{fontSize:'18px'}"
                        class ="prepare_table tables"
                        :header-cell-class-name = "headerCell"
                    >
                        <el-table-column align="center">
                            <el-table-column
                                label="存在的问题"
                                align="center">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.question"></el-input>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column align="center" label="发生可能">
                            <el-table-column
                                label="等级"
                                align="center"
                                width="120">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.posRank">
                                        <el-option label="无" value="1"></el-option>
                                        <el-option label="轻" value="2"></el-option>
                                        <el-option label="中" value="3"></el-option>
                                        <el-option label="重" value="4"></el-option>
                                        <el-option label="较重" value="5"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="值"
                                align="center"
                                width="120">
                                <template slot-scope="scope">
                                    <el-input type="number" v-model="scope.row.posValue"></el-input>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column prop="person" label="影响程度" align="center">
                            <el-table-column
                                label="等级"
                                align="center"
                                width="120">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.levelRank">
                                        <el-option label="无" value="1"></el-option>
                                        <el-option label="轻" value="2"></el-option>
                                        <el-option label="中" value="3"></el-option>
                                        <el-option label="重" value="4"></el-option>
                                        <el-option label="较重" value="5"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="值"
                                align="center"
                                width="120">
                                <template slot-scope="scope">
                                    <el-input type="number" v-model="scope.row.levelValue"></el-input>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column prop="task" label="作业风险" align="center">
                            <el-table-column
                                label="值"
                                align="center"
                                width="120">
                                <template slot-scope="scope">
                                    <el-input type="number" v-model="scope.row.riskValue"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="等级"
                                align="center"
                                width="120">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.riskRank"></el-input>
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                    <el-row style="color:#666;font-size:18px;margin-top:20px;">说明：在装备准备和就位过程中，如发现存在或发生影响作业安全和效率的问题或事件，应予以处理并纠正，必要时延后或取消计划； 若必须作业，评估影响</el-row>
                </el-tab-pane>
                <!-- 作业过程 -->
                <el-tab-pane label="作业过程" name="third">
                    <common-operate-progress></common-operate-progress>
                </el-tab-pane>
                <el-tab-pane label="特殊操作" name="forth">
                    <common-operate-special></common-operate-special>
                </el-tab-pane>
                <el-tab-pane label="水面指挥与保障" name="fifth">
                    <el-table
                        border
                        max-height="640"
                        :data = "commandData"
                        :cell-style ="{fontSize:'18px'}"
                        class ="tables"
                        :header-cell-class-name = "headerCell"
                    >
                        <el-table-column align="center">
                            <el-table-column
                                label="存在的问题"
                                align="center">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.question" filterable allow-create>
                                        <el-option label="指挥员" value="zhy"></el-option>
                                        <el-option label="监督" value="jd"></el-option>
                                        <el-option label="潜水员" value="qsy"></el-option>
                                        <el-option label="军医" value="jy"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column align="center" label="发生可能">
                            <el-table-column
                                label="等级"
                                align="center"
                                width="120">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.posRank">
                                        <el-option label="无" value="1"></el-option>
                                        <el-option label="轻" value="2"></el-option>
                                        <el-option label="中" value="3"></el-option>
                                        <el-option label="重" value="4"></el-option>
                                        <el-option label="较重" value="5"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="值"
                                align="center"
                                width="120">
                                <template slot-scope="scope">
                                    <el-input type="number" v-model="scope.row.posValue"></el-input>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column prop="person" label="影响程度" align="center">
                            <el-table-column
                                label="等级"
                                align="center"
                                width="120">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.levelRank">
                                        <el-option label="无" value="1"></el-option>
                                        <el-option label="轻" value="2"></el-option>
                                        <el-option label="中" value="3"></el-option>
                                        <el-option label="重" value="4"></el-option>
                                        <el-option label="较重" value="5"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="值"
                                align="center"
                                width="120">
                                <template slot-scope="scope">
                                    <el-input type="number" v-model="scope.row.levelValue"></el-input>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column prop="task" label="作业风险" align="center">
                            <el-table-column
                                label="值"
                                align="center"
                                width="120">
                                <template slot-scope="scope">
                                    <el-input type="number" v-model="scope.row.riskValue"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="等级"
                                align="center"
                                width="120">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.riskRank"></el-input>
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
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
    </div>
</template>

<script>
import commonHeader from '@/views/common/base/Header'
import CommonRiskSidebar from '@/views/common/base/Risk_sidebar'
import CommonOperateProgress from './Danger_operate_progress'
import CommonOperateSpecial from './Danger_operate_special'

import headerIcon from '@/assets/img/icon/header/risk.png'

export default {
  name: 'DangerOperate',
  components: {
    commonHeader,
    CommonRiskSidebar,
    CommonOperateProgress,
    CommonOperateSpecial
  },
  data () {
    return {
      headChange: {
        title: '潜水风险管理系统',
        headIcon: headerIcon
      },
      activeName: 'first',
      primaryData: [],
      commandData: [{
        question: ''
      }],
      prepareData: []
    }
  },
  methods: {
    handleClick (tab, event) {
    //   console.log(tab, event)
    },
    headerCell (row, column, rowIndex, columnIndex) {
      return 'headerCell'
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/index.scss';

    /deep/ .tabs .el-tabs__item{
      font-size: $text-size-medium-l;
      color: $color-text-999;
    }
    /deep/ .tabs  .el-tabs__header{
      margin: 6px 0 15px;
    }
    /deep/ .tabs .el-tabs__item.is-active,/deep/ .tab-top  .el-tabs__item:hover{
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
    /deep/ .tabs .el-input {
    //   width: 40%;
    //   margin:0 5px 0 10px;
    }
    /deep/ .tabs .el-input__inner{
        border: none;
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
    .risk{
      .grid-content {
        margin:28px 39px 20px 28px;
        background-color: $color-bg-white;
        padding: 32px;
        border: 1px solid #BBD2DF;
        .add-del{
            & img{
                cursor: pointer;
                width: 36px;
                height: 36px;
            }
        }
        .tables{
            border:2px solid $color-border-blue;
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
            background: url(../../../assets/img/figure/baocun.png);
            background-size:100% 100%;
            
        }
        .one_icon:hover {
            background: url(../../../assets/img/figure/baocun_select.png);
            background-size:100% 100%;
        }
        .two_icon {
            background: url(../../../assets/img/figure/dayin.png);
            background-size:100% 100%;
        }
        .two_icon:hover {
            background: url(../../../assets/img/figure/dayin_select.png);
            background-size:100% 100%;
        }
        .three_icon {
            background: url(../../../assets/img/figure/help_icon.png);
            background-size:100% 100%;

        }
        .three_icon:hover {
            background: url(../../../assets/img/figure/help_select.png);
            background-size:100% 100%;
        }
        .four_icon {
            background: url(../../../assets/img/figure/guanbi.png);
            background-size:100% 100%;
        }
        .four_icon:hover {
            background: url(../../../assets/img/figure/guanbi_select.png);
            background-size:100% 100%;
        }
      } 
    }
</style>