<template>
  <div id='container' :style="{ width: '100%', height: '70vh' }"></div>
</template>

<script>

export default {
  name: 'MainMap',
  data() {
    return {
      map: null,
      markers: [],
      cluster: null
    }
  },
  mounted() {
    this.initMap()


  },
  methods: {

    initMap() {
      var map = new AMap.Map('container', {
        zoom: 5,//级别
        center: [114.177087, 22.313861],//中心点坐标
        viewMode: '3D'//使用3D视图
      })
    }


  }
}
</script>

<style scoped>

</style>