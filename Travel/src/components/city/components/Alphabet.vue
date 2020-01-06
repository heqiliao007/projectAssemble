<template>
    <ul class="list">
        <!-- v-for='(item,key) of cities'
             :key='key' -->
             <!-- prevent阻止默认行为 -->
        <li class="item"
             v-for='item of letters'
             :key='item'
             :ref='item'
             @touchstart.prevent='handleTouchStart'
             @touchmove='handleTouchMove'
             @touchend='handleTouchEnd'
             @click='handleLetterClick'
        >
        {{item}}
        </li>
    </ul>
</template>
<script>
// 思路：！！！（获得当前手指距离顶部位置-a字母距离顶部的高度）/每个字母高度就可以知道当前是哪个字母 然后再向外触发change事件
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  // 构建一个数组 存储字母表
  computed: {
    letters() {
      // console.log(this.cities);
      const letters = [];
      // 只循环第一层也就是abcd。。。
      for (let i in this.cities) {
        letters.push(i);
      }
      // 返回这个数组
      // console.log(letters);
      return letters;
    }
  },
  data() {
    return {
      // 定义一个标识位
      touchStatus: false,
      // 提高性能1. startY是固定的 不用每次去执行重新获得
      startY: 0,
      // 提高性能2. 函数节流
      timer: null
    };
  },
  // Alphabet组件重新渲染后 updated被执行 (这个值是固定的)
  updated() {
    // offsetTop此属性可以获取元素的上外缘距离最近采用定位父元素内壁的距离，
    // 如果父元素中没有采用定位的，则是获取上外边缘距离文档内壁的距离
    this.startY = this.$refs['A'][0].offsetTop;
  },
  methods: {
    handleLetterClick(e) {
      // 子组件向父组件传值向外触发事件 并且携带触发获取的值e.target.innerText==letter
      this.$emit('change', e.target.innerText);
      // console.log(e.target.innerText)
    },
    // 列表页滑动 字母表要有相应变化
    handleTouchStart() {
      this.touchStatus = true;
    },
    handleTouchMove(e) {
      if (this.touchStatus) {
        //  减少 handleTouchMove执行频率
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          // a元素到顶部的距离
          // console.log(this.$refs['A']);
          // 距离顶部（也就是固定的头部下沿的距离）
          //  const startY=this.$refs['A'][0].offsetTop;
          //  console.log(startY);
          const touchY = e.touches[0].clientY - (43 + 36);
          console.log(touchY);
          // 下标
          const index = Math.floor((touchY - this.startY) / 20);
          console.log(index);
          if (index >= 0 && index <= this.letters.length) {
            this.$emit('change', this.letters[index]);
          }
        }, 16);
      }
    },
    handleTouchEnd() {
      this.touchStatus = false;
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.list
    display flex
    flex-direction column
    justify-content center
    position absolute
    top 1.58rem
    right 0
    bottom 0
    width .4rem
    .item
        line-height .4rem
        text-align center
        color: $bgColor
</style>
