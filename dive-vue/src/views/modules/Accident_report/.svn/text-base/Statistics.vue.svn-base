<template>
  <div>
    <common-header :headChange='headChange'></common-header>
    <div class="static">
        <!-- 标题 -->
        <el-row :gutter="20">
            <el-col :span="23" :offset="1" class="static_title" style="padding:0;">
                <span>报告检索</span>
            </el-col>
        </el-row>
        <!-- 表单 -->
        <el-row :gutter="20">
            <el-col :span="22" :offset="1" class="static_content" style="padding:40px 40px 20px;">
                <el-form ref="form" :model="form" class="static_form" :inline="true" :label-position="labelPosition">
                    <el-row :gutter="20">
                        <el-col :sm='6' :xl='6' style="padding: 0;">
                            <el-form-item label="单位：">
                                <!-- <el-col :sm='20' :xl='20' style="padding: 0;"> -->
                                    <el-select v-model="form.unit" placeholder="">
                                        <el-option label="单位一" value="unit1"></el-option>
                                        <el-option label="单位二" value="unit2"></el-option>
                                    </el-select>
                                <!-- </el-col> -->
                            </el-form-item>
                        </el-col>
                        <el-col :offset="6" :sm='12' :xl='12' style="padding: 0;" class="breath">
                            <el-form-item label="呼吸气体：">
                                <el-select v-model="form.breath" placeholder="">
                                    <el-option label="呼吸气体一" value="breath1"></el-option>
                                    <el-option label="呼吸气体二" value="breath2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <el-row :gutter="20">
                        <el-col :sm='12' :xl='12' style="padding: 0;">                 
                            <el-form-item label="日期：">
                                <el-date-picker
                                    v-model="form.date"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    style="width: 100%;">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :sm='12' :xl='12' style="padding: 0;" class="relationship">
                            <el-form-item label="与其关系：">
                                <el-input v-model="form.relationship"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20"> 
                        <el-col :sm='6' :xl='5' style="padding: 0;">
                            <el-form-item label="地点：">
                                <el-select v-model="form.place" placeholder="">
                                    <el-option label="地点一" value="place1"></el-option>
                                    <el-option label="地点二" value="place2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :sm='6' :xl='5' style="padding: 0;">
                            <el-form-item label="活动：">
                                <el-select v-model="form.ativity" placeholder="">
                                    <el-option label="活动一" value="ativity1"></el-option>
                                    <el-option label="活动二" value="ativity2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :sm='10' :xl="{span:10,offset:2}" style="padding: 0;" class="reason">
                            <el-form-item label="可能原因：">
                                <el-input v-model="form.reason"></el-input>
                            </el-form-item>
                         </el-col>
                        <el-col :sm='2' :xl='2' style="padding: 0;">
                            <el-form-item>
                                <el-button type="primary" @click="submitForm">筛选</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="23" :offset="1" class="static_title" style="padding:0;">
                <span>选择要浏览/续填的事故报告</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col 
                :span="22" 
                :offset="1" 
                class="static_content" 
                style="padding:17px 15px 15px;">
                <div class="top">
                    <div class="left">
                        <el-button type="primary">统计分析</el-button>
                    </div>
                    <div class="right">
                        <span class="one_icon" title="保存">
                        </span>
                        <span class="two_icon" title="打印">
                        </span>
                        <span class="three_icon" title="疑难">
                        </span>
                        <span class="four_icon"  title="关闭">
                        </span>
                    </div>
                </div>
                <div style="border: 1px solid #AACEFE;margin-top: 16px;">
                    <el-table
                        :data = "tableData"
                        :header-cell-class-name="headerstyle"
                        :cell-style="{fontSize:'18px'}"
                        class="static_table"
                        >
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column
                            label="日期"
                            align="center"
                            style="background: red"
                        >
                            <!-- <template slot-scope="scope">
                                <el-form ref="form" :model="form" label-width="80px">
                                    <el-select v-model="scope.row.name" placeholder="请选择活动区域">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form>
                            </template> -->
                        </el-table-column>
                        <el-table-column prop="name" label="单位"></el-table-column>
                        <el-table-column prop="name" label="地点"></el-table-column>
                        <el-table-column prop="name" label="活动"></el-table-column>
                        <el-table-column prop="name" label="发生时机"></el-table-column>
                        <el-table-column prop="name" label="涉及"></el-table-column>
                        <el-table-column prop="name" label="平台"></el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <el-row type="flex" justify="space-between" class="paginations">
                        <div style="line-height:32px;color:#333;font-size:14px;">
                            <span>本页显示：0</span>
                            <span style="margin-left:15px;">总记录数：0</span>
                        </div>
                        <!-- total, sizes -->
                        <el-pagination
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="10"
                            layout="prev, pager, next, jumper"
                            :total="100"
                        ></el-pagination>
                    </el-row>
                </div>
            </el-col>
        </el-row>
       <div class="color"></div>
    </div>
  </div>
