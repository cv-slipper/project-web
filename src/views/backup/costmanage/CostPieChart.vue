<template>
  <div :id="idName" style="height: 100%;width: 100%"></div>
</template>

<script>
  export default {
    name: "CostPieChart",
    components: {
    },
    props:{
      idName:{
        type: String
      },
      title:{
        type: String
      },
      // total:{
      //   type: Number
      // },
      chartData:{
        type: Array
      },
    },
    data() {
      return {
        indexStyle:1,
        dom: null,
        option: {
          tooltip: {
            trigger: 'item'
          },
          title: {
            text: this.total,
            subtext: this.title,
            textStyle:{
              fontsize: 10
            },
            left:'center'
          },
          legend: {
            top: '5%',
            right: 'right',
            // data: ['Search Engine|123']
          },
          // color:[
          //   "#3C90F7",
          //   "#55BFC0",
          //   "#5EBE67",
          //   "#F4CD49",
          //   "#E05667",
          //   "#7C4BD8"
          // ],
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              // left: 'left',
              itemStyle: {
                borderRadius: 2,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '10',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: this.chartData
              // data: [
              //   { value: 1048, name: 'Search Engine|28.79%  4544' },
              //   { value: 735, name: 'Direct|28.79%  4544' },
              //   { value: 580, name: 'Email|28.79%  4544' },
              //   { value: 484, name: 'Union Ads|28.79%  4544' },
              //   { value: 300, name: 'Video Ads|28.79%  4544' }
              // ]
            }
          ],
        },
      }
    },
    created() {

    },
    mounted() {
      this.init()
    },
    watch:{
      chartData:{
        handler(newVal,oldVal){
          if(newVal){
            if(this.dom){
              this.option.series[0].data = newVal
              this.setOption()
            }else {
              this.init()
            }
          }
        }
      }
    },
    methods: {
      init(){
        let dom = document.getElementById(this.idName)
        this.dom = this.$echarts.init(dom);
        this.option && this.dom.setOption(this.option)
        this.dom.resize({
          width: 600,
          height: 300
        });
      },
      setOption(){
        this.dom.setOption(this.option)
      },
      createChart(){

      }
    }
  }
</script>
<style>

</style>