<template>

  <a-modal
    :visible='visible'
    width='70%'
    @cancel='handleCancel'
    @ok='handleOk'
  >
    <div slot='title' style='display: flex;align-items: center'>
      <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
      <span class='ml-10'>月账单详情</span>
    </div>
    <div class='header mb-20'>
      <a-row type='flex' align-items='center'>
        <a-col :span='17' style='display:flex;align-items:center'>

          <span class='fl'>分行:</span>
          <span class='fl ml-10 span'>{{ branchName }}</span>
          <span class='fl ml-20'>账单时间段:</span>
          <span class='fl ml-10 span'>{{ getDateRange() }}</span>
        </a-col>
        <a-col :span='7'>
          <div class='fr'>
            <a-button class='fl ml-10 ' @click='openPrintModal'>生成月账单</a-button>
            <a-button class='fl ml-10' type='primary'>生成月详单</a-button>
          </div>
        </a-col>
      </a-row>
    </div>
    <a-table
      ref='table'
      :columns='detailColumns'
      :dataSource='detailDataSource'
      :loading='detailLoading'
      :pagination='detailIpagination'
      bordered
      class='j-table-force-nowrap'
      rowKey='id'
      size='middle'
      @change='handleTableChange'>

      <template slot='action' slot-scope='text,record'>
        <a @click='showDetail(record)'>详情</a>
      </template>
    </a-table>
    <month-print-modal ref='monthPrintModal'></month-print-modal>
    <daily-bill-deta-modal
      :visible='dailyBillDetaVisible'
      :branch-name='dailyBranchName'
      :start-time='dailyStartTime'
      :branch-id='dailyBranchId'
      @ok='dailyBillDetaVisible = false'
      @cancel='dailyBillDetaVisible = false'
    ></daily-bill-deta-modal>
  </a-modal>
</template>

<script>
import MonthPrintModal from '@views/backup/costmanage/components/modal/MonthPrintModal'
import { getCostMonthDetail } from '@/api/modules/backup/costManage/costMonth.js'
import DailyBillDetaModal from '@views/backup/costmanage/components/modal/DailyBillDetaModal'

export default {
  name: 'MonthBillDetail',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    branchId: {
      type: String,
      default: ''
    },
    startTime: {
      type: String,
      default: ''
    },
    branchName: {
      type: String,
      default: ''
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.getCostMonthDetail()
        }
      },
      immediate: true
    }
  },
  components: {
    MonthPrintModal,
    DailyBillDetaModal
  },
  data() {
    return {
      detailDataSource: [],
      detailLoading: false,
      detailIpagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        }
      },
      dailyBranchName: '',
      dailyBranchId: '',
      dailyStartTime: '',
      dailyBillDetaVisible: false,
      detailColumns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '费用日期',
          align: 'center',
          dataIndex: 'startTime'
        },
        {
          title: '服务费',
          align: 'center',
          dataIndex: 'serveCost',
          customRender: (text, record) => {
            return text + '元'
          }
        },
        {
          title: '前端许可费用(元)',
          align: 'center',
          dataIndex: 'frontendCost',
          customRender: (text, record) => {
            return text + '元'
          }
        },
        {
          title: '后端存储写入费用(元)',
          align: 'center',
          dataIndex: 'backendCost',
          customRender: (text, record) => {
            return text + '元'
          }
        },
        {
          title: '小计(元)',
          align: 'center',
          dataIndex: 'total',
          customRender: (text, record) => {
            return text + '元'
          }
        },

        {
          title: '操作',
          width: 200,
          dataIndex: 'action',
          align: 'center',
          fixed: 'right',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    /**
     * 获取月账单详情
     * @param {Object} params
     */
    async getCostMonthDetail() {
      let params = {
        branchId: this.branchId,
        startTime: this.startTime,
        current: this.detailIpagination.current,
        pageSize: this.detailIpagination.pageSize
      }
      this.detailLoading = true
      try {
        const res = await getCostMonthDetail(params)
        if (res.code == 200) {
          this.detailIpagination.total = res.result.totalSize || 0
          this.detailDataSource = res.result.list || []
        }
      } finally {
        this.detailLoading = false
      }

    },
    /**
     * 获取日期范围
     */
    getDateRange() {
      let dateRange = ['1', '3', '5', '7', '8', '10', '12']
      let month = this.startTime.split('-')[1]
      let year = this.startTime.split('-')[0] * 1

      if (month * 1 == new Date().getMonth() + 1) {
        return year + '-' + month + '-01' + '——' + year + '-' + month + '-' + new Date().getDate()
      } else {
        if (dateRange.indexOf(month) > -1) {
          return year + '-' + month + '-01' + '——' + year + '-' + month + '-30'
        } else {
          return year + '-' + month + '-01' + '——' + year + '-' + month + '-31'
        }
      }
    },
    handleCancel() {
      this.$emit('close')
    },
    handleOk() {
      this.$emit('close')
    },
    openPrintModal() {
      this.$refs.monthPrintModal.toPrint()
    },
    handleTableChange(pagination, filters, sorter) {
      this.detailIpagination.current = pagination.current
      this.detailIpagination.pageSize = pagination.pageSize
      this.getCostMonthDetail()
    },
    showDetail(row) {
      this.dailyStartTime = row.startTime
      this.dailyBranchId = this.branchId
      this.dailyBranchName = this.branchName
      this.dailyBillDetaVisible = true
    },

  }
}
</script>

<style scoped>
.span {
  color: #999999
}
</style>