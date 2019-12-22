<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" :data="recommends" ref="scroll">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <!-- <slide>
                  <div>这里div的部分会被放进slot里面</div>
                </slide> -->
          <slider>
            <div v-for="item in recommends" :key="item.id">
                <a :href="item.linkUrl">
                  <!-- 新版needsclick加不加无所谓 -->
                  <img class="needsclick" :src="item.picUrl" @load="loadImage"/>
                </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <!-- <li v-for="(item,index) in discList" :key="index" class="item"> -->
            <li class="item">
              <div class="icon">
                <!-- <img v-lazy="item.imgurl" width="60" height="60"/> -->
                <img src="http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1481770.jpeg" width="60" height="60"/>
              </div>
              <div class="text">
                <!-- <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p> -->
                <h2 class="name">敢死队敢死队</h2>
                <p class="desc">红色噶尔爱她敢死队敢死队敢死队敢死队</p>
              </div>
            </li>
            <li class="item">
              <div class="icon">
                <img src="http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1481770.jpeg" width="60" height="60"/>
              </div>
              <div class="text">
                <h2 class="name">敢死队敢死队</h2>
                <p class="desc">红色噶尔爱她敢死队敢死队敢死队敢死队</p>
              </div>
            </li>
            <li class="item">
              <div class="icon">
                <img src="http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1481770.jpeg" width="60" height="60"/>
              </div>
              <div class="text">
                <h2 class="name">敢死队敢死队</h2>
                <p class="desc">红色噶尔爱她敢死队敢死队敢死队敢死队</p>
              </div>
            </li>
            <li class="item">
              <div class="icon">
                <img src="http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1481770.jpeg" width="60" height="60"/>
              </div>
              <div class="text">
                <h2 class="name">敢死队敢死队</h2>
                <p class="desc">红色噶尔爱她敢死队敢死队敢死队敢死队</p>
              </div>
            </li>
            <li class="item">
              <div class="icon">
                <img src="http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1481770.jpeg" width="60" height="60"/>
              </div>
              <div class="text">
                <h2 class="name">敢死队敢死队</h2>
                <p class="desc">红色噶尔爱她敢死队敢死队敢死队敢死队</p>
              </div>
            </li>
            <li class="item">
              <div class="icon">
                <img src="http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1481770.jpeg" width="60" height="60"/>
              </div>
              <div class="text">
                <h2 class="name">敢死队敢死队</h2>
                <p class="desc">红色噶尔爱她敢死队敢死队敢死队敢死队</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!recommends.length">
        <Loading></Loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import {getRecommend, getDistList} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
  name: 'Recommend',
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  created() {
    setTimeout(() => {
      this._getRecommend()
    }, 2000)
    // this._getRecommend()
    setTimeout(() => {
      this._getDistList()
    }, 1000)
    // this._getDistList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        console.log(res.data.slider)
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      }).catch(err => {
        console.log(err) // 这里catch到错误timeout
      })
    },
    _getDistList() {
      getDistList().then((res) => {
        console.log(res)
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      }).catch(err => {
        console.log(err) // 这里catch到错误timeout
      })
    },
    loadImage() {
      // this指向的是vue对象，data里的属性是响应式的，this.checkloaded相当于给vue对象添加了非响应的属性
      // 设标志确保逻辑执行一次
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          // 垂直居中
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            // 水平居中
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>