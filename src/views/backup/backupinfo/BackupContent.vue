<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery" >
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="系统名称">
              <j-dict-select-tag placeholder="请选择系统名称" dictCode="os" v-model="queryParam.systemName"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="客户端名称">
              <a-input placeholder="请输入客户端名称" v-model="queryParam.clientName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="IP">
              <a-input placeholder="请输入ip" v-model="queryParam.ip"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="计划编号">
              <a-input placeholder="请输入计划编号" v-model="queryParam.planCode"></a-input>
            </a-form-item>
          </a-col>
<!--          <a-col :xl="6" :lg="7" :md="8" :sm="24">-->
<!--            <a-form-item label="关键字">-->
<!--              <a-input placeholder="请输入关键字" v-model="queryParam.keyWord"></a-input>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
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
    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>
        共找到 <a style="font-weight: 600">{{  }}</a>项
        <i class="anticon anticon-info-circle ant-alert-icon"></i>
        共找到 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i>-->
<!--        共找到 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项-->
<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        class="j-table-force-nowrap"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :expandedRowKeys="expandedRowKeys"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @expand="handleExpand"
        @change="handleTableChange">

        <!-- 内嵌table区域 begin -->
        <template slot="expandedRowRender" slot-scope="record">
          <div class="card-container">
            <a-tabs type="card">
              <a-tab-pane tab="备份项目" key="backupItem" forceRender>
                <backup-item-list />
              </a-tab-pane>
            </a-tabs>
          </div>
        </template>
        <!-- 内嵌table区域 end -->
        <template slot="state" slot-scope="text">
          <a-badge color="green" :text="text" v-if="text == '计划中'"/>
          <a-badge color="blue" :text="text" v-else/>
<!--          <a-switch v-model="text"></a-switch>-->
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
          <a @click="handleConfigure(record)">配置</a>
<!--          <a-divider type="vertical"/>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->
  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import BackupItemList from './BackupItemList'
  import '@/assets/less/TableExpand.less'
  import { getAction } from '@/api/manage'

  export default {
    name: 'BackupContent',
    mixins: [JeecgListMixin],
    components: {
      BackupItemList,
      JDictSelectTag
    },
    data() {
      return {
        description: '客户信息管理页面',
        // 表头
        columns: [
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
            title: 'xx编号',
            width: 120,
            align: 'center',
            dataIndex: 'planName'
          },
          {
            title: '系统名称',
            width: 120,
            align: 'center',
            dataIndex: 'systemName'
          },
          {
            title: '客户端',
            width: 120,
            align: 'center',
            dataIndex: 'client'
          },
          {
            title: 'IP',
            width: 120,
            align: 'center',
            dataIndex: 'ip'
          },
          {
            title: '状态',
            width: 120,
            align: 'center',
            dataIndex: 'state',
            scopedSlots: { customRender: 'state' }
          },
          {
            title: '内容简述',
            width: 120,
            align: 'center',
            dataIndex: 'contentSketch'
          },
          {
            title: '操作',
            width: 120,
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/customerInfo/list',
        },
        dictOptions: {},
        // 搜索卡展示
        toggleSearchStatus: true,

        // 展开的行
        expandedRowKeys: [],
        // 数据
        dataSource: [
          {
            id:1,
            planName: 'xxxx',
            systemName: 'xxxx',
            client: 'xxxx',
            ip: '127.0.0.1',
            contentSketch: 'xxxxx',
            state: 'xxxx',
          },
          {
            id:2,
            planName: 'xxx',
            systemName: 'xxxx',
            client: 'xxx',
            ip: '127.0.0.1',
            contentSketch: 'xxxxx',
            state: 'xxxx',
          }
        ],

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
      handleExpand(expanded, record) {
        this.expandedRowKeys = []
        if (expanded === true) {
          this.expandedRowKeys.push(record.id)
        }
      },
      handleConfigure(record){
        console.log("配置")
      }


    }
  }
</script>
<style scoped>

</style>