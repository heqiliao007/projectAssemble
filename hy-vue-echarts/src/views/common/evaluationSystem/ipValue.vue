<template>
  <div class="ipValue">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <div></div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>IP价值指数</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 标题 -->
    <div class="hend">
      <span>政策约束</span>
      <br />
      <br />
      <span>{{page}}/4</span>
    </div>
    <!-- 正文 -->
    <div class="bodybox" v-loading="loading">
      <fistpage @message="message" v-if="page == 1"></fistpage>
      <secondpage @message="message" @backgo="backgo" v-if="page == 2"></secondpage>
      <threepage @message="message" @backgo="backgo" v-if="page == 3"></threepage>
      <fourthpage  @backgo="backgo" v-if="page == 4" :ipIndexEntity="ipIndexEntity"></fourthpage>
    </div>
    
  </div>
</template>

<script>
import fistpage from './fistpage';
import secondpage from './secondpage';
import threepage from './threepage';
import fourthpage from './fourthpage';
export default {
  components:{fistpage, secondpage,threepage,fourthpage},
  data() {
    return {
      page:1,
      messageval:{},
      ipIndexEntity:{},
      loading:false
    };
  },
  created() {
    
  },
  methods: {
    // 价值评估
    assessment(){
      this.loading = true
      let productid = sessionStorage.getItem('firstmenu')
       this.$http({
        url: this.$http.adornUrl(`web/ipindex/assessment/${productid}`),
        method:'post',
        data: this.$http.adornData({...this.messageval})
      }).then(({data}) => {
        if(!data.code){
          this.ipIndexEntity = data.ipIndexEntity
          this.page = 4
          this.loading = false
        }
      })
    },
    message(val){
      this.messageval = {...this.messageval, ...val}
      if(val.page==4){
        this.assessment()
        return
      }
      this.page = val.page
      
    },
    backgo(val){
      this.page = val.page
    }
  }
};
</script>

<style lang="scss">
.ipValue {
  padding-left: 70px;
  .breadcrumb {
    position: absolute;
    top: 100px;
    overflow: hidden;
    > div {
      float: left;
      &:nth-child(1) {
        width: 2px;
        height: 16px;
        margin-right: 8px;
        background: #40a9ff;
      }
    }
  }
  .hend {
    color: #303133;
    font-size: 18px;
    margin-top: 30px;
    margin-bottom: 30px;
    > span {
      border-bottom: 2px solid #40a9ff;
      padding-bottom: 4px;
    }
    > span:nth-last-child(1) {
      border-bottom: none;
      // padding-bottom: 4px;
    }
  }
}
</style>
