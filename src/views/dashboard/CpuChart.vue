<template>
  <canvas id="CPU" style="height: 100%;width: 100%"></canvas>
</template>

<script>
  export default {
    name: "CpuChart",
    components: {
    },
    data() {
      return {
        indexStyle:1,
        option: {
          xAxis: {
            type: 'category',
            data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
              '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
          },
          legend: {
            data: ['CPU', '内存']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: "CPU",
              data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true
            },
            {
              name: "内存",
              data: [1330, 932, 789, 876, 857, 1330, 1320, 1330, 932, 789, 876, 857, 1330, 1320],
              type: 'line',
              smooth: true
            }
          ]
        },
      }
    },
    created() {

    },
    mounted() {
      let dom = document.getElementById('CPU')
      let myChart = this.$echarts.init(dom);
      myChart.setOption(this.option)
      myChart.resize({
        width: 750,
        height: 350
      });
    },
    methods: {

    }
  }
</script>
<style>

</style>