<template>
  <div>
    <div class='searchParmas mb-20'>
      <a-row>
        <a-col :span='12'>
          <div class='flex-center fl'>
            <div class='label fl'>分行:</div>
            <branch-search

              style='width:240px'
              class='fl ml-10'
              v-model='branchIds'></branch-search>
          </div>
          <a-button type='primary' class='ml-40' @click='search'>查询</a-button>
        </a-col>
        <a-col :span='12'>
          <div class='fr'>
            <a-button type='primary' class='fl ml-10' @click='openInfoModel("add")'>新增</a-button>
            <a-button type='default' class='fl ml-10' @click='exportExcel'>导出</a-button>
          </div>

        </a-col>
      </a-row>
    </div>
    <a-card :bordered='false' :bodyStyle='{padding:"20px"}'>
      <!-- table区域-begin -->
      <div>
        <a-table
          ref='table'
          size='middle'
          rowKey='id'
          :columns='columns'
          :dataSource='dataSource'
          :pagination='ipagination'
          :loading='loading'
          class='j-table-force-nowrap my-table'
          @change='handleTableChange'>
          <template #action='slotProps'>
            <a-button type='link' @click='openInfoModel("edit",slotProps)'>修改</a-button>
            <a-popconfirm
              title='确认删除该计费设置吗？'
              ok-text='是的'
              cancel-text='取消'
              @confirm='deleteCharging(slotProps)'
            >
              <a-button v-if='slotProps.id!=1' type='link' danger class='color-daner'>删除</a-button>
            </a-popconfirm>

          </template>
        </a-table>
      </div>
      <BillingSetInfoModal
        :visible='billingSetVisible'
        :type='infoType'
        :id='infoId'
        @cancel='billingSetVisible=false'
        @ok='handleOk'></BillingSetInfoModal>
    </a-card>
  </div>
</template>

<script>

import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import CvChargingSetModal from './modules/CvChargingSetModal'
import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
import { filterMultiDictText } from '@/components/dict/JDictSelectUtil'
import BillingSetInfoModal from './components/BillingSetInfoModal'
import { getChargingList, deleteCharging } from '@/api/modules/backupdata/CvChargingApi.js'
import { downloadCsv } from '@/utils/modules/download'
import BranchSearch from '@/components/searchParms/BranchSearch.vue'
import { downloadFile } from '@/api/manage'

export default {
  name: 'CvChargingSetList',
  mixins: [mixinDevice],
  components: {
    JDictSelectTag,
    BillingSetInfoModal,
    CvChargingSetModal,
    BranchSearch
  },
  data() {
    return {
      branchList: [],
      billingSetVisible: false,
      infoType: '',
      infoId: '',
      description: '计费设置管理页面',
      ipagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`,
        pageSizeOptions: ['10', '20', '50', '100']
      },
      loading: false,
      // 表头
      columns: [
        {
          title: '分行名称',
          align: 'center',
          dataIndex: 'branchName'
        },
        {
          title: '服务费单价（元/台）',
          align: 'center',
          dataIndex: 'serverPrice'
        },
        {
          title: '前端许可单价（元/GB）',
          align: 'center',
          dataIndex: 'foreLicensePrice'
        },
        {
          title: '存储写入量单价（元/GB)',
          align: 'center',
          dataIndex: 'backLicensePrice'
        },
        {
          title: '操作',
          align: 'center',
          // fixed:"right",
          width: 100,
          scopedSlots: { customRender: 'action' }
        }
      ],
      dataSource: [],
      dictOptions: {},
      branchIds: [],
      searchParams: {
        current: 1,
        pageSize: 10
      }
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    /**
     * 获取计费列表
     */
    async getChargingList() {
      this.loading = true
      this.searchParams.current = this.ipagination.current
      this.searchParams.pageSize = this.ipagination.pageSize
      this.searchParams.branchId = this.branchIds.map(item => item.id).join(',')
      try {
        let res = await getChargingList(this.searchParams)
        if (res.code === 200) {
          this.dataSource = res.result.records || []
          this.ipagination.total = res.result.total || 0
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.dataSource = []
        this.ipagination.total = 0
      } finally {
        this.loading = false
      }

    },
    /**
     * 删除计费
     * @param {*} id
     */
    async deleteCharging({ id }) {
      const res = await deleteCharging(id)
      if (res.code === 200) {
        this.$message.success('删除成功')
        this.getChargingList()
      } else {
        this.$message.error(res.message)
      }
    },
    /**
     * 分页
     */
    handleTableChange(pagination) {
      this.ipagination.current = pagination.current
      this.getChargingList()
    },
    /**
     * 另存为csv
     */
    exportExcel() {
      downloadFile('/cvChargingSet/export-csv', '计费设置导出结果', {
        current: 1,
        pageSize: -1,
        branchId: this.branchIds.map(item => item.id).join(','),
        startTime: this.searchParams.startTime
      })
    },
    /**
     * 搜索
     */
    search() {
      this.ipagination.current = 1
      this.ipagination.pageSize = 10
      this.getChargingList()
    },
    /**
     * 打开计费设置弹窗
     */
    openInfoModel(type, row) {
      this.infoType = type
      type == 'edit' && (this.infoId = row.id)
      this.billingSetVisible = true
    },
    /**
     * ok
     */
    handleOk() {
      this.billingSetVisible = false
      this.getChargingList()
    }
  },
  created() {
    this.getChargingList()
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';

.searchParmas {
  background: white;
  padding: 20px;

}
</style>