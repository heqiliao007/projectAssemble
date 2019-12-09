<template>
<div>
  <common-header :headChange='headChange'></common-header>
  <div class="box">
    <div class="personnel">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-row type="flex" align="bottom">
              <el-col :span="24" style="min-height:900px;">
                <div class="kuang">
                  <!-- 内容框 -->
                  <el-row>
                    <el-col :span="18" :offset="3">
                      <div class="announcement">
                        <el-row>
                            <el-col :span="18" :offset="3"><div class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{text}}</div></el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                  <!-- 选择框 -->
                  <el-row>
                    <el-col :span="18" :offset="3">
                      <div class="choose">
                        <div class="one" @click="$router.push({name:'new_report'})">
                          <div class="ll"></div>
                          <span>新 建</span>
                        </div>
                        <div class="one" @click="$router.push({name:'modify_accident'})">
                            <div class="xz"></div>
                          <span>浏览/续填</span>
                        </div>
                        <div class="one" >
                            <div class="sc"></div>
                          <span>打 印</span>
                        </div>
                        <div class="one">
                            <div class="dr"></div>
                          <span>导入信息</span>
                        </div>
                        <div class="one">
                            <div class="dc"></div>
                          <span>导出信息</span>
                        </div>
                        <div class="one" @click="$router.push({name:'report_statistics'})">
                            <div class="tj"></div>
                          <span>统计分析</span>
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
    <div class="color"></div>
  </div>
  </div>
</template>

<script>
import commonHeader from '../../common/base/Header'
import headerIcon from '@/assets/img/icon/header/report.png'
export default {
  name: 'accident',
  components: {
    commonHeader
  },
  data () {
    return {
      text: '对潜水作业过程中的装备故障、意外事件和伤亡事故，应立即采集、分析有关信息，及时报告给指定的行政机关和技术部门。这有助于及时发现、跟踪和解决设备和操作中存在的故障或缺陷，分享经验和教训，避免事故再次发生。',
      headChange: {
        title: '潜水事故报告系统',
        headIcon: headerIcon
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.color{
  height:20px;
background:rgba(77,77,77,1);
}
.grid-content {
  min-height: 514px;
}
.bg-purple-dark {
  background: #eeeeee;
}
.kuang {
  border-radius: 8px;
  margin-top: 60px;
}
.announcement {
  border-radius: 8px;
  border: 1px solid #91c6fc;
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
  font-size: 25px;
}
.one:hover .ll{
    background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-鼠标移入时/修改.png)no-repeat;
    background-size: cover;   
}
.ll {
    background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-默认状态/修改.png)no-repeat;
    background-size: cover;
    width: 69px;
    height: 69px;
    margin: 0 auto;
    margin-top: 20px;
}
.one:hover .xz{
    background: url(../../../assets/img/icon/装备管理/主页/底部操作按钮-鼠标移入时/新增装具.png)no-repeat;
    background-size: cover;   
}
.xz {
    background: url(../../../assets/img/icon/装备管理/主页/底部操作按钮-默认状态时/新增装具.png)no-repeat;
    background-size: cover;
    width: 69px;
    height: 69px;
    margin: 0 auto;
    margin-top: 20px;
}
.one:hover .sc{
    background: url(../../../assets/img/icon/装备管理/主页/底部操作按钮-鼠标移入时/报废装具.png)no-repeat;
    background-size: cover;   
}
.sc {
    background: url(../../../assets/img/icon/装备管理/主页/底部操作按钮-默认状态时/报废装具.png)no-repeat;
    background-size: cover;
    width: 67px;
    height: 71px;
    margin: 0 auto;
    margin-top: 20px;
}
.one:hover .dr{
    background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-鼠标移入时/导入.png)no-repeat;
    background-size: cover;   
}
.dr {
    background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-默认状态/导入.png)no-repeat;
    background-size: cover;
    width: 69px;
    height: 72px;
    margin: 0 auto;
    margin-top: 18px;
}
.one:hover .dc{
    background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-鼠标移入时/导出.png)no-repeat;
    background-size: cover;   
}
.dc {
    background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-默认状态/导出.png)no-repeat;
    background-size: cover;
    width: 69px;
    height: 69px;
    margin: 0 auto;
    margin-top: 20px;
}
.one:hover .tj{
    background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-鼠标移入时/统计分析.png)no-repeat;
    background-size: cover;   
}
.tj {
    background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-默认状态/统计分析.png)no-repeat;
    background-size: cover;
    width: 69px;
    height: 69px;
    margin: 0 auto;
    margin-top: 20px;
}

.one:hover span{
    color: #1288FF;
}
.text {
    font-size:51px;
    font-family:STKaiti;
    font-weight:bold;
    color:rgba(64,64,64,1);
    line-height:80px;
    margin-top: 60px;
    }
</style>
