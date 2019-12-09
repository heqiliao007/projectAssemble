<template>
    <div class="add_pressure">
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
            
        <!-- 底部 -->
        <el-row class="bottom" style="margin-top:200px;">
            <el-col :span="7">需气总量
                <el-input
                value="0"
                v-model="airBottle"
                clearable>
                </el-input>瓶
            </el-col>
            <el-col :span="7">
                <el-input
                value="0"
                v-model="airCubic"
                clearable>
                </el-input>M³
            </el-col>
            <el-col :span="4">
                <el-button type="primary" style="font-size:16px;" @click="addPre()">最终递交</el-button>
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
  name: 'AddPressure',
  data () {
    return {
      tabPosition: 'left',
      length: '',
      diameter: '',
      capacityAir: '',
      volume: '',
      oxygenatePre: '',
      reservePre: '',
      airBottle: '',
      airCubic: ''
    }
  },
  methods: {
    addPre () {
      console.log('submit reducePre!')
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/index.scss';
    .add_pressure{
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