<template>
<div>
    <!-- <common-header :headChange="headChange"></common-header>
    <div class="box">
        <el-row  class="plan">
            <el-col :span="4">
                <common-plan-sidebar :curIndex='curIndex'></common-plan-sidebar>
            </el-col>
            <el-col :span="20"> -->
                <div style="background:#eeeeee; min-height:840px; overflow: hidden;">
                    <div class="box_one">
                        <el-form ref="form" :model="form" label-width="140px" style="margin:0 auto; width:75%; margin-top: 145px; min-height:550px; position;relative">
                            <el-form-item>
                                <div slot="label" style="font-size:18px;">项目名称：</div>
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                             <el-form-item style="width:100%;">
                                <div slot="label" style="font-size:18px;">选择时间：</div>
                                <el-date-picker
                                v-model="value3"
                                type="datetime"
                                style="width:100%;"
                                prefix-icon="el-icon-date"
                                placeholder="选择日期时间"
                                >
                                </el-date-picker>
                            </el-form-item>
                            <div class="right">
                                <div class="one_icon" title="保存"></div>
                                <div class="two_icon" title="打印"></div>
                                <div class="three_icon" title="疑难"></div>
                                <div class="four_icon" title="关闭"></div>
                                </div>
                            </el-form>
                    </div>
                </div>
            <!-- </el-col>
        </el-row>
    </div> -->
</div>
    
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Project_information',
  data () {
    return {
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
      value3: ''
    //   curIndex: 0
    }
  },
  created () {
    this['sidebar/changeRiskIndex'](0)
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    ...mapMutations(['sidebar/changeRiskIndex'])
  }
}
</script>

<style lang="scss" scoped>
    .plan{
        background-color: #eeeeee;
        display: flex;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
    }
    .box_one {
        margin: 0 auto;
        background: #ffffff;
        height: 840px;
        width: 96%;
        margin-top: 39px;
        overflow: hidden;
    }
    .box_two {
        height: 455px;
        width: 100%;
        border: 1px solid #8AB6E2;
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
.right {
    width: 180px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 100px;
    right:100px;
  }
</style>
