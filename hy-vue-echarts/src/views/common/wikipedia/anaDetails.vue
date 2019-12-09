<template>
  <div style="padding: 0 75px;">
    <el-row style="margin: 15px 0;" v-loading="loading">
      <el-col :span="12">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="border-left: 2px solid rgb(65, 169, 254);padding-left: 6px;">
          <el-breadcrumb-item style="cursor: pointer;" @click.native="gohome" >首页</el-breadcrumb-item>
          <el-breadcrumb-item style="cursor: pointer;" @click.native="goPre" >重要领导人语录</el-breadcrumb-item>
          <el-breadcrumb-item>重要指示</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <p class="title">第七届中国网络视听大会</p>
      <p class="content"><span>领导人</span><span>:</span><span v-html="data.leader"></span></p>
      <p class="content"><span>职位</span><span>:</span><span v-html="data.position"></span></p>
      <p class="content"><span>标签</span><span>:</span><span v-html="data.labelNames"></span></p>
      <p class="content"><span>时间</span><span>:</span><span v-html="data.date"></span></p>
      <p class="content"><span>重要指示</span><span>:</span><span v-html="data.importantIndication" style="font-weight: 500;"></span></p>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading:true,
        id:'',
        data:{},
      };
    },
    created() {},
    mounted() {
      this.id = this.$route.query.id || '';
      this.getdata()
    },
    methods: {
      gohome(){
        this.$router.push({
        	path: '/home'
        });
      },
      goPre() {
      	// console.log('===============返回上一级菜单')
      	this.$router.go(-1);
      },
      getdata(){
        this.$http({
        	url: this.$http.adornUrl('web/leaderana/queryInfo?id='+this.id),
        	method: 'POST'
        })
        	.then(({ data }) => {
            this.loading=false
            this.data=data.data
        	})
      }
    },
    components: {}
  };
</script>

<style scoped>
  .title {
    font-size: 30px;
    font-family: "SourceHanSansCN";
    color: rgb(53, 53, 53);
    font-weight: bold;
    line-height: 1.2;
  }
  .content{
    font-size: 14px;
    font-family: "SimSun";
    color: rgb(0,0,0);
    line-height: 1.857;
    position: relative;
    padding-left: 74px;
  }
  .content span:first-of-type{
    display: block;
    position: absolute;
    left: 0;
    width: 64px;
    display: inline-block;
    text-align: justify;
    vertical-align: top;
    color: #969696;
    line-height: 1.857;
  }
  .content span:first-of-type::after {
  	display: inline-block;
  	width: 100%;
  	content: '';
  	height: 0;
  }
  .content span:nth-of-type(2){
    position: absolute;
    left: 64px;
    color: #969696;
    line-height: 1.857;
  }
  .content span:nth-of-type(3){
    font-weight: bold;
  }
</style>
