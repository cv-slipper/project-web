<template>
  <div class='trend-chart'>
    <div class='trend-chart-title'>
      <div>
        容量及客户端数量趋势
      </div>
      <div v-if='domain!="prod"' class='info-text'>当前：{{ branchName }}</div>
      <div class='little-title'></div>
    </div>
    <a-spin v-if='loading' size='large'
            style='position: absolute;left:0;right:0;top:0;bottom: 0;margin:auto;display: flex;align-items: center;justify-content: space-around'>

    </a-spin>
    <div v-else id='trend-chart' :style='{zoom:zoom}'>

    </div>
  </div>
</template>

<script>
let maxNum = 0
let getMaxNum = () => {
  return maxNum
}
import { determineUserMinxin } from '@/mixins/DetermineUserMinxin'

export default {
  name: 'TrendChart',
  mixins: [determineUserMinxin],
  props: {
    branchName: {
      type: String,
      default: ''
    },
    domain: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    let that = this
    return {
      option: {
        dataset: {
          source: []
        },
        // color: ['#3C6BE3', '#24D4A4', '#F2E314'],
        legend: {
          itemHeight: 10,
          itemWidth: 10,
          data: [{ name: '前端许可用量', icon: 'rect' }, { name: '后端存储用量', icon: 'rect' }, { name: '客户端数量', icon: 'rect' }],
          top: '5%',
          textStyle: {
            fontSize: 8
          }
        },
        grid: {
          top: 30,
          bottom: 28
        },
        tooltip: {
          show: true
        },
        xAxis: [
          {
            type: 'category',

            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'log',
            name: 'TB',
            splitNum: 5,
            nameTextStyle: {
              fontSize: 10
            },
            axisLabel: {
              margin: 2,
              formatter: function(value, index) {
                if (value >= 10000 && value < 10000000) {
                  value = parseInt(value / 10000) + '万'
                } else if (value >= 10000000) {
                  value = parseInt(value / 10000000) + '千万'
                }
                return value
              },
              fontSize: 8
            }

          },
          {
            type: 'log',
            name: '台',
            splitNum: 5,
            nameTextStyle: {
              fontSize: 10
            },
            axisLabel: {
              margin: 2,
              formatter: function(value, index) {
                if (value >= 10000 && value < 10000000) {
                  value = parseInt(value / 10000) + '万'
                } else if (value >= 10000000) {
                  value = parseInt(value / 10000000) + '千万'
                }
                return value
              },
              fontSize: 8
            }


          }
        ],
        series: [
          {
            name: '前端许可用量',
            type: 'bar',
            barWidth: 20,
            yAxisIndex: 0
          },
          {
            name: '后端存储用量',
            type: 'bar',
            barWidth: 20,
            yAxisIndex: 0
          },
          {
            name: '客户端数量',
            type: 'line',
            showSymbol: true,
            smooth: false,
            yAxisIndex: 1
          }
        ],
        dataZoom: {
          show: true,
          type: 'slider',
          height: 3,
          start: 20,
          end: 100,
          bottom: '0'
        }
      },
      myChart: null,
      maxNum: 0,
      minNum: 0,
      maxNum1: 0,
      minNum1: 0
    }
  },
  created() {
    let data = this.option.series.reduce((pre, cur) => pre.concat(cur.data), [])
    this.getMax(data)
  },
  mounted() {


  },
  methods: {
    /**
     * 初始化chart数据
     */
    initChartData(data) {

      if (data.length > 0) {
        let dataSource = []
        let numberList = []
        let yAxis1 = data.map(item => item.clientNum)
        this.maxNum1 = parseInt(Math.max(...yAxis1) * 1.1)
        this.minNum1 = parseInt(Math.min(...yAxis1) * 0.9)
        data.forEach((item, index) => {
          dataSource[index] = []
          dataSource[index].push(new Date(item.time).getFullYear() + '-' + (new Date(item.time).getMonth() + 1 < 10 ? ('0' + (new Date(item.time).getMonth() + 1)) : new Date(item.time).getMonth() + 1))
          dataSource[index].push(item.foreLicUsed)
          dataSource[index].push(item.diskUsed)
          dataSource[index].push(item.clientNum)
          numberList.push(item.foreLicUsed)
          numberList.push(item.diskUsed)
        })
        this.getMax(numberList)
        this.option.yAxis[0].interval = parseInt(this.maxNum / 5)
        this.option.yAxis[1].interval = parseInt(this.maxNum1 / 5)
        this.option.dataset.source = dataSource
        console.log(this.option, 'option')
        setTimeout(() => {
          this.initChart()
        }, 10)

      }
    },
    /**
     * 获取最大值
     */
    getMax(data) {
      let max = 0
      let min = new Date().getTime()
      data.forEach(item => {
        if (item > max) {
          max = item
        }
        if (item < min) {
          min = item
        }
      })
      this.maxNum = parseInt(max * 1.1)
      maxNum = this.maxNum
      this.minNum = parseInt(min * 0.9)
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

      option.yAxis[1].min = 0
      option.yAxis[1].max = Math.max(this.option.series[2].data)
      this.$nextTick(() => {
        this.initChart()
      })


    },
    initChart() {
      this.myChart = this.$echarts.init(document.getElementById('trend-chart'))
      // this.myChart.clear()
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
  position: relative;

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