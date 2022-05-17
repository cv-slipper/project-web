<template>
  <div>
    <div class='searchParmas mb-20'>
      <a-row>
        <a-col :span='12'>
          <div class='form-item'>
            <div class='label fl ml-10'>分行:</div>
            <div class='wrapper fl ml-10'>
              <a-select style='width:150px' show-search filter-option>
                <a-select-option v-for='item in branchList' :value='item.branchCode' :key='item.branchCode'>
                  {{ item.branchName }}
                </a-select-option>
              </a-select>
            </div>
            <a-button type='primary' class='ml-40'>查询</a-button>
          </div>
        </a-col>
        <a-col :span='12'>
          <div class='fr'>
            <a-button type='primary' class='fl ml-10' @click='billingSetVisible=true'>新增</a-button>
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
            <a-button type='link' @click='billingSetVisible=true'>修改</a-button>
            <a-button type='link' danger class='color-daner'>删除</a-button>
          </template>
        </a-table>
      </div>
      <BillingSetInfoModal
        :visible='billingSetVisible'
        @cancel='billingSetVisible=false'
        @ok='billingSetVisible=false'></BillingSetInfoModal>
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
import { getChargingList } from '@/api/modules/backupdata/CvChargingApi.js'
import { downloadCsv } from '@/utils/modules/download'

export default {
  name: 'CvChargingSetList',
  mixins: [mixinDevice],
  components: {
    JDictSelectTag,
    BillingSetInfoModal,
    CvChargingSetModal
  },
  data() {
    return {
      branchList: [],
      billingSetVisible: false,
      description: '计费设置管理页面',
      ipagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`
      },
      loading: false,
      // 表头
      columns: [
        {
          title: '分行名称',
          align: 'center',
          dataIndex: 'companyName'
        },
        {
          title: '服务费单价（元/台）',
          align: 'center',
          dataIndex: 'chargingType_dictText'
        },
        {
          title: '前端许可单价（元/GB）',
          align: 'center',
          dataIndex: 'library'
        },
        {
          title: '存储写入量单价（元/GB)',
          align: 'center',
          dataIndex: 'unit'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          // fixed:"right",
          width: 100,
          scopedSlots: { customRender: 'action' }
        }
      ],
      dataSource: [],
      dictOptions: {},
      searchParams: {
        pageNo: 1,
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
      this.searchParams.pageNo = this.ipagination.current
      this.searchParams.pageSize = this.ipagination.pageSize
      try {
        let res = await getChargingList(this.searchParams)
        if (res.code === 200) {
          this.dataSource = res.result.records || []
          this.ipagination.total = res.result.total || 0
        } else {
          this.$message.error(res.message)
        }
      } finally {
        this.loading = false
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
      console.log(213, '123')
      downloadCsv(this.columns, this.dataSource)
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