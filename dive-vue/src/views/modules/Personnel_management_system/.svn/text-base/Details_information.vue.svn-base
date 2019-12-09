<template>
  <div>
    <common-header :headChange="headChange"></common-header>
    <div class="box">
      <div class="modifys">
        <!-- 标题 -->
        <el-row :gutter="20">
          <el-col :span="22" :offset="1">
            <div class="title">人员详情信息</div>
          </el-col>
        </el-row>
        <!-- 表单 -->
        <el-row :gutter="20">
          <el-col :span="22" :offset="1">
            <div class="form_retrieval">
              <div class="kuang">
                <!-- 第一行 -->
                <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                  <el-row>
                    <el-col :span="4">
                      <el-form-item>
                        <div slot="label">编号：</div>
                        <el-input v-model="formInline.number"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item>
                        <div slot="label">性别：</div>
                        <el-select v-model="formInline.sex" placeholder>
                          <el-option label="女" value="0"></el-option>
                          <el-option label="男" value="1"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item>
                        <div slot="label">技术等级：</div>
                        <el-select v-model="formInline.skillGrade" placeholder>
                          <el-option v-for="(item,index) in skillGradeSelection" :key="index" :label="item.label" :value="item.value"></el-option>                          
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5" class="tuning">
                      <div class="block" style="width:100%; margin-top: -6px;">
                        <span class="el-form-item__label">获取日期：</span>
                        <el-date-picker
                          v-model="formInline.skillGainTime"
                          placeholder="选择日期"
                          size="mini"
                          style="width:58%; padding-right:0;"
                          :clearable="false"
                          prefix-icon="el-icon-date"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                        ></el-date-picker>
                      </div>
                    </el-col>
                    <el-col :span="5" class="tuning">
                      <div class="block" style="width:100%; margin-top: -6px;">
                        <span class="el-form-item__label">出生日期：</span>
                        <el-date-picker
                          v-model="formInline.birthday"
                          prefix-icon="el-icon-date"
                          type="datetime"
                          placeholder="选择日期"
                          size="mini"
                          style="width:58%;"
                          value-format="yyyy-MM-dd HH:mm:ss"
                        ></el-date-picker>
                      </div>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="4">
                      <el-form-item>
                        <div slot="label">姓名：</div>
                        <el-input v-model="formInline.name" placeholder></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item>
                        <div slot="label">婚姻：</div>
                        <el-select v-model="formInline.marriageStatus" placeholder>
                          <el-option v-for="(item,index) in marriageStatusSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item>
                        <div slot="label">军&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;衔：</div>
                        <el-select v-model="formInline.militaryRank" placeholder>
                          <el-option v-for="(item,index) in militaryRankSelection" :key="index" :label="item.label" :value="item.value"></el-option>                          
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5" class="tuning">
                      <div class="block" style="width:100%; margin-top: -6px;">
                        <span class="el-form-item__label">获取日期：</span>
                        <el-date-picker
                          v-model="formInline.rankGainTime"
                          prefix-icon="el-icon-date"
                          type="datetime"
                          placeholder="选择日期"
                          size="mini"
                          style="width:58%;"
                          value-format="yyyy-MM-dd HH:mm:ss"
                        ></el-date-picker>
                      </div>
                    </el-col>
                    <el-col :span="5" class="tuning">
                      <div class="block" style="width:100%; margin-top: -6px;">
                        <span class="el-form-item__label">入伍日期：</span>
                        <el-date-picker
                          v-model="formInline.enlistedTime"
                          prefix-icon="el-icon-date"
                          type="datetime"
                          placeholder="选择日期"
                          size="mini"
                          style="width:58%;"
                          value-format="yyyy-MM-dd HH:mm:ss"
                        ></el-date-picker>
                      </div>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">
                      <span style="font-size:18px;color: #333333;">籍贯：</span>
                      <el-input v-model="formInline.nativePlace" style="width:77%" size="mini"></el-input>
                    </el-col>

                    <el-col :span="10">
                      <span
                        style="font-size:18px;color: #333333;"
                      >单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</span>
                      <el-input v-model="formInline.institution" style="width:80%" size="mini"></el-input>
                    </el-col>
                    <el-col :span="5" class="tuning">
                      <div class="block" style="width:100%; margin-top: -6px;">
                        <span class="el-form-item__label">潜水日期：</span>
                        <el-date-picker
                          v-model="formInline.firstDive"
                          type="datetime"
                          prefix-icon="el-icon-date"
                          size="mini"
                          style="width:58%;"
                          placeholder="选择日期"
                          value-format="yyyy-MM-dd HH:mm:ss"
                        ></el-date-picker>
                      </div>
                    </el-col>
                  </el-row>
                </el-form>
                <!-- 第三行 -->
              </div>
              <!-- 一条横线 -->
              <div class="heng"></div>
              <!-- 选项卡 -->
              <div class="tabs">
                <div class="left">
                  <!-- @tab-click="handleClick" -->
                  <el-tabs v-model="activeName" @tab-click="handleClick">
                    <!-- 潜水资格 -->
                    <el-tab-pane label="潜水资格" name="first">
                      <div class="qualificati">
                        <el-table
                          :data="qualificationData"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          style="width: 100%"
                          @row-click="chooseRow"
                          highlight-current-row
                          :row-class-name="tableRowClassName"
                        >
                          <el-table-column
                            label="潜水资格"
                            align="center"
                            style="background: red"
                            width="450"
                          >
                            <template slot-scope="scope">
                              <el-select v-model="scope.row.qualification">
                                <el-option v-for="(item,index) in qualificationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column align="center" label="获取日期">
                            <template slot-scope="scope">
                              <div class="Open_time">
                                <el-date-picker
                                  v-model="scope.row.gainTime"
                                  align="right"
                                  type="datetime"
                                  prefix-icon="el-icon-date"
                                  placeholder="选择日期"
                                  :picker-options="pickerOptions"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                ></el-date-picker>
                              </div>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="教育培训" name="second">
                      <!-- 教育培训 -->
                      <div class="training">
                        <el-table
                          :data="educationData"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          style="width: 100%"
                          @row-click="chooseRow"
                          highlight-current-row
                        >
                          <el-table-column align="center" label="开放时间" width="220">
                            <template slot-scope="scope">
                              <div class="Open_time">
                                <el-date-picker
                                  v-model="scope.row.startTime"
                                  align="right"
                                  type="datetime"
                                  prefix-icon="el-icon-date"
                                  placeholder="选择日期"
                                  :picker-options="pickerOptions"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                ></el-date-picker>
                              </div>
                            </template>
                          </el-table-column>
                          <el-table-column align="center" label="结束时间" width="220">
                            <template slot-scope="scope">
                              <div class="End_time">
                                <el-date-picker
                                  v-model="scope.row.endTime"
                                  align="right"
                                  type="datetime"
                                  prefix-icon="el-icon-date"
                                  placeholder
                                  :picker-options="pickerOptions"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                ></el-date-picker>
                              </div>
                            </template>
                          </el-table-column>
                          <el-table-column label="培训机构" width="680" align="center">
                            <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.institution"/>
                            </template>
                          </el-table-column>
                          <el-table-column label="获得证书" align="center" style="background: red">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.certificate">
                                  <!-- educationSelection -->
                                <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="潜水经历" name="third">
                      <!-- 潜水经历 -->
                      <div class="experience">
                        <el-table
                          :data="experienceData"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          style="width: 100%"
                          @row-click="chooseRow"
                          highlight-current-row
                        >
                          <el-table-column align="center" label="日期" width="185">
                            <template slot-scope="scope">
                              <div class="Open_time">
                                <el-date-picker
                                  v-model="scope.row.diveTime"
                                  align="right"
                                  type="datetime"
                                  prefix-icon="el-icon-date"
                                  placeholder
                                  :picker-options="pickerOptions"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                ></el-date-picker>
                              </div>
                            </template>
                          </el-table-column>
                          <el-table-column label="深度" width="150" align="center">
                            <template slot-scope="scope">
                              <el-input type="number" v-model="scope.row.diveDepth"/>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="呼吸气体"
                            align="center"
                            style="background: red"
                            width="260"
                          >
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.gas">
                                  <el-option v-for="(item,index) in gaseSelection" :key="index" :label="item.label" :value="item.value"></el-option>                                  
                                </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="方式"
                            align="center"
                            style="background: red"
                            width="260"
                          >
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.diveMode">
                                  <el-option v-for="(item,index) in diveMannerSelection" :key="index" :label="item.label" :value="item.value"></el-option>                                  
                                </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column label="简要描述" align="center">
                            <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.described"/>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="潜水事故" name="fourth">
                      <!-- 潜水事故 -->
                      <div class="experience">
                        <el-table
                          :data="accidentData"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          style="width: 100%"
                          @row-click="chooseRow"
                          highlight-current-row
                        >
                          <el-table-column align="center" label="日期" width="185">
                            <template slot-scope="scope">
                              <div class="Open_time">
                                <el-date-picker
                                  v-model="scope.row.accidentTime"
                                  align="right"
                                  type="datetime"
                                  prefix-icon="el-icon-date"
                                  placeholder
                                  :picker-options="pickerOptions"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                ></el-date-picker>
                              </div>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="事故类型"
                            align="center"
                            style="background: red"
                            width="300"
                          >
                            <template slot-scope="scope">
                              <el-select v-model="scope.row.accidentType">
                                <el-option v-for="(item,index) in accidenTypeSelection" :key="index" :label="item.label" :value="item.value"></el-option>                                  
                              </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="后果"
                            align="center"
                            style="background: red"
                            width="300"
                          >
                            <template slot-scope="scope">
                              <el-select v-model="scope.row.accidentResult">
                                <el-option v-for="(item,index) in accidenResultSelection" :key="index" :label="item.label" :value="item.value"></el-option>                                  
                              </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column label="简要描述" align="center">
                            <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.described"/>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="健康记录" name="fifth">
                      <!-- 健康记录 -->
                      <div class="experience">
                        <el-table
                          :data="healthData"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          style="width: 100%"
                          @row-click="chooseRow"
                          highlight-current-row
                        >
                          <el-table-column align="center" label="日期" width="185">
                            <template slot-scope="scope">
                              <div class="Open_time">
                                <el-date-picker
                                  v-model="scope.row.fallIllTime"
                                  align="right"
                                  type="datetime"
                                  prefix-icon="el-icon-date"
                                  placeholder
                                  :picker-options="pickerOptions"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                ></el-date-picker>
                              </div>
                            </template>
                          </el-table-column>
                          <el-table-column label="疾病" width="180" align="center">
                            <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.diseaseName"/>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="发现方式"
                            align="center"
                            style="background: red"
                            width="240"
                          >
                            <template slot-scope="scope">
                              <el-select v-model="scope.row.findMode">
                                <el-option v-for="(item,index) in findModeSelection" :key="index" :label="item.label" :value="item.value"></el-option>                                  
                              </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column label="治疗经过" width="200" align="center">
                            <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.treatmentProcess"/>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="当前状况"
                            align="center"
                            style="background: red"
                            width="240"
                          >
                            <template slot-scope="scope">
                              <el-select v-model="scope.row.currentStatus">
                                <!-- currentStatusSelection -->
                                <el-option v-for="(item,index) in currentStatusSelection" :key="index" :label="item.label" :value="item.value"></el-option>                                  
                              </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column label="简要描述" align="center">
                             <template slot-scope="scope">
                              <el-input type="text" v-model="scope.row.described"/>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
                <div class="right">
                  <span class="minus">
                    <i class="el-icon-minus" @click="reduceData"></i>
                    <i class="el-icon-plus" @click="addData"></i>
                  </span>
                </div>
              </div>
              <!-- 尾部 -->
              <div class="entry">
                <div class="left">
                  <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="录入人：">
                      <el-input v-model="formInline.noteTaker" placeholder size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="录入日期：">
                      <!-- noteDateShow\formInline.noteDate -->
                      <el-input v-model="noteDateShow" placeholder size="mini" readonly="readonly"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="right">
                  <div class="one_icon" @click="submitData"></div>
                  <div class="two_icon"></div>
                  <div class="three_icon"></div>
                  <div class="four_icon"></div>
                </div>
              </div>
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
import {formatDateTime} from '@/utils/formDate.js'

