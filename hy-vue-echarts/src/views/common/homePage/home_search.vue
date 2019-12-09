<template>
  <div class="input_cont">
    <div class="all_text">全部</div>
    <input class="inputs" type="text" placeholder="搜索电影、明星、影院、导演">
    <el-button class="cont_button" slot="append" type="" @click="search()">搜索一下</el-button>
    <!-- <div class="sereen">
      <span>
        <span class="sereen_text">筛选条件：</span>
        <span v-for="(item,index) in text_bott" :key="item.value" >
          <div class="text_bott" @click="text_botts(item,index)" :class="{text_bott_bg:item.show == true}">{{item.name}}</div>
        </span>
      </span>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      input3: '',
      input4: '',
      input5: '',
      select: '',
      aaaa:false,
      text_bott: [
          // { name: '全部' ,show: true},
          // { name: '电影' ,show: false},
          // { name: '综艺' ,show: false},
          // { name: '剧集' ,show: false},
          // { name: '动漫' ,show: false},
          // { name: '明星' ,show: false}
      ]
    }
  },
  created:function(){

  },
  mounted: function () {
    // this.getScreening()
  },
  methods:{
    text_botts : function(item,index){
      this.text_bott.forEach(a=>{
        a.show = false
      })
      item.show = !item.show;
    },
    search(){
      this.$router.push({ name: "video" });
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
  },
}
</script>

<style lang="scss" scoped>
@import "./css/home_search.css";
</style>
