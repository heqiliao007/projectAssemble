<template>
    <div>
        <el-tabs class="progress_homework borders" v-model="activeName">
            <el-tab-pane label="水下各阶段共性问题" name="first">
                <el-table
                    border
                    max-height="574"
                    :data = "totalData"
                    :cell-style="{fontSize:'18px'}"
                    class="total_table tables"
                    :header-cell-class-name="headerCell"
                >
                    <el-table-column align="center">
                        <el-table-column
                            label="作业名称"
                            align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.name"></el-input>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column align="center">
                        <el-table-column
                            label="可能出现的问题"
                            align="center">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.question">
                                    <el-option label="问题一" value="1"></el-option>
                                    <el-option label="问题二" value="2"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column align="center" label="发生可能">
                            <el-table-column
                                label="等级"
                                align="center">
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
            <el-tab-pane label="水下各阶段特有问题" name="second">
                <el-tabs v-model="stageActive" class="stageTabs">
                    <el-tab-pane label="下潜" name="first">
                        <el-table
                            border
                            max-height="515"
                            :data = "diveDownData"
                            :cell-style="{fontSize:'18px'}"
                            class="dive_down_table tables"
                            :header-cell-class-name="headerCell"
                        >
                            <el-table-column align="center">
                                <el-table-column
                                    label="作业名称"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-input type="text" v-model="scope.row.name"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column align="center">
                                <el-table-column
                                    label="可能出现的问题"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.question">
                                            <el-option label="问题一" value="1"></el-option>
                                            <el-option label="问题二" value="2"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column align="center" label="发生可能">
                                    <el-table-column
                                        label="等级"
                                        align="center">
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
                    <el-tab-pane label="水下作业" name="second">
                        <el-table
                            border
                            max-height="515"
                            :data = "downWorkData"
                            :cell-style="{fontSize:'18px'}"
                            class="down_work_table tables"
                            :header-cell-class-name="headerCell"
                        >
                            <el-table-column align="center">
                                <el-table-column
                                    label="作业名称"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-input type="text" v-model="scope.row.name"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column align="center">
                                <el-table-column
                                    label="可能出现的问题"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.question">
                                            <el-option label="问题一" value="1"></el-option>
                                            <el-option label="问题二" value="2"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column align="center" label="发生可能">
                                    <el-table-column
                                        label="等级"
                                        align="center">
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
                    <el-tab-pane label="上升减压" name="third">
                        <el-table
                            border
                            max-height="515"
                            :data = "upData"
                            :cell-style="{fontSize:'18px'}"
                            class="up_table tables"
                            :header-cell-class-name="headerCell"
                        >
                            <el-table-column align="center">
                                <el-table-column
                                    label="作业名称"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-input type="text" v-model="scope.row.name"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column align="center">
                                <el-table-column
                                    label="可能出现的问题"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.question">
                                            <el-option label="问题一" value="1"></el-option>
                                            <el-option label="问题二" value="2"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column align="center" label="发生可能">
                                    <el-table-column
                                        label="等级"
                                        align="center">
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
                    <el-tab-pane label="出水后" name="fourth">
                        <el-table
                            border
                            max-height="515"
                            :data = "outWaterData"
                            :cell-style="{fontSize:'18px'}"
                            class="out_water_table tables"
                            :header-cell-class-name="headerCell"
                        >
                            <el-table-column align="center">
                                <el-table-column
                                    label="可能出现的问题"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.question">
                                            <el-option label="问题一" value="1"></el-option>
                                            <el-option label="问题二" value="2"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column align="center" label="发生可能">
                                    <el-table-column
                                        label="等级"
                                        align="center">
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
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.posValue"></el-input>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            <el-table-column prop="person" label="影响程度" align="center">
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
                </el-tabs>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
  name: 'DangerOperateProgress',
  data () {
    return {
      activeName: 'first',
      stageActive: 'first',
      totalData: [],
      diveDownData: [],
      downWorkData: [],
      upData: [],
      outWaterData: []
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
    // /deep/ .tabs .el-input {
    //   width: 40%;
    //   margin:0 5px 0 10px;
    // }
    /deep/ .grid-content .headerCell{
        background-color:#F7FBFF;
        font-size:20px;
        color: #666;
        border: 2px solid $color-border-blue;
        border-right: none;
        border-bottom: 0;
        &:first-of-type{
            border-left: none;
        }
    }
    /deep/ .progress_homework .el-tabs__item{
      font-size: $text-size-medium;
      color: $color-text-666;
    }
     /deep/ .progress_homework .el-tabs__header{
        margin: 0;
        line-height: 54px;
        padding-left: 30px;
    }
    /deep/ .stageTabs .el-tabs__header{
        border-top: 1px solid #D6D6D6;
    }
    .risk{
      .grid-content {
        margin:28px 39px 0 28px;
        background-color: $color-bg-white;
        padding: 32px;
        border: 1px solid #BBD2DF;
        .add-del{
            & img{
                cursor: pointer;
                width: 40px;
                height: 40px;
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
    }
</style>