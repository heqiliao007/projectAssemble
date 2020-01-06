<template>
  <div>
   <div class="search">
    <!-- 让input里的值双向绑定 -->
      <input
             class="search-input"
             type="text"
             placeholder="输入城市名或拼音"
             v-model="keyword"
      />
    </div>
      <!-- ref传一个dom元素 搜索内容显示与否取决于keyword-->
      <div
          class="search-content"
          ref='search'
          v-show='keyword'
      >
        <ul>
          <li
            class='search-item border-bottom'
            v-for='item of list'
            :key='item.id'
            @click='handleCity(item.name)'
          >
          {{item.name}}
          </li>
          <!-- v-show='!list.length'模板里尽量少用逻辑在计算属性里去写 -->
          <li
            class='search-item border-bottom'
            v-show='hasNoData'
          >
            没有找到匹配数据
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
// mapState
import { mapMutations } from 'vuex';
export default {
  name: 'CitySearch',
  data() {
    return {
      keyword: '',
      list: [],
      // 节流函数
      timer: null
    };
  },
  // 接收父组件传过来的cities
  props: {
    cities: Object
  },
  computed: {
    hasNoData() {
      return !this.list.length;
    }
  },
  methods: {
    handleCity(city) {
      //   触发changeCity事件，把city传过去
      //  1. this.$store.dispatch('changeCity',city)
      //  2.this.$store.commit('changeCity',city)
      // 3.
      this.changeCity(city);
      this.$router.push('/');
    },
    //  3. 把vuex里的数据映射到mapMutations的changeCity方法里
    ...mapMutations(['changeCity'])
  },
  // 侦听器 侦听keyword的改变
  watch: {
    keyword() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      // 优化判断
      if (!this.keyword) {
        this.list = [];
        return;
      }
      this.timer = setTimeout(() => {
        // 定义一个空数组
        const result = [];
        for (let i in this.cities) {
          // value就是每一项数据
          this.cities[i].forEach((value) => {
            if (value.spell.indexOf(this.keyword) > -1 ||
                value.name.indexOf(this.keyword) > -1) {
              // 如果spell或者name能搜索到这个关键词 就把这一项添加到result之中
              result.push(value);
            }
          });
        }
        this.list = result;
      }, 100);
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.search);
  }
};
</script>
<style lang="stylus" scoped>
    @import '~styles/varibles.styl';
    .search
        height .72rem
        padding 0 .1rem
        background-color $bgColor
        .search-input
            width 100%
            height .62rem
            line-height .62rem
            text-align center
            border-radius .05rem
            color  #666
            padding 0 .2rem
            box-sizing border-box
    .search-content
      overflow hidden
      z-index 1
      background #eee
      position: absolute
      top 1.58rem
      left 0
      right 0
      bottom 0
    .search-item
      line-height .62rem
      padding-left .2rem
      background-color #ffffff
      color #666
</style>
