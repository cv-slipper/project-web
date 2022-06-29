<template>
  <div class='main'>
    <keep-alive v-if='keepAlive'>
      <router-view />
    </keep-alive>
    <router-view v-else />
  </div>
</template>

<script>
export default {
  name: 'RouteView',
  computed: {
    keepAlive() {
      return this.$route.meta.keepAlive
    }
  }
}
</script>
<style>
.main {
  height: 100%;
}
</style>