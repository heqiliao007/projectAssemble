<template>
  <!-- 因为shop-cart-list组件是通过createAPI挂载到body下
  所以我们需要一个组件去把购物车也挂载到body下 解决层级问题 -->
  <div class="shop-cart-sticky" v-show="visible">
    <!-- 创建了这样一个租金 需要去销毁 因为原购物车组件会随tab切换而切换 sticky不会
    并且 要把listFold作为props传递 不然对于原购物车组件默认始终为true 每次点击底部都会创建sticky组件 -->
    <!-- sticky组件sticky永远为true 不需要props -->
    <shop-cart
      ref="shopCart"
      :selectFoods="selectFoods"
      :deliveryPrice="deliveryPrice"
      :minPrice="minPrice"
      :fold="fold"
      :sticky=true
    >
    </shop-cart>
  </div>
</template>

<script>
  import ShopCart from 'components/shop-cart/shop-cart'
  import popupMixin from 'common/mixins/popup'

  export default {
    name: 'shop-cart-sticky',
    mixins: [popupMixin],
    props: {
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      fold: {
        // 变成props属性后，对于sticky组件一开始是展开的
        type: Boolean,
        default: false
      },
      // 接收list
      list: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      drop (el) {
        this.$refs.shopCart.drop(el)
      }
    },
    components: {
      ShopCart
    }
  }
</script>

<style lang="stylus" scoped>
  .shop-cart-sticky
    position: absolute
    left: 0
    bottom: 0
    z-index: 999
    width: 100%
    height: 48px
</style>
