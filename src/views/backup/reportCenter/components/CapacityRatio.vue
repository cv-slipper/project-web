<template>
  <div class='capacity-radio'>
    <div class='trend-chart-title'>
      <div>
        {{ values == 1 ? '前端许可用量' : values == 2 ? '后端存储用量' : '客户端数量' }}各{{ domain == 'prod' ? '应用群组' : '区域' }}占比
      </div>

      <a-select v-model='values' class='select' @change='selectChange'>
        <a-select-option v-for='(item,index) in dataList' :value='item.value' :key='index'>{{ item.label }}
        </a-select-option>
      </a-select>

      <div class='little-title'></div>
    </div>
    <a-spin v-if='loading' size='large'
            style='position: absolute;left:0;right:0;top:0;bottom: 0;margin:auto;display: flex;align-items: center;justify-content: space-around'>

    </a-spin>
    <template v-else>
      <div v-if='chartData.length>0' id='capacity-radio' :style='{zoom:zoom}'></div>
      <a-empty v-else
               :description='false'
               style='position: absolute;top:0;left: 0;right: 0;bottom: 0;margin: auto;display: flex;justify-content: space-around;align-items: center' />

    </template>

  </div>
</template>

<script>
import { determineUserMinxin } from '@/mixins/DetermineUserMinxin'

export default {
  name: 'CapacityRatio',
  mixins: [determineUserMinxin],
  props: {
    value: {
      type: Number,
      default: 1
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
  watch: {
    value: {
      handler(val) {
        this.values = val
      },
      immediate: true
    },
    domain: {
      handler(val) {
        if (val == 'branch') {
          this.dataList = [
            {
              value: 1,
              label: '前端'
            },
            {
              value: 2,
              label: '后端'
            },
            {
              value: 3,
              label: '客户端数量'
            }
          ]
        } else {
          this.dataList = [
            {
              value: 1,
              label: '前端'
            },
            {
              value: 3,
              label: '客户端数量'
            }
          ]
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      chartData: [],
      values: '',
      myChart: null,
      dataList: [
        {
          value: 1,
          label: '前端'
        },
        {
          value: 2,
          label: '后端'
        },
        {
          value: 3,
          label: '客户端数量'
        }
      ],
      option: {
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            //x轴文字的配置
            show: true,
            interval: 0,//使x轴文字显示全
            rotate: 0,
            fontSize: 8
          }
        },
        yAxis: {
          type: 'value',

          axisLabel: {
            margin: 2,
            fontSize: 8
          }
        },
        grid: {
          bottom: 28,
          top: 30,
          left: 15,
          right: 5
        },

        series: [
          {
            data: [],
            type: 'pictorialBar',
            symbol: 'triangle',
            color: new this.$echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 1, color: '#E4ECFA' },
                { offset: 0, color: '#3C6BE3' },
                { offset: 0.8, color: '#E4ECFA' }
              ]
            ),
            label: {
              show: true,
              position: 'top',
              formatter: '{c}%',
              color: '#666666',
              fontSize: 8
            }

          }
        ]
      }
    }
  },
  methods: {
    selectChange() {
      this.$emit('input', this.values)
    },
    initData(data) {
      this.chartData = data || []
      if (data.length > 0) {
        let legend = data.map(item => ({ value: this.domain == 'prod' ? item.groupName : item.regionName }))
        let series = data.map(item => item.ratio)
        this.option.xAxis.data = legend
        this.option.series[0].data = series
        this.initChart()
      } else {
        if (this.myChart) {
          this.myChart.clear()
        }
      }
    },
    initChart() {
      if (window.screen.width == 1920) {
        this.option.xAxis.axisLabel.rotate = 0
      } else {
        this.option.xAxis.axisLabel.rotate = 30
      }
      let max = Math.max(...this.option.series[0].data)
      let index = this.option.series[0].data.indexOf(max)
      this.option.series[0].data[index] = {
        value: max,
        itemStyle: {
          color: new this.$echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              { offset: 1, color: '#E4ECFA' },
              { offset: 0, color: '#14E0CE' },
              { offset: 0.8, color: '#E4ECFA' }
            ]
          )
        }
      }
      this.$nextTick(() => {
        this.myChart = this.$echarts.init(document.getElementById('capacity-radio'))
        this.myChart.clear()
        this.myChart.setOption(this.option)
        window.addEventListener('resize', () => {
          if (window.screen.width == 1920) {
            this.option.xAxis.axisLabel.rotate = 0
          } else {
            this.option.xAxis.axisLabel.rotate = 30
          }
          this.myChart.setOption(this.option)
          this.myChart.resize()
        })
      })

    }
  }
}
</script>

<style scoped lang='less'>
.capacity-radio {
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

    .select {
      width: 100px;
      height: 20px;
      position: absolute;
      right: 0;
      top: 0;
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

#capacity-radio {
  width: 100%;
  height: calc(100% - 35px);
}

/deep/ .select .ant-select-selection {
  height: 25px !important;
  font-size: 12px !important;
}

/deep/ .select .ant-select-selection-selected-value {
  line-height: 25px !important;
}
</style>