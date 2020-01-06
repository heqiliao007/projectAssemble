<template>
    <div>
        <div class="title">热销推荐</div>
        <ul>
            <!-- 直接把li标签换成router-link 不会变色 -->
            <router-link 
                tag='li'
                class="item border-bottom" 
                v-for='item of list' 
                :key="item.id"
                :to="'/detail/'+item.id"
            >
                <div class="item-imgwrapper">
                    <img class='item-img' :src="item.imgUrl"/>
                </div>
                <div class="item-info">
                    <p class="item-title">{{item.title}}</p>
                    <p class="item-desc">{{item.desc}}</p>
                    <button class="item-button">查看详情</button>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
export default {
    name:'HomeRecommend',
    props:{
        list:Array
    },
    // data(){
    //     return{
    //         recommendList:[{
    //             id:'0001',
    //             imgUrl:'http://img1.qunarzz.com/sight/p0/1511/21/211a7e5de696c41390.water.jpg_200x200_3cc4e5bf.jpg',
    //             title:'青城山',
    //             desc:'青城山下白素贞，洞中千年修此身'
    //         },
    //         {
    //             id:'0002',
    //             imgUrl:'http://img1.qunarzz.com/sight/p0/1511/21/211a7e5de696c41390.water.jpg_200x200_3cc4e5bf.jpg',
    //             title:'青城山',
    //             desc:'青城山下白素贞，洞中千年修此身'
    //         },
    //         {
    //             id:'0003',
    //             imgUrl:'http://img1.qunarzz.com/sight/p0/1511/21/211a7e5de696c41390.water.jpg_200x200_3cc4e5bf.jpg',
    //             title:'青城山',
    //             desc:'青城山下白素贞，洞中千年修此身'
    //         }]
    //     }
    // }
}
</script>
<style lang="stylus" scoped>
    @import '~styles/mixins.styl'
    .title
        margin-top .2rem
        line-height .8rem
        background #eee
        text-indent .2rem
    .item
        display flex
        overflow hidden
        height 1.9rem
        .item-img
            width 1.7rem
            height 1.7rem
            padding .1rem
        .item-info
            // 让省略号显示
            min-width 0
            flex 1
            padding .1rem
            .item-title
                line-height .54rem
                font-size .32rem
                ellipsis()
            .item-desc
                line-height .4rem
                color #ccc
                ellipsis()
            .item-button
                line-height .44rem
                background #ff9300
                padding 0 .16rem
                border-radius .06rem
                margin-top .2rem
                color #fff
</style>
