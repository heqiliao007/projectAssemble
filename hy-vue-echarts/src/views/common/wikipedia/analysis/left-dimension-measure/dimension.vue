<template>
    <div class="left-d-m">
        <h6> 数据</h6>

        <div class="left-d-m-2">
            <div class="left-d-m-2-div">
                <h5 class="left-d-m-2-div-title">
                    <i class="el-icon-MovieDataBase"></i>
                    <span>电影智库</span>
                    <i class="el-icon-caret-bottom"></i>
                </h5>


                <div class="left-d-m-2-div-search">
                    <p v-if="showSearch" class="left-d-m-2-div-search_p1">
                        <input type="text" placeholder="搜索"/>
                        <i class="el-icon-search"></i>
                    </p>
                    <p class="left-d-m-2-div-search_p2">
                        <span>维度</span>
                        <i class="el-icon-lookdata"></i>
                        <i class="el-icon-search" v-bind:class="{clickChangeColor:showSearch}"
                           @click.prevent="clickSearch"></i>
                    </p>

                    <div class="left-d-m-2-div-list" v-on:drop="global.drop_dimension($event)">
                        <ul>
                            <li class="" v-for="(item,key) in  dimension" :key="key">
                                <i :class="item.icon"></i>
                                <p draggable="true" :id="key"  v-bind:class="{showClickSelect:item.showAlert}" >{{item.name}}
                                    <component :is="item.showScreenComponent" :setStyle="setStyle(key)" ></component>
                                </p>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>


        <div class="left-d-m-3">
            <h6>度量</h6>

            <div v-on:drop="global.drop_measure($event)">
                <ul>
                    <li class="" v-for="(item,key) in  measure" :key="key">
                        <i :class="item.icon"></i>
                        <p draggable="true" :id="key" v-bind:class="{showClickSelect:item.showAlert}">{{item.name}}
                            <component :is="item.showScreenComponent" :setStyle="setStyle(key)"></component>
                        </p>
                    </li>
                </ul>
            </div>
        </div>

    </div>


</template>

<script>
    import {mapState,mapActions,mapMutations} from "vuex";
    import showScreen from "../component/alertScreenComponent";

    export default {
        name: "dimensionMeasure",
        data() {
            return {
                showSearch: false,
                showClickSelect:false,

            }
        },
        components:{
            showScreen
        },
        methods: {
            clickSearch() {
                this.showSearch = !this.showSearch;
            },
            setStyle(key){
                return function(b){
                    this.$store.commit('tableChart/setStyle',{key,b})
                }
            }
        },
        computed:{
            ...mapState('tableChart',['dimension','measure'])
        }
    }
</script>

<style lang="scss" scoped>
    .ondrop {
        height: 100px;
        background-color: darkolivegreen;
    }
</style>
