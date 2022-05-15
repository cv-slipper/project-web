<template>
  <div class="page-header-index-wide">
    <!-- 指标卡区域-begin -->
    <a-card  :bordered="false" style="width: 100%">
<!--      <template slot="title">-->
<!--        <a-row>-->
<!--&lt;!&ndash;          <a-col :span="4">{{term}}h</a-col>&ndash;&gt;-->
<!--&lt;!&ndash;          <a-col :span="16">&ndash;&gt;-->
<!--            <a-select v-model="term" style="width: 200px" @change="handleTermChange">-->
<!--              <a-select-option :value="24">24h</a-select-option>-->
<!--              <a-select-option :value="48">48h</a-select-option>-->
<!--              <a-select-option :value="72">72h</a-select-option>-->
<!--&lt;!&ndash;              <a-select-option :value="2400">2400h</a-select-option>&ndash;&gt;-->
<!--            </a-select>-->
<!--&lt;!&ndash;          </a-col>&ndash;&gt;-->
<!--        </a-row>-->
<!--      </template>-->
      <a-row>
        <!--          <a-col :span="4">{{term}}h</a-col>-->
        <!--          <a-col :span="16">-->
        <a-select v-model="term" style="width: 200px" @change="handleTermChange">
          <a-select-option :value="24">24h</a-select-option>
          <a-select-option :value="48">48h</a-select-option>
          <a-select-option :value="72">72h</a-select-option>
          <!--              <a-select-option :value="2400">2400h</a-select-option>-->
        </a-select>
        <!--          </a-col>-->
      </a-row>
      <br/>
      <a-row :gutter="24">
        <template v-for="item in dataCard">
          <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" :xxl="3" @click="handTabClick(item)">
<!--            <a-card-grid style="width: 100%;text-align:center;background-color:#009ad6;border-radius: 3px;padding: 0!important;margin-right: 2%;margin-left: 1%">-->
<!--            <a-card-grid :style="{'width': '100%','text-align':'center','background-color':item.num!=0?item.color:'#a1a3a6','border-radius': '3px','padding': '0!important','margin-right': '2%','margin-left': '1%'}">-->
            <a-card-grid :style="{'width': '100%','text-align':'center','background-color':item.num!=0?item.color:'#a1a3a6','border-radius': '3px','padding': '0!important','margin-right': '2%','margin-left': '1%'}">
              <a-row style="padding: 0;margin-top: 5px">
                <a-col :span="8" style="padding: 0">
                  <span style="color: white;font-size: 24px;">{{item.num}}</span>
                </a-col>
                <a-col :span="10" style="padding: 0" :offset="6">
                  <a-icon :type="item.icon" style="font-size: 40px;color: rgba(255,255,255,0.4)"/>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24">
                  <div style="text-align: left;width: 100%"><span style="color: white;font-size: 12px">{{item.text}}</span></div>
                </a-col>
              </a-row>
              <a-row style="margin-top: 14px;background-color: rgba(255,255,255,0.2);color: #ffffff;">
                <a-col :span="24" >
                  <span>更多</span><a-icon type="right" />
                </a-col>
              </a-row>
            </a-card-grid>
<!--            <a-col span="6" align="bottom">-->

<!--              <a-icon :type="item.icon" theme="twoTone" :two-tone-color="item.color" style="font-size: 30px"/>-->
<!--            </a-col>-->
<!--            <a-col span="12">-->
<!--              <a-row>-->
<!--                <span style="font-size: 20px">{{item.num}}</span>-->
<!--              </a-row>-->
<!--              <a-row>-->
<!--                <span style="font-size: 10px">{{item.text}}</span>-->
<!--              </a-row>-->
<!--            </a-col>-->
          </a-col>
        </template>
      </a-row>
    </a-card>
    <!-- 指标卡区域-end -->
  </div>

</template>

