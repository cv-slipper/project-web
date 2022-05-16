<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <div v-if="toggleSearchStatus">
        <!-- 页签 -->
        <a-row :gutter="24">
          <!--          <span class="tag-title">严重性：</span>-->
          <a-radio-group default-value="work" button-style="solid" v-model="viewLabel" @change="onViewLabelChange">
            <a-radio-button value="work">
              作业
            </a-radio-button>
            <a-radio-button value="event">
              事件
            </a-radio-button>
            <a-radio-button value="resources">
              备份资源
            </a-radio-button>
            <a-radio-button value="client">
              客户端
            </a-radio-button>
          </a-radio-group>
        </a-row>
        <hr class="split-line" />
        <!-- 操作系统 -->
        <a-row :gutter="24" v-show="label=='事件'">
          <span class="tag-title">严重性：</span>
          <template v-for="(item, index) in dictSeriousness">
            <a-checkable-tag
              :key="index"
              :checked="seriousnessList.indexOf(item.value)>-1"
              @change="checked => handleTagChange('seriousness', item.value, checked)"
              class="tag"
            >
              {{ item.text }}
            </a-checkable-tag>
          </template>
        </a-row>
        <hr class="split-line" v-show="label=='事件'"/>
        <!-- 备份域 -->
        <a-row :gutter="24">
          <span class="tag-title">备份域：</span>
          <template v-for="(item, index) in dictDomainList">
            <a-checkable-tag
              :key="index"
              :checked="domainList.indexOf(item.value) > -1"
              @change="checked => handleTagChange('domain', item.value, checked)"
              class="tag"
            >
              {{ item.text }}
            </a-checkable-tag>
          </template>
        </a-row>
        <hr class="split-line"/>
      </div>
      <br/>
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="关键字">
              <a-input placeholder="请输入关键字" v-model="keyWord"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <!--              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>-->
              <a-button type="primary" @click="filterDataSource" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
              <!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
              <!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
              <!--              </a>-->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 指标卡区域-begin -->
    <div class="space">
      <a-row :gutter="24">
        <a-col
          :xs="0"
          :sm="0"
          :md="0"
          :lg="0"
          :xl="0"
          :xxl="1">

        </a-col>
        <template v-for="item in dataCard" >
          <a-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="8"
            :xl="8"
            :xxl="3"
            @click="handleCardClick(item.text)"
            v-show="item.group === viewLabel">
            <a>
              <a-col span="7">
                <a-icon :type="item.icon" theme="twoTone" :two-tone-color="label == item.text?item.color:'Gainsboro'" style="font-size: 50px"/>
              </a-col>
            </a>
            <a-col span="16">
              <a-row>
                <span style="font-size: 20px">{{ item.num }}</span>
              </a-row>
              <a-row>
                <span style="font-size: 10px">{{ item.text }}</span>
              </a-row>
            </a-col>
          </a-col>

        </template>
      </a-row>
    </div>
    <!-- 指标卡区域-end -->
    <br/>
    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;" v-if="label!='作业量'">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>
        已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
        <a-popconfirm placement="topLeft" ok-text="确认" cancel-text="取消" @confirm="confirmHandle" style="width: 300rem">
          <a-icon slot="icon" type="question-circle-o" style="color: red" />
          <template slot="title">
            <a-form layout="vertical" style="width: 30rem;height: 8rem">
              <a-form-item label="处理原因:">
                <a-textarea placeholder="请输入处理原因" v-model="handleReason" :rows="4" :auto-size="{minRows:4,maxRows:4}"></a-textarea>
              </a-form-item>
            </a-form>
          </template>
          <a style="margin-left: 24px" v-if="selectedRowKeys.length > 0">处理</a>
        </a-popconfirm>

      </div>
      <!-- 失败或异常列表-begin -->
      <div class="card-container" v-if="label=='失败'||label=='异常'">
        <a-tabs type="card" ref="workTabs" :default-active-key="workTabs" @change="workTabsChange">
          <a-tab-pane tab="全部" key="allWork" forceRender>
            <a-table
              ref="table"
              size="middle"
              bordered
              rowKey="id"
              class="j-table-force-nowrap"
              :scroll="{x:'max-content'}"
              :columns="backupColumns"
              :dataSource="allWorkDataSource"
              :pagination="allWorkIpagination"
              :loading="allWorkLoading"
              :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
              @change="handleTableChange1">
              <template slot="endTime" slot-scope="text">
                <span>{{ text=='1970-01-01 00:00:00'?'':text }}</span>
              </template>
              <template slot="duration" slot-scope="text">
                <span>{{ formatTime(text) }}</span>
              </template>
              <template slot="programSize" slot-scope="text">
                <span>{{ `${(text/1024/1024).toFixed(2)}G` }}</span>
              </template>
              <span slot="action" slot-scope="text, record">
                <a @click="showDetail(record)">详情</a>
                <!--                <a-divider type="vertical"/>-->
              </span>

            </a-table>
          </a-tab-pane>
          <a-tab-pane tab="备份作业" key="storage" forceRender>
            <a-table
              ref="table"
              size="middle"
              bordered
              rowKey="id"
              class="j-table-force-nowrap"
              :scroll="{x:'max-content'}"
              :columns="backupColumns"
              :dataSource="backupDataSource"
              :pagination="backupIpagination"
              :loading="backupLoading"
              :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
              @change="handleTableChange2">

              <template slot="endTime" slot-scope="text">
                <span>{{ text=='1970-01-01 00:00:00'?'':text }}</span>
              </template>
              <template slot="duration" slot-scope="text">
                <span>{{ formatTime(text) }}</span>
              </template>
              <template slot="programSize" slot-scope="text">
                <span>{{ `${(text/1024/1024).toFixed(2)}G` }}</span>
              </template>
              <span slot="action" slot-scope="text, record">
                <a @click="showDetail(record)">详情</a>
                <!--                <a-divider type="vertical"/>-->
              </span>

            </a-table>
          </a-tab-pane>
          <a-tab-pane tab="恢复作业" key="recovery" forceRender>
            <a-table
              ref="table"
              size="middle"
              bordered
              rowKey="id"
              class="j-table-force-nowrap"
              :scroll="{x:'max-content'}"
              :columns="backupColumns"
              :dataSource="recoverDataSource"
              :pagination="recoverIpagination"
              :loading="recoverLoading"
              :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
              @change="handleTableChange3">

              <template slot="endTime" slot-scope="text">
                <span>{{ text=='1970-01-01 00:00:00'?'':text }}</span>
              </template>
              <template slot="duration" slot-scope="text">
                <span>{{ formatTime(text) }}</span>
              </template>
              <template slot="programSize" slot-scope="text">
                <span>{{ `${(text/1024/1024).toFixed(2)}G` }}</span>
              </template>
              <span slot="action" slot-scope="text, record">
                <a @click="showDetail(record)">详情</a>
                <!--                <a-divider type="vertical"/>-->
              </span>

            </a-table>
          </a-tab-pane>
          <a-tab-pane tab="管理作业" key="manage" forceRender>
            <a-table
              ref="table"
              size="middle"
              bordered
              rowKey="id"
              class="j-table-force-nowrap"
              :scroll="{x:'max-content'}"
              :columns="backupColumns"
              :dataSource="manageDataSource"
              :pagination="manageIpagination"
              :loading="manageLoading"
              :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
              @change="handleTableChange4">

              <template slot="endTime" slot-scope="text">
                <span>{{ text=='1970-01-01 00:00:00'?'':text }}</span>
              </template>
              <template slot="duration" slot-scope="text">
                <span>{{ formatTime(text) }}</span>
              </template>
              <template slot="programSize" slot-scope="text">
                <span>{{ `${(text/1024/1024).toFixed(2)}G` }}</span>
              </template>
              <span slot="action" slot-scope="text, record">
                <a @click="showDetail(record)">详情</a>
                <!--                <a-divider type="vertical"/>-->
              </span>

            </a-table>
          </a-tab-pane>
        </a-tabs>
      </div>
      <!-- 失败或异常列表-end -->

      <!-- 事件列表-begin -->
      <a-table
        v-if="label=='事件'"
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        class="j-table-force-nowrap"
        :columns="eventColumns"
        :dataSource="eventDataSource"
        :pagination="eventIpagination"
        :loading="eventLoading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange5">

        <span slot="descriptionSlot" slot-scope="text">
          <j-ellipsis :value="text" :length="50"/>
        </span>

        <span slot="action" slot-scope="text, record">
          <!--          <a @click="showDetail(record)">详情</a>-->
          <!--          <a-divider type="vertical"/>-->
        </span>
      </a-table>
      <!-- 事件列表-begin -->

      <!-- 备份资源不足列表-begin -->
      <a-table
        v-if="label=='备份资源不足'"
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        class="j-table-force-nowrap"
        :columns="shortageColumns"
        :dataSource="shortageDataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="showDetail(record)">详情</a>
          <!--          <a-divider type="vertical"/>-->
        </span>
      </a-table>
      <!-- 备份资源不足列表-begin -->

      <!-- 备份资源脱机列表-begin -->
      <div class="card-container" v-if="label=='备份资源脱机'">
        <a-tabs type="card" :default-active-key="resourceTags" @change="resourceTagsChange">
          <a-tab-pane tab="库" key="driver" forceRender>
            <a-table
              ref="table"
              size="middle"
              bordered
              rowKey="id"
              class="j-table-force-nowrap"
              :columns="libraryColumns"
              :dataSource="libraryDataSource"
              :pagination="ipagination"
              :loading="loading"
              :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
              @change="handleTableChange">

              <span slot="action" slot-scope="text, record">
                <!--                <a @click="showDetail(record)">详情</a>-->
                <!--                <a-divider type="vertical"/>-->
              </span>
            </a-table>
          </a-tab-pane>

          <a-tab-pane tab="MediaAgent" key="mediaAgent" forceRender>
            <a-table
              ref="table"
              size="middle"
              bordered
              rowKey="id"
              class="j-table-force-nowrap"
              :columns="mediaAgentColumns"
              :dataSource="mediaAgentDataSource"
              :pagination="ipagination"
              :loading="loading"
              :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
              @change="handleTableChange">

              <span slot="action" slot-scope="text, record">
                <!--                <a @click="showDetail(record)">详情</a>-->
                <!--                <a-divider type="vertical"/>-->
              </span>

            </a-table>

          </a-tab-pane>
        </a-tabs>
      </div>
      <!-- 备份资源脱机列表-end -->

      <!-- 许可容量超85%-begin -->

      <!-- 许可容量超85%-end -->
      <a-table
        v-if="label=='客户端脱机'"
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        class="j-table-force-nowrap"
        :columns="clientColumns"
        :dataSource="clientOfflineDataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="showDetail(record)">详情</a>
          <!--          <a-divider type="vertical"/>-->
        </span>
      </a-table>
      <!-- 客户端脱机列表-begin -->
      <a-table
        v-if="label=='许可容量超85%'"
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        class="j-table-force-nowrap"
        :columns="ermittedCapacityColumns"
        :dataSource="ermittedCapacityDataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a @click="showDetail(record)">详情</a>
          <!--          <a-divider type="vertical"/>-->
        </span>
      </a-table>
      <!-- 客户端脱机列表-begin -->
    </div>
    <!-- table区域-end -->
    <!-- 详情 -->
    <detail-modal ref="detail"/>
  </a-card>
