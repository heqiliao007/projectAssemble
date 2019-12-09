<template>
<div>
  <common-header :headChange='headChange'></common-header>
  <div class="box">
    <div class="fault">
      <!-- 标题 -->
      <el-row :gutter="20">
        <el-col :span="22" :offset="1">
          <div class="title">潜水事故/意外事故/设备故障报告</div>
        </el-col>
      </el-row>
      <!-- 表单 -->
      <el-row :gutter="20">
        <el-col :span="22" :offset="1">
          <div class="form_retrieval">
            <!-- 选项卡 -->
            <div class="tabs">
              <div class="left">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="事故描述" name="second">
                    <!-- 事故描述 -->
                    <div class="experience">
                      <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-row>
                          <el-col :span="10">
                            <el-form-item style="font-weight:500">
                              <div slot="label">单位：</div>
                              <el-select v-model="form.region" placeholder size="mini" style="width:32%">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                              <el-select v-model="form.region" placeholder size="mini" style="width:32%">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                              <el-select v-model="form.region" placeholder size="mini" style="width:33%">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <div class="block_right">
                              <span class="el-form-item__label" style="font-weight:500">日期：</span>
                              <el-date-picker v-model="value1" type="date" size="mini"></el-date-picker>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item style="width:100%">
                              <div slot="label" style="font-weight:500">时间：</div>
                                <el-input
                                  v-model="formInline.user"
                                  placeholder
                                  size="mini"
                                  style="width:88%"
                                ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>

                        <div class="one">
                          <el-col :span="10" style="padding-left: 0;">
                            <div class="one_left">
                              <span>活动及时机</span>
                            </div>
                          </el-col>
                          <el-col :span="14" style="padding-left: 0;">
                            <div class="one_right">
                              <span>设计装备人员</span>
                            </div>
                          </el-col>
                        </div>

                        <el-row>
                          <el-col :span="4">
                            <el-form-item label="活动：" style="font-weight:500">
                              <el-select
                                v-model="form.region"
                                placeholder
                                size="mini"
                              >
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="发生时机：" style="font-weight:500">
                              <el-select
                                v-model="form.region"
                                placeholder
                                size="mini"
                                style="width:60%"
                              >
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="涉及：" style="font-weight:500">
                              <div slot="label" style="padding-right:6px">涉及：</div>
                              <el-select
                                v-model="form.region"
                                placeholder
                                size="mini"
                                style="width:215px"
                              >
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item style="width:100%">
                              <div slot="label" style="font-weight:500">描述：</div>
                                <el-input
                                  v-model="formInline.user"
                                  placeholder
                                  size="mini"
                                  style="width:88%"
                                ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>

                        <div class="one">
                          <el-col :span="24" style="padding-left: 0;">
                            <div class="one_left">
                              <span>地点</span>
                            </div>
                          </el-col>
                        </div>

                        <el-row>
                          <el-col :span="10">
                            <el-form-item label="性质： " style="font-weight:500; width:100%">
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
                          <el-col :span="12">
                              <span style="font-size:18px;">地理位置：</span>
                                <el-input
                                  v-model="formInline.user"
                                  placeholder
                                  size="mini"
                                  style="width:82%"
                                ></el-input>
                          </el-col>
                        </el-row>

                        <el-row>
                          <el-col :span="24">
                            <div style="font-size:18px">意外简述</div>
                            <el-input
                              type="textarea"
                              v-model="form.desc"
                              style="width: 90%; margin-top: 20px"
                            ></el-input>
                          </el-col>
                        </el-row>
                      </el-form>
                    </div>
                  </el-tab-pane>

                  <!-- ------------- ---------------------------------------------------------------->

                  <el-tab-pane label="环境和过程" name="first">
                    <!-- 环境和过程 -->
                    <div class="experience">
                      <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-row>
                          <div class="one">
                            <el-col :span="12" style="padding-left:0;">
                              <div class="one_left">
                                <span>作业平台</span>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div class="one_right">
                                <span>作业平台</span>
                              </div>
                            </el-col>
                          </div>

                          <el-col :span="6">
                            <el-form-item label="性质： " style="font-weight:500;">
                              <el-select
                                v-model="form.region"
                                placeholder
                                size="mini"
                                style="width:"
                              >
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item>
                              <div slot="label" style="font-weight:400;">名称：</div>
                              <el-input v-model="formInline.user" placeholder size="mini" style></el-input>
                            </el-form-item>
                          </el-col>

                          <el-col :span="12">
                            <div class="not_bottom">
                              <el-form-item>
                                <div
                                  slot="label"
                                  style=""
                                >气&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;温：</div>
                                <el-input v-model="formInline.user" placeholder size="mini" style="100%"></el-input>
                              </el-form-item>
                              <div class="unit" style="">℃</div>
                              <el-form-item>
                                <div
                                  slot="label"
                                  style=" margin-left:15px;"
                                >浪&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高：</div>
                                <el-input v-model="formInline.user" placeholder size="mini" style></el-input>
                              </el-form-item>
                              <div class="unit" style="">m</div>
                              <br />
                              <el-form-item>
                                <div
                                  slot="label"
                                  style=""
                                >水&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;温：</div>
                                <el-input v-model="formInline.user" placeholder size="mini" style></el-input>
                              </el-form-item>
                              <div class="unit" style="">℃</div>
                              <el-form-item>
                                <div
                                  slot="label"
                                  style=" margin-left:15px;"
                                >水&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;流：</div>
                                <el-input v-model="formInline.user" placeholder size="mini" style></el-input>
                              </el-form-item>
                              <div class="unit" style="">m/s</div>
                            </div>
                          </el-col>
                        </el-row>

                        <el-row>
                          <div class="one">
                            <el-col :span="24" style="padding-left:0;">
                              <div class="one_left">
                                <span>事故发生前的基本过程</span>
                              </div>
                            </el-col>
                          </div>

                          <el-col :span="12">
                            <div class="not_bottom">
                              <!-- <div class="aaa" style="height: 50px;line-height: 36px;">

                                <span>潜水时间：</span><input type="text" style="width:38%"><span>min</span>
                                <br/>
                                <span>减压时间：</span><input type="text" style="width:38%"><span>min</span>
                              </div>
                              <div class="bbb" style="height: 50px;line-height: 36px;">
                                <span style="margin-left:72px;">深度：</span><input type="text" style="width:38%"><span>m</span>
                                <br/>
                                <span>事故发生深度：</span><input type="text" style="width:38%"><span>m</span>
                              </div> -->
                              <el-form-item style="width:220px;">
                                <div slot="label" style="">潜水时间：</div>
                                  <el-input v-model="formInline.user" placeholder size="mini" ></el-input>
                              </el-form-item>
                              <div class="unit" style="">min</div>
                              <el-form-item style="width:180px; margin-left:86px">
                                <div slot="label" style="">深度：</div>
                                  <el-input v-model="formInline.user" placeholder size="mini" style="width:120px"></el-input>
                              </el-form-item>
                              <div class="unit" style="">m</div>
                              <br />
                              <el-form-item style="width:220px;">
                                <div slot="label" style="">减压时间：</div>
                                  <el-input v-model="formInline.user" placeholder size="mini" style></el-input>
                              </el-form-item>
                              <div class="unit" style="">min</div>
                              <div class="take" style="display:inline-block">
                              <el-form-item style="width:251px; margin-left:15px;">
                                <div slot="label" style="">事故发生深度：</div>
                                  <el-input v-model="formInline.user" placeholder size="mini"></el-input>
                              </el-form-item>
                              </div>
                              <div class="unit" style="">m</div>
                            </div>
                          </el-col>

                          <el-col :span="12">
                            <div class="not_bottom">
                              <el-form-item label="海底类型：" style="">
                                <el-select v-model="form.region" placeholder size="mini" style>
                                  <el-option label="区域一" value="shanghai"></el-option>
                                  <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item>
                                <div slot="label" style="margin-left:4px; ">海底能见度：</div>
                                <el-input v-model="formInline.user" placeholder size="mini" style></el-input>
                              </el-form-item>
                              <div class="unit" style="">m/s</div>
                              <br />
                              <span style=" font-size:18px">周边环境：</span>
                              <el-input
                                v-model="formInline.user"
                                placeholder
                                size="mini"
                                style="width:65%"
                              ></el-input>
                            </div>
                          </el-col>
                        </el-row>

                        <el-row>
                          <el-col :span="12" style="padding-left:0;">
                            <div class="one">
                              <div class="one_left" style="margin-top:20px;">
                                <span>事故发生后的处理过程</span>
                              </div>
                            </div>
                          </el-col>

                          <el-col :span="12">
                            <div
                              class="one_right"
                              style="border:1px; margin-top:15px;font-size:20px; color:#1288FF;  width:600px;  display: flex;justify-content: space-between;"
                            >
                              <span>目击者</span>
                              <div class="right" style="top: 0px;right: 0px; color:#626262">
                                <span class="minus">
                                  <i class="el-icon-minus"></i>
                                  <i class="el-icon-plus"></i>
                                </span>
                              </div>
                            </div>
                          </el-col>
                        </el-row>

                        <el-row>
                          <el-col :span="12">
                            <el-input
                              type="textarea"
                              v-model="form.desc"
                              style="margin-top:20px; width:78%;"
                            ></el-input>
                          </el-col>

                          <el-col :span="12">
                            <el-table
                              :data="tableData"
                              :header-cell-class-name="handlemyclass"
                              :header-cell-style="headerstyle"
                              size="mini"
                              style="width: 587px; margin-top:20px; border:1px solid #EBEBEB"
                            >
                              <el-table-column prop="name" label="姓名" width="80" align="center"></el-table-column>
                              <el-table-column
                                label="职务或军衔"
                                align="center"
                                style="background: red"
                                width="120"
                              >
                                <template slot-scope="scope">
                                  <el-form ref="form" :model="form" label-width="80px">
                                    <el-select v-model="scope.row.name" placeholder size="mini">
                                      <el-option label="区域一" value="shanghai"></el-option>
                                      <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                  </el-form>
                                </template>
                              </el-table-column>
                              <el-table-column prop="address" label="单位" align="center" width="120"></el-table-column>
                              <el-table-column
                                prop="address"
                                label="本次作业岗位"
                                align="center"
                                width="120"
                              ></el-table-column>
                              <el-table-column prop="phone" label="联系电话" align="center" width="145"></el-table-column>
                            </el-table>
                          </el-col>
                        </el-row>
                      </el-form>
                    </div>
                  </el-tab-pane>

                  <el-tab-pane label="装备信息" name="fourth">
                    <!-- 装备信息 -->
                    <div class="equipment_information">
                      <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-row>
                          <div class="one">
                          <el-col :span="14" style="padding-left:0;">
                            <div class="one_left">
                              <span>潜水装备</span>
                            </div>
                          </el-col>
                          <el-col :span="10">
                            <div class="one_right">
                              <span>潜水装备</span>
                            </div>
                          </el-col>
                        </div>
                        </el-row>
                        <el-row>
                                                  <el-col :span="5" style="padding-left:0;">
                          <el-form-item label="充气方式：">
                            <el-select
                              v-model="form.region"
                              placeholder
                              size="mini"
                              style=""
                            >
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="5" style="padding-left:0;">
                          <el-form-item label="现场检查：">
                            <el-select
                              v-model="form.region"
                              placeholder
                              size="mini"
                              style=""
                            >
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                          <el-form-item style="">
                            <div slot="label">描述：</div>
                              <el-input
                                v-model="formInline.user"
                                placeholder
                                size="mini"
                                style=""
                              ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label="潜水装具：">
                            <el-select
                              v-model="form.region"
                              placeholder
                              size="mini"
                              style=""
                            >
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label="潜水装具：">
                            <el-select
                              v-model="form.region"
                              placeholder
                              size="mini"
                              style=""
                            >
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        </el-row>


                        <el-row>
                          <div class="one">
                          <el-col :span="14" style="padding-left:0;">
                            <div class="one_left">
                              <span>气瓶</span>
                            </div>
                          </el-col>
                          <el-col :span="10">
                            <div class="one_right">
                              <span>其他装置</span>
                            </div>
                          </el-col>
                        </div>
                        </el-row>

                        <el-row>
                        <el-col :span="14" style="padding-left:0;">
                          <div class="not_right">
                            <el-form-item>
                              <div slot="label" style="">数量：</div>
                                <el-input
                                  v-model="formInline.user"
                                  placeholder
                                  size="mini"
                                  style="width:80px"
                                ></el-input>
                            </el-form-item >
                            <el-form-item label="材质：" style=" margin-left:15px">
                              <el-select
                                v-model="form.region"
                                placeholder
                                size="mini"
                                style="width:80px"
                              >
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item style="margin-left:15px">
                              <div slot="label" style="">容积：</div>
                                <el-input
                                  v-model="formInline.user"
                                  placeholder
                                  size="mini"
                                  style="width:80px;"
                                ></el-input>
                            </el-form-item>
                            <div class="unit" style="">L</div>
                            <el-form-item label="气体：" style="margin-left:15px">
                              <el-select
                                v-model="form.region"
                                placeholder
                                size="mini"
                                style="width: 120px;"
                              >
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                            </el-form-item>
                            <br />
                            <el-form-item>
                              <div slot="label" style="">压力前：</div>
                              <span class="a">
                                <el-input
                                  v-model="formInline.user"
                                  placeholder
                                  size="mini"
                                  style="width:95px;"
                                ></el-input>
                              </span>
                            </el-form-item>
                            <div class="unit" style="">MPa</div>
                            <el-form-item style="margin-left:15px">
                              <div slot="label" style="">压力后：</div>
                              <span class="a">
                                <el-input
                                  v-model="formInline.user"
                                  placeholder
                                  size="mini"
                                  style="width:95px"
                                ></el-input>
                              </span>
                            </el-form-item>
                            <div class="unit" style="">MPa</div>
                            <el-form-item label="开关状态：" style="margin-left:15px;">
                              <el-select
                                v-model="form.region"
                                placeholder
                                size="mini"
                                style="width: 110px"
                              >
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                        </el-col>

                        <el-col :span="10">
                          <div class="not_left">
                            <el-checkbox-group v-model="form.type">
                              <el-checkbox label="手套" name="type" style="lin-height:15px"></el-checkbox>
                              <el-checkbox label="潜水靴" name="type"></el-checkbox>
                              <el-checkbox label="脚蹼" name="type"></el-checkbox>
                              <el-checkbox label="面罩" name="type"></el-checkbox>
                              <el-checkbox label="呼吸管" name="type"></el-checkbox>
                              <br />
                              <el-checkbox label="压重" name="type"></el-checkbox>
                              <el-checkbox label="潜水刀" name="type"></el-checkbox>
                              <el-checkbox label="潜水电脑" name="type"></el-checkbox>
                              <el-checkbox label="水深表" name="type"></el-checkbox>
                              <br />
                              <el-checkbox label="指北针" name="type"></el-checkbox>
                              <el-checkbox label="指北针" name="type" style="margin-left:16px"></el-checkbox>
                            </el-checkbox-group>
                            <span>其他：</span>
                            <input v-model="formInline.user" placeholder size="mini" />
                          </div>
                        </el-col>

                        </el-row>

                        <el-row>
                          
                        <div class="one">
                          <el-col :span="14" style="padding-left:0;">
                            <div class="one_left">
                              <span>呼吸气体</span>
                            </div>
                          </el-col>
                          <el-col :span="10">
                            <div class="one_right">
                              <span>潜水装备</span>
                            </div>
                          </el-col>
                        </div>

                        </el-row>




                        <div class="not_bottoms">
                        <el-row>
                        <el-col :span="4" style="padding-left:0;">
                          
                          <el-form-item label="类别：">
                            <el-select
                              v-model="form.region"
                              placeholder
                              size="mini"
                            >
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4" style="padding-left:0;">
                          <el-form-item label="来源：">
                            <el-select
                              v-model="form.region"
                              placeholder
                              size="mini"
                            >
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6" style="padding-left:0;">
                          <el-form-item>
                            <div slot="label">污染气体检测：</div>
                            <span class="a">
                              <el-input
                                v-model="formInline.user"
                                placeholder
                                size="mini"
                              ></el-input>
                            </span>
                          </el-form-item>
                        </el-col>
                        <!-- </el-col> -->



                          <el-col :span="10">
                          <el-form-item>
                            <div slot="label" style>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</div>
                            <el-select
                              v-model="form.region"
                              placeholder
                              size="mini"
                              style="width: 120px"
                            >
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="故障描述：" style="margin-left:0px;">
                            <el-input
                              v-model="formInline.user"
                              placeholder
                              size="mini"
                              style="width:120px"
                            ></el-input>
                          </el-form-item>

                        </el-col>
                        </el-row>
                        </div>


                        <el-row>
                          <el-col :span="5">
                        <el-form-item label="浓度"></el-form-item>
                          <el-form-item>
                            <div slot="label" style>氧：</div>
                            <el-input
                              v-model="formInline.user"
                              placeholder
                              size="mini"
                              style="width:105px"
                            ></el-input>
                          </el-form-item>
                          <div class="unit">%</div>
                          </el-col>
                          <el-col :span="5">
                          <el-form-item style="margin-left:20px">
                            <div slot="label" style>氮：</div>
                            <el-input
                              v-model="formInline.user"
                              placeholder
                              size="mini"
                              style="width:105px"
                            ></el-input>
                          </el-form-item>
                          <div class="unit">%</div>
                          </el-col>
                          <el-col :span="4">
                          <el-form-item style="margin-left:20px">
                            <div slot="label" style>氦：</div>
                            <el-input
                              v-model="formInline.user"
                              placeholder
                              size="mini"
                              style="width:105px"
                            ></el-input>
                          </el-form-item>
                          <div class="unit">%</div>
                          </el-col>

                          <el-col :span="10">
                          <el-form-item>
                            <div slot="label" style>具体部件：</div>
                            <el-select
                              v-model="form.region"
                              placeholder
                              size="mini"
                              style="width: 120px"
                            >
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                          <div class="unique" style="display:inline">
                          <el-form-item label="与事故的关系：">
                            <el-select
                              v-model="form.region"
                              placeholder
                              size="mini"
                              style="width:100px"
                            >
                              <el-option label="区域一" value="shanghai"></el-option>
                              <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                          </el-form-item>
                          </div>
                          </el-col>
                          

                        </el-row>





                      </el-form>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="人员伤亡" name="fifth">
                    <!-- 人员伤亡 -->
                    <div class="title_casualties">
                      <div class="casualties">伤亡人员信息</div>
                      <div class="right" style="top: 0px;right: 0px; color:#626262">
                        <span class="minus">
                          <i class="el-icon-minus"></i>
                          <i class="el-icon-plus"></i>
                        </span>
                      </div>
                    </div>
                    <div class="experience">
                      <el-table
                        :data="tableData"
                        :header-cell-class-name="handlemyclass"
                        :header-cell-style="headerstyle"
                        style="width: 100%"
                      >
                        <el-table-column prop="address" label="姓名" width="100" align="center"></el-table-column>
                        <el-table-column prop="address" label="岗位" width="100" align="center"></el-table-column>
                        <el-table-column prop="address" label="年龄" width="100" align="center"></el-table-column>
                        <el-table-column label="职务" align="center" style="background: red">
                          <template slot-scope="scope">
                            <el-form ref="form" :model="form" label-width="80px">
                              <el-select v-model="scope.row.name" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                            </el-form>
                          </template>
                        </el-table-column>
                        <el-table-column label="军衔" align="center" style="background: red">
                          <template slot-scope="scope">
                            <el-form ref="form" :model="form" label-width="80px">
                              <el-select v-model="scope.row.name" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                            </el-form>
                          </template>
                        </el-table-column>
                        <el-table-column label="技术等级" align="center" style="background: red">
                          <template slot-scope="scope">
                            <el-form ref="form" :model="form" label-width="80px">
                              <el-select v-model="scope.row.name" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                            </el-form>
                          </template>
                        </el-table-column>
                        <el-table-column label="受伤程度" align="center" style="background: red">
                          <template slot-scope="scope">
                            <el-form ref="form" :model="form" label-width="80px">
                              <el-select v-model="scope.row.name" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                            </el-form>
                          </template>
                        </el-table-column>
                        <el-table-column prop="address" label="伤情描述" align="center"></el-table-column>
                        <el-table-column prop="address" label="现场处理" align="center"></el-table-column>
                        <el-table-column prop="address" label="后续救治" align="center"></el-table-column>
                        <el-table-column label="后果" align="center" style="background: red">
                          <template slot-scope="scope">
                            <el-form ref="form" :model="form" label-width="80px">
                              <el-select v-model="scope.row.name" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                              </el-select>
                            </el-form>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div class="analysis">
                        <div class="merge">
                          <div class="environment_two_line" style="display:inline-block">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                              <el-col :span="12">
                                <div class="chang">
                              <el-form-item style="width:100%">
                                <div slot="label">可能原因：</div>
                                  <el-input
                                    v-model="formInline.user"
                                    placeholder
                                    size="mini"
                                  ></el-input>
                              </el-form-item>
                              </div>
                              </el-col>
                              <el-col :span="12">
                                <div class="chang">
                              <el-form-item style="width:100%">
                                <div slot="label">判断依据：</div>
                                  <el-input
                                    v-model="formInline.user"
                                    placeholder
                                    size="mini"
                                  ></el-input>
                              </el-form-item>
                                </div>
                              </el-col>


                                <el-col :span="6">
                                <el-form-item>
                                  <div slot="label" style>现场指挥：</div>
                                  <el-input
                                    v-model="formInline.user"
                                    placeholder
                                    size="mini"
                                    style="width:160px"
                                  ></el-input>
                                </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                <el-form-item>
                                  <div slot="label" style>潜水长：</div>
                                  <el-input
                                    v-model="formInline.user"
                                    placeholder
                                    size="mini"
                                    style="width:160px"
                                  ></el-input>
                                </el-form-item>
                                </el-col>
                                <el-col :span="6">

                                <el-form-item>
                                  <div slot="label" style>潜水监督：</div>
                                  <el-input
                                    v-model="formInline.user"
                                    placeholder
                                    size="mini"
                                    style="width:160px"
                                  ></el-input>
                                </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                <el-form-item>
                                  <div slot="label" style>潜水军医：</div>
                                  <el-input
                                    v-model="formInline.user"
                                    placeholder
                                    size="mini"
                                    style="width:160px"
                                  ></el-input>
                                </el-form-item>
                                </el-col>
                            </el-form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
            <!-- 尾部 -->
            <div class="entry" style="margin-bottom:25px;">
              <div class="left">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item label="记录人：">
                    <el-input v-model="formInline.user" placeholder size="mini"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit" style="background: #1288FF">最终提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="right">
                <div class="one_icon"></div>
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
import commonHeader from '@/views/common/base/Header'
import headerIcon from '@/assets/img/icon/header/report.png'
export default {
  name: 'details_information',
  components: {
    commonHeader
  },
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      headChange: {
        title: '潜水事故报告系统',
        headIcon: headerIcon
      },
      value1: '',
      value2: '',
      activeName: 'second',
      tableData: [
        {
          phone: '13995201547',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          phone: '12015478536',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
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
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleClick (tab, event) {
      console.log(tab, event)
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
  width: 30px;
  height: 29px;
}
.one_icon:hover {
  background: url(../../../assets/img/figure/baocun_select.png);
  background-size: 100% 100%;
  width: 30px;
  height: 29px;
}
.two_icon {
  background: url(../../../assets/img/figure/dayin.png);
  background-size: 100% 100%;
  width: 30px;
}
.two_icon:hover {
  background: url(../../../assets/img/figure/dayin_select.png);
  background-size: 100% 100%;
  width: 30px;
  height: 29px;
}
.three_icon {
  background: url(../../../assets/img/figure/help_icon.png);
  background-size: 100% 100%;
  width: 30px;
}
.three_icon:hover {
  background: url(../../../assets/img/figure/help_select.png);
  background-size: 100% 100%;
  width: 30px;
  height: 29px;
}
.four_icon {
  background: url(../../../assets/img/figure/guanbi.png);
  background-size: 100% 100%;
  width: 30px;
}
.four_icon:hover {
  background: url(../../../assets/img/figure/guanbi_select.png);
  background-size: 100% 100%;
  width: 30px;
  height: 29px;
}
.color {
  height: 20px;
  background: rgba(77, 77, 77, 1);
}
// 背景
.fault {
  background: #eeeeee;
  width: 100%;
  overflow: hidden;
  min-height: 780px;
  margin-bottom: 0;
  // 标题
  .title {
    width: 446px;
    height: 40px;
    font-size: 30px;
    font-family: PingFang-SC-Regular;
    font-weight: Regular;
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
    }
    .right {
      height: 20px;
      width: 110px;
    }
  }
}

.black {
  display: inline-block;
  margin-right: 20px;
}
//录入人
.entry {
  width: 96%;
  height: 30px;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right {
    width: 145px;
    display: flex;
    justify-content: space-between;
  }
}
.one .el-form--inline .el-form-item {
  margin-right: 23px;
}
.block_right {
  display: inline-block;
}
.one {
  width: 100%;

  .one_left {
    border-left: 4px solid #1288ff;

    span {
      margin-left: 10px;
    }
  }
  .one_right {
    border-left: 4px solid #1288ff;

    span {
      margin-left: 10px;
    }
  }
}
.unit {
  display: inline-block;
  position: relative;
  top: 10px;
}
.total_two {
  display: flex;
  justify-content: space-between;
  width: 84%;
}
.total_two .el-form-item {
  margin-right: 0 !important;
}
.total_two .el-form-item {
  margin-bottom: 0px;
}
.end {
  display: flex;
  justify-content: space-between;
  width: 84%;
}
.equipment_information {
  width: 96%;
  margin: 0 auto;
  margin-top: 20px;
}
.information {
  display: flex;
  justify-content: space-between;
  width: 87%;
}
.breathing {
  display: flex;
  justify-content: space-between;
  width: 90%;
}
.analysis {
  display: flex;
  justify-content: space-between;
  width: 93%;
  margin-top: 60px;
}
.title_casualties {
  display: flex;
  justify-content: space-between;
  width: 96%;
  margin: 0 auto;
  height: 30px;
  align-items: center;

  .casualties {
    font-size: 26px;
    font-family: PingFang-SC-Medium;
    font-weight: 350;
    color: rgba(18, 136, 255, 1);
  }
}
.command {
  display: flex;
  justify-content: space-between;
}
.witness {
  display: flex;
  justify-content: space-between;
  width: 86%;
}
</style>




<style lang="scss">
// 调整其他装置复选框的高度
.choose .el-form-item--medium .el-form-item__content {
  line-height: 15px;
}
.fault {
  .el-tabs__content {
    min-height: 400px;
  }
  .block_right .el-input__prefix {
    right: -180px !important;
  }
  //潜水资格
  .qualificati .el-select > .el-input {
    display: block;
    width: 160%;
  }

  //整体的字体颜色
  .el-form-item__label {
    font-family: PingFang-SC-Regular;
    font-size:18px;
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
    font-size: 22px;
    font-family: PingFang-SC-Regular;
    font-weight: Regular;
    color: rgba(153, 153, 153, 1);
    padding: 0px 30px;
  }
  // 选项卡第一项
  .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px;
  }
  //icon图标大小
  .minus .el-icon-minus {
    font-size: 28px;
    background: rgba(244, 244, 244, 1);
    border: 2px solid rgba(98, 98, 98, 1);
    opacity: 0.21;
    border-radius: 2px;
    margin: 0 5px;
  }
  .minus .el-icon-plus {
    font-size: 28px;
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
    font-weight: Medium;
    color: rgba(102, 102, 102, 1);
  }
  .entry .el-form-item {
    margin-bottom: 0 !important;
  }

  .experience {
    width: 96%;
    margin: 0 auto;
    margin-top: 20px;
  }
}
.one .one_left {
  font-family: PingFang-SC-Regular !important;
  font-size: 18px;
  color: rgba(102, 102, 102, 1);
}
.one .one_right {
  font-family: PingFang-SC-Regular !important;
  font-size: 18px;
  color: rgba(102, 102, 102, 1);
}
.not_bottom .el-form-item {
  margin-bottom: 0;
  margin-right: 0;
}
.not_right .el-form-item {
  margin-right: 0;
}
.not_left .el-checkbox + .el-checkbox {
  margin-left: 15px;
}
.not_left {
  line-height: 22px;
}
.fault .el-form-item__content {
  width: 66%;
}
.el-form-item__label {
  padding: 0;
}
.not_bottom .el-form-item__content {
  width: 58%!important;
}
.take .el-form-item__content {
  width: 47%!important;
}
.equipment_information .el-form-item__content {
  width: 54%!important;
}
.unique .el-form-item__content {
  width: 43%!important;
}
.not_right .el-form-item {
    margin-bottom: 10px;
}
.not_bottoms .el-form-item {
    margin-bottom: 10px;
}
.environment_two_line .el-form-item__content {
  width: 54%!important;
}
.chang .el-form-item__content {
  width: 80%!important;
}
</style>

