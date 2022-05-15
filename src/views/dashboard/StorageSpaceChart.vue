<template>
  <canvas id="storageSpace" style="height: 100%;width: 100%"></canvas>
</template>

<script>
  export default {
    name: "StorageSpace",
    components: {
    },
    data() {
      return {
        indexStyle:1,
        option: {
          title: {
            // text: 'DDB/CS状态'
            text: 'XXXX'
          },
          color:[
            "#0077FF",
            "#F5F5F5",
          ],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // Use axis to trigger tooltip
              type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          legend: {
            show: false,
            data: ['used', 'unused']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['2TB']
          },
          series: [
            {
              name: 'used',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0.45]
            },
            {
              name: 'unused',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [1.55]
            },
          ]
        },
      }
    },
    created() {

    },
    mounted() {
      let dom = document.getElementById('storageSpace')
      let myChart = this.$echarts.init(dom);
      myChart.setOption(this.option)
      myChart.resize({
        width: 300,
        height: 120
      });
    },
    methods: {

    }
  }
</script>
<style>

</style>