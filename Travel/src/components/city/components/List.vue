<template>
  <div class="list" ref='wrapper'>
     <div>
        <div class="area">
            <div class="title border-topbottom">当前城市</div>
            <div class="button-list">
                <div class="button-wrapper">
                    <div class="button">
                        <!-- {{this.$store.state.city}} -->
                        {{this.currentCity}}
                    </div>
                </div>
            </div>
        </div>
        <div class="area">
            <div class="title border-topbottom">热门城市</div>
            <div class="button-list">
                <!-- 点击热门城市时把城市名传进函数 -->
                <div
                    class="button-wrapper"
                    v-for="item of hot"
                    :key='item.id'
                    @click='handleCity(item.name)'
                >
                    <div class="button">{{item.name}}</div>
                </div>
            </div>
        </div>
        <!--对象循环 key是键名也就是abcd  item是键值  绑定的key值就是字母-->
        <div
          class="area"
          v-for="(item,key) of cities"
          :key='key'
          :ref='key'
        >
            <div class="title border-topbottom">{{key}}</div>
            <div
                class="item-list"
                v-for="items of item"
                :key='items.id'
                @click='handleCity(items.name)'
            >
                <div class="item border-bottom">{{items.name}}</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'CityList',
  props: {
    cities: Object,
    hot: Array,
    letter: String
  },
  computed: {
    ...mapState({
      //   可以是数组，也可以是对象
      currentCity: 'city'
    })
  },
  methods: {
    handleCity(city) {
      //   通过调用dispatch去调用actions 触发changeCity事件，把city传过去
      //   1.this.$store.dispatch('changeCity',city)
      //  2.this.$store.commit('changeCity',city)
      this.changeCity1(city);
      // this.$router.push('/');
    },
    //  3. 把vuex里的数据映射到mapMutations的changeCity方法里
    ...mapMutations(['changeCity1'])
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper);
  },
  // 借助监听器watch去监听letter的变化
  watch: {
    letter() {
      console.log(this.letter);
      if (this.letter) {
        // console.log(this.$refs[this.letter]);
        // this.$refs[this.letter];获得的element是数组
        const element = this.$refs[this.letter][0];
        console.log('这是element数组', element);
        // bettter-scroll可以自动滚动到某一区域
        this.scroll.scrollToElement(element);
      }
    }
  }
};
</script>

<style lang='stylus' scoped>
  @import '~styles/varibles.styl';
  .border-topbottom
      &:before
          border-color #ccc
      &:after
          border-color #ccc
  .border-bottom
      &:before
          border-color #ccc
  .list
        position absolute
        overflow hidden
        top 1.58rem
        bottom 0
        left 0
        right 0
        .title
            line-height .54rem
            background #eee
            padding-left .2rem
            color #666
            font-size .26rem
        .button-list
            overflow hidden
            padding .1rem .6rem .1rem .1rem
            .button-wrapper
                float left
                width 33.33%
                .button
                    margin .1rem
                    text-align center
                    border .02rem solid #ccc
                    padding .1rem 0
                    border-radius .06rem
        .item-list
            .item
                line-height .76rem
                color #666666
                padding-left .2rem
</style>
