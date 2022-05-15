<template>
  <a-modal
    width="60%"
    :visible="visible"
    okText="关闭"
    @cancel="handleCancel"
    @ok="handleOk">
    <br>
    <!-- 作业信息-begin -->
    <a-row>
      <span style="font-size: 20px;font-weight: bold">作业信息</span>
    </a-row>
    <a-divider/>
    <a-row>
      <a-col span="12">
        <a-col span="12">作业运行时间：</a-col>
        <a-col span="12">{{dataSource.jobElapsedTime}}</a-col>
      </a-col>
      <a-col span="12">
        <a-col span="12">作业ID：</a-col>
        <a-col span="12">{{dataSource.jobId}}</a-col>
      </a-col>
    </a-row>
    <a-divider/>
    <a-row>
      <a-col span="12">
        <a-col span="12">作业开始时间：</a-col>
        <a-col span="12">{{getRealTime(dataSource.jobStartTime)}}</a-col>
      </a-col>
      <a-col span="12">
        <a-col span="12">作业类型：</a-col>
        <a-col span="12">{{dataSource.jobType}}</a-col>
      </a-col>
    </a-row>
    <a-divider/>
    <a-row>
      <a-col span="12">
        <a-col span="12">最后更新时间：</a-col>
        <a-col span="12">{{getRealTime(dataSource.lastUpdateTime)}}</a-col>
      </a-col>
      <a-col span="12">
        <a-col span="12">状态：</a-col>
        <a-col span="12">{{dataSource.status}}</a-col>
      </a-col>
    </a-row>
    <a-divider/>
    <a-row>
      <a-col span="12">
        <a-col span="12">子客户名称：</a-col>
        <a-col span="12">{{dataSource.subclientName}}</a-col>
      </a-col>
      <a-col span="12">
        <a-col span="12">客户端名称：</a-col>
        <a-col span="12">{{subclient.clientName}}</a-col>
      </a-col>
    </a-row>
    <a-divider/>
    <a-row>
      <a-col span="12">
        <a-col span="12">实例名称：</a-col>
        <a-col span="12">{{subclient.instanceName}}</a-col>
      </a-col>
