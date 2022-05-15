<template>
  <div id="last" style="height: 100%;width: 100%"></div>
</template>

<script>
  export default {
    name: "LastWeekHistogram",
    components: {
    },
    props:{
      dataSource:{
        type:Object
      }
    },
    data() {
      return {
        indexStyle:1,
        option: {
          color:[
            "#F0166D",
            "#F88BB6"
          ],
          title: {
            text: '226',
            subtext: '（完全/增量）异常作业总量',
            textStyle:{
              fontsize: 10
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['完全', '增量']
          },
          label:{
            show:true,
            position:'inside'
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
              data: ['一', '二', '三', '四', '五', '六', '日']
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
            {
              name: '完全',
              type: 'bar',
              data: [0, 0, 0, 0, 0, 0, 0],
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
            },
            {
              name: '增量',
              type: 'bar',
              data: [0, 0, 0, 0, 0, 0, 0],
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
        let dom = document.getElementById('last')
        this.dom = this.$echarts.init(dom)
        this.dom.setOption(this.option)
        this.dom.resize({
          width: 400,
          height: 200
        });
      }
    }
  }
</script>
<style>

</style>