</template>


<script>
  import {
    dictSeriousness,
    backupColumns,
    eventColumns,
    shortageColumns,
    libraryColumns,
    driverColumns,
    mediaAgentColumns,
    clientColumns,
    ermittedCapacityColumns,
    dataCard
  } from './CurrentException'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import { initDictOptions } from '@/components/dict/JDictSelectUtil'
  import DetailModal from './modules/DetailModal'
  import '@/assets/less/TableExpand.less'
  import { getAction } from '@/api/manage'
  import { httpAction } from '@/api/manage'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import {dateFormat} from '@/utils/util'
  import dayjs from 'dayjs'

  export default {
    name: 'CurrentException',
    mixins: [JeecgListMixin],
    components: {
      JEllipsis,
      JDictSelectTag,
      DetailModal
    },
    data() {
      return {
        description: '客户信息管理页面',
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        routerParam:this.$route.query,
        // 预览页签
        viewLabel: 'work',
        dictOptions: {},
        // loading
        allWorkLoading: false,
        backupLoading: false,
        recoverLoading: false,
        manageLoading: false,
        eventLoading: false,
        // 严重性字典
        dictSeriousness: [],
        // 严重性列表
        seriousnessList:['Critical'],
        // 备份域字典
        dictDomainList:[],
        // 备份域列表
        domainList:[],
        // 搜索卡展示
        toggleSearchStatus: true,
        // 展开的行
        expandedRowKeys: [],
        // 存储作业列
        backupColumns:backupColumns,
        // 备份作业数据
        backupDataSource:[],
        // 全部作业
        allWorkDataSource:[],
        // 恢复作业数据
        recoverDataSource:[],
        // 管理作业数据
        manageDataSource:[],
        // 事件数据列
        eventColumns:eventColumns,
        // 事件数据
        eventDataSource: [],
        // 备份资源不足列
        shortageColumns:shortageColumns,
        // 备份资源不足数据
        shortageDataSource:[],
        // 备份资源脱机列
        libraryColumns:libraryColumns,
        driverColumns:driverColumns,
        mediaAgentColumns:mediaAgentColumns,
        // 客户端脱机列
        clientColumns:clientColumns,
        clientOfflineDataSource:[],
        // 备份资源不足列
        ermittedCapacityColumns:ermittedCapacityColumns,
        ermittedCapacityDataSource: [],
        // 备份资源脱机数据
        libraryDataSource:[],
        // driverDataSource:[],
        mediaAgentDataSource:[],
        // 指标卡
        dataCard:dataCard,
        // 指标
        label:'异常',
        // 分页参数
        ipagination:{
          current: 1,
          pageSize: 10,
        },
        allWorkIpagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          }
        },
        backupIpagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          }
        },
        recoverIpagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          }
        },
        manageIpagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          }
        },
        eventIpagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          }
        },
        workTabs:'allWork',
        resourceTags:'driver',
        keyWord:"",
        handleReason:"",
        url:{
          getWorkNum:'/job/getWorkNum',
          backupDataSource:'/job/list?column=startTime&order=desc',
          handleWork:'/job/handled',
          eventDataSource:'/Event/list?column=time&order=desc',
          handleEvent:'/Event/handled',
          shortageDataSource:'/cvResourceShortage/dataList',
          handleShortage:'/cvResourceShortage/handled',
          libraryDataSource:'/cvOfflineLibrary/dataList',
          handleLibrary:'/cvOfflineLibrary/handled',
          mediaAgentDataSource:'/cvMediaAgent/dataList',
          ermittedCapacityDataSource:"/cvErmittedCapacity/dataList",
          handleErmittedCapacity:"/cvErmittedCapacity/handled",
          handleMediaAgent:'/cvMediaAgent/handled',
          clientOfflineDataSource:'/cvClientOffline/dataList',
          handleClientOffline:'/cvClientOffline/dataList',
          addProcess:'/processhistory/handle',
        }
      }
    },
    created() {
      if(this.routerParam.label && this.routerParam.viewLabel){
        this.label = this.routerParam.label
        this.viewLabel = this.routerParam.viewLabel
      }
      this.loadData()
      console.log(this.routerParam.label)
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    watch:{
      routerParam:{
        handler(newVal,oldVal){
          // console.log("newVal",newVal)
        },
        deep:true
      }
    },
    methods: {
      initDictConfig() {
        // 备份域
        initDictOptions('domain').then((res) => {
          if (res.success) {
            this.dictDomainList = res.result
          }
        })
        initDictOptions('seriousness').then((res) => {
          if (res.success) {
            this.dictSeriousness = res.result
          }
        })
      },
      getWorkParams(type="",state=this.label == '失败'?'Failed':'Completed w/ one or more errors'){
        let params = this.domainList.length===1?{domain:this.domainList[0]}:{}
        params.handled = 0
        if(type == '全部'){
          params.type = ''
        }else if(type == '管理作业'){
          params.jobType = type
        } else {
          params.type = type
        }
        if(state === 'Completed w/ one or more errors'){
          params.jobState = 'exception'
        }else {
          params.state = state
        }
        params.client = this.keyWord
        // 过去24小时筛选条件
        // let startTime_begin, startTime_end = new Date;
        // startTime_begin = dayjs(startTime_begin).subtract(24,'hour').format('YYYY-MM-DD HH:mm:ss')
        // startTime_end = dayjs(startTime_end).format('YYYY-MM-DD HH:mm:ss')
        // params.startTime_begin = startTime_begin
        // params.startTime_end = startTime_end
        return params
      },
      // 加载全部作业
      loadAllWorkDataSource(){
        this.allWorkLoading = true
        let params = this.getWorkParams(undefined)
        params.pageNo = this.allWorkIpagination.current
        params.pageSize = this.allWorkIpagination.pageSize
        getAction(this.url.backupDataSource,params).then((res)=>{
          if(res.success){
            this.allWorkDataSource = res.result.records
            this.allWorkIpagination.total = res.result.total
          }
        }).finally(()=>{
          this.allWorkLoading = false
        })
      },
      // 加载备份作业
      loadBackupDataSource(){
        this.backupLoading = true
        let params = this.getWorkParams('Backup')
        params.pageNo = this.backupIpagination.current
        params.pageSize = this.backupIpagination.pageSize
        getAction(this.url.backupDataSource,params).then((res)=>{
          if(res.success){
            this.backupDataSource = res.result.records
            this.backupIpagination.total = res.result.total
          }
        }).finally(()=>{
          this.backupLoading = false
        })
      },
      // 加载恢复作业
      loadRecoverDataSource(){
        this.recoverLoading = true
        let params = this.getWorkParams('RECOVERY')
        params.pageNo = this.recoverIpagination.current
        params.pageSize = this.recoverIpagination.pageSize
        getAction(this.url.backupDataSource,params).then((res)=>{
          if(res.success){
            this.recoverDataSource = res.result.records
            this.recoverIpagination.total = res.result.total
          }
        }).finally(()=>{
          this.recoverLoading = false
        })
      },
      // 加载管理作业
      loadManageDataSource(){
        this.manageLoading = true
        let params = this.getWorkParams('管理作业')
        params.pageNo = this.manageIpagination.current
        params.pageSize = this.manageIpagination.pageSize
        getAction(this.url.backupDataSource,params).then((res)=>{
          if(res.success){
            this.manageDataSource = res.result.records
            this.manageIpagination.total = res.result.total
          }
        }).finally(()=>{
          this.manageLoading = false
        })
      },
      // 加载事件
      loadEventDataSource(){
        this.eventLoading = true
        let params = this.domainList.length===1?{domain:this.domainList[0]}:{}
        params.handled = 0
        params.clientEntity = this.keyWord
        if(this.seriousnessList.length>0){
          params.seriousnessList = this.seriousnessList.join(',')
        }
        params.pageNo = this.eventIpagination.current
        params.pageSize = this.eventIpagination.pageSize
        // 过去24小时筛选条件
        // let time_begin, time_end = new Date;
        // time_begin = dayjs(time_begin).subtract(24,'hour').format('YYYY-MM-DD HH:mm:ss')
        // time_end = dayjs(time_end).format('YYYY-MM-DD HH:mm:ss')
        // params.time_begin = time_begin
        // params.time_end = time_end
        getAction(this.url.eventDataSource,params).then((res)=>{
          if(res.success){
            this.eventDataSource = res.result.records
            this.eventIpagination.total = res.result.total
            this.dataCard[3].num = res.result.total
          }
        }).finally(()=>{
          this.eventLoading = false
        })
      },
      // 加载备份资源不足
      loadShortageDataSource(){
        let params = {handled:0}
        let nowDay = new Date();
        // let yesterday = dayjs(nowDay).subtract(1,"day").format("YYYY-MM-DD")
        // params.triggerTime_start = yesterday
        getAction(this.url.shortageDataSource,params).then((res)=>{
          if(res.success){
            let dataSource = res.result.records
            this.shortageDataSource = dataSource.filter(d => (this.domainList.length>0?this.domainList.includes(d.domain):true))
            this.dataCard[4].num = this.shortageDataSource.length
          }
        })
      },
      // TODO 判断脱机状态
      // 加载脱机数据
      loadOfflineDataSource(){
        let libraryParams = {handled:0}
        libraryParams.library = this.keyWord
        libraryParams.libraryState = "Offline"
        let nowDay = new Date();
        let yesterday = dayjs(nowDay).subtract(1,"day").format("YYYY-MM-DD")
        libraryParams.triggerTime_start = yesterday
        // 库脱机
        getAction(this.url.libraryDataSource,libraryParams).then((res)=>{
          if(res.success){
            let dataSource = res.result.records
            this.libraryDataSource = dataSource.filter(d => (this.domainList.length>0?this.domainList.includes(d.domain):true))
            if(this.resourceTags=='driver'){
              this.dataCard[5].num = this.libraryDataSource.length
            }
          }
        })
        // MA脱机
        getAction(this.url.mediaAgentDataSource,{handled:0,mediaAgent:this.keyWord,readyState:"Disabled"}).then((res)=>{
          if(res.success){
            let dataSource = res.result.records
            this.mediaAgentDataSource = dataSource.filter(d => (this.domainList.length>0?this.domainList.includes(d.domain):true))
            if(this.resourceTags=='mediaAgent'){
              this.dataCard[5].num = this.mediaAgentDataSource.length
            }
          }
        })
      },
      // 许可容量超85%
      loadErmittedCapacity(){
        getAction(this.url.ermittedCapacityDataSource,{}).then((res)=>{
          if(res.success){
            let records = res.result.records.filter(item => item.proportion>=0)
            this.dataCard[6].num = records.length
            this.ermittedCapacityDataSource = records
          }
        })
      },
      // 加载客户端脱机
      loadClientOfflineDataSource(){
        let params = this.domainList.length===1?{domain:this.domainList[0]}:{}
        params.handle = 0
        params.client = this.keyWord
        getAction(this.url.clientOfflineDataSource,params).then((res)=>{
          if(res.success){
            this.clientOfflineDataSource = res.result.records
            this.dataCard[7].num = this.clientOfflineDataSource.length
          }
        })
      },
      // 加载指标卡数据
      loadDataCard(){
        // 作业量
        getAction(this.url.getWorkNum,this.getWorkParams(undefined,'')).then((res)=>{
          if(res.success){
            this.dataCard[0].num = res.result
          }
        })
        // 失败
        let failParam = this.getWorkParams(this.getWorkTabsName(),'Failed')
        getAction(this.url.getWorkNum,failParam).then((res)=>{
          if(res.success){
            this.dataCard[1].num = res.result
          }
        })
        // 异常
        let exceptionParam = this.getWorkParams(this.getWorkTabsName(),'Completed w/ one or more errors')
        getAction(this.url.getWorkNum,exceptionParam).then((res)=>{
          if(res.success){
            this.dataCard[2].num = res.result
          }
        })

      },
      loadData(arg) {
        // 加载全部作业
        this.loadAllWorkDataSource()
        // 加载备份作业
        this.loadBackupDataSource()
        // 加载恢复作业
        this.loadRecoverDataSource()
        // 加载管理作业
        this.loadManageDataSource()
        // 加载事件
        this.loadEventDataSource()
        // 加载备份资源不足
        this.loadShortageDataSource()
        // 加载脱机数据
        this.loadOfflineDataSource()
        // 加载许可容量超85%
        this.loadErmittedCapacity()
        // 加载客户端脱机
        this.loadClientOfflineDataSource()
        // 加载指标卡数据
        this.loadDataCard()
      },
      changeTagList(value,checked,list){
        return checked?[...list,value]:list.filter(d => d !== value )
      },
      // 筛选条件变更（备份域、严重性）
      handleTagChange(dimension, value, checked) {
        switch (dimension) {
          case "seriousness":
            this.seriousnessList = this.changeTagList(value, checked, this.seriousnessList)
            this.eventIpagination.current = 1
            this.eventIpagination.pageSize = 10
            this.filterDataSource()
            break
          case "domain":
            this.domainList = this.changeTagList(value, checked, this.domainList)
            this.filterDataSource()
            break
        }
      },
      // 执行筛选
      filterDataSource(){
        this.loadData()
      },
      handleExpand(expanded, record) {
        this.expandedRowKeys = []
        if (expanded === true) {
          this.expandedRowKeys.push(record.id)
        }
      },
      // 展示详情
      showDetail(record){
        this.$refs.detail.showDetail(record)
      },
      // 查询条件重置
      searchReset(){
        this.seriousnessList = ['Critical']
        this.domainList = []
        this.keyWord = ''
        this.filterDataSource()
      },
      // 处理方法
      async handleClick(){
        let that = this
        let currentAddress = '当前异常/'
        let content = ""
        let ids = this.selectedRowKeys.join(",")
        switch (this.label){
          case '失败':
            currentAddress = currentAddress + '作业/' + this.label + '/'
            for(let item of this.selectionRows){
              if(content == ""){
                content = "处理作业：" + item.domain + '-' + item.workId
              }else {
                content = content + "|" + item.domain + '-' + item.workId
              }
            }
            content = currentAddress + this.getWorkTabsName()+'------' + content
            await getAction(this.url.handleWork,{ids:ids}).then((res)=>{
              // console.log(res.success)
              if(res.success){
                switch (this.workTabs) {
                  case 'storage':
                    this.loadBackupDataSource()
                    break
                  case 'recovery':
                    this.loadRecoverDataSource()
                    break
                  case 'manage':
                    this.loadManageDataSource()
                    break
                  case 'allWork':
                    this.loadAllWorkDataSource()
                    break
                }
                this.onClearSelected()
                this.loadDataCard()
                this.createHandleRecord(content)
              }else {
                this.$message.warning(res.message)
                return
              }
            })
            break
          case '异常':
            currentAddress = currentAddress + '作业/' + this.label + '/'
            for(let item of this.selectionRows){
              if(content == ""){
                content = "处理作业：" + item.domain + '-' + item.workId
              }else {
                content = content + "|" + item.domain + '-' + item.workId
              }
            }
            content = currentAddress + this.getWorkTabsName()+'------' + content
            await getAction(this.url.handleWork,{ids:ids}).then((res)=>{
              if(res.success){
                switch (this.workTabs) {
                  case 'storage':
                    this.loadBackupDataSource()
                    break
                  case 'recovery':
                    this.loadRecoverDataSource()
                    break
                  case 'manage':
                    this.loadManageDataSource()
                    break
                  case 'allWork':
                    this.loadAllWorkDataSource()
                    break
                }
                this.onClearSelected()
                this.loadDataCard()
                this.createHandleRecord(content)
              }else {
                this.$message.warning(res.message)
                return
              }
            })
            break
          case '事件':
            currentAddress = currentAddress + this.label
            for(let item of this.selectionRows){
              if(content == ""){
                content = "处理事件：" + item.domain + '-' + item.eventId
              }else {
                content = content + "|" + item.domain + '-' + item.eventId
              }
            }
            content = currentAddress + '------' + content

            await getAction(this.url.handleEvent,{ids:ids}).then((res)=>{
              if(res.success){
                this.loadEventDataSource()
                this.onClearSelected()
                this.loadDataCard()
                this.createHandleRecord(content)
              }else {
                this.$message.warning(res.message)
                return
              }
            })
            break
          case '备份资源不足':
            currentAddress = currentAddress + '备份资源/' + this.label
            for(let item of this.selectionRows){
              if(content == ""){
                content = "处理备份资源：" + item.domain + '-' + item.library
              }else {
                content = content + "|" + item.domain + '-' + item.library
              }
            }
            content = currentAddress + '------' + content
            await getAction(this.url.handleShortage,{ids:ids}).then((res)=>{
              if(res.success){
                this.loadShortageDataSource()
                this.onClearSelected()
                this.loadDataCard()
                this.createHandleRecord(content)
              }else {
                this.$message.warning(res.message)
                return
              }
            })
            break
          case '备份资源脱机':
            currentAddress = currentAddress + '备份资源/' + this.label
            let url = ''
            if(this.resourceTags == 'driver'){
              url = this.url.handleLibrary
              for(let item of this.selectionRows){
                if(content == ""){
                  content = "处理备份资源：" + item.domain + '-' + (item.library?item.library:item.driver)
                }else {
                  content = content + "|" + item.domain + '-' + (item.library?item.library:item.driver)
                }
              }
            }else if(this.resourceTags == 'mediaAgent'){
              url = this.url.handleMediaAgent
              for(let item of this.selectionRows){
                if(content == ""){
                  content = "处理备份资源：" + item.domain + '-' + item.mediaAgent
                }else {
                  content = content + "|" + item.domain + '-' + item.mediaAgent
                }
              }
            }
            content = currentAddress + '/' + this.getResourceTagsName() + '------' + content
            await getAction(url,{ids:ids}).then((res)=>{
              if(res.success){
                this.loadOfflineDataSource()
                this.onClearSelected()
                this.loadDataCard()
                this.createHandleRecord(content)
              }else {
                this.$message.warning(res.message)
                return
              }
            })
            break
          case "许可容量超85%":
            currentAddress = currentAddress + '备份资源/' + this.label
            for(let item of this.selectionRows){
              if(content == ""){
                content = "处理许可容量超85%：" + item.domain + '-' + item.licenseName
              }else {
                content = content + "|" + item.domain + '-' + item.licenseName
              }
            }
            content = currentAddress + '------' + content
            await getAction(this.url.handleErmittedCapacity,{ids:ids}).then((res)=>{
              if(res.success){
                this.loadErmittedCapacity()
                this.onClearSelected()
                this.createHandleRecord(content)
              }
            })
          case "客户端脱机":
            currentAddress = currentAddress + '客户端/' + this.label
            for(let item of this.selectionRows){
              if(content == ""){
                content = "处理客户端脱机：" + item.domain + '-' + item.client
              }else {
                content = content + "|" + item.domain + '-' + item.client
              }
            }
            content = currentAddress + '------' + content
            await getAction(this.url.handleClientOffline,{ids:ids}).then((res)=>{
              if(res.success){
                this.loadClientOfflineDataSource()
                this.onClearSelected()
                this.createHandleRecord(content)
              }
            })
          default:
            return
        }
      },
      // 写入到记录
      createHandleRecord(content){
        let that = this
        httpAction(this.url.addProcess,{content:content,reason:this.handleReason},'post').then((res)=>{
          if(res.success){
            that.$message.success(res.message);
            that.$emit('ok');
            that.handleReason = ""
          }else{
            that.$message.warning(res.message);
          }
        })
      },
      // 指标卡切换
      handleCardClick(label){
        this.label = label
        // console.log("label", label)
        this.onClearSelected()
        this.filterDataSource()
      },
      // 顶部展示类型切换
      onViewLabelChange(){
        this.onClearSelected()
        switch (this.viewLabel) {
          case 'work':
            this.label = '异常'
            this.filterDataSource()
            break
          case 'event':
            this.label = '事件'
            this.filterDataSource()
            break
          case 'resources':
            this.label = '备份资源不足'
            this.filterDataSource()
            break
          case 'client':
            this.label = '客户端脱机'
            this.filterDataSource()
            break
        }
      },
      // 作业tab切换
      workTabsChange(val){
        this.workTabs = val
        this.onClearSelected()
        this.loadDataCard()
      },
      // 资源脱机tab切换
      resourceTagsChange(val){
        this.resourceTags = val
        this.onClearSelected()
        this.loadOfflineDataSource()
      },
      // 获取当前作业tab名称
      getWorkTabsName(){
        let content = ''
        switch (this.workTabs) {
          case 'storage':
            content = 'Backup'
            break
          case 'recovery':
            content = 'RECOVERY'
            break
          case 'manage':
            content = '管理作业'
            break
          case 'allWork':
            content = '全部'
            break
        }
        return content
      },
      // 获取当前资源脱机tab名称
      getResourceTagsName(){
        let content = ''
        switch (this.resourceTags) {
          case 'driver':
            content = '库'
            break
          case 'mediaAgent':
            content = 'MediaAgent'
            break
        }
        return content
      },
      confirmHandle(){
        this.handleClick()
        // this.$message.warning("你确认处理了")
      },
      handleTableChange1(pagination, filters, sorter){
        this.allWorkIpagination = pagination
        this.loadAllWorkDataSource()
      },
      handleTableChange2(pagination, filters, sorter){
        this.backupIpagination = pagination
        this.loadBackupDataSource()
      },
      handleTableChange3(pagination, filters, sorter){
        this.recoverIpagination = pagination
        this.loadRecoverDataSource()
      },
      handleTableChange4(pagination, filters, sorter){
        this.manageIpagination = pagination
        this.loadManageDataSource()
      },
      handleTableChange5(pagination, filters, sorter){
        this.eventIpagination = pagination
        this.loadEventDataSource()
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
  .space {
    font-size: 15px;
    font-family: Consolas;
    border: 2px solid #e9e9e9;
    padding: 8px;
  }
  .tag {
    font-size: 15px;
  }
  .tag-title {
    margin-left: 10px;
    white-space: pre;
    font-weight: bold;
  }
  .tag-line{
    padding: 0px;
  }
  .split-line {
    height: 1px;
    border: none;
    border-top: 1px solid #e9e9e9;
  }
  .card-container {
    background: #f5f5f5;
    overflow: hidden;
    padding: 24px;
  }
  .card-container > .ant-tabs-card > .ant-tabs-content {
    height: 120px;
    margin-top: -16px;
  }
  .card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
    background: #fff;
    padding: 16px;
  }
  .card-container > .ant-tabs-card > .ant-tabs-bar {
    border-color: #fff;
  }
  .card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
    border-color: transparent;
    background: transparent;
  }
  .card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
    border-color: #fff;
    background: #fff;
  }
  .ant-tabs.ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
    background-color: #f5f5f5 !important;
  }
</style>