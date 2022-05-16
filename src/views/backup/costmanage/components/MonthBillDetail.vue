<template>

  <a-modal
    title='月账单详情'
    :visible='visible'
    :footer='null'
    width='80%'
    @cancel='handleCancel'
  >
    <div class='header mb-20'>
      <a-row type='flex' align-items='center'>
        <a-col :span='8' style='display:flex;align-items:center'>

          <span class='fl'>分行:</span>
          <a-select class='fl ml-10' style='width:60%' show-search filter-option>
            <a-select-option v-for='item in branchList' :key='item.id' :value='item.id'>{{ item.name }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span='8' style='display:flex;align-items:center'>
          <span class='fl' style='width:100px'>账单时间段:</span>
          <a-range-picker style='width:80%' class='fl ml-10' />
        </a-col>
        <a-col :span='8'>
          <a-button class='fr mr-10 ' type='primary'>生成月账单</a-button>
          <a-button class='fr mr-10' type='primary'>生成月详单</a-button>
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
      @change='handleTableChange1'>

      <template slot='action' slot-scope='text,record'>
        <a @click='showDetail(record)'>详情</a>
      </template>
    </a-table>
  </a-modal>
</template>

<script>
export default {
  name: 'MonthBillDetail',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
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
        // {
        //   title: '分行',
        //   align: 'center',
        //   dataIndex: 'companyName'
        // },
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
          title: '小计',
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
    }
  }
}
</script>

<style scoped>

</style>