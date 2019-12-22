<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <!-- 在外部引用slide时，slider包裹的DOM会被插入进这个slot插槽部分 -->
      <slot>
      </slot>
    </div>
    <div class="dots">
        <span class="dot" v-for="(item,index) in dots" :key="index" :class="{active:currentPageIndex === index}">{{item}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {addClass} from 'common/js/dom'
import BScroll from 'better-scroll'

export default {
  name: 'slider',
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  // slider这个组件抽离出来做成木偶组件，并不直接进行数据之间的交互，
  // 所以我们需要先在props中定义可以在外部控制的属性（loop 是否循环播放,autoPlay自动播放,interval 自动轮播间隔）
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    showDot: {
      type: Boolean,
      default: true
    },
    click: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 0.3
    },
    speed: {
      type: Number,
      default: 400
    }
  },
  mounted() {
    // 1、在mounted的计算属性中进行初始化
    setTimeout(() => {
      // 一开始不传参数是undefined
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
      // 保证DOM被渲染，做了20ms的延时(*为何值为20? *因为浏览器刷新时间一般为17ms一次)
    }, 20)
    // 窗口监听事件
    window.addEventListener('resize', () => {
      // 指初始化better-scroll的this.slider
      if (!this.slider) {
        return
      }
      // 宽度重新计算
      this._setSliderWidth(true)
      // 让slider重新起算
      this.slider.refresh()
    })
  },
  methods: {
    // 2、在methods中进行私有函数的定义，自定义的函数方法都是在该计算属性中进行的
    _setSliderWidth(isResize) {
      // 获取整个列表有多少个元素
      this.children = this.$refs.sliderGroup.children
      // 总的宽度
      let width = 0
      // slider 父元素的宽度 =  实际宽度clientWidth = width+左右padding
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        // 获取每个子元素
        let child = this.children[i]
        // 添加名为slider-item的类名
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      // 如果轮播，左右会各增加一个，所以要加上两张图片的宽度
      if (this.loop && !isResize) {
        // ！undefined == true
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    // 初始化slide
    _initSlider() {
      // 初始化BScroll在mounted里渲染
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true, // 横向滚动
        scrollY: false, // 不允许纵向滚动
        momentum: false, // 是否开启动量动画，关闭可以提升效率
        // 配置:在better-scroll版本0.1.15以前可用以下参数进行slide配置（注释），但1.0.0版本以上需按照未注释的方法使用（最新）
        // snap: true,
        // snapLoop: this.loop,
        // snapThreshold: 0.3,
        // snapSpeed: 400
        snap: {
          loop: this.loop,
          threshold: this.threshold,
          speed: this.speed
        },
        // 与fastClick冲突 低版本注释点
        click: this.click
      })
      //  给slider绑定事件
      this.slider.on('scrollEnd', () => {
        // pageX 和 pageY 表示横轴方向和纵轴方向的页面数。  轮播到下一张，获取当前的index
        let pageIndex = this.slider.getCurrentPage().pageX
        // 旧版本设置方式
        // 因为设置自动播放之后，会自动在左右两侧copy两个子元素，所以在设置索引时应减一
        // if (this.loop) {
        //   pageIndex -= 1
        // }
        this.currentPageIndex = pageIndex

        if (this.autoPlay) {
          // setTimeout只执行一次 清除后不会在出现第二张图片就无法循环播放的情况
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _initDots() {
      this.dots = new Array(this.children.length)
      // console.log(this.dots)
    },
    _play() {
      // 旧版本需要计算增加的两张图片带来的影响
      // let pageIndex = this.currentPageIndex + 1
      // if (this.loop) {
      //   pageIndex += 1
      // }

      this.timer = setTimeout(() => {
        // 400与snap里的speed保持一致 pageIndex横向轮播 0代表y方向 旧版
        // this.slider.goToPage(pageIndex, 0, 400)
        // 新版 不然不会自动循环
        this.slider.next()
        // props里控制轮播的间隔interval
      }, this.interval)
    }
  },
  // activated() {
  //   if (this.autoPlay) {
  //     this._play()
  //   }
  // },
  // deactivated() {
  //   clearTimeout(this.timer)
  // },
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>