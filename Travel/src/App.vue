<template>
  <div id="app">
    <!-- keep-alive缓存数据 -->
    <!-- 除了Detail组件其他都会被缓存 所以Detail组件会重复执行ajax -->
    <keep-alive exclude='Detail'>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {

}
</style>
