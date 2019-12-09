<template>
<div class="risk_search">
    <!-- <common-header :headChange="headChange"></common-header>
    <div class="box">
        <el-row class="plan">
            <el-col :span="4">
                  <common-plan-sidebar :curIndex='curIndex'></common-plan-sidebar>
            </el-col>
            <el-col :span="20"> -->
              <el-col :span="24">
                <div style="background:#eeeeee; min-height:905px; overflow: hidden;">
                    <div class="box_one">
                      <div class="title_one">风险管理检索</div>
                        <!-- 搜索 -->
                        <el-form ref="form" :model="form" label-width="180px" style="margin:0 auto; width:70%; margin-top:55px; height:150px;">
                            <el-form-item>
                                <div slot="label" style="font-size:18px;">项目名称关键词：</div>
                                <el-input v-model="form.name" placeholder="请输入关键字" style="width:80%"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <div slot="label" style="font-size:18px;">项目创建日期范围：</div>
                                    <el-date-picker
                                    v-model="value1"
                                    type="daterange"
                                    style="width:80%;"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                    </el-date-picker>
                                    <el-button type="primary" @click="onSubmit" size="medium" style="background:#1288FF;float:right;">搜索</el-button>
                                </el-form-item>
                        </el-form>
                        <!-- 表格 -->
                        <div class="kuang" style="border:2px solid #AACEFE; width:98%;margin:0 auto;">
                        <el-table
                          :data="tableData"
                          :header-cell-class-name="handlemyclass"
                          :header-cell-style="headerstyle"
                          style="width: 100%; min-height:504px;"
                        >
                          <el-table-column label="选中" width="100" align="center">
                            <template slot-scope="scope">
                              <el-checkbox v-model="scope.row.checked"></el-checkbox>
                            </template>
                          </el-table-column>
                          <el-table-column prop="address" label="项目名称" width="850" align="center"></el-table-column>
                          <el-table-column prop="date" label="创建时间" align="center"></el-table-column>
                        </el-table>
                        </div>
                        <div style="width:98%; margin: 10px auto; display:flex; justify-content: space-between;">
                          <el-button type="primary">确定</el-button>
                          <div class="right" >
                            <div class="one_icon" title="保存"></div>
                            <div class="two_icon" title="打印"></div>
                            <div class="three_icon" title="疑难"></div>
                            <div class="four_icon" title="关闭"></div>
                          </div>
                        </div>
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
// import CommonPlanSidebar from '@/views/common/base/Plan_sidebar'
// import headerIcon from "@/assets/img/icon/header/plan.png";
export default {
  name: 'Search',
  data () {
    return {
      // curIndex: 0,
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
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      value1: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
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
  .risk_search{
    display: flex;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
  }
    .box_one {
        margin: 0 auto;
        background: #ffffff;
        height: 866px;
        width: 96%;
        margin-top: 29px;
        overflow: hidden;
    }
    .box_two {
        height: 455px;
        width: 100%;
        border: 1px solid #8AB6E2;
    }
    .title_one {
        width: 210px;
        margin: 50px auto;
        height: 40px;
        border-bottom: 3px solid #333333;
        font-size: 30px;
        letter-spacing:5px;  
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
  .right {
    width: 180px;
    display: flex;
    justify-content: space-between;
  }
    
    
</style>

<style lang="scss">
.risk_search {
.cell {
        font-size: 18px;
    }
.txt {
    border: 2px solid #AACEFE;
    border-right: none;
    border-bottom: 0;
    border-top:0; 

    &:first-of-type{
            border-left: none;
        } 
    }
}

</style>

