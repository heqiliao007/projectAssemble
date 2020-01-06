<template>
    <div class="container"  @click="handleGallery">
    	<div class="wrapper">
            <!-- 每一页 -->
            <swiper :options="swiperOption">
                <!-- slides 初次创建由完整数据创建v-if='list.length'-->
                <swiper-slide v-for="(item,index) in imgs" :key="index">
                    <img class="gallery-img" :src="item">
                </swiper-slide>
                <!--分页-->
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>
<script>
export default {
    name:'CommonGallary',
    props:{
        imgs:{
            type: Array,
            default(){
                // 一个数组
                // 'http://img1.qunarzz.com/sight/p0/1704/99/997679d9c0890ccca3.img.jpg_r_800x800_f884113f.jpg',
                // 'http://img1.qunarzz.com/sight/p0/1508/56/5615a2ac369e5244.img.jpg_r_800x800_b8dd0fa6.jpg'
                return []
            }
        }
    },
    data(){
        return{
            swiperOption: {
                pagination: '.swiper-pagination',
                paginationType: 'fraction',
                // 当Swiper的父元素变化时，Swiper自我刷新一次
                observer:true,
                observeParents:true
            }
        }
    },
    methods:{
        handleGallery(){
            this.$emit('close')
        }
    }
}
</script>
<style lang="stylus" scoped>
    .container >>> .swiper-container
        overflow inherit
    .container
        position:fixed
        z-index 99
        left 0
        right 0
        top 0
        bottom 0
        background #000
        display flex
        flex-direction column
        justify-content center
        // 里面的元素垂直居中
        .wrapper
            width 100%
            height 0
            padding-bottom 100%
            // overflow hidden
            .gallery-img
                width:100%
            .swiper-pagination
                color:#fff
                bottom:-1rem
</style>