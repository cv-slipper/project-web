<template>
  <div style='height:100%;'>
    <div class='tip flex-center'>
      <span
        :class='{one:type=="one",two:type=="two",third:type=="third"}'>昨日：{{ yestDayNum }}</span>
      <span class='ml-10 info' v-if='type!="third"'>同期 {{ yestPercent }}</span>
    </div>
    <div :style='{width:"100%",height:"calc(100% - 25px)",zoom:getZoom()}'>
      <div :id='idName' style='width:100%;height:calc(100% )'></div>
    </div>
  </div>
</template>

<script>
import { determineUserMinxin } from '@/mixins/DetermineUserMinxin'

export default {
  mixins: [determineUserMinxin],
  name: 'MainTrend',
  props: {
    idName: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'one'
    }
  },

  data() {
    return {
      yestDayNum: 0,
      yestPercent: '+0%',
      option: {
        grid: {
          top: '5px',
          left: '10px',
          right: '10px',
          bottom: '20px'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: [],
          splitLine: {
            show: true
          },
          axisLabel: {
            interval: 0,
            showMaxLabel: false,
            fontSize: 8
          },
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            data: [],
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
          },
          {
            data: [{ value: 300, symbol: 'none' }, { value: 200, symbol: 'none' }, {
              value: 100,
              symbol: 'none'
            }, { value: 400, symbol: 'none' }, { value: 500, symbol: 'none' }, {
              value: 600,
              symbol: 'none'
            }, { value: 700, symbol: 'none' }, { value: 800, symbol: 'none' }],
            type: 'line',
            showSymbol: false,
            smooth: true,
            itemStyle: {
              normal: {
                color: '#ccc',
                lineStyle: {
                  color: '#ccc',
                  type: 'dotted',
                  width: 2,
                  opacity: 0.5,
                  shadowColor: 'rgba(0, 0, 0, 0.3)',
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0

                }

              }
            }

          }
        ]
      }

    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.init()
    // }, 20)

  },
  methods: {
    getYestDayData() {
      return this.option.series[0].data.length > 0 ? this.option.series[0].data[this.option.series[0].data.length - 1].value : 0
    },
    getPercent() {
      let percentStr = '0'
      //获取增加或减少百分比
      if (this.option.series[0].data.length > 0 && this.type != 'third') {
        let percent = (this.option.series[0].data[this.option.series[0].data.length - 1].value * 1 - this.option.series[1].data[this.option.series[1].data.length - 1].value * 1) / (this.option.series[1].data[this.option.series[1].data.length - 1].value * 1)
        if (this.option.series[0].data[this.option.series[0].data.length - 1].value * 1 - this.option.series[1].data[this.option.series[1].data.length - 1].value * 1 == 0) {
          percent = 0
        }
        if (this.option.series[1].data[this.option.series[1].data.length - 1].value * 1 == 0) {
          percent = this.option.series[0].data[this.option.series[0].data.length - 1].value * 1
        }
        percentStr = percent >= 0 ? '+' + (percent * 100).toFixed(2) + '%' : (percent * 100).toFixed(2) + '%'
      }

      return percentStr
    },
    formatter(params) {
      let month = params[0].axisValueLabel.substring(0, params[0].axisValueLabel.indexOf('/'))
      let day = params[0].axisValueLabel.substring(month.length + 1, params[0].axisValueLabel.length)
      let res = `<div> ${month}月 ${day} 日：${params[0].value} </div>`
      return res
    },
    init(xData = [], yData = [], formatter = this.formatter) {
      let type = this.type
      var myChart = this.$echarts.init(document.getElementById(this.idName))
      this.option.xAxis.data = xData
      yData.forEach((item, index) => {
        this.option.series[index] = {}
        this.option.series[index].data = item.data
        this.option.series[index].name = item.name
        this.option.series[index].type = 'line'
        this.option.series[index].smooth = true

        this.option.series[index].itemStyle = item.itemStyle
      })
      this.color = type == 'two' ? '#4DA1FF' : type == 'third' ? '#ff4d63' : '#39dee2'
      this.option.series[0].itemStyle.normal.color = type == 'two' ? '#4DA1FF' : type == 'third' ? '#ff4d63' : '#39dee2'
      this.option.series[0].itemStyle.normal.areaStyle = {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1
        }
      }
      this.option.series[0].itemStyle.normal.areaStyle.color.colorStops = type == 'two' ? [{
        offset: 0, color: 'rgba(77, 161, 255, 0.3)' // 0% 处的颜色
      }, {
        offset: 1, color: 'rgba(77, 161, 255, 0.001)' // 100% 处的颜色
      }] : type == 'third' ? [{
        offset: 0, color: 'rgba(255, 77, 99, 0.3)' // 0% 处的颜色
      }, {
        offset: 1, color: 'rgba(255, 77, 99, 0.001)' // 100% 处的颜色
      }] : [{
        offset: 0, color: 'rgba(57, 222, 226, 0.3)' // 0% 处的颜色
      }, {
        offset: 1, color: 'rgba(57, 222, 226, 0.001)' // 100% 处的颜色
      }]
      let index = this.option.series.findIndex(item => item.name == '上周')
      if (index != -1) {
        this.option.series[index].itemStyle = {
          normal: {
            color: '#ccc',
            lineStyle: {
              color: '#ccc',
              type: 'dotted',
              width: 2,
              opacity: 0.5,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0

            }

          }
        }
      }
      this.option.tooltip.formatter = formatter
      this.type == 'third' && this.option.series.splice(1, 1)
      this.yestDayNum = this.getYestDayData()
      this.yestPercent = this.getPercent()
      myChart.setOption(this.option)
      myChart.resize()
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  }
}
</script>

<style scoped>
.info {
  color: rgba(173, 173, 173, 1);
  font-size: 12px;
}

.one {
  color: #39dee2
}

.two {
  color: #4DA1FF
}

.third {
  color: #ff4d63
}
</style>