<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav
        :side=true
        :data="goods"
        v-if="goods.length"
        :options="scrollOptions"
      >
        <!-- template结合slot-scope作用域插槽 侧边自定义 图标这些-->
        <!-- 插槽的props实际就是插槽外层组件的data barTxts-->
        <template slot="bar" slot-scope="props">
          <!-- txts去构造数据而不是 props.txts-->
          <cube-scroll-nav-bar
            direction="vertical"
            :labels="props.labels"
            :txts="barTxts"
            :current="props.current"
          >
            <template slot-scope="props">
              <div class="text">
                <!-- props.txt每一项 props.txt 就是当前项的 txt 的值 这种结构
                 {
                    "type": -1,
                    "name": "热销榜",
                    "count": 0
                  } -->
                <support-ico
                  v-if="props.txt.type>=1"
                  :size=3
                  :type="props.txt.type"
                ></support-ico>
                <span>{{props.txt.name}}</span>
                <span class="num" v-if="props.txt.count">
                  <bubble :num="props.txt.count"></bubble>
                </span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel
          v-for="good in goods"
          :key="good.name"
          :label="good.name"
          :title="good.name"
        >
          <ul>
            <li
              @click="selectFood(food)"
              v-for="food in good.foods"
              :key="food.name"
              class="food-item"
            >
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <!-- 购物车+/- 监听add事件-->
                  <cart-control :food="food" @add="onAdd"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <div class="shop-cart-wrapper">
      <!-- <cart-control :food="food" @add="onAdd"></cart-control> -->
      <!-- 组件里面传递的每一个参数名推荐写短横线 -->
      <shop-cart
        ref="shopCart"
        :select-foods="selectFoods"
        :delivery-price="seller.deliveryPrice"
        :min-price="seller.minPrice"
      ></shop-cart>
    </div>
  </div>
</template>

<script>
  import { getGoods } from 'api'
  import CartControl from 'components/cart-control/cart-control'
  import ShopCart from 'components/shop-cart/shop-cart'
  // import Food from 'components/food/food'
  import SupportIco from 'components/support-ico/support-ico'
  import Bubble from 'components/bubble/bubble'

  export default {
    name: 'goods',
    props: {
      data: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        goods: [],
        food1: {},
        selectedFood: {},
        scrollOptions: {
          // false是因为左右两边都要点击 点击会两次
          click: false,
          directionLockThreshold: 0
        }
      }
    },
    computed: {
      // 根据接口传递进来的seller
      seller () {
        return this.data.seller
      },
      // 已选择的食物 要传入购物车组件
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          // good代表good这个数据项，本身是个数组，再去遍历就得到每一项食物
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        console.log(foods)
        return foods
      },
      // 构造 除了name还需要type--对应图标\还有商品总和
      barTxts () {
        let ret = []
        this.goods.forEach((good) => {
          // 解构出type,name,foods
          const { type, name, foods } = good
          let count = 0
          foods.forEach((food) => {
            // 默认为0 没有的话就是0
            count += food.count || 0
          })
          ret.push({
            type,
            name,
            count
          })
        })
        return ret
      }
    },
    methods: {
      // 获取商品数据
      // tab每次onchange的时候去执行fetch 每次滑动都会初始化数据 需要处理
      fetch () {
        console.log(this)
        // this.fetched未初始化时为undefined,!undefined执行后相当于新添加了this.fetched属性
        // 不会再重新请求了
        if (!this.fetched) {
          this.fetched = true
          getGoods({
            id: this.seller.id
          }).then((goods) => {
            this.goods = goods
          })
        }
      },
      selectFood (food) {
        // console.log(33)
        this.selectedFood = food
        // this._showFood()
        // this._showShopCartSticky()
      },
      // 驱动购物车的动画
      onAdd (target) {
        // 调用购物车的drop方法 target为传入的按钮dom元素
        this.$refs.shopCart.drop(target)
      }
      // _showFood () {
      //   this.foodComp = this.foodComp || this.$createFood({
      //     $props: {
      //       food: 'selectedFood'
      //     },
      //     $events: {
      //       add: (target) => {
      //         this.shopCartStickyComp.drop(target)
      //       },
      //       leave: () => {
      //         this._hideShopCartSticky()
      //       }
      //     }
      //   })
      //   this.foodComp.show()
      // },
      // _showShopCartSticky () {
      //   this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
      //     $props: {
      //       selectFoods: 'selectFoods',
      //       deliveryPrice: this.seller.deliveryPrice,
      //       minPrice: this.seller.minPrice,
      //       fold: true
      //     }
      //   })
      //   this.shopCartStickyComp.show()
      // },
      // _hideShopCartSticky () {
      //   this.shopCartStickyComp.hide()
      // }
    },
    components: {
      SupportIco,
      Bubble,
      CartControl,
      ShopCart
      // Food
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  .goods
    position: relative
    text-align: left
    height: 100%
    .scroll-nav-wrapper
      position: absolute
      width: 100%
      top: 0
      left: 0
      bottom: 48px
    >>> .cube-scroll-nav-bar
      width: 80px
      white-space: normal
      overflow: hidden
    >>> .cube-scroll-nav-bar-item
      padding: 0 10px
      display: flex
      align-items: center
      height: 56px
      line-height: 14px
      font-size: $fontsize-small
      background: $color-background-ssss
      .text
        flex: 1
        position: relative
      .num
        position: absolute
        right: -8px
        top: -10px
      .support-ico
        display: inline-block
        vertical-align: top
        margin-right: 4px
    >>> .cube-scroll-nav-bar-item_active
      background: $color-white
      color: $color-dark-grey
    >>> .cube-scroll-nav-panel-title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid $color-col-line
      font-size: $fontsize-small
      color: $color-grey
      background: $color-background-ssss
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      position: relative
      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
        img
          height: auto
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: $fontsize-medium
          color: $color-dark-grey
        .desc, .extra
          line-height: 10px
          font-size: $fontsize-small-s
          color: $color-light-grey
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: $fontsize-medium
            color: $color-red
          .old
            text-decoration: line-through
            font-size: $fontsize-small-s
            color: $color-light-grey
      .cart-control-wrapper
        position: absolute
        right: 0
        bottom: 12px
    .shop-cart-wrapper
      position: absolute
      left: 0
      bottom: 0
      z-index: 50
      width: 100%
      height: 48px
</style>
