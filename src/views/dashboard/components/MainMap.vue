<template>
  <div style='height:100%;position:relative'>
    <div class='branch-status'>
      <div :class='["global fl",{active:!branchItem}]' @click='checkBranch(null)'>
        <div class='global-logo fl'>
          <img src='@/assets/map-bank-logo.png' alt='' />
        </div>
        <div class='fl ml-5 fs-12'>全局</div>
      </div>
      <div class='fl ml-5 fs-12'>|</div>
      <div :class='["branch fl ml-5",{active:branchItem}]' @click='openBranchModal'>
        <div class='fl fs-12'>
          {{ branchItem ? branchItem.name : '分行' }}
        </div>
        <a-icon type='down' />
      </div>
    </div>
    <div id='container' :style="{ width: '100%', height: '100% ' }"></div>
    <map-branch-list-modal
      @checkBranch='checkBranch'
      :visible='mapListVisible'
      :current-branch='branchItem'
      @cancel='mapListVisible = false'></map-branch-list-modal>
  </div>
</template>

<script>
import { branchPoints } from './china'
import MapBranchListModal from '@views/dashboard/components/modal/MapBranchListModal'

export default {
  name: 'MainMap',
  components: {
    MapBranchListModal
  },
  data() {
    return {
      mapListVisible: false,
      map: null,
      branchItem: null,
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
    checkBranch(item) {
      this.branchItem = item
      if (item) {
        this.map.setZoomAndCenter(7, item.center)
        this.map.remove(this.allMarkers)
        this.allMarkers = this.initAllMarker()
        this.map.add(this.allMarkers)
      } else {
        let zoom = this.map.getZoom()
        if (zoom == 3.8) {
          this.map.setZoomAndCenter(3.79, [108.316721, 37.38724])
        } else {
          this.map.setZoomAndCenter(3.8, [108.316721, 37.38724])
        }

      }
      this.mapListVisible = false
    },
    openBranchModal() {
      this.mapListVisible = true
    },
    // 防抖函数
    debounce(fn, ms) {
      let timer = null
      return function() {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          fn()
        }, ms)
      }
    },
    dealWithMarkers() {
      this.map.remove(this.bigAreaMarkers)
      this.map.remove(this.allMarkers)
      this.allMarkers = this.initAllMarker()
      let zoom = this.map.getZoom()
      if (zoom >= 4.5) {
        this.map.remove(this.bigAreaMarkers)
        this.map.remove(this.allMarkers)
        this.map.add(this.allMarkers)
      } else {
        this.map.remove(this.allMarkers)
        this.map.remove(this.bigAreaMarkers)
        this.map.add(this.bigAreaMarkers)

      }
    },
    initMap() {
      this.map = new AMap.Map('container', {
        zoom: 3.8,//级别
        resizeEnable: true,
        center: [108.316721, 37.38724],//中心点坐标
        features: ['bg', 'road', 'building'],//显示样式
        zooms: [3.8, 15]

      })
      this.bigAreaMarkers = this.initAreaMarker()
      this.allMarkers = this.initAllMarker()
      this.map.add(this.bigAreaMarkers)

      this.map.on('zoomend', (e) => {
        this.debounce(this.dealWithMarkers, 10)()
      })
      this.map.on('zoomchange', () => {
        console.log(this.map.getZoom())
      })
    },
    initAreaMarker() {
      let markers = []
      let normal = '<img style="width:65px;height:65px" src=' + require('@/assets/normal.png') + ' />'
      let warning = '<img style="width:65px;height:65px" src=' + require('@/assets/warning.png') + ' />'
      for (let i = 0; i < this.areaPoints.length; i++) {
        var marker = new AMap.Marker({
          position: this.areaPoints[i].center,
          content: normal,
          visible: true,
          offset: new AMap.Pixel(-32, -32)

        })
        marker.setLabel(
          {
            content: '<div class="area-label">' + this.areaPoints[i].name + '</div>',
            direction: 'top'
          }
        )

        marker.on('click', (e) => {
          this.litttleAreaPoints = this.areaPoints[i].children
          this.map.setZoomAndCenter(6, this.areaPoints[i].center)
        })
        markers.push(marker)
      }
      return markers
    },
    initAllMarker(key = 'allPoints') {
      let markers = []
      let normal = '<img style="width:50px;height:50px" src=' + require('@/assets/normal.png') + ' />'
      let warning = '<img style="width:50px;height:50px" src=' + require('@/assets/warning.png') + ' />'
      for (let i = 0; i < this[key].length; i++) {
        let marker = new AMap.Marker({
          position: this[key][i].center,
          content: normal,
          visible: true,
          offset: new AMap.Pixel(-25, -25)
        })
        let isActive = this[key][i].name == (this.branchItem ? this.branchItem.name : 'null') ? 'active-label' : ''
        marker.setLabel(
          {
            content: '<div class="' + isActive + '" >' + this[key][i].name + '</div>',
            direction: 'top'
          }
        )
        marker.on('click', (e) => {
          this.branchItem = this[key][i]
          this.map.remove(this.bigAreaMarkers)
          this.map.remove(this.allMarkers)
          this.allMarkers = this.initAllMarker()
          this.map.add(this.allMarkers)

          this.$emit('chooseCity', this[key][i])
        })

        markers.push(marker)
      }
      return markers
    }


  }
}
</script>

<style scoped lang='less'>
/deep/ .area-label {
  background: rgba(0, 0, 0, 0);
  color: black !important;
  font-weight: bold !important;
}

/deep/ .amap-marker-label {
  border: none !important;
  background: rgba(0, 0, 0, 0) !important;
}

.branch-status {
  padding: 15px;
  background: #FFFFFF;
  box-shadow: 0px 4px 8px 0px rgba(193, 199, 211, 0.4);
  opacity: 0.9;
  border-radius: 0px 7px 7px 0px;
  position: absolute;
  top: 30px;
  left: 0px;
  z-index: 999;
  cursor: pointer
}

.active {
  .global-logo {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    overflow: hidden;
    background: rgba(52, 117, 239, 0.99);
  }

  color: #3677EF
}

.global-logo {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #666666;

  img {
    width: 10px;
    height: 10px
  }
}

/deep/ .active-label {
  color: #3677EF !important;
  font-weight: bold;
}

/deep/ .amap-logo {
  display: none !important;
  opacity: 0 !important;
}

/deep/ .amap-copyright {
  opacity: 0 !important;
  display: none !important;
}
</style>