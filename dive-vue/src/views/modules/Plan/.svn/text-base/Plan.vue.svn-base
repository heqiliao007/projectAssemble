<template>
<div>
  <common-header :headChange="headChange"></common-header>
  <div class="box">
    <!-- <div class="personnel"> -->
      <el-row class="plan">
        <el-col :span="4">
          <common-plan-sidebar :curIndex='curIndex'></common-plan-sidebar>
        </el-col>
        <el-col :span="20">
          <div class="grid-content">
            <el-row type="flex" align="bottom">
              <!-- style="min-height:900px; -->
              <el-col :span="24">
                <div class="kuang">
                  <!-- 内容框 -->
                  <el-row>
                    <el-col :span="20" :offset="3">
                      <div class="announcement">
                        <el-row>
                            <el-col :span="18" :offset="3"><div class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{text}}</div></el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                  <!-- 选择框 -->
                  <el-row style="padding-bottom:67px;">
                    <el-col :span="18" :offset="3">
                      <div class="choose">
                        <div class="one" @click="$router.push({ path: 'mission_profile' })" title="制定新计划">
                          <div class="ll"></div>
                          <span>创建</span>
                        </div>
                        <div class="one" @click="$router.push({ path: 'search', query: { type: '1' }})" title="查阅或参照模板或先前计划">
                            <div class="xz"></div>
                          <span>调用</span>
                        </div>
                        <div class="one" @click="$router.push({ path: 'search', query: { type: '2' }})" title="修订当前计划">
                            <div class="sc"></div>
                          <span>编辑</span>
                        </div>
                        <div class="one">
                            <div class="dr"></div>
                          <span>导入/导出</span>
                        </div>
                        <div class="one">
                            <div class="dc"></div>
                          <span>打印</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import commonHeader from '@/views/common/base/Header'
import CommonPlanSidebar from '@/views/common/base/Plan_sidebar'
import headerIcon from '@/assets/img/icon/header/plan.png'

export default {
  name: 'personnel',
  components: {
    commonHeader,
    CommonPlanSidebar
  },
  data () {
    return {
      text: '潜水员是一类作业于特殊环境、使用特殊装备、掌握特殊技能的特种技术人员，对其规范管理是保证潜水作业安全实施的基础。本系统收集和管理潜水员的全部职业信息，便于各级机关科学管理。',
      headChange: {
        title: '潜水作业计划制定系统',
        headIcon: headerIcon
      },
      curIndex: -1
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/index.scss';

  .plan{
    display: flex;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    background: #eeeeee;
  }
  .color{
    height:20px;
    background:rgba(77,77,77,1);
  }
  .grid-content {
    margin:28px 20px 0 25px;
    background-color: $color-bg-white; 
  }
  .kuang {
    border-radius: 8px;
    margin-top: 60px;
  }
  .announcement {
    border-radius: 8px;
    border: 2px solid #91c6fc;
    background: #ffffff;
  }
  .choose {
    height: 100px;
    display: flex;
    justify-content: space-around;
    margin-top: 4%;
    margin-bottom: 4%;
  }
  .one {
    display: flex;
    flex-wrap: wrap;
    width: 115px;
    height: 100px;
    text-align: center;
    cursor: pointer;
  }
  .one img {
    width: 30px;
    height: 33px;
    margin: 18px auto;
    text-align: center;
  }
  .one span {
    width: 145px;
    height: 50px;
    margin: 0 auto;
    text-align: center;
    font-size: 15px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 55px;
    font-size: 24px
  }
  .one:hover .ll{
      background: url(../../../assets/img/识别危险首页/风险控制-首页/鼠标移入时/创建.png)no-repeat;
      background-size: cover;   
  }
  .ll {
      background: url(../../../assets/img/识别危险首页/风险控制-首页/默认状态/创建.png)no-repeat;
      background-size: cover;
      width: 69px;
      height: 74px;
      margin: 0 auto;
      margin-top: 20px;
  }
  .one:hover .xz{
      background: url(../../../assets/img/识别危险首页/风险控制-首页/鼠标移入时/调用.png)no-repeat;
      background-size: cover;   
  }
  .xz {
      background: url(../../../assets/img/识别危险首页/风险控制-首页/默认状态/调用.png)no-repeat;
      background-size: cover;
      width: 73px;
      height: 74px;
      margin: 0 auto;
      margin-top: 20px;
  }
  .one:hover .sc{
       background: url(../../../assets/img/识别危险首页/风险控制-首页/鼠标移入时/编辑.png)no-repeat;
      background-size: cover;   
  }
  .sc {
       background: url(../../../assets/img/识别危险首页/风险控制-首页/默认状态/编辑.png)no-repeat;
      background-size: cover;
      width: 73px;
      height: 74px;
      margin: 0 auto;
      margin-top: 20px;
  }
  .one:hover .dr{
       background: url(../../../assets/img/识别危险首页/风险控制-首页/鼠标移入时/导入导出.png)no-repeat;
      background-size: cover;   
  }
  .dr {
      background: url(../../../assets/img/识别危险首页/风险控制-首页/默认状态/导入导出.png)no-repeat;
      background-size: cover;
      width: 73px;
      height: 74px;
      margin: 0 auto;
      margin-top: 18px;
  }
  .one:hover .dc{
       background: url(../../../assets/img/识别危险首页/风险控制-首页/鼠标移入时/打印.png)no-repeat;
      background-size: cover;   
  }
  .dc {
       background: url(../../../assets/img/识别危险首页/风险控制-首页/默认状态/打印.png)no-repeat;
      background-size: cover;
      width: 73px;
      height: 74px;
      margin: 0 auto;
      margin-top: 20px;
  }

  .one:hover span{
      color: #1288FF;
  }
  .text {
      font-size:44px;
      font-family:STKaiti;
      font-weight:bold;
      color:rgba(64,64,64,1);
      line-height:70px;
      margin-top: 60px;
      margin-bottom: 30px;
  }
</style>
