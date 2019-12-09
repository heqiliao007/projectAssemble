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
                            <el-col :span="18" :offset="3">
                              <div class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{text}}</div>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                    </el-row>
                    <!-- 选择框 -->
                    <el-row>
                      <el-col :span="18" :offset="3">
                        <div class="choose">
                          <div class="one" @click="$router.push({ path: 'modify_personnel', query: { type: '1' }})">
                            <div class="ll"></div>
                            <span>查看/修改</span>
                          </div>
                          <div class="one" @click="$router.push({ name: 'personnel_details'})">
                            <div class="xz"></div>
                            <span>新增人员</span>
                          </div>
                          <div class="one">
                            <div class="sc" @click="$router.push({ path: 'modify_personnel', query: { type: '2' }})"></div>
                            <span>删除人员</span>
                          </div>
                          <div class="one">
                            <div class="dr"></div>
                            <span>导入信息</span>
                          </div>
                          <div class="one">
                            <div class="dc"></div>
                            <span>导出信息</span>
                          </div>
                          <div class="one" @click="$router.push({ name: 'personnel_statistics'})">
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
import headerIcon from '@/assets/img/icon/header/personal.png'

export default {
  name: 'personnel',
  components: {
    commonHeader
  },
  data () {
    return {
      text:
        '       潜水员是一类作业于特殊环境、使用特殊装备、掌握特殊技能的特种技术人员，对其规范管理是保证潜水作业安全实施的基础。本系统收集和管理潜水员的全部职业信息，便于各级机关科学管理。',
      headChange: {
        title: '潜水人员管理系统',
        headIcon: headerIcon
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.color {
  height: 20px;
  background: rgba(77, 77, 77, 1);
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
  font-size: 24px;
}
.one:hover .ll {
  background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-鼠标移入时/修改.png)
    no-repeat;
  background-size: cover;
}
.ll {
  background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-默认状态/修改.png)
    no-repeat;
  background-size: cover;
  width: 69px;
  height: 69px;
  margin: 0 auto;
  margin-top: 20px;
}
.one:hover .xz {
  background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-鼠标移入时/新增人员.png)
    no-repeat;
  background-size: cover;
}
.xz {
  background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-默认状态/新增人员.png)
    no-repeat;
  background-size: cover;
  width: 69px;
  height: 69px;
  margin: 0 auto;
  margin-top: 20px;
}
.one:hover .sc {
  background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-鼠标移入时/删除人员.png)
    no-repeat;
  background-size: cover;
}
.sc {
  background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-默认状态/删除人员.png)
    no-repeat;
  background-size: cover;
  width: 69px;
  height: 69px;
  margin: 0 auto;
  margin-top: 20px;
}
.one:hover .dr {
  background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-鼠标移入时/导入.png)
    no-repeat;
  background-size: cover;
}
.dr {
  background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-默认状态/导入.png)
    no-repeat;
  background-size: cover;
  width: 67px;
  height: 71px;
  margin: 0 auto;
  margin-top: 18px;
}
.one:hover .dc {
  background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-鼠标移入时/导出.png)
    no-repeat;
  background-size: cover;
}
.dc {
  background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-默认状态/导出.png)
    no-repeat;
  background-size: cover;
  width: 69px;
  height: 69px;
  margin: 0 auto;
  margin-top: 20px;
}
.one:hover .tj {
  background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-鼠标移入时/统计分析.png)
    no-repeat;
  background-size: cover;
}
.tj {
  background: url(../../../assets/img/icon/人员管理/主页/底部操作ICON-默认状态/统计分析.png)
    no-repeat;
  background-size: cover;
  width: 69px;
  height: 69px;
  margin: 0 auto;
  margin-top: 20px;
}

.one:hover span {
  color: #1288ff;
}
.text {
  font-size: 44px;
  font-family: STKaiti;
  font-weight: bold;
  color: rgba(64, 64, 64, 1);
  line-height: 70px;
  margin-top: 60px;
  margin-bottom: 30px;
}
</style>
