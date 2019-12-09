<template>
<div>
    <div style="background:#eeeeee; min-height:840px; overflow: hidden;">
        <div class="box_one">
            <el-form ref="form" :model="form" label-width="140px" style="margin:0 auto; width:75%; margin-top: 50px;">
                <el-form-item>
                    <div slot="label" style="font-size:18px;">项目名称：</div>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" style="font-size:18px;">目的任务：</div>
                    <el-input v-model="form.task"></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" style="font-size:18px;">基本内容：</div>
                    <el-input v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label" style="font-size:18px;">实施节点：</div>
                    <div class="box_two">
                        <div class="box_three">
                            <div class="block">
                                <span style="font-size:18px; padding-right:15px;">计划制定</span>
                                <el-date-picker
                                v-model="formulate"
                                type="daterange"
                                style="width:70%;"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </div>
                            <div class="block">
                                <span style="font-size:18px; padding-right:15px;">物品准备</span>
                                <el-date-picker
                                v-model="devicePreparation"
                                type="daterange"
                                style="width:70%;"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </div>
                            <div class="block">
                                <span style="font-size:18px; padding-right:15px;">人员准备</span>
                                <el-date-picker
                                v-model="personPreparation"
                                type="daterange"
                                style="width:70%;"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </div>
                            <div class="block">
                                <span style="font-size:18px; padding-right:15px;">潜水作业</span>
                                <el-date-picker
                                v-model="diving"
                                type="daterange"
                                style="width:70%;"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </div>
                            <div class="block">
                                <span style="font-size:18px; padding-right:15px;">总结汇报</span>
                                <el-date-picker
                                v-model="report"
                                type="daterange"
                                style="width:70%;"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button type="primary" @click="onSubmit" size="medium" style="background:#1288FF">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
import { formatDate } from '@/utils/formDate.js'

