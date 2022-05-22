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
      cluster: null,
      areaMarker: [
        {
          name: '东北区域',
          center: [123.429096, 41.796767]
        },
        {
          name: '华北区域',
          center: [117.210813, 39.14393]
        },
        {
          name: '华东区域',
          center: [120.619585, 31.299379]
        },
        {
          name: '华南区域',
          center: [113.280637, 23.125178]
        },
        {
          name: '华中区域',
          center: [114.298572, 30.581084]
        },
        {
          name: '西南区域',
          center: [102.712251, 24.95792]
        },
        {
          name: '西北区域',
          center: [87.617733, 43.792818]
        }
      ],
      allMarker: [
        {
          name: '昌平分行',
          center: [116.235906, 40.218085]
        },
        {
          name: '朝阳分行',
          center: [116.434446, 39.92147]
        },
        {
          name: '海淀分行',
          center: [116.310316, 39.956074]
        }
      ]
    }
  },
  mounted() {
    this.initMap()


  },
  methods: {

    initMap() {
      var map = new AMap.Map('container', {
        zoom: 4,//级别
        resizeEnable: true,
        center: [114.177087, 22.313861]//中心点坐标
      })
      let markers = []
      let normal = '<img style="width:50px;height:50px" src=' + require('@/assets/normal.png') + ' />'
      let warning = '<img style="width:50px;height:50px" src=' + require('@/assets/warning.png') + ' />'
      for (var i = 0; i < this.areaMarker.length; i++) {
        var marker = new AMap.Marker({
          position: this.areaMarker[i].center,
          content: normal,
          map: map
        })
        marker.setLabel(
          {
            content: '<div class="area-label">' + this.areaMarker[i].name + '</div>',
            direction: 'top'
          }
        )
        markers.push(marker)
      }
      map.setFitView()
      map.on('zoomchange', (e) => {
        let zoom = map.getZoom()
        if (zoom >= 5) {
          map.remove(markers)
          for (var i = 0; i < this.allMarker.length; i++) {
            var marker = new AMap.Marker({
              position: this.allMarker[i].center,
              content: normal,
              map: map
            })
            marker.setLabel(
              {
                content: '<div class="area-label">' + this.allMarker[i].name + '</div>',
                direction: 'top'
              }
            )
            markers.push(marker)
          }
        }
      })
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