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
  created() {
    this.initmapFn()


  },
  methods: {
    // 初始化点聚合
    initMarkerClusterer(AMap) {
      for (var i = 0; i < points.length; i += 1) {
        this.markers.push(new AMap.Marker({
          position: points[i]['lnglat'],
          content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
          offset: new AMap.Pixel(-15, -15)
        }))
      }
      var count = this.markers.length
      this.addCluster(2, AMap)

    },
    renderClusterMarker(context) {
      console.log(context, 'context')
      var count = this.markers.length
      var factor = Math.pow(context.count / count, 1 / 18)
      var div = document.createElement('div')
      var Hue = 180 - factor * 180
      var bgColor = 'hsla(' + Hue + ',100%,50%,0.7)'
      var fontColor = 'hsla(' + Hue + ',100%,20%,1)'
      var borderColor = 'hsla(' + Hue + ',100%,40%,1)'
      var shadowColor = 'hsla(' + Hue + ',100%,50%,1)'
      div.style.backgroundColor = bgColor
      var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20)
      div.style.width = div.style.height = size + 'px'
      div.style.border = 'solid 1px ' + borderColor
      div.style.borderRadius = size / 2 + 'px'
      div.style.boxShadow = '0 0 1px ' + shadowColor
      div.innerHTML = context.count
      div.style.lineHeight = size + 'px'
      div.style.color = fontColor
      div.style.fontSize = '14px'
      div.style.textAlign = 'center'
      context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2))
      context.marker.setContent(div)

    },

    addCluster(tag, AMap) {

      if (this.cluster) {
        this.cluster.setMap(null)
      }
      if (tag == 2) {//完全自定义
        this.cluster = new AMap.MarkerClusterer(this.map, this.markers, {
          gridSize: 80,
          renderClusterMarker: this.renderClusterMarker
        })
      } else if (tag == 1) {//自定义图标
        var sts = [{
          url: 'https://a.amap.com/jsapi_demos/static/images/blue.png',
          size: new AMap.Size(32, 32),
          offset: new AMap.Pixel(-16, -16)
        }, {
          url: 'https://a.amap.com/jsapi_demos/static/images/green.png',
          size: new AMap.Size(32, 32),
          offset: new AMap.Pixel(-16, -16)
        }, {
          url: 'https://a.amap.com/jsapi_demos/static/images/orange.png',
          size: new AMap.Size(36, 36),
          offset: new AMap.Pixel(-18, -18)
        }, {
          url: 'https://a.amap.com/jsapi_demos/static/images/red.png',
          size: new AMap.Size(48, 48),
          offset: new AMap.Pixel(-24, -24)
        }, {
          url: 'https://a.amap.com/jsapi_demos/static/images/darkRed.png',
          size: new AMap.Size(48, 48),
          offset: new AMap.Pixel(-24, -24)
        }]
        this.cluster = new AMap.MarkerClusterer(map, markers, {
          styles: sts,
          gridSize: 80
        })
      } else {//默认样式
        this.cluster = new AMap.MarkerClusterer(map, markers, { gridSize: 80 })
      }
    },
    initmapFn() {
      AMapLoader.load({
        'key': 'f5ada6176c6a7f1a9ae57985b2f9e1a1',              // 申请好的Web端开发者Key，首次调用 load 时必填
        'version': '2.0',   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        'plugin': ['AMap.MarkerClusterer']           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.map = new AMap.Map('container', {
          zoom: 13,
          resizeEnable: true
        })
        this.initMarkerClusterer(AMap)
      }).catch(e => {
        console.log(e)
      })
    },
    // 地图标注
    onMarkerMap(data) {
      if (data[0]) {
        data.forEach((element, index) => {
          if (element.lng) {
            let marker = new AMap.Marker({
              //在回调函数里面创建Marker实例,添加经纬度和标题
              position: new AMap.LngLat(element.lng, element.lat), //添加经纬度
              offset: new AMap.Pixel(-13, -30) // 偏移量
              // title: "广州塔", // 鼠标移上去时显示的内容
              // 可以自定义标记点显示的内容,允许插入html字符串
              // content: "<h1>广州塔Content</h1>",
            })
            this.map1.add(marker) // 将创建的点标记添加到已有的地图实例：
            //marker.setMap(this.map1);
            //名称
            marker.setLabel({// 设置label标签
              offset: new AMap.Pixel(-50, -30), //设置文本标注偏移量
              content: `<div class='info'>${element.enterpriseName}</div>`, //设置文本标注内容
              direction: 'right' //设置文本标注方位
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>