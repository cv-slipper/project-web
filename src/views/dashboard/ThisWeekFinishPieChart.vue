<template>
  <div id="thisWeekFinishPie" style="height: 100%;width: 100%"></div>
</template>

<script>
  export default {
    name: "ThisWeekFinishPieChart",
    components: {
    },
    props:{
      dataSource:{
        type:Array,
      }
    },
    data() {
      return {
        indexStyle:1,
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
            "#F0166D",
            "#F88BB6"
          ],
          series: [
            {
              name: '作业占比',
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
                show: false
              },
              data: this.dataSource
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
            this.option.series[0].data = newVal
          }
        },
        deep:true
      }
    },
    methods: {
      init(){
        let dom = document.getElementById('thisWeekFinishPie')
        this.dom = this.$echarts.init(dom)
        this.dom.setOption(this.option)
        this.dom.resize({
          width: 250,
          height: 200
        });
      }
    }
  }
</script>
<style>

</style>