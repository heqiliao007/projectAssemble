<template>
  <div class="threepage">
    <div class="name">
      <span>百度指数 :</span>
      <el-input v-model="input.baiduIndex" placeholder="请输入百度指数" size="large" @change='getval'></el-input>
      <p class="wan">上限为300000</p>
    </div>
    <div class="name">
      <span>微信指数 :</span>
      <el-input v-model="input.wechatIndex" placeholder="请输入微信指数" size="large" @change='getval1'></el-input>
      <p class="wan">上限为490000</p>
    </div>
    <div class="name">
      <span>阅读量 :</span>
      <el-input v-model="input.pv" placeholder="请输入阅读量" size="large" @change='getval2'></el-input>
      <span class="wan clo">万</span>
      <p class="wan">上限为16000万</p>
    </div>
    <div class="text">
      <p>注 : 百度指数, 微信指数, 阅读量以当前查阅的数量为准, 如之后查询, 此3个数量变动造成IP价值指数的变化, 请以新结果为准</p>
    </div>
    <div class="bnt-box">
      <div class="back" @click="back"> 上一步</div>
      <div class="next" @click="nextstep">价值评估</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      input:{
        baiduIndex:'',//	百度指数
        wechatIndex:'',	//	微信指数
        pv:''	//	阅读量
      }
    }
  },
  methods:{
    nextstep(){
      let obj = {...this.input}
      for (let key in obj) {
        if(obj[key]){
          obj[key] = '0'
        }else{
          obj[key] = '1'
        }
      }
      this.$emit('message',{...this.input,page:4})
    },
    getval(val){
      if(val>300000){
        this.$message.error('亲，百度指数上限为300000');
        this.input.baiduIndex=''
      }
    },
    getval1(val){
      if(val>490000){
        this.$message.error('亲，微信指数上限为490000');
        this.input.wechatIndex=''
      }
    },
    getval2(val){
      if(val>16000){
        this.$message.error('亲，阅读量上限为16000万');
        this.input.pv=''
      }
    },
    back(){
      this.$emit('backgo',{page:2})
    }
  }
}
</script>

<style lang='scss'>
 .threepage {
    width: 660px;
    margin: 0 auto;
    color: #4c4c4c;
    font-size: 16px;
    >div{
      margin-bottom: 20px;
      >span{
        display: inline-block;
        width: 230px;
        text-align: right;
        font-size: 16px;
        &.wan{
          width: 118px;
          color: #fe0000;
          text-align: left;
        }
        &.clo{
          color: #4c4c4c
        }
      }
    }
    .name{
       >p{
         color: #fe0000;
         margin: 0;
         padding-left: 234px; 
         padding-top: 10px;
      }
    }
    .el-input {
      width: 232px;
    }
    .text{
      margin-top: 75px;
      margin-bottom: 118px;
      color: #fe0000;
      font-size: 12px;
    }
    .bnt-box{
      display: flex;
      align-items: center;
      .back{
        width: 70px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #0084cf;
        margin: 0 auto;
        background: #fff;
        border: 1px solid #0084cf;
        border-radius: 6px;
        cursor: pointer;
      }
      .next{
        width: 70px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        margin: 0 auto;
        background: #0084cf;
        border-radius: 6px;
        cursor: pointer;
      }
    }
 }
</style>
