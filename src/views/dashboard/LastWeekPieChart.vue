<template>
  <div id="lastWeekPie" style="height: 100%"></div>
</template>

<script>
  export default {
    name: "LastWeekPieChart",
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
            "#F0166D",
            "#F88BB6"
          ],
          series: [
            {
              name: '异常',
              type: 'pie',
              radius: '60%',
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'outside'
              },
              emphasis: {
                // label: {
                //   show: true,
                //   fontSize: '20',
                //   fontWeight: 'bold'
                // }
              },
              labelLine: {
                show: false,
                length: 5,
                length2: 5
              },
              data: [
                {value: 0, name: '完全'},
                {value: 0, name: '差异'},
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
              this.setOption()
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
        let dom = document.getElementById('lastWeekPie')
        this.dom = this.$echarts.init(dom)
        this.dom.setOption(this.option)
        this.dom.resize({
          width: 180,
          height: 160
        });
      },
      setOption(){
        this.dom.setOption(this.option)
      }
    }
  }
</script>
<style>

</style>