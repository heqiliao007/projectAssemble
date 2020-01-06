<template>
     <div>
        <detail-banner
            :sightName='sightName'
            :bannerImg='bannerImg'
            :gallaryImgs='gallaryImgs'
          >
        </detail-banner>
        <detail-header></detail-header>
        <div class="content">
            <detail-list :list='list'></detail-list>
        </div>
     </div>
</template>


<script>
import DetailBanner from './components/Banner'
import DetailHeader from './components/Header'
import DetailList from './components/List.vue'
import axios from 'axios'
export default {
    name:'Detail',
    //局部组件先注册再使用
    components:{
        DetailBanner,
        DetailHeader,
        DetailList
    },
    data(){
        return {
            sightName: '',
            bannerImg: '',
            gallaryImgs:[],
            list:[]
        }
    },
    mounted(){
        this.getDetailInfo();
    },
    methods:{
        getDetailInfo(){
            // axios.get('/api/detail.json?id='+this.$route.params.id)
            axios.get('/api/detail.json',{
                // 接收参数$route
                params:{
                    id:this.$route.params.id
                }
             }).then(this.handleGetDataSucc)
        },
        handleGetDataSucc(res){
            console.log(res)
            res=res.data;
            if (res.ret && res.data) {
                const data = res.data;
                console.log(data)
                this.sightName=data.sightName;
                this.bannerImg=data.bannerImg;
                this.gallaryImgs=data.gallaryImgs;
                this.list=data.categoryList;

            }
        }
    }
}
</script>

<style lang="stylus" scoped>
  .content
      height:50rem
</style>
