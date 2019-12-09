<template>
    <div class="footListBar">
        <ul>
            <li>数据源</li>
            <li contenteditable="true" v-for="(tab,index) in selectTables"
                :key="index"
                @click.prevent="setSelectIndex(index)"
                :class="{tableClick:selectIndex === index}"
            >
                {{tab}}
            </li>

            <li @click.stop.prevent="addSelectTables"><i class="el-icon-addTable"></i></li>
        </ul>
    </div>
</template>

<script>

    import {mapState, mapMutations} from "vuex"
    export default {
        name: "floor",
        data: function () {
            return {
            }
        },
        computed: {
            ...mapState('tableChart', ['selectIndex', 'selectTables'])
        },
        methods: {
            ...mapMutations('tableChart', ['addSelectTables','setSelectIndex'])
        },
        created() {
        }
    }
</script>

<style lang="scss" scoped>

    .tableClick{
        font-weight: bolder;
    }
</style>
