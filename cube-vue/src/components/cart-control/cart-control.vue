<template>
<!-- 本组件实现购物车控制键 ＋/- -->
  <div class="cartcontrol">
    <!--减号  过渡动画 偏移 -->
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decrease">
        <!--图标不知道为啥找不到了 icon-remove_circle_outline -->
        <span class="inner cubeic-remove"></span>
      </div>
    </transition>
    <!-- 数量 -->
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <!-- 加号 stop阻止外层食物点击进入详情页 icon-add_circle @click.stop="add"-->
    <div class="cart-add cubeic-add" @click.stop="add"></div>
  </div>
</template>

<script>
  const EVENT_ADD = 'add'

  export default {
    name: 'cart-control',
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      add (event) {
        console.log(1)
        if (!this.food.count) {
          // vue对象新增加的属性 如果没有count属性 就增加一个key为'count' value为1
          this.$set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        // console.log(event.target, event.current.target)
        // 派发事件add event.target得到点击的按钮
        this.$emit(EVENT_ADD, event.target)
      },
      decrease () {
        // 这个判断相当于this.food.count>0
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .cartcontrol
    display: flex
    align-items: center
    .cart-decrease
      display: inline-block
      padding: 6px
      opacity: 1
      .inner
        display: inline-block
        line-height: 24px
        font-size: $fontsize-large-xxx
        color: $color-blue
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        // 内存滚动 外层偏移 x轴
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      width: 12px
      line-height: 24px
      text-align: center
      font-size: $fontsize-small-s
      color: $color-grey
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: $fontsize-large-xxx
      color: $color-blue
</style>
