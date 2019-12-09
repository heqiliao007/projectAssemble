<template>
    <div>
        <!-- <common-header :headChange="headChange"></common-header>
        <el-row class="plan">
          <el-col :span="4">
              <common-plan-sidebar :curIndex='curIndex'></common-plan-sidebar>
          </el-col>
          <el-col :span="20"> -->
            <el-row class="grid-content" style="position: relative;">
              <div style="position:absolute;right:39px;top:40px;z-index: 2;">
                <span class="add-del" @click="reduceTopData" style="margin-right:10px;">
                  <img src="../../../assets/img/figure/narrow.png"/>
                </span>
                <span class="add-del" @click="addTopData" >  
                  <img src="../../../assets/img/figure/enlarge.png"/>
                </span>
              </div>
              <!-- 上面tab -->
              <el-tabs v-model="activeName" class="tabs" style="height:300px;">
                <!-- 作业平台 -->
                <el-tab-pane label="作业平台" name="first" class="platform">
                  <!-- :header-cell-class-name="headerstyle" -->
                    <el-table
                      border
                      max-height="200"
                      :data = "homeWorkData"
                      :cell-style="{fontSize:'18px'}"
                      class="homework_table tables"
                      @row-click="chooseRow"
                      highlight-current-row
                      :row-class-name="tableRowClassName"
                      :header-cell-class-name="rowClass"
                      >
                      <el-table-column label="作业平台" align="center">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.platform"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="负责人" align="center">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.person"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="负责人职务" align="center">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.post">
                              <el-option  v-for="item in chargePostSelection" :key="item.value"  :label="item.label" :value="item.value">{{item.label}}</el-option>
                            </el-select>
                        </template>
                      </el-table-column>
                  </el-table>
                </el-tab-pane>
                <!-- 潜水装具 -->
                <el-tab-pane label="潜水装具" name="second">
                  <el-tabs :tab-position="tabPosition" style="height: 200px;" class="left_table" v-model="diveDevice">
                    <!-- 潜水装具--作业装具 -->
                    <el-tab-pane label="作业装具" name="first">
                      <el-table
                        border
                        max-height="200"
                        :data = "diveWorkData"
                        :cell-style="{fontSize:'18px'}"
                        class="tables"
                        @row-click="chooseRow"
                        highlight-current-row
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="rowClass"
                        >
                        <el-table-column label="装备名称" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.name"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="需要数量" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.number" type="number"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="来源" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.region"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="负责人" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.person"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="负责人职务" align="center">
                          <template slot-scope="scope">
                            <el-select v-model="scope.row.post">
                              <el-option  v-for="item in chargePostSelection" :key="item.value"  :label="item.label" :value="item.value">{{item.label}}</el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-tab-pane>
                    <!-- 作业装具--辅助装具 -->
                    <el-tab-pane label="辅助装具" name="second">
                      <el-table
                        border
                        max-height="190"
                        :data = "harnessData"
                        :cell-style="{fontSize:'18px'}"
                        class="tables"
                        @row-click="chooseRow"
                        highlight-current-row
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="rowClass"
                        >
                        <el-table-column label="装备名称" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.name"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="需要数量" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.number" type="number"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="来源" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.region"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="负责人" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.person"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="负责人职务" align="center">
                          <template slot-scope="scope">
                           <el-select v-model="scope.row.post">
                              <el-option  v-for="item in chargePostSelection" :key="item.value"  :label="item.label" :value="item.value">{{item.label}}</el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                      </el-table> 
                    </el-tab-pane>
                  </el-tabs>
                </el-tab-pane>
                <!-- 供气系统 -->
                <el-tab-pane label="供气系统" name="third">
                  <el-tabs :tab-position="tabPosition" style="height: 200px;" class="left_table" v-model="supplySystem">
                    <!-- 供气系统--空气压榨机 -->
                    <el-tab-pane label="空气压榨机" name="first">
                      <el-table
                        border
                        max-height="200"
                        :data = "supplyAirData"
                        :cell-style="{fontSize:'18px'}"
                        class="tables"
                        @row-click="chooseRow"
                        highlight-current-row
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="rowClass"
                        >
                        <el-table-column label="装备名称" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.name"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="需要数量" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.number" type="number"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="产（储）气量" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.production"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="负责人" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.person"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="负责人职务" align="center">
                          <template slot-scope="scope">
                            <el-select v-model="scope.row.post">
                              <el-option  v-for="item in chargePostSelection" :key="item.value"  :label="item.label" :value="item.value">{{item.label}}</el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                      </el-table> 
                    </el-tab-pane>
                    <!-- 供气系统--储供气系统 -->
                    <el-tab-pane label="储供气系统" name="second">
                      <el-table
                        border
                        max-height="200"
                        :data = "supplyStoreData"
                        :cell-style="{fontSize:'18px'}"
                        class="tables"
                        @row-click="chooseRow"
                        highlight-current-row
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="rowClass"
                        >
                        <el-table-column label="装备名称" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.name"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="需要数量" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.number" type="number"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="产（储）气量" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.production"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="负责人" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.person"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="负责人职务" align="center">
                          <template slot-scope="scope">
                            <el-select v-model="scope.row.post">
                              <el-option  v-for="item in chargePostSelection" :key="item.value"  :label="item.label" :value="item.value">{{item.label}}</el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-tab-pane>
                    <!-- 供气系统--配气系统 -->
                     <el-tab-pane label="配气系统" name="third">
                      <el-table
                        border
                        max-height="200"
                        :data = "supplyDisposeData"
                        :cell-style="{fontSize:'18px'}"
                        class="tables"
                        @row-click="chooseRow"
                        highlight-current-row
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="rowClass"
                        >
                        <el-table-column label="装备名称" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.name"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="需要数量" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.number" type="number"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="产（储）气量" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.production"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="负责人" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.person"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="负责人职务" align="center">
                          <template slot-scope="scope">
                            <el-select v-model="scope.row.post">
                              <el-option  v-for="item in chargePostSelection" :key="item.value"  :label="item.label" :value="item.value">{{item.label}}</el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-tab-pane>
                  </el-tabs>
                </el-tab-pane>
                <!-- 加压仓和潜水钟系统 -->
                <el-tab-pane label="加压仓和潜水钟系统" name="fourth">
                    <el-tabs :tab-position="tabPosition" style="height: 200px;" class="left_table" v-model="addAndTime">
                      <!-- 加压仓和潜水钟系统--加压仓系统 -->
                    <el-tab-pane label="加压仓系统" name="first">
                      <el-table
                        border
                        max-height="200"
                        :data = "addPreData"
                        :cell-style="{fontSize:'18px'}"
                        class="pressure_table tables"
                        @row-click="chooseRow"
                        highlight-current-row
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="rowClass"
                        >
                        <el-table-column label="来源" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.region"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="工作压(MPA)" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.pressure"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="可供气源类型" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.type"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="负责人" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.person"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="负责人职务" align="center">
                          <template slot-scope="scope">
                            <el-select v-model="scope.row.post">
                              <el-option  v-for="item in chargePostSelection" :key="item.value"  :label="item.label" :value="item.value">{{item.label}}</el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                      </el-table> 
                    </el-tab-pane>
                    <!-- 加压仓和潜水钟系统--潜水钟系统 -->
                    <el-tab-pane label="潜水钟系统" name="second">
                      <el-table
                        border
                        max-height="200"
                        :data = "diveTimeData"
                        :cell-style="{fontSize:'18px'}"
                        class="harness_table tables"
                        @row-click="chooseRow"
                        highlight-current-row
                        :row-class-name="tableRowClassName"
                        :header-cell-class-name="rowClass"
                        >
                        <el-table-column label="来源" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.region"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="工作压(MPA)" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.pressure"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="可供气源类型" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.type"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="负责人" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.person"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="负责人职务" align="center">
                          <template slot-scope="scope">
                            <el-select v-model="scope.row.post">
                              <el-option  v-for="item in chargePostSelection" :key="item.value"  :label="item.label" :value="item.value">{{item.label}}</el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-tab-pane>
                  </el-tabs>
                </el-tab-pane>
              </el-tabs>
              </el-row>

              <!-- 下面tab -->
              <el-row class="grid-content" style="position:relative;">
                <span style="position:absolute;right:39px;top:40px;" class="add-del">
                  <img src="../../../assets/img/figure/narrow.png" style="margin-right:10px;"/>
                  <img src="../../../assets/img/figure/enlarge.png"/>
                </span>
                <el-tabs v-model="activeName1" class="tabs" style="height:300px;">
                    <!-- 辅助设备 -->
                    <el-tab-pane label="其他辅助设备" name="first" class="auxiliary">
                      <!-- :header-cell-class-name="headerstyle" -->
                        <el-table
                          border
                          max-height="200"
                          :data = "auxiliaryData"
                          :cell-style="{fontSize:'18px'}"
                          class="auxiliary_table tables"
                          :header-cell-class-name="rowClass"
                          >
                          <el-table-column label="名称" align="center">
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.name"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column label="来源" align="center">
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.region"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column label="性能指标" align="center">
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.performance"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column label="负责人" align="center">
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.person"></el-input>
                            </template>
                          </el-table-column>
                          <!-- 负责人 -->
                          <el-table-column label="负责人职务">
                            <template slot-scope="scope">
                              <el-select v-model="scope.row.post">
                                <el-option  v-for="item in chargePostSelection" :key="item.value"  :label="item.label" :value="item.value">{{item.label}}</el-option>
                              </el-select>
                            </template>
                          </el-table-column>
                      </el-table>
                    </el-tab-pane>
                    <!-- 水下作业工具 -->
                    <el-tab-pane label="水下作业工具" name="second" class="work_tool">
                        <!-- :header-cell-class-name="headerstyle" -->
                      <el-table
                        border
                        max-height="200"
                        :data = "toolData"
                        :cell-style="{fontSize:'18px'}"
                        class="dive_hw_table tables"
                        :header-cell-class-name="rowClass"
                      >
                      <el-table-column label="名称" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.name"></el-input>
                          </template>=】
                        </el-table-column>
                        <el-table-column prop="region" label="来源" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.region"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="性能" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.performance"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="需要数量" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.number" type="number"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="负责人" align="center">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.person"></el-input>
                          </template>
                        </el-table-column>
                        <!-- 负责人 -->
                        <el-table-column label="负责人职务">
                          <template slot-scope="scope">
                            <el-select v-model="scope.row.post">
                              <el-option v-for="item in chargePostSelection" :key="item.value"  :label="item.label" :value="item.value">{{item.label}}</el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-tab-pane>
                  </el-tabs>
                  <!-- 底部icon -->
                  <el-row  type="flex" justify="end" class="icons">
                    <span class="one_icon" title="保存">
                    </span>
                    <span class="two_icon" title="打印">
                    </span>
                    <span class="three_icon" title="疑难">
                    </span>
                    <span class="four_icon"  title="关闭">
                    </span>
                  </el-row>
              </el-row>
          <!-- </el-col>
        </el-row> -->
    </div>
