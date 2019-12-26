<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <!-- icon-shopping_cart -->
              <i class="cubeic-mall" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">
              <!-- 购物车上的数量小圆 -->
              <bubble :num="totalCount"></bubble>
            </div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <!-- 右边结算状态 @click="pay"-->
        <div class="content-right">
          <!-- 阻止冒泡到外层 写到方法逻辑里-->
          <div class="pay" :class="payClass" @click="pay">
            {{payDesc}}
          </div>
        </div>
      </div>
      <!-- 绝对定位 -->
      <div class="ball-container">
        <div v-for="(ball,index) in balls" :key="index">
          <!-- transition几个钩子函数 -->
          <transition
            @before-enter="beforeDrop"
            @enter="dropping"
            @after-enter="afterDrop">
            <!-- 默认小球都是隐藏的 -->
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Bubble from 'components/bubble/bubble'

  const BALL_LEN = 10// 假定购物车原本放入了10个小球
  const innerClsHook = 'inner-hook'

  // 辅助函数
  function createBalls () {
    let balls = []
    for (let i = 0; i < BALL_LEN; i++) {
      balls.push({
        show: false
      })
    }
    return balls
  }

  export default {
    name: 'shop-cart',
    props: {
      // 已选择的食物
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      },
      // deliveryPrice和minPrice根据接口数据
      // 配送费
      deliveryPrice: {
        type: Number,
        default: 0
      },
      // 最少起送费
      minPrice: {
        type: Number,
        default: 0
      },
      sticky: {
        type: Boolean,
        default: false
      },
      // 对于原购物车组件 listFold一开始默认为收起 true
      fold: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        // 小球的数量
        balls: createBalls(),
        // 需要一个data值listFold去接收fold值 因为子组件不能直接去改变props值
        listFold: this.fold
      }
    },
    created () {
      // 定义一个数组保存下落的小球
      this.dropBalls = []
      // 默认收起 fole==叠起
      // this.listFold = true
    },
    mounted () {
      // console.log(this.balls)
    },
    computed: {
      // 价钱总和
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      // 总数量
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      // 结算状态显示
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      // 结算状态样式显示
      payClass () {
        if (!this.totalCount || this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      }
    },
    methods: {
      toggleList () {
        // 点击底部展开 但是是点击蒙层关闭 所以当list展开后去点击蒙层else部分实际不执行
        // 是因为组件自身封装的:mask-closable=true属性使它关闭并没有执行this.listFold = true仍然为false
        // 就需要点击两次才又显示list组件 此时需要在createAPI的hide方法中去派发事件
        if (this.listFold) {
          // 要有东西才能展开
          if (!this.totalCount) {
            return
          }
          this.listFold = false
          this._showShopCartList()
          // 在show list组件时同时去show sticky
          this._showShopCartSticky()
        } else {
          this.listFold = true
          this._hideShopCartList()
        }
      },
      pay (e) {
        if (this.totalPrice < this.minPrice) {
          return
        }
        // 这里createDialog不能用缓存
        this.$createDialog({
          title: '支付',
          content: `您需要支付${this.totalPrice}元`
        }).show()
        // stopPropagation有了一个判断
        e.stopPropagation()
      },

      // 可以把小球想象放在篮子里,点击+的时候去驱动购物车的动画,先用dropBalls数组装好小球
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          const ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      // 相当于让小球在购物车处为原点
      // befor-enter
      beforeDrop (el) {
        // 从当前dropBalls最后一个拿到小球
        const ball = this.dropBalls[this.dropBalls.length - 1]
        // getBoundingClientRect计算元素的绝对位置，会得到left top width height 4个元素
        const rect = ball.el.getBoundingClientRect()
        // 相当于按钮的左边距离-32
        const x = rect.left - 32
        // 浏览器窗口的视口（viewport）高度（以像素为单位）-视口距离上边-底部
        // 小球从购物车到控制键 x方向是正值,y方向是负值
        const y = -(window.innerHeight - rect.top - 22)
        el.style.display = ''
        el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`
        const inner = el.getElementsByClassName(innerClsHook)[0]
        inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
      },
      // enter
      dropping (el, done) {
        // 触发重绘
        this._reflow = document.body.offsetHeight
        el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`
        const inner = el.getElementsByClassName(innerClsHook)[0]
        inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`
        // 监听transitionend函数
        el.addEventListener('transitionend', done)
      },
      // after-enter
      afterDrop (el) {
        // 把数组的第一个元素从其中删除,并返回删除元素
        const ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      _showShopCartList () {
        this.shopCartListComp = this.shopCartListComp || this.$createShopCartList({
          $props: {
            selectFoods: 'selectFoods'
          },
          $events: {
            // list组件动画完成后再去hide sticky组件 不能在派发的hide事件中瞬间完成
            // leave: () => {
            //   this._hideShopCartSticky()
            // },
            hide: () => {
              this.listFold = true
              // this._hideShopCartSticky()
            },
            // 监听add方法，调用sticky组件的drop方法，target为传入的按钮dom元素
            add: (el) => {
              this.shopCartStickyComp.drop(el)
            }
          }
        })
        this.shopCartListComp.show()
      },
      _showShopCartSticky () {
        this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
          $props: {
            selectFoods: 'selectFoods',
            deliveryPrice: 'deliveryPrice',
            minPrice: 'minPrice',
            fold: 'listFold',
            // 创建sticky组件时 把原购物车组件的list组件也传递过去 否则sticky组件没有list执行_hideShopCartList会报错
            list: this.shopCartListComp
          }
        })
        this.shopCartStickyComp.show()
      },
      _hideShopCartList () {
        // this.shopCartListComp.hide()
        // 当出现sticky组件时，this.$paren即为sticky组件，sticky组件有个props--list
        // this.$parent.list.hide()
        // 什么时候去执行sticky的list组件hide 什么时候执行原购物车组件的list组件的hide
        const list = this.sticky ? this.$parent.list : this.shopCartListComp
        list.hide && list.hide()
      },
      _hideShopCartSticky () {
        this.shopCartStickyComp.hide()
      }
    },
    watch: {
      fold (newVal) {
        // listFold在data里是fold，而fold在props里始终为true 所以要监听fold的值
        this.listFold = newVal
      },
      totalCount (count) {
        // 展开并且count为0去执行关闭lsit
        if (!this.fold && count === 0) {
          this._hideShopCartList()
        }
      }
    },
    components: {
      Bubble
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"

  .shopcart
    height: 100%
    .content
      display: flex
      background: $color-background
      font-size: 0
      color: $color-light-grey
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: $color-background
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: $color-dark-grey
            &.highlight
              background: $color-blue
            .cubeic-mall
              line-height: 44px
              font-size: $fontsize-large-xxx
              color: $color-light-grey
              &.highlight
                color: $color-white
          .num
            position: absolute
            top: 0
            right: 0
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-weight: 700
          font-size: $fontsize-large
          &.highlight
            color: $color-white
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: $fontsize-small-s
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-weight: 700
          font-size: $fontsize-small
          &.not-enough
            background: $color-dark-grey
          &.enough
            background: $color-green
            color: $color-white
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: $color-blue
          transition: all 0.4s linear
</style>
