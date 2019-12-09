<template>
  <div class="diving">
    <!-- <common-header :headChange="headChange"></common-header>
    <div class="box">
      <el-row class="plan">
        <el-col :span="4">
          <common-plan-sidebar :curIndex="curIndex"></common-plan-sidebar>
        </el-col>
        <el-col :span="20"> -->
          <div style="background:#eeeeee; min-height:840px; overflow: hidden;">
            <div class="box_one">
              <div class="add" style="position: absolute; top: 33px;right: 32px;" v-if="judge">
                <span class="minus">
                  <i class="el-icon-minus" @click="reduceData"></i>
                  <i class="el-icon-plus" @click="addData"></i>
                </span>
              </div>
              <el-tabs
                v-model="activeName"
                @tab-click="handleClick"
                style="width: 95%;margin: 30px auto;"
              >
                <!-- 基本要素 -->
                <el-tab-pane label="基本要素" name="second">
                  <div class="border_one" style="border: 1px solid #AACEFE;">
                    <div class="top" style="min-height:640px;">
                      <el-table
                        :data="basicelementData"
                        :header-cell-class-name="handlemyclass"
                        :header-cell-style="headerstyle"
                        style="width: 100%;"
                        @row-click="chooseRow"
                        highlight-current-row
                      >
                        <el-table-column 
                        prop="date" 
                        label="作业" 
                        align="center" 
                        width="180">
                          <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.institution"/>
                          </template>
                        </el-table-column>
                        <el-table-column 
                        prop="date" 
                        label="潜水深度"
                        align="center" 
                        width="280">
                          <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.institution"/>
                          </template>
                        </el-table-column>
                        <el-table-column 
                        prop="date" 
                        label="计划潜水次数" 
                        align="center" 
                        width="280">
                          <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.institution"/>
                          </template>
                        </el-table-column>
                        <el-table-column 
                        prop="date" 
                        label="单次潜水最适时间极限（MIN）" 
                        align="center">
                          <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.institution"/>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div class="right" style="position: absolute;bottom: 40px;right: 20px;">
                        <div class="one_icon" title="保存"></div>
                        <div class="two_icon" title="打印"></div>
                        <div class="three_icon" title="疑难"></div>
                        <div class="four_icon" title="关闭"></div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="潜水方式" name="first">
                  <div class="top" style="min-height:640px;">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                      <el-row>
                        <el-col :span="24">
                          <el-form-item style="font-weight:500">
                            <div slot="label">供气方式：</div>
                            <el-select
                              v-model="form.region"
                              placeholder
                              size="mini"
                              style="width:40%"
                            >
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                            <el-select
                              v-model="form.region"
                              placeholder
                              size="mini"
                              style="width:40%"
                            >
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="24">
                          <div class="title_one">每次作业潜水人员安排</div>
                        </el-col>
                      </el-row>

                      <div class="one" style="margin-top:60px;">
                        <el-col :span="24" style="padding-left: 0;">
                          <div class="one_left">
                            <span>水下作业</span>
                          </div>
                        </el-col>
                      </div>

                      <el-row style="margin-left:14px;">
                        <el-col :span="8">
                          <el-form-item style="width:100%; margin-top:30px;">
                            <div slot="label" style="font-weight:500">潜水数量</div>
                            <el-input
                              v-model="formInline.user"
                              placeholder
                              size="mini"
                              style="width:77%;"
                            ></el-input>
                            <span style="font-size:18px;">&nbsp;名</span>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <div class="one" style="margin-top:13px;">
                        <el-col :span="10" style="padding-left: 0;">
                          <div class="one_left">
                            <span>水下资料</span>
                          </div>
                        </el-col>
                        <el-col :span="14">
                          <div class="one_right">
                            <span>水下备便</span>
                          </div>
                        </el-col>
                      </div>

                      <el-row>
                        <el-col :span="10">
                          <el-form-item label="水下照料" style="margin-left:14px; margin-top:15px;">
                            <el-radio-group v-model="form.resource">
                              <el-radio label="需要"></el-radio>
                              <el-radio label="不需要"></el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="水下照料" style="margin-left:14px; margin-top:15px;">
                            <el-radio-group v-model="form.resource">
                              <el-radio label="需要"></el-radio>
                              <el-radio label="不需要"></el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="10">
                          <el-form-item style="width:100%; margin-left:14px;">
                            <div slot="label" style="font-weight:500">潜水数量</div>
                            <el-input
                              v-model="formInline.user"
                              placeholder
                              size="mini"
                              style="width:77%;"
                            ></el-input>
                            <span style="font-size:18px;">&nbsp;名</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="14">
                          <el-form-item style="width:100%; margin-left:14px;">
                            <div slot="label" style="font-weight:500">潜水数量</div>
                            <el-input
                              v-model="formInline.user"
                              placeholder
                              size="mini"
                              style="width:77%;"
                            ></el-input>
                            <span style="font-size:18px;">&nbsp;名</span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">
                          <el-form-item style="width:100%; margin-left:14px;">
                            <div slot="label" style="font-weight:500">照明地点</div>
                            <el-input
                              v-model="formInline.user"
                              placeholder
                              size="mini"
                              style="width:87%;"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item
                            style="font-weight:500; margin-left:14px;"
                            label-width="180px;"
                          >
                            <div slot="label" style="width:72px; text-align: left;">状态</div>
                            <el-select
                              v-model="form.region"
                              placeholder
                              size="mini"
                              style="width:82%"
                            >
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item style="width:100%; margin-left:14px;">
                            <div slot="label" style="font-weight:500">使用道具</div>
                            <el-input
                              v-model="formInline.user"
                              placeholder
                              size="mini"
                              style="width:87%;"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-form-item style="margin-top:60px;">
                        <el-button type="primary" @click="onSubmit">最终提交</el-button>
                      </el-form-item>

                      <div class="right" style="position: absolute;bottom: 50px;right: 10px;">
                        <div class="one_icon" title="保存"></div>
                        <div class="two_icon" title="打印"></div>
                        <div class="three_icon" title="疑难"></div>
                        <div class="four_icon" title="关闭"></div>
                      </div>
                    </el-form>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="加压和减压" name="third">
                  <!-- 加压和减压 -->
                  <div class="top" style="min-height:640px;">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                      <el-row>
                        <el-col :span="12" class="shell">
                          <el-form-item style="width:100%; margin-top:30px;">
                            <div slot="label" style="font-weight:500">供气方式：</div>
                            <el-input
                              v-model="formInline.user"
                              placeholder="按“我国洽水减压表”规定进行"
                              size="mini"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row style="margin-top:30px;">
                        <el-col :span="12" class="shell">
                          <el-form-item style="font-weight:500; width:100%">
                            <div slot="label">减压方法：</div>
                            <el-select
                              v-model="form.region"
                              placeholder
                              size="mini"
                              style="width:100%"
                            >
                              <el-option label="不减压潜水" value="shanghai"></el-option>
                              <el-option label="水下减压" value="beijing"></el-option>
                              <el-option label="部分水面减压" value="beijing"></el-option>
                              <el-option label="完全水面减压" value="beijing"></el-option>
                              <el-option label="SCC-DCC减压" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row style="margin-top:30px;">
                        <el-col :span="12" class="shell">
                          <el-form-item style="font-weight:500; width:100%">
                            <div slot="label" style="width:90px; text-align:left;">减压表：</div>
                            <el-select
                              v-model="form.region"
                              placeholder
                              size="mini"
                              style="width:100%"
                            >
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="2">
                          <el-form-item style>
                            <el-button
                              type="primary"
                              @click="dialogVisible = true"
                              style="width:100px;"
                            >选择</el-button>
                          </el-form-item>
                          <el-dialog title="基础数据" :visible.sync="dialogVisible" width="30%">
                            <div class="one" style>
                              <el-col :span="24" style="padding-left: 0;">
                                <div class="one_left">
                                  <span style="font-size:25px;">请选择合适的减压表</span>
                                </div>
                              </el-col>
                            </div>
                            <ul style="margin-top:50px;" class="bounced">
                              <li
                                style="font-size:18px; padding:5px 0"
                                :class="activeClass == index ? 'a' :''"
                                v-for="(value,index) in isshow"
                                :key="index"
                                @click="co(value,index)"
                              >{{value}}</li>
                            </ul>
                            <span slot="footer" class="dialog-footer">
                              <el-button
                                type="primary"
                                @click="dialogVisible = false"
                                style="margin-left:40px;"
                              >确定</el-button>
                              <el-button
                                @click="dialogVisible = false"
                                style="background:#D2D2D2; color:#ffffff;"
                              >关闭</el-button>
                            </span>
                            <span slot="footer" class style="margin-left:160px;">
                              <el-button
                                type="primary"
                                style="background: #9FE1CE; border-color: #ffffff;"
                              >预览</el-button>
                            </span>
                          </el-dialog>
                        </el-col>
                        <div class="add" style="position: absolute; top: 2px;right: 350px;">
                          <span class="minus">
                            <i class="el-icon-minus" @click="reduceData"></i>
                            <i class="el-icon-plus" @click="addData"></i>
                          </span>
                        </div>
                      </el-row>

                      <el-row style="margin-top:30px;">
                        <el-col :span="16" class="shell_two">
                          <!-- <span>减压方案：</span> -->
                          <el-form-item label="减压方案：" style="width:100%;">
                            <el-table
                              :data="pressurizedData"
                              :header-cell-class-name="handlemyclass"
                              :header-cell-style="headerstyle"
                              size="mini"
                              style="width: 100%; border:1px solid #EBEBEB"
                              @row-click="chooseRow"
                              highlight-current-row
                            >
                              <el-table-column 
                              prop="plan" 
                              label="方案" 
                              width="170" 
                              align="center">
                                <template slot-scope="scope">
                                  <el-input type="text" v-model="scope.row.institution"/>
                                </template>
                              </el-table-column>
                              <el-table-column
                                prop="depth"
                                label="深度（m）"
                                align="center"
                                width="120">
                                  <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.depth"/>
                                  </template>
                              </el-table-column>
                              <el-table-column
                                prop="time"
                                label="时间（min）"
                                align="center"
                                width="120">
                                  <template slot-scope="scope">
                                    <el-input type="text" v-model="scope.row.time"/>
                                  </template>
                                </el-table-column>
                              <el-table-column 
                              prop="totalTime" 
                              label="减压总时间（min）" 
                              align="center">
                                <template slot-scope="scope">
                                  <el-input type="text" v-model="scope.row.totalTime"/>
                                </template>
                              </el-table-column>
                            </el-table>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-form-item style="margin-top:140px;">
                        <el-button type="primary" @click="onSubmit">最终提交</el-button>
                      </el-form-item>

                      <div class="right" style="position: absolute;bottom: 50px;right: 10px;">
                        <div class="one_icon" title="保存"></div>
                        <div class="two_icon" title="打印"></div>
                        <div class="three_icon" title="疑难"></div>
                        <div class="four_icon" title="关闭"></div>
                      </div>
                    </el-form>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="反复潜水" name="fourth">
                  <!-- 反复潜水 -->
                  <div
                    class="top"
                    style="min-height:640px; border: 1px solid #EEEEEE; margin-top:30px; "
                  >
                    <el-form ref="form" :model="form">
                      <el-radio-group
                        v-model="form.resource"
                        style="margin-top:60px; margin-left:2%;"
                      >
                        <el-radio label="有"></el-radio>
                        <el-radio label="无"></el-radio>
                      </el-radio-group>

                      <div class="one" style="margin-top:60px; margin-left:2%;">
                        <el-col :span="24" style="padding-left: 0;">
                          <div class="one_left">
                            <span>时序说明</span>
                          </div>
                        </el-col>
                      </div>
                      <el-form-item style="width:96%; margin:0 auto; margin-top:135px;">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                      </el-form-item>
                      <el-form-item style="margin-top:50px; margin-left:2%">
                        <el-button type="primary" @click="onSubmit">最终提交</el-button>
                      </el-form-item>

                      <div class="right" style="position: absolute;bottom: 45px;right: 10px;">
                        <div class="one_icon" title="保存"></div>
                        <div class="two_icon" title="打印"></div>
                        <div class="three_icon" title="疑难"></div>
                        <div class="four_icon" title="关闭"></div>
                      </div>
                    </el-form>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="实施计划" name="five">
                  <!-- 实施计划 -->
                  <div class="border_one" style=" min-height:724px;">
                    <div class="top" style="min-height:450px; border: 1px solid #AACEFE;">
                      <el-table
                        :data="carryData"
                        :header-cell-class-name="handlemyclass"
                        :header-cell-style="headerstyle"
                        style="width: 100%;"
                        @row-click="chooseRow"
                        highlight-current-row
                      >
                        <el-table-column>
                          <el-table-column 
                          prop="homework" 
                          label="作业" 
                          align="center" 
                          width="140">
                            <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.homework"/>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column>
                          <el-table-column 
                          prop="course" 
                          label="潜水顺次" 
                          align="center" 
                          width="160">
                            <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.course"/>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column>
                          <el-table-column 
                          prop="number" 
                          label="下潜人数" 
                          align="center" 
                          width="160">
                            <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.number"/>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column label="作业时间" align="center">
                          <el-table-column 
                          prop="startTime" 
                          label="开始" 
                          align="center" 
                          width="200">
                            <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.startTime"/>
                            </template>
                          </el-table-column>
                          <el-table-column 
                          prop="endTime" 
                          label="结束" 
                          align="center" 
                          width="200">
                          <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.endTime"/>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column label="潜水方案" align="center">
                          <el-table-column 
                          prop="depth" 
                          label="深度（m）"
                          align="center" 
                          width="170">
                            <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.institution"/>
                            </template>
                          </el-table-column>
                          <el-table-column 
                          prop="time" 
                          label="时间（min）" 
                          align="center">
                            <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.time"/>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table>
                      <div class="right" style="position: absolute;bottom: 45px;right: 10px;">
                        <div class="one_icon" title="保存"></div>
                        <div class="two_icon" title="打印"></div>
                        <div class="three_icon" title="疑难"></div>
                        <div class="four_icon" title="关闭"></div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        <!-- </el-col>
      </el-row>
    </div> -->
  </div>
