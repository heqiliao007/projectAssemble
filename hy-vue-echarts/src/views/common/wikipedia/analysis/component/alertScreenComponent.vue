<template>
    <label>
        <!--                                        <i class="el-icon-caret-bottom"></i>-->
        <el-popover class="clickAlertBottom "
                    placement="bottom"
                    width="4em"
                    trigger="click"
                    @show="setStyle(true)"
                    @hide="setStyle(false)"
        >
            <div>
                <span>ok 编辑筛选器</span>
                <br/>
                <span>ok 显示筛选器</span>
                <br/>
                <span>移除</span>
            </div>
            <el-button class="el-icon-caret-bottom" slot="reference"></el-button>
        </el-popover>
    </label>
</template>

<script>
    export default {
        name: "showScreenComponent",
        props:['setStyle'],
        methods:{
        },
        created() {
        }
    }
</script>

<style scoped>

</style>