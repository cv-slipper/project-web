<template>
  <canvas :id="idName" style="height: 100%;width: 100%"></canvas>
</template>

<script>
  export default {
    name: "CostHistogram",
    components: {
    },
    props:{
      idName:{
        type:String,
        // default:"main"
      },
      chartData:{
        type:Object,
      },
      xAxisData:{
        type:Array,
      }
    },
    data() {
      return {
        indexStyle:1,
        option: {
          grid: [{
            show: false,
          }],
          color:[
            "#0077FF",
            "#E8F3FF"
          ],
          // title: {
          //   text: '12266',
          //   subtext: '备份作业',
          //   textStyle:{
          //     fontsize: 10
          //   }
          // },
          // tooltip: {
          //   trigger: 'axis'
          // },
          legend: {
            data: ['XX', 'XXXX'],
            top: "bottom"
          },
          // toolbox: {
          //   show: true,
          //   feature: {
          //     dataView: {show: true, readOnly: false},
          //     magicType: {show: true, type: ['line', 'bar']},
          //     restore: {show: true},
          //     saveAsImage: {show: true}
          //   }
          // },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: this.xAxisData
            }
          ],
          yAxis: [
            {
              splitLine:{
                show: false
              },
              type: 'value'
            }
          ],
          series: [
            this.chartData
            // {
            //   name: '前端',
            //   type: 'bar',
            //   data: [40.3, 43.9, 70.0, 23.2, 25.6, 76.7, 135.6, 40.3, 43.9, 70.0, 23.2, 25.6],
              // markPoint: {
              //   data: [
              //     {type: 'max', name: '最大值'},
              //     {type: 'min', name: '最小值'}
              //   ]
              // },
              // markLine: {
              //   data: [
              //     {type: 'average', name: '平均值'}
              //   ]
              // }
            // },
            // {
            //   name: '备份存储',
            //   type: 'bar',
            //   data: [20.6, 50.9, 90.0, 26.4, 28.7, 70.7, 175.6, 20.6, 50.9, 90.0, 26.4, 28.7],
              // markPoint: {
              //   data: [
              //     {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
              //     {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
              //   ]
              // },
              // markLine: {
              //   data: [
              //     {type: 'average', name: '平均值'}
              //   ]
              // }
            // }
          ]
        },
      }
    },
    created() {

    },
    mounted() {
      let dom = document.getElementById(this.idName)
      let myChart = this.$echarts.init(dom);
      myChart.setOption(this.option)
      myChart.resize({
        width: 600,
        height: 350
      });
    },
    methods: {

    }
  }
</script>
<style>

</style>