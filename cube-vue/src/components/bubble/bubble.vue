<template>
  <!-- 单独提出来一个组件因为除了购物车还有侧边栏需要用 -->
  <span class="bubble">
    {{ num }}
  </span>
</template>

<script>
  export default {
    name: 'bubble',
    props: {
      num: {
        type: Number
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .bubble
    display: inline-block
    padding: 0 5px
    height: 16px
    line-height: 16px
    text-align: center
    border-radius: 16px
    font-family: Helvetica
    font-weight: 700
    font-size: $fontsize-small-s
    color: $color-white
    // 渐变
    background: linear-gradient(to right, $color-orange, $color-red)
</style>
