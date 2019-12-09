<template>
  <transition name="fade">
    <router-view v-if="isRouterAlive"></router-view>
  </transition>
</template>

<script>
  export default {
    provide () {
      return {
        reload: this.reload
      }
    },
    data () {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>
<style lang="scss">
  html,body {
    height: 100%;
    min-width: 1300px;
    padding-right: 0!important;
  }
  li{
    list-style: none;
  }
</style>
