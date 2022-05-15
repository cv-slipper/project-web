<template>
  <div id="thisWeekPie" style="height: 100%;width: 100%"></div>
</template>

<script>
  export default {
    name: "ThisWeekPieChart",
    components: {
    },
    props:{
      dataSource:{
        type:Object,
      }
    },
    data() {
      return {
        indexStyle:1,
        dom: null,
        option: {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            show: true,
            top: '5%',
            left: '0',
          },
          color:[
            "#0077FF",
            "#E8F3FF"
          ],
          series: [
            {
              name: '作业',
              type: 'pie',
              radius: ['0%', '60%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'outside'
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false,
                length: 5,
                length2: 5
              },
              data: [
                {value: 0, name: '完全'},
                {value: 0, name: '增量'},
              ]
            }
          ]
        },
      }
    },
    created() {

    },
    mounted() {
      this.init()
    },
    watch:{
      option:{
        handler(newVal,oldVal){
          if(this.dom){
            if(newVal){
              this.dom.dispose()
              this.init()
            }else {
              this.setOption(oldVal)
            }
          }else {
            this.init()
          }
        },
        deep:true
      },
      dataSource:{
        handler(newVal,oldVal){
          if(newVal){
            this.option.series[0].data[0].value = newVal.totalFull
            this.option.series[0].data[0].name = "完全:" + newVal.totalFull
            this.option.series[0].data[1].value = newVal.totalInc
            this.option.series[0].data[1].name = "增量:" + newVal.totalInc
          }
        },
        deep:true
      }
    },
    methods: {
      init(){
        let dom = document.getElementById('thisWeekPie')
        this.dom = this.$echarts.init(dom)
        this.dom.setOption(this.option)
        this.dom.resize({
          width: 180,
          height: 160
        });
      }
    }
  }
</script>
<style>

</style>