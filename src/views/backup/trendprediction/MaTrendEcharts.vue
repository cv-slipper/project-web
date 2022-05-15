<template>
  <div>
    <div>
      <span>MA源趋势</span>
    </div>
    <div id="matrend" style="width:100%; height: 400px"></div>
  </div>

</template>

<script>
  import * as echarts from 'echarts'

  export default {
    name: 'MaTrendEcharts',
    mounted() {
      this.MaTrendEcharts()
    },
    methods: {
      MaTrendEcharts() {
        var chartDom = document.getElementById('matrend')
        var myChart = echarts.init(chartDom)
        var option

        option = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['8:00', '8:00', '8:00', '8:00', '8:00', '8:00', '8:00','8:00','8:00','8:00','8:00','8:00']
          },
          yAxis: {
            type: 'value'
          },
          grid: {
            width: 'auto'
          },
          legend: {
            data: ['RM作业', '容量'],
            bottom: '5%'
          },
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            feature:{
              magicType:{
                show: false,
                type: ['stack']
              }
            }
          },
          series: [
            {
              name:'RM作业',
              data: [150, 230, 224, 218, 135, 147, 260,150, 230, 224, 218, 135],
              type: 'line',
              smooth: true
            },
            {
              name:'容量',
              data: [500, 230, 224, 900, 1200, 147, 400,150, 230, 224, 1600, 135],
              type: 'line',
              smooth: true
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