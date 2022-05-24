<template>
  <div>
    <div class='tip'>
      <span>昨日：1689</span>
      <span>同期 +15%</span>
    </div>
    <div id='mainTrend' style='width:100%;height:200px'></div>
  </div>
</template>

<script>
export default {
  name: 'MainTrend',
  data() {
    return {
      option: {
        backgroundColor: 'rgba(250, 251, 252, 1)',
        xAxis: {
          type: 'category',
          data: ['5/5', '5/6', '5/7', '5/8', '5/9', '5/10', '5/11', '5/12'],
          splitLine: {
            show: true
          },
          axisLabel: {
            interval: 0,
            rotate: 30,
            showMaxLabel: false
          },
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            data: [{ value: 100, symbol: 'none' }, 932, 901, 934, 1290, 1330, 1320, 1330],
            type: 'line',
            smooth: true,

            itemStyle: {
              normal: {
                color: '#2E79FF',
                areaStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: 'rgba(46, 121, 255, 0.2)' // 0% 处的颜色
                    }, {
                      offset: 1, color: 'rgba(46, 121, 255, 0.0001)' // 100% 处的颜色
                    }]
                  }
                }
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      var myChart = this.$echarts.init(document.getElementById('mainTrend'))

      myChart.setOption(this.option)
    }
  }
}
</script>

<style scoped>

</style>