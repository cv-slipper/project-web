<template>
  <a-card class="j-inner-table-wrapper" :bordered="false">

    <!-- 查询区域 begin -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="备份域">
          <a-input v-model="queryParam.domain" placeholder="请输入备份域"/>
        </a-form-item>
      </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户端">
          <a-input v-model="queryParam.client" placeholder="请输入客户端"/>
        </a-form-item>
      </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="代理/实例">
            <a-input v-model="queryParam.agent" placeholder="请输入代理/实例"/>
          </a-form-item>
        </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="备份集/子客户端">
          <a-input v-model="queryParam.childClient" placeholder="请输入备份集/子客户端"/>
        </a-form-item>
      </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="作业ID(CommCell)(状态)">
          <a-input v-model="queryParam.workId" placeholder="请输入作业ID(CommCell)(状态)"/>
        </a-form-item>
      </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="类型">
          <a-input v-model="queryParam.type" placeholder="请输入类型"/>
        </a-form-item>
      </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="扫描类型">
          <a-input v-model="queryParam.scanType" placeholder="请输入扫描类型"/>
        </a-form-item>
      </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="开始时间(写开始时间)">
          <j-date class="query-group-cust" v-model="queryParam.startTime_begin" placeholder="请选择开始时间" show-time date-format="YYYY-MM-DD HH:mm:ss"/>
          <span class="query-group-split-cust"></span>
          <j-date class="query-group-cust" v-model="queryParam.startTime_end" placeholder="请选择结束时间" show-time date-format="YYYY-MM-DD HH:mm:ss"/>
        </a-form-item>
      </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="结束时间或当前阶段(写结束时间)">
          <j-date class="query-group-cust" v-model="queryParam.endTime_begin" placeholder="请选择开始时间" show-time date-format="YYYY-MM-DD HH:mm:ss"/>
          <span class="query-group-split-cust"></span>
          <j-date class="query-group-cust" v-model="queryParam.endTime_end" placeholder="请选择结束时间" show-time date-format="YYYY-MM-DD HH:mm:ss"/>
        </a-form-item>
      </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="应用程序大小(压缩率)">
          <a-input v-model="queryParam.programSize" placeholder="请输入应用程序大小(压缩率)"/>
        </a-form-item>
      </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="已传送数据">
          <a-input v-model="queryParam.transportData" placeholder="请输入已传送数据"/>
        </a-form-item>
      </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="写入数据(空间节省百分比)">
          <a-input v-model="queryParam.writeData" placeholder="请输入写入数据(空间节省百分比)"/>
        </a-form-item>
      </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据大小更改">
          <a-input v-model="queryParam.dataSize" placeholder="请输入数据大小更改"/>
        </a-form-item>
      </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="传送时间">
          <a-input v-model="queryParam.transportTime" placeholder="请输入传送时间"/>
        </a-form-item>
      </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="吞吐量(GB/小时)(当前)">
          <a-input v-model="queryParam.speed" placeholder="请输入吞吐量(GB/小时)(当前)"/>
        </a-form-item>
      </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="受保护对象">
          <a-input v-model="queryParam.protectObject" placeholder="请输入受保护对象"/>
        </a-form-item>
      </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="失败对象">
          <a-input v-model="queryParam.failObject" placeholder="请输入失败对象"/>
        </a-form-item>
      </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="失败文件夹">
          <a-input v-model="queryParam.failFolder" placeholder="请输入失败文件夹"/>
        </a-form-item>
      </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="原因">
          <a-input v-model="queryParam.reason" placeholder="请输入原因"/>
        </a-form-item>
      </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span class="table-page-search-submitButtons table-operator">
              <a-button type="primary" icon="search" @click="searchQuery">查询</a-button>
              <a-button type="primary" icon="reload" @click="searchReset">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                <span>{{ toggleSearchStatus ? '收起' : '展开' }}</span>
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域 end -->

    <!-- 操作按钮区域 begin -->
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('持续异常作业')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>

      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            <span>删除</span>
          </a-menu-item>
        </a-menu>
        <a-button>
          <span>批量操作</span>
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>
    <!-- 操作按钮区域 end -->

    <!-- table区域 begin -->
    <div>

      <a-alert type="info" showIcon style="margin-bottom: 16px;">
        <template slot="message">
          <span>已选择</span>
          <a style="font-weight: 600;padding: 0 4px;">{{ selectedRowKeys.length }}</a>
          <span>项</span>
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </template>
      </a-alert>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        class="j-table-force-nowrap"
        :loading="loading"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :expandedRowKeys="expandedRowKeys"
        :rowSelection="{selectedRowKeys, onChange: onSelectChange}"
        @expand="handleExpand"
        @change="handleTableChange"
      >

        <!-- 内嵌table区域 begin -->
        <template slot="expandedRowRender" slot-scope="record">
          <a-tabs tabPosition="top">
            <a-tab-pane tab="持续异常作业明细" key="persistentExceptionWorkDetail" forceRender>
              <persistent-exception-work-detail-sub-table :record="record"/>
            </a-tab-pane>
          </a-tabs>
        </template>
        <!-- 内嵌table区域 end -->

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>

        <template slot="imgSlot" slot-scope="text">
          <div style="font-size: 12px;font-style: italic;">
            <span v-if="!text">无图片</span>
            <img v-else :src="getImgView(text)" alt="" style="max-width:80px;height:25px;"/>
          </div>
        </template>

        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button
            v-else
            ghost
            type="primary"
            icon="download"
            size="small"
            @click="uploadFile(text)"
          >
            <span>下载</span>
          </a-button>
        </template>

        <template slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">
              <span>更多 <a-icon type="down"/></span>
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>

        </template>

      </a-table>
    </div>
    <!-- table区域 end -->

    <!-- 表单区域 -->
    <persistent-exception-work-modal ref="modalForm" @ok="modalFormOk"/>

  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import PersistentExceptionWorkModal from './modules/PersistentExceptionWorkModal'
  import PersistentExceptionWorkDetailSubTable from './subTables/PersistentExceptionWorkDetailSubTable'
  import JDate from '@/components/jeecg/JDate.vue'
  import '@/assets/less/TableExpand.less'


  export default {
    name: 'PersistentExceptionWorkList',
    mixins: [JeecgListMixin],
    components: {
      PersistentExceptionWorkModal,
      PersistentExceptionWorkDetailSubTable,
      JDate,
    },
    data() {
      return {
        description: '持续异常作业列表管理页面',
        // 表头
        columns: [
          {
            title: '#',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: (t, r, index) => parseInt(index) + 1
          },
          {
            title: '备份域',
            align: 'center',
            dataIndex: 'domain',
          },
          {
            title: '客户端',
            align: 'center',
            dataIndex: 'client',
          },
          {
            title: '代理/实例',
            align: 'center',
            dataIndex: 'agent',
          },
          {
            title: '备份集/子客户端',
            align: 'center',
            dataIndex: 'childClient',
          },
          {
            title: '作业ID(CommCell)(状态)',
            align: 'center',
            dataIndex: 'workId',
          },
          {
            title: '类型',
            align: 'center',
            dataIndex: 'type',
          },
          {
            title: '扫描类型',
            align: 'center',
            dataIndex: 'scanType',
          },
          {
            title: '开始时间(写开始时间)',
            align: 'center',
            dataIndex: 'startTime',
          },
          {
            title: '结束时间或当前阶段(写结束时间)',
            align: 'center',
            dataIndex: 'endTime',
          },
          {
            title: '应用程序大小(压缩率)',
            align: 'center',
            dataIndex: 'programSize',
          },
          {
            title: '已传送数据',
            align: 'center',
            dataIndex: 'transportData',
          },
          {
            title: '写入数据(空间节省百分比)',
            align: 'center',
            dataIndex: 'writeData',
          },
          {
            title: '数据大小更改',
            align: 'center',
            dataIndex: 'dataSize',
          },
          {
            title: '传送时间',
            align: 'center',
            dataIndex: 'transportTime',
          },
          {
            title: '吞吐量(GB/小时)(当前)',
            align: 'center',
            dataIndex: 'speed',
          },
          {
            title: '受保护对象',
            align: 'center',
            dataIndex: 'protectObject',
          },
          {
            title: '失败对象',
            align: 'center',
            dataIndex: 'failObject',
          },
          {
            title: '失败文件夹',
            align: 'center',
            dataIndex: 'failFolder',
          },
          {
            title: '原因',
            align: 'center',
            dataIndex: 'reason',
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' },
          },
        ],
        // 字典选项
        dictOptions: {},
        // 展开的行
        expandedRowKeys: [],
        url: {
          list: '/persistentexceptionwork/persistentExceptionWork/list',
          delete: '/persistentexceptionwork/persistentExceptionWork/delete',
          deleteBatch: '/persistentexceptionwork/persistentExceptionWork/deleteBatch',
          exportXlsUrl: '/persistentexceptionwork/persistentExceptionWork/exportXls',
          importExcelUrl: '/persistentexceptionwork/persistentExceptionWork/importExcel',
        },
      }
    },
    computed: {
      importExcelUrl() {
        return window._CONFIG['domianURL'] + this.url.importExcelUrl
      }
    },
    methods: {

      initDictConfig() {
      },

      handleExpand(expanded, record) {
        this.expandedRowKeys = []
        if (expanded === true) {
          this.expandedRowKeys.push(record.id)
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  @import '~@assets/less/common.less';
</style>