<!--      <a-col span="12">-->
<!--        <a-col span="12">子客户名称：</a-col>-->
<!--        <a-col span="12">{{subclient.subclientName}}</a-col>-->
<!--      </a-col>-->
    </a-row>
    <a-divider/>

    <!--    <a-row>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">作业ID：</a-col>-->
    <!--        <a-col span="12">{{dataSource.jobId}}</a-col>-->
    <!--      </a-col>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">应用程序类型名称：</a-col>-->
    <!--        <a-col span="12">{{dataSource.appTypeName}}</a-col>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <!--    <a-divider/>-->
    <!--    <a-row>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">备份级别：</a-col>-->
    <!--        <a-col span="12">{{dataSource.backupLevel}}</a-col>-->
    <!--      </a-col>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">备份级别名称：</a-col>-->
    <!--        <a-col span="12">{{dataSource.backupLevelName}}</a-col>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <!--    <a-divider/>-->
    <!--    <a-row>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">备份集名称：</a-col>-->
    <!--        <a-col span="12">{{dataSource.backupSetName}}</a-col>-->
    <!--      </a-col>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">当前阶段名称：</a-col>-->
    <!--        <a-col span="12">{{dataSource.currentPhaseName}}</a-col>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <!--    <a-divider/>-->
    <!--    <a-row>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">备份级别：</a-col>-->
    <!--        <a-col span="12">{{dataSource.backupLevel}}</a-col>-->
    <!--      </a-col>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">dest客户端名称：</a-col>-->
    <!--        <a-col span="12">{{dataSource.destClientName}}</a-col>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <!--    <a-divider/>-->
    <!--    <a-row>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">衰老：</a-col>-->
    <!--        <a-col span="12">{{dataSource.isAged}}</a-col>-->
    <!--      </a-col>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">可见：</a-col>-->
    <!--        <a-col span="12">{{dataSource.isVisible}}</a-col>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <!--    <a-divider/>-->

    <!--    <a-row>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">未决原因：</a-col>-->
    <!--        <a-col span="12">{{dataSource.pendingReason}}</a-col>-->
    <!--      </a-col>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">完成百分比：</a-col>-->
    <!--        <a-col span="12">{{dataSource.percentComplete}}</a-col>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <!--    <a-divider/>-->
    <!--    <a-row>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">节省百分比：</a-col>-->
    <!--        <a-col span="12">{{dataSource.percentSavings}}</a-col>-->
    <!--      </a-col>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">应用程序大小：</a-col>-->
    <!--        <a-col span="12">{{dataSource.sizeOfApplication}}</a-col>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <!--    <a-divider/>-->
    <!--    <a-row>-->

    <!--      <a-col span="12">-->
    <!--        <a-col span="12">状态颜色：</a-col>-->
    <!--        <a-col span="12">{{dataSource.statusColor}}</a-col>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <!--    <a-divider/>-->
    <!--    <a-row>-->

    <!--      <a-col span="12">-->
    <!--        <a-col span="12">失败文件总数：</a-col>-->
    <!--        <a-col span="12">{{dataSource.totalFailedFiles}}</a-col>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <!--    <a-divider/>-->
    <!--    <a-row>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">失败文件夹总数：</a-col>-->
    <!--        <a-col span="12">{{dataSource.totalFailedFolders}}</a-col>-->
    <!--      </a-col>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">文件总数：</a-col>-->
    <!--        <a-col span="12">{{dataSource.totalNumOfFiles}}</a-col>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <!--    <a-divider/>-->
    <!--    <a-row>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">应用程序名称：</a-col>-->
    <!--        <a-col span="12">{{subclient.appName}}</a-col>-->
    <!--      </a-col>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">应用程序Id：</a-col>-->
    <!--        <a-col span="12">{{getApplicationIdDictName(subclient.applicationId)}}</a-col>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <!--    <a-divider/>-->
    <!--    <a-row>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">备份集Id：</a-col>-->
    <!--        <a-col span="12">{{subclient.backupsetId}}</a-col>-->
    <!--      </a-col>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">备份集名称：</a-col>-->
    <!--        <a-col span="12">{{subclient.backupsetName}}</a-col>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <!--    <a-divider/>-->
    <!--    <a-row>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">客户端Id：</a-col>-->
    <!--        <a-col span="12">{{subclient.clientId}}</a-col>-->
    <!--      </a-col>-->

    <!--    </a-row>-->
    <!--    <a-divider/>-->
    <!--    <a-row>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">实例Id：</a-col>-->
    <!--        <a-col span="12">{{subclient.instanceId}}</a-col>-->
    <!--      </a-col>-->

    <!--    </a-row>-->
    <!--    <a-divider/>-->
    <!--    <a-row>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">子客户Id：</a-col>-->
    <!--        <a-col span="12">{{subclient.subclientId}}</a-col>-->
    <!--      </a-col>-->

    <!--    </a-row>-->
    <!--    <a-divider/>-->
    <!--    <a-row>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="12">磁盘上介质的大小：</a-col>-->
    <!--        <a-col span="12">{{dataSource.sizeOfMediaOnDisk}}</a-col>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <!--    <a-divider/>-->
    <!-- 作业信息-end -->
    <br/>
    <!-- 延迟原因-begin -->
    <!--    <a-row>-->
    <!--      <span style="font-size: 20px;font-weight: bold">延迟原因</span>-->
    <!--    </a-row>-->
    <!--    <a-row>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="6">错误代码：</a-col>-->
    <!--        <a-col span="18">{{errorCode}}</a-col>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <!--    <a-row>-->
    <!--      <a-col span="12">-->
    <!--        <a-col span="6">说明：</a-col>-->
    <!--        <a-col span="18">{{explain}}</a-col>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <!-- 延迟原因-end -->
    <br/>
    <!-- 日志-begin -->
    <!--    <div class="table-title">日志</div>-->
    <!--    <a-table-->
    <!--      rowKey="id"-->
    <!--      size="middle"-->
    <!--      bordered-->
    <!--      :columns="columns"-->
    <!--      :dataSource="dataSource"-->
    <!--      :pagination="true">-->

    <!--      <span slot="event" slot-scope="text">-->
    <!--        <j-ellipsis :value="text" :length="25"/>-->
    <!--      </span>-->
    <!--      <template slot="footer" slot-scope="currentPageData">-->
    <!--        <a-row>-->
    <!--          <a-col span="19"></a-col>-->
    <!--          <a-col span="5" style="text-align: center !important;"><span>{{totalTime}}</span></a-col>-->
    <!--        </a-row>-->
    <!--      </template>-->
    <!--    </a-table>-->
    <!-- 日志-end -->
    <br/>
    <!-- RMAN日志-begin -->
    <!--    <div class="table-title">RMAN日志</div>-->
    <!--    <a-table-->
    <!--      rowKey="id"-->
    <!--      size="middle"-->
    <!--      bordered-->
    <!--      :columns="rmanColumns"-->
    <!--      :dataSource="rmanDataSource"-->
    <!--      :pagination="true">-->

    <!--      <span slot="event" slot-scope="text">-->
    <!--        <j-ellipsis :value="text" :length="25"/>-->
    <!--      </span>-->
    <!--      <span slot="operation" slot-scope="text">-->
    <!--        <j-ellipsis :value="text" :length="25"/>-->
    <!--      </span>-->
    <!--      <template slot="footer" slot-scope="currentPageData">-->
    <!--        <a-row>-->
    <!--          <a-col span="20"></a-col>-->
    <!--          <a-col span="4" style="text-align: center !important;"><span>{{totalTime}}</span></a-col>-->
    <!--        </a-row>-->
    <!--      </template>-->
    <!--    </a-table>-->
    <!-- RMAN日志-end -->
    <a-tabs default-active-key="subclientProperties" @change="handleTabsChange">
      <a-tab-pane key="subclientProperties" tab="备份内容">
        <a-table
          ref="table"
          size="middle"
          bordered
          rowKey="id"
          class="j-table-force-nowrap"
          :columns="propertiesColumns"
          :dataSource="propertiesDataSource"
          :pagination="ipagination"
          :loading="loading"
          @change="handleTableChange">
            <span slot="action" slot-scope="text, record"></span>
          <template slot="path" slot-scope="text, record">

