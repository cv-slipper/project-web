<template>
  <div>
    <a-modal width='40%' :visible='visible' :footer='false' @cancel='cancel'>
      <div slot='title' style='display: flex;align-items: center'>
        <img src='@/assets/sclogo.png' style='width:19px;height:20px' alt='' />
        <span class='ml-10'>作业详情</span>
      </div>
      <a-spin v-if='detailLoading' />
      <div v-else>
        <ul>
          <template v-for='(item,index) in labelList'>
            <li style='display:block' :key='index+new Date().getTime()' v-if='item.type=="textarea"'>
              <div>{{ item.label }}</div>
              <div>
                {{ getValue(item.value) }}
              </div>
            </li>
            <li :key='index' v-else>
              <span class='label'>{{ item.label }}</span>
              <span class='content'>{{ getValue(item.value) }} </span>
            </li>

          </template>
        </ul>
        <div class='buttons mt-20'>
          <!--          <a-button class='ml-10 warning-btn' @click='dealWithVisible = true'>-->
          <!--            <a-icon type='pause' style='font-size:14px' />-->
          <!--            处理-->
          <!--          </a-button>-->
          <!--          <a-button class='ml-10 success-btn' @click='neglect'>-->
          <!--            <a-icon type='caret-right' />-->
          <!--            忽略-->
          <!--          </a-button>-->
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
            this.labelList = this.exceptionWorkList.concat(this.allLabel)
          } else if (this.typeList.find(item => item.label == this.detailItem.exceptionType).value == 2) {
            this.labelList = this.exceptionEventList.concat(this.allLabel)
          }
        }
      },
      immediate: true
    }
  },
  data() {
    return {
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
          label: '应用系统：',
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
          value: 'eventCode'
        },
        {
          label: '服务器：',
          value: 'client'

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
        let params = {
          jobId: this.detailItem.jobId,
          id: this.detailItem.id,
          domain: this.detailItem.domain,
          type: this.typeList.find(item => item.label == this.detailItem.exceptionType).value
        }
        let res = await getExceptionDetail(params)
        if (res.code == 200) {
          this.detail = res.result
          let index = this.labelList.findIndex(ele => ele.label.indexOf('应用系统') != -1)
          this.labelList[index].label = this.detail.domain == 'prod' ? '应用系统' : '分行'
          this.labelList[index].value = this.detail.domain == 'prod' ? 'applicationSystem' : 'branchName'
          console.log(this.labelList, 'labelList')
        } else {
          this.detail = {}
          this.$message.error(res.message)
        }
      } catch (e) {
        console.log(e, 'e')
      } finally {
        this.detailLoading = false
        this.$forceUpdate()
      }
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
  width: 95%;
  margin: 20px auto;
  margin-top: 40px;
  display: flex;
}
</style>