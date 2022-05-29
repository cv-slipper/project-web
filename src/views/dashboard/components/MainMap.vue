<template>
  <div id='container' :style="{ width: '100%', height: '70vh' }"></div>
</template>

<script>
import { branchPoints } from './china'

export default {
  name: 'MainMap',
  data() {
    return {
      map: null,
      markers: [],
      cluster: null,
      areaPoints: branchPoints,
      allPoints: [],
      allMarkers: [],
      bigAreaMarkers: [],
      areaMarkers: [],
      litttleAreaPoints: []

    }
  },
  created() {
    this.allPoints = branchPoints.map(item => item.children).flat(2)
  },
  mounted() {
    this.initMap()


  },
  methods: {

    initMap() {
      this.map = new AMap.Map('container', {
        zoom: 3.6,//级别
        resizeEnable: true,
        center: [110.177087, 35.313861],//中心点坐标
        features: ['bg', 'road', 'building']//显示样式
      })
      this.bigAreaMarkers = this.initAreaMarker()

      this.allMarkers = this.initAllMarker()
      this.map.add(this.bigAreaMarkers)
      this.map.on('zoomchange', (e) => {
        let zoom = this.map.getZoom()
        if (zoom >= 4.8) {
          this.map.remove(this.bigAreaMarkers)
          this.map.remove(this.allMarkers)
          this.map.remove(this.areaMarkers)
          this.map.add(this.allMarkers)
        } else {
          this.map.remove(this.allMarkers)
          this.map.remove(this.areaMarkers)
          this.map.remove(this.bigAreaMarkers)
          this.map.add(this.bigAreaMarkers)

        }
      })
    },
    initAreaMarker() {
      let markers = []
      let normal = '<img style="width:50px;height:50px" src=' + require('@/assets/normal.png') + ' />'
      let warning = '<img style="width:50px;height:50px" src=' + require('@/assets/warning.png') + ' />'
      for (let i = 0; i < this.areaPoints.length; i++) {
        var marker = new AMap.Marker({
          position: this.areaPoints[i].center,
          content: normal,
          visible: true
        })
        marker.setLabel(
          {
            content: '<div class="area-label">' + this.areaPoints[i].name + '</div>',
            direction: 'top'
          }
        )

        marker.on('click', (e) => {
          this.litttleAreaPoints = this.areaPoints[i].children
          this.areaMarkers = this.initAllMarker('litttleAreaPoints')
          this.map.setZoomAndCenter(5.5, this.areaPoints[i].center)
          setTimeout(() => {
            this.map.remove(this.allMarkers)
            this.map.remove(this.bigAreaMarkers)
            this.map.remove(this.areaMarkers)
            this.map.add(this.areaMarkers)
          }, 800)

        })
        markers.push(marker)
      }
      return markers
    },
    initAllMarker(key = 'allPoints') {
      let markers = []
      let normal = '<img style="width:50px;height:50px" src=' + require('@/assets/normal.png') + ' />'
      let warning = '<img style="width:50px;height:50px" src=' + require('@/assets/warning.png') + ' />'
      for (var i = 0; i < this[key].length; i++) {
        var marker = new AMap.Marker({
          position: this[key][i].center,
          content: normal,
          visible: true
        })
        marker.setLabel(
          {
            content: '<div class="area-label">' + this[key][i].name + '</div>',
            direction: 'top'
          }
        )

        markers.push(marker)
      }
      return markers
    }


  }
}
</script>

<style scoped>
/deep/ .area-label {
  background: rgba(0, 0, 0, 0);
  color: black !important;
  font-weight: bold !important;
}

/deep/ .amap-marker-label {
  border: none !important;
  background: rgba(0, 0, 0, 0) !important;
}
</style>