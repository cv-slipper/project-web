<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->
    
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('storagePolicyCopyDetail')">导出</a-button>
      <a-upload
        name="file"
        :showUploadList="false"
        :multiple="false"
        :headers="tokenHeader"
        :action="importExcelUrl"
        @change="handleImportExcel">
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

    <storagePolicyCopyDetail-modal ref="modalForm" @ok="modalFormOk"></storagePolicyCopyDetail-modal>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import StoragePolicyCopyDetailModal from './modules/StoragePolicyCopyDetailModal'

  export default {
    name: "StoragePolicyCopyDetailList",
    mixins:[JeecgListMixin, mixinDevice],
    components: {
      StoragePolicyCopyDetailModal
    },
    data () {
      return {
        description: 'storagePolicyCopyDetail管理页面',
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
            title:'storagePolicyId',
            align:"center",
            dataIndex: 'storagePolicyId'
          },
          {
            title:'copyId',
            align:"center",
            dataIndex: 'copyId'
          },
          {
            title:'isMirrorCopy',
            align:"center",
            dataIndex: 'isMirrorCopy'
          },
          {
            title:'spareMediaGroup',
            align:"center",
            dataIndex: 'spareMediaGroup'
          },
          {
            title:'copyPrecedence',
            align:"center",
            dataIndex: 'copyPrecedence'
          },
          {
            title:'drivePool',
            align:"center",
            dataIndex: 'drivePool'
          },
          {
            title:'retentionRules',
            align:"center",
            dataIndex: 'retentionRules'
          },
          {
            title:'copyFlags',
            align:"center",
            dataIndex: 'copyFlags'
          },
          {
            title:'active',
            align:"center",
            dataIndex: 'active'
          },
          {
            title:'sourceCopy',
            align:"center",
            dataIndex: 'sourceCopy'
          },
          {
            title:'isDefault',
            align:"center",
            dataIndex: 'isDefault'
          },
          {
            title:'mediaAgent',
            align:"center",
            dataIndex: 'mediaAgent'
          },
          {
            title:'StoragePolicyCopy',
            align:"center",
            dataIndex: 'storagePolicyCopy'
          },
          {
            title:'library',
            align:"center",
            dataIndex: 'library'
          },
          {
            title:'throttleNetworkBandWidthMBHR',
            align:"center",
            dataIndex: 'throttleNetworkBandWidthMbhr'
          },
          {
            title:'dedupeFlags',
            align:"center",
            dataIndex: 'dedupeFlags'
          },
          {
            title:'isSnapCopy',
            align:"center",
            dataIndex: 'isSnapCopy'
          },
          {
            title:'copyType',
            align:"center",
            dataIndex: 'copyType'
          },
          {
            title:'startTime',
            align:"center",
            dataIndex: 'startTime'
          },
          {
            title:'extendedFlags',
            align:"center",
            dataIndex: 'extendedFlags'
          },
          {
            title:'storagePool',
            align:"center",
            dataIndex: 'storagePool'
          },
          {
            title:'error',
            align:"center",
            dataIndex: 'error'
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
          list: "/storagepolicycopydetail/storagePolicyCopyDetail/list",
          delete: "/storagepolicycopydetail/storagePolicyCopyDetail/delete",
          deleteBatch: "/storagepolicycopydetail/storagePolicyCopyDetail/deleteBatch",
          exportXlsUrl: "/storagepolicycopydetail/storagePolicyCopyDetail/exportXls",
          importExcelUrl: "storagepolicycopydetail/storagePolicyCopyDetail/importExcel",
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