<template>
  <div class='front-end-capacity'>
    <div class='trend-chart-title'>
      <div>
        数据类型分布-前端容量
      </div>
      <div class='info-text'>当前：{{ branchName }}</div>
      <div class='little-title'></div>
    </div>
    <div id='front-chart'>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    branchName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      colorIndex: 0,
      color: ['#CAC9CA', '#24D4A6', '#00B7EE', '#6E69F9', '#1E67F2', '#21E5E8'],
      option: {
        polar: {
          radius: [30, '70%'],
          center: ['26%', 'center']
        },
        grid: {
          left: '0'
        },

        angleAxis: {
          show: false,
          max: 1500,
          startAngle: 90,

          clockwise: false

        },
        radiusAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        tooltip: {},
        series: [{
          type: 'bar',
          name: 'a数据类型',
          data: [10],
          coordinateSystem: 'polar',
          roundCap: true,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        },

          {
            type: 'bar',
            name: 'b数据类型',
            data: [20],
            coordinateSystem: 'polar',
            roundCap: true,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          },
          {
            type: 'bar',
            name: 'c数据类型',
            data: [15],
            coordinateSystem: 'polar',
            roundCap: true,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          },
          {
            type: 'bar',
            name: 'd数据类型',
            data: [40],
            coordinateSystem: 'polar',
            roundCap: true,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          },
          {
            type: 'bar',
            name: 'e数据类型',
            data: [1000],
            coordinateSystem: 'polar',
            roundCap: true,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          },
          {
            type: 'bar',
            name: '其他数据类型',
            data: [1000],
            coordinateSystem: 'polar',
            roundCap: true,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ],
        legend: {
          orient: 'vertical',
          right: 0,
          top: 'middle',
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 10,
          tooltip: {
            show: true,
            formatter: (params) => {
              let item = this.option.series.find(item => item.name == params.name)
              return item.name + ': ' + item.data[0]
            }
          },
          formatter: name => {
            this.colorIndex++
            if (this.colorIndex > 6) {
              this.colorIndex = 1
            }
            return this.getRichArr(this.option.series[this.colorIndex - 1], this.colorIndex - 1, name).join('')
          },
          textStyle: {
            height: 15,
            lineHeight: 15,
            rich: {
              a: {
                align: 'left',
                padding: [0, 20, 0, 0],
                width: 70,
                fontSize: 12
              },
              b0: {
                align: 'right',
                color: '#CAC9CA'
              },
              b1: {
                align: 'right',
                color: '#24D4A6'
              },

              b2: {
                align: 'right',
                color: '#00B7EE'
              },
              b3: {
                align: 'right',
                color: '#6E69F9'
              },
              b4: {
                align: 'right',
                color: '#1E67F2'
              },
              b5: {
                align: 'right',
                color: '#21E5E8'
              },
              c: {
                width: 120,
                height: 0.5,
                borderColor: '#CAC9CA',
                borderWidth: 0.5,
                borderType: 'dashed'
              }
            }

          },

          data: [
            {
              name: 'a数据类型',
              itemStyle: {
                color: 'white',
                borderColor: 'red',
                borderWidth: 3
              },
              lineStyle: {
                type: 'dashed',
                dashOffset: 30
              }
            },
            {
              name: 'b数据类型',
              itemStyle: {
                color: 'white',
                borderColor: 'red',
                borderWidth: 3
              }
            },
            {
              name: 'c数据类型',
              itemStyle: {
                color: 'white',
                borderColor: 'red',
                borderWidth: 3
              }
            },
            {
              name: 'd数据类型',
              itemStyle: {
                color: 'white',
                borderColor: 'red',
                borderWidth: 3
              }
            },
            {
              name: 'e数据类型',
              itemStyle: {
                color: 'white',
                borderColor: 'red',
                borderWidth: 3
              }
            },
            {
              name: '其他数据类型',
              itemStyle: {
                color: 'white',
                borderColor: 'red',
                borderWidth: 3
              }
            }
          ]

        }
      },
      myChart: null
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart() {
      this.myChart = this.$echarts.init(document.getElementById('front-chart'))
      this.option.series.forEach((item, index) => {
        item.color = this.color[index]
      })
      this.option.legend.data.forEach((item, index) => {
        item.itemStyle.borderColor = this.color[index]
      })
      console.log(this.option)
      this.myChart.setOption(this.option)
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
    },
    getRichArr(item, index, name) {
      let arr = []
      switch (index) {
        case 0:
          arr = [
            '{a|' + name + '}',
            '{b0|' + item.data[0] + '}\n'
          ]
          break
        case 1:
          arr = [
            '{a|' + name + '}',
            '{b1|' + item.data[0] + '}\n'
          ]
          break
        case 2:
          arr =
            [
              '{a|' + name + '}',
              '{b2|' + item.data[0] + '}\n'
            ]
          break
        case 3:
          arr =
            [
              '{a|' + name + '}',
              '{b3|' + item.data[0] + '}\n'
            ]
          break
        case 4:
          arr =
            [
              '{a|' + name + '}',
              '{b4|' + item.data[0] + '}\n'
            ]
          break
        case 5:
          arr =
            [
              '{a|' + name + '}',
              '{b5|' + item.data[0] + '} \n'
            ]
          break
      }
      index != 5 && arr.push('{c|}')
      return arr
    }
  }
}
</script>

<style scoped lang='less'>
.front-end-capacity {
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

#front-chart {
  width: 100%;
  height: calc(100% - 35px);
}
</style>