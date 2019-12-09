<template>
    <div class="analysis" v-on:dragover="global.dragover($event)" v-on:dragstart="global.ondrag_start($event)">
        <div class="body-analysis">
            <div class="left-dimension-measure">
                <dimensionMeasure/>
            </div>


            <div
                    :names="index" v-for="(t,index) in selectTables"
                    :key="index"
            >
                <!--                <transition >-->
                <!--                bounceInDown  -->
                <div class="tabs-analysis animated  bounceInDown delay-0.5s" v-show="selectIndex === index">
                    <div class="leftScreen">
                        <screen></screen>
                    </div>

                    <div class="chart">
                        <div>
                            <toolbar></toolbar>
                        </div>
                        <div>
                            <charts :selectIndex=index></charts>
                        </div>
                    </div>

                </div>

                <!--                </transition>-->
            </div>

        </div>


        <div class="floor">
            <!--            //脚底列表-->
            <footList></footList>
        </div>


    </div>
</template>

<script>
    import global from "./global.js";
    import dimensionMeasure from "./left-dimension-measure/dimension.vue";
    import screen from "./left-screen/left-screen";
    import toolbar from "./top-toolbar/toolbar";
    import charts from "./charts/charts";
    import footList from "./foot/footListBar"


    import {mapState} from "vuex"

    setTimeout(() => {
        import ("./css/index.scss");
        setTimeout(() => {
            import ("animate.css");
        }, 1000)
    }, 200);


    export default {
        name: "index",
        components: {dimensionMeasure, screen, toolbar, charts, footList},
        data() {
            return {}
        },
        methods: {},
        created() {
            Object.getPrototypeOf(Object.getPrototypeOf(this)).global = global(this)
        },
        computed: {
            ...mapState('tableChart', ['selectIndex', 'selectTables'])
        },
        destroyed() {
            delete Object.getPrototypeOf(Object.getPrototypeOf(this)).global;
        }
    }
</script>

<style lang="scss">

</style>
<style scoped lang="scss">

    .analysis {

    }


</style>


