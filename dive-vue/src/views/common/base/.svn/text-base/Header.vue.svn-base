<template>
    <div>
      <el-row class="header-bar">
        <el-col :sm="9" :md="16" :xl="18" class="header-left">
          <!-- <el-col :sm="3" :md="2" :xl="1"><img src="./img/logo.png" style="width:20px;height:20px;"/></el-col>
          <el-col :sm="21" :md="22" :xl="23">安全潜水专家系统</el-col> -->
          <img src="./img/logo.png" style="width:20px;height:20px;margin-right:10px;"/>
          <span>安全潜水专家系统</span>
        </el-col>
        <el-col :sm="15" :md="8" :xl="6" class="header-right">
          <el-col :span="5">基础数据</el-col>
          <el-col :span="4">帮助</el-col>
          <el-col :span="8" class="back" @click.native="$router.back(-1)">返回上一级<img src="./img/back.png"/></el-col>
          <el-col :span="7">
            <el-dropdown trigger="click" style="bottom: 2px">
              <span class="el-dropdown-link" style="color:#fff;">
                <img src="./img/head.png" style="margin:0 5px 4px 0;"/>
                郑浩<i class="el-icon-caret-bottom" style="margin-left:5px;"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="headline">
        <img :src="headChange.headIcon" style="margin-right:10px;width:35px;height:41px;margin-top:-6px;"/>
        <span>{{headChange.title}}</span>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'CommonHeader',
  data () {
    return {
    }
  },
  props: {
    headChange: Object
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/index.scss';

    .header-bar{
      height: 44px;
      line-height: 44px;
      background: $color-text-black;
      padding: 0 60px 0 46px;
      box-sizing: border-box;
      color: $color-bg-white;
      display: flex;
      .header-left{
        font-size: $text-size18;
      }
      .header-right{
        &>div{
          text-align: center;
          height: 20px;
          border-left: 1px solid $color-bg-white;
          margin-top: 12px;
          line-height: 20px;
          cursor: pointer;
          &:first-child{
            border-left:none;
          }
        }
        .back{
          &>img{
            vertical-align: middle;
            margin-bottom: 5px;
            margin-left: 5px;
          }
        }
      }
    }
    .headline{
      height: 82px;
      line-height: 82px;
      background: $color-bg-blue;
      font-size: 44px;
      padding: 0px 60px 0px 46px;
      box-sizing: border-box;
      color: $color-bg-white;
      font-family: STKaiti;
    }
</style>