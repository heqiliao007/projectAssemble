<template>
<div>
  <div class="box">
    <!-- <div class="personnel"> -->
      <el-row class="plan">
        <el-col :span="24">
          <div class="grid-content">
            <el-row type="flex" align="bottom">
              <!-- style="min-height:900px; -->
              <el-col :span="24">
                <div class="kuang">
                  <!-- 内容框 -->
                  <div class="title_one">识别危险</div>
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
                        <div class="one" @click="$router.push('environmental_factors')">
                          <div class="ll"></div>
                          <span>环境因素</span>
                        </div>
                        <div class="one" @click="$router.push('equipment_factors')">
                            <div class="xz"></div>
                          <span>装备因素</span>
                        </div>
                        <div class="one">
                            <div class="sc"></div>
                          <span>人员因素</span>
                        </div>
                        <div class="one">
                            <div class="dr"></div>
                          <span>操作因素</span>
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
  name: 'Hazard_identification',
  data () {
    return {
      text: '     从该次任务的实施环境、装备、人员和主要操作步骤着手，列出每一项可能影响实施和安全的危险因素，预测其发生的严重性及可能性。',
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
    color: rgba(51, 51, 51, 1);
    line-height: 55px;
    font-size: 25px
  }
    .one:hover .ll{
      background: url(../../../assets/img/识别危险首页/鼠标移入时/环境因素.png)no-repeat;
      background-size: cover;   
  }
  .ll {
      background: url(../../../assets/img/识别危险首页/默认显示时/环境因素.png)no-repeat;
      background-size: cover;
      width: 73px;
      height: 74px;
      margin: 0 auto;
      margin-top: 20px;
  }
  .one:hover .xz{
      background: url(../../../assets/img/识别危险首页/鼠标移入时/装备因素.png)no-repeat;
      background-size: cover;   
  }
  .xz {
      background: url(../../../assets/img/识别危险首页/默认显示时/装备因素.png)no-repeat;
      background-size: cover;
      width: 73px;
      height: 74px;
      margin: 0 auto;
      margin-top: 20px;
  }
  .one:hover .sc{
       background: url(../../../assets/img/识别危险首页/鼠标移入时/人员因素.png)no-repeat;
      background-size: cover;   
  }
  .sc {
       background: url(../../../assets/img/识别危险首页/默认显示时/人员因素.png)no-repeat;
      background-size: cover;
      width: 73px;
      height: 74px;
      margin: 0 auto;
      margin-top: 20px;
  }
  .one:hover .dr{
       background: url(../../../assets/img/识别危险首页/鼠标移入时/操作因素.png)no-repeat;
      background-size: cover;   
  }
  .dr {
      background: url(../../../assets/img/识别危险首页/默认显示时/操作因素.png)no-repeat;
      background-size: cover;
      width: 83px;
      height: 74px;
      margin: 0 auto;
      margin-top: 18px;
  }

  .one:hover span{
      color: #1288FF;
  }
  .text {
      font-size:38px;
      font-family:STKaiti;
      color:rgba(64,64,64,1);
      line-height:80px;
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
