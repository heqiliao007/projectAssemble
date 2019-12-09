<template>
    <div>
        <el-row class="grid-content">
            <!-- tab -->
            <el-tabs v-model="activeName" @tab-click="handleClick"  class="tabs">
                <!-- 环境因素 -->
                <el-tab-pane label="环境因素" name="first">
                  <environmental-factor></environmental-factor>
                </el-tab-pane>
                <!-- 装备因素 -->
                <el-tab-pane label="装备因素" name="second">
                  <equipment-factor></equipment-factor>
                </el-tab-pane>
                <!-- 人员因素 -->
                <el-tab-pane label="人员因素" name="third">
                  <person-factor></person-factor>
                </el-tab-pane>
                <!-- 操作因素 -->
                <el-tab-pane label="操作因素" name="forth">
                  <operate-factor></operate-factor>
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
import EnvironmentalFactor from '@/views/modules/Risk/Inplement_control/Environmental'
import PersonFactor from '@/views/modules/Risk/Inplement_control/Person'
import EquipmentFactor from '@/views/modules/Risk/Inplement_control/Equipment'
import OperateFactor from '@/views/modules/Risk/Inplement_control/Operate'
import headerIcon from '@/assets/img/icon/header/risk.png'

export default {
  name: 'DangerOperate',
  components: {
    commonHeader,
    CommonRiskSidebar,
    EnvironmentalFactor,
    EquipmentFactor,
    PersonFactor,
    OperateFactor
  },
  data () {
    return {
      headChange: {
        title: '潜水风险管理系统',
        headIcon: headerIcon
      },
      activeName: 'first'
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
        padding: 32px;
        border: 1px solid #BBD2DF;
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