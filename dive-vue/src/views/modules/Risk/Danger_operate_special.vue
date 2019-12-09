<template>
    <div>
        <el-tabs class="progress_homework borders" v-model="activeName">
            <el-tab-pane label="水下爆破" name="first">
                <el-table
                    border
                    max-height="454"
                    :data = "blowlData"
                    :cell-style="{fontSize:'18px'}"
                    class="tables"
                    :header-cell-class-name="headerCell"
                >
                    <el-table-column align="center">
                        <el-table-column
                            label="名称"
                            align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.name"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="TNT当量(kg)"
                            align="center">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.weight"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="距离(m)"
                            align="center">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.distance"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="受冲击压强(kgf/cmˇ2)"
                            align="center">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.pressure"></el-input>
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
                                label="值(%)"
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
            <!-- 声呐附件作业 -->
            <el-tab-pane label="声呐附件作业" name="second">
                <el-table
                    border
                    max-height="454"
                    :data = "appendixData"
                    :cell-style="{fontSize:'18px'}"
                    class="tables"
                    :header-cell-class-name="headerCell"
                >
                    <el-table-column align="center">
                        <el-table-column
                            label="声呐"
                            align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.sonar"></el-input>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column align="center" label="声呐参数">
                        <el-table-column
                            label="声源级(dB)"
                            align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.origin"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="工作周期(%)"
                            align="center"
                            width="120">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.period" style="width:70%;"></el-input>
                                <img src="./img/elipsis.png" class="ellipsis"/>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column align="center" label="潜水参数">
                        <el-table-column
                            label="深度(m)"
                            align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.deep"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="24h累计暴露时间(min)"
                            align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.time"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="潜服类型"
                            align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.type"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="距声呐距离(m)"
                            align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.distance"></el-input>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="水下使用电器" name="third">
                <el-table
                    border
                    max-height="454"
                    :data = "electricalData"
                    :cell-style="{fontSize:'18px'}"
                    class="tables"
                    :header-cell-class-name="headerCell"
                >
                    <el-table-column align="center">
                        <el-table-column
                            label="电器名称"
                            align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.name"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="电压(V)"
                            align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.voltage"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="电流(A)"
                            align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.current"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="距离(m)"
                            align="center">
                            <template slot-scope="scope">
                                <el-input type="number" v-model="scope.row.distance"></el-input>
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
                            label="值(%)"
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
            <el-tab-pane label="其他" name="fourth">
                <el-table
                    border
                    max-height="454"
                    :data = "otherData"
                    :cell-style="{fontSize:'18px'}"
                    class="tables"
                    :header-cell-class-name="headerCell"
                >
                    <el-table-column align="center">
                        <el-table-column
                            label="危害名称"
                            align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.name"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="有关参数"
                            align="center">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.name"></el-input>
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
                            label="值(%)"
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
    </div>
</template>

<script>
export default {
  name: 'DangerOperateProgress',
  data () {
    return {
      activeName: 'first',
      appendixData: [ {
        sonar: '声纳一',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        time: '2019-08-27'
      }],
      blowlData: [ {
        sonar: '声纳一',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        time: '2019-08-27'
      }],
      electricalData: [],
      otherData: []
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
    //   width: 90%;
    //   margin:0 5px 0 5px;
    }
    // /deep/ .progress_homework .el-input__inner{
    //     border: none;
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