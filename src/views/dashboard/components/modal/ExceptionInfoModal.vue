<template>
  <div>
    <a-modal width='40%' :visible='visible' :footer='false' @cancel='cancel'>
      <div slot='title' style='display: flex;align-items: center'>
        <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
        <span class='ml-10'>{{ title }}详情</span>
      </div>
      <a-spin v-if='detailLoading' />
      <div v-else>
        <ul>
          <template v-for='(item,index) in labelList'>
            <li style='display:block' :key='index+new Date().getTime()' v-if='item.type=="textarea"'>
              <div>{{ item.label }}</div>
              <div class='mt-10' v-html='getValue(item.value)'>

              </div>
            </li>
            <li :key='index' v-else>
              <span class='label'>{{ item.label }}</span>
              <span class='content'>{{ getValue(item.value) }} </span>
            </li>

          </template>
          <a-divider>处理信息</a-divider>
          <template v-for='(item,index) in allLabel'>
            <li style='display:block' :key='index+"312"+new Date().getTime()' v-if='item.type=="textarea"'>
              <div>{{ item.label }}</div>
              <div>
                {{ getValue(item.value) }}
              </div>
            </li>
            <li :key='index+"312"+new Date().getTime()' v-else>
              <span class='label'>{{ item.label }}</span>
              <span class='content'>{{ getValue(item.value) }} </span>
            </li>

          </template>
        </ul>
        <div class='buttons mt-20'>
          <template v-if='detail.handled=="未处理"'>
            <a-button class='ml-10 warning-btn' @click='dealWithVisible = true'>
              <a-icon type='pause' style='font-size:14px' />
              处理
            </a-button>
            <a-button class='ml-10 success-btn' @click='neglect'>
              <a-icon type='caret-right' />
              忽略
            </a-button>
          </template>
          <a-button
            v-if='Object.keys(detailItem).length>0?detailItem.exceptionType!="异常事件":false'
            type='link'
            class='ml-10'
            @click='openEventListModal'>查看作业相关事件
          </a-button>
        </div>
        <deal-with-modal :visible='dealWithVisible' @cancel='dealWithVisible=false' @ok='handleOk'></deal-with-modal>
        <work-event-list-modal
          :visible='eventVisible'
          :detail-item='detailItem'
          @cancel='eventVisible=false'
        ></work-event-list-modal>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { getExceptionDetail, handleException } from '@/api/modules/dashboard/analysis'
import DealWithModal from '@views/dashboard/components/modal/DealWithModal'
import WorkEventListModal from '@views/backup/workcontrol/components/modal/WorkEventListModal'

