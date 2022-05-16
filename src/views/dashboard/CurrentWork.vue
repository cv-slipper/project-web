<template>
  <div class="page-header-index-wide">
    <a-card :bordered="false">
      <a-row slot="title">
        <div>
          <a-col :span="1">
            <a-button @click="handlePause" type="primary" icon="pause">暂停</a-button>
          </a-col>
          <a-col :span="1" :offset="1">
            <a-button @click="handleKill" type="primary" icon="logout">终止</a-button>
          </a-col>
          <a-col :span="1" :offset="1">
            <a-button @click="handleResume" type="primary" icon="redo">重运行</a-button>
          </a-col>
        </div>
        <a-col :span="1" :offset="18"><span style="font-size: 16px" @click="handleFresh"><a-icon type="sync" /> 刷新</span></a-col>
      </a-row>
      <a-row>
        <!-- 列表区域-begin -->
        <a-row :gutter="24">
          <a-col :span="24">
            <a-table
              rowKey="jobId"
              size="middle"
              :loading="loading"
              :pagination="ipagination"
              :columns="columns"
              :dataSource="dataSource"
              :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
              @change="handleTableChange"
            >
              <template slot="percentComplete" slot-scope="text, record, index">
                <a-progress
                  strokeColor="#177cb0"
                  :format="getPercentFormat"
                  :percent="getFlowRateNumber(text)"
                  style="width:80px"/>
              </template>
            </a-table>
          </a-col>
        </a-row>
        <!-- 列表区域-end -->
      </a-row>
    </a-card>
    <br/>
  </div>

</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import LastWeekWorkQty from './LastWeekWorkQty'
  import { getAction } from '@/api/manage'
  export default {
    name: 'WeekCard',
    mixins:[JeecgListMixin],
    components: {
      LastWeekWorkQty
    },
    props: {
      domain:{
        type: String
      }
    },
    data() {
      return {
        indexStyle: 1,
        loading: false,
        ipagination:{
          current: 1,
          pageSize: 10,
        },
        columns:[
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '作业ID',
            width: 120,
            align: 'center',
            dataIndex: 'jobId'
          },
          {
            title: '操作',
            width: 120,
            align: 'center',
            dataIndex: 'opType'
          },
          {
            title: '客户端计算机',
            width: 120,
            align: 'center',
            dataIndex: 'clientName'
          },
          {
            title: '代理类型',
            width: 120,
            align: 'center',
            dataIndex: 'agent'
          },
          {
            title: '子客户端',
            width: 120,
            align: 'center',
            dataIndex: 'subclientName'
          },
          {
            title: '作业类型',
            width: 120,
            align: 'center',
            dataIndex: 'backupLevelName'
          },
          {
            title: '阶段',
            width: 120,
            align: 'center',
            dataIndex: 'currentPhase'
          },
          {
            title: '存储策略',
            width: 120,
            align: 'center',
            dataIndex: 'storagePolicyId'
          },
          {
            title: 'MeidaAgent',
            width: 120,
            align: 'center',
            dataIndex: 'MeidaAgent'
          },
          {
            title: '状态',
            width: 120,
            align: 'center',
            dataIndex: 'status'
          },
          {
            title: '进度',
            width: 120,
            align: 'center',
            dataIndex: 'percentComplete',
            scopedSlots:{ customRender:'percentComplete' }
          }
          // {
          //   title: '库',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'library'
          // },
        ],
        dataSource:[],
        url:{
          getActiveJob: "/job/getActiveJob",
          pauseJob: "/job/pauseJob",
          killJob: "/job/killJob",
          resumeJob: "/job/resumeJob",
        }
      }
    },
    created() {
      this.loadData()
    },
    watch:{
      domain(newVal, oldVal){
        this.loadData()
      }
    },
    methods: {
      loadData(){
        this.loading = true
        getAction(this.url.getActiveJob,{domain:this.domain}).then((res)=>{
          if(res.success){
            let result = res.result
            let dataSource = []
            if(result.totalRecordsWithoutPaging>0){
              for(let item of result.jobs){
                let job = {}
                let jobSummary = item.jobSummary
                job.jobId = jobSummary.jobId
                job.opType = jobSummary.jobType
                job.clientName = jobSummary.destinationClient.clientName
                job.subclientName = jobSummary.subclientName
                job.backupLevelName = jobSummary.backupLevelName
                job.currentPhase = jobSummary.currentPhaseName
                job.agent = jobSummary.appTypeName
                job.storagePolicyId = jobSummary.subclient.instanceName
                job.MeidaAgent = jobSummary.subclient.commCellName
                job.status = jobSummary.status
                job.percentComplete = jobSummary.percentComplete
                dataSource.push(job)
              }
            }
            this.dataSource = dataSource
          }
        }).finally(()=>{
          this.loading = false
        })
      },
      handleFresh(){
        this.loadData()
      },
      handlePause(){
        if(this.selectedRowKeys.length==0){
          return
        }
        let jobIds = this.selectedRowKeys.join(",")
        getAction(this.url.pauseJob,{jobIds:jobIds,domain:this.domain}).then((res)=>{
          if(res.success){
            this.$message.success(res.message)
            this.handleFresh()
          }else{
            this.$message.warning(res.message);
          }
        })
      },
      handleKill(){
        if(this.selectedRowKeys.length==0){
          return
        }
        let jobIds = this.selectedRowKeys.join(",")
        getAction(this.url.killJob,{jobIds:jobIds,domain:this.domain}).then((res)=>{
          if(res.success){
            this.$message.success(res.message)
            this.handleFresh()
          }else{
            this.$message.warning(res.message);
          }
        })
      },
      handleResume(){
        if(this.selectedRowKeys.length==0){
          return
        }
        let jobIds = this.selectedRowKeys.join(",")
        getAction(this.url.resumeJob,{jobIds:jobIds,domain:this.domain}).then((res)=>{
          if(res.success){
            this.$message.success(res.message)
            this.handleFresh()
          }else{
            this.$message.warning(res.message);
          }
        })
      },
      getPercentFormat(value){
        if(value==100){
          return "完成"
        }else{
          return value+"%"
        }
      },
      getFlowRateNumber(value){
        return Number(value)
      },
    }
  }
</script>
<style>

</style>