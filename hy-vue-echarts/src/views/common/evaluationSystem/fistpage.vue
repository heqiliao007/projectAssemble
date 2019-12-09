<template>
  <div class="fistpage">
      <div class="name">
          作品名称 ：
          <el-input v-model="name" placeholder="请输入作品名称" size="large"></el-input>
        </div>
      <div class="top">
        <div class="top-input">
          <div class="check">
            <el-checkbox v-model="input.opositionConstitution">反对宪法基本原则</el-checkbox>
          </div>
          <div class="check">
            <el-checkbox v-model="input.endangeringNationalUnity">危害国家统一</el-checkbox>
          </div>
          <div class="check">
            <el-checkbox v-model="inputB.policy">故事符合当下的政策法规</el-checkbox>
          </div>
          <div class="check">
            <el-checkbox v-model="input.involvingStateSecrets">涉及国家机密</el-checkbox>
          </div>
          <div class="check">
            <el-checkbox v-model="input.endangeringNationalRally">危害民族团结</el-checkbox>
          </div>
           <div class="check">
            <el-checkbox v-model="inputB.mainstreamValues">故事人物形象符合主流价值观</el-checkbox>
          </div>
          <div class="check">
            <el-checkbox v-model="input.propagandaCults">宣传邪教</el-checkbox>
          </div>
          <div class="check">
            <el-checkbox v-model="input.disturbingSocialOrder">扰乱社会秩序</el-checkbox>
          </div>
          <div class="check">
            <el-checkbox v-model="input.infringementLegalRight">侵犯他人合法权益</el-checkbox>
          </div>
          <div class="check">
            <el-checkbox v-model="input.incorrectValues">宣扬不正确价值观</el-checkbox>
          </div>
          <div class="check">
            <el-checkbox v-model="inputB.subjects">政策提倡的题材</el-checkbox>
          </div>
          <div class="check">
            <el-checkbox v-model="input.abetCrime">宣扬淫秽, 赌博, 暴力或者教唆犯罪</el-checkbox>
          </div>
          <div class="check">
            <el-checkbox v-model="input.infringementMinors">危害未成年人合法权益</el-checkbox>
          </div>
        </div>
      </div>
      <!-- <div class="line"></div> -->
      <div class="bottom">
        
       
        
      </div>

      <div class="text">
        <div class="right">
          <p>注：1. 此评估结果为估值,不可做商业及危害本公司用途, 如有违反本公司会依法追究责任</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 分割线以上选项为负面, 分割线以下为正面, 请慎重勾选</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 如想得到更详细的IP价值结果请联系瀚业数据</p>
        </div>
      </div>
      <div class="btn" @click="nextstep">下一页</div>
    </div>
</template>

<script>
export default {
  data(){
    return {
      name: '', //作品名称
      input:{
        opositionConstitution: false,	//反对宪法基本原则 0.是1.否
        endangeringNationalUnity: false,	//危害国家统一 0.是1.否
        involvingStateSecrets: false, //涉及国际机密 0.是1.否
        endangeringNationalRally: false, //危害民族团结 0.是1.否
        propagandaCults: false, //宣扬邪教 0.是1.否
        disturbingSocialOrder: false, //扰乱社会秩序 0.是1.否
        infringementLegalRight: false, //侵犯他人合法权益 0.是1.否
        incorrectValues: false, //宣扬不正确价值观 0.是1.否
        abetCrime: false, //教唆犯罪 0.是1.否
        infringementMinors: false, //侵害未成年人合法权益 0.是1.否
      },
      inputB:{
        policy: false, //符合政策法规 0.是1.否
        mainstreamValues: false, //符合主流价值观 0.是1.否
        subjects: false  //政策提倡的题材 0.是1.否
      }
    }
  },
  methods: {
    disabledfn(val){
      for (let key in val) {
        if(val[key]){
          return true
        }
      }
    },
    nextstep(){
      let obj = {...this.input,...this.inputB}
      for (let key in obj) {
        if(obj[key]){
          obj[key] = '0'
        }else{
          obj[key] = '1'
        }
      }
      this.$emit('message',{name:this.name,...obj,page:2})
    }
  },
}
</script>

<style lang='scss'>
  .fistpage {
    width: 604px;
    margin: 0 auto;
    display: flex;
    color: #4c4c4c;
    align-items: center;
    flex-direction: column;
    .name {
      margin-bottom: 20px;
      font-size: 18px;
      .el-input {
        width: 232px;
      }
    }
    .check {
      padding-left: 50px;
      width: 232px;
      height: 32px;
      .el-checkbox__label {
        font-size: 16px;
      }
    }
    .line {
      width: 100%;
      margin-top:10px;
      margin-bottom: 27px;
      border-bottom: 1px dotted #000;
    }
    .text {
      font-size:12px; 
      margin: 0 auto;
      color: #fe0000;
    }
    .btn {
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
</style>