</template>

<script>
import commonHeader from '@/views/common/base/Header'
import headerIcon from '@/assets/img/icon/header/report.png'

export default {
  name: 'Statistics',
  components: {
    commonHeader
  },
  data () {
    return {
      headChange: {
        title: '潜水事故报告系统',
        headIcon: headerIcon
      },
      labelPosition: 'left',
      form: {
        unit: [],
        date: '',
        breath: [],
        relationship: '',
        place: [],
        ativity: [],
        reason: ''
      },
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          time: '2019-08-27'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          time: '2019-08-27'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          time: '2019-08-27'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          time: '2019-08-27'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          time: '2019-08-27'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          time: '2019-08-27'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          time: '2019-08-27'
        }
      ],
      currentPage: 1
    }
  },
  methods: {
    submitForm () {
      console.log('submit!')
    },
    headerstyle () {
      return 'headerstyle'
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
    @import '~@/assets/scss/index.scss';
    
    /deep/ .static_table .headerstyle{
        background-color:#F8FBFF;
        font-size: $text-size18;
        color: $color-text-666;
    }
    /deep/ .static_table .el-input--medium{
        font-size: $text-size18;
    }
    /deep/ .static_table .el-select-dropdown__item{
        font-size: $text-size18;
    }
    /deep/ .static_form .el-form-item__label{
        font-size: $text-size18;
        color: $color-text-333;
    }
    /deep/ .static_form .el-date-editor{
        @media screen and (min-width: 1400px) and (max-width: 1920px) {
            width:135%!important;
        }
        @media screen and (min-width: 996px) and (max-width: 1400px){
            width:120%!important;
        }
    }
    /deep/ .static_form .el-input__inner{
        padding: 0 30px 0 15px;
    }
    /deep/ .static_form .el-range-editor.el-input__inner{
        padding: 3px 30px 3px 15px;
    }
    /deep/ .breath .el-select{
         @media screen and (min-width: 996px) and (max-width: 1599px){
            width:180%;
        }
        @media screen and (min-width: 1600px) and (max-width: 1920px){
            width:200%;
        }
    }
    /deep/ .relationship .el-input__inner{
         @media screen and (min-width: 996px) and (max-width: 1599px){
            width:180%;
        }
        @media screen and (min-width: 1600px) and (max-width: 1920px){
            width:200%;
        }
    }
    /deep/ .reason .el-input__inner{
        @media screen and (min-width: 996px) and (max-width: 1599px){
            width:180%;
        }
        @media screen and (min-width: 1600px) and (max-width: 1920px){
            width:200%;
        }
    }
    
     /deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover{
        color: $color-bg-blue;
     }
    /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: $color-bg-blue;
        color: $color-bg-white;        
    }
    /deep/ .el-pagination .btn-next .el-icon,/deep/ .el-pagination .btn-prev .el-icon{
        font-size: $text-size18;
    }
    /deep/ .el-pagination .el-pager li{
        font-size: $text-size14;
        height: 30px;
        line-height: 30px;
        padding: 0 6px;
    }
    // /deep/ .el-pagination button,/deep/ .el-pagination span:not([class*=suffix]){
    //     font-size: 18px;
    // }
    .static{
        background-color: $color-bg;
        overflow: hidden;
        .static_title{
            color: $color-text-black;
            font-size: $text-size26;
            margin-top: 32px;
            border-radius: 3px;
            &>span{
                border-bottom: 5px solid $color-bg-blue;
            }
        }
        .static_content{
            background-color: $color-bg-white;
            margin-top: 22px;
            padding: 45px 30px;
            .el-button{
                background: $color-bg-blue;
                border-color: $color-bg-blue;
                font-size: $text-size16;
                color: $color-bg-white;
            }
            // 四张图片
            .top{
                // height: 56px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                & span{
                    width: 36px;
                    height: 36px;
                    display: inline-block;
                    cursor: pointer;
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
            .paginations{
                margin: 16px 35px;
            }
        }
        .color{
            height:26px;
            background: $color-text-black;
            margin-top:20px;
        }
    }
    
</style>