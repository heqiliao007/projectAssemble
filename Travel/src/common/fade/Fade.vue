<template>
    <div>
       <transition>
           <!--插槽 -->
           <slot></slot>
       </transition>
    </div>
</template>
<script>
export default {
    name:'Fade',
}
</script>
<style lang="stylus" scoped>
    @import '~styles/varibles.styl';
    .v-enter, .v-leave-to
        opacity:0
    .v-enter-active, .v-leave-active
        transition: opacity 1s
</style>