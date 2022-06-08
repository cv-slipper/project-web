<template>
  <div>
    <div class='searchParams'>
      <div class='form-item'>
        <div class='label ml-5'>异常类型：</div>
        <div class='content ml-5'>
          <a-select style='width:100px' mode='multiple' :filter-option='filterOption'>
            <a-select-option v-for='item in exceptionTypeList' :value='item.value' :key='item.value'>{{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>严重程度：</div>
        <div class='content ml-5'>
          <a-select style='width:100px' mode='multiple' :filter-option='filterOption'>
            <a-select-option v-for='item in severityList' :value='item.value' :key='item.value'>{{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>备份域：</div>
        <div class='content ml-5'>
          <a-select style='width:90px' v-model='domain'>
            <a-select-option v-for='item in domainList' :value='item.value' :key='item.value'>{{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>{{ domain == 'prod' ? '应用系统：' : '分行：' }}</div>
        <div class='content ml-5'>
          <a-select style='width:140px' mode='multiple' :filter-option='filterOption'>
            <a-select-option v-for='item in branchList' :value='item.id' :key='item.id'>{{ item.abbreviation }}
            </a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>处理状态：</div>
        <div class='content ml-5'>
          <a-select style='width:100px' mode='multiple' :filter-option='filterOption'>
            <a-select-option v-for='item in processStatusList' :value='item.value' :key='item.value'>{{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>处理人：</div>
        <div class='content ml-5'>
          <a-select style='width:100px' mode='multiple' :filter-option='filterOption'>
            <a-select-option v-for='item in processUserList' :value='item.value' :key='item.value'>{{ item.label }}
            </a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <div class='searchParams'>
      <div class='form-item'>
        <div class='label'>异常发生时间：</div>
        <div class='content'>
          <a-range-picker
            :show-time="{ format: 'HH:mm',defaultValue: [moment('00:00', 'HH:mm'), moment('23:59', 'HH:mm')] }"
            format='YYYY-MM-DD HH:mm'></a-range-picker>
        </div>
        <div class='label ml-10'>处理时间：</div>
        <div class='content'>
          <a-range-picker
            :show-time="{ format: 'HH:mm',defaultValue: [moment('00:00', 'HH:mm'), moment('23:59', 'HH:mm')] }"
            format='YYYY-MM-DD HH:mm'></a-range-picker>
        </div>
        <a-button type='primary ml-10' @click='search'>查询</a-button>
      </div>
    </div>
    <div class='searchParams'>
      <div class='form-item'>
        <div class='label'>
          <a-button type='primary'>导出</a-button>
        </div>
      </div>
    </div>
    <div class='table-box' style='padding:0px 20px'>
      <a-table
        :data-source='tableData'
        :columns='columns'
        :loading='loading'
        :pagination='pagination'
        :scroll='{x:"100%"}'
        @change='tableChange'
      >
        <template #action='row'>
          <div>
            <a-button type='link'>详情</a-button>
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
  </div>
</template>
<script>
import {
  getExceptionPage,
  getSystemListByBranch,
  getBranchList
} from '@api/modules/dashboard/analysis.js'
import moment from 'moment'

export default {
  data() {
    return {
      moment,
      processUserList: [],
      exceptionTypeList: [
        {
          value: '异常作业',
          label: '异常作业'
        },
        {
          value: '异常事件',
          label: '异常事件'
        }
      ],
      severityList: [
        {
          value: 'Failed',
          label: '关键'
        },
        {
          value: 'Complete with error/Pending',
          label: '重要'
        },
        {
          value: 'Complete with waring',
          label: '一般'
        }
      ],
      domainList: [
        {
          value: 'prod',
          label: '生产域'
        },
        {
          value: 'branch',
          label: '分行域'
        }
      ],
      branchList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '系统'
        },
        {
          value: '2',
          label: '业务'
        }
      ],
      processStatusList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '未处理'
        },
        {
          value: '2',
          label: '已处理'
        }
      ],
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center',
          customRender: (text, row, index) => {
            return index + 1
          }
        },
        {
          title: '异常ID',
          key: 'id',
          dataIndex: 'id',
          align: 'center',
          width: 100,
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
          align: 'center',
          width: 100
        },
        {
          title: '应用系统／分行',
          key: 'appSystemName',
          dataIndex: 'appSystemName',
          align: 'center',
          width: 200,
          scopedSlots: {
            customRender: 'tooltip'
          }
        },
        {
          title: '发生时间',
          key: 'occurrenceTime',
          dataIndex: 'occurrenceTime',
          align: 'center',
          width: 200,
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
        },
        {
          title: '描述',
          key: 'description',
          dataIndex: 'description',
          align: 'center',
          width: 200,
          scopedSlots: {
            customRender: 'tooltip'
          }
        },
        {
          title: '处理状态',
          key: 'processStatus',
          dataIndex: 'processStatus',
          align: 'center',
          width: 100
        },
        {
          title: '处理人',
          key: 'handledUser',
          dataIndex: 'handledUser',
          align: 'center',
          width: 100
        },
        {
          title: '处理内容',
          key: 'handledDesc',
          dataIndex: 'handledDesc',
          align: 'center',
          width: 200,
          scopedSlots: {
            customRender: 'tooltip'
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 100,
          fixed: 'right',
          scopedSlots: {
            customRender: 'action'
          }
        }

      ],
      tableData: [],
      loading: false,
      domain: 'prod',
      systemIds: [],
      exceptionTypes: [],
      severities: [],
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0,
        showTotal: total => {
          return `共 ${total} 条`
        }
      }
    }
  },
  watch: {
    domain: {
      immediate: true,
      handler(val) {
        if (val == 'prod') {
          this.getSystemListByBranch()

        } else {
          this.getBranchList()

        }
      }
    }
  },
  created() {
    this.getExceptionPage()
    if (this.domain == 'prod') {
      this.columns[4].title = '应用系统'
    } else {
      this.columns[4].title = '分行'
    }
  },
  methods: {
    /**
     * 获取系统列表
     */
    async getSystemListByBranch() {
      try {
        const res = await getSystemListByBranch()
        if (res.code == 200) {
          this.branchList = res.result
        } else {
          this.$message.error(res.message)
          this.branchList = []
        }
      } catch (e) {
        this.branchList = []
      }
    },
    /**
     * 获取分行列表
     */
    async getBranchList() {
      try {
        const res = await getBranchList()
        if (res.code == 200) {
          this.branchList = res.result
        } else {
          this.$message.error(res.message)
          this.branchList = []
        }
      } catch (e) {
        this.branchList = []
      }
    },
    /**
     * 获取异常信息列表
     */
    async getExceptionPage() {
      try {
        this.loading = true
        const res = await getExceptionPage({
          current: this.pagination.current,
          pageSize: this.pagination.pageSize,
          domain: this.domain,
          appSystemId: this.domain == 'prod' ? this.systemIds.join(',') : '',
          branchId: this.domain == 'branch' ? this.systemIds.join(',') : '',
          exceptionType: this.exceptionTypes.join(','),
          state: this.severities.join(','),
          handle: 1
        })
        if (res.code == 200) {
          this.tableData = res.result.list || []
          this.pagination.total = res.result.totalSize
        } else {
          this.$message.error(res.message)
        }

      } catch (e) {
        console.log(e)
        this.$message.error('获取失败')
      } finally {
        this.loading = false
      }
    },
    tableChange(page) {
      this.pagination.current = page.current
      this.getExceptionPage()
    },
    /**
     *搜索
     */
    search() {
      if (this.domain == 'prod') {
        this.columns[4].title = '应用系统'
      } else {
        this.columns[4].title = '分行'
      }
      this.pagination.current = 1
      this.getExceptionPage()
    },
    /**
     * 过滤分行
     */
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.indexOf(input) >= 0
      )
    }
  }
}
</script>
<style scoped lang='less'>
.table-box {
  background: white;
}
</style>