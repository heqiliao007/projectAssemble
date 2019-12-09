<template>
<div>
    <common-header :headChange="headChange"></common-header>
    <div class="box">
        <el-row  class="risk">
            <el-col :span="4">
                <common-risk-sidebar @change="parentIndex" :showRedIcon="riskCurIndex"></common-risk-sidebar>
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
import headerIcon from '@/assets/img/icon/header/risk.png'
import CommonRiskSidebar from '@/views/common/base/Risk_sidebar'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Risk_main',
  components: {
    commonHeader,
    CommonRiskSidebar
  },
  data () {
    return {
      headChange: {
        title: '潜水风险管理系统',
        headIcon: headerIcon
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    parentIndex (val) {
      console.log(this.riskCurIndex)
      this['sidebar/changeRiskIndex'](val)
    },
    ...mapMutations(['sidebar/changeRiskIndex'])
  },
  computed: {
    // 把sideIndex缓存到mapstate里
    ...mapState('sidebar', ['riskCurIndex']
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
    .risk{
        background-color: $color-bg;
        display: flex;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
    }
</style>