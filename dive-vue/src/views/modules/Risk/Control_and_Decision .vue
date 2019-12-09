<template>
    <div class="control">
        <el-row class="grid-content" style="position: relative;">
            <span style="position:absolute;right:39px;top:35px;" class="add-del">
                <img src="../../../assets/img/figure/narrow.png" style="margin-right:15px;"/>
                <img src="../../../assets/img/figure/enlarge.png"/>
            </span>
            <!-- tab -->
            <el-tabs v-model="activeName" @tab-click="handleClick"  class="tabs">
                <!-- 环境因素 -->
                <el-tab-pane label="环境因素" name="first">
                    <el-tabs class="dive_person borders" v-model="dive_person_active">
                        <el-tab-pane label="水面环境" name="first">
                            <el-table
                                border
                                max-height="574"
                                :data = "tableData"
                                :cell-style="{fontSize:'18px'}"
                                class="personal_table tables"
                                :header-cell-class-name="headerCell"
                            >
                                <el-table-column align="center">
                                    <el-table-column
                                        label="风险名称"
                                        width="140"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.name"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column align="center" label="风险控制前">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column label="风险控制" align="center">
                                    <el-table-column
                                        label="控制方法"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="具体措施"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                 <el-table-column align="center" label="风险控制后">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column prop="task"  align="center">
                                    <el-table-column
                                        label="风险决策"
                                        width="260"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="水下环境" name="three">
                            <el-table
                                border
                                max-height="574"
                                :data = "personalData"
                                :cell-style="{fontSize:'18px'}"
                                class="personal_table tables"
                                :header-cell-class-name="headerCell"
                            >
                                <el-table-column align="center">
                                    <el-table-column
                                        label="风险名称"
                                        width="140"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.name"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column align="center" label="风险控制前">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column label="风险控制" align="center">
                                    <el-table-column
                                        label="控制方法"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="具体措施"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                 <el-table-column align="center" label="风险控制后">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column prop="task"  align="center">
                                    <el-table-column
                                        label="风险决策"
                                        width="260"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="特殊水域" name="four">
                            <el-table
                                border
                                max-height="574"
                                :data = "personalData"
                                :cell-style="{fontSize:'18px'}"
                                class="personal_table tables"
                                :header-cell-class-name="headerCell"
                            >
                                <el-table-column align="center">
                                    <el-table-column
                                        label="风险名称"
                                        width="140"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.name"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column align="center" label="风险控制前">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column label="风险控制" align="center">
                                    <el-table-column
                                        label="控制方法"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="具体措施"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                 <el-table-column align="center" label="风险控制后">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column prop="task"  align="center">
                                    <el-table-column
                                        label="风险决策"
                                        width="260"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        
                    </el-tabs>
                </el-tab-pane>
                <!-- 装备因素 -->
                <el-tab-pane label="装备因素" name="third">
                    <el-tabs class="dive_person borders" v-model="dive_person_active">
                        <el-tab-pane label="作业平台" name="first">
                            <el-table
                                border
                                max-height="574"
                                :data = "tableData"
                                :cell-style="{fontSize:'18px'}"
                                class="personal_table tables"
                                :header-cell-class-name="headerCell"
                            >
                                <el-table-column align="center">
                                    <el-table-column
                                        label="风险名称"
                                        width="140"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.name"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column align="center" label="风险控制前">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column label="风险控制" align="center">
                                    <el-table-column
                                        label="控制方法"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="具体措施"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                 <el-table-column align="center" label="风险控制后">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column prop="task"  align="center">
                                    <el-table-column
                                        label="风险决策"
                                        width="260"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="潜水装具" name="three">
                            <el-table
                                border
                                max-height="574"
                                :data = "personalData"
                                :cell-style="{fontSize:'18px'}"
                                class="personal_table tables"
                                :header-cell-class-name="headerCell"
                            >
                                <el-table-column align="center">
                                    <el-table-column
                                        label="风险名称"
                                        width="140"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.name"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column align="center" label="风险控制前">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column label="风险控制" align="center">
                                    <el-table-column
                                        label="控制方法"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="具体措施"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                 <el-table-column align="center" label="风险控制后">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column prop="task"  align="center">
                                    <el-table-column
                                        label="风险决策"
                                        width="260"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="供气系统" name="four">
                            <el-table
                                border
                                max-height="574"
                                :data = "personalData"
                                :cell-style="{fontSize:'18px'}"
                                class="personal_table tables"
                                :header-cell-class-name="headerCell"
                            >
                                <el-table-column align="center">
                                    <el-table-column
                                        label="风险名称"
                                        width="140"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.name"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column align="center" label="风险控制前">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column label="风险控制" align="center">
                                    <el-table-column
                                        label="控制方法"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="具体措施"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                 <el-table-column align="center" label="风险控制后">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column prop="task"  align="center">
                                    <el-table-column
                                        label="风险决策"
                                        width="260"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="加压舱和潜水钟系统" name="five">
                            <el-table
                                border
                                max-height="574"
                                :data = "personalData"
                                :cell-style="{fontSize:'18px'}"
                                class="personal_table tables"
                                :header-cell-class-name="headerCell"
                            >
                                <el-table-column align="center">
                                    <el-table-column
                                        label="风险名称"
                                        width="140"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.name"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column align="center" label="风险控制前">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column label="风险控制" align="center">
                                    <el-table-column
                                        label="控制方法"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="具体措施"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                 <el-table-column align="center" label="风险控制后">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column prop="task"  align="center">
                                    <el-table-column
                                        label="风险决策"
                                        width="260"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="其他装具" name="second">
                            <el-table
                                border
                                max-height="574"
                                :data = "personalData"
                                :cell-style="{fontSize:'18px'}"
                                class="personal_table tables"
                                :header-cell-class-name="headerCell"
                            >
                                <el-table-column align="center">
                                    <el-table-column
                                        label="风险名称"
                                        width="140"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.name"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column align="center" label="风险控制前">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column label="风险控制" align="center">
                                    <el-table-column
                                        label="控制方法"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="具体措施"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                 <el-table-column align="center" label="风险控制后">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column prop="task"  align="center">
                                    <el-table-column
                                        label="风险决策"
                                        width="260"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
                <!-- 人员因素 -->
                <el-tab-pane label="人员因素" name="four">
                    <el-tabs class="dive_person borders" v-model="dive_person_active">
                        <el-tab-pane label="组织指挥人员" name="first">
                            <el-table
                                border
                                max-height="574"
                                :data = "tableData"
                                :cell-style="{fontSize:'18px'}"
                                class="personal_table tables"
                                :header-cell-class-name="headerCell"
                            >
                                <el-table-column align="center">
                                    <el-table-column
                                        label="风险名称"
                                        width="140"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.name"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column align="center" label="风险控制前">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column label="风险控制" align="center">
                                    <el-table-column
                                        label="控制方法"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="具体措施"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                 <el-table-column align="center" label="风险控制后">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column prop="task"  align="center">
                                    <el-table-column
                                        label="风险决策"
                                        width="260"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="潜水员" name="three">
                            <el-table
                                border
                                max-height="574"
                                :data = "personalData"
                                :cell-style="{fontSize:'18px'}"
                                class="personal_table tables"
                                :header-cell-class-name="headerCell"
                            >
                                <el-table-column align="center">
                                    <el-table-column
                                        label="风险名称"
                                        width="140"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.name"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column align="center" label="风险控制前">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column label="风险控制" align="center">
                                    <el-table-column
                                        label="控制方法"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="具体措施"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                 <el-table-column align="center" label="风险控制后">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column prop="task"  align="center">
                                    <el-table-column
                                        label="风险决策"
                                        width="260"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="辅助和保障人员" name="four">
                            <el-table
                                border
                                max-height="574"
                                :data = "personalData"
                                :cell-style="{fontSize:'18px'}"
                                class="personal_table tables"
                                :header-cell-class-name="headerCell"
                            >
                                <el-table-column align="center">
                                    <el-table-column
                                        label="风险名称"
                                        width="140"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.name"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column align="center" label="风险控制前">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column label="风险控制" align="center">
                                    <el-table-column
                                        label="控制方法"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="具体措施"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                 <el-table-column align="center" label="风险控制后">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column prop="task"  align="center">
                                    <el-table-column
                                        label="风险决策"
                                        width="260"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
                <!-- 操作因素 -->
                <el-tab-pane label="操作因素" name="five">
                    <el-tabs class="dive_person borders" v-model="dive_person_active">
                        <el-tab-pane label="作业准备" name="first">
                            <el-table
                                border
                                max-height="574"
                                :data = "tableData"
                                :cell-style="{fontSize:'18px'}"
                                class="personal_table tables"
                                :header-cell-class-name="headerCell"
                            >
                                <el-table-column align="center">
                                    <el-table-column
                                        label="风险名称"
                                        width="140"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.name"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column align="center" label="风险控制前">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column label="风险控制" align="center">
                                    <el-table-column
                                        label="控制方法"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="具体措施"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                 <el-table-column align="center" label="风险控制后">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column prop="task"  align="center">
                                    <el-table-column
                                        label="风险决策"
                                        width="260"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="作业过程" name="three">
                            <el-table
                                border
                                max-height="574"
                                :data = "personalData"
                                :cell-style="{fontSize:'18px'}"
                                class="personal_table tables"
                                :header-cell-class-name="headerCell"
                            >
                                <el-table-column align="center">
                                    <el-table-column
                                        label="风险名称"
                                        width="140"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.name"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column align="center" label="风险控制前">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column label="风险控制" align="center">
                                    <el-table-column
                                        label="控制方法"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="具体措施"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                 <el-table-column align="center" label="风险控制后">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column prop="task"  align="center">
                                    <el-table-column
                                        label="风险决策"
                                        width="260"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="特殊操作" name="four">
                            <el-table
                                border
                                max-height="574"
                                :data = "personalData"
                                :cell-style="{fontSize:'18px'}"
                                class="personal_table tables"
                                :header-cell-class-name="headerCell"
                            >
                                <el-table-column align="center">
                                    <el-table-column
                                        label="风险名称"
                                        width="140"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.name"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column align="center" label="风险控制前">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column label="风险控制" align="center">
                                    <el-table-column
                                        label="控制方法"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="具体措施"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                 <el-table-column align="center" label="风险控制后">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column prop="task"  align="center">
                                    <el-table-column
                                        label="风险决策"
                                        width="260"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="水面指挥与保障" name="five">
                            <el-table
                                border
                                max-height="574"
                                :data = "tableData"
                                :cell-style="{fontSize:'18px'}"
                                class="personal_table tables"
                                :header-cell-class-name="headerCell"
                            >
                                <el-table-column align="center">
                                    <el-table-column
                                        label="风险名称"
                                        width="140"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.name"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column align="center" label="风险控制前">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column label="风险控制" align="center">
                                    <el-table-column
                                        label="控制方法"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="具体措施"
                                        width="180"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.result" style="width:70%;"></el-input>
                                            <img src="../../../assets/img/识别危险首页/111.png" class="ellipsis"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                 <el-table-column align="center" label="风险控制后">
                                    <el-table-column
                                        label="可能等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="可能值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="text" v-model="scope.row.rank"/>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                        label="影响等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="影响程度"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.expValue"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险等级"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.powRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="风险值"
                                        width="120"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-input type="number" v-model="scope.row.powValue"/>
                                        </template>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column prop="task"  align="center">
                                    <el-table-column
                                        label="风险决策"
                                        width="260"
                                        align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.expRank">
                                                <el-option label="优秀" value="1"></el-option>
                                                <el-option label="良好" value="2"></el-option>
                                                <el-option label="尚可" value="3"></el-option>
                                                <el-option label="一般" value="4"></el-option>
                                                <el-option label="较差" value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
            </el-tabs>
            <el-row type="flex" justify="end" class="icons">
                <el-col style="text-align:right;">
                    <span class="one_icon" title="保存">
                    </span>
                    <span class="two_icon" title="打印">
                    </span>
                    <span class="three_icon" title="疑难">
                    </span>
                    <span class="four_icon"  title="关闭">
                    </span>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>

