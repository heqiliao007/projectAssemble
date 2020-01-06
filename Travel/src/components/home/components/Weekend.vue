<template>
    <div>
        <div class="title">周末去哪儿</div>
        <ul>
            <li class="item border-bottom" v-for='item of list' :key="item.id">
                <div class="item-imgwrapper">
                    <img class='item-img' :src="item.imgUrl"/>
                </div>
                <div class="item-info">
                    <p class="item-title">{{item.title}}</p>
                    <p class="item-desc">{{item.desc}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'HomeWeekend',
    props:{
        list:Array
    }
    // data(){
    //     return{
    //         recommendList:[{
    //             id:'0001',
    //             imgUrl:'http://img1.qunarzz.com/sight/source/1505/a2/78e4dbcfd45a6d.jpg_r_640x214_7a62b06a.jpg',
    //             title:'青城山',
    //             desc:'青城山下白素贞，洞中千年修此身'
    //         },
    //         {
    //             id:'0002',
    //             imgUrl:'http://img1.qunarzz.com/sight/source/1505/a2/78e4dbcfd45a6d.jpg_r_640x214_7a62b06a.jpg',
    //             title:'青城山',
    //             desc:'青城山下白素贞，洞中千年修此身'
    //         },
    //         {
    //             // 214/640=33.3%
    //             id:'0003',
    //             imgUrl:'http://img1.qunarzz.com/sight/source/1505/a2/78e4dbcfd45a6d.jpg_r_640x214_7a62b06a.jpg',
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
        // margin-top .2rem
        line-height .8rem
        background #eee
        text-indent .2rem
    .item
        margin-bottom  .1rem
        .item-imgwrapper
            overflow hidden
            height 0
            padding-bottom 37.05%
            .item-img
                width 100%
        .item-info
            padding .1rem
            .item-title
                line-height .54rem
                font-size .32rem
                ellipsis()
            .item-desc
                line-height .4rem
                color #ccc
                ellipsis()
</style>