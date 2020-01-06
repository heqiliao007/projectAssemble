<template>
    <div>
        <div 
            class="item"
            v-for="(item,index) of list"
            :key="index"
            >
            <!-- 递归组件 -->
            <!-- name的作用：1.递归组件 2.对某个页面取消缓存 3.开发调试工具 -->
            <div class="item-title border-bottom">
                <span class="item-title-icon"></span>
                {{item.title}}
            </div>
            <div v-if="item.children">
                <!-- 递归组件 -->
                <detail-list :list='item.children' class="item-children"></detail-list>
            </div>
        </div>
    </div>
</template>
<script>
import CommonGallery from 'common/gallery/Gallery'
export default {
    // 一般用递归组件就是用名字判断
    name:'DetailList',
    props:{
        list:Array
    }
}
</script>
<style lang="stylus" scoped>
    .item-title-icon
        position relative
        left .06rem
        bottom -.06rem
        display: inline-block;
        width: .36rem;
        height: .36rem;
        background: url(//s.qunarzz.com/piao/image/touch/sight/detail.png) 0 -.45rem no-repeat;
        margin-right: .1rem;
        background-size: .4rem 3rem;
    .item-title
        line-height .8rem
        font-size .32rem
        padding 0 .2rem
    .item-children
        padding 0 .2rem
    
</style>