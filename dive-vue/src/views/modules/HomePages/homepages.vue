<template>
    <div class="box" style="overflow:hidden;height:100%;">
        <!-- <div class="bg">
            <div class="bgImg"></div>
        </div> -->
        <div class="conter">
            <!-- 顶部 -->
            <div class="top">
                <img src="../../../assets/img/ESSD.png" alt="" class="ic">
                <div class="right">
                    <div class="div1"><img :src="this.circleUrl" alt class="el-icon-arrow-down portrait"></div>
                    <div class="div2">
                        <el-dropdown trigger="click">
                        <span class="el-dropdown-link sp">
                            郑浩<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <div class="test">
        <!-- 标题 -->
        <p class="title">安全潜水专家系统</p>
        <p class="e-title">Expert System for Safe Oiving</p>
        <!-- 选项 -->
        <div class="options-box">
            <!-- 第一排 -->
            <div class="one" @click="$router.push('plan')">
                <img src="../../../assets/img/icon/首页/默认显示状态/计划制定.png" alt="">
                <span>计划制定</span>
            </div>
            <div class="one" @click="$router.push('risk_management')">
                <img src="../../../assets/img/icon/首页/默认显示状态/风险控制.png" alt="">
                <span>风险控制</span>
            </div>
            <div class="one">
                <img src="../../../assets/img/icon/首页/默认显示状态/作业规范.png" alt="">
                <span>作业规范</span>
            </div>
            <div class="one">
                <img src="../../../assets/img/icon/首页/默认显示状态/潜水日志.png" alt="">
                <span>潜水日志</span>
            </div>
            <div class="one">
                <img src="../../../assets/img/icon/首页/默认显示状态/事故处置.png" alt="">
                <span>事故处置</span>
            </div>
        </div>
        <!-- 第二排 -->
        <div class="options-box_two">
            <div class="one" @click="go_personnel">
                <img src="../../../assets/img/icon/首页/默认显示状态/人员管理.png" alt="">
                <span>人员管理</span>
            </div>
            <div class="one" @click="$router.push('equipment')">
                <img src="../../../assets/img/icon/首页/默认显示状态/潜水装备.png" alt="">
                <span>潜水装备</span>
            </div>
            <div class="one" @click="$router.push('accident')">
                <img src="../../../assets/img/icon/首页/默认显示状态/事故汇报.png" alt="">
                <span>事故汇报</span>
            </div>
            <div class="one">
                <img src="../../../assets/img/icon/首页/默认显示状态/相关信息.png" alt="">
                <span>相关信息</span>
            </div>
        </div>
        </div>
    </div>
</div>
</template>

<script>
import {getwidth} from '@/utils/zoom.js'
export default {
  name: 'homepage',
  data () {
    return {
      screenWidth: document.body.clientHeight,
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      sizeList: ['large', 'medium', 'small']
    }
  },
  mounted: function () {
    this._getWidth()
  },
  methods: {
    go_personnel () {
      this.$router.push('personnel')
    },
    _getWidth () {
      console.log(this.screenWidth)
      getwidth(this.screenWidth)
    }
  }
}
</script>

<style lang="scss" scoped>
    // .bg{
    //     height: 100%;
    //     width: 100%;
    //     position: fixed;
    //     top: 0;
    //     left: 0;
    //     .bgImg{
    //         background-image:url('../../../assets/img/background.png');
    //         min-height:100%;
    //         width:100%;
    //         // overflow: hidden;
    //         background-size:100% 100%;
    //     }  
    // } 
    .conter {
        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
        background-image:url('../../../assets/img/background.png');
        height:100%;
        width:100%;
        // overflow: hidden;
        background-size:100% 100%;
        // 头部
        .top {
            width:100%;
            height: 90px;
            display: flex;
            justify-content: space-between;
            .ic {
                margin-top: 36px;
                margin-left: 57px;
                width: 75px;
                height: 50px;
            }
            .right {
                margin-top: 40px;
                margin-right: 56px;
                .portrait {
                    width: 26px;
                    border-radius: 10px;
                }
                .sp {
                    margin-left: 8px;
                    font-family:PingFang-SC-Medium;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                }
                .div1 {
                    display: inline;
                }
                .div2 {
                    display: inline;
                    float: right;
                    margin-top: 5px;
                }
            }
        }
        // 标题
        .title{
            width:480px;
            height:64px;
            font-size:60px;
            font-family:SourceHanSansCN-Bold;
            font-weight:bold;
            color:rgba(255,255,255,1);
            margin: 0 auto;
            margin-top: 37px;
        }
        .e-title {
            width:365px;
            height:31px;
            font-size:25px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
            margin: 0 auto;
            margin-top: 35px;
        }

        // 选项
        .options-box {
            margin: 90px auto;
            display: flex;
            flex-wrap: wrap;
            width: 755px;
            justify-content: space-around;
        }
        .options-box_two {
            margin: -35px auto;
            display: flex;
            flex-wrap: wrap;
            width: 636px;
            justify-content: space-around;
        }
        
        .one {
            display: flex;
            flex-wrap: wrap;
            width: 115px;
            height: 120px;
            text-align: center;
        }
        .one img{
            width: 30px;
            height: 33px;
            margin: 23px auto;
            text-align: center;
        }
        .one span{
            width:145px;
            height:40px;
            margin: 0 auto;
            text-align: center;
            font-size:21px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(223,240,255,1);
        }
        .el-dropdown-menu{
            top: 47px!important;
            left: 846px!important;
        }
    }
    
</style>
