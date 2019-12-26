<template>
  <div id="app">
    <v-header :seller = seller></v-header>
    <!-- <HeaderDetail :seller = seller></HeaderDetail> -->
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script>
import VHeader from './components/v-header/v-header'
// import HeaderDetail from './components/header-detail/header-detail'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'
import Tab from 'components/tab/tab'
import { getSeller } from 'api'

export default {
  name: 'app',
  data () {
    return {
      seller: {
        // id: qs.parse(location.search).id
      }
    }
  },
  created () {
    this._getSeller()
  },
  computed: {
    tabs () {
      return [
        {
          label: '商品',
          component: Goods,
          data: {
            seller: this.seller
          }
        },
        {
          label: '评论',
          component: Ratings,
          data: {
            seller: this.seller
          }
        },
        {
          label: '商家',
          component: Seller,
          data: {
            seller: this.seller
          }
        }
      ]
    }
  },
  methods: {
    _getSeller () {
      // then可以返回一个方法 其中seller参数实际就是freturn的data
      getSeller({}).then((seller) => {
        // 1 赋值
        this.seller = seller
      })
    }
  },
  components: {
    VHeader,
    Tab
  }
}
</script>

<style lang="stylus">
  #app
      .tab-wrapper
        position: fixed
        top: 136px
        left: 0
        right: 0
        bottom: 0
</style>
