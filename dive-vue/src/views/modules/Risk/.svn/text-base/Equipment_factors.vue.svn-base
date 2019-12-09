<template>
  <div class="risk">
    <!-- <common-header :headChange="headChange"></common-header>
    <div class="box">
      <el-row class="plan">
        <el-col :span="4">
          <common-plan-sidebar :curIndex="curIndex"></common-plan-sidebar>
        </el-col>
        <el-col :span="20"> -->
          <el-col :span="24">
          <div style="background:#eeeeee; min-height:840px; overflow: hidden;">
            <div class="box_one">
              <div class="add" style="position: absolute; top: 33px;right: 32px;" v-if="judge">
                <span class="minus">
                  <i class="el-icon-minus"></i>
                  <i class="el-icon-plus"></i>
                </span>
              </div>
              <el-tabs
                v-model="activeName"
                @tab-click="handleClick"
                style="width: 95%;margin: 30px auto;"
              >
                <el-tab-pane label="作业平台" name="second">
                  <div class="border_one" style="border: 2px solid #AACEFE;">
                    <div class="top" style="min-height:640px;">
                      <el-table
                        :data="tableData"
                        :header-cell-class-name="handlemyclass"
                        :header-cell-style="headerstyle"
                        style="width: 100%;"
                      >
                        <el-table-column align="center">
                        <el-table-column prop="date" label="装备名称" align="center" width="220"></el-table-column>
                        </el-table-column>
                        <el-table-column align="center">
                        <el-table-column prop="date" label="可能出现的问题" align="center" width="260"></el-table-column>
                        </el-table-column>

                        <el-table-column label="发生可能" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="值(%)" align="center" ></el-table-column>
                        </el-table-column>

                        <el-table-column label="影响程度" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="值" align="center" ></el-table-column>
                        </el-table-column>
                        <el-table-column label="作业风险" align="center">
                        <el-table-column prop="date" label="值" align="center" ></el-table-column>
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
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
                <el-tab-pane label="潜水装具" name="first">
                    <div class="small_tabs">
                      <el-tabs tab-position="left" style="height: 650px;">
                        <el-tab-pane label="作业装具">
                        <div class="tops" style="min-height:650px;">
                          <div style="border: 2px solid #AACEFE; min-height:540px;">
                        <el-table
                        :data="tableData"
                        :header-cell-class-name="handlemyclass"
                        :header-cell-style="headerstyle"
                        style="width: 100%;"
                      >
                        <el-table-column align="center">
                        <el-table-column prop="date" label="装备名称" align="center" width="220"></el-table-column>
                        </el-table-column>
                        <el-table-column align="center">
                        <el-table-column prop="date" label="可能出现的问题" align="center" width="260"></el-table-column>
                        </el-table-column>

                        <el-table-column label="发生可能" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="值(%)" align="center" ></el-table-column>
                        </el-table-column>

                        <el-table-column label="影响程度" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="值" align="center" ></el-table-column>
                        </el-table-column>
                        <el-table-column label="作业风险" align="center">
                        <el-table-column prop="date" label="值" align="center" ></el-table-column>
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        </el-table-column>
                      </el-table>
                        </div>
                        <div class="right" style="position: absolute;bottom: 0px;right: 0px;">
                          <div class="one_icon" title="保存"></div>
                          <div class="two_icon" title="打印"></div>
                          <div class="three_icon" title="疑难"></div>
                          <div class="four_icon" title="关闭"></div>
                        </div>
                        </div>
                        
                        </el-tab-pane>
                        <el-tab-pane label="辅助装具">
                        <div class="tops" style="min-height:650px;">
                          <div style="border: 2px solid #AACEFE; min-height:570px;">
                        <el-table
                        :data="tableData"
                        :header-cell-class-name="handlemyclass"
                        :header-cell-style="headerstyle"
                        style="width: 100%;"
                      >
                        <el-table-column align="center">
                        <el-table-column prop="date" label="装备名称" align="center" width="220"></el-table-column>
                        </el-table-column>
                        <el-table-column align="center">
                        <el-table-column prop="date" label="可能出现的问题" align="center" width="260"></el-table-column>
                        </el-table-column>

                        <el-table-column label="发生可能" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="值(%)" align="center" ></el-table-column>
                        </el-table-column>

                        <el-table-column label="影响程度" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="值" align="center" ></el-table-column>
                        </el-table-column>
                        <el-table-column label="作业风险" align="center">
                        <el-table-column prop="date" label="值" align="center" ></el-table-column>
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        </el-table-column>
                      </el-table>
                        </div>
                        <div class="right" style="position: absolute;bottom: 0px;right: 0px;">
                          <div class="one_icon" title="保存"></div>
                          <div class="two_icon" title="打印"></div>
                          <div class="three_icon" title="疑难"></div>
                          <div class="four_icon" title="关闭"></div>
                        </div>
                        </div>
                        </el-tab-pane>
                      </el-tabs>
                      </div>
                </el-tab-pane>
                <el-tab-pane label="供气系统" name="third">
                    <div class="small_tabs">
                      <el-tabs tab-position="left" style="height: 650px;">
                        <el-tab-pane label="空压机">
                        <div class="tops" style="min-height:650px;">
                          <div style="border: 2px solid #AACEFE; min-height:540px;">
                        <el-table
                        :data="tableData"
                        :header-cell-class-name="handlemyclass"
                        :header-cell-style="headerstyle"
                        style="width: 100%;"
                      >
                        <el-table-column align="center">
                        <el-table-column prop="date" label="装备名称" align="center" width="220"></el-table-column>
                        </el-table-column>
                        <el-table-column align="center">
                        <el-table-column prop="date" label="可能出现的问题" align="center" width="260"></el-table-column>
                        </el-table-column>

                        <el-table-column label="发生可能" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="值(%)" align="center" ></el-table-column>
                        </el-table-column>

                        <el-table-column label="影响程度" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="值" align="center" ></el-table-column>
                        </el-table-column>
                        <el-table-column label="作业风险" align="center">
                        <el-table-column prop="date" label="值" align="center" ></el-table-column>
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        </el-table-column>
                      </el-table>
                        </div>
                        <div class="right" style="position: absolute;bottom: 0px;right: 0px;">
                          <div class="one_icon" title="保存"></div>
                          <div class="two_icon" title="打印"></div>
                          <div class="three_icon" title="疑难"></div>
                          <div class="four_icon" title="关闭"></div>
                        </div>
                        </div>
                        
                        </el-tab-pane>
                        <el-tab-pane label="储供气系统">
                        <div class="tops" style="min-height:650px;">
                          <div style="border: 2px solid #AACEFE; min-height:570px;">
                        <el-table
                        :data="tableData"
                        :header-cell-class-name="handlemyclass"
                        :header-cell-style="headerstyle"
                        style="width: 100%;"
                      >
                        <el-table-column align="center">
                        <el-table-column prop="date" label="装备名称" align="center" width="220"></el-table-column>
                        </el-table-column>
                        <el-table-column align="center">
                        <el-table-column prop="date" label="可能出现的问题" align="center" width="260"></el-table-column>
                        </el-table-column>

                        <el-table-column label="发生可能" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="值(%)" align="center" ></el-table-column>
                        </el-table-column>

                        <el-table-column label="影响程度" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="值" align="center" ></el-table-column>
                        </el-table-column>
                        <el-table-column label="作业风险" align="center">
                        <el-table-column prop="date" label="值" align="center" ></el-table-column>
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        </el-table-column>
                      </el-table>
                        </div>
                        <div class="right" style="position: absolute;bottom: 0px;right: 0px;">
                          <div class="one_icon" title="保存"></div>
                          <div class="two_icon" title="打印"></div>
                          <div class="three_icon" title="疑难"></div>
                          <div class="four_icon" title="关闭"></div>
                        </div>
                        </div>
                        </el-tab-pane>
                      </el-tabs>
                      </div>
                </el-tab-pane>
                <el-tab-pane label="加压舱和潜水钟" name="four">
                  <div class="small_tabs">
                      <el-tabs tab-position="left" style="height: 650px;">
                        <el-tab-pane label="加压舱系统">
                        <div class="tops" style="min-height:650px;">
                          <div style="border: 2px solid #AACEFE; min-height:540px;">
                        <el-table
                        :data="tableData"
                        :header-cell-class-name="handlemyclass"
                        :header-cell-style="headerstyle"
                        style="width: 100%;"
                      >
                        <el-table-column align="center">
                        <el-table-column prop="date" label="装备名称" align="center" width="220"></el-table-column>
                        </el-table-column>
                        <el-table-column align="center">
                        <el-table-column prop="date" label="可能出现的问题" align="center" width="260"></el-table-column>
                        </el-table-column>

                        <el-table-column label="发生可能" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="值(%)" align="center" ></el-table-column>
                        </el-table-column>

                        <el-table-column label="影响程度" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="值" align="center" ></el-table-column>
                        </el-table-column>
                        <el-table-column label="作业风险" align="center">
                        <el-table-column prop="date" label="值" align="center" ></el-table-column>
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        </el-table-column>
                      </el-table>
                        </div>
                        <div class="right" style="position: absolute;bottom: 0px;right: 0px;">
                          <div class="one_icon" title="保存"></div>
                          <div class="two_icon" title="打印"></div>
                          <div class="three_icon" title="疑难"></div>
                          <div class="four_icon" title="关闭"></div>
                        </div>
                        </div>
                        
                        </el-tab-pane>
                        <el-tab-pane label="潜水钟系统">
                        <div class="tops" style="min-height:650px;">
                          <div style="border: 2px solid #AACEFE; min-height:570px;">
                        <el-table
                        :data="tableData"
                        :header-cell-class-name="handlemyclass"
                        :header-cell-style="headerstyle"
                        style="width: 100%;"
                      >
                        <el-table-column align="center">
                        <el-table-column prop="date" label="装备名称" align="center" width="220"></el-table-column>
                        </el-table-column>
                        <el-table-column align="center">
                        <el-table-column prop="date" label="可能出现的问题" align="center" width="260"></el-table-column>
                        </el-table-column>

                        <el-table-column label="发生可能" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="值(%)" align="center" ></el-table-column>
                        </el-table-column>

                        <el-table-column label="影响程度" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="值" align="center" ></el-table-column>
                        </el-table-column>
                        <el-table-column label="作业风险" align="center">
                        <el-table-column prop="date" label="值" align="center" ></el-table-column>
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        </el-table-column>
                      </el-table>
                        </div>
                        <div class="right" style="position: absolute;bottom: 0px;right: 0px;">
                          <div class="one_icon" title="保存"></div>
                          <div class="two_icon" title="打印"></div>
                          <div class="three_icon" title="疑难"></div>
                          <div class="four_icon" title="关闭"></div>
                        </div>
                        </div>
                        </el-tab-pane>
                      </el-tabs>
                      </div>
                </el-tab-pane>
                <el-tab-pane label="其他装具" name="five">
                  <div class="small_tabs">
                      <el-tabs tab-position="left" style="height: 650px;">
                        <el-tab-pane label="其他设备">
                        <div class="tops" style="min-height:650px;">
                          <div style="border: 2px solid #AACEFE; min-height:540px;">
                        <el-table
                        :data="tableData"
                        :header-cell-class-name="handlemyclass"
                        :header-cell-style="headerstyle"
                        style="width: 100%;"
                      >
                        <el-table-column align="center">
                        <el-table-column prop="date" label="装备名称" align="center" width="220"></el-table-column>
                        </el-table-column>
                        <el-table-column align="center">
                        <el-table-column prop="date" label="可能出现的问题" align="center" width="260"></el-table-column>
                        </el-table-column>

                        <el-table-column label="发生可能" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="值(%)" align="center" ></el-table-column>
                        </el-table-column>

                        <el-table-column label="影响程度" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="值" align="center" ></el-table-column>
                        </el-table-column>
                        <el-table-column label="作业风险" align="center">
                        <el-table-column prop="date" label="值" align="center" ></el-table-column>
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        </el-table-column>
                      </el-table>
                        </div>
                        <div class="right" style="position: absolute;bottom: 0px;right: 0px;">
                          <div class="one_icon" title="保存"></div>
                          <div class="two_icon" title="打印"></div>
                          <div class="three_icon" title="疑难"></div>
                          <div class="four_icon" title="关闭"></div>
                        </div>
                        </div>
                        
                        </el-tab-pane>
                        <el-tab-pane label="水下作业工具">
                        <div class="tops" style="min-height:650px;">
                          <div style="border: 2px solid #AACEFE; min-height:570px;">
                        <el-table
                        :data="tableData"
                        :header-cell-class-name="handlemyclass"
                        :header-cell-style="headerstyle"
                        style="width: 100%;"
                      >
                        <el-table-column align="center">
                        <el-table-column prop="date" label="装备名称" align="center" width="220"></el-table-column>
                        </el-table-column>
                        <el-table-column align="center">
                        <el-table-column prop="date" label="可能出现的问题" align="center" width="260"></el-table-column>
                        </el-table-column>

                        <el-table-column label="发生可能" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="值(%)" align="center" ></el-table-column>
                        </el-table-column>

                        <el-table-column label="影响程度" align="center">
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="值" align="center" ></el-table-column>
                        </el-table-column>
                        <el-table-column label="作业风险" align="center">
                        <el-table-column prop="date" label="值" align="center" ></el-table-column>
                        <el-table-column prop="date" label="等级" align="center" >
                          <template slot-scope="scope">
                              <el-select v-model="scope.row.certificate">
                                <!-- educationSelection -->
                              <el-option v-for="(item,index) in educationSelection" :key="index" :label="item.label" :value="item.value"></el-option>
                              </el-select>
                          </template>
                        </el-table-column>
                        </el-table-column>
                      </el-table>
                        </div>
                        <div class="right" style="position: absolute;bottom: 0px;right: 0px;">
                          <div class="one_icon" title="保存"></div>
                          <div class="two_icon" title="打印"></div>
                          <div class="three_icon" title="疑难"></div>
                          <div class="four_icon" title="关闭"></div>
                        </div>
                        </div>
                        </el-tab-pane>
                      </el-tabs>
                      </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          </el-col>
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
  name: 'Equipment_factors',
  data () {
    return {
      judge: true,
      activeClass: -1,
      educationSelection: ['ddd', 'fsfg', 'skks'],
      dialogVisible: false,
      activeName: 'second',
      tableData: [
        {
          date: '2016',
          name: '0',
          address: ' 1518 '
        }
      ],
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
      },
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
    },
    handlemyclass (row, column, rowIndex, columnIndex) {
      console.log(row.columnIndex)
      if (row.columnIndex !== 5) {
        console.log(row, column, rowIndex, columnIndex)
        return 'txt'
      }
    },
    headerstyle () {
      return 'background:rgba(244,249,255,1)'
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
  width: 300px;
  height: 40px;
  font-size: 30px;
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
.risk {
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
      font-size: 22px;
      font-family: PingFang-SC-Regular;
      font-weight: bold;
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
  //input去掉边框
.risk .el-input--medium .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: 1px;
}
.small_tabs .el-tabs__item {
  font-size: 18px;
  font-family: PingFang-SC-Regular;
  color: #666666;
  padding: 0px 30px;
  background: #eeeeee;
}
.small_tabs .el-tabs--left .el-tabs__item.is-left {
    text-align: center;
}
.small_tabs .el-tabs__item.is-active {
  color: #666666!important;
  background: #AACEFE;
}
.small_tabs .el-tabs--bottom .el-tabs--left .el-tabs__item:last-child, .el-tabs--bottom .el-tabs--right .el-tabs__item:last-child, .el-tabs--bottom.el-tabs--border-card .el-tabs__item:last-child, .el-tabs--bottom.el-tabs--card .el-tabs__item:last-child, .el-tabs--top .el-tabs--left .el-tabs__item:last-child, .el-tabs--top .el-tabs--right .el-tabs__item:last-child, .el-tabs--top.el-tabs--border-card .el-tabs__item:last-child, .el-tabs--top.el-tabs--card .el-tabs__item:last-child {
    padding-right: 25px;
}
.small_tabs .el-tabs--bottom .el-tabs--left .el-tabs__item:nth-child(2), .el-tabs--bottom .el-tabs--right .el-tabs__item:nth-child(2), .el-tabs--bottom.el-tabs--border-card .el-tabs__item:nth-child(2), .el-tabs--bottom.el-tabs--card .el-tabs__item:nth-child(2), .el-tabs--top .el-tabs--left .el-tabs__item:nth-child(2), .el-tabs--top .el-tabs--right .el-tabs__item:nth-child(2), .el-tabs--top.el-tabs--border-card .el-tabs__item:nth-child(2), .el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2) {
    padding-left: 30px;
}
//去掉选项卡下面的横线
.el-tabs--left .el-tabs__nav-wrap.is-left::after, .el-tabs--left .el-tabs__nav-wrap.is-right::after, .el-tabs--right .el-tabs__nav-wrap.is-left::after, .el-tabs--right .el-tabs__nav-wrap.is-right::after {
    height: 100%;
    width: 0;
    bottom: auto;
    top: 0;
}
  .el-tabs__active-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 0px!important;
  background-color: #ffffff;
  z-index: 1;
}
}
// .box_one .el-tabs__content {
//   min-height: 100%;
// }
</style>

