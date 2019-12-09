<template>
  <div class="box">
    <div class="contrast">
      <el-row style="margin-top: 20px;">
        <el-col>
          <p class="title">添加对比影院</p>
          <i class="el-院线-close" @click="down()" style="cursor: pointer"></i>
          <div class="searchs">
            <input type="text" v-model="search" placeholder="请输入影院名称">
            <i class="el-icon-search"></i>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top: 27px;">
        <p v-for="list in lists" class="item">*{{list}} <img src="../img/reduce.png" alt=""></p>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-tabs v-model="activeName">
          <el-tab-pane label="同院线" name="first">
            <el-checkbox-group v-model="checkList">
              <el-checkbox class="list" v-for="control in controls" :key="control.trade" :label="control.trade"><span class="trade">{{control.trade}}</span><span class="company">{{control.company}}</span>{{control.city}}</el-checkbox>
            </el-checkbox-group>
          </el-tab-pane>
          <el-tab-pane label="同城市" name="second">
            <el-checkbox-group v-model="checkList">
              <el-checkbox class="list" v-for="control in controls" :key="control.trade" :label="control.trade"><span class="trade">{{control.trade}}</span><span class="company">{{control.company}}</span>{{control.city}}</el-checkbox>
            </el-checkbox-group>
          </el-tab-pane>
          <el-tab-pane label="同省份" name="third">
            <el-checkbox-group v-model="checkList">
              <el-checkbox class="list" v-for="control in controls" :key="control.trade" :label="control.trade"><span class="trade">{{control.trade}}</span><span class="company">{{control.company}}</span>{{control.city}}</el-checkbox>
            </el-checkbox-group>
          </el-tab-pane>
          <el-tab-pane label="同地区" name="fourth">
            <el-checkbox-group v-model="checkList">
              <el-checkbox class="list" v-for="control in controls" :key="control.trade" :label="control.trade"><span class="trade">{{control.trade}}</span><span class="company">{{control.company}}</span>{{control.city}}</el-checkbox>
            </el-checkbox-group>
          </el-tab-pane>
        </el-tabs>
      </el-row>
      <el-row style="text-align: center;margin-top:24px;margin-bottom: 24px;">
        <el-button type="primary" @click="contrast()">确定</el-button>
        <el-button type="info" style="margin-left: 60px;" @click="down()">取消</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
    name: "comparison",
  data(){
    return{
      search:'',
      activeName:'first',
      checkList:[],
      lists:['首都电影院昌平店','首都电影院昌平店','首都电影院昌平店','首都电影院昌平店'],
      controls:[
        {
          'trade':'首都电影院昌平店1',
          'company':'北京星影联',
          'city':'北京市'
        },{
          'trade':'首都电影院昌平店2',
          'company':'北京星影联',
          'city':'北京市'
        },{
          'trade':'首都电影院昌平店3',
          'company':'北京星影联',
          'city':'北京市'
        },{
          'trade':'首都电影院昌平店4',
          'company':'北京星影联',
          'city':'北京市'
        },{
          'trade':'首都电影院昌平店5',
          'company':'北京星影联',
          'city':'北京市'
        },{
          'trade':'首都电影院昌平店6',
          'company':'北京星影联',
          'city':'北京市'
        }
      ]
    }
  },
  watch: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    down(){
      this.$emit('down')
    },
    contrast(){
      this.$router.push({ name: 'contrastDetails' })
    }
  }
}
</script>

<style scoped>
  .list{
    display: block;
    margin: 0;
    height: 40px;
    line-height: 40px;
    padding-left: 32px;
    font-size:16px;
  }
  .trade{
    margin-left: 60px;
  }
  .company{
    margin: 0 90px;
  }
  .box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 99;
  }
  .contrast{
    width:680px;
    height:640px;
    background:rgba(255,255,255,1);
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -320px;
    margin-left: -340px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .title{
    margin: 0;
    display: inline-block;
    vertical-align: middle;
    padding-left: 30px;
    font-size:20px;
    font-family:MicrosoftYaHei-Bold;
    font-weight:bold;
    line-height: 32px;
  }
  .searchs{
    float: right;
    display: inline-block;
    vertical-align: middle;
    width:230px;
    height:30px;
    border:1px solid rgba(222,222,222,1);
    font-size: 16px;
  }
  .searchs input{
    height: 100%;
    width: 83%;
    outline: none;
    padding-left: 13px;
    border: none;
    font-size:14px;
  }
  .searchs i{
    margin-right: 14px;
  }
  .el-icon-close{
    float: right;
    margin-right: 32px;
    margin-left: 48px;
    margin-top: 7px;
    font-size: 16px;
  }
  .item{
    margin: 0 0 0 30px;
    padding-right: 32px;
    font-size:18px;
    font-family:MicrosoftYaHei-Bold;
    font-weight:bold;
    color:rgba(51,51,51,1);
    line-height: 42px;
  }
  .item img{
    float: right;
    margin-top: 11px;
  }
</style>
<style>
  .el-tabs__nav-wrap{
    padding-left: 20px;
  }
  .el-tabs__header{
    margin-bottom: 0;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #333333;
  }
</style>
