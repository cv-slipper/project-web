<template>

  <a-modal
    :visible='visible'
    width='60%'
    @cancel='handleCancel'
    @ok='handleOk'
  >
    <div slot='title' style='display: flex;align-items: center'>
      <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
      <span class='ml-10'>月账单详情</span>
    </div>
    <div class='header mb-20'>
      <a-row type='flex' align-items='center'>
        <a-col :span='12' style='display:flex;align-items:center'>

          <span class='fl'>分行:</span>
          <span class='fl ml-10'>北京分行</span>
          <span class='fl ml-20' style='width:100px'>账单时间段:</span>
          <span class='fl ml-10'>123</span>
        </a-col>
        <a-col :span='12'>
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
  </a-modal>
</template>

<script>
import MonthPrintModal from '@views/backup/costmanage/components/modal/MonthPrintModal'

export default {
  name: 'MonthBillDetail',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    MonthPrintModal
  },
  data() {
    return {
      branchList: [],
      detailDataSource: [],
      detailLoading: false,
      detailIpagination: {
        total: 0,
        current: 1,
        pageSize: 50,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        }
      },
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
          dataIndex: 'serveCost'
        },
        {
          title: '前端许可费用(元)',
          align: 'center',
          dataIndex: 'frontendCost'
        },
        {
          title: '后端存储写入费用(元)',
          align: 'center',
          dataIndex: 'backendCost'
        },
        {
          title: '小计(元)',
          align: 'center',
          dataIndex: 'cost'
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
    handleCancel() {
      this.$emit('close')
    },
    handleOk() {
      this.$emit('close')
    },
    openPrintModal() {
      console.log(this.$refs)
      this.$refs.monthPrintModal.toPrint()
    },
    handleTableChange(pagination, filters, sorter) {
      this.detailIpagination.current = pagination.current
      this.detailIpagination.pageSize = pagination.pageSize
    }
  }
}
</script>

<style scoped>

</style>