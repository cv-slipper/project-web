<template>
  <canvas :id="id" style="height: 100%;width: 100%"></canvas>
</template>

<script>
  export default {
    name: "LastWeekHistogram",
    components: {
    },
    props:{
      id:{
        type:String
      },
      dataSource:{
        type:Object
      }
    },
    data() {
      return {
        indexStyle:1,
        option: {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dataSource.column
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: this.dataSource.data,
              type: 'line',
              areaStyle: {}
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
            this.option.title.text = newVal.total
            this.option.xAxis[0].data = newVal.column
            this.option.series[0].data = newVal.full
            this.option.series[1].data = newVal.incremental
          }
        },
        deep:true
      }
    },
    methods: {
      init(){
        console.log("this.dataSource",this.dataSource)
        let dom = document.getElementById(this.id)
        this.dom = this.$echarts.init(dom)
        this.dom.setOption(this.option)
        this.dom.resize({
          width: 350,
          height: 40
        });
      }
    }
  }
</script>
<style>

</style>