<template>
  <div class="leftBox guide">
    <span class="content_title">编辑指南</span>
    <el-collapse v-model="activeNames" @change="handleChange" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          <div class="title_wrapper" :class="activeName == '1' ? 'active' : ''">
            <div :class="activeName == '1' ? 'diamond' : 'diamonds'">
              <div class="top"></div>
              <div class="bottom"></div>
            </div> 
            编辑指南 
            <span :class="activeName == '1' ? 'transAngles' : 'transAngle'"></span>
          </div>
        </template>
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <div class="title_wrapper" :class="activeName == '2' ? 'active' : ''">
            <div :class="activeName == '2' ? 'diamond' : 'diamonds'">
              <div class="top"></div>
              <div class="bottom"></div>
            </div> 
            编辑指南
            <span :class="activeName == '2' ? 'transAngles' : 'transAngle'"></span>
          </div>
        </template>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <div class="title_wrapper" :class="activeName == '3' ? 'active' : ''">
            <div :class="activeName == '3' ? 'diamond' : 'diamonds'">
              <div class="top"></div>
              <div class="bottom"></div>
            </div> 
            编辑指南
            <span :class="activeName == '3' ? 'transAngles' : 'transAngle'"></span>
          </div>
        </template>
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <div class="title_wrapper" :class="activeName == '4' ? 'active' : ''">
            <div :class="activeName == '4' ? 'diamond' : 'diamonds'">
              <div class="top"></div>
              <div class="bottom"></div>
            </div> 
            编辑指南
            <span :class="activeName == '4' ? 'transAngles' : 'transAngle'"></span>
          </div>
        </template>
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: '1', // 赋值为当前选中项目
      activeNames: ['1']
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
      this.activeName = val[val.length-1]
    }
  },

}
</script>
<style>
.guide .el-collapse{
  border: none !important;
}
.guide .el-collapse-item__header{
  border: none !important;
}
.guide .el-collapse-item__wrap{
  border: none !important;
}
.guide .el-collapse-item__arrow{
  display: none !important;
}
</style>

<style scoped>
  .active {
    color: #0084CF;
  }
  .leftBox {
    width: 250px;
    background-color: #ffffff;
    min-height: 1391px;
    padding: 10px;
  }
  .content_title{
    font-size: 14px;
    position: relative;
    line-height: 30px;
  }
  .content_title::after{
    content: '';
    background: #409eff;
    width: 100%;
    height: 3px;
    position: absolute;
    bottom: -5px;
    left: 0;
  }
.title {
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
  color: #4C4C4C;
}
.content {
  width: 100%;
  padding: 10px;
  padding-left: 65px;
}
.content > li {
  line-height: 30px;
}
.title_wrapper{
  display: flex;
  align-items: center;
}
.transAngle{
	width:0;
  height:0;
	border-right:6px solid transparent;
	border-left:6px solid transparent;
	border-top:6px solid #999;
  margin-left: 5px;
}
.transAngles{
  width:0;
  height:0;
	border-right:6px solid transparent;
	border-left:6px solid transparent;
	border-bottom:6px solid #409eff;
  margin-left: 5px;
}
.diamond{
  margin-right: 5px;
}
.diamond .top{
  border: 6px solid transparent;
  border-bottom: 6px solid #409eff;
  width: 0;
}
.diamond .bottom{
  border: 6px solid transparent;
  border-top: 6px solid #409eff;
  width: 0;
}
.diamonds{
  margin-right: 5px;
}
.diamonds .top{
  border: 6px solid transparent;
  border-bottom: 6px solid #999;
  width: 0;
}
.diamonds .bottom{
  border: 6px solid transparent;
  border-top: 6px solid #999;
  width: 0;
}
</style>