</template>

<script>
export default {
  name: 'PlanEquipment',
  data () {
    return {
      // 方向
      tabPosition: 'left',
      // 上面整体tab
      activeName: 'first',
      // 潜水装具tab
      diveDevice: 'first',
      // 供气系统tab
      supplySystem: 'first',
      // 加压舱和潜水钟系统tab
      addAndTime: 'first',
      // 下面tab
      activeName1: 'first',
      // 作业平台
      homeWorkData: [],
      // 作业装具
      diveWorkData: [],
      // 辅助装具
      harnessData: [],
      // 空气压榨机
      supplyAirData: [],
      // 储供气系统
      supplyStoreData: [],
      // 配气系统
      supplyDisposeData: [],
      // 加压系统
      addPreData: [],
      // 潜水钟系统
      diveTimeData: [],
      // 其他辅助设备
      auxiliaryData: [],
      // 水下作业工具
      toolData: [],
      // 表格相应的标识 代表某一模块某一行是否被选中点击
      rowHomeSign: false,
      rowHarnessSign: false,
      rowWorkSign: false,
      rowAirSign: false,
      rowStoreSign: false,
      rowDisposeSign: false,
      rowPreSign: false,
      rowTimeSign: false,
      rowAuxiliarySign: false,
      rowToolSign: false,
      // 负责人职务选项
      chargePostSelection: ''
    }
  },
  mounted () {
    this.getChargePost()
  },
  methods: {
    rowClass (row) {
      return 'rowClass'
    },
    // 给每一行添加索引
    tableRowClassName ({row, rowIndex}) {
      row.index = rowIndex
    },
    // 选择某一行
    chooseRow (row, event, column) {
      let _this = this
      _this.curRow = row.index
       // 作业平台
      if (_this.activeName === 'first') {
        _this.rowHomeSign = true
      // 潜水装具
      } else if (_this.activeName === 'second') {
        if (_this.diveDevice === 'first') {
          // 作业装具
          _this.rowWorkSign = true
        } else {
          // 辅助装具
          _this.rowHarnessSign = true
        }
      // 供气系统
      } else if (_this.activeName === 'third') {
        if (_this.supplySystem === 'first') {
          // 空气压缩机
          _this.rowAirSign = true
        } else if (_this.supplySystem === 'second') {
          // 储供气系统
          _this.rowAuxiliarySign = true
        } else {
          // 配气系统
          _this.rowDisposeSign = true
        }
        // 加压舱和潜水钟系统
      } else {
        if (_this.diveDevice === 'first') {
          // 加压舱系统
          _this.rowPreSign = true
        } else {
          // 潜水钟系统
          _this.rowTimeSign = true
        }
      }
      if (_this.activeName1 === 'first') {
          // 其他辅助设备
        _this.rowAuxiliarySign = true
      } else {
          // 水下作业工具
        _this.rowToolSign = true
      }
    },
    // 添加行
    addTopData () {
      let _this = this
       // 作业平台
      if (_this.activeName === 'first') {
        _this.homeWorkData.push({'platform': '', 'person': '', 'post': ''})
      // 潜水装具
      } else if (_this.activeName === 'second') {
        if (_this.diveDevice === 'first') {
          // 作业装具
          _this.diveWorkData.push({'name': '', 'number': '', 'region': '', 'person': '', 'post': ''})
        } else {
          // 辅助装具
          _this.harnessData.push({'name': '', 'number': '', 'region': '', 'person': '', 'post': ''})
        }
      // 供气系统
      } else if (_this.activeName === 'third') {
        if (_this.supplySystem === 'first') {
          // 空气压缩机
          _this.supplyAirData.push({'name': '', 'number': '', 'production': '', 'person': '', 'post': ''})
        } else if (_this.supplySystem === 'second') {
          // 储供气系统
          _this.supplyStoreData.push({'name': '', 'number': '', 'production': '', 'person': '', 'post': ''})
        } else {
          // 配气系统
          _this.supplyDisposeData.push({'name': '', 'number': '', 'production': '', 'person': '', 'post': ''})
        }
        // 加压舱和潜水钟系统
      } else {
        if (_this.diveDevice === 'first') {
          // 加压舱系统
          _this.addPreData.push({'region': '', 'pressure': '', 'type': '', 'person': '', 'post': ''})
        } else {
          // 潜水钟系统
          _this.diveTimeData.push({'region': '', 'pressure': '', 'type': '', 'person': '', 'post': ''})
        }
      }
    },
    // 删除一行
    reduceTopData () {
      let _this = this
      // console.log(_this.activeName)
      if (_this.activeName === 'first') {
        // 潜水资格
        if (_this.rowDiveSign) {
          _this.sureDelete(_this, _this.divingWorkData, _this.rowDiveSign)
        } else {
          _this.rowNull(_this)
        }
      } else if (_this.activeName === 'second') {
        // 医学保障
        if (_this.rowMedicalSign) {
          _this.sureDelete(_this, _this.medicalSecuryData, _this.rowMedicalSign)
        } else {
          _this.rowNull(_this)
        }
      } else {
        // 设备保障
        if (_this.rowEquipSign) {
          _this.sureDelete(_this, _this.deviceSecuryData, _this.rowEquipSign)
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
    // 输入框为空弹窗
    inputNull (text) {
      this.$confirm(`${text}?`, '确认', {
        confirmButtonText: '确定',
        showCancelButton: false,
        type: 'warning'
      }).then(() => {
        return false
      }).catch(() => {
        return false
      })
    },
    // 负责人职务
    getChargePost () {
      this.$http({
        url: this.$http.adornUrl('/sys/dict/getOneType'),
        method: 'POST',
        data: this.$http.adornData({
          'type': 'people_duty'
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          console.log(data)
          this.chargePostSelection = data.dict
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/index.scss';
    /deep/ .tabs .rowClass{
        background-color: #F7FBFF;
        border-bottom: none;
        font-size: $text-size18;
        color: #666;
        border-left: 1px solid #AACEFE;
        &:first-of-type{
            border-left: 0;
        }
    }
    /deep/ .tabs .el-tabs__item{
      font-size: $text-size24;
      color: $color-text-999;
    }
    /deep/ .tabs .left_table .el-tabs__item{
      font-size: $text-size18;
      color: $color-text-666;
      background-color: $color-bg;
    }
    /deep/ .tabs .left_table .el-tabs__item.is-active{
      color: $color-bg-white;
      background-color: $color-border-blue;
    }
    /deep/ .tabs .left_table .el-tabs__active-bar{
       height: 0!important;
     }
    /deep/ .tabs .el-tabs--left .el-tabs__nav-wrap.is-left{
      margin-right: 0px;
     }
    /deep/ .tabs  .el-tabs__header{
      margin: 6px 0 15px;
    }
    /deep/ .tabs .left_table .el-tabs__header{
      padding-top: 11px;
    }
    /deep/ .tabs .el-tabs__item.is-active,/deep/ .tab-top  .el-tabs__item:hover{
      color: $color-bg-blue;
    }
    /deep/ .tabs .el-tabs__nav-wrap::after{
      height: 0;
    }
    /deep/ .tabs .el-tabs__active-bar{
      height: 0;
    }
    /deep/ .tabs .el-select-dropdown__list .el-select-dropdown__item{
      font-size: $text-size18;
    }
    /deep/ .tabs .el-input--medium{
      font-size: $text-size18;
    }
    /deep/ .tabs .el-input__inner{
        border: none;
    }
    .plan{
      background-color: $color-bg;
      display: flex;
      align-items: stretch;
      .grid-content {
        margin:28px 39px 10px 28px;
        background-color: $color-bg-white;
        padding: 32px;
          .tables{
            border: 1px solid $color-border-blue;
            margin-top:17px;
            input{
              width:100%;
              height: 100%;
              border: 0;
            }
          }
          .add-del{
            & img{
              width: 36px;
              height: 36px;
              cursor: pointer;
            }
          }
          .icons{
            height: 58px;
            padding-top:18px;
            & span{
                width: 36px;
                height: 36px;
                display: inline-block;
                cursor: pointer;
                margin-left: 10px;
            }
            .one_icon {
                background: url(../../../assets/img/figure/baocun.png);
                background-size:100% 100%;
                
            }
            .one_icon:hover {
                background: url(../../../assets/img/figure/baocun_select.png);
                background-size:100% 100%;
            }
            .two_icon {
                background: url(../../../assets/img/figure/dayin.png);
                background-size:100% 100%;
            }
            .two_icon:hover {
                background: url(../../../assets/img/figure/dayin_select.png);
                background-size:100% 100%;
            }
            .three_icon {
                background: url(../../../assets/img/figure/help_icon.png);
                background-size:100% 100%;

            }
            .three_icon:hover {
                background: url(../../../assets/img/figure/help_select.png);
                background-size:100% 100%;
            }
            .four_icon {
                background: url(../../../assets/img/figure/guanbi.png);
                background-size:100% 100%;
            }
            .four_icon:hover {
                background: url(../../../assets/img/figure/guanbi_select.png);
                background-size:100% 100%;
            }
          } 
      }
    }
</style>
