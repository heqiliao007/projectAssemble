<template>
    <div>
        <el-row class="grid-content" style="position: relative;">
            <span style="position:absolute;right:32px;top:24px;" class="add-del">
                <img src="../../../assets/img/figure/narrow.png" style="margin-right:10px;"/>
                <img src="../../../assets/img/figure/enlarge.png"/>
            </span>
            <!-- tab -->
            <el-tabs v-model="activeName" @tab-click="handleClick"  class="tabs">
                <!-- 组织指挥人员 -->
                <el-tab-pane label="组织指挥人员" name="first" class="boxBorders">
                    <el-table
                        border
                        max-height="638"
                        :data = "commandData"
                        :cell-style="{fontSize:'18px'}"
                        class="command_table tables"
                        :header-cell-class-name="headerCell"
                    >
                        <el-table-column align="center">
                            <el-table-column
                                label="岗位"
                                align="center">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.post"></el-input>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column align="center">
                            <el-table-column
                                label="姓名"
                                align="center">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.name"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="职务"
                                align="center">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.position"></el-input>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="经验技能" align="center">
                            <el-table-column
                                label="等级"
                                align="center">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.expRank">
                                        <el-option label="优秀" value="1"></el-option>
                                        <el-option label="良好" value="2"></el-option>
                                        <el-option label="尚可" value="3"></el-option>
                                        <el-option label="一般" value="4"></el-option>
                                        <el-option label="较差" value="5"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="值"
                                align="center">
                                <template slot-scope="scope">
                                    <el-input type="number" v-model="scope.row.expValue"></el-input>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="影响程度" align="center">
                            <el-table-column
                                label="等级"
                                align="center">
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
                                align="center">
                                <template slot-scope="scope">
                                    <el-input type="number" v-model="scope.row.levelValue"></el-input>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column prop="task" label="作业风险" align="center">
                            <el-table-column
                                label="值"
                                align="center">
                                <template slot-scope="scope">
                                    <el-input type="number" v-model="scope.row.riskValue"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="等级"
                                align="center">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.riskRank"></el-input>
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <!-- 潜水员 -->
                <el-tab-pane label="潜水员" name="second">
                    <el-tabs class="dive_person borders" v-model="dive_person_active">
                        <el-tab-pane label="个人情况" name="first">
                            <el-table
                                border
                                max-height="574"
                                :data = "personalData"
                                :cell-style="{fontSize:'18px'}"
                                class="personal_table tables"
                                :header-cell-class-name="headerCell"
                            >
                                <el-table-column align="center">
                                    <el-table-column
                                        label="姓名"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.name"></el-input>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column align="center">
                                    <el-table-column
                                        label="潜龄"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.diveYear"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="等级"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"></el-input>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column label="经验技能" align="center">
                                    <el-table-column
                                        label="等级"
                                        align="center"
                                        width="120">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="值"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"></el-input>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column label="力量体能" align="center">
                                    <el-table-column
                                        label="等级"
                                        align="center"
                                        width="120">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="值"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"></el-input>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column label="精神状态" align="center">
                                    <el-table-column
                                        label="等级"
                                        align="center"
                                        width="120">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.staRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="值"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.staValue"></el-input>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column label="心理素质" align="center">
                                    <el-table-column
                                        label="等级"
                                        align="center"
                                        width="120">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.quaRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="值"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.quaValue"></el-input>
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
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.levelValue"></el-input>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column prop="task" label="作业风险" align="center">
                                    <el-table-column
                                        label="值"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.riskValue"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="等级"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.riskRank"></el-input>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="集体配合" name="second">
                            <el-table
                                border
                                max-height="574"
                                :data = "teamData"
                                :cell-style="{fontSize:'18px'}"
                                class="team_table tables"
                                :header-cell-class-name="headerCell"
                            >
                                <el-table-column align="center">
                                    <el-table-column
                                        label="可能出现的问题"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.question"></el-input>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column label="发生可能" align="center">
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
                                        label="值(%)"
                                        align="center"
                                        width="120">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.posrank"></el-input>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column label="影响程度" align="center" width="100">
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
                                <el-table-column label="作业风险" align="center" width="100">
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
                </el-tab-pane>
                <!-- 辅助和其他保障人员 -->
                <el-tab-pane label="辅助和其他保障人员" name="third" class="boxBorders">
                    <el-table
                        border
                        max-height="574"
                        :data = "assistData"
                        :cell-style="{fontSize:'18px'}"
                        class="assist_table tables"
                        :header-cell-class-name="headerCell"
                    >
                        <el-table-column align="center">
                            <el-table-column
                                label="岗位"
                                align="center">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.post"></el-input>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column align="center">
                            <el-table-column
                                label="姓名"
                                align="center">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.name"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="职务"
                                align="center">
                                <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.post"></el-input>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="经验技能" align="center" width="100">
                            <el-table-column
                                label="等级"
                                align="center">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.expRank">
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
                                align="center">
                                <template slot-scope="scope">
                                    <el-input type="number" v-model="scope.row.expValue"></el-input>
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
                                align="center">
                                <template slot-scope="scope">
                                    <el-input type="number" v-model="scope.row.levelValue"></el-input>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="作业风险" align="center">
                            <el-table-column
                                label="值"
                                align="center">
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
import headerIcon from '@/assets/img/icon/header/risk.png'

export default {
  name: 'dangerPerson',
  components: {
    commonHeader,
    CommonRiskSidebar
  },
  data () {
    return {
      headChange: {
        title: '潜水风险管理系统',
        headIcon: headerIcon
      },
      activeName: 'first',
      dive_person_active: 'first',
      commandData: [],
      personalData: [{
        name: ''
      }],
      teamData: [],
      assistData: [{
        post: ''
      }]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
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
      // width: 40%;
      // margin:0 5px 0 10px;
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
    /deep/ .dive_person .el-tabs__item{
      font-size: $text-size-medium;
      color: $color-text-666;
    }
    /deep/ .dive_person .el-tabs__header{
        margin: 0;
        line-height: 54px;
        padding-left: 30px;
    }
    .risk{
      .grid-content {
        margin:28px 39px 20px 28px;
        background-color: $color-bg-white;
        padding: 16px 32px;
        border: 1px solid #BBD2DF;
        .add-del{
            & img{
                cursor: pointer;
                width: 36px;
                height: 36px;
            }
				}
				.boxBorders{
					border: 2px solid #BBD2DF;
					border-top: 0;
					height: 454px;
				}
        .borders{
            border:120px solid $color-border-blue;
            height: 638px;
            & .tables{
                border-left:0;
                border-right:0;
            }
        }
      }
      .icons{
        // height: 58px;
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