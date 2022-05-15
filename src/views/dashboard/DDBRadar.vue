<template>
  <canvas id="ddbRadar" style="height: 100%;width: 100%"></canvas>
</template>

<script>
  export default {
    name: "DDBRadar",
    components: {
    },
    data() {
      return {
        indexStyle:1,
        option: {
          title: {
            // text: 'DDB/CS状态'
            text: ''
          },
          legend: {
            data: ['DDB', 'CS']
          },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: 'XX', max: 6500},
              { name: 'XX', max: 16000},
              { name: 'XX', max: 30000},
              { name: 'XX', max: 38000},
              { name: 'XX', max: 52000},
            ]
          },
          series: [{
            name: 'XXXXXXXXXXXX',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000],
                name: 'DDB'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000],
                name: 'CS'
              }
            ]
          }]
        },
      }
    },
    created() {

    },
    mounted() {
      let dom = document.getElementById('ddbRadar')
      let myChart = this.$echarts.init(dom);
      myChart.setOption(this.option)
      myChart.resize({
        width: 400,
        height: 300
      });
    },
    methods: {

    }
  }
</script>
<style>

</style>