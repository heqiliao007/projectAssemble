<template>
<div class="">
  <common-header :headChange='headChange'></common-header>
  <div class="box">
    <div class="modify">
      <!-- 标题 -->
      <el-row :gutter="20">
        <el-col :span="22" :offset="1">
          <div class="title_one">报告检索</div>
        </el-col>
      </el-row>
      <!-- 表单 -->
      <div class="form_retrieval">
        <div class="kuang_accident">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-row>
              <el-col :span="12">
                <el-form-item label="单位： " style="font-weight:500">
                  <el-select v-model="form.region" placeholder size="mini" style="width:32%">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                  <el-select v-model="form.region" placeholder size="mini"  style="width:32%">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                  <el-select v-model="form.region" placeholder size="mini" style="width:32%">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                  <span style="font-size:18px">呼吸气体：</span>
                  <el-select v-model="form.region" style="width:60%" size="mini">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
              </el-col>
              </el-row>

              <el-row>
              <el-col :span="12" style="margin-bottom:18px">
              <span class="el-form-item__label" >日期:&nbsp;&nbsp;</span>
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
              ></el-date-picker>
            </el-col>
            <el-col :span="12">
                <span style="font-size:18px">与其关系：</span>
                  <el-input v-model="formInline.user" style="width:60%" size="mini"></el-input>
            </el-col>
              </el-row>


              <el-row>
              <el-col :span="5">
              <el-form-item label="地点：">
                <el-select v-model="form.region" placeholder="请选择活动区域" size="mini">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
                <el-form-item label="活动：" >
                  <el-select v-model="form.region" style="width:97%" size="mini">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
              <span style="font-size:18px">可能原因：</span>
                  <el-input v-model="formInline.user" style="width:60%" size="mini"></el-input>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit" style="margin-left:20px;">查询</el-button>
                </el-form-item>
            </el-col>
              </el-row>






            </el-form>
        </div>
      </div>
      <!-- 标题 -->
      <el-row :gutter="20">
        <el-col :span="22" :offset="1">
          <div class="title_two">选择要浏览/续填的事故报告</div>
        </el-col>
      </el-row>
      <!-- 表单 -->
      <el-row :gutter="20">
        <el-col :span="22" :offset="1">
          <div class="function_keys">
            <div class="top">
              <div class="left">
                <el-button type="primary">确定</el-button>
                <el-button type="primary">删除</el-button>
              </div>
              <div class="right">
                <div class="one_icon"></div>
                <div class="two_icon"></div>
                <div class="three_icon"></div>
                <div class="four_icon"></div>
              </div>
            </div>
            <div class="box_kuang">
              <div class="qualificati">
                <el-table :data="tableData" :header-cell-style="headerstyle" style="width: 100%">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column label="日期" align="center" style="background: red" width>
                    <template slot-scope="scope">
                      <el-form ref="form" :model="form" label-width="80px">
                        <el-select v-model="scope.row.name" placeholder="请选择活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="单位"></el-table-column>
                  <el-table-column prop="name" label="地点"></el-table-column>
                  <el-table-column prop="name" label="活动"></el-table-column>
                  <el-table-column prop="name" label="发生时机"></el-table-column>
                  <el-table-column prop="name" label="涉及"></el-table-column>
                  <el-table-column prop="name" label="平台"></el-table-column>
                </el-table>
              </div>
              <!-- 分页 -->
              <div class="paging">
                <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage4"
                  :page-sizes="[ 20, 30]"
                  :page-size="10"
                  layout="slot, prev, pager, next, jumper"
                  :total="100"
                  style="margin-top:20px;"
                  >
                  <span style="width:75%; margin-left:2%; margin-bottom:1%;">本页显示：1-1 &nbsp;&nbsp;总记录数：100</span>
                  </el-pagination>
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
import headerIcon from '@/assets/img/icon/header/report.png'
export default {
  name: 'Modify',
  components: {
    commonHeader
  },
  data () {
    return {
      value1: '',
      formInline: {
        user: '',
        region: ''
      },
      headChange: {
        title: '潜水事故报告系统',
        headIcon: headerIcon
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
      currentPage4: 5,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
.paging {
  height: 65px;
  display: flex;
  align-items: center;
}
.box_kuang {
  border: 1px solid #1288ff;
  width: 96%;
  margin: 0 auto;
  overflow: hidden;
  margin-bottom: 20px;
}
// 背景
.modify {
  background: #eeeeee;
  width: 100%;
  min-height: 900px;
  overflow: hidden;
}
// 标题
.title_one {
  width: 136px;
  height: 45px;
  font-size: 34px;
  font-family: PingFang-SC-Regular;
  font-weight: bold;
  color: rgba(77, 77, 77, 1);
  border-bottom: 3px solid #1288ff;
  margin-top: 30px;
}
// 标题2
.title_two {
  width: 425px;
  height: 45px;
  font-size: 34px;
  font-family: PingFang-SC-Regular;
  font-weight: bold;
  color: rgba(77, 77, 77, 1);
  border-bottom: 3px solid #1288ff;
  margin-top: 30px;
}
// 表单
.form_retrieval {
  background: #ffffff;
  min-height: 200px;
  width: 92%;
  margin: 15px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
//表格
.function_keys {
  background: #ffffff;
  min-height: 600px;
  margin-top: 15px;
  margin-bottom: 50px;
  .top {
    height: 60px;
    width: 96%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      width: 145px;
      display: flex;
      justify-content: space-between;
    }
  }
  .bottom {
    width: 96%;
    margin: 0 auto;
    min-height: 370px;
  }
}
//居中
.kuang_accident {
  width: 94%;
  min-height: 110px;
}
.txt {
  border-right: 1px solid rgba(170, 206, 254, 1);
  width: 3px;
}
.kuang_accident .el-input__inner {
  width:65%;
}

@media (max-width: 768px) {
  .l .el-form-item--medium {
    margin-right: 0px !important;
    margin-left: 0px;
  }
  .m .el-form-item__label {
    margin-left: 0px;
  }
  .line_two {
    margin-top: 20px;
  }
}
</style>
<style lang="scss">
.kuang_accident .w .el-input__inner {
  width: 450px;
}
.o .el-form-item__label {
  padding: 0 35px 0 0 !important;
}
.k .el-form-item__label {
  padding: 0 35px 0 0 !important;
}
.k .el-form-item {
  margin-right: 46px !important;
}
.l .el-form-item--medium {
  margin-right: 0px !important;
  margin-left: 35px;
}
.l {
  width: 100px !important;
}
.m .el-form-item__label {
  margin-left: 75px;
}
.top .el-button--primary {
  background-color: #1288ff;
  border-color: #1288ff;
}
.paging .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #1288ff;
  color: #fff;
}

@media (max-width: 768px) {
  .paging .btn-prev {
    margin-left: 0px !important;
  }
}
.el-form-item__label {
  font-size: 18px;
}
.kuang_accident .el-form-item__content {
  width: 68%
}
.kuang_accident .el-form-item__label {
  padding: 0;
}
</style>