<!--            <a-textarea :v-model="syntaxHighlight(text)"></a-textarea>-->
            <p v-for="item in JSON.parse(`[${text}]`)">{{item}}</p>
<!--            <a-textarea :v-model="text"></a-textarea>-->

<!--            <span>{{text}}</span>-->
<!--            <j-ellipsis :value="text" :length="50"/>-->
          </template>
          <template slot="commonProperties" slot-scope="text, record">
            <j-ellipsis :value="text" :length="50"/>
          </template>
          <template slot="subClientEntity" slot-scope="text, record">
            <j-ellipsis :value="text" :length="50"/>
          </template>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="subclientBrowse" tab="备份结果" force-render>
        <a-table
          ref="table"
          size="middle"
          bordered
          rowKey="id"
          class="j-table-force-nowrap"
          :columns="browseColumns"
          :dataSource="browseDataSource"
          :pagination="ipagination"
          :loading="loading"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="handleTableChange">
          <template slot="path" slot-scope="text, record">
            <j-ellipsis :value="text" :length="50"/>
          </template>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="rman" tab="RMAN日志" v-if="false">
        <a-table
          ref="table"
          size="middle"
          bordered
          rowKey="id"
          class="j-table-force-nowrap"
          :columns="propertiesColumns"
          :dataSource="mediaAgentDataSource"
          :pagination="ipagination"
          :loading="loading"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          @change="handleTableChange">
        </a-table>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import { initDictOptions } from '@/components/dict/JDictSelectUtil'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import { getAction } from '@/api/manage'
  import dayjs from 'dayjs'

  export default {
    name: 'DetailModal',
    mixins: [JeecgListMixin],
    components: {
      JEllipsis,
      JDictSelectTag
    },
    data() {
      return {
        visible: false,
        currentTab: "subclientProperties",
        dataSource: {},
        propertiesDataSource: [],
        browseDataSource: [],
        applicationId: [],
        subclient: {},
        ipagination: {
          current: 1,
          pageSize: 10
        },
        propertiesColumns: [
          // {
          //   title: '顺序',
          //   dataIndex: '',
          //   key: 'rowIndex',
          //   width: 60,
          //   align: 'center',
          //   customRender: function(t, r, index) {
          //     return parseInt(index) + 1
          //   }
          // },
          {
            title: '路径',
            width: 120,
            align: 'center',
            dataIndex: 'path',
            scopedSlots: {customRender : "path"}
          },
          // {
          //   title: 'analyticsSubclientProp',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'analyticsSubclientProp'
          // },
          // {
          //   title: 'canChangeEncryptionSetting',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'canChangeEncryptionSetting'
          // },
          // {
          //   title: 'cassandraProps',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'cassandraProps'
          // },
          // {
          //   title: 'commonProperties',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'commonProperties',
          //   scopedSlots: {customRender : "commonProperties"}
          // },
          // {
          //   title: 'dcPlanEntity',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'dcPlanEntity'
          // },
          // {
          //   title: 'dfsSubclientProp',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'dfsSubclientProp'
          // },
          // {
          //   title: 'fsSubClientProp',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'fsSubClientProp'
          // },
          // {
          //   title: 'hcSubclientProp',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'hcSubclientProp'
          // },
          // {
          //   title: 'impersonateUser',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'impersonateUser'
          // },
          // {
          //   title: 'planEntity',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'planEntity'
          // },
          // {
          //   title: 'proxyClient',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'proxyClient'
          // },
          // {
          //   title: 'region',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'region'
          // },
          // {
          //   title: 'splunkProps',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'splunkProps'
          // },
          // {
          //   title: 'status',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'status'
          // },
          // {
          //   title: 'subClientEntity',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'subClientEntity',
          //   scopedSlots: {customRender: "subClientEntity"}
          // },
          // {
          //   title: 'useLocalArchivalRules',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'useLocalArchivalRules'
          // },
          // {
          //   title: 'useLocalContent',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'useLocalContent'
          // }
        ],
        browseColumns:[
          {
            title: '顺序',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '路径',
            width: 120,
            align: 'center',
            dataIndex: 'path',
            scopedSlots: {customRender : "path"}
          },
          {
            title: '备份时间',
            width: 120,
            align: 'center',
            dataIndex: 'backupTime'
          },
          {
            title: '应用ID',
            width: 120,
            align: 'center',
            dataIndex: 'applicationId'
          },
          // {
          //   title: 'browseResult',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'browseResult'
          // },
          // {
          //   title: 'doClientSide',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'doClientSide'
          // },
          // {
          //   title: 'respType',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'respType'
          // },
          // {
          //   title: 'session',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'session'
          // },
          // {
          //   title: 'workerId',
          //   width: 120,
          //   align: 'center',
          //   dataIndex: 'workerId'
          // },
        ],
        rmanColumns: [
          {
            title: '顺序',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '事件',
            width: 120,
            align: 'center',
            dataIndex: 'event',
            scopedSlots: { customRender: 'event' }
          },
          {
            title: '操作',
            width: 120,
            align: 'center',
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' }
          },
          {
            title: '状态',
            width: 120,
            align: 'center',
            dataIndex: 'state'
          },
          {
            title: '执行时间',
            width: 120,
            align: 'center',
            dataIndex: 'executionTime'
          },
          {
            title: '耗时(ms)',
            width: 120,
            align: 'center',
            className: 'consuming-time',
            dataIndex: 'consumingTime'
          }
        ],
        dictOptions: {},
        rmanDataSource: [
          {
            id: 1,
            pid: 1,
            event: 'XXXXXXXXXXXX',
            operation: 'XXXXXXXXXXXX',
            state: 'XX',
            executionTime: 'XXXX-XX-XX  XX:XX:XX',
            consumingTime: 'XXXX'
          },
          {
            id: 2,
            pid: 1,
            event: 'XXXXXXXXXXXX',
            operation: 'XXXXXXXXXXXX',
            state: 'XX',
            executionTime: 'XXXX-XX-XX  XX:XX:XX',
            consumingTime: 'XXXX'
          }
        ],
        url: {
          dataList: '/cvJobDetail/dataList',
          propertiesDataSource: '/cvSubclientProperties/dataList',
          browseDataSource: '/cvSubclientBrowse/dataList',
        }

      }
    },
    created() {
      this.initDictConfig()
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      initDictConfig() {
        initDictOptions('applicationId').then((res) => {
          if (res.success) {
            this.applicationId = res.result
          }
        })
      },
      loadData(arg) {
        // if(!this.url.list){
        //   this.$message.error("请设置url.list属性!")
        //   return
        // }
        // //加载数据 若传入参数1则加载第一页的内容
        // if (arg === 1) {
        //   this.ipagination.current = 1;
        // }
        // var params = this.getQueryParams();//查询条件
        // this.loading = true;
        // getAction(this.url.list, params).then((res) => {
        //   if (res.success) {
        //     this.dataSource = res.result.records;
        //     this.ipagination.total = res.result.total;
        //   }
        //   if(res.code===510){
        //     this.$message.warning(res.message)
        //   }
        //   this.loading = false;
        // })
      },
      showDetail(record) {
        let params = {}
        params.domain = record.domain
        params.jobId = record.workId
        getAction(this.url.dataList, params).then((res) => {
          if (res.success) {
            let records = res.result.records
            if (records.length > 0) {
              let result = records[0]
              let dataSource = JSON.parse(result.jobInfo)
              this.dataSource = dataSource.jobs[0].jobSummary
              this.dataSource.jobElapsedTime = this.formatTime(this.dataSource.jobElapsedTime)
              this.subclient = this.dataSource.subclient
              console.log("dataSource",dataSource)

              let subclientIds = dataSource.jobs[0].jobSummary.subclient.subclientId
              this.loadPropertiesDataSource(subclientIds)
              this.loadBrowseDataSource(subclientIds)
            } else {
              this.dataSource = {}
            }
            this.visible = true
          } else {
            this.$message.warning(res.message)
          }
        })
      },
      loadPropertiesDataSource(subclientIds){
        getAction(this.url.propertiesDataSource,{subclientIds:subclientIds}).then((res)=>{
          if(res.success){
            let record = res.result.records
            this.propertiesDataSource = record
            console.log("propertiesDataSource",this.propertiesDataSource)
          }
        })
      },
      loadBrowseDataSource(subclientIds){
        getAction(this.url.browseDataSource,{subclientIds:subclientIds}).then((res)=>{
          if(res.success){
            let record = res.result.records
            for(let item of record){
              try {
                console.log('loadBrowseDataSource',Object.values(item, 'path'))
                item.path = item.browseResult.dataResultSet.path
                let applicationId = item.browseResult.dataResultSet.advancedData.subclient.applicationId
                let backupTime = item.browseResult.dataResultSet.advancedData.backupTime
                item.applicationId = this.getApplicationIdDictName(applicationId?applicationId:"")
                item.backupTime = this.getRealTime(backupTime?backupTime:0)
              }catch (e) {
                console.log(e)
              }
            }
            this.browseDataSource = record
            console.log("browseDataSource",this.browseDataSource)
          }
        })
      },
      handleTabsChange(key){
        this.currentTab = key
      },
      handleOk() {
        this.handleCancel()
      },
      handleCancel() {
        this.dataSource = {}
        this.subclient = {}
        this.visible = false
      },
      getApplicationIdDictName(applicationId) {
        let result = this.applicationId.find((item) => {
          item.value = applicationId
        })
        return result ? result : applicationId
      },
      getRealTime(time) {
        let date = new Date('1970-01-01')
        let realTime = dayjs(date).add(time * 1, 'second').format('YYYY-MM-DD HH:mm:ss')
        return realTime
      },
      syntaxHighlight(json) {
        // 带锁进格式化JSON
        if (typeof json != 'string') {
          json = JSON.stringify(json, undefined, 2);
        }
        // 给JSON字符串增加展示样式
        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
          var cls = 'number';
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'key';
            } else {
              cls = 'string';
            }
          } else if (/true|false/.test(match)) {
            cls = 'boolean';
          } else if (/null/.test(match)) {
            cls = 'null';
          }
          return '<span class="' + cls + '">' + match + '</span>';
        });
      },
      formatTime(time) {
        let hours = Math.floor((time) / 3600000); //时
        let minutes = Math.floor((time % 3600000) / 60000); //分
        let seconds = Math.floor((time % 60000) / 1000); //秒
        return  `${hours>10?hours:`0${hours}`}:${minutes>10?minutes:`0${minutes}`}:${seconds>10?seconds:`0${seconds}`}`;
      }

    }
  }
</script>
<style scoped>
  .table-title {
    font-size: 20px;
    font-weight: bold;
    background-color: rgba(141, 141, 141, 0.45);
    border-radius: 3px;
  }

  th.consuming-time,
  td.consuming-time {
    text-align: right !important;
  }
</style>