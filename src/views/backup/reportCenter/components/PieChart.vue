<template>
  <div class='pie-chart'>
    <div class='trend-chart-title'>
      <div>
        数据类型分布-客户端数量
      </div>
      <div class='info-text'>当前：全域</div>
      <div class='little-title'></div>
    </div>
    <div id='pieChart'></div>
  </div>
</template>

<script>
export default {
  name: 'PieChart',
  data() {
    return {
      option: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          right: 0,
          top: 'center',
          orient: 'vertical'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['26%', 'center'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 0,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      }
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      let myChart = this.$echarts.init(document.getElementById('pieChart'))
      myChart.setOption(this.option)
    }
  }
}
</script>

<style scoped lang='less'>
.pie-chart {
  height: 100%;

  .trend-chart-title {
    font-size: 16px;
    font-weight: bold;
    color: #4D555E;
    padding-bottom: 10px;
    border-bottom: 1px solid #666666;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info-text {
      font-weight: 400;
      color: #666666;
      font-size: 12px;
    }

    .little-title {
      width: 30px;
      height: 2px;
      background: #3C6BE3;
      position: absolute;
      left: 10%;
      bottom: 0;
    }
  }
}

#pieChart {
  width: 100%;
  height: calc(100% - 35px);
}
</style>