export default {
  components: {
    DealWithModal,
    WorkEventListModal
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    detailItem: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.getExceptionDetail()
          if (this.typeList.find(item => item.label == this.detailItem.exceptionType).value == 1) {
            this.labelList = this.exceptionWorkList
            this.title = '异常作业'
          } else if (this.typeList.find(item => item.label == this.detailItem.exceptionType).value == 2) {
            this.labelList = this.exceptionEventList
            this.title = '异常事件'
          }
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      title: '',
      eventDetailItem: {},
      eventVisible: false,
      dealWithVisible: false,
      detail: {},
      detailLoading: false,
      labelList: [],
      typeList: [
        {
          value: 1,
          label: '异常作业'
        },
        {
          value: 2,
          label: '异常事件'
        }
      ],
      exceptionWorkList: [
        {
          label: '异常ID：',
          value: 'exceptionId'
        },
        {
          label: '严重程度：',
          value: 'severity'
        },
        {
          label: '异常发现时间',
          value: 'occurrenceTime'
        },
        {
          label: '备份域：',
          value: 'domain'
        },
        {
          label: '应用系统：',
          value: 'applicationSystem'
        },
        {
          label: '关联客户端',
          value: 'associatedClient'
        },
        {
          label: '相关数据中心',
          value: 'dataSite'
        },
        {
          label: '相关机房',
          value: 'machineRoom'
        },
        {
          label: '作业ID：',
          value: 'jobId'
        },
        {
          label: '操作类型：',
          value: 'type'
        },
        {
          label: '客户端：',
          value: 'clientName'
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
          label: '开始时间：',
          value: 'jobStartTime'
        },
        {
          label: '结束时间：',
          value: 'jobEndTime'
        },
        {
          label: '介质服务器：',
          value: 'mediaAgentName'
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
          label: '失败原因',
          value: 'reason',
          type: 'textarea'
        }
      ],
      exceptionEventList: [
        {
          label: '异常ID：',
          value: 'exceptionId'
        },
        {
          label: '严重程度：',
          value: 'severity'
        },
        {
          label: '异常发现时间：',
          value: 'occurrenceTime'
        },
        {
          label: '备份域：',
          value: 'domain'
        },
        {
          label: '应用系统：',
          value: 'applicationSystem'
        },
        {
          label: '关联客户端',
          value: 'associatedClient'
        },
        {
          label: '相关数据中心',
          value: 'dataSite'
        },
        {
          label: '相关机房',
          value: 'machineRoom'
        },
        {
          label: '事件ID：',
          value: 'eventId'
        },
        {
          label: '事件严重程度：',
          value: 'eventSeverity'
        },
        {
          label: '事件发生时间：',
          value: 'eventTime'
        },
        {
          label: '事件代码：',
          value: 'eventCodeString'
        },
        {
          label: '服务器：',
          value: 'clientName'

        },
        {
          label: '作业ID：',
          value: 'jobId'
        },
        {
          label: '程序：',
          value: 'subsystem'
        },
        {
          label: '事件描述：',
          value: 'eventDesc',
          type: 'textarea'
        }

      ],
      allLabel: [
        {
          label: '处理状态：',
          value: 'handled'
        },
        {
          label: '处理人：',
          value: 'handledUser'
        },
        {
          label: '处理时间：',
          value: 'handledTime'
        },
        {
          label: '处理内容：',
          value: 'handledDesc',
          type: 'textarea'
        }
      ]
    }
  },
  methods: {
    /**
     * 处理异常
     */
    async handleException(params) {

      try {
        const res = await handleException(params)
        if (res.code == 200) {
          this.$message.success('处理成功')
          this.getExceptionDetail()
          this.$emit('dealWithSuccess')
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        this.$message.error('处理失败')
      } finally {
        this.dealWithVisible = false
      }
    },
    /**
     * 获取异常详情
     */
    async getExceptionDetail() {
      this.detailLoading = true
      try {
        let type = this.typeList.find(item => item.label == this.detailItem.exceptionType).value
        let params = {
          id: this.detailItem.id,
          domain: this.detailItem.domain,
          type
        }
        if (type == 1) {
          params.jobId = this.detailItem.jobId
        } else if (type == 2) {
          params.eventId = this.detailItem.eventId
        }
        let res = await getExceptionDetail(params)
        if (res.code == 200) {
          res.result.jobStartTime = res.result.jobStartTime ? this.dateFormat(res.result.jobStartTime) : null
          res.result.jobEndTime = res.result.jobEndTime ? this.dateFormat(res.result.jobEndTime) : null
          res.result.eventTime = res.result.eventTime ? this.dateFormat(res.result.eventTime) : null

          this.detail = res.result || {}
          let systemIndex = this.labelList.findIndex(ele => ele.label.indexOf('应用系统') != -1)
          let branchIndex = this.labelList.findIndex(ele => ele.label.indexOf('分行') != -1)
          let index = systemIndex == -1 ? branchIndex : systemIndex
          this.labelList[index].label = this.detail.domain == '生产域' ? '应用系统' : '分行'
          this.labelList[index].value = this.detail.domain == '生产域' ? 'applicationSystem' : 'branchName'
        } else {
          this.detail = {}
          this.$message.error(res.message)
        }
      } catch (e) {
        this.detail = {}
        console.log(e, 'e')
      } finally {
        this.detailLoading = false
        this.$forceUpdate()
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
    neglect() {
      this.$confirm(
        {
          content: '确定要忽略当前异常信息吗？',
          title: '提示',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          onOk: () => {
            let params = {
              ids: this.detailItem.id,
              type: 2
            }
            this.handleException(params)
          }
        })

    },
    handleOk(reason) {
      let params = {
        ids: this.detailItem.id,
        type: 1,
        handledDesc: reason
      }
      this.handleException(params)
    },
    openEventListModal(row) {
      this.eventDetailItem = row
      this.eventVisible = true
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
}
</style>