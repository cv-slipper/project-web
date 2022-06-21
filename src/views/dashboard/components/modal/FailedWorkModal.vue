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
        :pagination='false'
        @change='tableChange'
        :scroll='{x:"100%",y:false}'
      >
        <template #action='row'>

          <a-button type='link' @click='failedDetail(row)'>详情</a-button>

        </template>
        <template #tooltip='data'>
          <a-tooltip :title='data'>
            <div class='text-ellipsis'>
              {{ data }}
            </div>
          </a-tooltip>
        </template>
      </a-table>
    </div>
    <exception-info-modal
      :visible='exceptionInfoVisible'
      :detail-item='detailItem'
      @cancel='exceptionInfoVisible=false'
    ></exception-info-modal>
  </a-modal>
</template>

<script>
import { getErrorList } from '@api/modules/dashboard/analysis'
import ExceptionInfoModal from '@views/dashboard/components/modal/ExceptionInfoModal'

export default {
  name: 'FailedWorkModal',
  components: {
    ExceptionInfoModal
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    domain: {
      type: String,
      default: ''
    },
    branchId: {
      type: String,
      default: ''
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        if (val) {
          this.getWorkList()
        }
      }
    }
  },
  data() {
    return {
      exceptionInfoVisible: false,
      detailItem: {},
      workInfoVisible: false,
      rowId: '',
      rowDomain: '',
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
          align: 'center',
          scopedSlots: {
            customRender: 'tooltip'
          }
        },
        {
          title: '代理类型',
          key: 'agentType',
          dataIndex: 'agentType',
          width: 150,
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

      ],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${total} 条`
      }
    }
  },
  methods: {
    /**
     * 获取失败列表
     */
    async getWorkList() {
      try {
        this.loading = true
        let res = await getErrorList({
          domain: this.domain,
          branchId: this.branchId
        })
        if (res.code == 200) {
          this.dataSource = res.result || []
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.$message.error('获取失败列表失败')
      } finally {
        this.loading = false
      }
    },
    tableChange(pagination) {
      this.pagination.current = pagination.current
      this.getWorkList()
    },
    failedDetail(row) {
      row.exceptionType = '异常作业'

      this.exceptionInfoVisible = true
      this.detailItem = row
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