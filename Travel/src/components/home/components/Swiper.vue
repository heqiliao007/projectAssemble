<template>
  <div class="wrapper">
    <swiper :options="swiperOption" ref="mySwiper" v-if='showSwiper'>
        <!-- slides 初次创建由完整数据创建v-if='list.length'-->
        <swiper-slide v-for="item of list" :key='item.id'>
            <img class="swiper-img" :src="item.imgUrl">
        </swiper-slide>
        <!-- 页码 小点-->
        <div class="swiper-pagination"  slot="pagination"></div>
        <!-- 滚动条 -->
        <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  props:{
      list:Array
  },
//   es5写法data:function(){}
  data(){
      return{
          swiperOption:{
               pagination:'.swiper-pagination',
            //    支持循环播放（第一页向左拖的时候）
                loop: true
          },
        // 此时轮播的图片是固定的图片，做一下完善，
        // 使用v-for循环。注意：每个轮播图片id属性需要是字符串
        //   swiperList:[{
        //       id:'0001',
        //       imgUrl:"http://img1.qunarzz.com/piao/fusion/1806/8d/09723d20a9b88402.jpg_750x200_56b1edfa.jpg"
        //   },{
        //       id:'0002',
        //       imgUrl: "http://img1.qunarzz.com/piao/fusion/1807/c6/44fce1467be17702.jpg_750x200_406f5fc3.jpg"
        //   }]
      }
  },
  computed:{
      showSwiper(){
          return this.list.length;
      }
  }
}
</script>

<style lang='stylus' scoped>
// 图片高/宽=26.67% 图片自适应 图片会高度会根据高度自动展开26.67%
// .wrapper >>> .swiper-pagination-bullet-active实现样式的穿透即可，不受scoped的限制
.wrapper
    width:100%
    height:0
    overflow:hidden
    padding-bottom 32%
    background-color #eee
    .swiper-img
      width:100%
.wrapper >>> .swiper-pagination-bullet-active
    background #fff
</style>