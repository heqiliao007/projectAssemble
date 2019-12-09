<template>
    <div class="side">
        <img :src="gradualChange"/>
        <div class="sidebar">
            <ul class="sidebar-list" v-if="showRedIcon > -1">
                <router-link 
                    :to="{name: item.linkName}" 
                    replace
                    tag="li" 
                    v-for="(item,index) in contObj.contArr" 
                    :key="index" 
                    style="cursor:pointer;"
                    @click.native="handleIndex(index)"
                >
                    <img :src="xuanzhong" v-if="showRedIcon === index"/>
                    <img :src="jiantou" v-else/>
                    {{item.title}}
                </router-link>
            </ul>
            <ul class="sidebar-list" v-else>
                <li v-for="(item,index) in contObj.contArr" :key="index" >
                    <img :src="jiantou"/>
                    {{item.title}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import gradualChange from '@/assets/img/figure/jianbian.png'
import jiantou from '@/assets/img/figure/jiantou.png'
import xuanzhong from '@/assets/img/figure/xuanzhong.png'

export default {
  name: 'CommonPlanSidebar',
  data () {
    return {
      gradualChange: gradualChange,
      jiantou: jiantou,
      xuanzhong: xuanzhong,
      contObj: {
        contArr: [
            { 'title': '任务概况', 'linkName': 'mission_profile' },
            { 'title': '执行单位', 'linkName': 'Perform_unit' },
            { 'title': '潜水装备', 'linkName': 'plan_equipment' },
            { 'title': '潜水方案', 'linkName': 'diving_program' },
            { 'title': '呼吸气体', 'linkName': 'select_breath' },
            { 'title': '物资准备', 'linkName': 'supplies' },
            { 'title': '人员准备', 'linkName': 'staff_personnel' },
            { 'title': '潜水后事项', 'linkName': 'dive_event' },
            { 'title': '专家保障', 'linkName': 'experts_ensure' },
            { 'title': '风险控制', 'linkName': 'risk_control' }
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
                        width:12px;
                        height:22px;
                    }
                }
            }
        }
    }
</style>