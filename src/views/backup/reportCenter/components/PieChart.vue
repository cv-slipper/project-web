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
let useColor = ['#3C6BE3', '#ECD61B', '#DE430E', '#1BC78B', '#C927B8', '#0FECEE']
export default {
  name: 'PieChart',
  data() {
    return {
      colorIndex: 0,
      color: ['#3C6BE3', '#ECD61B', '#DE430E', '#1BC78B', '#C927B8', '#0FECEE'],
      myChart: null,
      option: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          right: 0,
          top: 'center',
          orient: 'vertical',
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 10,
          formatter: name => {
            this.colorIndex++
            if (this.colorIndex > 7) {
              this.colorIndex = 1
            }
            return this.getRichArr(this.option.series[0].data, name).join('')
          },
          data: [
            {
              name: 'Search Engine',
              itemStyle: {
                color: 'white',
                borderColor: useColor[0],
                borderWidth: 3
              }
            },
            {
              name: 'Direct',
              itemStyle: {
                color: 'white',
                borderColor: useColor[1],
                borderWidth: 3
              }
            },
            {
              name: 'Email',
              itemStyle: {
                color: 'white',
                borderColor: useColor[2],
                borderWidth: 3
              }
            },
            {
              name: 'Union Ads',
              itemStyle: {
                color: 'white',
                borderColor: useColor[3],
                borderWidth: 3
              }
            },
            {
              name: 'Video Ads',
              itemStyle: {
                color: 'white',
                borderColor: useColor[4],
                borderWidth: 3
              }
            },
            {
              name: 'other',
              itemStyle: {
                color: 'white',
                borderColor: useColor[5],
                borderWidth: 3
              }
            }
          ],
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
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            color: ['#3C6BE3', '#ECD61B', '#DE430E', '#1BC78B', '#C927B8', '#0FECEE'],
            radius: ['50%', '70%'],
            center: ['27%', 'center'],
            avoidLabelOverlap: false,
            clockwise: false,
            label: {
              show: false,
              position: 'center'
            },

            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold',
                formatter: '{d}%\n{b}'
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
              { value: 300, name: 'Video Ads' },
              { value: 400, name: 'other' }
            ]
          }
        ]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart() {

      this.myChart = this.$echarts.init(document.getElementById('pieChart'))
      this.myChart.setOption(this.option)
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
    },
    getRichArr(item, name) {
      let arr = []
      let index = item.findIndex(ele => ele.name == name)
      console.log(index)
      switch (index) {
        case 0:
          arr = [
            '{a|' + name + '}',
            '{b0|' + item[index].value + '}\n'
          ]
          break
        case 1:
          arr = [
            '{a|' + name + '}',
            '{b1|' + item[index].value + '}\n'
          ]
          break
        case 2:
          arr =
            [
              '{a|' + name + '}',
              '{b2|' + item[index].value + '}\n'
            ]
          break
        case 3:
          arr =
            [
              '{a|' + name + '}',
              '{b3|' + item[index].value + '}\n'
            ]
          break
        case 4:
          arr =
            [
              '{a|' + name + '}',
              '{b4|' + item[index].value + '}\n'
            ]
          break
        case 5:
          arr =
            [
              '{a|' + name + '}',
              '{b5|' + item[index].value + '} \n'
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