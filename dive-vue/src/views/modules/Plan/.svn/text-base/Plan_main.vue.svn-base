<template>
<div>
    <common-header :headChange="headChange"></common-header>
    <div class="box">
        <el-row  class="plan">
            <el-col :span="4">
                <common-plan-sidebar @change="parentIndex" :showRedIcon="planCurIndex"></common-plan-sidebar>
            </el-col>
            <el-col :span="20">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</div>
    
</template>

<script>
import commonHeader from '../../common/base/Header'
import headerIcon from '@/assets/img/icon/header/plan.png'
import CommonPlanSidebar from '@/views/common/base/Plan_sidebar'
import gradualChange from '@/assets/img/figure/jianbian.png'
import jiantou from '@/assets/img/figure/jiantou.png'
import xuanzhong from '@/assets/img/figure/xuanzhong.png'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Plan_main',
  components: {
    commonHeader,
    CommonPlanSidebar
  },
  data () {
    return {
      headChange: {
        title: '潜水作业计划制定系统',
        headIcon: headerIcon
      },
      // curIndex: 0,不再此处定义而是从vuex中读取
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
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    parentIndex (val) {
      // console.log(this.changePlanIndex)
    //   this.changePlanIndex = val
      this['sidebar/changePlanIndex'](val)
    },
    // ...mapMutations('sidebar', ['changePlanIndex'])
    ...mapMutations(['sidebar/changePlanIndex'])

  },
  computed: {
    // 把sideIndex缓存到mapstate里
    // ...mapState('sidebar', ['curIndex']
    ...mapState('sidebar', ['planCurIndex']
    )
  }
  // mounted () {
  //   console.log(this.$store.state.sidebar.curIndex)
  //   console.log(this.curIndex)
  // }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/index.scss';
    .plan{
        background-color: $color-bg;
        display: flex;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
    }
</style>