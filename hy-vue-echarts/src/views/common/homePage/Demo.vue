<template>
  <div class="page">
    <!-- header -->
    <div class="page_conter">
      <div class="page_conters">
        <img src="./img/page_header.png" alt="">
      </div>
    </div>
    <!-- conter -->
    <div class="conter">
      <div class="conter_con"></div>
    </div>


    <div class="footer">京ICP备14007358号-1/京公网安备11010802014104号/Powered by 2008-2019 UI.CN</div>




  </div>
</template>

<script>
  import homeSearch from '../homePage/home_search'
  export default {
    data () {
      return {
        Demo_header:{
          width:'',
          height:''
　　　　},
        Demo_conter:{
          width:'',
          height:''
        }
      }
    },
    created () {

    },
    methods: {

    },
    components: {
      homeSearch
    },
  }
</script>

<style lang="scss" scoped>
  @import "./css/Demo.css";
</style>
