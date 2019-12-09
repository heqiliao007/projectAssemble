<template>
    <div class="redece_pressure">
        <!-- 供氧通道 -->
        <el-row class="channel border_box">
            <div class="tietle_box"><span>供氧通道</span></div>
            <el-col :span="8">长度
                <el-input
                value="0"
                v-model="length"
                clearable>
                </el-input>
                L
            </el-col>
            <el-col :span="8">内径
                <el-input
                value="0"
                v-model="diameter"
                clearable>
                </el-input>L
            </el-col>
            <el-col :span="8">容气量
                <el-input
                value="0"
                v-model="capacityAir"
                clearable>
                </el-input>M³
            </el-col>
            </el-row>
            <!-- 氧气储气瓶 -->
            <el-row class="storage border_box">
            <div class="tietle_box"><span>氧气储气瓶</span></div>
            <el-col :span="8">容积
                <el-input
                value="0"
                v-model="volume"
                clearable>
                </el-input>M³
            </el-col>
            <el-col :span="8">充氧后压强
                <el-input
                value="0"
                v-model="oxygenatePre"
                clearable>
                </el-input>Mpa
            </el-col>
            <el-col :span="8">储备压
                <el-input
                value="0"
                v-model="reservePre"
                clearable>
                </el-input>Mpa
            </el-col>
        </el-row>
        <!-- 氧气储气瓶 -->
        <el-row class="storage border_box" style="padding:30px 0px 60px">
            <div class="tietle_box"><span>氧气储气瓶</span></div>                 
            <el-table
                border
                :data = "oxygenData"
                :cell-style="{fontSize:'18px',fontWeight:'normal'}"
                class="oxygen_table tables"
                :header-cell-class-name="rowClass"
                >
                <el-table-column prop="homework" label="作业" align="center"></el-table-column>
                <el-table-column prop="deep" label="吸氧深度（m）" align="center"></el-table-column>
                <el-table-column prop="deeper" label="该深度下的吸氧深度" align="center"></el-table-column>
                <el-table-column prop="totalNums" label="水面减压吸氧总人次" align="center"></el-table-column>
                <el-table-column prop="oxygenBottle" label="需要氧气量（瓶数）" align="center"></el-table-column>
                <el-table-column prop="oxygenCubic" label="需要氧气量（体积数）" align="center"></el-table-column>
            </el-table>
        </el-row>
        <el-row class="bottom">
            <el-col :span="7">需气总量
                <el-input
                value="0"
                v-model="airBottle"
                clearable>
                </el-input>瓶
            </el-col>
            <el-col :span="7">
                <el-input
                value="0.000"
                v-model="airCubic"
                clearable>
                </el-input>M³
            </el-col>
            <el-col :span="4">
                <el-button type="primary" style="font-size:16px;" @click="reducePre()">最终递交</el-button>
            </el-col>
            <el-col :span="6" class="icons">
                <span class="one_icon" title="保存">
                </span>
                <span class="two_icon" title="打印">
                </span>
                <span class="three_icon" title="疑难">
                </span>
                <span class="four_icon"  title="关闭">
                </span>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  name: 'RedecePressure',
  data () {
    return {
      length: '',
      diameter: '',
      capacityAir: '',
      volume: '',
      oxygenatePre: '',
      reservePre: '',
      airBottle: '',
      airCubic: '',
      oxygenData: [{
        homework: '作业一',
        deep: 0,
        deeper: 0,
        totalNums: 0,
        oxygenBottle: 0,
        oxygenCubic: 0
      },
      {
        homework: '作业二',
        deep: 0,
        deeper: 0,
        totalNums: 0,
        oxygenBottle: 0,
        oxygenCubic: 0
      }]
    }
  },
  methods: {
    reducePre () {
      console.log('submit reducePre!')
    },
    rowClass (row) {
      return 'rowClass'
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/index.scss';
    /deep/ .redece_pressure .rowClass{
        background-color: #F7FBFF;
        border-bottom: none;
        font-size: $text-size18;
        color: #666;
        font-weight: normal;
        border-left: 2px solid #AACEFE;
        &:first-of-type{
            border-left: 0;
        }
    }
    .redece_pressure{
        .tables{
            border: 1px solid #EBEBEB;
            margin-top:35px;
        }
        .border_box{
            border: 2px solid $color-border-blue;
            margin-top: 43px;
            border-radius: 5px;
            padding: 55px 0 55px 40px;
            color: $color-text-333;
            font-size: $text-size18;
            font-weight: bold;
            position: relative;
            .tietle_box{
                position: absolute;
                top: -12px;
                left: 40px;
                background: #fff;
                // width: 140px;
                padding: 0 25px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                &>span{
                    border-left: 6px solid $color-bg-blue;
                    padding-left: 7px;
                }
            }
            }
            .bottom{
                color: $color-text-333;
                font-size: $text-size18;
                font-weight:bold;
                margin-top: 24px;
            .icons{
                text-align: right;
                & span{
                    width: 36px;
                    height: 36px;
                    display: inline-block;
                    cursor: pointer;
                    margin-left: 4px;
                }
                .one_icon {
                    background: url(../img/baocun.png);
                    background-size:100% 100%;
                    
                }
                .one_icon:hover {
                    background: url(../img/baocun_select.png);
                    background-size:100% 100%;
                }
                .two_icon {
                    background: url(../img/dayin.png);
                    background-size:100% 100%;
                }
                .two_icon:hover {
                    background: url(../img/dayin_select.png);
                    background-size:100% 100%;
                }
                .three_icon {
                    background: url(../img/help_icon.png);
                    background-size:100% 100%;

                }
                .three_icon:hover {
                    background: url(../img/help_select.png);
                    background-size:100% 100%;
                }
                .four_icon {
                    background: url(../img/guanbi.png);
                    background-size:100% 100%;
                }
                .four_icon:hover {
                    background: url(../img/guanbi_select.png);
                    background-size:100% 100%;
                }
            } 
        }
    }
</style>