<template>
  <div class='trend-chart'>
    <div class='trend-chart-title'>
      <div>
        容量及客户端数量趋势区
      </div>
      <div class='info-text'>当前：{{ branchName }}</div>
      <div class='little-title'></div>
    </div>
    <div id='trend-chart'>

    </div>
  </div>
</template>

<script>
export default {
  name: 'TrendChart',
  props: {
    branchName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      option: {
        color: ['#3C6BE3', '#24D4A4', '#F2E314'],
        legend: {
          itemHeight: 10,
          itemWidth: 10,
          data: [{ name: '前端许可用量', icon: 'rect' }, { name: '后端存储用量', icon: 'rect' }, { name: '客户端数量', icon: 'rect' }],
          top: '10%'
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            name: 'TB',
            type: 'value',
            min: 0,
            max: () => {
              return this.maxNum
            }
          },
          {
            name: '台',
            type: 'value'


          }
        ],
        series: [
          {
            name: '前端许可用量',
            type: 'bar',

            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
            ]
          },
          {
            name: '后端存储用量',
            type: 'bar',
            yAxisIndex: 1,
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
            ]
          },
          {
            name: '客户端数量',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [10.0, 2.2, 40.3, 4.5, 6.3, 70.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ],
        dataZoom: {
          show: true,
          type: 'slider',
          height: 2,
          start: 20,
          end: 80

        }
      },
      myChart: null,
      maxNum: 0
    }
  },
  created() {
    let data = this.option.series.reduce((pre, cur) => pre.concat(cur.data), [])
    this.getMax(data)
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
    let data = this.option.series.reduce((pre, cur) => pre.concat(cur.data), [])
    this.set_data(data)

  },
  methods: {
    /**
     * 获取最大值
     */
    getMax(data) {
      let max = 0
      data.forEach(item => {
        if (item > max) {
          max = item
        }
      })
      this.maxNum = parseInt(max * 1 + 10)
      return max
    },
    set_data(arr_data) {
      let option = this.option
      var y_min = option.yAxis[0].min

      var y_max = option.yAxis[0].max()

      for (var n = 0; n < arr_data.length; n++) {
        if (arr_data[n] > y_max)

          y_max = arr_data[n]

        else if (arr_data[n] < y_min)

          y_min = arr_data[n]

      }

      y_max = Math.ceil(y_max / 10) * 10

      y_min = Math.floor(y_min / 10) * 10

      option.yAxis[0].min = y_min

      option.yAxis[0].max = y_max

      option.yAxis[1].min = y_min

      option.yAxis[1].max = y_max
      this.$nextTick(() => {
        this.myChart.setOption(option)
      })


    },
    initChart() {
      this.myChart = this.$echarts.init(document.getElementById('trend-chart'))
      this.myChart.setOption(this.option)
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
    }
  }
}
</script>

<style scoped lang='less'>
.trend-chart {
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

  #trend-chart {
    width: 100%;
    height: calc(100% - 35px);
  }
}


</style>