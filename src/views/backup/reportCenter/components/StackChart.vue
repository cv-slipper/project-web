<template>
  <div class='stack-chart'>
    <div class='trend-chart-title'>
      <div>
        存储库增长趋势
      </div>
      <div class='info-text'>当前：{{ branchName }}</div>
      <div class='little-title'></div>
    </div>
    <div id='stack-chart' :style='{zoom:zoom}'></div>
  </div>
</template>

<script>
import { determineUserMinxin } from '@/mixins/DetermineUserMinxin'

export default {
  name: 'StackChart',
  mixins: [determineUserMinxin],
  props: {
    branchName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      color: ['#3C6BE3', '#24D4A4'],
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (params) => {
            let color = ['#3C6BE3', '#24D4A4']
            let html = `
              <div>
                  <div class='stack-title'>${params[0].name}</div>
                  ${params.map((item, index) => {
              return `<div>
                          <span style='display:inline-block;width: 5px;height: 5px;border-radius: 50%;overflow: hidden;background:${color[index]} '></span>
                           <span>${item.seriesName}：</span>
                            <span>${item.value}${item.data.unit}</span>
                                                     </div>`
            }).join('')}
              </div>
            `
            return html
          }
        },
        legend: {
          itemHeight: 5,
          itemWidth: 5,
          left: 'center',
          top: 20,
          textStyle: {
            fontSize: 8
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          //
          // {
          //   name: '存储库1',
          //   type: 'bar',
          //   barWidth: '40%',
          //   stack: 'Ad',
          //   color: '#3C6BE3',
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data: [120, 132, 101, 134, 90, 230, 210, 230, 210, 230, 210, 230]
          // },
          // {
          //   name: '存储库2',
          //   type: 'bar',
          //   barWidth: '40%',
          //   stack: 'Ad',
          //   color: '#24D4A4',
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data: [220, 182, 191, 234, 290, 330, 310, 230, 210, 230, 210, 230]
          // }
        ]
      }
    }
  },
  methods: {
    inintChartData(data) {
      if (data.length > 0) {
        let xData = data.map(item => ({ value: new Date(item.month).getMonth() + 1 + '月份' }))
        this.option.xAxis.data = xData
        let yData = {}
        data.forEach((item, index) => {
          item.libraries.forEach((ele, i) => {
            if (yData[ele.name]) {
              yData[ele.name].push({ value: ele.volume, unit: item.unit })
            } else {
              yData[ele.name] = [{ value: ele.volume, unit: item.unit }]
            }
          })
        })
        Object.keys(yData).forEach((item, index) => {
          this.option.series[index] = {
            name: item,
            type: 'bar',
            barWidth: '40%',
            stack: 'Ad',
            color: this.color[index],
            emphasis: {
              focus: 'series'
            },
            data: yData[item]
          }
        })
        this.initChart()
      }
    },
    initChart() {
      console.log(this.option, 'option')
      let myChart = this.$echarts.init(document.getElementById('stack-chart'))
      myChart.clear()
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