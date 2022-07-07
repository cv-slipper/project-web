<template>
  <div class='pie-chart'>
    <div class='trend-chart-title'>
      <div>
        数据类型分布-前端许可用量
      </div>
      <div v-if='domain!="prod"' class='info-text'>当前：{{ branchName }}</div>
      <div class='little-title'></div>
    </div>
    <a-spin v-if='loading'
            size='large'
            style='position: absolute;left:0;right:0;top:0;bottom: 0;margin:auto;display: flex;align-items: center;justify-content: space-around'>

    </a-spin>
    <template v-else>
      <div v-if='chartData.length>0' id='pieChart' :style='{zoom:zoom}'></div>
      <a-empty v-else
               :description='false'
               style='position: absolute;top:0;left: 0;right: 0;bottom: 0;margin: auto;display: flex;justify-content: space-around;align-items: center' />

    </template>

  </div>
</template>

<script>
let useColor = ['#3C6BE3', '#ECD61B', '#DE430E', '#1BC78B', '#C927B8', '#0FECEE']
import { determineUserMinxin } from '@/mixins/DetermineUserMinxin'

export default {
  name: 'PieChart',
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
      default: false
    }
  },
  data() {
    return {
      chartData: [],
      colorIndex: 0,
      color: ['#3C6BE3', '#ECD61B', '#DE430E', '#1BC78B', '#C927B8', '#0FECEE'],
      myChart: null,
      grid: {
        left: 0
      },
      option: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          right: 0,
          top: 'center',
          orient: 'vertical',
          icon: 'circle',
          itemWidth: 6,
          itemHeight: 6,
          type: 'scroll',//这句
          pageIconSize: 8,
          pageTextStyle: {
            fontSize: 8
          },
          formatter: name => {
            this.colorIndex++
            if (this.colorIndex > 7) {
              this.colorIndex = 1
            }
            return this.getRichArr(this.option.series[0].data, name).join('')
          },
          data: [],
          textStyle: {
            height: 8,
            lineHeight: 8,
            rich: {
              a: {
                align: 'left',
                width: 104,
                fontSize: 8
              },
              b0: {
                align: 'right',
                color: '#3C6BE3',
                fontSize: 8
              },
              b1: {
                align: 'right',
                color: '#ECD61B',
                fontSize: 8
              },

              b2: {
                align: 'right',
                color: '#DE430E',
                fontSize: 8
              },
              b3: {
                align: 'right',
                color: '#1BC78B',
                fontSize: 8
              },
              b4: {
                align: 'right',
                color: '#C927B8',
                fontSize: 8
              },
              b5: {
                align: 'right',
                color: '#0FECEE',
                fontSize: 8
              },
              c: {
                width: 120,
                height: 0.5,
                borderColor: '#CAC9CA',
                borderWidth: 0.5,
                borderType: 'dashed',
                fontSize: 8
              }
            }
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            color: ['#3C6BE3', '#ECD61B', '#DE430E', '#1BC78B', '#C927B8', '#0FECEE'],
            radius: ['40%', '60%'],
            center: ['26%', 'center'],
            avoidLabelOverlap: false,
            clockwise: false,
            label: {
              show: false,
              position: 'center'
            },

            emphasis: {
              label: {
                show: true,
                fontSize: 8,
                fontWeight: 'bold',
                formatter: params => {
                  let oldnum = params.data.num
                  let num = ''
                  if (oldnum >= 1024 && oldnum < 1048576) {
                    num = (oldnum / 1024).toFixed(2) + 'GB'
                  } else if (oldnum >= 1048176) {
                    num = (oldnum / 1048576).toFixed(2) + 'TB'
                  } else {
                    num = oldnum + 'MB'
                  }
                  return params.data.value + '%' + '\n' + num + '\n' + params.data.name
                }
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ]
      }
    }
  },

  methods: {
    initChart(data) {
      console.log(data, 'data')
      this.chartData = data || []
      if (data.length > 0) {
        this.option.legend.data = []
        this.option.series[0].data = []
        data.forEach((item, index) => {
          this.option.series[0].data[index] = {
            value: item.usage,
            name: item.agent,
            num: item.value
          }
          this.option.legend.data[index] = {
            name: item.agent,
            itemStyle: {
              color: 'white',
              borderColor: useColor[index],
              borderWidth: 2
            }
          }
        })
        this.$nextTick(() => {
          this.myChart = this.$echarts.init(document.getElementById('pieChart'))
          this.myChart.clear()
          this.myChart.setOption(this.option, true)
        })

        window.addEventListener('resize', () => {
          this.myChart.resize()
        })
      }

    },
    getRichArr(item, name) {
      let arr = []
      let index = item.findIndex(ele => ele.name == name)
      switch (index) {
        case 0:
          arr = [
            '{a|' + name + '}',
            '{b0|' + item[index].value + '%}\n'
          ]
          break
        case 1:
          arr = [
            '{a|' + name + '}',
            '{b1|' + item[index].value + '%}\n'
          ]
          break
        case 2:
          arr =
            [
              '{a|' + name + '}',
              '{b2|' + item[index].value + '%}\n'
            ]
          break
        case 3:
          arr =
            [
              '{a|' + name + '}',
              '{b3|' + item[index].value + '%}\n'
            ]
          break
        case 4:
          arr =
            [
              '{a|' + name + '}',
              '{b4|' + item[index].value + '%}\n'
            ]
          break
        case 5:
          arr =
            [
              '{a|' + name + '}',
              '{b5|' + item[index].value + '%}\n'
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
.pie-chart {
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

#pieChart {
  width: 100%;
  height: calc(100% - 35px);
}
</style>