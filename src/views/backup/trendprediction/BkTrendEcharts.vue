<template>
  <div>
    <div>
      <span>备份资源趋势</span>
    </div>
    <div>
      <p style="background: rgb(240,242,245); width: 40%;padding: 1px"></p>
    </div>
    <div>
      <span>资源将于xxx年x月x日耗尽</span>
    </div>
    <div id="bktrend" style="width:100%; height: 400px"></div>
  </div>

</template>

<script>
  import * as echarts from 'echarts'

  export default {
    name: 'BkTrendEcharts',
    mounted() {
      this.BkTrendEcharts()
    },
    methods: {
      BkTrendEcharts() {
        var chartDom = document.getElementById('bktrend')
        var myChart = echarts.init(chartDom)
        var option

        option = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          },
          yAxis: {
            type: 'value'
          },
          grid: {
            width: 'auto'
          },
          legend: {
            data: ['资源量', '备份量'],
            bottom: '5%'
          },
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            feature: {
              magicType: {
                show: false,
                type: ['stack']
              }
            }
          },
          series: [
            {
              name: '资源量',
              data: [150, 230, 224, 218, 135, 147, 260, 150, 230, 224, 218, 135],
              type: 'line'

            },
            {
              name: '备份量',
              data: [500, 230, 224, 900, 1200, 147, 400, 150, 230, 224, 1600, 135],
              type: 'line'

            }
          ]
        }

        option && myChart.setOption(option)
      }

    }
  }
</script>

<style scoped>

</style>