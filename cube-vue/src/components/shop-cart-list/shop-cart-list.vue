<template>
  <transition name="fade" appear>
    <!--type="shop-cart-list"会有class： cube-shop-cart-list去确定bottom的位置
    :mask-closable=true点击蒙层是否隐藏 -->
    <cube-popup
      :mask-closable=true
      v-show="visible"
      @mask-click="maskClick"
      position="bottom"
      type="shop-cart-list"
      :z-index=90
    >
    <!-- 给list增加一个过渡效果 -->
      <transition
        name="move"
        appear
        @after-leave="afterLeave"
      >
        <div v-if="visible">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <cube-scroll class="list-content" ref="listContent">
            <ul>
              <li
                class="food"
                v-for="(food,index) in selectFoods"
                :key="index"
              >
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control @add="onAdd" :food="food"></cart-control>
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>

<script>
  import CartControl from 'components/cart-control/cart-control'
  import popupMixin from 'common/mixins/popup'

  const EVENT_SHOW = 'show'
  const EVENT_ADD = 'add'
  const EVENT_LEAVE = 'leave'

  export default {
    name: 'shop-cart-list',
    mixins: [popupMixin],
    props: {
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      }
    },
    created () {
      // 监听show方法
      this.$on(EVENT_SHOW, () => {
        // show的时候重新去执行cube-scroll的refresh方法
        this.$nextTick(() => {
          this.$refs.listContent.refresh()
        })
      })
    },
    methods: {
      onAdd (target) {
        this.$emit(EVENT_ADD, target)
      },
      afterLeave () {
        this.$emit(EVENT_LEAVE)
      },
      maskClick () {
        this.hide()
      },
      empty () {
        // 不用缓存 每次新建 否则单例模式会指向一个
        this.dialogComp = this.$createDialog({
          type: 'confirm',
          content: '清空购物车？',
          $events: {
            confirm: () => {
              this.selectFoods.forEach((food) => {
                // food要先清空
                food.count = 0
              })
              this.hide()
            }
          }
        })
        this.dialogComp.show()
      }
    },
    components: {
      CartControl
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .cube-shop-cart-list
    bottom: 48px
    &.fade-enter, &.fade-leave-active
      opacity: 0
    &.fade-enter-active, &.fade-leave-active
      transition: all .3s ease-in-out
    .move-enter, .move-leave-active
      transform: translate3d(0, 100%, 0)
    .move-enter-active, .move-leave-active
      transition: all .3s ease-in-out
    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      background: $color-background-ssss
      .title
        float: left
        font-size: $fontsize-medium
        color: $color-dark-grey
      .empty
        float: right
        font-size: $fontsize-small
        color: $color-blue

    .list-content
      padding: 0 18px
      max-height: 217px
      overflow: hidden
      background: $color-white
      .food
        position: relative
        padding: 12px 0
        box-sizing: border-box
        .name
          line-height: 24px
          font-size: $fontsize-medium
          color: $color-dark-grey
        .price
          position: absolute
          right: 90px
          bottom: 12px
          line-height: 24px
          font-weight: 700
          font-size: $fontsize-medium
          color: $color-red
        .cart-control-wrapper
          position: absolute
          right: 0
          bottom: 6px

</style>
