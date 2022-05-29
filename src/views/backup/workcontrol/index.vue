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
        <a-button class='ml-10' @click='getWorkList' type='primary'>
          <a-icon type='undo' />
          刷新
        </a-button>
      </div>

    </div>
    <div class='table-box mt-20'>
      <div class='searchParams'>
        <div class='fl'>
          <a-checkbox-group @change='jobTypeChange' :value='jobType' :options='workCheckOpt'></a-checkbox-group>
        </div>
        <div class='fr'>
          <a-popconfirm
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

          <a-popconfirm
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

          <a-popconfirm
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

      <div style='padding:0 20px;background:white'>
        <a-table
          :columns='columns'
          :data-source='dataSource'
          :loading='loading'
          row-key='id'
          :row-selection='{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }'
          :pagination='pagination'
          :scroll='{x:"100%"}'
          @change='onPaginationChange'
        >
          <template #action='row'>
            <div class='flex-center' style='justify-content: space-around'>
              <a-button type='link' @click='openInfoModal(row)'>详情</a-button>
            </div>
          </template>
        </a-table>
      </div>
    </div>
    <work-control-info-modal @cancel='workInfoVisible = false' :visible='workInfoVisible' :id='rowId'
                             :label-list='labelList'></work-control-info-modal>
  </div>
</template>

<script>
import BranchSearch from '@comp/searchParms/BranchSearch'
import { getWorkList, pauseWork, playWork, stopWork } from '@api/modules/workcontrol/index'
import WorkControlInfoModal from '@views/backup/workcontrol/components/modal/WorkControlInfoModal'

export default {
  name: 'index',
  components: {
    BranchSearch,
    WorkControlInfoModal
  },
  data() {
    return {
      pausedVisible: false,
      playVisible: false,
      stopVisible: false,
      workInfoVisible: false,
      rowId: '',
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
          value: 'none'
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
          label: '状态：',
          value: 'state'
        },
        {
          label: '失败原因/等待原因：',
          value: 'none'
        }
      ],
      selectedRowKeys: [],
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center',
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
          align: 'center'
        },
        {
          title: '客户端',
          key: 'client',
          dataIndex: 'client',
          width: 100,
          align: 'center'
        },
        {
          title: '代理类型',
          key: 'agentType',
          dataIndex: 'agentType',
          width: 100,
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
          title: '介质服务器',
          key: 'mediaAgent',
          dataIndex: 'mediaAgent',
          width: 150,
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
          key: 'rate',
          dataIndex: 'rate',
          width: 100,
          align: 'center'

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
          name: 'Running'
        },
        {
          id: 'Waiting',
          name: 'Waiting'
        },
        {
          id: 'Pending',
          name: 'Pending'
        },
        {
          id: 'Suspend',
          name: 'Suspend'
        },
        {
          id: 'Kill Pending',
          name: 'Kill Pending'
        },
        {
          id: 'Interrupt Pending',
          name: 'Interrupt Pending'
        },
        {
          id: 'Interrupted',
          name: 'Interrupted'
        },
        {
          id: 'Queued',
          name: 'Queued'
        },
        {
          id: 'Running (cannot be verified)',
          name: 'Running (cannot be verified)'
        },
        {
          id: 'Abnormal Terminated Cleanup',
          name: 'Abnormal Terminated Cleanup'
        },

        {
          id: 'Suspended',
          name: 'Suspended'
        },
        {
          id: 'Completed',
          name: 'Completed'
        },
        {
          id: 'Completed w/ one or more errors',
          name: 'Completed w/ one or more errors'
        },
        {
          id: 'Completed w/ one or more warnings',
          name: 'Completed w/ one or more warnings'
        },
        {
          id: 'Committed',
          name: 'Committed'
        },

        {
          id: 'Failed',
          name: 'Failed'
        },
        {
          id: 'Failed to Start',
          name: 'Failed to Start'
        },
        {
          id: 'Killed',
          name: 'Killed'
        }
      ],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      domain: 'prod',
      jobType: [],
      branchId: [],
      state: [],
      updateTime: ''
    }
  },
  created() {
    if (Object.keys(this.$route.query).length == 0) {
      this.domain = 'prod'
      this.state = []
    } else {
      this.domain = this.$route.query.domain
      this.state = this.$route.query.state == '' ? [] : [this.$route.query.state]
    }
    this.getWorkList()
  },
  methods: {
    /**
     * 获取列表数据
     */
    async getWorkList() {
      this.loading = true
      this.selectedRowKeys = []
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
        } finally {

        }
      }
    },
    /**
     * 打开详情弹窗
     */
    openInfoModal(row) {
      this.rowId = row.jobId
      this.workInfoVisible = true
    },
    jobTypeChange(val) {
      this.jobType = val
      this.getWorkList()
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
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