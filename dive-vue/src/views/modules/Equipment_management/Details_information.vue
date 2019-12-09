<template>
  <div>
    <common-header :headChange="headChange"></common-header>
    <div class="box">
      <div class="modify_detail">
        <!-- 标题 -->
        <el-row :gutter="20">
          <el-col :span="22" :offset="1">
            <div class="title">装具详情信息</div>
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
                    <el-col :span="5">
                      <el-form-item>
                        <div slot="label">编号：</div>
                        <el-input v-model="formInline.number" style="width:100%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item >
                        <div slot="label">类别：</div>
                        <el-select v-model="formInline.diveEquipmentCategory" style="width:100%"  @change="get_id(formInline.diveEquipmentCategory)">
                          <el-option v-for="item in categorys" :key="item.id" :label="item.label" :value="item.value">{{item.label}}</el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="型号：">
                        <el-select v-model="formInline.diveEquipmentCategoryType" style="width:100%">
                          <el-option v-for="item in mode" :key="item.id" :label="item.label" :value="item.value">{{item.label}}</el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item>
                        <div slot="label">单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</div>
                        <el-input v-model="formInline.institution" placeholder style="width:190%"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">
                      <span class="el-form-item__label">配购日期:</span>
                      <el-date-picker
                        v-model="formInline.purchaseTime"
                        type="datetime"
                        placeholder
                        value-format="yyyy-MM-dd HH:mm:ss"
                        size="mini"
                        prefix-icon="el-icon-date"
                        :clearable="false"
                        style="width:71%"
                      ></el-date-picker>
                    </el-col>
                    <el-col :span="8">
                      <span class="el-form-item__label">首次使用日期:</span>
                      <el-date-picker
                        v-model="formInline.firstUseTime"
                        type="datetime"
                        prefix-icon="el-icon-date"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        style="width:53%"
                        size="mini"
                        :clearable="false"
                      ></el-date-picker>
                    </el-col>
                    <el-col :span="8" :xl="8">
                      <el-form-item>
                        <div slot="label">生产单位：</div>
                        <span class="a">
                          <el-input v-model="formInline.productionUnit" placeholder style="width:190%;"></el-input>
                        </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <!-- 一条横线 -->
              <div class="heng"></div>
              <!-- 选项卡 -->
              <div class="tabs">
                <div class="left">
                  <el-tabs v-model="activeName" @tab-click="handleClick">
                    <!-- 潜水经历 -->
                    <el-tab-pane label="潜水经历" name="first">
                      <!-- 潜水经历 -->
                      <div class="experience">
                        <el-table
                          :data="tableData1"
                          @row-click="chooseRow"
                          highlight-current-row
                          :row-class-name="tableRowClassName"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          style="width: 100%"
                        >
                          <el-table-column align="center" label="日期" width="220" >
                            <template slot-scope="scope">
                              <div class="Open_time">
                                <el-date-picker
                                  v-model="scope.row.time"
                                  type="datetime"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  prefix-icon="el-icon-date"
                                  placeholder="选择日期时间">
                                </el-date-picker>
                              </div>
                            </template>
                          </el-table-column>
                          <el-table-column 
                          label="深度(m)" 
                          width="150" 
                          align="center">
                          <template slot-scope="scope">
                              <el-input v-model="scope.row.depth"></el-input>
                          </template>
                          </el-table-column>
                          <el-table-column
                            label="呼吸气体"
                            align="center"
                            style="background: red"
                            width="240"
                          >
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.respiratoryGases" placeholder="请选择活动区域" >
                                  <el-option  v-for="item in respiratory" :key="item.value"  :label="item.label" :value="item.value">{{item.label}}</el-option>
                                </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="方式"
                            align="center"
                            style="background: red"
                            width="220"
                          >
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.manner" placeholder="请选择活动区域">
                                  <el-option  v-for="item in ways" :key="item.value"  :label="item.label" :value="item.value" >{{item.label}}</el-option>
                                </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="水下时间(min)"
                            width="200"
                            align="center"
                          >
                          <template slot-scope="scope">
                              <el-input v-model="scope.row.diveTime"></el-input>
                          </template>
                          </el-table-column>
                          <el-table-column label="简要描述" align="center">
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.briefDescription"></el-input>
                          </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="故障记录" name="second">
                      <!-- 故障记录 -->
                      <div class="experience">
                        <el-table
                          :data="tableData2"
                          @row-click="chooseRow"
                          highlight-current-row
                          :row-class-name="tableRowClassName"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          style="width: 100%"
                        >
                          <el-table-column align="center" label="日期" width="220">
                            <template slot-scope="scope">
                              <div class="Open_time">
                                <el-date-picker
                                  v-model="scope.row.time"
                                  align="right"
                                  type="datetime"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  suffix-icon="el-icon-date"
                                  prefix-icon="el-icon-date"
                                  placeholder
                                  :picker-options="pickerOptions"
                                ></el-date-picker>
                              </div>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="类型"
                            align="center"
                            style="background: red"
                            width="240"
                          >
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.type" placeholder="请选择活动区域">
                                  <el-option  v-for="item in fault" :key="item.value"  :label="item.label" :value="item.value">{{item.label}}</el-option>
                                </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column prop="consequence" label="后果" width="500" align="center">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.consequence" placeholder="请选择活动区域">
                                  <el-option  v-for="item in consequences" :key="item.value"  :label="item.label" :value="item.value">{{item.label}}</el-option>
                                </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column label="简要描述" align="center">
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.briefDescription"></el-input>
                          </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </el-tab-pane>

                    <el-tab-pane label="维护记录" name="third">
                      <!-- 维护记录 -->
                      <div class="experience">
                        <el-table
                          :data="tableData3"
                          @row-click="chooseRow"
                          highlight-current-row
                          :row-class-name="tableRowClassName"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          style="width: 100%"
                        >
                          <el-table-column align="center" label="日期" width="220">
                            <template slot-scope="scope">
                              <div class="Open_time">
                                <el-date-picker
                                  v-model="scope.row.time"
                                  align="right"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  type="datetime"
                                  prefix-icon="el-icon-date"
                                  suffix-icon="el-icon-date"
                                  placeholder
                                  :picker-options="pickerOptions"
                                ></el-date-picker>
                              </div>
                            </template>
                          </el-table-column>
                          <el-table-column label="简要描述" align="center">
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.briefDescription"></el-input>
                          </template>
                          </el-table-column>
                          <el-table-column
                            label="维护后形状"
                            align="center"
                            style="background: red"
                            width="500"
                          >
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.maintainState" placeholder="请选择活动区域">
                                  <el-option  v-for="item in maintenances" :key="item.value"  :label="item.label" :value="item.value">{{item.label}}</el-option>
                                </el-select>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="存放部位" name="fourth">
                      <!-- 存放部位 -->
                      <div class="experience">
                        <el-table
                          :data="tableData4"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          @row-click="chooseRow"
                          highlight-current-row
                          :row-class-name="tableRowClassName"
                          style="width: 100%"
                        >
                          <el-table-column align="center" label="日期" width="220">
                            <template slot-scope="scope">
                              <div class="Open_time">
                                <el-date-picker
                                  v-model="scope.row.time"
                                  align="right"
                                  type="datetime"
                                  prefix-icon="el-icon-date"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  suffix-icon="el-icon-date"
                                  placeholder
                                  :picker-options="pickerOptions"
                                ></el-date-picker>
                              </div>
                            </template>
                          </el-table-column>
                          <el-table-column  label="存放部位" width="400" align="center">
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.deposit"></el-input>
                            </template>
                          </el-table-column>

                          <el-table-column  label="保管人姓名" width="270" align="center">
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.preserver"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="职务"
                            align="center"
                            style="background: red"
                            width="280"
                          >
                            <template slot-scope="scope">
                              <el-select v-model="scope.row.duty" placeholder="请选择活动区域" >
                                <el-option  v-for="item in positions" :key="item.value"  :label="item.label" :value="item.value">{{item.label}}</el-option>
                              </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column label="军衔" align="center" style="background: red">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.rank" placeholder="请选择活动区域">
                                  <el-option  v-for="item in ranks" :key="item.value"  :label="item.label" :value="item.value">{{item.label}}</el-option>
                                </el-select>
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
                      <el-input v-model="formInline.recorderName" placeholder size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="录入日期：">
                      <div class="block">
                        <el-date-picker
                          v-model="formInline.recordTime"
                          type="date"
                          size="small"
                          prefix-icon="el-icon-date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期时间">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="right">
                  <div class="one_icon" @click="The_modify" title="保存"></div>
                  <div class="two_icon" title="打印"></div>
                  <div class="three_icon" title="疑难"></div>
                  <div class="four_icon" title="关闭"></div>
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
import headerIcon from '@/assets/img/icon/header/equipment.png'
export default {
  name: 'details_information',
  components: {
    commonHeader
  },
  inject: ['reload'],
  data () {
    return {
      headChange: {
        title: '潜水装备管理系统',
        headIcon: headerIcon
      },
      form: {},
      value1: '',
      value2: '',
      activeName: 'first',
      id: this.$route.params.id,
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      categorys: [],
      mode: [],
      respiratory: [],
      ways: [],
      fault: [],
      consequences: [],
      maintenances: [],
      positions: [],
      ranks: [],
      aaaaa: [],
      // 几个标识 代表某一模块某一行是否被选中点击
      rowQuaSign: false,
      rowEduSign: false,
      rowExpSign: false,
      rowAccSign: false,
      rowHealSign: false,
      // 当前行
      curRow: '',
      formInline: {
        'number': '',
        'diveEquipmentCategory': '',
        'diveEquipmentCategoryType': '',
        'institution': '',
        'productionUnit': ''
      },
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
  created () {
    this.Data_request()
    this.category()
    this.models()
    this.Respiratory_gases()
    this.way()
    this.fault_types()
    this.consequence()
    this.Maintaining_state()
    this.position()
    this.rank()
  },
  methods: {
    get_id (a) {
      for (let i of this.categorys) {
        if (i.value === a) {
          let _this = this
          _this.$http({
            url: _this.$http.adornUrl('/sys/dict/getOneType'),
            method: 'POST',
            data: {
              'type': 'dive_equipment_category_type',
              'parentId': i.id
            }
          }).then(({data}) => {
            if (data.code === 0) {
              _this.mode = data.dict
            }
          })
        }
      }
    },
    Data_request () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/dive/dediveequipment/info/' + _this.id),
        method: 'POST'
      }).then(({data}) => {
        if (data.code === 0) {
          console.log(data)
          _this.tableData1 = data.deDiveEquipmentVo.deExperienceEntityList
          _this.tableData2 = data.deDiveEquipmentVo.deMalfunctionEntityList
          _this.tableData3 = data.deDiveEquipmentVo.deMaintainEntityList
          _this.tableData4 = data.deDiveEquipmentVo.deDepositEntityList
          _this.formInline = data.deDiveEquipmentVo.deDiveEquipmentEntity
        }
      })
    },
    // 刷新
    refresh () {
      this.reload()
    },
    category () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: {
          'type': 'dive_equipment_category'
        }
      }).then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          _this.categorys = data.dict
          console.log(_this.categorys)
        }
      })
    },
    models () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: {
          'type': 'dive_equipment_category_type',
          'parentId': this.category_id
        }
      }).then(({data}) => {
        if (data.code === 0) {
          _this.mode = data.dict
          console.log(_this.mode)
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
        // 潜水经历
        _this.tableData1.push({'time': '', 'depth': '', 'respiratoryGases': '', 'manner': '', 'diveTime': '', 'briefDescription': ''})
      } else if (_this.activeName === 'second') {
        // 故障记录
        _this.tableData2.push({'time': '', 'type': '', 'consequence': '', 'briefDescription': ''})
      } else if (_this.activeName === 'third') {
        // 维护记录
        _this.tableData3.push({'time': '', 'briefDescription': '', 'maintainState': '', 'diveMode': '', 'described': ''})
      } else {
        // 存放部位
        _this.tableData4.push({'time': '', 'deposit': '', 'preserver': '', 'duty': '', 'rank': '', 'described': ''})
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
          _this.sureDelete(_this, _this.tableData1, _this.rowQuaSign)
        } else {
          _this.rowNull(_this)
        }
      } else if (_this.activeName === 'second') {
        // 教育培训
        if (_this.rowEduSign) {
          _this.sureDelete(_this, _this.tableData2, _this.rowEduSign)
        } else {
          _this.rowNull(_this)
        }
      } else if (_this.activeName === 'third') {
        // 潜水经历
        if (_this.rowExpSign) {
          _this.sureDelete(_this, _this.tableData3, _this.rowExpSign)
        } else {
          _this.rowNull(_this)
        }
      } else {
        // 潜水事故
        if (_this.rowAccSign) {
          _this.sureDelete(_this, _this.tableData4, _this.rowAccSign)
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
    Respiratory_gases () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: {
          'type': 'accident_cylinder_gas'
        }
      }).then(({data}) => {
        if (data.code === 0) {
          _this.respiratory = data.dict
        }
      })
    },
    way () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: {
          'type': 'dive_equipment_experience_manner'
        }
      }).then(({data}) => {
        if (data.code === 0) {
          _this.ways = data.dict
        }
      })
    },
    fault_types () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: {
          'type': 'dive_equipment_malfunction_type'
        }
      }).then(({data}) => {
        if (data.code === 0) {
          _this.fault = data.dict
        }
      })
    },
    consequence () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: {
          'type': 'dive_equipment_malfunction_consequence'
        }
      }).then(({data}) => {
        if (data.code === 0) {
          _this.consequences = data.dict
        }
      })
    },
    Maintaining_state () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: {
          'type': 'dive_equipment_maintain_state'
        }
      }).then(({data}) => {
        if (data.code === 0) {
          _this.maintenances = data.dict
        }
      })
    },
    position () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: {
          'type': 'people_duty'
        }
      }).then(({data}) => {
        if (data.code === 0) {
          _this.positions = data.dict
        }
      })
    },
    rank () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: {
          'type': 'people_duty'
        }
      }).then(({data}) => {
        if (data.code === 0) {
          _this.ranks = data.dict
        }
      })
    },
    The_modify () {
      let _this = this
      var a = {}
      this.tableData1.forEach(item => {
        parseInt(item.depth)
      })
      a.deDiveEquipmentEntity = _this.formInline
      a.deDepositEntityList = _this.tableData4
      a.deExperienceEntityList = _this.tableData1
      a.deMaintainEntityList = _this.tableData3
      a.deMalfunctionEntityList = _this.tableData2
      console.log(a)
      _this.$http({
        url: _this.$http.adornUrl('/dive/dediveequipment/save'),
        method: 'POST',
        data: a
      }).then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          })
          this.refresh()
        }
      })
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
    handleClick (tab, event) {
    },
    handlemyclass (row, column, rowIndex, columnIndex) {
      if (row.columnIndex !== 5) {
        return 'txt'
      }
    },
    headerstyle () {
      return 'background:rgba(244,249,255,1)'
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
}
// 背景
.modify_detail {
  background: #eeeeee;
  width: 100%;
  overflow: hidden;
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

      .block_two {
        display: inline-block;
        margin-right: 133px;
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
    }
  }
}
.black {
  display: inline-block;
  margin-right: 20px;
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
.one .el-form--inline .el-form-item {
  margin-right: 23px;
}
</style>




<style lang="scss">
.modify_detail {
  .el-tabs__content {
    min-height: 450px;
  }
  .three_two .el-input__prefix {
    right: -375px !important;
  }
  .block_two .el-input--medium .el-input__inner {
    width: 310px;
    display: inline-block;
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
  //职业的长度
  .a .el-input {
    width: 490px;
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
    color: rgba(153, 153, 153, 1);
    padding: 0px 30px;
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
    color: rgba(102, 102, 102, 1);
  }
  .entry .el-form-item {
    margin-bottom: 0 !important;
  }
  .qualificati .el-input__prefix {
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    right: -880px;
  }
  .training .el-input__prefix {
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    right: -150px;
  }

  .experience .el-date-editor.el-input {
    width: 100%;
  }
}
.modify_detail .el-form-item__content {
  width: 60%;
}
.modify_detail .el-table {
  font-size: 18px;
}
</style>

