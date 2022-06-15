<template>
  <div class='capacity-radio'>
    <div class='trend-chart-title'>
      <div>
        前端容量应用群组占比
      </div>

      <a-select v-model='value' class='select'>
        <a-select-option v-for='(item,index) in dataList' :value='item.value' :key='index'>{{ item.label }}
        </a-select-option>
      </a-select>

      <div class='little-title'></div>
    </div>
    <div id='capacity-radio'></div>
  </div>
</template>

<script>
export default {
  name: 'CapacityRatio',
  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          bottom: '30px',
          top: '30px'
        },

        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
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
              color: '#666666'
            }

          }
        ]
      }
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
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
      let myChart = this.$echarts.init(document.getElementById('capacity-radio'))
      myChart.setOption(this.option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  }
}
</script>

<style scoped lang='less'>
.capacity-radio {
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

    .select {
      width: 80px;
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