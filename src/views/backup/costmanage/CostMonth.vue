<template>
  <div>
    <div class='searchParams mb-20'>
      <a-row>
        <a-col :span='12'>
          <div class='flex-center'>
            <branch-search v-model='branchId'></branch-search>
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
          :loading='loading'
          :pagination='ipagination'
          :rowSelection='{selectedRowKeys: selectedRowKeys, onChange: onSelectChange,type:type}'
          bordered
          class='j-table-force-nowrap'
          rowKey='id'
          size='middle'
          @change='handleTableChange'>
          <template #action='{record}'>
            <a-button type='link' @click='goToDetail(record)'>详情</a-button>
          </template>
        </a-table>
      </div>
      <cost-print-model ref='printModel' />
    </a-card>
  </div>
</template>

<script>

import { getAction } from '@/api/manage'
import CostPrintModel from './modules/CostPrintModel'
import BranchSearch from '@comp/searchParms/BranchSearch'
import dayjs from 'dayjs'

export default {
  name: 'CostList',
  components: { CostPrintModel, BranchSearch },
  data() {
    return {
      // 月账单详情弹窗visible
      monthBillInfoVisible: false,
      toggleSearchStatus: true,
      type: 'checkbox',
      branchId: [],
      searchParms: {
        branchId: '',
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
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '分行',
          width: 120,
          align: 'center',
          dataIndex: 'companyName'
        },
        {
          title: '服务费',
          width: 120,
          align: 'center',
          dataIndex: 'serveCost'
        },
        {
          title: '前端费用',
          width: 120,
          align: 'center',
          dataIndex: 'frontendCost'
        },
        {
          title: '后端费用',
          width: 120,
          align: 'center',
          dataIndex: 'backendCost'
        },
        {
          title: '月度总费用',
          width: 120,
          align: 'center',
          dataIndex: 'cost'
        },
        {
          title: '费用日期',
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
      detailDataSource: [],
      url: {
        getMonthCost: '/cvCostMonth/list?column=startTime&order=asc'
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    // 月账单详情弹窗
    goToDetail(record) {
      this.monthBillInfoVisible = true
    },
    loadData(arg) {
      this.loading = true
      if (arg === 1) {
        this.ipagination.current = 1
      }
      let params = Object.assign({}, this.queryParam)
      if (!this.queryParam.startTime) {
        params.startTime = dayjs(new Date()).format('YYYY-MM') + '-01'
      } else {
        params.startTime = dayjs(this.queryParam.startTime._d).format('YYYY-MM') + '-01'
      }
      params.type = '合计'
      params.pageNo = this.ipagination.current
      params.pageSize = this.ipagination.pageSize
      getAction(this.url.getMonthCost, params).then((res) => {
        if (res.success) {
          let result = res.result
          this.ipagination.total = result.total
          for (let item of result.records) {
            item.startTime = dayjs(item.startTime).format('YYYY-MM')
          }
          // this.dataSource = result.records || []
          this.dataSource = [{}]
        }
      }).finally(() => {
        this.loading = false
      })
    },
    loadDetailData(arg) {
      this.detailLoading = true
      if (arg === 1) {
        this.ipagination.current = 1
      }
      let params = {}
      params = Object.assign({}, this.queryParam)
      let nowTime = new Date()
      let days = dayjs(nowTime).date()
      if (!this.queryParam.startTime) {
        params.startTime_begin = dayjs(nowTime).format('YYYY-MM') + '-01'
        params.startTime_end = dayjs(nowTime).add(1, 'month').subtract(days, 'day').format('YYYY-MM-DD')
      } else {
        delete params.startTime
        nowTime = this.queryParam.startTime._d
        days = dayjs(this.queryParam.startTime._d).date()
        params.startTime_begin = dayjs(nowTime).format('YYYY-MM') + '-01'
        params.startTime_end = dayjs(nowTime).add(1, 'month').subtract(days, 'day').format('YYYY-MM-DD')
      }
      params.companyName = this.selectionRows[0].companyName
      params.type = '明细'
      params.pageNo = this.detailIpagination.current
      params.pageSize = this.detailIpagination.pageSize
      getAction(this.url.getMonthCost, params).then((res) => {
        if (res.success) {
          let result = res.result
          this.detailIpagination.total = result.total
          this.detailDataSource = result.records
        }
      }).finally(() => {
        this.detailLoading = false
      })
    },
    searchQuery() {
      this.loadData()
      this.onClearSelected()
    },
    searchReset() {
      this.queryParam = {}
      this.loadData()
      this.onClearSelected()
    },
    handleTableChange(pagination, filters, sorter) {
      this.ipagination = pagination
      this.loadData()
    },
    handleTableChange1(pagination, filters, sorter) {
      this.detailIpagination = pagination
      this.loadDetailData()
    },
    handleExpand(expanded, record) {
      console.log(record)
    },
    onSelectChange(selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectionRows
      this.loadDetailData()
    },
    onClearSelected() {
      this.selectedRowKeys = []
      this.selectionRows = []
      this.detailDataSource = []
    },
    showDetail(record) {
      this.$router.push({
        path: '/backup/costmanage/CostList',
        query: { companyName: record.companyName, startTime: record.startTime }
      })
    },
    handlePrint() {
      if (this.selectionRows.length == 0) {
        this.$message.warning('请选择一个分公司打印')
        return
      }
      this.$refs.printModel.toPrint(this.selectionRows[0], this.detailDataSource)
    }

  }
}
</script>

<style scoped>
@import '~@assets/less/common.less';
</style>