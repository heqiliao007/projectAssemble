<template>
  <div class="header">
    <div class="header-left">
        <div class="iconfont back-icon">&#xe624;</div>
    </div>
    <div class="header-input">
        <span class="iconfont">&#xe632;</span>
        输入城市/游玩/景点
    </div>
    <!-- 页面跳转router-link -->
    <router-link to='/city'>
      <div class="header-right">
        <!-- 要写this -->
          <!-- {{this.city}} -->
          <!-- {{this.$store.state.city}} -->
          <!-- 映射后 -->
          {{this.city}}
          <!-- {{ this.doubleCity }} -->
          <span class="iconfont arrow-icon">&#xe64a;</span>
      </div>
    </router-link>
  </div>
</template>

<script>
// 优化vuex
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'HomeHeader',
  // 接受city
  // props:{
  //   city:String
  // }
  computed: {
    // 把vuex里的数据映射到计算属性中
    ...mapState(['city']),
    ...mapGetters(['doubleCity'])
  }
}
</script>

<style lang='stylus' scoped>
// 1rem=html的font-size=50px
// .86rem=43px
    // @import '../../../assets/styles/varibles.styl'
    @import '~styles/varibles.styl'
   .header
     display:flex
     line-height:$headerHeight
     background-color:$bgColor
     color:#fff
     .header-left
       width:.64rem
       float:left
       .back-icon
           text-align:center
           font-size:.4rem
     .header-input
       flex:1
       height:.64rem
       line-height:.64rem
       background:#fff
       border-radius:.1rem
       margin-top:.12rem
       margin-left:.2rem
       padding-left:.2rem
       color:#ccc
     .header-right
       color white
       min-width 1.04rem
       padding 0 .1rem
       float:right
       text-align:center
       .arrow-icon
          margin-left:-.04rem
          font-size:.24rem
</style>