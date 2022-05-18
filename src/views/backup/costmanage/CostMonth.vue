<template>
  <div>
    <div class='searchParams mb-20'>
      <a-row>
        <a-col :span='12'>
          <div class='flex-center fl'>
            <div class='label ml-10'>分行:</div>
            <branch-search class='ml-10' v-model='branchId'></branch-search>
          </div>
          <div class='flex-center fl ml-40'>
            <div class='label mr-10'>日期:</div>
            <a-date-picker class='fl ml-10' v-model='searchParms.startTime' value-format='YYYY-MM-DD' />
          </div>
          <a-button type='primary' class='ml-40'>查询</a-button>
        </a-col>
        <a-col :span='12'>
          <div class='fr'>
            <a-button class='fl ml-10'>生成账单</a-button>
            <a-button class='fl ml-10'>生成详单</a-button>
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
          :loading='loading'
          :pagination='ipagination'
          :rowSelection='{selectedRowKeys: selectedRowKeys, onChange: onSelectChange,type:type}'
          bordered

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
          dataIndex: 'companyName'
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

  },
  methods: {
    // 月账单详情弹窗
    goToDetail(record) {
      this.monthBillInfoVisible = true
    },

    handleTableChange(pagination, filters, sorter) {


    }


  }
}
</script>

<style scoped>
@import '~@assets/less/common.less';
</style>