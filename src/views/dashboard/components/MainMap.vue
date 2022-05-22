<template>
  <div id='container' :style="{ width: '100%', height: '70vh' }"></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import { points } from './china.js'

let that = this
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

      const roomData = [
        {
          'lnglat': {
            className: 'AMap.LongLat',
            lng: 116.397428,
            lat: 39.90923
          },
          'building': '1号楼',
          'city': '北京',
          'area': '朝阳区'

        },
        {
          'lnglat': { className: 'AMap.LngLat', lng: 114.177087, lat: 22.313861 },


          'building': '旺角高级公寓',
          'area': '旺角',
          'city': '香港'
        },
        {
          'lnglat': { className: 'AMap.LngLat', lng: 114.174986, lat: 22.310604 },

          'building': '油麻地一期',
          'area': '油麻地',
          'city': '香港'
        },
        {
          'lnglat': { className: 'AMap.LngLat', lng: 114.194512, lat: 22.326271 },


          'building': '九龙城二期公寓',
          'area': '九龙城',
          'city': '香港'
        },
        {
          'lnglat': { className: 'AMap.LngLat', lng: 114.193718, lat: 22.320204 },

          'building': '九龙城一期公寓',
          'area': '九龙',
          'city': '香港'
        }

      ]
      const district = {
        '香港': {
          'center': '114.171202,22.277469'
        },
        '北京': {
          'center': '116.407526,39.90403'
        }
      }
// 绘制初始化地图
      var map = new AMap.Map('container', {
        zoom: 5,//级别
        center: [114.177087, 22.313861],//中心点坐标
        viewMode: '3D'//使用3D视图
      })

      var count = roomData.length

      function clusterMarkers() {
        var markerList = []
        var marker = new AMap.Marker({
          map: map
        })
        markerList.push(marker)
        return markerList
      }

// 设置不同组群不同缩放级别
      var clusterIndexSet = {
        city: {
          minZoom: 2,
          maxZoom: 12
        },
        area: {
          minZoom: 12,
          maxZoom: 20
        }
      }

// 设置样式
      function getStyle(context) {
        var clusterData = context.clusterData // 聚合中包含数据
        var index = context.index // 聚合的条件
        var count = context.count // 聚合中点的总数
        var marker = context.marker // 聚合绘制点 Marker 对象
        var color = [
          '8,60,156',
          '66,130,198',
          '107,174,214',
          '78,200,211'
        ]
        console.log(index, 'index')
        var indexs = ['city', 'district', 'area', 'community']
        var i = indexs.indexOf(index['mainKey'])
        var text = clusterData[0][index['mainKey']]
        var size = Math.round(30 + Math.pow(count / roomData.length, 1 / 5) * 70)
        if (i < 2) {
          var extra = '<span class="showCount">' + context.count + '套</span>'
          text = '<span class="showName">' + text + '</span>'
          text += extra
        } else {
          size = 12 * text.length + 20
        }
        var style = {
          bgColor: 'rgba(' + color[i] + ',.8)',
          borderColor: 'rgba(' + color[i] + ',1)',
          text: text,
          size: size,
          index: i,
          color: '#ffffff',
          textAlign: 'center',
          boxShadow: '0px 0px 5px rgba(0,0,0,0.8)'
        }
        return style
      }

      function getPosition(context) {
        var key = context.index.mainKey
        var dataItem = context.clusterData && context.clusterData[0]
        var districtName = dataItem[key]
        if (!district[districtName]) {
          return null
        }
        var center = district[districtName].center.split(',')
        var centerLnglat = new AMap.LngLat(center[0], center[1])
        return centerLnglat
      }

// 自定义聚合点样式
      function _renderClusterMarker(context) {
        var clusterData = context.clusterData // 聚合中包含数据
        var index = context.index // 聚合的条件
        var count = context.count // 聚合中点的总数
        var marker = context.marker // 聚合点标记对象
        var styleObj = getStyle(context)
        // 自定义点标记样式
        var div = document.createElement('div')
        div.className = 'amap-cluster'
        div.style.backgroundColor = styleObj.bgColor
        div.style.width = styleObj.size + 'px'
        if (styleObj.index <= 2) {
          div.style.height = styleObj.size + 'px'
          div.style.lineHeight = styleObj.size + 'px'
          // 自定义点击事件
          context.marker.on('click', function(e) {
            console.log(e)
            var curZoom = map.getZoom()
            var center = e.target.getPosition()
            if (curZoom < 20) {
              curZoom = 12
            }
            map.setZoomAndCenter(curZoom, center)
          })
        }
        div.style.border = 'solid 1px ' + styleObj.borderColor
        div.style.borderRadius = index['mainKey'] == 'area' ? '12px' : styleObj.size + 'px'
        div.innerHTML = styleObj.text
        div.style.color = styleObj.color
        div.style.textAlign = styleObj.textAlign
        div.style.boxShadow = styleObj.boxShadow
        div.style.fontSize = 14 + 'px'
        div.style.padding = `5px 0`
        context.marker.setContent(div)
        // 自定义聚合点标记显示位置
        var position = getPosition(context)
        if (position) {
          context.marker.setPosition(position)
        }
        context.marker.setAnchor('center')

      }

// IndexCluster
      var cluster = new AMap.IndexCluster(map, roomData, {
        renderClusterMarker: _renderClusterMarker,
        clusterIndexSet: clusterIndexSet
      })
    }
  }
}
</script>

<style scoped>

</style>