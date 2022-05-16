<template>
  <a-card :bordered='false'>
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter.native='searchQuery'>
        <a-row :gutter='24'>
          <template v-if='toggleSearchStatus'>
            <a-col :lg='7' :md='8' :sm='24' :xl='6'>
              <a-form-item label='分行'>
                <a-select filter-option show-search>
                  <a-select-option v-for='item in branchList' :key='item.id' :value='item.id'>{{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg='7' :md='8' :sm='24' :xl='6'>
              <a-form-item label='日期'>
                <a-month-picker v-model='queryParam.startTime' format='YYYY-MM' placeholder='请选择日期'></a-month-picker>
              </a-form-item>
            </a-col>
          </template>
          <a-col :lg='7' :md='8' :sm='24' :xl='6'>

            <span class='table-page-search-submitButtons' style='float: left;overflow: hidden;'>
              <a-button icon='search' type='primary' @click='searchQuery'>查询</a-button>
              <a-button icon='reload' style='margin-left: 8px' type='primary' @click='searchReset'>重置</a-button>
              <a-button class='ml-10' type='primary'>生成月账单</a-button>
              <a-button class='ml-10' type='primary'>生成月详单</a-button>
              <a-button class='ml-10' type='primary'>批量生成账单/详单</a-button>
              <!--                            <a-button type='primary' @click='handlePrint' icon='printer'-->
              <!--                                      style='margin-left: 8px'>打印</a-button>-->

              <!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
              <!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
              <!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
              <!--              </a>-->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->
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
    <MonthBillDetail :visible='monthBillInfoVisible' @close='monthBillInfoVisible=false'></MonthBillDetail>
    <cost-print-model ref='printModel' />
  </a-card>
</template>

<script>
import MonthBillDetail from './components/MonthBillDetail.vue'
import CostPieChart from './CostPieChart'
import CostHistogram from './CostHistogram'
import { getAction } from '@/api/manage'
import { keepTwoDecimal } from '@/utils/util'
import JDate from '@/components/jeecg/JDate'
import CostPrintModel from './modules/CostPrintModel'
import dayjs from 'dayjs'

export default {
  name: 'CostList',
  components: { JDate, CostPieChart, CostHistogram, CostPrintModel, MonthBillDetail },
  data() {
    return {
      // 月账单详情弹窗visible
      monthBillInfoVisible: false,
      toggleSearchStatus: true,
      type: 'radio',
      queryParam: {},
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