<template>
  <canvas id="NetworkChart" style="height: 100%;width: 100%"></canvas>
</template>

<script>
  export default {
    name: "NetworkChart",
    components: {
    },
    data() {
      return {
        indexStyle:1,
        option: {
          title: {
            // text: 'DDB/CS状态'
            text: 'XX'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }]
        },
      }
    },
    created() {

    },
    mounted() {
      let dom = document.getElementById('NetworkChart')
      let myChart = this.$echarts.init(dom);
      myChart.setOption(this.option)
      myChart.resize({
        width: 400,
        height: 200
      });
    },
    methods: {

    }
  }
</script>
<style>

</style>