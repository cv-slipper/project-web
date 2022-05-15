<template>
  <div :id="idName" style="height: 100%;width: 100%"></div>
</template>

<script>
  export default {
    name: "FrontTrend",
    components: {
    },
    props:{
      idName:{
        type: String
      },
      title:{
        type: String
      },
      dataSource:{
        type: Object
      },
      chartData:{
        type: Array
      },
      legendData:{

      }
    },
    data() {
      return {
        indexStyle:1,
        dom:null,
        option: {
          tooltip: {
            trigger: 'axis'
          },
          title:{
            text:this.title
          },
          xAxis: {
            show: false,
            type: 'category',
            data: this.dataSource.column
          },
          legend: {
            // data: ['总行', '分行'],
            bottom: 'bottom'
          },
          label:{
            show:false,
            position:'outside'
          },
          yAxis: {
            show:true,
            type: 'value'
          },
          // series:this.chartData,
          series: this.dataSource.data
          // series: [
          //   {
          //     name: "总行",
          //     data: [],
          //     type: 'line',
          //     smooth: true
          //   },
          //   {
          //     name: "分行",
          //     data: [],
          //     type: 'line',
          //     smooth: true
          //   }
          // ]
        },
      }
    },
    created() {

    },
    mounted() {
      this.init()
    },
    watch:{
      dataSource:{
        handler(newVal,oldVal){
          console.log(newVal)
          if(newVal){
            this.option.xAxis.data = newVal.column
            this.option.series = newVal.data
            // this.option.series[0].data = newVal.prodData
            // this.option.series[1].data = newVal.branchData
            if(this.dom){
              this.dom.dispose()
              this.init()
            }else {
              this.init()
            }
          }
        },
        deep:true
      }
    },
    methods: {
      init(){
        let dom = document.getElementById(this.idName)
        this.dom = this.$echarts.init(dom);
        this.dom.setOption(this.option)
        this.dom.resize({
          width: 550,
          height: 300
        });
      }
    }
  }
</script>
<style>

</style>