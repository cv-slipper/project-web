<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="备份域">
              <a-input placeholder="请输入备份域" v-model="queryParam.domain"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="name">
              <a-input placeholder="请输入name" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="simOperatingSystemId">
                <a-input placeholder="请输入simOperatingSystemId" v-model="queryParam.simOperatingSystemId"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="net_hostname">
                <a-input placeholder="请输入net_hostname" v-model="queryParam.netHostname"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="client_password">
                <a-input placeholder="请输入client_password" v-model="queryParam.clientPassword"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="refTime">
                <a-input placeholder="请输入refTime" v-model="queryParam.reftime"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="modified">
                <a-input placeholder="请输入modified" v-model="queryParam.modified"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="offlineEntity">
                <a-input placeholder="请输入offlineEntity" v-model="queryParam.offlineentity"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="offlineTimeStamp">
                <a-input placeholder="请输入offlineTimeStamp" v-model="queryParam.offlineTimeStamp"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="csHostName">
                <a-input placeholder="请输入csHostName" v-model="queryParam.csHostName"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="clientDescription">
                <a-input placeholder="请输入clientDescription" v-model="queryParam.clientDescription"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="jobResultDir">
                <a-input placeholder="请输入jobResultDir" v-model="queryParam.jobResultDir"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="clientSkewTime">
                <a-input placeholder="请输入clientSkewTime" v-model="queryParam.clientSkewTime"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="cvdPort">
                <a-input placeholder="请输入cvdPort" v-model="queryParam.cvdPort"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="evmgrcPort">
                <a-input placeholder="请输入evmgrcPort" v-model="queryParam.evmgrcPort"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="status">
                <a-input placeholder="请输入status" v-model="queryParam.status"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="releaseId">
                <a-input placeholder="请输入releaseId" v-model="queryParam.releaseId"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="spaceCheckFlags">
                <a-input placeholder="请输入spaceCheckFlags" v-model="queryParam.spaceCheckFlags"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="ccpId">
                <a-input placeholder="请输入ccpId" v-model="queryParam.ccpid"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="ccpTime">
                <a-input placeholder="请输入ccpTime" v-model="queryParam.ccpTime"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="origCCId">
                <a-input placeholder="请输入origCCId" v-model="queryParam.origccid"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="GUID">
                <a-input placeholder="请输入GUID" v-model="queryParam.guid"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="specialClientFlags">
                <a-input placeholder="请输入specialClientFlags" v-model="queryParam.specialClientFlags"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="nvarchar">
                <a-input placeholder="请输入nvarchar" v-model="queryParam.displayName"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="clientId">
                <a-input placeholder="请输入clientId" v-model="queryParam.clientId"></a-input>
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
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('APPClient')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        class="j-table-force-nowrap"
        @change="handleTableChange">

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="getImgView(text)" height="25px" alt="" style="max-width:80px;font-size: 12px;font-style: italic;"/>
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
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>

    <appClient-modal ref="modalForm" @ok="modalFormOk"></appClient-modal>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import AppClientModal from './modules/AppClientModal'

  export default {
    name: "AppClientList",
    mixins:[JeecgListMixin, mixinDevice],
    components: {
      AppClientModal
    },
    data () {
      return {
        description: 'APPClient管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title:'备份域',
            align:"center",
            dataIndex: 'domain'
          },
          {
            title:'name',
            align:"center",
            dataIndex: 'name'
          },
          {
            title:'simOperatingSystemId',
            align:"center",
            dataIndex: 'simOperatingSystemId'
          },
          {
            title:'net_hostname',
            align:"center",
            dataIndex: 'netHostname'
          },
          {
            title:'client_password',
            align:"center",
            dataIndex: 'clientPassword'
          },
          {
            title:'refTime',
            align:"center",
            dataIndex: 'reftime'
          },
          {
            title:'modified',
            align:"center",
            dataIndex: 'modified'
          },
          {
            title:'offlineEntity',
            align:"center",
            dataIndex: 'offlineentity'
          },
          {
            title:'offlineTimeStamp',
            align:"center",
            dataIndex: 'offlineTimeStamp'
          },
          {
            title:'csHostName',
            align:"center",
            dataIndex: 'csHostName'
          },
          {
            title:'clientDescription',
            align:"center",
            dataIndex: 'clientDescription'
          },
          {
            title:'jobResultDir',
            align:"center",
            dataIndex: 'jobResultDir'
          },
          {
            title:'clientSkewTime',
            align:"center",
            dataIndex: 'clientSkewTime'
          },
          {
            title:'cvdPort',
            align:"center",
            dataIndex: 'cvdPort'
          },
          {
            title:'evmgrcPort',
            align:"center",
            dataIndex: 'evmgrcPort'
          },
          {
            title:'status',
            align:"center",
            dataIndex: 'status'
          },
          {
            title:'releaseId',
            align:"center",
            dataIndex: 'releaseId'
          },
          {
            title:'spaceCheckFlags',
            align:"center",
            dataIndex: 'spaceCheckFlags'
          },
          {
            title:'ccpId',
            align:"center",
            dataIndex: 'ccpid'
          },
          {
            title:'ccpTime',
            align:"center",
            dataIndex: 'ccpTime'
          },
          {
            title:'origCCId',
            align:"center",
            dataIndex: 'origccid'
          },
          {
            title:'GUID',
            align:"center",
            dataIndex: 'guid'
          },
          {
            title:'specialClientFlags',
            align:"center",
            dataIndex: 'specialClientFlags'
          },
          {
            title:'nvarchar',
            align:"center",
            dataIndex: 'displayName'
          },
          {
            title:'clientId',
            align:"center",
            dataIndex: 'clientId'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            // fixed:"right",
            width:147,
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/appclient/appClient/list",
          delete: "/appclient/appClient/delete",
          deleteBatch: "/appclient/appClient/deleteBatch",
          exportXlsUrl: "/appclient/appClient/exportXls",
          importExcelUrl: "appclient/appClient/importExcel",
        },
        dictOptions:{},
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      },
    },
    methods: {
      initDictConfig(){
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>