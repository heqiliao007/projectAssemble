<template>
    <div>
        <div class="banner" @click='handleBanner'>
            <img class="banner-img" :src="bannerImg"/>
            <div class="banner-info">
                <div class="banner-title">{{this.sightName}}</div>
                <div class="banner-number">
                    <span class="iconfont banner-icon">&#xe692;</span>
                    {{this.gallaryImgs.length}}
                </div>
            </div>
        </div>
        <!-- 对要动画的组件做一个包裹 -->
        <fade-animation>
            <!-- 用变量控制画廊组件是否隐藏 -->
            <common-gallery 
                :imgs='gallaryImgs' 
                v-show="showGallery"
                @close='handleGalleryClose'
            ></common-gallery>
        </fade-animation>
    </div>
</template>
<script>
import CommonGallery from 'common/gallery/Gallery'
import FadeAnimation from 'common/fade/Fade'
export default {
    name:'DetailBanner',
    props:{
        sightName: String,
        bannerImg: String,
        gallaryImgs: Array
    },
    data(){
        return{
            showGallery:false
            // imgs:['http://img1.qunarzz.com/sight/p0/1704/99/997679d9c0890ccca3.img.jpg_r_800x800_f884113f.jpg',
            //     'http://img1.qunarzz.com/sight/p0/1508/56/5615a2ac369e5244.img.jpg_r_800x800_b8dd0fa6.jpg']
        } 
    },
    methods:{
        handleBanner(){
            this.showGallery=true;
        },
        handleGalleryClose(){
            this.showGallery=false;
        }
    },
    components:{
        CommonGallery,
        FadeAnimation
    }
}
</script>
<style lang="stylus" scoped>
    .banner
    // 防止抖动
        overflow hidden 
        height 0
        padding-bottom 55%
        position relative
        .banner-img
            width 100%
        .banner-info
            display flex
            position absolute
            left 0
            right 0
            bottom  0
            line-height .6rem
            color #fff
            background-image linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,0.8))
            .banner-title
                flex 1
                font-size .32rem
                padding 0 .2rem
            .banner-number
                margin-top .14rem
                padding 0 .4rem
                // (.6-.32)/2
                line-height .32rem
                height .32rem
                border-radius .2rem
                background-color rgba(0,0,0,.8)
                font-size .24rem
                .banner-icon
                    font-size .24rem
</style>