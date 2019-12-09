<template>
  <div class="leftBox">
    <div class="categrary" style="border-bottom: 1px solid #CCCCCC;">
      <div class="title">
        <i class="el-icon-tickets" style="margin-right: 10px;"></i>
        <span style="">词条分类</span>
      </div>
      <ul class="content">
        <li>
          电影
        </li>
      </ul>
    </div>
    <div class="catalogue">
      <div class="title">
        <i class="el-icon-tickets" style="margin-right: 10px;"></i>
        <span style="">目录</span>
      </div>
    <!--  <ul class="content">
        <li @click="returnTop('#baseInfo')">
          基本信息
        </li>
        <li @click="returnTop('#cinama')">
          所获奖项
        </li>
        <li @click="returnTop('#playtimes')">
          历史代言
        </li>
      </ul>-->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {
    returnTop (val) {
      document.querySelector(val).scrollIntoView(true)
    },
    getentrys () {
      this.entrys = JSON.parse(sessionStorage.getItem('entrys') || [])
      console.log(this.entrys)
    }
  }

}
</script>

<style scoped>
  .leftBox {
    width: 250px;
    background-color: #ffffff;
    min-height: 1391px;
    padding: 10px;
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
  cursor: pointer;
}
</style>

