<template>
<div>
  <div class="box">
    <!-- <div class="personnel"> -->
      <el-row class="risk">
        <el-col :span="24">
          <div class="grid-content">
            <el-row type="flex" align="bottom">
              <!-- style="min-height:900px; -->
              <el-col :span="24">
                <div class="kuang">
                  <!-- 内容框 -->
                  <div class="title_one">实施控制</div>
                  <el-row>
                    <el-col :span="20" :offset="2">
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
                        <div class="one" @click="$router.push('danger_term_inplement')">
                          <div class="ll"></div>
                          <span>逐项控制</span>
                        </div>
                        <div class="one" @click="$router.push('control_and_decision')">
                          <div class="cd"></div>
                          <span>查对落实</span>
                        </div>
                        <div class="one" @click="$router.push('secondary_measure')">
                            <div class="xz"></div>
                          <span>辅助措施</span>
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
export default {
  name: 'Implementation_control',
  data () {
    return {
      text: '                   通过管理控制（使用适当的警示标志、制定书面规范、训练人员、限制危险暴露）、工程控制（通过设计、材料选择或替换）、采用人员防护装备等方法落实各项控制措施。',
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
    width: 210px;
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
    width: 210px;
    height: 50px;
    margin: 0 auto;
    text-align: center;
    font-size: 15px;
    font-family: PingFang-SC-Bold;
    color: rgba(51, 51, 51, 1);
    line-height: 55px;
    font-size: 25px;
    letter-spacing:3px;  
  }
    .one:hover .ll{
      background: url(../../../../assets/img/识别危险首页/实施控制/鼠标移入时/逐项实施.png)no-repeat;
      background-size: cover;   
  }
  .ll {
      background: url(../../../../assets/img/识别危险首页/实施控制/默认显示时/逐项实施.png)no-repeat;
      background-size: cover;
      width: 65px;
      height: 74px;
      margin: 0 auto;
      margin-top: 20px;
  }
    .one:hover .cd{
      background: url(../../../../assets/img/识别危险首页/实施控制/鼠标移入时/查对落实.png)no-repeat;
      background-size: cover;   
  }
  .cd {
      background: url(../../../../assets/img/识别危险首页/实施控制/默认显示时/查对落实.png)no-repeat;
      background-size: cover;
      width: 75px;
      height: 74px;
      margin: 0 auto;
      margin-top: 20px;
  }
  .one:hover .xz{
      background: url(../../../../assets/img/识别危险首页/实施控制/鼠标移入时/辅助措施.png)no-repeat;
      background-size: cover;   
  }
  .xz {
      background: url(../../../../assets/img/识别危险首页/实施控制/默认显示时/辅助措施.png)no-repeat;
      background-size: cover;
      width: 74px;
      height: 74px;
      margin: 0 auto;
      margin-top: 20px;
  }

  .one:hover span{
      color: #1288FF;
  }
  .text {
      font-size:38px;
      font-family:STKaiti;
      color:rgba(64,64,64,1);
      line-height:70px;
      margin-top: 60px;
      margin-bottom: 30px;
  }
  .title_one {
        width: 310px;
        margin: 50px auto;
        height: 40px;
        font-size: 52px;
        letter-spacing:5px;  
        color:rgba(64, 64, 64, 1);
    }
    
</style>
