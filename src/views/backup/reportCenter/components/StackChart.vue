<template>
  <div class='stack-chart'>
    <div class='trend-chart-title'>
      <div>
        存储库增长趋势
      </div>
      <div class='info-text'>当前：{{ branchName }}</div>
      <div class='little-title'></div>
    </div>
    <div id='stack-chart'></div>
  </div>
</template>

<script>
export default {
  name: 'StackChart',
  props: {
    branchName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          itemHeight: 10,
          itemWidth: 10,
          left: 'center',
          top: '20px'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [

          {
            name: '存储库1',
            type: 'bar',
            barWidth: '40%',
            stack: 'Ad',
            color: '#3C6BE3',
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210, 230, 210, 230, 210, 230]
          },
          {
            name: '存储库2',
            type: 'bar',
            barWidth: '40%',
            stack: 'Ad',
            color: '#24D4A4',
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310, 230, 210, 230, 210, 230]
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
      let myChart = this.$echarts.init(document.getElementById('stack-chart'))
      myChart.setOption(this.option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  }
}
</script>

<style scoped lang='less'>
.stack-chart {
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

#stack-chart {
  width: 100%;
  height: calc(100% - 35px);
}
</style>