<template>
  <div>
    <img src="./img/popup-window_bg.png" alt>
    <div class="h-title">添加常用的产品</div>
    <div class="product-cont">
      <el-checkbox-group v-model="checkboxData">
        <el-row :gutter="16" style="padding-left: 50px;">
          <el-col :span="7" v-for="commonProduct in commonProducts" :key="commonProduct.id" style="margin-bottom: 30px;">
            <el-checkbox-group v-model="checkboxGroup">
              <el-checkbox-button :label="commonProduct.name" @change="select(commonProduct.name,commonProduct.id)"></el-checkbox-button>
            </el-checkbox-group>
          </el-col>
        </el-row>
        <!--<el-row :gutter="16">-->
          <!--<el-col :span="8" :offset="1">-->
            <!--<el-checkbox-button :label="commonProducts[0].name"></el-checkbox-button>-->
          <!--</el-col>-->
          <!--<el-col :span="7">-->
            <!--<el-checkbox-button :label="commonProducts[1].name"></el-checkbox-button>-->
          <!--</el-col>-->
          <!--<el-col :span="7">-->
            <!--<el-checkbox-button :label="commonProducts[2].name"></el-checkbox-button>-->
          <!--</el-col>-->
        <!--</el-row>-->

        <!--<el-row :gutter="16" style="margin-top: 30px;">-->
          <!--<el-col :span="8" :offset="1" style="margin-left:60px;">-->
            <!--<el-checkbox-button :label="commonProducts[3].name"></el-checkbox-button>-->
          <!--</el-col>-->
          <!--<el-col :span="7" style="margin-left: -35px;">-->
            <!--<el-checkbox-button :label="commonProducts[4].name"></el-checkbox-button>-->
          <!--</el-col>-->
          <!--<el-col :span="7" style="margin-left: -30px;">-->
            <!--<el-checkbox-button :label="commonProducts[5].name"></el-checkbox-button>-->
          <!--</el-col>-->
        <!--</el-row>-->

        <!--<el-row :gutter="16" style="margin-top: 30px;">-->
          <!--<el-col :span="7" :offset="5">-->
            <!--<el-checkbox-button :label="commonProducts[6].name"></el-checkbox-button>-->
          <!--</el-col>-->
          <!--<el-col :span="9">-->
            <!--<el-checkbox-button :label="commonProducts[7].name"></el-checkbox-button>-->
          <!--</el-col>-->
        <!--</el-row>-->
      </el-checkbox-group>

      <el-row :gutter="16" style="margin-top: 60px;">
        <el-col :span="23" :offset="1">
          <el-button
            round
            style="width:334px;height:52px;background: #3295D9;color:#fff;font-size: 18px;"
            @click="submit()"
            :disabled="saveproduct"
          >完成&nbsp;&nbsp;进入瀚叶</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      saveproduct:true,
      checkboxGroup:[],
      checkboxData: [],
      commonProducts: [],
      checkIds:[]
    };
  },
  created() {},
  mounted () {
    this.getCommonProducts()
  },
  methods: {
    getCommonProducts () {
      this.$http({
        url: this.$http.adornUrl('/web/product/commonproducts'),
        method: 'post',
        data:{'token':  Vue.cookie.get('token')}
      }).then(({ data }) => {
        console.log(data)
        this.commonProducts = data.productEntitieslist
        // if (data && data.code === 0) {
        // } else {
        // }
      })
    },
    submit() {
      this.$http({
        url: this.$http.adornUrl('/web/product/addcommonproducts/'+this.checkIds),
        method: 'post',
        data:{'productIds':  this.checkIds}
      }).then(({ data }) => {
        console.log(data)
        if(data.code==0){
          sessionStorage.setItem('productList', JSON.stringify(data.productEntityList))
          this.$router.replace({ name: "home_modul" });
        }
      })
    },
    select(name,val){
      if (this.checkboxGroup.indexOf(name)==-1){
        this.checkIds.splice(this.checkIds.indexOf(val), 1);
      }else {
        this.checkIds.push(val)
      }
      if (this.checkboxGroup.length==0){
        this.saveproduct=true
      } else {
        this.saveproduct=false
      }
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.h-title {
  color: #3295d9;
  font-size: 20px;
  margin-top: 30px;
  margin-left: 15px;
}

.product-cont {
  margin-top: 30px;
}

.el-checkbox-button__inner {
  border-radius: 20px !important;
}

.el-checkbox-button.is-checked:first-child .el-checkbox-button__inner {
  background: #3295d9;
}
</style>
