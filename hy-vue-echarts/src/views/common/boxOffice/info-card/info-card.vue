<template>
  <el-card :shadow="shadow" class="info-card-wrapper" :padding="0">
    <div class="icon_item">
      <div class="icon_div" :style="{background: borderColor}">
        <div class="circle" :style="{background: color}" >
          <i style="font-size:48px" class="icon" :class="icon"></i>
        </div>
      </div>
      <div class="icon_title">{{title}}</div>
      <div class="icon_number" :style="{color: color}">{{number}}</div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'InfoCard',
  components: {
  },
  props: {
    number: {
      type: Number,
      default: 1205000
    },
    color: {
      type: String,
      default: '#D25858'
    },
    borderColor: {
      type: String,
      default: '#f6e5e5'
    },
    icon: {
      type: String,
      default: ''
    },
    iconSize: {
      type: Number,
      default: 20
    },
    shadow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "票房（万）"
    }
  },
  computed: {
  }
}
</script>

<style lang="scss">
.icon_item {
   position: relative;
   width:300px;
  margin:auto;
}
.icon{
	vertical-align:middle;
  color: white;
  font-size: 48px
}
.circle {
	vertical-align:middle;
	margin:auto;
	height: 101px;
	width: 100px;
	line-height: 101px;
	border-radius: 50%;
	background: #D25858;
}
.icon_div {
	display:table-cell;
	text-align: center;
	vertical-align:middle;
	border-radius: 50%;
	background:#f6e5e5;
	width: 117px;
	height: 119px;
	line-height: 119px;
}
.icon_title {
	height:18px;
	line-height: 18px;
	font-size:27px;
	font-family:MicrosoftYaHei;
	font-weight:400;
	color:#333333;
	float: left;
	left: 154px;
	top: 31px;
	position: absolute;
}

.icon_number {
	left: 154px;
	top: 63px;
	position: absolute;
	float: left;
	width:132px;
	height:26px;
	line-height: 26px;
	font-size:36px;
	font-family:DIN-Bold;
	font-weight:bold;
	color:rgba(197,82,82,1);
}
</style>
