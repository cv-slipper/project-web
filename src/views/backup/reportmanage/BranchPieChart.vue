<template>
  <div :id="dataSource.idName" style="height: 100%;width: 100%"></div>
</template>

<script>
  export default {
    name: "BranchPieChart",
    components: {
    },
    props:{
      dataSource:{
        type: Object
      },
    },
    data() {
      return {
        indexStyle:1,
        dom:null,
        option: {
          tooltip: {
            trigger: 'item'
          },
          title: {
            text: this.dataSource.total,
            subtext: this.dataSource.title,
            textStyle:{
              fontsize: 10
            },
            left:'center'
          },
          legend: {
            show: false,
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
              radius: ['0%', '70%'],
              avoidLabelOverlap: false,
              left: 'left',
              itemStyle: {
                borderRadius: 2,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true,
                position: 'outside'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '10',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: true
              },
              data: this.dataSource.data
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
      option:{
        handler(newVal,oldVal){
          if(this.dom){
            if(newVal){
              this.dom.dispose()
              this.init()
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
            this.option.series[0].data= newVal.data
            // this.option.title.text = newVal.total
            this.option.title.text = newVal.title
            // this.option.title.subtext = newVal.title
            this.option.title.subtext = ''
          }
        },
        deep:true
      }
    },
    methods: {
      init(){
        let dom = document.getElementById(this.dataSource.idName)
        this.dom = this.$echarts.init(dom);
        this.dom.setOption(this.option)
        this.dom.resize({
          width: 600,
          height: 300
        });
      }
    }
  }
</script>
<style>

</style>