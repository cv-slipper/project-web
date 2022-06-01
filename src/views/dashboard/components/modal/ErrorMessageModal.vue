<template>
  <a-modal :visible='visible' :footer='false' @cancel='cancel' width='90%'>
    <div slot='title' style='display: flex;align-items: center'>
      <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
      <span class='ml-10'>未处理异常信息</span>
    </div>
    <div class='searchParams'>
      <div class='form-item'>
        <div class='label'>异常类型：</div>
        <div class='content'>
          <a-select mode='multiple' v-model='searchParams.type' style='width:200px'>
            <a-select-option v-for='item in types' :key='item.value' :value='item.value'
                             :label='item.label'></a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>严重程度：</div>
        <div class='content'>
          <a-select mode='multiple' v-model='searchParams.level' style='width:200px'>
            <a-select-option v-for='item in levels' :key='item.value' :value='item.value'
                             :label='item.label'></a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>备份域：</div>
        <div class='content'>
          <a-select v-model='searchParams.backupDomain' style='width:200px'>
            <a-select-option v-for='item in backupDomains' :key='item.value' :value='item.value'
                             :label='item.label'></a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>应用系统／分行：</div>
        <div class='content'>
          <a-select v-model='searchParams.appSystem' style='width:200px'>
            <a-select-option
              v-for='item in appSystems'
              :key='item.value'
              :value='item.value'
              :label='item.label'></a-select-option>
          </a-select>
        </div>
        <div class='label ml-10 '>
          <a-button type='primary'>查询</a-button>
        </div>
      </div>
    </div>
    <div class='searchParams flex-between'>
      <div></div>
      <div>
        <a-button type='link'>批量处理</a-button>
        <a-button type='link'>批量忽略</a-button>
      </div>
    </div>
    <div class='table-box'>
      <a-table
        :columns='columns'
        :data-source='data'
        :loading='loading'
        :bordered='true'
        :scroll='{x:"100%"}'
        :pagination='pagination'
        @change='tableChange'
      >
        <template #action='row'>
          <div class='flex-between'>
            <a-button type='link'>详情</a-button>
            <a-button type='link'>处理</a-button>
            <a-button type='link'>忽略</a-button>
          </div>
        </template>
        <template #tooltip='data'>
          <a-tooltip :title='data'>
            <div class='text-ellipsis'>
              {{ data }}
            </div>
          </a-tooltip>
        </template>
      </a-table>
    </div>
  </a-modal>
</template>

<script>
import { getExceptionList } from '@api/modules/dashboard/analysis.js'

export default {
  name: 'ErrorMessageModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    domain: {
      type: String,
      default: 'prod'
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.getExceptionList()
      }
    }
  },
  data() {
    return {
      columns: [
        {
          title: '异常ID',
          key: 'id',
          dataIndex: 'id',
          align: 'center',
          width: 80,
          scopedSlots: {
            customRender: 'tooltip'
          }
        },
        {
          title: '严重程度',
          key: 'severity',
          dataIndex: 'severity',
          align: 'center',
          width: 100

        },
        {
          title: '备份域',
          key: 'domain',
          dataIndex: 'domain',
          width: 80,
          align: 'center'
        },
        {
          title: '应用系统/分行',
          key: 'appSystemName',
          dataIndex: 'appSystemName',
          align: 'center',
          width: 100,
          scopedSlots: {
            customRender: 'tooltip'
          }
        },
        {
          title: '发生时间',
          key: 'occurrenceTime',
          dataIndex: 'occurrenceTime',
          align: 'center',
          width: 80,
          scopedSlots: {
            customRender: 'tooltip'
          }

        },
        {
          title: '异常类型',
          key: 'exceptionType',
          dataIndex: 'exceptionType',
          align: 'center',
          width: 100
        }, {
          title: '描述',
          key: 'description',
          width: 120,
          dataIndex: 'description',
          align: 'center',
          scopedSlots: {
            customRender: 'tooltip'
          }
        }, {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 160,
          scopedSlots: {
            customRender: 'action'
          }
        }
      ],
      data: [],
      searchParams: {
        type: []
      },
      backupDomains: [],
      types: [],
      levels: [],
      appSystems: [],
      loading: false,
      pagination: {
        pageSize: 10,
        current: 1,
        showTotal: total => `共 ${total} 条`
      }
    }
  },
  methods: {
    /**
     * 获取异常信息列表
     */
    async getExceptionList() {
      try {
        this.loading = true
        const res = await getExceptionList({
          current: this.pagination.current,
          pageSize: this.pagination.pageSize,
          domain: this.domain,
          id: this.id,
          ...this.searchParams
        })
        if (res.code == 200) {
          this.data = res.result || []
        } else {
          this.$message.error(res.message)
        }

      } catch (e) {
        this.$message.error('获取失败')
      } finally {
        this.loading = false
      }
    },
    cancel() {
      this.$emit('cancel')
    },
    tableChange(pagination) {
      this.pagination.current = pagination.current
      this.getExceptionList()
    }
  }
}
</script>

<style scoped>
.label {
  font-size: 12px !important;
}

/deep/ .table-box table thead th {
  padding: 10px 0 !important;
  background: #EDF3FE !important;
  font-size: 14px !important;
  color: #3E3E3E !important;
}
</style>