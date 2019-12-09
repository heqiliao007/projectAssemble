<template>
    <div class="an-toolbar">
        <div>
            <ul>
                <li>
                    <i :class="item.icon" v-for="(item ,key,index) in tools.toolbar" :key="index" v-if="index < 3"
                       @click.prevent.stop="setToolsBar({key})"></i>
                </li>
                <li>
                    <i :class="item.icon" v-for="(item ,key,index) in tools.toolbar" :key="index"
                       v-if="index >= 3 && index < 6" @click.prevent.stop="setToolsBar({key})"></i>
                </li>
                <li>
                    <i :class="item.icon" v-for="(item ,key,index) in tools.toolbar" :key="index"
                       v-if="index >=6  && index < 9" @click.prevent.stop="setToolsBar({key})"></i>
                </li>
                <li>
                    <select name="font" id="" v-for="(item,key,index) in tools.select"   :names="key" :key="key" @change.prevent="nativeSetToolsSelect($event,{key})">
                        <option v-bind:value="itemKey" v-for="(options,itemKey) in item.options" :key="itemKey">{{options.name}}</option>
                    </select>
                </li>
            </ul>

            <div>
                <div>
                    <h6>智能显示</h6>
                </div>
                <div>
                    <ul>
                        <li>
                            <div>1</div>
                        </li>
                        <li>
                            <div>2</div>
                        </li>
                        <li>
                            <div>3</div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <div>4</div>
                        </li>
                        <li>
                            <div>5</div>
                        </li>
                        <li>
                            <div>6</div>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>对于符号地图，尝试</li>
                        <li>1个地理</li>
                        <li>0个或多个</li>
                        <li>0个至2个</li>
                    </ul>
                </div>
            </div>
        </div>


        <div>
            <div v-on:drop="global.drop_toolbar_dimension($event)">
                <h6 class="el-icon-i_5002">
                    <span>维度</span>
                </h6>
                <ul>
                    <!--                        <li><p>维度字段</p></li>-->
                    <!--                        <li><p>维度字段</p></li>-->
                    <!--                        <li><p>维度字段</p></li>-->
                </ul>
            </div>
            <div v-on:drop="global.drop_toolbar_measure($event)">
                <h6 class="el-icon-i_5001">
                    <span>度量</span>
                </h6>
                <ul>
                    <!--                        <li><p>维度字段</p></li>-->
                    <!--                        <li><p>维度字段</p></li>-->
                    <!--                        <li><p>维度字段</p></li>-->
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from "vuex"

    export default {
        name: "toobar",
        computed: {
            ...mapState('tableChart', ['tools'])
        },
        methods: {
            nativeSetToolsSelect(event,tools){
                let index = event.target.value;
                this.setToolsSelect(Object.assign(tools,{index}));
            },
            ...mapMutations("tableChart", ['setToolsBar', 'setToolsSelect'])
        }
    }
</script>

<style scoped lang="scss">
</style>
