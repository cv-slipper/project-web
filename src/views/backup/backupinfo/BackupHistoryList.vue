<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="处理">
              <j-dict-select-tag placeholder="请选择处理" v-model="queryParam.handled" dictCode="boolean_dict"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="备份域">
              <j-dict-select-tag placeholder="请选择备份域" v-model="queryParam.domain" dictCode="domain"/>
            </a-form-item>
          </a-col>
<!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
<!--            <a-form-item label="类型">-->
<!--              <a-input placeholder="请输入类型" v-model="queryParam.type"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="作业ID">
              <a-input placeholder="请输入作业ID" v-model="queryParam.workId"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="状态">
                <a-input placeholder="请输入状态" v-model="queryParam.state"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="操作类型">
                <a-input placeholder="请输入操作类型" v-model="queryParam.operationType"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="作业类型">
                <a-input placeholder="请输入作业类型" v-model="queryParam.workType"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户端">
                <a-input placeholder="请输入客户端" v-model="queryParam.client"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="代理类型">
                <a-input placeholder="请输入代理类型" v-model="queryParam.agentType"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="实例">
                <a-input placeholder="请输入实例" v-model="queryParam.instance"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="存储策略">
                <a-input placeholder="请输入存储策略" v-model="queryParam.storageStrategy"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="10" :lg="11" :md="12" :sm="24">
              <a-form-item label="开始时间">
                <j-date :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择开始时间"
                        class="query-group-cust" v-model="queryParam.startTime_begin"></j-date>
                <span class="query-group-split-cust"></span>
                <j-date :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择结束时间"
                        class="query-group-cust" v-model="queryParam.startTime_end"></j-date>
              </a-form-item>
            </a-col>
            <a-col :xl="10" :lg="11" :md="12" :sm="24">
              <a-form-item label="结束时间">
                <j-date :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择开始时间"
                        class="query-group-cust" v-model="queryParam.endTime_begin"></j-date>
                <span class="query-group-split-cust"></span>
                <j-date :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择结束时间"
                        class="query-group-cust" v-model="queryParam.endTime_end"></j-date>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="持续">
                <a-input placeholder="请输入持续" v-model="queryParam.duration"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="应用程序大小">
                <a-input placeholder="请输入应用程序大小" v-model="queryParam.programSize"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="平均吞吐量">
                <a-input placeholder="请输入平均吞吐量" v-model="queryParam.speed"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="10" :lg="11" :md="12" :sm="24">
              <a-form-item label="保留直到">
                <j-date placeholder="请选择开始日期" class="query-group-cust" v-model="queryParam.saveUntil_begin"></j-date>
                <span class="query-group-split-cust"></span>
                <j-date placeholder="请选择结束日期" class="query-group-cust" v-model="queryParam.saveUntil_end"></j-date>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="客户端ID">
                <a-input placeholder="请输入客户端ID" v-model="queryParam.clientId"></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button type="primary" icon="download" @click="handleExportXls('当前异常备份作业')">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"-->
<!--                @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel">-->
<!--            <a-icon type="delete"/>-->
<!--            删除-->
<!--          </a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作-->
<!--          <a-icon type="down"/>-->
<!--        </a-button>-->
<!--      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :scroll="{x:'max-content'}"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        class="j-table-force-nowrap"
        @change="handleTableChange">

        <template slot="endTime" slot-scope="text">
          <span>{{text=='1970-01-01 00:00:00'?'':text}}</span>
        </template>
        <template slot="duration" slot-scope="text">
          <span>{{formatTime(text)}}</span>
        </template>
        <template slot="programSize" slot-scope="text">
          <span>{{`${(text/1024/1024).toFixed(2)}G`}}</span>
        </template>
        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="getImgView(text)" height="25px" alt=""
               style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="uploadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="showDetail(record)">详情</a>
        </span>

      </a-table>
    </div>

    <detail-modal ref="detail"/>
<!--    <backup-history-model ref="modalForm"/>-->
    <create-task-model ref="createTask"/>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import JDate from '@/components/jeecg/JDate.vue'
  import DetailModal from '../exception/modules/DetailModal'
  import BackupHistoryModel from './modules/BackupHistoryModel'
  import CreateTaskModel from './modules/CreateTaskModel'
  import { getAction } from '@/api/manage'

  export default {
    name: 'BackupCurrentExceptionWorkList',
    mixins: [JeecgListMixin, mixinDevice],
    components: {
      JDate,
      JDictSelectTag,
      DetailModal,
      BackupHistoryModel,
      CreateTaskModel
    },
    data() {
      return {
        description: '备份历史',
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '备份域',
            align: 'center',
            dataIndex: 'domain_dictText'
          },
          {
            title: '客户端',
            align: 'center',
            dataIndex: 'client'
          },
          {
            title: '类型',
            align: 'center',
            dataIndex: 'type'
          },
          {
            title: '状态',
            align: 'center',
            dataIndex: 'state'
          },
          {
            title: '作业类型',
            align: 'center',
            dataIndex: 'workType'
          },
          {
            title: '代理类型',
            align: 'center',
            dataIndex: 'agentType'
          },
          {
            title: '实例',
            align: 'center',
            dataIndex: 'instance'
          },
          {
            title: '存储策略',
            align: 'center',
            dataIndex: 'storageStrategy'
          },
          {
            title: '开始时间',
            align: 'center',
            dataIndex: 'startTime'
          },
          {
            title: '结束时间',
            align: 'center',
            dataIndex: 'endTime',
            scopedSlots: { customRender: 'endTime'}
          },
          {
            title: '持续时间',
            align: 'center',
            dataIndex: 'duration',
            scopedSlots: { customRender: 'duration' }
          },
          {
            title: '应用程序大小',
            align: 'center',
            dataIndex: 'programSize',
            scopedSlots: { customRender: 'programSize' }
          },
          {
            title: '平均吞吐量',
            align: 'center',
            dataIndex: 'speed'
          },
          {
            title: '保留直到',
            align: 'center',
            dataIndex: 'saveUntil',
            customRender: function(text) {
              return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
            }
          },
          {
            title: '作业ID',
            align: 'center',
            dataIndex: 'workId'
          },
          // {
          //   title: '处理',
          //   align: 'center',
          //   dataIndex: 'handled_dictText'
          // },
          // {
          //   title: '操作类型',
          //   align: 'center',
          //   dataIndex: 'operationType'
          // },
          // {
          //   title: 'clientId',
          //   align: 'center',
          //   dataIndex: 'clientId'
          // },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            fixed:"right",
            width: 80,
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/job/list',
          delete: '/job/delete',
          deleteBatch: '/job/deleteBatch',
          exportXlsUrl: '/job/exportXls',
          importExcelUrl: 'Jobs/importExcel'
        },
        dictOptions: {}
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      initDictConfig() {
      },
      showDetail(record){
        this.$refs.detail.showDetail(record)
      },
      loadData(arg) {
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        params.type = "Backup"
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records;
            this.ipagination.total = res.result.total;
          }
          if(res.code===510){
            this.$message.warning(res.message)
          }
          this.loading = false;
        })
      },
      handleAdd(){
        this.$refs.createTask.create()
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
  @import '~@assets/less/common.less';
</style>