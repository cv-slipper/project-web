<template>
  <a-modal
    width="70%"
    :visible="visible"
    @cancel="handleCancel"
    @ok="handleOk">
    <br>
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

      <template slot="backupTypeSlot" slot-scope="text">
        <span v-if="text == 1">完全</span>
        <span v-else-if="text == 2">增量</span>
      </template>

      <template slot="ellipsisText" slot-scope="text">
        <j-ellipsis :value="text" :length="50"></j-ellipsis>
      </template>

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

  </a-modal>
</template>

<script>
  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import JEllipsis from '@/components/jeecg/JEllipsis'
  import { getAction } from '@/api/manage'

  export default {
    name: 'TaskListModal',
    mixins:[JeecgListMixin, mixinDevice],
    components: {
      JEllipsis,
      JDictSelectTag
    },
    data() {
      return {
        visible: false,
        oncePlan: {
          domain: '',
          clientId: '',
          client: '',
          subClientId: '',
          subClient: '',
          planTime: '* * * * * ? *',
          backupType: 2,
          jobId: '',
          status: '',
          type: '',
          taskData: ''
        },
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
            dataIndex: 'domain_dictText'
          },
          {
            title:'客户端ID',
            align:"center",
            dataIndex: 'clientId'
          },
          {
            title:'客户端',
            align:"center",
            dataIndex: 'client'
          },
          {
            title:'子客户端ID',
            align:"center",
            dataIndex: 'subClientId'
          },
          {
            title:'子客户端',
            align:"center",
            dataIndex: 'subClient'
          },
          {
            title:'发起时间',
            align:"center",
            dataIndex: 'planTime'
          },
          {
            title:'备份类型',
            align:"center",
            dataIndex: 'backupType',
            scopedSlots: {customRender: "backupTypeSlot"}
          },
          {
            title:'作业ID',
            align:"center",
            dataIndex: 'jobId'
          },
          {
            title:'计划状态',
            align:"center",
            dataIndex: 'status'
          },
          {
            title:'立即/计划',
            align:"center",
            dataIndex: 'type'
          },
          {
            title:'任务数据',
            align:"center",
            dataIndex: 'taskData',
            scopedSlots: {customRender: "ellipsisText"}
          },
        ],

        url: {
          createTask: '/job/createTask',
          addOncePlan: '/cvOncePlan/add',
          getOncePlanList: '/cvOncePlan/list'
        }
      }
    },
    created() {
      // initDictOptions('applicationId').then((res) => {
      //   if (res.success) {
      //     this.applicationId = res.result
      //   }
      // })
    },
    mounted() {
    },
    computed: {

    },
    methods: {
      initDictConfig() {
      },
      show(item){
        this.oncePlan.domain = item.domain
        this.oncePlan.clientId = item.clientId
        this.visible = true
        this.searchQuery()
      },
      loadData(arg) {
        //加载数据 若传入参数1则加载第一页的内容
        if (arg === 1) {
          this.ipagination.current = 1;
        }
        var params = this.getQueryParams();//查询条件
        params.domain = this.oncePlan.domain
        params.clientId =this.oncePlan.clientId

        this.loading = true;
        getAction(this.url.getOncePlanList, params).then((res) => {
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

      handleOk() {
        this.handleCancel()
      },
      handleCancel() {
        this.oncePlan = {
          domain: '',
          clientId: '',
          client: '',
          subClientId: '',
          subClient: '',
          planTime: '* * * * * ? *',
          backupType: 2,
          jobId: '',
          status: '',
          type: '',
          taskData: ''
        }
        this.dataSource = {}
        this.visible = false
      }

    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>