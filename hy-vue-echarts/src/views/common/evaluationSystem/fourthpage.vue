<template>
  <div class="fourthpage">
    <div class="top">
      <div class="item-box">
        <div class="name">IP价值指数</div>
        <div class="num color">{{ipIndexEntity.ipIndex}}</div>
      </div>
    </div>
    <div class="bottom">
      <div class="item-box">
        <div class="name">政策约束</div>
        <div class="num color">{{ipIndexEntity.politicalScore}}</div>
      </div>
      <div class="item-box">
        <div class="name">思想文化</div>
        <div class="num color">{{ipIndexEntity.culturalScore}}</div>
      </div>
      <div class="item-box">
        <div class="name">商业价值</div>
        <div class="num color">{{ipIndexEntity.commercialScore}}</div>
      </div>
    </div>
    <div class="text">
      <p>注 : 1.评分及评分人数请以橙瓜网上的信息为准, 如没有, 可查看网文平台</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 作者评分为10分制</p>
    </div>
    <div class="bnt-box">
      <div class="next" @click="next"> 重新评估</div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    ipIndexEntity:{
      Type: Object,
      default: () => {
        return {
          politicalScore:'',
          culturalScore:'',
          commercialScore: '',
          ipIndex:''
        }
      }
    }
  },
  methods:{
    next(){
      this.$emit('backgo',{page:1})
    }
  }
}
</script>

<style lang='scss'>
  .fourthpage{
    width: 1192px;
    margin: 0 auto;
    .top{
        margin-bottom: 98px;
        position: relative;
        &::before{
          display: block;
          width: 796px;
          content: '';
          border: 1px solid #bfbfbf;
          border-radius: 2px;
          position: absolute;
          bottom: -49px;
          left: 50%;
          transform: translate(-50%,0)
        }
      .item-box{
        margin: 0 auto;
        width: 290px;
        height: 222px;
        border: 2px solid #bfbfbf;
        border-radius: 10px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .name{
          position: absolute;
          width: 150px;
          height: 51px;
          line-height: 51px;
          text-align: center;
          color: #8c8c8c;
          font-size: 24px;
          top: 0;
          left:50%;
          background: #fff;
          transform: translate(-50%,-50%);
        }
        .num{
          font-size: 60px;
          font-weight: 600;
          color:#0084cf;
        }
      }
    }
    .bottom{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item-box{
        margin: 0 auto;
        width: 290px;
        height: 162px;
        border: 2px solid #bfbfbf;
        border-radius: 10px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        &:nth-child(2)>.name::before{
          height: 54px;
          top:-100%
        }
        .name{
          position: absolute;
          width: 150px;
          height: 51px;
          line-height: 51px;
          text-align: center;
          color: #8c8c8c;
          font-size: 24px;
          top: 0;
          left:50%;
          background: #fff;
          transform: translate(-50%,-50%);
          &::before{
            display: block;
            content: '';
            position: absolute;
            top: -52%;
            left:50%;
            height: 27px;
            border: 1px solid #bfbfbf;
          }
          
        }
        .num{
          font-size: 60px;
          font-weight: 600;
          color:#7a7a7a;
        }
      }
    }
    .text{
      padding-top: 66px; 
      padding-left: 393px;
      color: #fe0000;
      font-size: 12px;
      margin: 0 auto;
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
