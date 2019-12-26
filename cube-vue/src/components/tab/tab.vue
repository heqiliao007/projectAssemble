<template>
  <div class="tab">
    <!-- useTransitionm默认过渡动画
         showSlider是否开启下划线跟随效果
         useTransition关闭点击的过渡-->
    <cube-tab-bar
      :useTransition=false
      :showSlider=true
      v-model="selectedLabel"
      :data="tabs"
      ref="tabBar"
      class="border-bottom-1px"
    >
    </cube-tab-bar>
    <div class="slide-wrapper">
      <!-- initial-index初始化时展示的位置索引值 -->
      <cube-slide
        :loop=false
        :auto-play=false
        :show-dots=false
        :initial-index="index"
        ref="slide"
        :options="slideOptions"
        @scroll="onScroll"
        @change="onChange"
      >
        <cube-slide-item v-for="(tab,index) in tabs" :key="index">
          <component ref="component" :is="tab.component" :data="tab.data"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tab',
    props: {
      tabs: {
        type: Array,
        default () {
          return []
        }
      },
      // 初始化显示第几个
      initialIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        // index: 0
        /* tabs: [{label:xxx},{label:xxx}] */
        index: this.initialIndex,
        // 对象配置 用于监听onChange事件实时派发滚动的距离
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          // 当我们需要锁定只滚动一个方向的时候，当差值大于 directionLockThreshold 的时候来决定滚动锁定的方向
          // 设为0又可以横向又可以竖向
          directionLockThreshold: 0
        }
      }
    },
    computed: {
      selectedLabel: {
        get () {
          return this.tabs[this.index].label
        },
        set (newVal) {
          // 找到是哪一项 findIndex里value代表当前元素
          this.index = this.tabs.findIndex((value) => {
            return value.label === newVal
          })
        }
      }
    },
    mounted () {
      // 首次在还没有滑动的时候就去调用这个方法
      this.onChange(this.index)
    },
    methods: {
      // onScroll事件只有配置slideOptions才有对象参数
      onScroll (pos) {
        // console.log(pos)
        // 获取tabBar元素宽度
        const tabBarWidth = this.$refs.tabBar.$el.clientWidth
        // slide宽度 slide组件内部有slide对象
        const slideWidth = this.$refs.slide.slide.scrollerWidth
        // 下划线滚动的位置 pos.x为负值
        const transform = -pos.x / slideWidth * tabBarWidth
        // 改变 cube-tab-bar 组件的下划线的 transformX,用cube-ui的apisetSliderTransform
        this.$refs.tabBar.setSliderTransform(transform)
      },
      // tab切换的时候再去请求数据
      onChange (current) {
        // 修改index
        this.index = current
        // this.$refs.component是一个数组
        const instance = this.$refs.component[current]
        // 如果component定义了fetch方法，再去执行fetch钩子
        instance.fetch && instance.fetch()
        // if (instance && instance.fetch) {
        //   instance.fetch()
        // }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .tab
    display: flex
    flex-direction: column
    height: 100%
    >>> .cube-tab
      padding: 10px 0
    .slide-wrapper
      flex: 1
      overflow: hidden
</style>