<script>
import commonHeader from '@/views/common/base/Header'
import CommonRiskSidebar from '@/views/common/base/Risk_sidebar'
import headerIcon from '@/assets/img/icon/header/risk.png'

export default {
  name: 'dangerPerson',
  components: {
    commonHeader,
    CommonRiskSidebar
  },
  data () {
    return {
      headChange: {
        title: '潜水风险管理系统',
        headIcon: headerIcon
      },
      activeName: 'first',
      dive_person_active: 'first',
      commandData: [],
      personalData: [],
      teamData: [],
      assistData: [],
      tableData: [{
        date: '20-05-02',
        name: '王小虎',
        address: '上海市普陀区 1518 弄'
      }]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    headerCell (row, column, rowIndex, columnIndex) {
      return 'headerCell'
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/index.scss';

    /deep/ .tabs .el-tabs__item{
      font-size: $text-size-medium-l;
      color: $color-text-999;
    }
    /deep/ .tabs  .el-tabs__header{
      margin: 6px 0 15px;
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
      font-size: $text-size-small;
    }
    // /deep/ .tabs .el-input {
    //   margin:0 5px 0 10px;
    // }
    /deep/ .grid-content .headerCell{
        background-color:#F7FBFF;
        font-size:18px;
        color: #666;
        border: 2px solid $color-border-blue;
        border-right: none;
        border-bottom: 0;
        &:first-of-type{
            border-left: none;
        }
    }
    /deep/ .dive_person .el-tabs__item{
      font-size: $text-size-medium;
      color: $color-text-666;
    }
     /deep/ .dive_person .el-tabs__header{
        margin: 0;
        line-height: 54px;
        padding-left: 30px;
    }
    .risk{
      .grid-content {
        margin:28px 39px 0 28px;
        background-color: $color-bg-white;
        padding: 32px;
        border: 1px solid #BBD2DF;
        .add-del{
            & img{
                cursor: pointer;
                width: 40px;
                height: 40px;
            }
        }
        .tables{
            border:2px solid $color-border-blue;
            border-top:none;
        }
        .borders{
            border:2px solid $color-border-blue;
            height: 638px;
            & .tables{
                border-left:0;
                border-right:0;
            }
        }
      }
      .icons{
        height: 58px;
        padding-top:28px;
        & span{
            width: 42px;
            height: 42px;
            display: inline-block;
            cursor: pointer;
            margin-left: 14px;
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
</style>
<style lang="scss" >
  //input去掉边框
.control .el-input--medium .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: 1px;
}
</style>