export default {
  name: 'Mission_profile',
  props: ['id', 'type'],
  inject: ['reload'],
  data () {
    return {
      form: {
        id: '',
        name: '',
        task: '',
        content: '',
        formulateStartTime: '',
        formulateEndTime: '',
        devicePreparationStartTime: '',
        devicePreparationEndTime: '',
        personPreparationStartTime: '',
        personPreparationEndTime: '',
        divingStartTime: '',
        divingEndTime: '',
        reportStartTime: '',
        reportEndTime: ''
      },
      // 不存放到对象里 因为对象里的数据需要深度监听 性能不好
      formulate: '',
      devicePreparation: '',
      personPreparation: '',
      diving: '',
      report: '',
      // 默认当前时间
      curTime: '',
      // 项目名称
      projectName: '',
      // 数据保存标志
      signSave: ''
    }
  },
  created () {
    // let _this = this
    this['sidebar/changePlanIndex'](0)
    // 根据旧的已存在的id和编辑类型 用于查询数据
    // this['planId/changeExistId'](`${this.id}`)
    // 如果是不是创建 才去改变existId
    // console.log(this.id === void 0)
    if (this.id !== void 0) {
      this['planId/changeExistId'](`${this.id}`)
    } else {
      this['planId/changeExistId']('')
    }
    if (this.type === '1') {
      // 调用
      this['planId/changePlanType']('1')
    } else if (this.type === '2') {
      // 编辑
      this['planId/changePlanType']('2')
    }
  },
  mounted () {
    // console.log(this.id)
    this.curTime = formatDate(new Date())
    if (!this.id) {
    // 显示默认时间
      this.formulate = [this.curTime, this.curTime]
      this.devicePreparation = [this.curTime, this.curTime]
      this.personPreparation = [this.curTime, this.curTime]
      this.diving = [this.curTime, this.curTime]
      this.report = [this.curTime, this.curTime]
    } else {
      // 用于查询
      this.form.id = this.id
      // 否则去展示数据
      this.getData()
    }
    // console.log(this.id, this.type)
    // console.log(this.$route.params.id)
  },
  methods: {
    // 弹窗
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
    // 转换时间戳
    timestamp (date) {
      let newDate = date.replace(/-/g, '/')
      let timestamp = new Date(newDate).getTime()
      return timestamp
    },
    // 根据id展示数据
    getData () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/dive/makePlan/info/' + this.id),
        method: 'POST'
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.signSave = data.msg
          console.log(data)
          _this.projectName = data.data.name
          _this.form.name = data.data.name
          _this.form.task = data.data.task
          _this.form.content = data.data.content
          _this.formulate = [data.data.formulateStartTime, data.data.formulateEndTime]
          _this.personPreparation = [data.data.personPreparationStartTime, data.data.personPreparationEndTime]
          _this.devicePreparation = [data.data.devicePreparationStartTime, data.data.devicePreparationEndTime]
          _this.diving = [data.data.divingStartTime, data.data.divingEndTime]
          _this.report = [data.data.reportStartTime, data.data.reportEndTime]
        }
      })
    },
    //   提交
    onSubmit () {
      let newToday = this.timestamp(this.curTime)
      let newformulateStartTime = this.timestamp(this.form.formulateStartTime)
      let newformulateEndTime = this.timestamp(this.form.formulateEndTime)
      let newDevicePreparationStartTime = this.timestamp(this.form.devicePreparationStartTime)
      let newDevicePreparationEndTime = this.timestamp(this.form.devicePreparationEndTime)
      let newPersonPreparationStartTime = this.timestamp(this.form.personPreparationStartTime)
      let newPersonPreparationEndTime = this.timestamp(this.form.personPreparationEndTime)
      let newDivingStartTime = this.timestamp(this.form.divingStartTime)
      let newDivingEndTime = this.timestamp(this.form.divingEndTime)
      let newReportStartTime = this.timestamp(this.form.reportStartTime)
      // 名称为空
      if (!this.form.name) {
        this.inputNull('项目名称不能为空，请确认')
      } else if (!this.form.task) {
        this.inputNull('目的任务不能为空，请确认')
      } else if (!this.form.content) {
        this.inputNull('基本内容不能为空，请确认')
      }
      // 计划制定开始时间不晚于其他项目的开始时间且不早于当前时间
      // 计划制定、物品准备、人员准备的结束时间要早于潜水作业开始时间
      // 总结汇报开始时间要晚于潜水作业结束时间
      // console.log(newformulateStartTime, newToday)
      if (newformulateStartTime < newToday) {
        this.inputNull('计划制定开始时间应不早于当前时间，请重新输入')
      } else if (newPersonPreparationStartTime < newformulateEndTime) {
        this.inputNull('计划制定结束时间应早于人员准备开始时间，请重新输入')
      } else if (newDivingStartTime < newformulateEndTime) {
        this.inputNull('计划制定结束时间应早于潜水作业开始时间，请重新输入')
      } else if (newReportStartTime < newformulateEndTime) {
        this.inputNull('计划制定结束时间应早于总结汇报开始时间，请重新输入')
      } else if (newDevicePreparationStartTime < newformulateStartTime) {
        this.inputNull('计划制定开始时间应早于物品准备开始时间，请重新输入')
      } else if (newDevicePreparationEndTime > newDivingStartTime) {
        this.inputNull('物品准备结束时间应早于潜水作业开始时间，请重新输入')
      } else if (newPersonPreparationEndTime > newDivingStartTime) {
        this.inputNull('人员准备结束时间应早于潜水作业开始时间，请重新输入')
      } else if (newReportStartTime < newDivingEndTime) {
        this.inputNull('总结汇报开始时间要晚于潜水作业结束时间，请重新输入')
      } else {
        if (!this.type) {
          // 新建保存
          this.saveData()
        } else if (this.type === '1') {
          // 调用 相当于创建新的id
          // 必须要用项目名称的改变
          if (this.projectName === this.form.name) {
            this.inputNull('请完成“项目名称”的编辑后再做保存')
          } else {
            this.saveData()
          }
        } else {
          // 编辑 相当于修改（必须要有旧的id）
          if (this.projectName === this.form.name) {
            this.inputNull('请完成“项目名称”的编辑后再做保存')
          } else {
            this.changeData()
          }
        }
      }
    },
    // 保存数据
    saveData () {
      let _this = this
      this.form.id = ''
      _this.$http({
        url: _this.$http.adornUrl('/dive/makePlan/save'),
        method: 'POST',
        data: _this.$http.adornData(_this.form)
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.signSave = data.msg
          console.log(data)
          // 存储新的id--planId 用于后续编辑
          this['planId/changePlanId'](`${data.data.id}`)
          this.$message({
            message: '保存数据成功',
            type: 'success'
          })
        } else {
          this.$message.error('保存数据失败')
        }
      })
    },
    // 编辑数据
    changeData () {
      let _this = this
      _this.$http({
        url: _this.$http.adornUrl('/dive/makePlan/update'),
        method: 'POST',
        data: _this.$http.adornData(_this.form)
      }).then(({data}) => {
        if (data && data.code === 0) {
          console.log(data)
          this.$message({
            message: '保存数据成功',
            type: 'success'
          })
        } else {
          this.$message.error('保存数据失败')
        }
      })
    },
    // 改变数据
    ...mapMutations(['sidebar/changePlanIndex', 'planId/changePlanId', 'planId/changeExistId', 'planId/changePlanType'])
  },
  // 导航拦截
  beforeRouteLeave (to, from, next) {
    let _this = this
    console.log(to.name)
    if (to.name !== 'plan') {
      if (_this.type === '1') {
          // 首先判断是否是调用 如果是调用 无法跳转下一步
        _this.$nextTick(() => {
          _this['sidebar/changePlanIndex'](0)
        })
        return false
      } else if (!_this.form.name) {
        _this.$nextTick(() => {
          _this['sidebar/changePlanIndex'](0)
        })
        _this.$confirm('请先填写‘任务概况’中的‘项目名称’，并作为新项目保存后才能填写！', '确认', {
          confirmButtonText: '确认',
          showCancelButton: false,
          type: 'warning'
        })
          .then(() => {
            return false
          })
      } else if (!_this.signSave) {
          // 首先判断保存 没有保存无法进入后面的步骤
        _this.$confirm('有未保存的数据，是否去进行保存', '确认', {
          cancelButtonText: '否',
          confirmButtonText: '是',
          distinguishCancelAndClose: true,
          type: 'warning'
        })
          .then(() => {
            _this['sidebar/changePlanIndex'](0)
            return false
          })
          .catch(action => {
            next()
          })
      // }
      } else {
        next()
      }
    } else {
      next()
    }
  },
  watch: {
    //  计划制定
    formulate () {
      [this.form.formulateStartTime, this.form.formulateEndTime] = [this.formulate[0], this.formulate[1]]
      // console.log(this.form.formulateStartTime, this.form.formulateEndTime)
    },
    // 物品准备
    devicePreparation () {
      [this.form.devicePreparationStartTime, this.form.devicePreparationEndTime] = [this.devicePreparation[0], this.devicePreparation[1]]
    },
    // 人员准备
    personPreparation () {
      [this.form.personPreparationStartTime, this.form.personPreparationEndTime] = [this.personPreparation[0], this.personPreparation[1]]
    },
    // 潜水作业
    diving () {
      [this.form.divingStartTime, this.form.divingEndTime] = [this.diving[0], this.diving[1]]
    },
    // 总结汇报
    report () {
      [this.form.reportStartTime, this.form.reportEndTime] = [this.report[0], this.report[1]]
    }
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
</style>
