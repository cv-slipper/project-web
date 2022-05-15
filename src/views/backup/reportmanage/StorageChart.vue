<template>
  <div :id="idName" style="height: 100%;width: 100%"></div>
</template>

<script>
  export default {
    name: 'StorageChart',
    components: {},
    props: {
      idName: {
        type: String
        // default:"main"
      },
      dataSource: {
        type: Object
      }
    },
    data() {
      return {
        indexStyle: 1,
        dom: null,
        option: {
          tooltip: {
            trigger: 'axis'
          },
          color: [
            '#0077FF',
            '#E8F3FF'
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
            data: ['前端', '备份存储'],
            bottom: '5%',
            left: 'center'
          },
          label:{
            show:true,
            position: 'outside'
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
              boundaryGap: true,
              data: this.dataSource.column
            }
          ],
          yAxis: [
            {
              splitLine: {
                show: false
              },
              type: 'value'
            }
          ],
          series: [
            {
              name: '前端',
              type: 'bar',
              data: this.dataSource.frontend
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
              name: '备份存储',
              type: 'bar',
              data: this.dataSource.backend
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
        }
      }
    },
    created() {

    },
    mounted() {
      this.init()
    },
    watch: {
      dataSource: {
        handler(newVal, oldVal) {
          if (newVal) {
            this.option.tooltip.trigger = 'axis'
            this.option.series[0].data = newVal.frontend
            this.option.series[1].data = newVal.backend
            if (this.dom) {
              this.dom.setOption(this.option)
              // this.dom.dispose()
              // this.init()
            } else {
              this.init()
            }
          }
        },
        deep: true
      }
    },
    methods: {
      init() {
        let dom = document.getElementById(this.idName)
        this.dom = this.$echarts.init(dom)
        this.dom.setOption(this.option)
        this.dom.resize({
          width: 900,
          height: 400
        })
      }
    }
  }
</script>
<style>

</style>