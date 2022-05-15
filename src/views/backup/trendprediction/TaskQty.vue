
<template>
  <div>
    <div>
      <span>作业量</span>
    </div>
    <div>
      <p style="background: rgb(240,242,245); width: 40%;padding: 1px"></p>
    </div>
    <div id="taskqty" style="width:100%; height: 400px"></div>
  </div>

</template>

<script>
  import * as echarts from 'echarts'

  export default {
    name: 'TaskQty',
    mounted() {
      this.TaskQty()
    },
    methods: {
      TaskQty() {
        var chartDom = document.getElementById('taskqty')
        var myChart = echarts.init(chartDom)
        var option

        option = {
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
          },
          yAxis: {
            type: 'value'
          },
          grid: {
            width: 'auto'
          },
          legend: {
            data: ['资源量', '备份量'],
            bottom: '5%'
          },
          tooltip: {
            trigger: 'axis'
          },
          // toolbox: {
          //   feature:{
          //     magicType:{
          //       show: false,
          //       type: ['stack']
          //     }
          //   }
          // },
          series: [
            {
              name:'数据',
              data: [150, 230, 224, 218, 135, 147, 260,150, 230, 224, 218, 135],
              type: 'bar',

            },
          ]
        }

        option && myChart.setOption(option)
      },

    }
  }
</script>

<style scoped>

</style>