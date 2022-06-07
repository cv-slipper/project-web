<template>
  <div class='front-end-capacity'>
    <div class='trend-chart-title'>
      <div>
        数据类型分布-客户端数量
      </div>
      <div class='info-text'>当前：全域</div>
      <div class='little-title'></div>
    </div>
    <div id='front-chart'>

    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      option: {
        polar: {
          radius: [50, '80%'],
          center: ['30%', 'center']
        },
        grid: {
          left: '10%'
        },

        angleAxis: {
          show: false,
          max: 50,
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
          name: 'a',
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
            name: 'b',
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
            name: 'c',
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
            name: 'd',
            data: [40],
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
          right: 10,
          top: 20,
          bottom: 20,
          icon: 'circle',
          data: ['a', 'b', 'c', 'd']
        }
      },
      myChart: null
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.myChart = this.$echarts.init(document.getElementById('front-chart'))
      this.myChart.setOption(this.option)
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
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