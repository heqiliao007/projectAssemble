<template>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick"  class="termInp borders">
        <!-- 作业平台 -->
        <el-tab-pane label="作业平台" name="first">
          <el-table
            border
            max-height="410"
            :data = "homeworkData"
            :cell-style="{fontSize:'18px'}"
            class="tables"
            :header-cell-class-name="headerCell"
          >
            <el-table-column align="center">
              <el-table-column
                label="风险名称"
                align="center">
                <template slot-scope="scope">
                    <el-input type="text" v-model="scope.row.name"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="措施"
                align="center">
                <template slot-scope="scope">
                  <el-input type="text" v-model="scope.row.measure"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="实施要点">
              <el-table-column
                label="要点"
                align="center"
                width="120">
                <template slot-scope="scope">
                  <el-input type="text"  v-model="scope.row.key" style="width:70%;"></el-input>
                  <img src="../img/elipsis.png" class="ellipsis"/>
                </template>
              </el-table-column>
              <el-table-column
                label="说明"
                align="center">
                <template slot-scope="scope">
                  <el-input type="text"  v-model="scope.row.keyExplain"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="实施结果">
              <el-table-column
                  label="结果"
                  align="center">
                  <template slot-scope="scope">
                    <!-- <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                    <img src="../img/elipsis.png" class="ellipsis"/> -->
                    <el-select v-model="scope.row.result">
                      <el-option label="无" value="1"></el-option>
                      <el-option label="轻" value="2"></el-option>
                      <el-option label="中" value="3"></el-option>
                      <el-option label="重" value="4"></el-option>
                      <el-option label="较重" value="5"></el-option>
                    </el-select>
                  </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center">
              <el-table-column
                  label="说明"
                  align="center">
                  <template slot-scope="scope">
                    <el-input type="text"  v-model="scope.row.explain"></el-input>
                  </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center"  label="负责人">
              <el-table-column
                  label="姓名"
                  align="center">
                  <template slot-scope="scope">
                    <el-input type="text"  v-model="scope.row.chargeName"></el-input>
                  </template>
              </el-table-column>
              <el-table-column
                  label="职务"
                  align="center">
                  <template slot-scope="scope">
                    <el-input type="text"  v-model="scope.row.chargePost"></el-input>
                  </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 潜水装具 -->
        <el-tab-pane label="潜水装具" name="second">
           <el-table
            border
            max-height="410"
            :data = "equipmentData"
            :cell-style="{fontSize:'18px'}"
            class="tables"
            :header-cell-class-name="headerCell"
          >
            <el-table-column align="center">
              <el-table-column
                label="风险名称"
                align="center">
                <template slot-scope="scope">
                    <el-input type="text" v-model="scope.row.name"> </el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="措施"
                align="center">
                <template slot-scope="scope">
                  <el-input type="text" v-model="scope.row.measure"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="实施要点">
              <el-table-column
                label="要点"
                align="center"
                width="120">
                <template slot-scope="scope">
                  <el-input type="text"  v-model="scope.row.key" style="width:70%;"></el-input>
                  <img src="../img/elipsis.png" class="ellipsis"/>
                </template>
              </el-table-column>
              <el-table-column
                label="说明"
                align="center">
                <template slot-scope="scope">
                  <el-input type="text"  v-model="scope.row.keyExplain"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="实施结果">
              <el-table-column
                  label="结果"
                  align="center">
                  <template slot-scope="scope">
                    <!-- <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                    <img src="../img/elipsis.png" class="ellipsis"/> -->
                    <el-select v-model="scope.row.result">
                      <el-option label="无" value="1"></el-option>
                      <el-option label="轻" value="2"></el-option>
                      <el-option label="中" value="3"></el-option>
                      <el-option label="重" value="4"></el-option>
                      <el-option label="较重" value="5"></el-option>
                    </el-select>
                  </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center">
              <el-table-column
                  label="说明"
                  align="center">
                  <template slot-scope="scope">
                    <el-input type="text" v-model="scope.row.explain"></el-input>
                  </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center"  label="负责人">
              <el-table-column
                  label="姓名"
                  align="center">
                  <template slot-scope="scope">
                    <el-input type="text" v-model="scope.row.chargeName"></el-input>
                  </template>
              </el-table-column>
              <el-table-column
                  label="职务"
                  align="center">
                  <template slot-scope="scope">
                    <el-input type="text"  v-model="scope.row.chargePost"></el-input>
                  </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 供气系统 -->
        <el-tab-pane label="供气系统" name="third">
           <el-table
            border
            max-height="410"
            :data = "supplyData"
            :cell-style="{fontSize:'18px'}"
            class="tables"
            :header-cell-class-name="headerCell"
          >
            <el-table-column align="center">
              <el-table-column
                label="风险名称"
                align="center">
                <template slot-scope="scope">
                  <el-input type="text" v-model="scope.row.name"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="措施"
                align="center">
                <template slot-scope="scope">
                  <el-input type="text" v-model="scope.row.measure"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="实施要点">
              <el-table-column
                label="要点"
                align="center"
                width="120">
                <template slot-scope="scope">
                  <el-input type="text"  v-model="scope.row.key" style="width:70%;"></el-input>
                  <img src="../img/elipsis.png" class="ellipsis"/>
                </template>
              </el-table-column>
              <el-table-column
                label="说明"
                align="center">
                <template slot-scope="scope">
                  <el-input type="text"  v-model="scope.row.keyExplain"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="实施结果">
              <el-table-column
                  label="结果"
                  align="center">
                  <template slot-scope="scope">
                    <!-- <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                    <img src="../img/elipsis.png" class="ellipsis"/> -->
                    <el-select v-model="scope.row.result">
                      <el-option label="无" value="1"></el-option>
                      <el-option label="轻" value="2"></el-option>
                      <el-option label="中" value="3"></el-option>
                      <el-option label="重" value="4"></el-option>
                      <el-option label="较重" value="5"></el-option>
                    </el-select>
                  </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center">
              <el-table-column
                  label="说明"
                  align="center">
                  <template slot-scope="scope">
                    <el-input type="text"  v-model="scope.row.explain"></el-input>
                  </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center"  label="负责人">
              <el-table-column
                  label="姓名"
                  align="center">
                  <template slot-scope="scope">
                    <el-input type="text"  v-model="scope.row.chargeName"></el-input>
                  </template>
              </el-table-column>
              <el-table-column
                  label="职务"
                  align="center">
                  <template slot-scope="scope">
                    <el-input type="text"  v-model="scope.row.chargePost"></el-input>
                  </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 加压舱和潜水钟系统 -->
        <el-tab-pane label="加压舱和潜水钟系统" name="fourth">
           <el-table
            border
            max-height="410"
            :data = "systemData"
            :cell-style="{fontSize:'18px'}"
            class="tables"
            :header-cell-class-name="headerCell"
          >
            <el-table-column align="center">
              <el-table-column
                label="风险名称"
                align="center">
                <template slot-scope="scope">
                    <el-input type="text" v-model="scope.row.name"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="措施"
                align="center">
                <template slot-scope="scope">
                    <el-input type="text" v-model="scope.row.measure"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="实施要点">
              <el-table-column
                label="要点"
                align="center"
                width="120">
                <template slot-scope="scope">
                  <el-input type="text"  v-model="scope.row.key" style="width:70%;"></el-input>
                  <img src="../img/elipsis.png" class="ellipsis"/>
                </template>
              </el-table-column>
              <el-table-column
                label="说明"
                align="center">
                <template slot-scope="scope">
                  <el-input type="text"  v-model="scope.row.keyExplain"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="实施结果">
              <el-table-column
                  label="结果"
                  align="center">
                  <template slot-scope="scope">
                    <!-- <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                    <img src="../img/elipsis.png" class="ellipsis"/> -->
                    <el-select v-model="scope.row.result">
                      <el-option label="无" value="1"></el-option>
                      <el-option label="轻" value="2"></el-option>
                      <el-option label="中" value="3"></el-option>
                      <el-option label="重" value="4"></el-option>
                      <el-option label="较重" value="5"></el-option>
                    </el-select>
                  </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center">
              <el-table-column
                  label="说明"
                  align="center">
                  <template slot-scope="scope">
                    <el-input type="text"  v-model="scope.row.explain"></el-input>
                  </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center"  label="负责人">
              <el-table-column
                  label="姓名"
                  align="center">
                  <template slot-scope="scope">
                    <el-input type="text"  v-model="scope.row.chargeName"></el-input>
                  </template>
              </el-table-column>
              <el-table-column
                  label="职务"
                  align="center">
                  <template slot-scope="scope">
                    <el-input type="text"  v-model="scope.row.chargePost"></el-input>
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
  name: 'EquipmentFactor',
  data () {
    return {
      activeName: 'first',
      homeworkData: [],
      equipmentData: [],
      supplyData: [],
      systemData: []
    }
  },
  methods: {
    handleClick (tab, event) {
    },
    headerCell (row, column, rowIndex, columnIndex) {
      return 'headerCell'
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/index.scss';
    
    /deep/ .termInp .el-tabs__item{
      font-size: $text-size-medium;
      color: $color-text-666;
    }
     /deep/ .termInp .el-tabs__header{
        margin: 0;
        line-height: 54px;
        padding-left: 30px;
    }
    .risk{
      .grid-content {
        margin:28px 39px 20px 28px;
        background-color: $color-bg-white;
        padding: 32px;
        border: 1px solid #BBD2DF;
        .tables{
            border:2px solid $color-border-blue;
            border-top:none;
            input{
              width:100%;
              border:none;
            }
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