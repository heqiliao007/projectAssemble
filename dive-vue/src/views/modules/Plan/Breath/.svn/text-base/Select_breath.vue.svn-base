<template>
    <div>
        <!-- <common-header :headChange="headChange"></common-header>
        <el-row class="plan">
          <el-col :span="4">
              <common-plan-sidebar :curIndex='curIndex'></common-plan-sidebar>
          </el-col> -->
          <!-- <el-col :span="20"> -->
            <el-row class="grid-content">
              <span class="title">请选择需要准备的气体类型</span>
              <el-row class="main">
                <el-row class="breath_row">
                    <el-col :offset="6" :span="6" class="breath_text"> 闭式自携呼吸气 </el-col>
                    <el-col :span="12" style="margin-top: 10px;">
                        <el-switch
                            ref="switch1"
                            v-model="value1"
                            active-color="#1288FF"
                            inactive-color="#EB5557"
                            active-text="ON"
                            inactive-text="OFF">
                        </el-switch>
                    </el-col>
                </el-row> 
                <el-row class="breath_row">
                    <el-col :offset="6" :span="6" class="breath_text"> 水面减压 </el-col>
                    <el-col :span="12" style="margin-top: 8px;">
                        <el-switch
                            v-model="value2"
                            active-color="#1288FF"
                            inactive-color="#EB5557"
                            active-text="ON"
                            inactive-text="OFF">
                        </el-switch>
                    </el-col>
                </el-row> 
                <el-row class="breath_row">
                    <el-col :offset="6" :span="6" class="breath_text"> 加压舱备便 </el-col>
                    <el-col :span="12" style="margin-top: 6px;">
                        <el-switch
                            v-model="value3"
                            active-color="#1288FF"
                            inactive-color="#EB5557"
                            active-text="ON"
                            inactive-text="OFF">
                        </el-switch>
                    </el-col>
                </el-row>
              </el-row>
              <el-row type="flex" justify="space-between"  class="icons">
                <el-col :span="12">
                    <el-button type="primary" style="font-size: 16px;" @click="$router.push({ name:'tab_breath'})">确定</el-button>                    
                </el-col>
                <el-col :span="12" style="text-align:right;">
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
          <!-- </el-col>
        </el-row> -->
    </div>
</template>

<script>
import commonHeader from '@/views/common/base/Header'
import CommonPlanSidebar from '@/views/common/base/Plan_sidebar'
import headerIcon from '@/assets/img/icon/header/plan.png'

export default {
  name: 'PlanEquipment',
  components: {
    commonHeader,
    CommonPlanSidebar
  },
  data () {
    return {
      text: '潜水员是一类作业于特殊环境、使用特殊装备、掌握特殊技能的特种技术人员，对其规范管理是保证潜水作业安全实施的基础。本系统收集和管理潜水员的全部职业信息，便于各级机关科学管理。',
      headChange: {
        title: '潜水作业计划制定系统',
        headIcon: headerIcon
      },
      curIndex: 4,
      value1: true,
      value2: false,
      value3: false
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/index.scss';

    /deep/ .breath_row .el-switch__core{
        // width: 90px!important;
        // height: 40px;
        border-radius: 15px;
        box-shadow: 0px 0px 20px 0px #e47173;
        width: 68px!important;
        height: 30px;
    }
    /deep/ .breath_row .is-checked .el-switch__core{
        box-shadow: 0px 0px 20px 0px $color-light-blue;
    }
    /deep/ .breath_row .el-switch__core:after{
        width: 30px;
        height: 30px;
        top: -1px;
        left: -1px;
    }
    /deep/ .breath_row .el-switch.is-checked .el-switch__core::after{
        margin-left: 38px!important;
    }
    /deep/ .breath_row .el-switch__label *{
        font-size: 12px;
    }
    /deep/ .breath_row .el-switch__label--left{
        position: absolute;
        right: -6px; 
        z-index: 1;
        color: #Fff;
    }
    /deep/ .breath_row .el-switch__label--right{
        position: absolute;
        left: -6px; 
        z-index: 1;
        color: #Fff;
    }
    .plan{
      background-color: $color-bg;
      display: flex;
      align-items: stretch;
      .grid-content {
        margin:39px 28px 30px 28px;
        background-color: $color-bg-white;
        padding: 32px;
          .title{
            font-size: $text-size26;
            color: $color-text-black;
            border-bottom: 4px solid $color-bg-blue;
            padding-bottom: 7px;
          }
          .main{
            display: -webkit-flex; /* Safari */
            display: flex;
            justify-content:center;
            // align-items: center; 
            flex-direction: column;
            margin-top: 47px; 
            border: 2px solid $color-bg-blue;
            height: 600px;
            .breath_row{
                margin-bottom: 50px;
            }
            .breath_text{
                display: inline-block;
                font-size: $text-size22;
                color: $color-text-black;
            }
          }
          .icons{
            // height: 58px;
            padding-top:16px;
            & span{
                width: 36px;
                height: 36px;
                display: inline-block;
                cursor: pointer;
                margin-left: 6px;
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