<template>
  <a-modal width='70%' :visible='visible' :footer='false' @cancel='cancel'>
    <div slot='title' style='display: flex;align-items: center'>
      <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
      <span class='ml-10'>失败作业列表</span>
    </div>
    <div class='table-box'>
      <a-table
        :columns='columns'
        :data-source='dataSource'
        :loading='loading'
      >
        <template #action='row'>
          <div>
            <a-button type='link' @click='failedDetail(row)'>详情</a-button>
          </div>
        </template>
      </a-table>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'FailedWorkModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      dataSource: [],
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center',
          customRender: (text, row, index) => {
            return index + 1
          }
        },
        {
          title: '作业ID',
          key: 'jobId',
          dataIndex: 'jobId',
          width: 100,
          align: 'center'

        },
        {
          title: '操作类型',
          key: 'type',
          dataIndex: 'type',
          width: 200,
          align: 'center'
        },
        {
          title: '备份域',
          key: 'domain',
          dataIndex: 'domain',
          width: 100,
          align: 'center'
        },
        {
          title: '分行',
          key: 'applicationSystem',
          dataIndex: 'applicationSystem',
          width: 150,
          align: 'center'
        },
        {
          title: '客户端',
          key: 'client',
          dataIndex: 'client',
          width: 100,
          align: 'center'
        },
        {
          title: '代理类型',
          key: 'agentType',
          dataIndex: 'agentType',
          width: 100,
          align: 'center'
        },
        {
          title: '子客户端',
          key: 'subclientName',
          width: 100,
          align: 'center',
          dataIndex: 'subclientName'
        },
        {
          title: '作业类型',
          key: 'jobType',
          dataIndex: 'jobType',
          width: 100,
          align: 'center'
        },
        {
          title: '状态',
          key: 'state',
          dataIndex: 'state',
          width: 200,
          align: 'center'
        },
        {
          title: '开始时间',
          key: 'startTime',
          width: 200,
          dataIndex: 'startTime'
        },
        {
          title: '结束时间',
          key: 'endTime',
          width: 200,
          dataIndex: 'endTime'
        },
        {
          title: '操作',
          key: 'action',
          width: 80,
          align: 'center',
          fixed: 'right',
          scopedSlots: {
            customRender: 'action'
          }

        }

      ]
    }
  },
  methods: {
    failedDetail(row) {
      this.$emit('failedDetail', row)
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}

</script>

<style scoped>
/deep/ .table-box table thead th {
  padding: 10px 0 !important;
  background: #EDF3FE !important;
  font-size: 14px !important;
  color: #3E3E3E !important;
}
</style>