<template>
  <a-card :bordered='false'>
    　
    <div class='searchParmas'>
      <a-row>
        <a-col :span='12'>
          <a-form :label-col='{span:3}' :wrapper-col='{span:8}'>
            <a-form-item label='分行'>
              <a-select mode='multiple' show-search filter-option>
                <a-select-option v-for='item in branchList' :key='item.id'>
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :span='12'>
          <a-button type='primary' class='fl'>查询</a-button>
          <a-button type='primary' class='fl ml-10' @click='billingSetVisible=true'>新增</a-button>
          <a-button type='primary' class='fl ml-10'>导出</a-button>
        </a-col>
      </a-row>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref='table'
        size='middle'
        bordered
        rowKey='id'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        class='j-table-force-nowrap'
        @change='handleTableChange'>


        <template #action='slotProps'>

          <a-button type='primary' @click='billingSetVisible=true'>修改</a-button>
          <a-button type='primary ml-10'>删除</a-button>
        </template>

      </a-table>
    </div>

    <cvChargingSet-modal ref='modalForm' @ok='modalFormOk'></cvChargingSet-modal>
    <BillingSetInfoModal
      :visible='billingSetVisible'
      @cancel='billingSetVisible=false'
      @ok='billingSetVisible=false'></BillingSetInfoModal>
  </a-card>
</template>

<script>

import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import CvChargingSetModal from './modules/CvChargingSetModal'
import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
import { filterMultiDictText } from '@/components/dict/JDictSelectUtil'
import BillingSetInfoModal from './components/BillingSetInfoModal'

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
          title: ' ',
          dataIndex: 'action',
          align: 'center',
          // fixed:"right",
          width: 147,
          scopedSlots: { customRender: 'action' }
        }
      ],
      dataSource: [{ id: 1 }, { id: 2 }],
      url: {
        list: '/cvChargingSet/list',
        delete: '/cvChargingSet/delete',
        deleteBatch: '/cvChargingSet/deleteBatch',
        exportXlsUrl: '/cvChargingSet/exportXls',
        importExcelUrl: 'cvchargingset/cvChargingSet/importExcel'
      },
      dictOptions: {}
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    initDictConfig() {
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>