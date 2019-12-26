<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
  </div>
</template>

<script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

  // 星星和图标一样都是基础组件，这里根据不同地方所引用时传入size和得分不同去改变
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      // 整体尺寸
      starType () {
        return 'star-' + this.size
      },
      // 每颗星的状态
      itemClasses () {
        let result = []
        /* Math.floor向下取整 如果得分小数大于0.5 小数部位就算0.5
           如果小数部分小于0.5 舍弃小数部分 */
        const score = Math.floor(this.score * 2) / 2
        // 有无小数部分 无小数 false
        const hasDecimal = score % 1 !== 0
        // 整数部分
        const integer = Math.floor(score)
        // 整星
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        // hasDecimal代表有小数 有小数就是半星
        if (hasDecimal) {
          result.push(CLS_HALF)
        }
        // 剩余部分 当result<5时去填充暗星
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        // 返回这个数组 前面是on 如果有小数中间是半星 还有位置的话填充暗星
        return result
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl"

  .star
    display: flex
    align-items: center
    justify-content: center
    .star-item
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
