<template>
  <div>
    <div class='searchParams flex-between flex-center'>
      <div class='form-item'>
        <div class='label'>备份域：</div>
        <div class='content'>
          <a-select style='width:150px' v-model='domain'>
            <a-select-option v-for='item in domainList' :value='item.id' :key='item.id'>{{ item.name }}
            </a-select-option>
          </a-select>
        </div>
        <div class='label ml-20'>作业状态：</div>
        <div class='content'>
          <a-select v-model='state' mode='multiple' style='width:150px' show-search :filter-option='filterOption'>
            <a-select-option v-for='item in statusList' :value='item.id' :key='item.id'>
              {{ item.name }}
            </a-select-option>
          </a-select>
        </div>
        <div v-if='domain=="branch"' class='label ml-20'>所属分行：</div>
        <div v-if='domain=="branch"' class='content'>
          <branch-search v-model='branchId'></branch-search>
        </div>
        <div class='label ml-20'>
          <a-button type='primary' @click='search'>查询</a-button>
        </div>
      </div>
      <div class='update-time'>
        <span>更新时间：{{ updateTime }}</span>
        <a-button class='ml-10' @click='refreshWork' type='primary'>
          <a-icon type='undo' />
          刷新
        </a-button>
      </div>

    </div>
    <div class='table-box mt-20'>
      <div class='searchParams' v-if='!getUserRole()'>
        <div class='fl'>
          <a-checkbox-group @change='jobTypeChange' :value='jobType' :options='workCheckOpt'></a-checkbox-group>
        </div>
        <div class='fr'>
          <a-button v-if='judgeStatus("pausedStatusList")' class='ml-10' disabled>
            <a-icon type='pause' style='font-size:14px' />
            暂停
          </a-button>
          <a-popconfirm
            v-else
            title='确认要暂停所选作业吗？'
            :visible='pausedVisible'
            ok-text='是的'
            cancel-text='取消'
            @visibleChange='handleVisibleChange($event,"pausedVisible")'
            @confirm='pauseWork'
          >
            <a-button class='ml-10 warning-btn'>
              <a-icon type='pause' style='font-size:14px' />
              暂停
            </a-button>
          </a-popconfirm>
          <a-button v-if='judgeStatus("playStatusList")' class='ml-10' disabled>
            <a-icon type='caret-right' />
            继续
          </a-button>
          <a-popconfirm
            v-else
            title='确认要恢复所选作业吗？'
            ok-text='是的'
            :visible='playVisible'
            @visibleChange='handleVisibleChange($event,"playVisible")'
            cancel-text='取消'
            @confirm='playWork'>
            <a-button class='ml-10 success-btn'>
              <a-icon type='caret-right' />
              继续
            </a-button>
          </a-popconfirm>
          <a-button v-if='judgeStatus("stopStatusList")' class='ml-10 ' disabled>
            <a-icon type='stop' />
            终止
          </a-button>
          <a-popconfirm
            v-else
            :visible='stopVisible'
            @visibleChange='handleVisibleChange($event,"stopVisible")'
            title='确认要终止所选作业吗？'
            ok-text='是的'
            cancel-text='取消'
            @confirm='stopWork'
          >
            <a-button class='ml-10 error-btn'>
              <a-icon type='stop' />
              终止
            </a-button>
          </a-popconfirm>


        </div>
        <div style='clear:both'></div>
      </div>
      <div style='height: 20px' v-else></div>
      <div style='padding:0 20px;background:white'>
        <a-table
          :columns='columns'
          :data-source='dataSource'
          :loading='loading'
          row-key='jobId'
          bordered
          :row-selection='{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }'
          :pagination='pagination'
          :scroll='{x:"100%"}'
          @change='onPaginationChange'
          :components='drag(columns)'
        >
          <template #action='row'>
            <div class='flex-center' style='justify-content: space-around'>
              <a-button type='link' @click='openInfoModal(row)'>详情</a-button>
            </div>
          </template>
          <template #rate='row'>
            <a-progress v-if='row' type='circle' :percent='row' :width='50' />
          </template>
          <template #client='row'>
            <div class='text-ellipsis'>
              <a-tooltip :title='row' arrowPointAtCenter>
                <div class='text-ellipsis'>
                  {{ row }}
                </div>
              </a-tooltip>
            </div>

          </template>
          <template #applicationSystem='row'>
            <div class='text-ellipsis'>
              <a-tooltip :title='row' arrowPointAtCenter>
                <div class='text-ellipsis'>{{ row }}</div>
              </a-tooltip>

            </div>
          </template>
          <template #rate='data'>
            <a-progress type='circle' :percent='data' :width='40' />
          </template>
        </a-table>
      </div>
    </div>
    <work-control-info-modal
      @cancel='workInfoVisible = false'
      :visible='workInfoVisible'
      :id='rowId'
      :domain='rowDomain'
      :label-list='labelList'></work-control-info-modal>

  </div>
