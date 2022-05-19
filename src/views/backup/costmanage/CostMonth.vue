<template>
  <div>
    <div class='searchParams mb-20'>
      <a-row>
        <a-col :span='12'>
          <div class='flex-center fl'>
            <div class='label ml-10'>分行:</div>
            <branch-search class='ml-10' v-model='searchParms.branchId'></branch-search>
          </div>
          <div class='flex-center fl ml-40'>
            <div class='label mr-10'>日期:</div>
            <a-month-picker
              placeholder='请选择月份'
              class='fl ml-10'
              v-model='searchParms.startTime'
              value-format='YYYY-MM' />
          </div>
          <a-button type='primary' class='ml-40' @click='search'>查询</a-button>
        </a-col>
        <a-col :span='12'>
          <div class='fr'>
            <a-button class='fl ml-10' @click='openPrintModal("bill")'>生成账单</a-button>
            <a-button class='fl ml-10' @click='openPrintModal("info")'>生成详单</a-button>
            <a-button type='primary' class='fl ml-10'>批量生成账单</a-button>
          </div>
        </a-col>
      </a-row>
    </div>
    <a-card :bordered='false'>
      <!-- table区域-begin -->
      <div>
        <a-table
          ref='table'
          :columns='columns'
          :dataSource='dataSource'
          rowKey='branchId'
          :loading='loading'
          :pagination='ipagination'
          :rowSelection='{selectedRowKeys: selectedRowKeys,onChange:onSelectChange,type:type}'
          bordered
          size='middle'
          @change='handleTableChange'>
          <template #action='row'>
            <a-button type='link' @click='goToDetail(row)'>详情</a-button>
          </template>
        </a-table>
      </div>
      <month-print-modal ref='printModal'></month-print-modal>
      <month-bill-detail :visible='monthBillInfoVisible' @close='monthBillInfoVisible=false'></month-bill-detail>
    </a-card>
  </div>
</template>

<script>
import BranchSearch from '@comp/searchParms/BranchSearch'
import { getCostMonthList } from '@/api/modules/backup/costManage/costMonth.js'
import MonthPrintModal from '@views/backup/costmanage/components/modal/MonthPrintModal'
import MonthBillDetail from '@views/backup/costmanage/components/MonthBillDetail'

export default {
  name: 'CostList',
  components: { BranchSearch, MonthPrintModal, MonthBillDetail },
  data() {
    return {
      // 月账单详情弹窗visible
      monthBillInfoVisible: false,
      toggleSearchStatus: true,
      type: 'radio',
      searchParms: {
        branchId: [],
        startTime: ''
      },
      loading: false,
      detailLoading: false,
      selectedRowKeys: [],
      selectionRows: [],
      // 分行列表
      branchList: [],
      // 分页参数
      ipagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        }
      },

      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 50,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '分行',
          width: 120,
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: '服务费(元)',
          width: 120,
          align: 'center',
          dataIndex: 'serveCost'
        },
        {
          title: '前端许可费用(元)',
          width: 120,
          align: 'center',
          dataIndex: 'frontendCost'
        },
        {
          title: '后端存储写入费用(元)',
          width: 150,
          align: 'center',
          dataIndex: 'backendCost'
        },
        {
          title: '月度总费用(元)',
          width: 120,
          align: 'center',
          dataIndex: 'cost'
        },
        {
          title: '费用月份',
          width: 120,
          align: 'center',
          dataIndex: 'startTime'
        },
        {
          title: '操作',
          width: 120,
          align: 'center',
          scopedSlots: {
            customRender: 'action'
          }
        }
      ],

      dataSource: [],
      detailDataSource: []
    }
  },
  created() {
    this.getCostMonthList()
  },
  methods: {
    /**
     * 获取月账单列表
     * @param {Object} params
     */
    async getCostMonthList() {
      let params = {
        startTime: this.searchParms.startTime,
        branchId: this.searchParms.branchId.map(item => item.id).join(','),
        current: this.ipagination.current,
        pageSize: this.ipagination.pageSize
      }
      this.loading = true
      try {
        const res = await getCostMonthList(params)
        if (res.code === 200) {
          this.dataSource = res.result.list || []
          this.ipagination.total = res.result.totalSize || 0
        } else {
          this.$message.error(res.message)
        }
      } finally {
        this.loading = false
      }

    },

    /**
     * 搜索
     */
    search() {
      this.getCostMonthList()
    },
    /**
     * 单选
     */
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectedRows
    },
    /**
     * 打开打印弹窗
     * @param record
     */
    openPrintModal(type) {
      if (this.selectedRowKeys.length == 0) {
        return this.$message.warning('请选择一条数据')
      } else {
        this.$refs.printModal.toPrint()
      }
    },
    // 月账单详情弹窗
    goToDetail(record) {
      console.log(record, 'record')
      this.monthBillInfoVisible = true
    },

    handleTableChange(pagination, filters, sorter) {
      this.ipagination.current = pagination.current
      this.ipagination.pageSize = pagination.pageSize
      this.getCostMonthList()

    }


  }
}
</script>

<style scoped>
@import '~@assets/less/common.less';
</style>