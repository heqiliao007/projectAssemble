<template>
    <div>
        <router-link 
            tag='div' 
            to='/' 
            class="header-abs"
            v-show="showAbs">
            <div class="iconfont header-abs-icon">&#xe624;</div>
        </router-link>
        <div 
            class="header-fixed"  
            v-show="!showAbs"
            :style="opacityStyle"
        >
            景点详情
            <router-link to='/'>
                <div class="iconfont header-fixed-back">&#xe624;</div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name:'DetailHeader',
    data () {
        return {
            showAbs: true,
            opacityStyle:{
                opacity:0
            }
        }
    },
    methods: {
        handleScroll(){
            // document.documentElement.scrollTop滚动条到顶部的垂直高度 (即网页被卷上去的高度)
            // 此属性可以获取或者设置对象的最顶部到对象在当前窗口显示的范围内的顶边的距离，
            // 也就是元素滚动条被向下拉动的距离
            const top = document.documentElement.scrollTop;
            console.log(top)
            if(top > 60){
                let opacity = top/140;
                // 让opacity最大值为1
                opacity=opacity>1?1:opacity;
                this.opacityStyle={
                    opacity
                }
                this.showAbs=false;
            }else{
                this.showAbs=true;
            }
        }
    },
    activated () {
        // 对全局事件的绑定需要解绑 不然在其他页面handleScroll依然进行
        window.addEventListener('scroll',this.handleScroll)
    },
    deactivated(){
        window.removeEventListenerr('scroll',this.handleScroll)
    },
    // 由于在 App.vue 中使用了 keep-alive exclude="Detail"，那么在 Detail 下的 Header.vue 中就不会执行 activated 钩子, 但是会执行 created 生命周期钩子。
    //此时会出现Detail 页 header 头部渐隐渐现的效果不显现了。所以将监听 scroll 的事件写入到 created 中。修复此 bug。
    created(){
        window.addEventListener('scroll',this.handleScroll)
    },
	beforeDestroy() {
		window.removeEventListenerr('scroll',this.handleScroll)
	}
}
</script>
<style lang="stylus" scoped>
    @import '~styles/varibles.styl';
    .header-abs
        position absolute
        left .2rem
        top .2rem
        width .8rem
        height .8rem
        border-radius .4rem
        background rgba(0,0,0,.8)
        text-align center
        line-height .8rem
       .header-abs-icon
            color #fff
            font-size .4rem
    .header-fixed
        position:fixed
        top 0rem
        left 0
        right 0
        // overflow hidden
        height $headerHeight
        line-height $headerHeight
        text-align center
        color #fff
        background-color $bgColor
        font-size .32rem
        z-index 2
        .header-fixed-back
            width .64rem
            text-align center 
            font-size .4rem
            position absolute
            top 0
            left 0
            color #fff
</style>