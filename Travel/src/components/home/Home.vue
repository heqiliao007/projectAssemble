<template>
  <div>
    <!--父向子组件传值  -->
    <!-- homeheader组件不再传递city -->
     <home-header></home-header>
     <home-swiper :list='swiperList'></home-swiper>
     <home-icons :list='iconList'></home-icons>
     <home-recommend :list='recommendList'></home-recommend>
     <home-weekend :list='weekendList'></home-weekend>
  </div>
</template>

<script>
import HomeHeader from "./components/Header"
import HomeSwiper from "./components/Swiper"
import HomeIcons from "./components/Icons";
import HomeRecommend from "./components/Recommend";
import HomeWeekend from "./components/Weekend";
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  // 注册组件到home
  components:{
    // 当app.js很大的时候异步加载组件可以这样写
    // HomeHeader :()=> ("./components/Header"),
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  data(){
    return{
      // city:'',
      //默认显示最后一张 初次创建是个空数组
      swiperList:[],
      iconList:[],
      recommendList:[],
      weekendList:[],
      lastCity:''
    }
  },
  computed: {
    // 把city缓存到mapstate里
      ...mapState(['city'])
  },
  methods:{
    getHomeInfo(){
      // 发ajax的时候把city放在请求的参数里 这样每一次城市的内容会随着改变
      axios.get('/api/index.json?city=' + this.city)
         .then(
           this.getHomeInfoSucc
         )
    },
    getHomeInfoSucc(res){
        console.log(res);
        res=res.data;
        console.log(res.data);
        if(res.ret && res.data){
          const data=res.data;
          // this.city=data.city;北京
          this.swiperList=data.swiperList;
          this.iconList=data.iconList;
          this.recommendList=data.recommendList;
          this.weekendList=data.weekendList;
        }
    }
  },
  mounted () {
    console.log('mounted');
    // 当页面被挂载后 对上一次的城市做一个保存 lastCity临时缓存变量
    this.lastCity=this.city;
    this.getHomeInfo()
  },
  // 当用keep-alive时，生命周期会多处一个函数activated
  // 页面初次加载时mounted和activated都会被执行 而当页面重新被显示的时候activated被执行
  // 使用keep-alive mounted只会执行一次
  activated () {
    console.log('activated');
    // 当页面上一次城市和这一次城市保存的不相等
    if (this.lastCity !== this.city) {
      this.lastCity=this.city;
      // 重新请求ajax
      this.getHomeInfo()
    }
  }
}
</script>

<style>

</style>