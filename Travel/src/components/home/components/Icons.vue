<template>
<!-- 最外层div包裹 -->
<div class="icons">
    <swiper :options="swiperOption">
        <!--这里不需要循环变更所以key值可以为index  -->
        <swiper-slide v-for='(page,index) of pages' :key='index'>
            <!-- <div class="icon">
                <div class="icon-img">
                    <img class="img-one" src="http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png"/>
                </div>
                <p class="icon-desc">热门景点</p>
            </div> -->
            <div class="icon" 
                 v-for='item of page'
                 :key='item.id'>
                <div class="icon-img">
                    <img class="img-one" :src="item.imgUrl"/>
                </div>
                <p class="icon-desc">{{item.desc}}</p>
            </div>
        </swiper-slide>
    </swiper>
</div>
</template>
<script>
export default {
    name:'HomeIcons',
    props:{
        list:Array
    },
    data(){
        return{
            swiperOption:{
                autoplay:false
            }
            // iconList:[{
            //     id:'0001',
            //     imgUrl:"http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png",
            //     desc:"景点门票111111111111111"
            // },
            // {   id:'0002',
            //     imgUrl:"http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png",
            //     desc:"滑雪季"},
            // {
            //     id:'0003',
            //     imgUrl:"http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png",
            //     desc:"泡温泉"
            // },
            // {
            //     id:'0004',
            //     imgUrl:"http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png",
            //     desc:"动植物园"
            // },
            // {
            //     id:'0005',
            //     imgUrl:"http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png",
            //     desc:"景点门票"
            // },
            // {   id:'0006',
            //     imgUrl:"http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png",
            //     desc:"滑雪季"},
            // {
            //     id:'0007',
            //     imgUrl:"http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png",
            //     desc:"泡温泉"
            // },
            // {
            //     id:'0008',
            //     imgUrl:"http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png",
            //     desc:"动植物园"
            // },
            // {
            //     id:'0009',
            //     imgUrl:"http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png",
            //     desc:"一日游"
            // }]
        }
    },
    // 计算属性带缓存 把0条数据的数组拆分成二维数组
    computed:{
        // pages后面带一个空格
        pages () {
            const pages=[];//二维数组
            this.list.forEach((item,index) => {
                // 页码 向下取整
                const page=Math.floor(index/8);// page本质是0.1.2.3分别表示第1,2,3,4页
                if(!pages[page]){
                    pages[page]=[];
                }
                pages[page].push(item);
            })
            return pages;
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
    @import '~styles/mixins.styl'
    .icons >>> .swiper-container
    //自带overflow hidden、width 100%
    // 在上行和下行都可以左右滑
       height 0
       padding-bottom 50%
    .icons
        margin-top .1rem
        .icon
        // 宽高一样width  padding-bottom设置一样
            float left
            width 25%
            padding-bottom 25%
            overflow hidden
            position relative
            height 0
            .icon-img
                position absolute
                top 0
                left 0
                bottom .44rem
                right 0
                box-sizing border-box
                padding .1rem
                .img-one
                // 居中
                    height 100%
                    display block
                    margin 0 auto
            .icon-desc
                position absolute
                left 0
                bottom 0
                right 0
                height .44rem
                line-height .44rem
                text-align center
                color $dark
                ellipsis()
</style>