</template>

<script>
import BranchSearch from '@comp/searchParms/BranchSearch'
import { getWorkList, pauseWork, playWork, refreshWork, stopWork } from '@api/modules/workcontrol/index'
import WorkControlInfoModal from '@views/backup/workcontrol/components/modal/WorkControlInfoModal'
import { determineUserMinxin } from '@/mixins/DetermineUserMinxin'
import tableDragResize from '@/mixins/TableDragResize'

export default {
  name: 'index',
  components: {
    BranchSearch,
    WorkControlInfoModal
  },
  mixins: [determineUserMinxin, tableDragResize],
  data() {
    return {

      pausedStatusList: ['Running', 'Waiting', 'Queued', 'Pending'],
      playStatusList: ['Suspended', 'Pending'],
      stopStatusList: ['Running', 'Waiting', 'Queued', 'Pending', 'Suspended', 'Suspend'],
      pausedVisible: false,
      playVisible: false,
      stopVisible: false,
      workInfoVisible: false,
      rowId: '',
      rowDomain: '',
      labelList: [
        {
          label: '作业ID：',
          value: 'jobId'
        },
        {
          label: '操作类型：',
          value: 'type'
        },
        {
          label: '备份域：',
          value: 'domain'
        },
        {
          label: '相关应用系统/分行：',
          value: 'applicationSystem'
        },
        {
          label: '客户端：',
          value: 'client'
        },
        {
          label: '代理类型：',
          value: 'agentType'
        },
        {
          label: '备份集：',
          value: 'backupSetName'
        },
        {
          label: '子客户端：',
          value: 'subclientName'
        },
        {
          label: 'Instance：',
          value: 'instanceName'
        },
        {
          label: '作业类型：',
          value: 'jobType'
        },
        {
          label: '阶段：',
          value: 'currentPhaseName'
        },
        {
          label: '开始时间：',
          value: 'jobStartTime'
        },
        {
          label: '经过时长：',
          value: 'duration'
        },
        {
          label: '存储策略：',
          value: 'storagePolicyName'
        },
        {
          label: '应用程序大小：',
          value: 'sizeOfApplication'
        },
        {
          label: '数据写入量：',
          value: 'dataWritten'
        },
        {
          label: '介质服务器：',
          value: 'mediaAgentName'
        },
        {
          label: '状态：',
          value: 'state'
        }
      ],
      selectedRowKeys: [],
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center',
          key: 'index',
          customRender: (text, row, index) => {
            return index + 1
          }
        },
        {
          title: '作业ID',
          key: 'jobId',
          dataIndex: 'jobId',
          width: 100,
          align: 'center'

        },
        {
          title: '操作类型',
          key: 'type',
          dataIndex: 'type',
          width: 200,
          align: 'center'
        },
        {
          title: '备份域',
          key: 'domain',
          dataIndex: 'domain',
          width: 100,
          align: 'center'
        },
        {
          title: '所属应用系统/分行',
          key: 'applicationSystem',
          dataIndex: 'applicationSystem',
          width: 150,
          align: 'center',
          scopedSlots: {
            customRender: 'applicationSystem'
          }
        },
        {
          title: '客户端',
          key: 'client',
          dataIndex: 'client',
          width: 100,
          align: 'center',
          scopedSlots: {
            customRender: 'client'
          }
        },
        {
          title: '代理类型',
          key: 'agentType',
          dataIndex: 'agentType',
          width: 150,
          align: 'center'
        },
        {
          title: '子客户端',
          key: 'subclientName',
          width: 100,
          align: 'center',
          dataIndex: 'subclientName'
        },
        {
          title: '作业类型',
          key: 'jobType',
          dataIndex: 'jobType',
          width: 100,
          align: 'center'
        },
        {
          title: '阶段',
          key: 'currentPhase',
          dataIndex: 'currentPhase',
          width: 80,
          align: 'center'
        },
        {
          title: '状态',
          key: 'state',
          dataIndex: 'state',
          width: 200,
          align: 'center'
        },
        {
          title: '进度',
          key: 'percentComplete',
          dataIndex: 'percentComplete',
          width: 100,
          align: 'center',
          scopedSlots: {
            customRender: 'rate'
          }

        },
        {
          title: '操作',
          key: 'action',
          width: 80,
          align: 'center',
          fixed: 'right',
          scopedSlots: {
            customRender: 'action'
          }

        }

      ],
      dataSource: [],
      loading: false,
      workCheckOpt: [
        {
          label: '备份作业',
          value: 'Backup'
        },
        {
          label: '恢复作业',
          value: 'Restore'
        },
        {
          label: '管理作业',
          value: 'Others'
        }
      ],
      domainList: [
        {
          id: 'prod',
          name: '生产域'
        },
        {
          id: 'branch',
          name: '分行域'
        }
      ],
      statusList: [
        {
          id: 'Running',
          name: '运行'
        },
        {
          id: 'Waiting,Queued',
          name: '等待'
        },
        {
          id: 'Pending',
          name: '未决'
        },
        {
          id: 'Suspend,Suspended',
          name: '暂停'
        },
        {
          id: 'Completed,Completed w/ one or more errors,Completed w/ one or more warnings',
          name: '完成'
        },
        {
          id: 'Failed',
          name: '失败'
        }
      ],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: (total, range) => `共 ${total} 条`
      },
      domain: 'prod',
      jobType: ['Backup', 'Restore', 'Others'],
      branchId: [],
      state: [],
      updateTime: '',
      selectedRows: [],
      timer: null
    }
  },
  /**
   * 监听路由变化
   */
  watch: {
    '$route'(to, from) {
      if (Object.keys(this.$route.params).length == 0) {
        this.domain = 'prod'
        this.state = []
      } else {
        this.domain = this.$route.params.domain
        this.state = this.$route.params.state == '' ? [] : [this.$route.params.state]
        this.branchId = this.$route.params.branchId == '' ? [] : [{ id: this.$route.params.branchId }]
      }
      this.getWorkList()
    }

  },
  created() {
    if (Object.keys(this.$route.params).length == 0) {
      this.domain = 'prod'
      this.state = []
    } else {
      this.domain = this.$route.params.domain
      this.state = this.$route.params.state == '' ? [] : [this.$route.params.state]
      this.branchId = this.$route.params.branchId == '' ? [] : [{ id: this.$route.params.branchId }]
    }
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.getWorkList()
    this.timer = setInterval(() => {
      this.refreshWork()
    }, 600000)

  },
  methods: {
    /**
     * 刷新作业
     */
    async refreshWork() {
      try {
        const res = await refreshWork({ domain: this.domain })
        if (res.code === 200) {
          console.log(res, 'res')
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {

      } finally {
        setTimeout(() => {
          this.getWorkList()
        }, 3000)
      }
    },
    /**
     * 获取列表数据
     */
    async getWorkList() {
      this.loading = true
      this.selectedRowKeys = []
      this.selectedRows = []
      try {
        let params = {
          current: this.pagination.current,
          pageSize: this.pagination.pageSize,
          jobType: this.jobType.join(','),
          state: this.state.join(','),
          branchId: this.domain == 'branch' ? this.branchId.map(item => item.id).join(',') : '',
          domain: this.domain
        }
        let res = await getWorkList(params)
        if (res.code === 200) {
          this.dataSource = res.result.list || []
          this.pagination.total = res.result.totalSize || 0
          this.updateTime = this.dateFormat(res.timestamp)
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        console.log(e, 'error')
        this.$message.error('获取作业列表失败')
      } finally {
        this.loading = false
      }

    },
    /**
     * 暂停任务
     */
    async pauseWork() {
      if (this.selectedRowKeys.length == 0) {
        this.$message.warning('请选择作业')
        return
      } else {
        try {
          let res = await pauseWork({
            domain: this.domain,
            jobIds: this.selectedRowKeys.join(',')
          })
          if (res.code == 200) {
            this.$message.success('暂停成功')
            this.getWorkList()
          } else {
            this.$message.error(res.message)
          }
        } catch (e) {
          this.$message.error('请求失败')
        } finally {
        }
      }
    },
    /**
     * 恢复任务
     */
    async playWork() {
      if (this.selectedRowKeys.length == 0) {
        this.$message.warning('请选择作业')
        return
      } else {
        try {
          let res = await playWork({
            domain: this.domain,
            jobIds: this.selectedRowKeys.join(',')
          })
          if (res.code == 200) {
            this.$message.success('恢复成功')
            this.getWorkList()
          } else {
            this.$message.error(res.message)
          }
        } catch (e) {
          this.$message.error('请求失败')
        } finally {

        }
      }
    },
    /**
     * 终止任务
     * @param val
     */
    async stopWork() {
      if (this.selectedRowKeys.length == 0) {
        this.$message.warning('请选择作业')
        return
      } else {
        try {
          let res = await stopWork({
            domain: this.domain,
            jobIds: this.selectedRowKeys.join(',')
          })
          if (res.code == 200) {
            this.$message.success('恢复成功')
            this.getWorkList()
          } else {
            this.$message.error(res.message)
          }
        } catch (e) {
          this.$message.error('请求失败')
        } finally {

        }
      }
    },
    /**
     *  判断按钮状态
     */
    judgeStatus(key) {
      let isDisabled = true
      if (this.selectedRows.length > 0) {
        let nowStatusList = this.selectedRows.map(item => item.state)
        isDisabled = !nowStatusList.every(item => this[key].findIndex(ele => ele == item) != -1)
      }
      return isDisabled
    },
    /**
     * 打开详情弹窗
     */
    openInfoModal(row) {
      this.rowDomain = row.domain
      this.rowId = row.jobId
      this.workInfoVisible = true
    },
    jobTypeChange(val) {
      this.jobType = val
      this.getWorkList()
    },
    onSelectChange(selectedRowKeys, selectedRows) {

      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    /**
     * 搜索
     */
    async search() {
      console.log(this.state, 'state')
      this.pagination.current = 1
      this.getWorkList()
    },
    /**
     * 分页
     * @param {Number} current 当前页
     * @param {Number} pageSize 每页条数
     */
    onPaginationChange(page) {
      this.pagination.current = page.current
      this.pagination.pageSize = page.pageSize
      this.getWorkList()
    },
    /**
     * 时间格式化 补零
     * @param {String} date 时间
     */
    dateFormat(dateTime) {
      let date = new Date(dateTime)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
    },
    handleVisibleChange(val, key) {
      this.stopVisible = false
      this.pausedVisible = false
      this.playVisible = false
      if (!val) {
        this[key] = false
      } else {
        if (this.selectedRowKeys.length == 0) {
          this.$message.warning('请选择作业')
          this[key] = false
        } else {
          this[key] = true
        }
      }
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
<style scoped>
.warning-btn {
  background: #e6a23c !important;
  border-color: #e6a23c !important;
  color: white;
  font-size: 14px;
}

.success-btn {
  background: #67c23a;
  border-color: #67c23a;
  color: white;
}

.error-btn {
  background: #f56c6c;
  border-color: #f56c6c;
  color: white;
}

.update-time {
  color: #666666;
  font-size: 12px;
}

.table-box {
  background: white;
}

/deep/ .table-box table thead th {
  background: #EDF3FE !important;
  font-size: 14px !important;
  color: #3E3E3E !important;
}
</style>