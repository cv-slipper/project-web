<template>
  <div style='height:100%;'>
    <div class='tip flex-center'>
      <span :class='{one:type=="one",two:type=="two",third:type=="third"}'>昨日：1689</span>
      <span class='ml-10 info'>同期 +15%</span>
    </div>
    <div style='width:100%;height:calc(100% - 25px)'>
      <div :id='idName' style='width:100%;height:calc(100% )'></div>
    </div>
  </div>
</template>

<script>
export default {
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
      color: '',
      option: {
        grid: {
          top: '20px',
          left: '20px',
          right: '20px',
          bottom: '40px'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            let month = params[0].axisValueLabel.substring(0, params[0].axisValueLabel.indexOf('/'))
            let day = params[0].axisValueLabel.substring(month.length + 1, params[0].axisValueLabel.length)
            let res = `<div> ${month}月 ${day} 日：${params[0].value} <span style='font-size:12px;color:#989696'>+15%</span></div>`
            return res
          }
        },
        xAxis: {
          type: 'category',
          data: ['5/5', '5/6', '5/7', '5/8', '5/9', '5/10', '5/11', '5/12'],
          splitLine: {
            show: true
          },
          axisLabel: {
            interval: 0,
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
    setTimeout(() => {
      this.init()
    }, 20)

  },
  methods: {
    init(data = [820, 932, 901, 934, 1290, 1330, 1320, 1320]) {
      let type = this.type
      var myChart = this.$echarts.init(document.getElementById(this.idName))
      data = data.map(item => ({ value: item, symbolSize: 6 }))
      this.color = type == 'two' ? '#4DA1FF' : type == 'third' ? '#ff4d63' : '#39dee2'
      this.option.series[0].itemStyle.normal.color = type == 'two' ? '#4DA1FF' : type == 'third' ? '#ff4d63' : '#39dee2'
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
      data.forEach((item, index) => {
        if (index == 0 || index % 3 == 0) {
        } else {
          item.symbol = 'none'
        }
      })
      this.option.series[0].data = data
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