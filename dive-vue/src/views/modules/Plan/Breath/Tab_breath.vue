<template>
    <div>
        <!-- <common-header :headChange="headChange"></common-header>
        <el-row class="plan">
          <el-col :span="4">
              <common-plan-sidebar :curIndex='curIndex'></common-plan-sidebar>
          </el-col>
          <el-col :span="20"> -->
            <el-row class="grid-content">
              <!-- tab -->
              <el-tabs v-model="activeName" @tab-click="handleClick"  class="tabs">
                <!-- 开式呼吸气 -->
                <el-tab-pane label="开式呼吸气" name="first">
                  <open-breath></open-breath>
                </el-tab-pane>
                <!-- 水面减压 -->
                <el-tab-pane label="水面减压" name="second">
                  <reduce-pressure></reduce-pressure>
                </el-tab-pane>
                <!-- 加压舱备便 -->
                <el-tab-pane label="加压舱备便" name="third">
                  <add-pressure></add-pressure>
                </el-tab-pane>
              </el-tabs>
            </el-row>
          <!-- </el-col>
        </el-row> -->
    </div>
</template>

<script>
import commonHeader from '@/views/common/base/Header'
import CommonPlanSidebar from '@/views/common/base/Plan_sidebar'
import OpenBreath from './Open_breath'
import ReducePressure from './Redece_pressure'
import AddPressure from './Add_pressure'
import headerIcon from '@/assets/img/icon/header/plan.png'

export default {
  name: 'PlanEquipment',
  components: {
    commonHeader,
    CommonPlanSidebar,
    OpenBreath,
    ReducePressure,
    AddPressure
  },
  data () {
    return {
      headChange: {
        title: '潜水作业计划制定系统',
        headIcon: headerIcon
      },
      curIndex: 4,
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
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
      width: 40%;
      margin:0 5px 0 10px;
    }
    .plan{
      background-color: $color-bg;
      display: flex;
      align-items: stretch;
      .grid-content {
        margin:28px 39px 20px 28px;
        background-color: $color-bg-white;
        padding: 32px;
      }
    }
</style>