<template>
  <div class="secondpage">
    <div class="name">
      <span>作品评分 :</span>
      <el-input v-model="input.score" placeholder="请输入评分" size="large" @change='getval'></el-input>
    </div>
    <div class="name">
      <span>作品评分人数 :</span>
      <el-input v-model="input.scorePeopleNumber" placeholder="请输入人数" size="large" @change='getvalnum'></el-input>
      <span class="wan">上限为33000</span>
    </div>
    <div class="name">
      <span>网络文学题材 :</span>
      <el-select v-model="input.subjectMatter" placeholder="请选择">
        <el-option
          v-for="item in subjectMatterlist"
          :key="item.label"
          :label="item.value"
          :value="item.label">
        </el-option>
      </el-select>
    </div>
    <div class="name">
      <span>转换类型 :</span>
       <el-select v-model="input.type" placeholder="请选择">
        <el-option
          v-for="item in typelist"
          :key="item.label"
          :label="item.value"
          :value="item.label">
        </el-option>
      </el-select>
    </div>
    <div class="line"></div>
    <div class="check">
      <el-checkbox v-model="input.historicalInheritance">宣扬历史传承, 如爱国主义, 民族英雄等</el-checkbox>
    </div>
    <div class="check">
      <el-checkbox v-model="input.traditionalVirtues">弘扬中华名族传统美德, 如仁义礼智信，温良恭俭让，忠孝廉耻勇</el-checkbox>
    </div>
    <div class="check">
      <el-checkbox v-model="input.coreValues">弘扬社会主义核心价值观</el-checkbox>
    </div>
    <div class="check">
      <el-checkbox v-model="input.chineseDream">建设美好中国梦</el-checkbox>
    </div>
    <div class="check">
      <el-checkbox v-model="input.community">构建人类命运共同体</el-checkbox>
    </div>
    <div class="text">
      <p>注 : 1.评分及评分人数请以橙瓜网上的信息为准, 如没有, 可查看网文平台</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 作者评分为10分制</p>
    </div>
    <div class="bnt-box">
      <div class="back" @click="back"> 上一步</div>
      <div class="next" @click="nextstep"> 下一步</div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
      return {
        //网络文学题材
        subjectMatterlist: [
          {
            value: '喜剧',
            label: '1'
          },
          {
            value: '悬疑',
            label: '2'
          },
          {
            value: '犯罪',
            label: '3'
          },
          {
            value: '战争/革命',
            label: '4'
          },
          {
            value: '动作',
            label: '5'
          },
          {
            value: '青春励志',
            label: '6'
          },
          {
            value: '其他',
            label: '7'
          },
          {
            value: '古装',
            label: '8'
          },
          {
            value: '科幻',
            label: '9'
          },
          {
            value: '情感/剧情',
            label: '10'
          }
        ],
        typelist:[
          {
            value: '电视剧',
            label: '1'
          },
          {
            value: '电影',
            label: '2'
          }
        ],
        input:{
          score: '', //作品评分
          scorePeopleNumber: '', //作品评分人数
          subjectMatter: '', //网络文学题材
          type: '', //转换类型
        },
        inputB:{
          historicalInheritance:false, //	宣扬历史传承 0.是1.否
          traditionalVirtues:false, //	传统美德 0.是1.否
          coreValues:false, //	核心价值观 0.是1.否
          chineseDream:false, //	中国梦 0.是1.否
          community:false, //	人类命运共同体 0.是1.否
        }
      }
    },
    methods: {
      getval(val){
        console.log(Number(val))
        if(Number(val)>10){
          this.$message.error('亲，作者评分为10分制');
          this.input.score=''
          return
        }
        let pattern = /^[0-9]{1}(\.[0-9])?$/;
        if (!pattern.test(val)){
          this.$message.error('亲，只能输入数字');
          this.input.score = ''
        }
      },
      getvalnum(val){
        if(Number(val)>33000){
          this.$message.error('亲，作者评分人数上限33000');
          this.input.scorePeopleNumber=''
          return
        }
        let pattern = /^[0-9]{1}(\.[0-9])?$/;
        if (!pattern.test(Number(val))){
          this.$message.error('亲，只能输入数字');
          this.input.scorePeopleNumber = ''
        }
      },
      nextstep(){
        let obj = {...this.inputB}
        for (let key in obj) {
          if(obj[key]){
            obj[key] = '0'
          }else{
            obj[key] = '1'
          }
        }
        this.$emit('message',{...this.input,...obj,page:3})
      },
      back(){
        this.$emit('backgo',{page:1})
      }
    },
}
</script>
<style lang="scss">
  .secondpage {
    width: 604px;
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
          color: #fe0000
        }
      }
    }
    .el-input {
      width: 232px;
    }
    .line {
      width: 100%;
      margin-top:55px;
      margin-bottom: 46px;
      border-bottom: 1px dotted #000;
    }
    .check {
      padding-left: 85px;
      height: 32px;
      .el-checkbox__label {
        font-size: 16px;
      }
    }
    .text{
      padding-left: 85px;
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