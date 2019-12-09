<template>
    <div class="left-screen">
        <div class="left-screen-screen" v-on:drop="global.drop_left_screen($event)">
            <h6>筛选器</h6>
            <div >
<!--                <p>度量字段</p>-->
<!--                <p>度量字段</p>-->
<!--                <p>度量字段</p>-->
            </div>
        </div>

        <div class="left-screen-tag">
            <div>
                <h6>标记</h6>

                <div class="left-screen-tag-select-chart">
                    <select>
                        <option>
                            条形图
                        </option>
                    </select>
                </div>

                <div class="left-screen-tag-color-size">
                    <div>
                        <p>
                            <i class="el-icon-colorIcon"></i>
                        </p>
                        <p>颜色</p>
                    </div>
                    <div>
                        <p>
                            <i class="el-icon-sizeIcon"></i>
                        </p>
                        <p>大小</p>
                    </div>
                </div>


            </div>
            <div class="left-screen-tag-list" v-on:drop="global.drop_left_screen_tag($event)">
                <ul >
<!--                    <li>-->
<!--                        <i class="el-icon-menu"></i>-->
<!--                        <p>-->
<!--                            度量字段-->
<!--                            <i class="el-icon-caret-bottom"></i>-->
<!--                        </p>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <i class="el-icon-menu" ></i>-->
<!--                        <p>-->
<!--                            维度字段-->
<!--                            <i class="el-icon-caret-bottom" ></i>-->
<!--                        </p>-->
<!--                    </li>-->
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "left-screen",
        data() {
            return {
                tt: '2222'
            }
        },
        methods: {
            ondrag_start(e) {
                ondragstart(e, 'start')
            },
            // drop(e){
            //     this.$root.drop(e)
            // }
        },
        created() {
        }
    }
</script>

<style lang="scss" scoped>

    .ondrop {

        height: 100px;
        background-color: darkolivegreen;
    }
</style>
