<template>
  <div class="particulars">
     <!-- 面包屑 -->
    <div class="breadcrumb">
      <div></div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{  name: '剧本精品库' }">剧本精品库</el-breadcrumb-item>
        <el-breadcrumb-item>剧本名称</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 标题 -->
    <h2>{{particularsText.name}}</h2>
    <div class="label">
      <ul>
        <li v-for='(item, index) in tagnames' :key="index">{{item}}</li>
      </ul>
    </div>
    <div class="bodytext">
      <p><span>作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;者 ：</span> <span>{{particularsText.authorname}}</span></p>
      <p><span>国&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家 ：</span> <span>{{particularsText.country}}</span></p>
      <p><span>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;代 ：</span> <span>{{particularsText.age}}</span></p>
      <p><span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型 ：</span> <span>{{particularsText.scripttypename }}</span></p>
      <div><p>详情内容 ： </p> <p>{{particularsText.intro}}</p></div>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      id:this.$route.query.id,
      particularsText:{}
    }
  },
  created(){
    this.getPartivulars()
  },
  computed:{
    tagnames(){
      if(!this.particularsText.tagnames) return []
      return this.particularsText.tagnames.split(',')
    }
  },
  methods:{
    getPartivulars(){
      let productid = sessionStorage.getItem('firstmenu')
      this.$http({
        url: this.$http.adornUrl(`/web/script/details/${productid}/${this.id}`),
      }).then(({data}) => {
        console.log(data.details)
        if(!data.code){
          this.particularsText = data.details
        }
      })
    }
  }
}
</script>

<style lang='scss'>
  .particulars{
    width: 100%;
    height: 100%;
    padding-top: 110px;
    padding-right: 77px;
    padding-left: 70px;
    background: #fff;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    .breadcrumb{
      overflow: hidden;
    }
    h2{
      margin-top: 53px;
      font-size: 32px;
    }
    .label{
      overflow: hidden;
      ul{
        padding: 0;
        li{
          font-size: 12px;
          float: left;
          padding:4px 10px;
          background: #0084cf;
          color: #fff;
          line-height: 17px;
          text-align: center;
          list-style-type: none;
          margin-right:14px;
          margin-bottom: 32px;
        }
      }
    }
    .bodytext{
      >p{
        >span:nth-child(1){
          color:#969696;
        }
      }
      >div{
        margin-top: 37px;
        >p:nth-child(1){
          color:#969696;
          float: left;
        }
        >p:nth-child(2){
          margin-top: 14px;
          // padding-left: 10px;
          width: 80%;
          // word-wrap:break-word;
          float: left;
        }
      }
    }
  }
</style>
