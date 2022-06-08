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
            <li :key='index'>
              <span class='label'>{{ item.label }}</span>
              <span class='content'>{{ getValue(item.value) }} </span>
            </li>
            <li style='display:block' :key='index+-1' v-if='item.type=="textarea"'>
              <div>{{ item.label }}</div>
              <div>
                <a-input
                  :value='getValue(item.value)'
                  type='textarea'
                  auto-size
                  disabled></a-input>
              </div>
            </li>
          </template>
        </ul>
        <div class='dealwith mt-20'>
          <ul>
            <li>
              <span class='label'>处理状态</span>
              <span class='content'>123</span>
            </li>
            <li>
              <span class='label'>处理人</span>
              <span class='content'>123</span>
            </li>
            <li>
              <span class='label'>处理时间</span>
              <span class='content'>123</span>
            </li>
            <li>
              <span class='label'>处理内容</span>
              <span class='content'>123</span>
            </li>
          </ul>
        </div>
        <div class='buttons mt-20'>
          <a-button class='ml-10 warning-btn'>
            <a-icon type='pause' style='font-size:14px' />
            处理
          </a-button>
          <a-button class='ml-10 success-btn'>
            <a-icon type='caret-right' />
            忽略
          </a-button>
          <a-button type='link'>查看作业相关事件</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { getWorkDetail, getExceptionDetail } from '@/api/modules/workcontrol/index.js'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    id: {
      type: String | Number,
      default: ''
    },
    domain: {
      type: String,
      default: 'prod'
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          if (this.type == '异常作业') {
            this.getWorkDetail()
          }

        }
      },
      immediate: true
    }
  },
  data() {
    return {
      detail: {},
      detailLoading: false,
      labelList: [],
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
    }
  },
  methods: {
    /**
     * 获取异常详情
     */
    async getExceptionDetail() {
      this.detailLoading = true
      try {
        let res = await getExceptionDetail({ jobId: this.id, domain: this.domain })
        if (res.code == 200) {
          console.log(res.result, 'res.result')
          this.detail = res.result
        } else {
          this.detail = {}
          this.$message.error(res.message)
        }
      } catch {

      } finally {
        this.detailLoading = false
        this.$forceUpdate()
        console.log(this.detailLoading, 'this.detailLoading')
      }
    },
    /**
     * 获取作业详情
     */
    async getWorkDetail() {
      this.detailLoading = true
      try {
        let res = await getWorkDetail({ jobId: this.id, domain: this.domain })
        if (res.code == 200) {
          console.log(res.result, 'res.result')
          this.detail = res.result
        } else {
          this.detail = {}
          this.$message.error(res.message)
        }
      } catch {

      } finally {
        this.detailLoading = false
        this.$forceUpdate()
        console.log(this.detailLoading, 'this.detailLoading')
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
    span {
      width: 50%
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