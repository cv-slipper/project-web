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
          <a-select mode='multiple' v-model='exceptionTypes' style='width:100px'>
            <a-select-option v-for='item in types' :key='item.value' :value='item.value'
            >{{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>严重程度：</div>
        <div class='content'>
          <a-select mode='multiple' v-model='severities' style='width:100px'>
            <a-select-option v-for='item in levels' :key='item.value' :value='item.value'
            >{{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>备份域：</div>
        <div class='content'>
          <a-select v-model='searchParams.domain' style='width:100px' @change='domainChange'>
            <a-select-option
              v-for='(item,index) in backupDomains'
              :key='index'
              :value='item.id'
            >{{ item.name }}
            </a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>{{ searchParams.domain == 'prod' ? '应用系统：' : '分行：' }}</div>
        <div class='content'>
          <a-select mode='multiple' :filter-option='filterOption' v-model='searchParams.system' style='width:150px'>
            <a-select-option
              v-for='(item,index) in systems'
              :key='index'
              :value='item.id'
            >{{ item.abbreviation }}
            </a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>关联客户端：</div>
        <div class='content ml-10'>
          <a-select v-model='clientIds' mode='multiple' style='width:100px'>
            <a-select-option v-for='(item,index) in getClientList()' :key='index' :value='item.value'>{{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>数据中心：</div>
        <div class='content ml-10'>
          <a-select style='width:150px' v-model='dataCenters' mode='multiple' :filter-option='filterOption'>
            <a-select-option v-for='(item,index) in dataCenterList' :key='index' :value='item.id'>{{
                item.label
              }}
            </a-select-option>
          </a-select>
        </div>
        <div class='label ml-10'>机房：</div>
        <div class='content ml-10'>
          <a-select style='width:100px' v-model='rooms' mode='multiple' :filter-option='filterOption'>
            <a-select-option v-for='(item,index) in roomList' :key='index' :value='item.id'>{{
                item.name
              }}
            </a-select-option>
          </a-select>
        </div>
        <div class='label ml-10 '>
          <a-button type='primary' @click='search'>查询</a-button>
        </div>
      </div>
    </div>
    <div class='searchParams flex-between'>
      <div></div>
      <div>
        <a-button type='link' @click='dealWith("1")'>批量处理</a-button>
        <a-button type='link' @click='dealWith("2")'>批量忽略</a-button>
      </div>
    </div>
    <div class='table-box'>
      <a-table
        :columns='columns'
        :data-source='data'
        :loading='loading'
        :bordered='true'
        :scroll='{x:"100%"}'
        rowKey='id'
        :pagination='pagination'
        @change='tableChange'
        :row-selection='{selectedRowKeys,onChange:rowSelectionChange,columnWidth:30}'

      >
        >
        <template #action='row'>
          <div class=''>
            <span style='color:#1890FF;cursor:pointer' class='fl' type='link' @click='goToInfo(row)'>详情</span>
            <span style='color:#1890FF;cursor:pointer' class='fl ml-5' type='link' @click='rowDealWith(1,row)'>处理</span>
            <span style='color:#1890FF;cursor:pointer' class='fl ml-5' type='link' @click='rowDealWith(2,row)'>忽略</span>
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
      <deal-with-modal :visible='dealWithVisible' @cancel='dealWithVisible = false' @ok='handleOk'></deal-with-modal>
      <exception-info-modal
        @dealWithSuccess='dealWithSuccess'
        :visible='exceptionInfoVisible'
        @cancel='exceptionInfoVisible=false'
        :detail-item='detailItem'></exception-info-modal>
    </div>
  </a-modal>
</template>

<script>
import {
  getExceptionPage,
  handleException,
  getSystemListByBranch,
  getBranchList,
  getRoomInfo
} from '@api/modules/dashboard/analysis.js'
import DealWithModal from '@views/dashboard/components/modal/DealWithModal'
import BranchSearch from '@comp/searchParms/BranchSearch'
import ExceptionInfoModal from '@views/dashboard/components/modal/ExceptionInfoModal'
import tableDragResize from '@/mixins/TableDragResize'

export default {
  name: 'ErrorMessageModal',
  mixins: [tableDragResize],
  components: {
    DealWithModal,
    BranchSearch,
    ExceptionInfoModal
  },
  computed: {
    getDomain() {
      return this.searchParams.domain
    }
  },
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
    },
    type: {
      type: String,
      default: ''
    },
    dataName: {
      type: String,
      default: ''
    },
    roomId: {
      type: String,
      default: ''
    },
    clientId: {
      type: String | Number,
      default: ''
    },
    clientName: {
      type: String,
      default: ''
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.getRoomInfo()
        this.pagination.current = 1
        if (this.type) {
          this.searchParams.domain = this.type
          this.searchParams.system = this.id ? [this.id] : []
        } else {
          this.searchParams.domain = this.domain
          this.searchParams.system = this.id ? [this.id] : []
        }
        if (this.searchParams.domain == 'prod') {
          this.columns[3].title = '应用系统'
          this.columns[3].dataIndex = 'appSystemName'
          this.columns[3].key = 'appSystemName'
          this.getSystemListByBranch()
        } else {
          this.columns[3].title = '分行'
          this.columns[3].dataIndex = 'branchName'
          this.columns[3].key = 'branchName'
          this.getBranchList()
        }
        this.rooms = this.roomId ? [this.roomId] : []
        this.dataCenters = this.dataName ? [this.dataName] : []
        this.clientIds = this.clientId ? [this.clientId] : []
        this.getExceptionPage()
      }
    },
    domain: {
      immediate: true,
      handler(val) {
        if (this.searchParams.domain == 'prod') {
          this.columns[3].title = '应用系统'
          this.columns[3].dataIndex = 'appSystemName'
          this.columns[3].key = 'appSystemName'
          this.getSystemListByBranch()
        } else {
          this.columns[3].title = '分行'
          this.columns[3].dataIndex = 'branchName'
          this.columns[3].key = 'branchName'
          this.getBranchList()
        }
      }
    },
    getDomain: {
      immediate: false,
      handler(val) {

      }
    }
  },
  data() {
    return {
      clientIds: [],
      dataCenters: [],
      rooms: [],
      dataCenterList: [],
      roomList: [],
      exceptionInfoVisible: false,
      detailItem: {},
      severities: [],
      systems: [],
      dealWithVisible: false,
      exceptionTypes: [],
      selectedRowKeys: [],
      columns: [
        {
          title: '异常ID',
          key: 'id',
          dataIndex: 'id',
          align: 'center',
          width: 60,
          scopedSlots: {
            customRender: 'tooltip'
          }
        },
        {
          title: '严重程度',
          key: 'severity',
          dataIndex: 'severity',
          align: 'center',
          width: 60

        },
        {
          title: '备份域',
          key: 'domain',
          dataIndex: 'domain',
          width: 100,
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
          title: '相关客户端',
          key: 'associatedClient',
          dataIndex: 'associatedClient',
          align: 'center',
          width: 150
        },
        {
          title: '相关数据中心',
          key: 'dataSite',
          dataIndex: 'dataSite',
          align: 'center',
          width: 150
        },
        {
          title: '相关机房',
          key: 'machineRoom',
          dataIndex: 'machineRoom',
          align: 'center',
          width: 100
        },
        {
          title: '发生时间',
          key: 'occurrenceTime',
          dataIndex: 'occurrenceTime',
          align: 'center',
          width: 110,
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
          width: 180,
          dataIndex: 'description',
          align: 'center',
          scopedSlots: {
            customRender: 'tooltip'
          }
        }, {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 100,
          scopedSlots: {
            customRender: 'action'
          }
        }
      ],
      data: [],
      searchParams: {
        type: [],
        domain: '',
        system: []
      },
      backupDomains: [
        {
          id: 'prod',
          name: '生产域'
        },
        {
          id: 'branch',
          name: '分行域'
        }
      ],
      branchIds: [],
      types: [
        {
          value: '异常作业',
          label: '异常作业'
        },
        {
          value: '异常事件',
          label: '异常事件'
        }
      ],
      dealWithType: '',
      levels: [
        {
          value: '关键',
          label: '关键'
        },
        {
          value: '重要',
          label: '重要'
        },
        {
          value: '一般',
          label: '一般'
        }
      ],
      ids: [],
      appSystems: [],
      loading: false,
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0,
        showTotal: total => `共 ${total} 条`
      }
    }
  },
  methods: {
    /**
     *  获取数据中心视图筛选数据
     */
    async getRoomInfo() {
      try {
        const res = await getRoomInfo()
        if (res.code == 200) {
          this.dataCenterList = []
          this.roomList = []
          res.result.forEach(item => {
            this.dataCenterList.push({ id: item.siteName, label: item.siteName })
            this.roomList.push(...item.roomInfos)
          })
        } else {
          this.$message.error(res.message)
          this.dataCenterList = []
          this.roomList = []
        }
      } catch (e) {
        this.$message.error('获取数据中心及机房失败')
        this.dataCenterList = []
        this.roomList = []
      }
    },
    /**
     * 获取系统列表
     */
    async getSystemListByBranch() {
      try {
        const res = await getSystemListByBranch()
        if (res.code == 200) {
          this.systems = res.result
        } else {
          this.$message.error(res.message)
          this.systems = []
        }
      } catch (e) {
        this.$message.error('获取系统列表失败')
        this.systems = []
      }
    },
    /**
     * 获取分行列表
     */
    async getBranchList() {
      try {
        const res = await getBranchList()
        if (res.code == 200) {
          this.systems = res.result
        } else {
          this.$message.error(res.message)
          this.systems = []
        }
      } catch (e) {
        this.$message.error('获取分行列表失败')
        this.systems = []
      }
    },
    /**
     * 处理异常
     */
    async handleException(params) {
      this.loading = true
      try {
        const res = await handleException(params)
        if (res.code == 200) {
          this.$message.success('处理成功')
          this.getExceptionPage()
          this.$emit('dealWithSuccess')
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        console.log(e)
        this.$message.error('处理失败')
      } finally {
        this.loading = false
        this.dealWithVisible = false
      }
    },
    /**
     * 获取异常信息列表
     */
    async getExceptionPage() {

      try {
        if (this.searchParams.domain == 'prod') {
          this.columns[3].title = '应用系统'
          this.columns[3].dataIndex = 'appSystemName'
          this.columns[3].key = 'appSystemName'

        } else {
          this.columns[3].title = '分行'
          this.columns[3].dataIndex = 'branchName'
          this.columns[3].key = 'branchName'

        }
        this.loading = true
        const res = await getExceptionPage({
          current: this.pagination.current,
          pageSize: this.pagination.pageSize,
          domain: this.searchParams.domain,
          appSystemId: this.searchParams.domain == 'prod' ? this.searchParams.system.join(',') : '',
          branchId: this.searchParams.domain == 'branch' ? this.searchParams.system.join(',') : '',
          exceptionType: this.exceptionTypes.join(','),
          severity: this.severities.join(','),
          handled: 0,
          dataSite: this.dataCenters.join(','),
          roomId: this.rooms.join(','),
          clientId: this.clientIds.join(',')
        })
        if (res.code == 200) {
          this.data = res.result.list || []
          this.pagination.total = res.result.totalSize
        } else {
          this.$message.error(res.message)
        }

      } catch (e) {
        this.$message.error('获取失败')
      } finally {
        this.loading = false
      }
    },
    getClientList() {
      let lists = []
      if (this.clientIds.length > 0) {
        lists = [{ value: this.clientId, label: this.clientName }]
      }
      console.log(lists, 'lists')
      return lists
    },
    dealWithSuccess() {
      this.getExceptionPage()
      this.$emit('dealWithSuccess')
    },
    goToInfo(row) {
      this.detailItem = row
      this.exceptionInfoVisible = true
    },
    /**
     * 过滤分行
     */
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.indexOf(input) >= 0
      )
    },
    handleOk(reason) {
      try {
        let params = {
          ids: this.ids.join(','),
          type: this.dealWithType,
          handledDesc: reason
        }
        this.handleException(params)
      } catch (e) {

      }
    },
    domainChange(val) {
      this.searchParams.system = []
      if (this.searchParams.domain == 'prod') {
        this.getSystemListByBranch()
      } else {
        this.getBranchList()
      }
    },
    dealWith(type) {
      this.dealWithType = type
      if (this.selectedRowKeys.length == 0) {
        this.$message.warning('请选择需要处理的异常信息')
        return
      } else {
        if (type == 1) {
          this.ids = this.selectedRowKeys
          this.dealWithVisible = true
        } else {
          this.$confirm(
            {
              content: '确定要忽略选中的异常信息吗？',
              title: '提示',
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              onOk: () => {
                let params = {
                  ids: this.selectedRowKeys.join(','),
                  type: type
                }
                this.handleException(params)
              }
            })
        }
      }
    },
    rowDealWith(type, row) {
      this.dealWithType = type
      if (type == 1) {
        this.ids = [row.id]
        this.dealWithVisible = true
      } else {
        this.$confirm(
          {
            content: '确定要忽略该异常信息吗？',
            title: '提示',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            onOk: () => {
              let params = {
                ids: row.id,
                type: type
              }
              this.handleException(params)
            }
          })
      }
    },
    search() {
      if (this.searchParams.domain == 'prod') {
        this.columns[3].title = '应用系统'
      } else {
        this.columns[3].title = '分行'
      }
      this.pagination.current = 1
      this.selectedRowKeys = []
      this.getExceptionPage()
    },
    cancel() {
      this.$emit('cancel')
    },
    tableChange(pagination) {
      this.pagination.current = pagination.current
      this.getExceptionPage()
    },
    rowSelectionChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
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
<style lang='less' scoped>

::v-deep .table-draggable-handle {
  border: 1px solid red;
  height: 100% !important;
  left: auto !important;
  right: -5px;
  cursor: col-resize;
  touch-action: none;
  border: none;
  position: absolute;
  transform: none !important;
  bottom: 0;
}

::v-deep .resize-table-th {
  position: relative;
}
</style>