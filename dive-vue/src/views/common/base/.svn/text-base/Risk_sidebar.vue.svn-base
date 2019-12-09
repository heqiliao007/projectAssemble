<template>
    <div class="side">
        <img :src="gradualChange"/>
        <div class="sidebar">
            <ul class="sidebar-list" v-if="showRedIcon > -1">
                <router-link 
                    :to="{name: item.linkName}" 
                    tag="li" 
                    v-for="(item,index) in contObj.contArr" 
                    :key="index" 
                    style="cursor:pointer;"
                    @click.native="handleIndex(index)"
                >
                    <span v-if="showRedIcon === index" style="font-weight:bold;">
                        <img :src="item.imgSel"/>
                        {{item.title}}
                    </span>
                    <span v-else>
                        <img :src="item.imgDef"/>
                        {{item.title}}
                    </span>
                </router-link>
            </ul>
            <ul class="sidebar-list" v-else>
                <li v-for="(item,index) in contObj.contArr" :key="index" >
                    <img :src="item.imgDef"/>
                    {{item.title}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import gradualChange from '@/assets/img/figure/jianbian.png'
// import imgUrl from '@/views/common/base/img/risk'

export default {
  name: 'CommonRiskSidebar',
  data () {
    return {
      gradualChange: gradualChange,
      contObj: {
        contArr: [
          {
            'title': '项目信息',
            'linkName': 'project_information',
            'imgDef': require('@/views/common/base/img/risk/0.png'),
            'imgSel': require('@/views/common/base/img/risk/selected0.png')
          },
          {
            'title': '识别危险',
            'linkName': 'hazard_identification',
            'imgDef': require('@/views/common/base/img/risk/1.png'),
            'imgSel': require('@/views/common/base/img/risk/selected1.png')
          },
          {
            'title': '评估危险',
            'linkName': 'evaluation_management',
            'imgDef': require('@/views/common/base/img/risk/2.png'),
            'imgSel': require('@/views/common/base/img/risk/selected2.png')
          },
          {
            'title': '风险决策',
            'linkName': 'risk_decision',
            'imgDef': require('@/views/common/base/img/risk/3.png'),
            'imgSel': require('@/views/common/base/img/risk/selected3.png')
          },
          {
            'title': '实施控制',
            'linkName': 'implementation_of_control',
            'imgDef': require('@/views/common/base/img/risk/4.png'),
            'imgSel': require('@/views/common/base/img/risk/selected4.png')
          },
          { 'title': '监督管理',
            'linkName': 'supervision_and_administration',
            'imgDef': require('@/views/common/base/img/risk/5.png'),
            'imgSel': require('@/views/common/base/img/risk/selected5.png')
          }
        ]
      }
    }
  },
  props: {
    headChange: Object,
    showRedIcon: Number
  },
  methods: {
    handleIndex (index) {
      console.log(this.showRedIcon)
      this.$emit('change', index)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/index.scss';
    .side{
        height: 100%;
        color: $color-bg-white;
        font-size: $text-size18;
        background-color:  $color-bg;
        &>img{
            width: 100%;
            height: 33px;
        }
        .sidebar{
            height: calc(100% - 33px);
            background: -webkit-linear-gradient($color-bg-blue, $color-light-blue);
            background: -o-linear-gradient($color-bg-blue, $color-light-blue);
            background: -moz-linear-gradient($color-bg-blue, $color-light-blue);
            background: linear-gradient($color-bg-blue, $color-light-blue);
            .sidebar-list{
                margin: 0;
                height: calc(100-33px);
                padding: 30px 0 0px;
                text-align: center;
                min-height: 480px;
                li{
                    text-align: left;
                    padding: 0px 15px 0px 35px;
                    height: 49px;
                    line-height: 49px;
                    border-bottom: 1px solid #59A8F7;
                    font-weight:normal;
                    &:last-child{
                        border-bottom: none;
                    }
                    img{
                        margin-right:9px;
                        width:18px;
                        height:18px;
                        margin-top: -2px;
                    }
                }
            }
        }
    }
</style>