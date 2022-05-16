<template>
  <div class="page-header-index-wide">
    <!-- 图表区域-begin -->
    <a-row :gutter="24">
      <a-col :span="9">
        <a-card :bordered="false" style="width: 100%">
          <template slot="title">
            <a-row>
              <a-col :span="4">作业</a-col>
              <a-col :span="16">
                <a-select v-model="term" style="width: 200px" @change="handleTermChange">
                  <a-select-option :value="7">周</a-select-option>
                  <a-select-option :value="30">月</a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </template>
          <a-col :span="18"><this-week-histogram :dataSource="bkWorkData" ref="weekHistogram"/></a-col>
          <a-col :span="6"><this-week-pie-chart :dataSource="bkWorkData" /></a-col>
        </a-card>
      </a-col>
      <a-col :span="9">
        <a-card title="异常" :bordered="false" style="width: 100%">
          <a-col :span="18"><last-week-histogram :dataSource="exWorkData"/></a-col>
          <a-col :span="6"><last-week-pie-chart :dataSource="exWorkData"/></a-col>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="作业占比" :bordered="false" style="width: 100%">
          <a-col :span="22" :offset="1"><this-week-finish-pie-chart :dataSource="workData"/></a-col>
        </a-card>
      </a-col>
    </a-row>
    <!-- 图表区域-end -->
    <!-- 列表区域-begin -->
    <a-row>
      <a-col :span="22" :offset="1">
        <last-week-work-qty :tableData="workTableData"/>
      </a-col>
    </a-row>
    <!-- 列表区域-end -->
    <br/>
  </div>

</template>

<script>
  import ThisWeekHistogram from './ThisWeekHistogram'
  import LastWeekHistogram from './LastWeekHistogram'
  import ThisWeekPieChart from './ThisWeekPieChart'
  import LastWeekPieChart from './LastWeekPieChart'
  import ThisWeekFinishPieChart from './ThisWeekFinishPieChart'
  import LastWeekWorkQty from './LastWeekWorkQty'
  import LastWeekException from './LastWeekException'
  import { getAction } from '@/api/manage'
  import { keepTwoDecimal } from '@/utils/util'
  import dayjs from 'dayjs'
  export default {
    name: "WeekCard",
    components: {
      ThisWeekHistogram,
      LastWeekHistogram,
      ThisWeekPieChart,
      LastWeekPieChart,
      ThisWeekFinishPieChart,
      LastWeekWorkQty,
      LastWeekException
    },
    props: {
      domain:{
        type: String
      }
    },
    data() {
      return {
        indexStyle:1,
        term: 7,
        bkWorkData:{
          total:0,
          totalFull:0,
          totalInc:0,
          column:[],
          full:[],
          incremental:[],
        },
        exWorkData:{
          total:0,
          totalFull:0,
          totalInc:0,
          column:[],
          full:[],
          incremental:[],
        },
        workData:[
          {value: 0, name: '成功'},
          {value: 0, name: '失败'},
          {value: 0, name: '异常'},
        ],
        workTableData:[],
        url:{
          histogramData:"/job/getHistogramData",
          getTableData:"/job/getTableData",
        }
      }
    },
    created() {
      this.loadData()
    },
    watch:{
      domain(newVal,oldVal){
        this.handleTermChange()
      }
    },
    methods: {
      loadData(){
        getAction(this.url.histogramData,{domain:this.domain,term:this.term}).then((res)=>{
          if(res.success){
            let result = res.result
            console.log('hhhhhhhhhhhhhh',result)
            // let exceptionData =
            let nowTime = new Date();
            for(let i = 0;i<this.term;i++){
              let findDate = dayjs(nowTime).subtract(i,'day').format('YYYY-MM-DD')
              let workDataHisFull = true  //备份作业完全标志
              let workDataHisInc = true   //备份作业差异标志
              let exceptionWorkDataHisFull = true  //异常作业完全标志
              let exceptionWorkDataHisInc = true   //异常作业差异标志
              this.bkWorkData.column.push(dayjs(nowTime).subtract(i,'day').format('MM-DD'))
              this.exWorkData.column.push(dayjs(nowTime).subtract(i,'day').format('MM-DD'))
              // console.log('result',result,this.term)
              let hisDayFull = 0
              let hisDayInc = 0
              for (let item of result){
                let findResult = findDate == dayjs(item.jobTime).format('YYYY-MM-DD')
                // let dateDiff =
                if(findResult){

                  if(item.state === 'Completed'){
                    this.workData[0].value += item.qty*1
                  }else if(item.state.indexOf('Failed') != -1){
                    this.workData[1].value += item.qty*1
                  }else {
                    this.workData[2].value += item.qty*1
                  }
                  if(item.type === 'Backup'){
                    this.bkWorkData.total += item.qty*1
                  }
                  if(item.state != 'Completed' && item.state.indexOf('Failed') == -1){
                    this.exWorkData.total += item.qty*1
                  }
                  if(item.workType ==='Full'){
                    if(item.type === 'Backup'){
                      workDataHisFull = false
                      this.bkWorkData.totalFull += item.qty*1
                      hisDayFull += item.qty*1
                    }
                    if(item.state != 'Completed' && item.state.indexOf('Failed') == -1){
                      exceptionWorkDataHisFull = false
                      this.exWorkData.totalFull += item.qty*1
                      this.exWorkData.full.push(item.qty)
                    }
                  }
                  if(item.workType === 'Incremental'){
                    if(item.type==='Backup'){
                      workDataHisInc = false
                      this.bkWorkData.totalInc += item.qty*1
                      hisDayInc += item.qty*1
                    }
                    if(item.state != 'Completed' && item.state.indexOf('Failed') == -1){
                      exceptionWorkDataHisInc = false
                      this.exWorkData.totalInc += item.qty*1
                      this.exWorkData.incremental.push(item.qty)
                    }
                  }
                }
              }
              if(workDataHisFull){
                this.bkWorkData.full.push(0)
              }else {
                this.bkWorkData.full.push(hisDayFull)
              }
              if(workDataHisInc){
                this.bkWorkData.incremental.push(0)
              }else {
                this.bkWorkData.incremental.push(hisDayInc)
              }
              if(exceptionWorkDataHisFull){
                this.exWorkData.full.push(0)
              }
              if(exceptionWorkDataHisInc){
                this.exWorkData.incremental.push(0)
              }
            }
            this.workData[0].name = "成功:" + this.workData[0].value
            this.workData[1].name = "失败:" + this.workData[1].value
            this.workData[2].name = "异常:" + this.workData[2].value
          }
        })
        getAction(this.url.getTableData,{domain:this.domain,term:this.term}).then((res)=>{
          if(res.success){
            let result = res.result
            for(let i=0;i<result.length;i++){
              result[i].increase = keepTwoDecimal(result[i].increase)
              result[i].id = i
            }
            this.workTableData = result
            console.log("res.result",res.result)
          }
        })
      },
      async handleTermChange(){
        this.bkWorkData ={
          total:0,
          totalFull:0,
          totalInc:0,
          column:[],
          full:[],
          incremental:[],
        }
        this.exWorkData = {
          total:0,
          column:[],
          full:[],
          incremental:[],
          totalFull:0,
          totalInc:0
        }
        this.workData = [
          {value: 0, name: '成功'},
          {value: 0, name: '失败'},
          {value: 0, name: '异常'},
        ]
        this.workTableData = []
        await this.loadData()
      }
    }
  }
</script>
<style>

</style>