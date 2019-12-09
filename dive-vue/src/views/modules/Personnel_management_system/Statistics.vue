<template>
  <div>
    <common-header :headChange='headChange'></common-header>
    <div class="static">
        <!-- 标题 -->
        <el-row :gutter="20">
            <el-col :span="23" :offset="1" class="static_title" style="padding:0;">
                <span>请选择字段</span>
            </el-col>
        </el-row>
        <!-- 表单 -->
        <el-row :gutter="20">
            <el-col :span="22" :offset="1" class="static_content" style="padding:45px 40px;">
                <el-form ref="form" :model="form" class="static_form">
                        <el-form-item>
                            <el-checkbox-group v-model="form.type">
                                <el-row :gutter="20" style="margin:0 0 30px;">
                                    <el-checkbox label="单位" name="type"></el-checkbox>
                                    <el-checkbox label="性别" name="type"></el-checkbox>
                                    <el-checkbox label="军衔" name="type"></el-checkbox>
                                    <el-checkbox label="资格" name="type"></el-checkbox>
                                    <el-checkbox label="年龄" name="type">
                                        年龄0~
                                        <el-input v-model="inputAge1" class="input-number" max="100" min="0" maxlength="2"></el-input>
                                        ~
                                        <el-input v-model="inputAge2" class="input-number" max="100" min="0" maxlength="2"></el-input>
                                        ~年
                                    </el-checkbox>
                                    <el-checkbox label="年龄"  name="type">
                                       军龄0~
                                        <el-input v-model="inputArmy1" class="input-number" max="100" min="0" maxlength="2"></el-input>
                                       ~
                                        <el-input v-model="inputArmy2" class="input-number" max="100" min="0" maxlength="2"></el-input>
                                       ~年
                                    </el-checkbox>
                                    <el-checkbox label="是否发生过潜水事故" name="type"></el-checkbox>
                                </el-row>
                                <el-row :gutter="20" style="margin:0 0 10px;">
                                    <el-checkbox label="等级" name="type"></el-checkbox>
                                    <el-checkbox label="学历" name="type"></el-checkbox>
                                    <el-checkbox label="婚姻" name="type"></el-checkbox>
                                    <el-checkbox label="籍贯" name="type"></el-checkbox>
                                    <el-checkbox label="潜龄" name="type">
                                        潜龄0~
                                        <el-input v-model="inputDive1" class="input-number" max="100" min="0" maxlength="2"></el-input>
                                        ~
                                        <el-input v-model="inputDive2" class="input-number" max="100" min="0" maxlength="2"></el-input>
                                        ~年
                                    </el-checkbox>
                                    <el-checkbox label="深度" name="type">
                                       深度0~
                                        <el-input v-model="inputDeep1" class="input-number" max="100" min="0" maxlength="2"></el-input>
                                        ~
                                        <el-input v-model="inputDeep2" class="input-number" max="100" min="0" maxlength="2"></el-input>
                                       ~年
                                    </el-checkbox>
                                    <el-checkbox label="当前状况" name="type"></el-checkbox>
                                </el-row>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-row style="margin:0;">
                            <el-col :span="21">
                                <el-form-item label="统计类型" prop="direction" class="direction">
                                    <el-radio-group v-model="form.direction">
                                        <el-radio label="横向"></el-radio>
                                        <el-radio label="纵向"></el-radio>
                                    </el-radio-group>
                                </el-form-item> 
                            </el-col>
                            <el-col :span="1">
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm()">筛选</el-button>
                                </el-form-item>  
                            </el-col>
                        </el-row>
                </el-form>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="23" :offset="1" class="static_title" style="padding:0;">
                <span>潜水人员统计</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="22" :offset="1" class="static_content" style="height:850px;padding:19px 15px 0px">
                <div class="img_chart"></div>
                <el-row class="button_statis" type="flex" justify="space-around" style="padding:0px 20%;">
                    <el-button type="primary" class="">统计表</el-button>
                    <el-button type="primary" class="">统计图</el-button>
                </el-row>
            </el-col>
        </el-row>
       <div class="color"></div>
    </div>
  </div>
</template>

<script>
// import commonHeader from '../../common/base/Header'
import commonHeader from '@/views/common/base/Header'
import headerIcon from '@/assets/img/icon/header/equipment.png'

export default {
  name: 'Statistics',
  components: {
    commonHeader
  },
  data () {
    return {
      headChange: {
        title: '潜水人员管理系统',
        headIcon: headerIcon
      },
      form: {
        type: [],
        direction: []
      },
      inputAge1: '',
      inputAge2: '',
      inputArmy1: '',
      inputArmy2: '',
      inputDive1: '',
      inputDive2: '',
      inputDeep1: '',
      inputDeep2: ''
    }
  },
  methods: {
    submitForm () {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/index.scss';

    // deep和stylus的<<<一样表示穿透
    /deep/ .el-checkbox .el-checkbox__label {
        font-size: $text-size18;
        color: $color-text-333;
    }
    /deep/ .el-checkbox .el-checkbox__inner {
        width: 18px;
        height: 18px;
        top: -1px;
    }
    
    /deep/ .el-checkbox+.el-checkbox{
        margin-left: 40px;
    }
    /deep/ .el-checkbox .el-checkbox__inner::after{
        // 对号
        height: 10px;
        left: 5px;
        top: 1px;
        width: 6px;
    }
    /deep/ .direction .el-form-item__label{
        font-size: $text-size18;
        color: $color-text-333;
    }
    /deep/ .direction .el-radio__label{
        font-size: $text-size18;
        color: $color-text-333;
    }
    /deep/ .direction  .el-radio__inner{
        width: 18px;
        height: 18px;
        top: -1px;
    }
    /deep/ .direction .el-radio{
        margin-left: 20px;
    }
    /deep/ .direction .el-radio+.el-radio{
        margin-left: 20px;
    }
    /deep/ .input-number{
        width:20px;
    }
    /deep/ .input-number .el-input__inner{
        width: 18px;
        height: 18px;
        line-height:18px;
        padding:0;
        background:#F5F4F4;
        border:1px solid $color-bg-checkbox;
        border-radius:0;
        position: relative;
        top: -1px;
        padding-left: 4px;
    }
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
            margin-top: 24px;
            padding: 35px 30px;
            .el-button{
                background: $color-bg-blue;
                border-color: $color-bg-blue;
                font-size: $text-size16;
                color: $color-bg-white;
            }
            .img_chart{
                width: 100%;
                height: calc(100%-72px);
                height: -webkit-calc(100% - 72px);
                // margin-bottom: 72px;
                border: 1px solid $color-bg-blue;
            }
            .button_statis{
                margin-top:16px;
            }
        }
        .color{
            height:26px;
            background: $color-text-black;
            margin-top:20px;
        }
    }
    
</style>