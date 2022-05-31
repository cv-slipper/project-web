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
            <span class='content'>{{ getValue(item.value) }} </span>
          </li>
        </ul>
        <div class='buttons mt-20'>
          <a-button class='ml-10 warning-btn' @click='confirm("pause","暂停")'>
            <a-icon type='pause' style='font-size:14px' />
            暂停
          </a-button>
          <a-button class='ml-10 success-btn' @click='confirm("play","继续")'>
            <a-icon type='caret-right' />
            继续
          </a-button>
          <a-button class='ml-10 error-btn' @click='confirm("stop","终止")'>
            <a-icon type='stop' />
            终止
          </a-button>
          <a-button type='link'>查看作业相关事件</a-button>
          <a-button type='link'>查看作业日志</a-button>
          <a-button type='link'>查看RMAN日志</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { getWorkDetail, pauseWork, playWork, stopWork } from '@/api/modules/workcontrol/index.js'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    labelList: {
      type: Array,
      default: () => []
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
      detail: {},
      detailLoading: false
    }
  },
  methods: {
    /**
     * 暂停作业
     */
    async pauseWork() {
      try {
        let params = {}
        let res = await pauseWork(params)
        if (res.code == 200) {
          this.$message.success('暂停作业成功')
          this.getWorkDetail()
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {

      }
    },
    /**
     * 继续作业
     */
    async playWork() {
      try {
        let params = {}
        let res = await playWork(params)
        if (res.code == 200) {
          this.$message.success('暂停作业成功')
          this.getWorkDetail()
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {

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
        let params = {}
        let res = await stopWork(params)
        if (res.code == 200) {
          this.$message.success('暂停作业成功')
          this.getWorkDetail()
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {

      }
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
          type: 'warning'
        }
      ).then(() => {
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })

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
  width: 95%;
  margin: 20px auto;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
}
</style>