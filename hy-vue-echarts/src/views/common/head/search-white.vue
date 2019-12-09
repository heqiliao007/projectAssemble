<template>
      <div>
        <!--搜索-->
        <div id="app" style="border: 1px solid #ededed; overflow: hidden; padding-top: 1px;">
            <el-input placeholder="搜索电影、明星、影院、导演" v-model="input5" class="input-with-select searchInput" style="border: none">
                <el-select v-model="select" slot="prepend" placeholder="全部" style="text-align: center; border-right: 1px solid #ededed;">
                  <el-option label="电影" value="1"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search icon-fontSize" style="border-left: 1px solid #ededed;"></el-button>
            </el-input>
        </div>
        <!--筛选条件-->
        <div id="app2" class="sereen">
            <span>
            <span class="sereen_text_w">筛选条件：</span>
            <span v-for="(item,index) in text_bott" :key="item.id" >
                <div class="text_bott_w" @click="text_botts(item,index)" :class="{text_bott_w_bg:item.show == true}">{{item.name}}</div>
            </span>
            </span>
        </div>

      </div>
</template>

<style >
  body{
  padding: 0;
  margin: 0;
}
.icon-fontSize{
  font-size:24px;
}
.search-cont{
  background: #3295d9;
  height: 150px;
}

.input-box{
  float: left;
  width: 810px;
  margin-left: 50px;
}

.header{
  width: 1200px;
  margin: 0 auto;
  padding-top: 30px;
}

.logo{
  float: left;
}

.buju{
  margin-left: 42px;
  float: left;
  padding-top: 10px;
  }
.user-head{
  float: left;
  margin-left: 42px;
  margin-top: 3px;
  background: #fff;
  border-radius: 50%;
  width: 42px;
  height: 42px;
}

.user-head img{
  width:100%;
}

.select-condition{
  margin-top: 12px;
  color: #fff;
}

.sereen{
  text-align: left;
  margin: 12px auto;
  cursor: pointer;
  font-size: 16px;
}
.sereen_text_w{
  color:#999999;
}
.sereen span{
  color: #333;
}
.text_bott_w{
  display: inline-block;
  width: 55px;
  height: 27px;
  border-radius: 2px;
  line-height: 27px;
  text-align: center;
  color: #333!important;
  margin: 0 6px;
}
.text_bott_w_bg{
  background: #3295d9;
  color: #fff!important;
}

  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
    border: none;
    border-radius: 0px;
    height:48px;
  }

  .el-input__inner{
    /* border: none; */
    height: 48px;
    font-size:16px;
    margin-left:0px;
    margin-bottom:0px;
        padding:20px;
  }

  .el-input--medium .el-input__inner {
    height: 48px;
    line-height: 48px;
  }

  .el-input-group__append {
    background-color: #fff;
    border: none;
    border-radius: 0px;
  }
  .searchInput {
  border: none !important;
}
</style>
<script>
export default {
  data () {
    return {
      input3: '',
      input4: '',
      input5: '',
      select: '',
      aaaa: false,
      text_bott: [
        { name: '全部', show: false },
        { name: '电影', show: false },
        { name: '综艺', show: false },
        { name: '剧集', show: false },
        { name: '动漫', show: false },
        { name: '明星', show: false }
      ]
    }
  },
  created: function () {

  },
  mounted: function () {
    this.getScreening()
  },
  methods: {
    text_botts: function (item, index) {
      this.text_bott.forEach(a => {
        a.show = false
      })
      item.show = !item.show
    },
    getScreening(){
      this.$http({
        url: this.$http.adornUrl('/web/product/filtercondition'),
        method: 'post'
      }).then(({ data }) => {
        for (var i=0;i<data.navigationbars.length;i++){
          var name=data.navigationbars[i].name.substr(0,2)
          data.navigationbars[i].name=name
          data.navigationbars[i].show=false
        }
        this.text_bott = data.navigationbars
      }).catch(err => {
        console.log('请求失败：');
      });
    }
  }
}
</script>
<style lang="scss">
</style>
