<template>
    <div class="charts">
        <div @click.prevent="show = !show">
            ok charts;
        </div>


        <transition  name="" leave-active-class="animated bounceOutLeft">
            <div  v-if="show" class="charts-analysis">
                <div>
                    <div>
                        <h6>电影</h6>
                        <i class="el-icon-menu"></i>
                        <i class="el-icon-search"></i>
                        <i class="el-icon-caret-bottom"></i>
                    </div>

                    <div>
                        <ul>
                            <li>
                                <input type="checkbox">
                                <span>电影-1</span>
                            </li>
                            <li>
                                <input type="checkbox">
                                <span>电影-1</span>
                            </li>
                            <li>
                                <input type="checkbox">
                                <span>电影-1</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition >

    </div>
</template>

<script>
    export default {
        name: "charts",
        props:['selectIndex'],
        data: () => {
            return {
                show:true
            }
        },
        methods: {},
        created() {
            this.$root.$emit('EventDispatcher',[this.selectIndex,(...arg)=>{
                //所有的代码从这里调用;
                console.log(...arg)
            }])
        }
    }
</script>

<style scoped lang="scss">

    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
</style>