<script>


  import { getAction } from '@/api/manage'
  import dayjs from 'dayjs'

  export default {
    name: "YesterdayCard",
    components: {
    },
    props: {
      domain:{
        type: String
      }
    },
    data() {
      return {
        indexStyle:1,
        term:24,
        // 指标卡数据
        dataCard: [
          {
            group: "work",
            text: "作业量",
            num: 0,
            icon: "carry-out",
            color: "#1890ff"
          },
          {
            group: "work",
            text: "失败",
            num: 0,
            icon: "close-circle",
            color: "#1890ff"
          },
          {
            group: "work",
            text: "异常",
            num: 0,
            icon: "info-circle",
            color: "#1890ff"
          },
          {
            group: "event",
            text: "事件",
            num: 0,
            icon: "file-word",
            color: "#1890ff"
          },
          {
            group: "resources",
            text: "备份资源不足",
            num: 0,
            icon: "pie-chart",
            color: "#1890ff"
          },
          {
            group: "resources",
            text: "备份资源脱机",
            num: 0,
            icon: "minus-circle",
            color: "#1890ff"
          },
          {
            group: "resources",
            text: "许可容量超85%",
            num: 0,
            icon: "dashboard",
            color: "#1890ff"
          },
          {
            group: "client",
            text: "客户端脱机",
            num: 0,
            icon: "database",
            color: "#1890ff"
          },
        ],
        url:{
          getWorkNum:'/job/getWorkNum',
          eventDataSource:'/Event/dataList',
          shortageDataSource:'/cvResourceShortage/dataList',
          libraryDataSource:'/cvOfflineLibrary/dataList',
          mediaAgentDataSource:'/cvMediaAgent/dataList',
          ermittedCapacityDataSource:"/cvErmittedCapacity/dataList",
          clientOfflineDataSource:'/cvClientOffline/dataList',
        }
      }
    },
    created() {
      this.loadDataCard()
    },
    watch:{
      domain:{
        handler(newVal,oldVal){
          if(newVal){
            this.loadDataCard()
          }
        },
        deep:true
      }
    },
    methods: {
      handleFieldChange() {
        if(this.prodBtnType ==='primary'){
          this.prodBtnType = 'default'
        }else {
          this.prodBtnType = 'primary'
        }
        if(this.branchBtnType ==='primary'){
          this.branchBtnType = 'default'
        }else {
          this.branchBtnType = 'primary'
        }
      },
      handTabClick(item){
        let label = item.text
        let viewLabel = item.group
        // this.$router.push('/backup/exception/CurrentException?label=作业量')
        this.$router.push({path:'/backup/exception/CurrentException',query:{label:label,viewLabel:viewLabel}})
      },
      getWorkParams(state=''){
        let params = {}
        params.handled = 0
        // params.state = state
        params.domain = this.domain
        if(state === 'Completed w/ one or more errors'){
          params.jobState = 'exception'
        }else {
          params.state = state
        }
        // 过去24小时筛选条件
        let startTime_begin, startTime_end = new Date;
        startTime_begin = dayjs(startTime_begin).subtract(this.term,'hour').format('YYYY-MM-DD HH:mm:ss')
        startTime_end = dayjs(startTime_end).format('YYYY-MM-DD HH:mm:ss')
        params.startTime_begin = startTime_begin
        params.startTime_end = startTime_end
        return params
      },
      async loadDataCard(){
        // 作业量
        await getAction(this.url.getWorkNum,this.getWorkParams()).then((res)=>{
          if(res.success){
            this.dataCard[0].num = res.result
          }
        })
        // 失败
        let failParam = this.getWorkParams('Failed')
        await getAction(this.url.getWorkNum,failParam).then((res)=>{
          if(res.success){
            this.dataCard[1].num = res.result
          }
        })
        // 异常
        let exceptionParam = this.getWorkParams('Completed w/ one or more errors')
        await getAction(this.url.getWorkNum,exceptionParam).then((res)=>{
          if(res.success){
            this.dataCard[2].num = res.result
          }
        })
        // 事件
        await this.loadEventDataSource()
        await this.loadShortageDataSource()
        await this.loadOfflineDataSource()
        await this.loadErmittedCapacity()
        await this.loadClientOfflineDataSource()
      },
      // 加载事件
      loadEventDataSource(){
        let params = {handled:0,domain:this.domain}
        // 过去24小时筛选条件
        let time_begin, time_end = new Date;
        time_begin = dayjs(time_begin).subtract(this.term,'hour').format('YYYY-MM-DD HH:mm:ss')
        time_end = dayjs(time_end).format('YYYY-MM-DD HH:mm:ss')
        params.time_begin = time_begin
        params.time_end = time_end
        getAction(this.url.eventDataSource,params).then((res)=>{
          if(res.success){
            let dataSource = res.result.records
            this.dataCard[3].num = dataSource.length
          }
        })
      },
      // 资源不足
      loadShortageDataSource(){
        let params = {domain:this.domain,handled:0}
        let nowDay = new Date();
        let yesterday = dayjs(nowDay).subtract(this.term/24,"day").format("YYYY-MM-DD")
        params.triggerTime_begin = yesterday
        console.log(params)
        getAction(this.url.shortageDataSource,params).then((res)=>{
          if(res.success){
            let dataSource = res.result.records
            this.dataCard[4].num = dataSource.length
          }
        })
      },
      // 脱机
      loadOfflineDataSource(){
        let libraryParams = {domain:this.domain,handled:0}
        libraryParams.library = this.keyWord
        libraryParams.libraryState = "Offline"
        let nowDay = new Date();
        let yesterday = dayjs(nowDay).subtract(this.term/24,"day").format("YYYY-MM-DD")
        libraryParams.triggerTime_begin = yesterday
        // 库脱机
        getAction(this.url.libraryDataSource,libraryParams).then((res)=>{
          if(res.success){
            let dataSource = res.result.records
            if(this.resourceTags=='driver'){
              this.dataCard[5].num = dataSource.length
            }
          }
        })
        // let maParams = {handled:0,domain:this.domain,readyState:"Disabled"}
        // MA脱机
        getAction(this.url.mediaAgentDataSource,{handled:0,domain:this.domain,readyState:"Disabled"}).then((res)=>{
          if(res.success){
            let dataSource = res.result.records
            if(this.resourceTags=='mediaAgent'){
              this.dataCard[5].num += dataSource.length
            }
          }
        })
      },
      // 许可容量超85%
      loadErmittedCapacity(){
        let params = {domain:this.domain,handle:0}
        let nowDay = new Date();
        let yesterday = dayjs(nowDay).subtract(this.term/24,"day").format("YYYY-MM-DD")
        params.triggerTime_begin = yesterday
        getAction(this.url.ermittedCapacityDataSource,params).then((res)=>{
          if(res.success){
            let records = res.result.records.filter(item => item.proportion>=0.85)
            this.dataCard[6].num = records.length
          }
        })
      },
      // 加载客户端脱机
      loadClientOfflineDataSource(){
        let params = {}
        params.domain = this.domain
        params.handle = 0
        let nowDay = new Date();
        let yesterday = dayjs(nowDay).subtract(this.term/24,"day").format("YYYY-MM-DD")
        params.triggerTime_begin = yesterday
        getAction(this.url.clientOfflineDataSource,params).then((res)=>{
          if(res.success){
            let records = res.result.records
            this.dataCard[7].num = records.length
          }
        })
      },
      handleTermChange(){
        this.loadDataCard()
      }
    }
  }
</script>
<style>

</style>