export default {
  name: 'details_information',
  components: {
    commonHeader
  },
  // 注入依赖
  inject: ['reload'],
  data () {
    return {
      formInline: {
        number: '',
        name: '',
        sex: '',
        marriageStatus: '',
        nativePlace: '',
        skillGrade: '',
        militaryRank: '',
        institution: '',
        birthday: '',
        skillGainTime: '',
        rankGainTime: '',
        enlistedTime: '',
        firstDive: '',
        noteTaker: '',
        noteDate: ''
      },
      noteDateShow: new Date().toLocaleDateString().replace(/\//g, '-'),
      headChange: {
        title: '潜水人员管理系统',
        headIcon: headerIcon
      },
      activeName: 'first',
      // 潜水资格
      qualificationData: [],
      // 教育培训
      educationData: [],
      // 潜水经历
      experienceData: [],
      // 潜水事故
      accidentData: [],
      // 健康记录
      healthData: [],
      // 等级选项
      skillGradeSelection: '',
      // 军衔选项
      militaryRankSelection: '',
      // 婚姻状态选项
      marriageStatusSelection: '',
      // 潜水资格选项
      qualificationSelection: '',
      // 获取证书
      educationSelection: '',
      // 呼吸气体选项
      gaseSelection: '',
      // 潜水方式选项
      diveMannerSelection: '',
      // 事故类型选项
      accidenTypeSelection: '',
      // 事故后果选项
      accidenResultSelection: '',
      // 当前状况选项
      currentStatusSelection: '',
      // 发现方式选项
      findModeSelection: '',
      // 几个标识 代表某一模块某一行是否被选中点击
      rowQuaSign: false,
      rowEduSign: false,
      rowExpSign: false,
      rowAccSign: false,
      rowHealSign: false,
      // 当前行
      curRow: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },
  props: ['id'],
  mounted () {
    let _this = this
    console.log(_this.id)
    // 接收路由参数
    // 如果没有id就是新增否则就是查看详情
    // !_this.$route.params.id
    if (!_this.id) {
      console.log('新增人员')
    } else {
      console.log('查看详情')
      _this.infoDetail(_this.id)
    }
     // 等级
    _this.getSkillGrade()
    // // 军衔
    _this.getMilitaryRank()
    // 婚姻
    _this.marriageStatus()
    // 潜水资格
    _this.getQualification()
    // 呼吸气体
    _this.getGases()
    // 潜水方式
    _this.getDiveManner()
    // 获取证书
    _this.getEducation()
    // 事故类型
    _this.getAccidenType()
    // 事故后果
    _this.getAccidenResult()
    // 发现方式
    _this.getFindMode()
    // 当前状况
    _this.getCurrentStatus()
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
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
    // 刷新
    refresh () {
      this.reload()
    },
    // 等级
    getSkillGrade () {
      this.$http({
        url: this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: this.$http.adornData({
          'type': 'diver_skill_grade'
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          // console.log(data)
          this.skillGradeSelection = data.dict
        }
      })
    },
    // 军衔
    getMilitaryRank () {
      this.$http({
        url: this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: this.$http.adornData({
          'type': 'people_rank'
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          // console.log(data)
          this.militaryRankSelection = data.dict
        }
      })
    },
    // 婚姻
    marriageStatus () {
      this.$http({
        url: this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: this.$http.adornData({
          'type': 'people_marriage_status'
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          // console.log(data)
          this.marriageStatusSelection = data.dict
        }
      })
    },
    // 潜水资格 qualificationSelection
    getQualification () {
      this.$http({
        url: this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: this.$http.adornData({
          'type': 'diver_qualification'
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
            // console.log(data)
          this.qualificationSelection = data.dict
        }
      })
    },
    // 获取证书 diver_education
    getEducation () {
      this.$http({
        url: this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: this.$http.adornData({
          'type': 'diver_education'
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
            // console.log(data)
          this.educationSelection = data.dict
        }
      })
    },
    // 呼吸气体 hl_respiratory_gases
    getGases () {
      this.$http({
        url: this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: this.$http.adornData({
          'type': 'hl_respiratory_gases'
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
            // console.log(data)
          this.gaseSelection = data.dict
        }
      })
    },
    // 潜水方式 dive_equipment_experience_manner
    getDiveManner () {
      this.$http({
        url: this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: this.$http.adornData({
          'type': 'hl_respiratory_gases'
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
            // console.log(data)
          this.diveMannerSelection = data.dict
        }
      })
    },
    // 事故类型 accident_type
    getAccidenType () {
      this.$http({
        url: this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: this.$http.adornData({
          'type': 'accident_type'
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
            // console.log(data)
          this.accidenTypeSelection = data.dict
        }
      })
    },
    // 事故后果 accident_result
    getAccidenResult () {
      this.$http({
        url: this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: this.$http.adornData({
          'type': 'accident_result'
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
            // console.log(data)
          this.accidenResultSelection = data.dict
        }
      })
    },
    // 发现方式 disease_find_mode
    getFindMode () {
      this.$http({
        url: this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: this.$http.adornData({
          'type': 'disease_find_mode'
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
            // console.log(data)
          this.findModeSelection = data.dict
        }
      })
    },
    // 当前状况 diver_current_status
    getCurrentStatus () {
      this.$http({
        url: this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: this.$http.adornData({
          'type': 'diver_current_status'
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
            // console.log(data)
          this.currentStatusSelection = data.dict
        }
      })
    },
    // 根据id查看详情
    infoDetail (paramId) {
      let _this = this
      console.log(paramId)
      _this.$http({
        url: this.$http.adornUrl('/dive/diver/info/' + paramId),
        method: 'POST'
      }).then(({data}) => {
        if (data && data.code === 0) {
          _this.formInline = data.diverVo.diverEntity
          _this.qualificationData = data.diverVo.diverQualificationEntityList
          _this.educationData = data.diverVo.diverEducationEntityList
          _this.experienceData = data.diverVo.diverExperienceEntityList
          _this.experienceData = data.diverVo.diverAccidentEntityList
          _this.healthData = data.diverVo.diverHealthyRecordEntityList
        }
      })
    },
    // 给每一行添加索引
    tableRowClassName ({row, rowIndex}) {
      row.index = rowIndex
    },
    // 添加行
    addData () {
      let _this = this
      // console.log(_this.activeName)
      if (_this.activeName === 'first') {
        // 潜水资格
        _this.qualificationData.push({'qualification': '', 'gainTime': ''})
      } else if (_this.activeName === 'second') {
        // 教育培训
        _this.educationData.push({'startTime': '', 'endTime': '', 'institution': '', 'certificate': ''})
      } else if (_this.activeName === 'third') {
        // 潜水经历
        _this.experienceData.push({'diveTime': '', 'diveDepth': '', 'gas': '', 'diveMode': '', 'described': ''})
      } else if (_this.activeName === 'fourth') {
        // 潜水事故
        _this.accidentData.push({'accidentTime': '', 'accidentType': '', 'accidentResult': '', 'described': ''})
      } else {
        // 健康记录
        _this.healthData.push({'fallIllTime': '', 'diseaseName': '', 'findMode': '', 'treatmentProcess': '', 'currentStatus': '', 'described': ''})
      }
    },
    // 删除一行
    reduceData () {
      let _this = this
      // console.log(_this.activeName)
      console.log(_this.curRow)
      if (_this.activeName === 'first') {
        // 潜水资格
        if (_this.rowQuaSign) {
          _this.sureDelete(_this, _this.qualificationData, _this.rowQuaSign)
        } else {
          _this.rowNull(_this)
        }
      } else if (_this.activeName === 'second') {
        // 教育培训
        if (_this.rowEduSign) {
          _this.sureDelete(_this, _this.educationData, _this.rowEduSign)
        } else {
          _this.rowNull(_this)
        }
      } else if (_this.activeName === 'third') {
        // 潜水经历
        if (_this.rowExpSign) {
          _this.sureDelete(_this, _this.experienceData, _this.rowExpSign)
        } else {
          _this.rowNull(_this)
        }
      } else if (_this.activeName === 'fourth') {
        // 潜水事故
        if (_this.rowAccSign) {
          _this.sureDelete(_this, _this.accidentData, _this.rowAccSign)
        } else {
          _this.rowNull(_this)
        }
      } else {
        // 健康记录
        if (_this.rowHealSign) {
          _this.sureDelete(_this, _this.healthData, _this.rowHealSign)
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
    },
    // 选择某一行
    chooseRow (row, event, column) {
      let _this = this
      _this.curRow = row.index
      if (_this.activeName === 'first') {
        // 潜水资格
        _this.rowQuaSign = true
      } else if (_this.activeName === 'second') {
        // 教育培训
        _this.rowEduSign = true
      } else if (_this.activeName === 'third') {
        // 潜水经历
        _this.rowExpSign = true
      } else if (_this.activeName === 'fourth') {
        // 潜水事故
        _this.rowAccSign = true
      } else {
        // 健康记录
        _this.rowHealSign = true
      }
    },
    // 提交数据
    submitData () {
      let _this = this
      // 去获取当前时间的指定格式
      try {
        if (!_this.formInline.noteDate) {
          _this.formInline.noteDate = formatDateTime(new Date())
        }
      } catch (e) {
        return false
      }
      // console.log(_this.formInline)
      _this.$http({
        url: this.$http.adornUrl('/dive/diver/save'),
        method: 'POST',
        data: _this.$http.adornData({
          'diverEntity': _this.formInline,
          'diverQualificationEntityList': _this.qualificationData,
          'diverEducationEntityList': _this.educationData,
          'diverExperienceEntityList': _this.experienceData,
          'diverAccidentEntityList': _this.accidentData,
          'diverHealthyRecordEntityList': _this.healthData
        })
      }).then(({data}) => {
        console.log(data)
        if (data && data.code === 0) {
          // console.log(data)
          this.$message({
            message: '保存数据成功',
            type: 'success'
          })
          this.refresh()
        } else {
          this.$message.error('保存数据失败')
        }
      })
    }

  }

}
</script>

<style lang="scss" scoped>
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
// 背景
.modifys {
  background: #eeeeee;
  width: 100%;
  overflow: hidden;
  min-height: 860px;
  margin-bottom: 0;
  // 标题
  .title {
    width: 156px;
    height: 35px;
    font-size: 26px;
    font-family: PingFang-SC-Regular;
    color: rgba(77, 77, 77, 1);
    border-bottom: 3px solid #1288ff;
    margin-top: 30px;
  }
  // 表单
  .form_retrieval {
    background: #ffffff;
    min-height: 240px;
    margin-top: 15px;
    overflow: hidden;
    margin-bottom: 50px;

    .kuang {
      width: 94%;
      min-height: 110px;
      margin: 20px auto;

      .block {
        display: inline-block;
      }
    }
  }
  // 选项卡
  .tabs {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    position: relative;
    .left {
      width: 100%;
      //潜水资格
      .qualificati {
        width: 98%;
        margin: 0 auto;
      }
      //教育培训
      .training {
        width: 98%;
        margin: 0 auto;
      }
      //经历，事故，健康
      .experience {
        width: 98%;
        margin: 0 auto;
      }
    }
    .right {
      height: 30px;
      width: 110px;
      position: absolute;
      top: 5px;
      right: 0;
      .el-icon-minus,.el-icon-plus{
        cursor: pointer;
      }
    }
  }
}
.black {
  margin-left: -10px;
  display: inline-block;
}
//表单分割线
.heng {
  width: 100%;
  height: 2px;
  background: rgba(225, 225, 225, 1);
}
//录入人
.entry {
  width: 98%;
  height: 30px;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right {
    width: 180px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
<style lang="scss">
.el-tabs__content {
  min-height: 450px;
}
//潜水资格
.qualificati .el-select > .el-input {
  display: block;
  width: 160%;
}
//input去掉边框
.qualificati .el-input--medium .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: 1px;
}
//input去掉边框
.training .el-input--medium .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: 1px;
}
//input去掉边框
.experience .el-input--medium .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: 1px;
}
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
//去掉选项卡下面的横线
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
@media (max-width: 768px) {
  .el-tabs__item {
    font-size: 18px;
    font-family: PingFang-SC-Regular;
    font-weight: bold;
    color: rgba(153, 153, 153, 1);
    padding: 0px 20px;
  }
}
// 选项卡第一项
.el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: 20px;
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
.txt {
  border-right: 1px solid rgba(170, 206, 254, 1);
  width: 3px;
}
.cell {
  font-family: PingFang-SC-Medium;
  font-size: 18px;
  color: rgba(102, 102, 102, 1);
}
.entry .el-form-item {
  margin-bottom: 0 !important;
}
.modifys .el-form-item__content {
  width: 58%;
}
.modifys .el-form-item__label {
  padding: 0;
}
.tuning .el-input--suffix .el-input__inner {
     padding-right: 0;
}
</style>

