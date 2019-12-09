<template>
    <div>
      <el-row class="grid-content" style="position: relative;">
          <span style="position:absolute;right:32px;top:46px;" class="add-del">
              <img src="../../../assets/img/figure/narrow.png" style="margin-right:10px;"/>
              <img src="../../../assets/img/figure/enlarge.png"/>
          </span>
          <!-- tab -->
          <el-tabs v-model="activeName" @tab-click="handleClick"  class="tabs">
            <el-tab-pane label="准备必要的警示/标志/符号/布告/通知" name="first">
              <el-table
                border
                max-height="640"
                :data = "oneData"
                :cell-style="{fontSize:'18px'}"
                class="tables"
                :header-cell-class-name="headerCell"
              >
                <el-table-column align="center">
                  <el-table-column label="类别" align="center">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.type">
                        <el-option label="空气" value="1"></el-option>
                        <el-option label="氮气" value="2"></el-option>
                        <el-option label="氮氧" value="3"></el-option>
                        <el-option label="氧气" value="4"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column align="center">
                  <el-table-column label="名称" align="center">
                    <template slot-scope="scope">
                      <el-input type="text" v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="内容" align="center">
                    <template slot-scope="scope">
                      <el-input type="text" v-model="scope.row.content"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column  label="负责人" align="center">
                  <el-table-column label="姓名" align="center">
                    <template slot-scope="scope">
                      <el-input type="text" v-model="scope.row.leadName"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="职务" align="center">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.post">
                        <el-option label="空气" value="1"></el-option>
                        <el-option label="氮气" value="2"></el-option>
                        <el-option label="氮氧" value="3"></el-option>
                        <el-option label="氧气" value="4"></el-option>
                      </el-select>
                     </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="制定专用书面规范/ 流程/标准操作步骤" name="second">
              <el-table
                border
                max-height="640"
                :data = "twoData"
                :cell-style="{fontSize:'18px'}"
                class="tables"
                :header-cell-class-name="headerCell"
              >
                <el-table-column align="center">
                  <el-table-column label="类别" align="center">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.type">
                        <el-option label="空气" value="1"></el-option>
                        <el-option label="氮气" value="2"></el-option>
                        <el-option label="氮氧" value="3"></el-option>
                        <el-option label="氧气" value="4"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column align="center">
                  <el-table-column label="名称" align="center">
                    <template slot-scope="scope">
                      <el-input type="text" v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="风险控制前" align="center">
                    <template slot-scope="scope">
                      <el-input type="text" v-model="scope.row.beforeRisk"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column  label="负责人" align="center">
                  <el-table-column label="姓名" align="center">
                    <template slot-scope="scope">
                      <el-input type="text" v-model="scope.row.leadName"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="职务" align="center">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.post">
                        <el-option label="空气" value="1"></el-option>
                        <el-option label="氮气" value="2"></el-option>
                        <el-option label="氮氧" value="3"></el-option>
                        <el-option label="氧气" value="4"></el-option>
                      </el-select>
                     </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="训练人员以识别危险 并采取适当预防措施" name="third">
              <el-table
                border
                max-height="640"
                :data = "threeData"
                :cell-style="{fontSize:'18px'}"
                class="tables"
                :header-cell-class-name="headerCell"
              >
                <el-table-column align="center">
                  <el-table-column label="培训内容" align="center" width="120">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.content" filterable allow-create>
                        <el-option label="空气" value="1"></el-option>
                        <el-option label="氮气" value="2"></el-option>
                        <el-option label="氮氧" value="3"></el-option>
                        <el-option label="氧气" value="4"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column align="center">
                  <el-table-column label="培训方式" align="center" width="120">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.type">
                        <el-option label="空气" value="1"></el-option>
                        <el-option label="氮气" value="2"></el-option>
                        <el-option label="氮氧" value="3"></el-option>
                        <el-option label="氧气" value="4"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="培训对象" align="center" width="120">
                    <template slot-scope="scope">
                      <el-input type="text" v-model="scope.row.trainee"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="培训人">
                  <el-table-column label="姓名" align="center">
                    <template slot-scope="scope">
                      <el-input type="text" v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="单位" align="center">
                    <template slot-scope="scope">
                      <el-input type="text" v-model="scope.row.unit"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="培训时间">
                  <el-table-column label="起" align="center" width="160">  
                    <template slot-scope="scope">
                      <el-date-picker
                        v-model="scope.row.startTime"
                        type="date"
                        style="width:100%;"
                        >
                      </el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column label="止" align="center" width="160">
                    <template slot-scope="scope">
                      <el-date-picker
                        v-model="scope.row.endTime"
                        type="date"
                        style="width:100%;"
                        >
                      </el-date-picker>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column  label="负责人" align="center">
                  <el-table-column label="姓名" align="center">
                    <template slot-scope="scope">
                      <el-input type="text" v-model="scope.row.leadName"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="职务" align="center">
                    <template slot-scope="scope">
                      <el-input type="text" v-model="scope.row.post"></el-input>
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
  name: 'DangerOperate',
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
      oneData: [{
        name: ''
      }],
      twoData: [],
      threeData: [{
        name: ''
      }]
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
      width: 26%;
    }
    /deep/ .tabs .el-tabs__nav{
      white-space: normal;
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
          &>img{
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