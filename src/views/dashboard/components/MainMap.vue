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
import MapBranchListModal from '@views/dashboard/components/modal/MapBranchListModal'
import { getBranchMapList } from '@api/modules/dashboard/analysis'

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
      areaPoints: [],
      allPoints: [],
      allMarkers: [],
      bigAreaMarkers: [],
      areaMarkers: [],
      litttleAreaPoints: [],
      infoWindows: []

    }
  },
  created() {
  },
  mounted() {
    this.getBranchMapList()

    // this.setInfoWindow()
  },
  methods: {
    /**
     * 获取分行地图数据
     */
    async getBranchMapList() {
      try {
        const res = await getBranchMapList()
        if (res.code === 200) {
          res.result.forEach(item => {
            if (item.regionName == '华北') {
              item.exceptionNum = 1
            }
          })
          res.result = this.recursive(res.result)
          this.areaPoints = res.result || []
          this.allPoints = res.result.map(item => item.children).flat(2) || []
          this.initMap()
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.$message.error('获取分行数据失败')
      }

    },
    /**
     * 递归处理数据
     * @param {*} data 数据
     */
    recursive(data) {
      let arr = data
      data.forEach(item => {
        item.center = JSON.parse(item.coordinate)
        item.name = item.regionName || item.branchName
        if (item.children) {
          this.recursive(item.children)
        }
      })
      return arr
    },
    checkBranch(item) {
      this.branchItem = item
      if (item) {
        this.map.setZoomAndCenter(7, item.center)
        this.map.remove(this.allMarkers)
        this.allMarkers = this.initAllMarker()
        this.map.add(this.allMarkers)
      } else {
        let zoom = this.map.getZoom()

        if (zoom == 4) {
          this.map.setZoomAndCenter(3.5, [108.316721, 37.38724])
        } else {
          this.map.setZoomAndCenter(4, [108.316721, 37.38724])
        }
      }
      this.$emit('checkBranch', item)
      this.mapListVisible = false
    },
    openBranchModal() {
      this.mapListVisible = true
    },
    clearInfoWindow() {
      let zoom = this.map.getZoom()
      if (this.infoWindows.length > 0 && zoom >= 4.5) {
        this.infoWindows.forEach(item => {
          item.close()
        })
      }
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
    setInfoWindow() {
      this.bigAreaMarkers.forEach(item => {
        console.log(item, 'item')
      })

    },
    /**
     * 获取异常区域模版字符串
     */
    getInfoWindowTemplate(item) {
      console.log(item, 'item')
      let content = ``
      if (item.exceptionNum > 0) {
        content = this.getExecptionContent(item)
      }
      return content
    },
    getExecptionContent(item) {
      let arr = ``
      item.children.forEach(ele => {
        if (ele.exceptionNum > 0) {
          arr += (`<div class='exception-content'>
          <div class='execption-name'>${ele.branchName}</div>
          <div class='excrption-num'>（${ele.exceptionNum}）</div>
          <div>
          <img class='map-warning' src='${require('@/assets/map-warning.png')}' alt='' /></div>
            </div>`)
        }
      })
      return arr
    },
    initMap() {
      this.map = new AMap.Map('container', {
        zoom: 4.1,//级别
        resizeEnable: true,
        center: [108.316721, 37.38724],//中心点坐标
        features: ['bg', 'road', 'building']//显示样式

      })
      this.bigAreaMarkers = this.initAreaMarker()
      this.allMarkers = this.initAllMarker()
      this.map.add(this.bigAreaMarkers)

      this.map.on('zoomend', (e) => {
        // this.debounce(this.dealWithMarkers, 10)()
      })
      this.map.on('zoomchange', () => {
        let zoom = this.map.getZoom()
        console.log(zoom, 'zoom')
        this.debounce(this.dealWithMarkers, 10)()
      })
    },
    initAreaMarker() {
      let markers = []
      let normal = `<div style='position: relative'>
                        <img style='width:65px;height:65px' src='${require('@/assets/normal.png')}' />
                     </div>`
      let warning = `<img style='width:65px;height:65px' src='${require('@/assets/warning.png')}' />`


      for (let i = 0; i < this.areaPoints.length; i++) {
        let content = this.areaPoints[i].exceptionNum == 0 ? normal : warning
        let infoWindow = this.getInfoWindowTemplate(this.areaPoints[i])
        var marker = new AMap.Marker({
          position: this.areaPoints[i].center,
          content: `<div class='execption-box' style='position: relative'>${content}${infoWindow}</div>`,
          visible: true,
          offset: new AMap.Pixel(-32, -32)

        })
        let position = this.areaPoints[i].exceptionNum == 0 ? 'top' : 'bottom'
        marker.setLabel(
          {
            content: '<div class="area-label">' + this.areaPoints[i].name + '区域</div>',
            direction: position
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
        let content = this[key][i].exceptionNum == 0 ? normal : warning
        let marker = new AMap.Marker({
          position: this[key][i].center,
          content,
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

          this.$emit('checkBranch', this[key][i])
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

/deep/ .exception-content {
  width: 155px;
  background: white;
  position: absolute;
  bottom: 100%;
  right: -45px;
  margin: auto;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  padding-right: 10px;

  .excrption-num {
    color: #FA5D18
  }


}

/deep/ .execption-name {
  display: inline-block;
  position: relative;
  padding-left: 10px;
}

/deep/ .execption-name::before {
  content: '';
  display: block;
  width: 4px;
  height: 100%;
  background: #126CF8;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

/deep/ .exception-content::before {
  content: '▼';
  text-align: center;
  color: white;
  position: absolute;
  font-size: 14px;
  bottom: -15px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 99;
}

/deep/ .map-warning {
  width: 25px;
  object-fit: fill;
  display: block;
}

@media screen and(max-width: 1700px) {
  /deep/ .exception-content {
    font-size: 12px;
  }
}
</style>