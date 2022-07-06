<template>
  <div class='front-end-capacity'>
    <div class='trend-chart-title'>
      <div>
        数据类型分布-客户端数量
      </div>
      <div v-if='domain!="prod"' class='info-text'>当前：{{ branchName }}</div>
      <div class='little-title'></div>
    </div>
    <a-spin v-if='loading' size='large'
            style='position: absolute;left:0;right:0;top:0;bottom: 0;margin:auto;display: flex;align-items: center;justify-content: space-around'>

    </a-spin>
    <template v-else>
      <div v-if='dataSource.length>0' id='front-chart' :style='{zoom:zoom}'>
      </div>
      <a-empty v-else
               :description='false'
               style='position: absolute;top:0;left: 0;right: 0;bottom: 0;margin: auto;display: flex;justify-content: space-around;align-items: center' />

    </template>

  </div>
</template>

<script>
import { determineUserMinxin } from '@/mixins/DetermineUserMinxin'

export default {
  mixins: [determineUserMinxin],
  props: {
    branchName: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    domain: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      colorIndex: 0,
      color: ['#CAC9CA', '#24D4A6', '#00B7EE', '#6E69F9', '#1E67F2', '#21E5E8'],
      option: {
        polar: {
          radius: [15, '70%'],
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
        series: [],
        legend: {
          orient: 'vertical',
          right: 0,
          top: 'middle',
          icon: 'circle',
          itemWidth: 6,
          itemHeight: 6,
          type: 'scroll',//这句
          pageIconSize: 8,
          pageTextStyle: {
            fontSize: 8
          },
          tooltip: {
            show: true,
            formatter: (params) => {
              let item = this.option.series.find(item => item.name == params.name)
              return item.name + ': ' + item.data[0] + '%'
            }
          },
          textStyle: {
            height: 8,
            lineHeight: 8,
            fontSize: 8,
            rich: {
              a: {
                width: 95,
                align: 'left',
                fontSize: 8
              },
              b0: {
                align: 'right',
                color: '#CAC9CA',
                fontSize: 8
              },
              b1: {
                align: 'right',
                color: '#24D4A6',
                fontSize: 8
              },

              b2: {
                align: 'right',
                color: '#00B7EE',
                fontSize: 8
              },
              b3: {
                align: 'right',
                color: '#6E69F9',
                fontSize: 8
              },
              b4: {
                align: 'right',
                color: '#1E67F2',
                fontSize: 8
              },
              b5: {
                align: 'right',
                color: '#21E5E8',
                fontSize: 8
              },
              c: {
                width: 120,
                height: 0.5,
                borderColor: '#CAC9CA',
                borderWidth: 0.5,
                fontSize: 8,
                borderType: 'dashed'
              }
            }

          },

          data: [
            // {
            //   name: 'a数据类型',
            //   itemStyle: {
            //     color: 'white',
            //     borderColor: 'red',
            //     borderWidth: 3
            //   },
            //   lineStyle: {
            //     type: 'dashed',
            //     dashOffset: 30
            //   }
            // },
            // {
            //   name: 'b数据类型',
            //   itemStyle: {
            //     color: 'white',
            //     borderColor: 'red',
            //     borderWidth: 3
            //   }
            // },
            // {
            //   name: 'c数据类型',
            //   itemStyle: {
            //     color: 'white',
            //     borderColor: 'red',
            //     borderWidth: 3
            //   }
            // },
            // {
            //   name: 'd数据类型',
            //   itemStyle: {
            //     color: 'white',
            //     borderColor: 'red',
            //     borderWidth: 3
            //   }
            // },
            // {
            //   name: 'e数据类型',
            //   itemStyle: {
            //     color: 'white',
            //     borderColor: 'red',
            //     borderWidth: 3
            //   }
            // },
            // {
            //   name: '其他数据类型',
            //   itemStyle: {
            //     color: 'white',
            //     borderColor: 'red',
            //     borderWidth: 3
            //   }
            // }
          ]

        }
      },
      myChart: null,
      dataSource: []
    }
  },
  methods: {
    initDataSource(data) {
      console.log(data, 'data')
      this.dataSource = data.reverse()
      this.$nextTick(() => {
        this.initChart()
      })
    },
    initChart() {
      if (this.dataSource.length > 0) {
        this.colorIndex = 0
        this.option.series = []
        this.option.legend.data = []
        for (let index = 0; index < this.dataSource.length; index++) {
          let item = this.dataSource[index]
          this.option.series[index] = {
            type: 'bar',
            barWidth: 3,
            name: item.agent,
            data: [item.clientRatio],
            coordinateSystem: 'polar',
            roundCap: true,
            showBackground: true
          }
          this.option.legend.data[this.dataSource.length - 1 - index] = {
            name: item.agent,
            itemStyle: {
              color: 'white',
              borderColor: 'red',
              borderWidth: 2
            }
          }
        }
        let max = Math.max(...this.option.series.map(item => item.data[0]))
        let min = Math.min(...this.option.series.map(item => item.data[0]))
        this.option.angleAxis.max = max * 1.2
        this.option.legend.formatter = name => {
          let item = this.option.series.find(item => item.name == name)
          let index = this.option.series.findIndex(item => item.name == name)

          return this.getRichArr(item, index, name).join('')
        }
        this.option.series.forEach((item, index) => {
          item.color = this.color[index]
        })
        this.option.legend.data.forEach((item, index) => {

          item.itemStyle.borderColor = this.color[this.dataSource.length - 1 - index]
        })

        this.myChart = this.$echarts.init(document.getElementById('front-chart'))
        this.myChart.clear()
        this.myChart.setOption(this.option, true)
        window.addEventListener('resize', () => {
          this.myChart.resize()
        })
      }

    },
    getRichArr(item, index, name) {
      let arr = []
      switch (index) {
        case 0:
          arr = [
            '{a|' + name + '}',
            '{b0|' + item.data[0] + '%}\n'
          ]
          break
        case 1:
          arr = [
            '{a|' + name + '}',
            '{b1|' + item.data[0] + '%}\n'
          ]
          break
        case 2:
          arr =
            [
              '{a|' + name + '}',
              '{b2|' + item.data[0] + '%}\n'
            ]
          break
        case 3:
          arr =
            [
              '{a|' + name + '}',
              '{b3|' + item.data[0] + '%}\n'
            ]
          break
        case 4:
          arr =
            [
              '{a|' + name + '}',
              '{b4|' + item.data[0] + '%}\n'
            ]
          break
        case 5:
          arr =
            [
              '{a|' + name + '}',
              '{b5|' + item.data[0] + '%} \n'
            ]
          break
      }
      index != 0 && arr.push('{c|}')
      return arr
    }
  }
}
</script>

<style scoped lang='less'>
.front-end-capacity {
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
}

#front-chart {
  width: 100%;
  height: calc(100% - 35px);
}
</style>