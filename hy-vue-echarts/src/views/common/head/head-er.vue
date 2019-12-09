<template>
  <div class="search-cont">
    <div class="header">
      <div class="logo">
         <router-link to="/home_modul">
        <img src="./img/recommended_logo.png">
         </router-link>
      </div>
      <div class="input-box">

        <div id="app">
            <el-input placeholder="搜索电影、明星、影院、导演" v-model="input5" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="电影" value="1"></el-option>
                <el-option label="明星" value="2"></el-option>
                <el-option label="影院" value="3"></el-option>
                <el-option label="导演" value="4"></el-option>
                </el-select>
								<el-button slot="append" icon="el-icon-search icon-fontSize" @click="tosearchList()"></el-button>
            </el-input>
        </div>

        <div id="app2" class="sereen">
            <span>
            <span class="sereen_text_h">筛选条件：</span>
            <span v-for="(item,index) in text_bott" :key="item.id" >
                <div class="text_bott_h" @click="text_botts(item,index)" :class="{text_bott_h_bg:item.show == true}">{{item.name}}</div>
            </span>
            </span>
        </div>
      </div>
      <div class="buju"><img src="./img/recommended_buju.png"></div>

      <div class="user-head">
        <img src="./img/recommended_renci.png">
      </div>
    </div>
  </div>
</template>

<style>
  .el-select .el-input {
    width: 130px;
  }

  .input-box{
    float: left;
    width: 810px;
    margin-left: 50px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
    border: none;
    border-radius: 0px;
    height:48px;
  }

  .el-input__inner{
    /*border: none;*/
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
        console.log(data)
        for (var i=0;i<data.navigationbars.length;i++){
          var name=data.navigationbars[i].name.substr(0,2)
          data.navigationbars[i].name=name
          data.navigationbars[i].show=false
        }
        this.text_bott = data.navigationbars
      }).catch(err => {
        console.log('请求失败：');
      });
    },
		tosearchList(){
			this.$router.push({
			  path: '/searchList'
			})
		}
  },

  components: {
  }
}
</script>
<style lang="scss" scoped>
  @import "./css/head.css";
</style>
