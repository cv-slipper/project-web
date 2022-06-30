<template>
  <div>
    <a-modal width='50%' :visible='visible' :footer='false' @cancel='cancel'>
      <div slot='title' style='display: flex;align-items: center'>
        <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
        <span class='ml-10'>作业详情</span>
      </div>
      <a-spin v-if='detailLoading' />
      <div v-else>
        <ul>

          <li v-for='(item,index) in labelList' :key='index'>
            <span class='label'>{{ item.label }}</span>
            <span class='content'>{{ getValue(item.value) }}</span>
          </li>
          <li style='display:block'>
            <div>失败原因/等待原因：</div>
            <div>
             {{getValue('reason')}}</a-input>
            </div>
          </li>
        </ul>
        <div class='buttons mt-20'>
          <template v-if='!getUserRole()'>
          <a-button class='ml-10' disabled v-if='judgeBtnPermission("pausedStatusList")'>
            <a-icon type='pause' style='font-size:14px' />
            暂停
          </a-button>
          <a-button v-else class='ml-10 warning-btn' @click='confirm("pause","暂停")'>
            <a-icon type='pause' style='font-size:14px' />
            暂停
          </a-button>
          <a-button class='ml-10 ' disabled v-if='judgeBtnPermission("playStatusList")'>
            <a-icon type='caret-right' />
            继续
          </a-button>
          <a-button v-else class='ml-10 success-btn' @click='confirm("play","继续")'>
            <a-icon type='caret-right' />
            继续
          </a-button>
          <a-button class='ml-10' disabled v-if='judgeBtnPermission("stopStatusList")'>
            <a-icon type='stop' />
            终止
          </a-button>
          <a-button v-else class='ml-10 error-btn' @click='confirm("stop","终止") '>
            <a-icon type='stop' />
            终止
          </a-button>
          </template>
          <a-button type='link' @click='lookEvent'>查看作业相关事件</a-button>
<!--          <a-button type='link'>查看作业日志</a-button>-->
<!--          <a-button type='link'>查看RMAN日志</a-button>-->
        </div>
        <work-event-list-modal
          :visible='eventListVisible'
          @cancel='eventListVisible=false'
          :detail-item='detail'></work-event-list-modal>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { getWorkDetail, pauseWork, playWork, stopWork } from '@/api/modules/workcontrol/index.js'
import WorkEventListModal from '@views/backup/workcontrol/components/modal/WorkEventListModal'
import {determineUserMinxin} from '@/mixins/DetermineUserMinxin'

export default {
  components: {
    WorkEventListModal
  },
  mixins:[determineUserMinxin],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    labelList: {
      type: Array,
      default: () => [
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
      ]
    },
    id: {
      type: String | Number,
      default: ''
    },
    domain: {
      type: String,
      default: ''
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.getWorkDetail()
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      eventListVisible: false,
      detailItem: {},
      detail: {},
      detailLoading: false,
      pausedStatusList: ['Running', 'Waiting', 'Queued', 'Pending'],
      playStatusList: ['Suspended', 'Pending'],
      stopStatusList: ['Running', 'Waiting', 'Queued', 'Pending', 'Suspended', 'Suspend']
    }
  },
  methods: {
    /**
     * 暂停作业
     */
    async pauseWork() {
      try {
        let params = {
          domain: this.detail.domain=='分行域'?'branch':'prod',
          jobIds: this.id
        }
        let res = await pauseWork(params)
        if (res.code == 200) {
          this.$message.success('暂停作业成功')
          this.getWorkDetail()
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.$message.error('暂停作业失败')
      }
    },
    /**
     * 继续作业
     */
    async playWork() {
      try {
        let params = {
          domain: this.detail.domain=='分行域'?'branch':'prod',
          jobIds: this.id
        }
        let res = await playWork(params)
        if (res.code == 200) {
          this.$message.success('恢复作业成功')
          this.getWorkDetail()
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.$message.error('恢复作业失败')
      }
    },
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
    /**
     * 获取作业详情
     */
    async getWorkDetail() {
      this.detailLoading = true
      try {
        let res = await getWorkDetail({ jobId: this.id, domain: this.domain })
        if (res.code == 200) {
          let dateTime = res.result.jobStartTime?new Date(res.result.jobStartTime):''
          res.result.jobStartTime = dateTime?this.dateFormat(dateTime):''
          res.result.duration=res.result.duration*360+'秒'
          console.log(res.result)
          this.detail = res.result
        } else {
          this.detail = {}
          this.$message.error(res.message)
        }
      } catch {
        this.$message.error('获取作业详情失败')
      } finally {
        this.detailLoading = false
        this.$forceUpdate()
        console.log(this.detailLoading, 'this.detailLoading')
      }
    },
    /**
     * 终止作业
     */
    async stopWork() {
      try {
        let params = {
          domain: this.detail.domain=='分行域'?'branch':'prod',
          jobIds: this.id
        }
        let res = await stopWork(params)
        if (res.code == 200) {
          this.$message.success('终止作业成功')
          this.getWorkDetail()
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.$message.error('终止作业失败')
      }
    },
    /**
     * 判断按钮权限
     */
    judgeBtnPermission(key) {
      let isTrue = true
      if (Object.keys(this.detail).length > 0) {
        isTrue = !this[key].includes(this.detail.state)
      }
      return isTrue
    },
    /**
     * 确认方法
     */
    confirm(type, text) {
      this.$confirm(
        {
          title: '提示',
          content: '确认' + text + '作业?',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          onOk: () => {
            switch (type) {
              case 'pause':
                this.pauseWork()
                break
              case 'play':
                this.playWork()
                break
              case 'stop':
                this.stopWork()
                break
            }
          }
        }
      )

    },
    getValue(key) {
      let value = ''
      try {
        if (this.detail[key]) {
          value = this.detail[key]
        } else {
          value = ''
        }
      } catch (e) {
        value = ''
      }
      return value
    },
    cancel() {
      this.$emit('cancel')
    },
    lookEvent() {
      this.eventListVisible = true
    }
  }
}
</script>
<style scoped lang='less'>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 80%;
  margin: 0 auto;

  li {
    display: flex;
    align-items: center;
    margin-top: 10px;

    span {
      width: 50%;
      display: block;
      float: left;
      text-align: left;
    }

    .content {
      color: #666666;
    }
  }
}

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

.buttons {
  width: 80%;
  margin: 20px auto;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
}
</style>