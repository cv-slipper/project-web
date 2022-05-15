<template>
  <div id="main" style="height: 100%;width: 100%"></div>
</template>

<script>
  export default {
    name: "ThisWeekHistogram",
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
        dom:null,
        option: {
          grid: [{
            show: false,
          }],
          color:[
            "#0077FF",
            "#E8F3FF"
          ],
          title: {
            text: this.dataSource.total,
            subtext: '（完全/增量）备份作业总量',
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
          },
          // toolbox: {
          //   show: true,
          //   feature: {
          //     mark:{show:true},
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
              data: this.dataSource.column
              // data: ['一', '二', '三', '四', '五', '六', '日']
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
              data: this.dataSource.full,
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
              data: this.dataSource.incremental,
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
      this.$nextTick(()=>{
        this.init()
        // on(window,'resize',this.resize())
      })

    },
    beforeDestroy() {
      // off(window,'resize',this.resize())
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
        let dom = document.getElementById('main')
        this.dom = this.$echarts.init(dom)
        this.dom.setOption(this.option)
        this.dom.resize({
          width: 400,
          height: 200
        });
      },
      resize(){
        this.dom.resize();
      },
      setOption(val){
        this.dom.setOption(val)
      },
    }
  }
</script>
<style>

</style>