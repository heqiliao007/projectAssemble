<template>
  <div class="goodsblack">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <div></div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>分析报告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 标题 -->
    <div class="hend">
      <span>分析报告详情</span>
    </div>
    <div class="sou">
      <div class="block">
        <!--           @change='getyear' -->
        <el-date-picker
          @change='getyear'
          v-model='year'
          type="year"
          placeholder="选择年">
        </el-date-picker>
      </div>
    </div>
    <div class="body">
      <ul v-if="analysislist">
        <li v-for="item in analysislist" :key="item.id">
          <div class="img-box">
            <img :src="item.img" alt="">
          </div>
          <div class="bth"><a :href="item.pdf" target="_blank">浏览报告</a></div>
        </li>
      </ul>
      <div class="kong" v-else>
        <div class="img-box">
          <p>暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      year:'',
      analysislist:[] // 分析报告数据
    }
  },
  created() {
    this.grtanalysis()
  },
  methods:{
    //获取分析报告数据
    grtanalysis(val){
      let productid = sessionStorage.getItem('firstmenu')
      let year
      if(!this.year){
        let date = new Date()
        year = date.getFullYear()
      }else{
        year = val
      }
      this.$http({
        url: this.$http.adornUrl(`/web/scriptAnalysis/list/${productid}?year=${year}`),
        method:'post',
        data: this.$http.adornData({
          year:this.year || year
        })
      }).then(({data}) => {
        if(!data.code){
          this.analysislist = data.page.records
        }
      })
    },
    //获取时间（年）
    getyear(val){
      let tiem = val.getFullYear()
      this.grtanalysis(tiem)
    }
  }
}
</script>

<style lang="scss">

  .goodsblack {
    padding-left: 70px;
    .breadcrumb{
      position: absolute;
      top: 100px;
      overflow: hidden;
      >div{
        float: left;
        &:nth-child(1){
          width: 2px;
          height: 16px;
          margin-right: 8px;
          background: #40a9ff;
        }
        
      }
    }
    .hend{
      color: #303133;
      font-size: 18px;
      margin-top: 30px;
      margin-bottom: 30px;
      >span{
        border-bottom: 2px solid #40a9ff;
        padding-bottom: 4px;
      }
    }
    .sou{
      margin-bottom: 20px;
      overflow: hidden;
      line-height: 40px;
    }
    .body{
      padding-right: 77px;
      margin-top: 77px;
      ul{
        list-style-type: none;
        padding: 0;
        padding-right: 150px;
        li{
          float: left;
          width: 50%;
          height: 324px;
          border-bottom: 1px dashed #ccc;
          &:nth-last-child(1){
            border-bottom:none;
          }
          &:nth-last-child(2){
            border-bottom:none;
          }
          >.img-box{
            width: 355px;
            height: 240px;
            margin: 0 auto;
            >img{
              width: 100%;
            }
          }
          >.bth{
            width: 70px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin: 0 auto;
            color: #0084cf;
            margin-top: 22px;
            border: 1px solid #0084cf;
            cursor: pointer;
            >a{
              color:inherit;
              text-decoration: none;
            }
            &:hover{
              color: #fff;
              background: #0084cf;
            }
          }
        }
      }
      .kong{
        height: 500px;
        display:flex;
        justify-content: center;
        align-items: center;
        .img-box{
          width: 194px;
          height: 220px;
          background: url('./../../../assets/img/6ebfcfc7bdf8bbe6f3c97875854ff96.png') no-repeat;
          position: relative;
          >p{
            position: absolute;
            bottom:0;
            width: 100%;
            text-align: center;
            color: #999;
            font-size: 20px;
          }
        }
      }
    }
  }
  
</style>