</template>

<script>
// import commonHeader from "../../common/base/Header";
// import headerIcon from "@/assets/img/icon/header/plan.png";
// import CommonPlanSidebar from "@/views/common/base/Plan_sidebar";
export default {
  name: 'Diving_program',
  data () {
    return {
      activeClass: -1,
      judge: true,
      isshow: [
        '前苏联空气潜水减压表.doc',
        '前苏联空气潜水减压表.doc',
        '前苏联空气潜水减压表.doc',
        '前苏联空气潜水减压表.doc',
        '前苏联空气潜水减压表.doc'
      ],
      dialogVisible: false,
      activeName: 'second',
      tableData: [
        {
          date: '2016-05-02',
          name: '0',
          address: ' 1518 '
        }
      ],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      basicelementData: [],
      pressurizedData: [],
      carryData: [],
      rowQuaSign: false,
      rowEduSign: false,
      rowExpSign: false,
      value1: '',
      // curIndex: 3,
      currentPage4: 5,
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    co (value, index) {
      this.activeClass = index
    },
    handleClick (tab, event) {
      console.log(tab.name)
      if (tab.name === 'second' || tab.name === 'five') {
        this.judge = true
      } else {
        this.judge = false
      }
    },
    handlemyclass (row, column, rowIndex, columnIndex) {
      // console.log(row.columnIndex)
      if (row.columnIndex !== 5) {
        // console.log(row, column, rowIndex, columnIndex)
        return 'txt'
      }
    },
    headerstyle () {
      return 'background:rgba(244,249,255,1)'
    },
    // 选择某一行
    chooseRow (row, event, column) {
      let _this = this
      _this.curRow = row.index
      if (_this.activeName === 'second') {
        // 基本要素
        _this.rowQuaSign = true
      } else if (_this.activeName === 'third') {
        // 加压和减压
        _this.rowEduSign = true
      } else {
        // 实施计划
        _this.rowExpSign = true
      }
    },
    // 添加行
    addData () {
      let _this = this
      if (_this.activeName === 'second') {
        // 潜水资格
        _this.basicelementData.push({'homework': '', 'depth ': '', 'plannedDives ': '', 'time  ': ''})
      } else if (_this.activeName === 'third') {
        // 加压和减压
        _this.pressurizedData.push({'plan': '', 'depth ': '', 'time': '', 'totalTime': ''})
      } else {
        _this.carryData.push({'homework': '', 'course': '', 'number': '', 'startTime': '', 'endTime': '', 'depth': '', 'time': ''})
      }
    },
        // 删除一行
    reduceData () {
      let _this = this
      // console.log(_this.activeName)
      console.log(_this.curRow)
      if (_this.activeName === 'second') {
        // 基本要素
        if (_this.rowQuaSign) {
          _this.sureDelete(_this, _this.basicelementData, _this.rowQuaSign)
        } else {
          _this.rowNull(_this)
        }
      } else if (_this.activeName === 'third') {
        // 加压和减压
        if (_this.rowEduSign) {
          console.log('ssss')
          _this.sureDelete(_this, _this.pressurizedData, _this.rowEduSign)
        } else {
          _this.rowNull(_this)
        }
      } else {
        // 实施计划
        if (_this.rowExpSign) {
          _this.sureDelete(_this, _this.carryData, _this.rowExpSign)
        } else {
          _this.rowNull(_this)
        }
      }
    },
    // 未选择时弹窗提示
    rowNull (_this) {
      _this.$alert('操作失败，请确认是否选择了数据', '操作失败', {
        confirmButtonText: '确定'
      })
    },
    // 选择时弹窗提示
    sureDelete (_this, data, sign) {
      _this.$confirm('请确认是否删除选中的数据?', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        data.splice(_this.curRow, 1)
        sign = false
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.plan {
  background-color: #eeeeee;
  display: flex;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
}
.box_one {
  margin: 0 auto;
  background: #ffffff;
  height: 800px;
  width: 96%;
  margin-top: 39px;
  overflow: hidden;
  position: relative;

  .right {
    width: 180px;
    display: flex;
    justify-content: space-between;
  }
}
.box_two {
  height: 455px;
  width: 100%;
  border: 1px solid #8ab6e2;
}
.box_three {
  width: 80%;
  margin: 40px auto;
  .block {
    margin-bottom: 30px;
  }
}

// 四张图片
.one_icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../../../assets/img/figure/baocun.png);
  background-size: 100% 100%;
  width: 36px;
  height: 36px;
}
.one_icon:hover {
  background: url(../../../assets/img/figure/baocun_select.png);
  background-size: 100% 100%;
  width: 36px;
  height: 36px;
}
.two_icon {
  background: url(../../../assets/img/figure/dayin.png);
  background-size: 100% 100%;
  width: 36px;
  height: 36px;
}
.two_icon:hover {
  background: url(../../../assets/img/figure/dayin_select.png);
  background-size: 100% 100%;
  width: 36px;
  height: 36px;
}
.three_icon {
  background: url(../../../assets/img/figure/help_icon.png);
  background-size: 100% 100%;
  width: 36px;
  height: 36px;
}
.three_icon:hover {
  background: url(../../../assets/img/figure/help_select.png);
  background-size: 100% 100%;
  width: 36px;
  height: 36px;
}
.four_icon {
  background: url(../../../assets/img/figure/guanbi.png);
  background-size: 100% 100%;
  width: 36px;
  height: 36px;
}
.four_icon:hover {
  background: url(../../../assets/img/figure/guanbi_select.png);
  background-size: 100% 100%;
  width: 36px;
  height: 36px;
}
.color {
  height: 20px;
  background: rgba(77, 77, 77, 1);
  margin-bottom: 0;
}
//icon图标大小
.minus .el-icon-minus {
  font-size: 36px;
  background: rgba(244, 244, 244, 1);
  border: 2px solid rgba(98, 98, 98, 1);
  opacity: 0.21;
  border-radius: 2px;
  margin: 0 5px;
}
.minus .el-icon-plus {
  font-size: 36px;
  background: rgba(244, 244, 244, 1);
  border: 2px solid rgba(98, 98, 98, 1);
  opacity: 0.21;
  border-radius: 2px;
}
// 标题
.title_one {
  width: 260px;
  height: 35px;
  font-size: 26px;
  font-family: PingFang-SC-Regular;
  color: rgba(77, 77, 77, 1);
  border-bottom: 3px solid #1288ff;
}
.one {
  width: 100%;

  .one_left {
    border-left: 4px solid #1288ff;
    font-size: 18px;

    span {
      margin-left: 10px;
    }
  }
  .one_right {
    border-left: 4px solid #1288ff;
    font-size: 18px;

    span {
      margin-left: 10px;
    }
  }
}
</style>

<style lang="scss">
.diving {
  //整体的字体颜色
  .el-form-item__label {
    font-family: PingFang-SC-Regular;
    font-size: 18px;
    color: rgba(51, 51, 51, 1);
  }
  //去掉选项卡下面的横线
  .el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background-color: #e4e7ed;
    z-index: 1;
  }
  .el-tabs__header {
  width:80%;
}
  //去掉选项卡下面的横线
  .box_one {
    .el-tabs__active-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background-color: #ffffff;
      z-index: 1;
    }
    //选项卡字体颜色
    .el-tabs__item.is-active {
      color: #1288ff;
    }
    //选项卡的颜色
    .el-tabs__item:hover {
      color: #1288ff;
      cursor: pointer;
    }
    //选项卡的字体
    .el-tabs__item {
      font-size: 24px;
      font-family: PingFang-SC-Regular;
      color: rgba(153, 153, 153, 1);
      padding: 0px 30px;
    }

    .cell {
      font-family: PingFang-SC-Medium;
      font-size: 18px;
      color: rgba(102, 102, 102, 1);
    }
  }
  .txt {
    border-right: 1px solid rgba(170, 206, 254, 1);
    width: 3px;
  }

  // .el-form-item__content {
  //   width: 70%;
  // }
  .el-radio__label {
    font-size: 18px;
  }
  .shell .el-form-item__content {
    width: 75%;
  }
  .shell_two .el-form-item__content {
    width: 75%;
  }
  .shell_two .cell {
    font-size: 16px;
  }
  //弹出框
  .el-dialog__headerbtn {
    position: absolute;
    top: 10px;
    right: 20px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 20px;
  }
  .el-dialog__header {
    padding: 10px 20px 10px;
    color: #ffffff;
    background: #1288ff;
  }
  .el-dialog__title {
    color: #ffffff;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #ffffff;
  }
  .el-dialog__footer {
    padding: 10px 20px 20px;
    text-align: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .bounced li:hover {
    background: #9fe1ce;
  }
  .a {
    background: #9fe1ce;
  }
  .el-textarea__inner {
    height: 300px;
  }
  .el-input--medium .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: 1px;
}
}
// .box_one .el-tabs__content {
//   min-height: 100%;
// }
</style>

